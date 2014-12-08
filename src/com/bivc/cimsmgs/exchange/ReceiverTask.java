package com.bivc.cimsmgs.exchange;

import com.bivc.transport.FtpTransport;
import org.dom4j.Document;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.xml.sax.InputSource;

import java.io.StringReader;
import java.util.Properties;
import java.util.StringTokenizer;

class ReceiverTask extends AbstractTask {
  private String un;
  private String trans;
  private Long route;
  private Properties pr;
    final static private Logger log = LoggerFactory.getLogger(ReceiverTask.class);

  public ReceiverTask(String server, String account, String password, String dir, String un, String trans, Long route) {
    pr = new Properties();
    pr.setProperty("server", server);
    pr.setProperty("account", account);
    pr.setProperty("password", password);
    pr.setProperty("dir", dir);
    this.un = un;
    this.trans = trans;
    this.route = route;
  }

  protected void runTask() throws Exception {
    FtpTransport tr = new FtpTransport(pr);
    tr.setEncoding("utf-8");

    if (tr != null) {
      while (tr.hasNext()) {
        try {
          String xmlStr = tr.get();
          log.debug("Processing document:\r\n" + xmlStr);
          InputSource source = new InputSource(new StringReader(xmlStr));
          String encoding = getEncoding(xmlStr);
          source.setEncoding(encoding);

          SAXReader reader = new SAXReader(false);
  //            reader.setFeature("http://apache.org/xml/features/validation/schema", true);
  //            reader.setFeature("http://xml.org/sax/features/namespaces", false);
          Document document = reader.read(source);
          DocLoader docloader = new DocLoader();
          docloader.load(document, un, trans, new long[] {route, 0, 0});
        }
        catch (Exception ex) {
          log.error(ex.getMessage(), ex);
        }
      }
    }
  }

  private static String getEncoding(String text) {
    String result = null;

    String xml = text.trim();

    if(xml.startsWith("<?xml")) {
      int end = xml.indexOf("?>");
      String sub = xml.substring(0, end);
      StringTokenizer tokens = new StringTokenizer(sub, " =\"\'");

      while(tokens.hasMoreTokens()) {
        String token = tokens.nextToken();

        if("encoding".equals(token)) {
          if(tokens.hasMoreTokens()) {
            result = tokens.nextToken();
          }

          break;
        }
      }
    }

    return result;
  }

  public static void main(String[] args) {
    try {
      ReceiverTask rt = new ReceiverTask("ftp.trcont.eu", "trcont_schenker", "rRulf9o4", "in", "", "", (long)5);
      rt.run();
      rt.stop();
    }
    catch(Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}
