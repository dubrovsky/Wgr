package com.bivc.cimsmgs.exchange.tbc.xml;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.w3c.dom.Node;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import javax.xml.transform.Transformer;
import javax.xml.transform.dom.DOMSource;
import org.apache.log4j.Logger;
import org.dom4j.*;

public class Utils {

  static private Logger log = Logger.getLogger(Utils.class);
  private static final String encoding = "utf-8";

  static String debug(Node node) {
    String res = "";
    try {
      ByteArrayOutputStream os = new ByteArrayOutputStream();

      // инициализация объекта копирования содержимого XML-документа в поток
      final TransformerFactory tf = TransformerFactory.newInstance();

      // создание объекта копирования содержимого XML-документа в поток
      final Transformer trans = tf.newTransformer();

      // копирование содержимого XML-документа в поток
      trans.transform(new DOMSource(node), new StreamResult(os));

      res = os.toString("utf-8");
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
    return res;
  }

  public static Element getRoot(String src)  throws Exception {
    try {
      SAXReader reader = new SAXReader(false);
      Document document = reader.read(new ByteArrayInputStream(src.getBytes(encoding)));
      return document.getRootElement();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      throw ex;
    }

  }

}
