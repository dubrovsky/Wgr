package com.bivc.cimsmgs.exchange;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import javax.mail.Address;
import javax.mail.Flags.Flag;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Part;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeUtility;

import org.dom4j.Document;
import org.dom4j.io.SAXReader;
import com.bivc.cimsmgs.db.CimSmgs;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

class TIReceiverTask extends AbstractTask {
  private String un;
  private String trans;
  private long[] routes;
  private String server;
  private String account;
  private String password;
  private int pop3Port;
  private boolean ssl = false;
  static final private String subject = "GREENRAIL";
  static final private String TRASH = "TRASH";
    final static private Logger log = LoggerFactory.getLogger(ReceiverTask.class);

  public TIReceiverTask(String server, int pop3Port, boolean ssl, String account, String password, String un, String trans, long[] routes) {
    this.server = server;
    this.account = account;
    this.password = password;
    this.pop3Port = pop3Port;
    this.ssl = ssl;
    this.un = un;
    this.trans = trans;
    this.routes = routes;
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
    Message message[] = folder.getMessages();
    int n = message.length;
    log.debug("Found " + n + " message(s)");

    for (int i = 0; i < n; i++) {
      ArrayList<byte[]> list = new ArrayList<byte[]>();
      String info;
      try {
        Message msg = message[i];
        String subj = msg.getSubject();
        if (subj == null)
          subj = "";
        String from = decodeAddr(msg.getFrom());
        info = "Process incoming message from " + from + " about '" + subj + "'";
        if (subj.toUpperCase().indexOf(subject) == -1) {
          log.info(info + " - skipped");
          save2file(msg, TRASH);
          msg.setFlag(Flag.DELETED, true);
          log.debug("Delete message from server");
          continue;
        }
        log.info(info);

        if (msg.isMimeType("text/plain")) {
          save2file(msg, TRASH);
          msg.setFlag(Flag.DELETED, true);
          log.warn("Message content type is \"text/plain\" - Mail skipped and deleted from server");
        }
        else if (msg.isMimeType("multipart/*")) {
          Multipart parts = (Multipart) msg.getContent();
          for (int j = 0; j < parts.getCount(); j++) {
            Part part = parts.getBodyPart(j);
            if (part.isMimeType("text/plain")) {
              log.debug("Content type of part is \"text/plain\" - look next");
              continue;
            }
            if (Message.ATTACHMENT.equalsIgnoreCase(part.getDisposition())) {
              String fileName = part.getFileName();
              if (fileName != null) {
                fileName = MimeUtility.decodeText(fileName);
              }
              log.debug("Found attachment with filename=" + fileName);
              if (part.isMimeType("application/xml") || part.isMimeType("text/xml")) {
                list.add(read(part.getInputStream()));
              }
              else if (part.isMimeType("application/zip")) {
                ZipInputStream is = new ZipInputStream(part.getInputStream());
                ZipEntry zen;
                while ((zen = is.getNextEntry()) != null) {
                  log.debug("Found zip entry " + zen.getName());
                  list.add(read(is));
                }
              }
            }
            else {
              log.warn("Part is " + part.getContentType() + " " + part.getDisposition() + " - skipped");
            }
          }
        }
        else {
          save2file(msg, TRASH);
          msg.setFlag(Flag.DELETED, true);
          log.warn("Message content type is \"" + msg.getContentType() +  "\" - Mail skipped and deleted from server");
        }

        DocLoader docloader = new DocLoader();
//        ExchangeServer server = new ExchangeServer();
        for (byte[] doc : list) {
          try {
            SAXReader reader = new SAXReader(false);
            Document document = reader.read(new ByteArrayInputStream(doc));
            CimSmgs cs = docloader.load(document, un, trans, routes);

            if (cs != null /*&& !"v".equals(cs.getSrc())*/) {
//              server.SendIftmin(cs.getHid(), un, EDIConvertor.EdiDir.BCH);
//              server.SendIftmin(cs.getHid(), un, EDIConvertor.EdiDir.BTLC);
            }
          }
          catch (Exception pex) {
            save2file(msg, TRASH);
            log.error(pex.getMessage(), pex);
          }
        }

        msg.setFlag(Flag.DELETED, true);
        log.debug("Message deleted");
      }
      catch (Exception e) {
        log.error(e.getMessage(), e);
      }
    }

    folder.close(true);
    store.close();
  }

  private String decodeAddr(Address[] addr) {
    String res = "";
    if (addr != null) {
      for (int k = 0; k < addr.length; k++) {
        InternetAddress a = (InternetAddress)addr[k];
        if (a.getPersonal() != null)
          res += ", " + a.getPersonal() + "<" + a.getAddress() + ">";
        else
          res += ", " + a.getAddress();
      }
      if (res.length() > 0)
        res = res.substring(2);
    }

    return res;
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

  private void save2file(Message msg, String folder) throws MessagingException, IOException, URISyntaxException {
    String tmpPath = new File(new URI(this.getClass().getResource("/").toString())).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      tmpDir.mkdirs();
    }
    // Сохраняем полученный файл во временную папку
    File file = File.createTempFile(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) + "_", ".eml", tmpDir);
    log.debug("Output file = " + file.getName());
    BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(file));
    msg.writeTo(os);
    os.close();
  }

  public static void main(String[] args) {
    try {
      TIReceiverTask rt = new TIReceiverTask("10.3.6.13", 110, false, "graphdoc", "qwezxcasd", "ldn", "1264", new long[] {5, 5, 5});
      rt.run();
//      rt.stop();
    }
    catch(Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}
