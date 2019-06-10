package com.bivc.cimsmgs.exchange;

import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.*;
import javax.mail.Flags.Flag;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeUtility;
import java.io.*;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

class VedReceiverTask extends AbstractTask {
  private String un;
  private String trans;
  private String server;
  private String account;
  private String password;
  private int pop3Port;
  private boolean ssl;
  private VedLoader loader;

  private static final String TRASH = "TRASH_VED";
  private static final String FAIL = "FAILAED_VED";
  private static final String PROCESSED = "PROCESSED_VED";
  private static final Pattern SUBJ = Pattern.compile("VEDOMOST|\\d{5,5}((_| )\\d{5,5})?(\\.xml)?");
  private static final Logger log = LoggerFactory.getLogger(ReceiverTask.class);
  private static final SimpleDateFormat df2  = new SimpleDateFormat("yyyyMMddHHmmss");

  public VedReceiverTask(String server, int pop3Port, boolean ssl, String account, String password, String un, String trans) {
    this.server = server;
    this.account = account;
    this.password = password;
    this.pop3Port = pop3Port;
    this.ssl = ssl;
    this.un = un;
    this.trans = trans;
  }

  protected void runTask() throws Exception {
    Properties props = System.getProperties();
    props.put(ssl ? "mail.pop3s.connectiontimeout" : "mail.pop3.connectiontimeout", "30000");
    props.put(ssl ? "mail.pop3s.timeout" : "mail.pop3.timeout", "30000");
    Session session = Session.getDefaultInstance(props, null);
    Store store = session.getStore(ssl ? "pop3s" : "pop3");
    store.connect(server, pop3Port, account, password);
    Folder folder = store.getFolder("INBOX");
    folder.open(Folder.READ_WRITE);
    Message[] message = folder.getMessages();
    int n = message.length;
    log.debug("Found " + n + " message(s)");

    if (n > 0) {
      loader = new VedLoader();
    }

    for (int i = 0; i < n; i++) {
      log.debug("Process message " + (i + 1));
      String info;

      Message msg = null;
      try {
        msg = message[i];
        String subj = msg.getSubject();
        if (subj == null)
          subj = "";
        String from = decodeAddr(msg.getFrom());
        info = "Process incoming message from " + from + " about '" + subj + "'";
        Matcher m = SUBJ.matcher(subj);
        if (!m.matches()) {
          log.info(info + " - skipped");
          save2file(msg, TRASH);
          msg.setFlag(Flag.DELETED, true);
          log.debug("Delete message from server");
          continue;
        }
        log.info(info);

        if (msg.isMimeType("multipart/*")) {
          log.debug("Content type of part is " + msg.getContentType() + " - processing the contents of");
          processMultipart(msg);
        }
        else {
          log.warn("Message content type is \"" + msg.getContentType() +  "\" - Mail skipped");
          save2file(msg, TRASH);
        }

        msg.setFlag(Flag.DELETED, true);
        log.debug("Delete message from server");

      }
      catch (Exception e) {
        log.error(e.getMessage(), e);
        save2file(msg, FAIL);
      }
    }

    folder.close(true);
    store.close();
  }

  private void processMultipart(Part msg) throws MessagingException, IOException, DocumentException, URISyntaxException {
    Multipart parts = (Multipart) msg.getContent();
    for (int j = 0; j < parts.getCount(); j++) {
      Part part = parts.getBodyPart(j);
//      if (part.isMimeType("text/*")) {
//        logger.debug("Content type of part is \"text/plain\" - look next");
//        continue;
//      }
      if (Message.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
        log.debug("Process attachment part");
        String fileName = part.getFileName();
        if (fileName != null) {
          fileName = MimeUtility.decodeText(fileName).toLowerCase();
        }
        log.debug("Found attachment with filename=" + fileName);

        if (fileName != null && fileName.endsWith(".xml")) {
          boolean res = process(part.getInputStream(), fileName);
          if (res) {
            save2file(part.getInputStream(), PROCESSED, fileName);
          }
          else {
            save2file(msg, TRASH);
          }
        }
        else {
          log.debug("Skipped. Look next");
        }
      }
      else if (part.isMimeType("multipart/*")) {
        log.debug("Content type of part is " + part.getContentType() + " - processing the contents of");
        processMultipart(part);
      }
      else {
        log.warn("Part is " + part.getContentType() + " " + part.getDisposition() + " - skipped");
      }
    }
  }

  protected boolean process(InputStream is, String fileName) throws DocumentException {
    String ved_nomer = StringUtils.substringBefore(fileName, ".xml");
    SAXReader reader = new SAXReader(false);
    Document document = reader.read(is);
    return loader.load(document, un, trans, ved_nomer);
  }

  private String decodeAddr(Address[] addr) {
    StringBuilder res = new StringBuilder();
    if (addr != null) {
      for (Address address : addr) {
        InternetAddress a = (InternetAddress) address;
        if (a.getPersonal() != null)
          res.append(", ").append(a.getPersonal()).append("<").append(a.getAddress()).append(">");
        else
          res.append(", ").append(a.getAddress());
      }
      if (res.length() > 0)
        res.delete(0, 2);
    }

    return res.toString();
  }

  private byte[] read(InputStream is) throws IOException {
    byte[] res = null;

    ByteArrayOutputStream out = new ByteArrayOutputStream();
    InputStream in;
    if (is instanceof BufferedInputStream)
      in = is;
    else
      in = new BufferedInputStream(is);

    int i;
    while ((i = in.read()) != -1) {
      out.write(i);
    }
    res = out.toByteArray();
    return res;
  }

  private void save2file(Part msg, String folder) throws MessagingException, IOException, URISyntaxException {
    File tmpDir = createDir(folder);
    // Сохраняем полученный файл во временную папку
    File file = File.createTempFile(df2.format(new Date()) + "_", ".eml", tmpDir);
    log.debug("Output file = " + file.getName());
    OutputStream os = new BufferedOutputStream(new FileOutputStream(file));
    msg.writeTo(os);
    os.close();
  }

  private void save2file(InputStream is, String folder, String name) throws IOException, URISyntaxException {
    File tmpDir = createDir(folder);
    // Сохраняем полученный файл во временную папку
    File file = File.createTempFile(name + "_", ".xml", tmpDir);
    log.debug("Output file = " + file.getName());
    OutputStream os = new BufferedOutputStream(new FileOutputStream(file));
    int i;
    while ((i = is.read()) > 0)
      os.write(i);
    os.close();
  }

  private File createDir(String folder) throws URISyntaxException {
    String tmpPath = new File(getClass().getResource("/").toURI()).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      if (!tmpDir.mkdirs())
        log.warn("The dir has not been created");
    }
    return tmpDir;
  }

}
