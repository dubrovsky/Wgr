package com.bivc.cimsmgs.exchange.tbc.xml;

import java.io.IOException;
import java.io.OutputStream;
import java.util.HashSet;
import java.util.Set;
import javax.xml.parsers.ParserConfigurationException;

import org.apache.log4j.Logger;
import org.apache.xml.security.c14n.CanonicalizationException;
import org.apache.xml.security.c14n.implementations.Canonicalizer20010315;
import org.apache.xml.security.signature.XMLSignatureInput;
import org.w3c.dom.Attr;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;
import org.apache.commons.lang.StringUtils;
import org.w3c.dom.Document;
import java.util.TreeMap;
import org.apache.commons.lang.builder.ToStringBuilder;
import java.util.Map.Entry;
import org.w3c.dom.Element;
import java.util.Iterator;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.StringReader;
import org.xml.sax.InputSource;

public class Canonic11 extends Canonicalizer20010315 {

  static private Logger log = Logger.getLogger(Canonic11.class);
  static public final String implementedCanonicalizerURI = "urn:xml-dsig:transformation:v1.1";
  static HashSet pass2Names = new HashSet();

  static {
    pass2Names.add("schemaLocation");
    pass2Names.add("noNamespaceSchemaLocation");
    pass2Names.add("type");
    pass2Names.add("nil");
  }

  public Canonic11() {
    super(false);
  }

  /** @inheritDoc */
  public final String engineGetURI() {
    return implementedCanonicalizerURI;
  }

  /** @inheritDoc */
  public final boolean engineGetIncludeComments() {
    return false;
  }

  public byte[] engineCanonicalize(byte[] inputBytes) throws ParserConfigurationException, IOException, SAXException,
      CanonicalizationException {
    log.debug("inputBytes=" + inputBytes);
    return super.engineCanonicalize(inputBytes);
  }

  public byte[] engineCanonicalizeSubTree(Node rootNode) throws CanonicalizationException {
    log.debug("rootNode[" + rootNode.getClass().getName() + "]=" + rootNode);
    log.debug(Utils.debug(rootNode));

    Node copy = rootNode.cloneNode(true);

    try {
      // 1. Удаление из XML-документа инструкций обработки
      stepThrough1(copy);
      // 2. Удаление из элементов XML-документа атрибутов из пространства имен “http://www.w3.org/2001/XMLSchemainstance"
      stepThrough2(copy);
      // 3. Упорядочение во всех элементах XML-документа префиксов пространств имен
      stepThrough3(copy);
      // 4. Удаление в каждом элементе XML-документа дочерних текстовых узлов, содержащих только пробельные символы
      stepThrough4(copy);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
    String xmlStr = Utils.debug(copy);
    log.debug(xmlStr);

    /****
     Надо как-то сделать правильно, но так тоже работает
     ****/
    try {
      DocumentBuilderFactory dbf;
      dbf = DocumentBuilderFactory.newInstance();
      // установка флага, определяющего игнорирование пробелов в содержимом элементов при обработке XML-документа
      dbf.setIgnoringElementContentWhitespace(true);
      // установка флага, определяющего преобразование узлов CDATA в текстовые узлы при обработке XML-документа
      dbf.setCoalescing(true);
      // установка флага, определяющего поддержку пространств имен при обработке XML-документа
      dbf.setNamespaceAware(true);
      final DocumentBuilder documentBuilder = dbf.newDocumentBuilder();
      InputSource source = new InputSource(new StringReader(xmlStr));
//    String encoding = getEncoding(xmlStr);
      source.setEncoding("utf-8");
      final Document doc = documentBuilder.parse(source);
      copy = doc.getDocumentElement();
    }
    catch (Exception ex123) {
      log.error(ex123.getMessage(), ex123);
    }
    /****
     ****
     ****/

    byte[] res = super.engineCanonicalizeSubTree(copy);
    try {
      if (res != null)
        log.debug("========================\r\n" + new String(res, "utf-8") + "\r\n=============================");
    }
    catch (Exception ex) {}
    return res;
  }

  private void stepThrough1(Node start) {
    NodeList list = start.getChildNodes();
    for (int i = 0; i < list.getLength(); i++) {
      Node child = list.item(i);
      if (child.getNodeType() == Node.PROCESSING_INSTRUCTION_NODE) {
        log.trace("Found PROCESSING_INSTRUCTION_NODE");
        String name = child.getNodeName();
        String val = child.getNodeValue();
        start.removeChild(child);
        log.trace("Delete PROCESSING_INSTRUCTION_NODE: " + name + "=" + val);
        i--; // потомка удалили, надо счетчик отмотать !!!
        continue;
      }
      stepThrough1(child);
    }
  }

  private static void stepThrough2(Node start) {
    if (start.getNodeType() == Node.ELEMENT_NODE) {
      log.trace("Node="+start.getNodeName() + ", Namespace="+start.getNamespaceURI());
      NamedNodeMap startAttr = start.getAttributes();
      for (int i = 0; i < startAttr.getLength(); i++) {
        Attr attr = (Attr)startAttr.item(i);
        String name = attr.getName();
        String val = attr.getValue();
        if ("http://www.w3.org/2001/XMLSchema-instance".equals(attr.getNamespaceURI()) && pass2Names.contains(attr.getLocalName())) {
          attr.getOwnerElement().removeAttributeNode(attr);
          log.trace("Delete XMLSchemainstance attribute: " + name + "=" + val);
          i--; // атрибут удалили, надо счетчик отмотать !!!
        }
      }
    }
    for (Node child = start.getFirstChild(); child != null; child = child.getNextSibling()) {
      stepThrough2(child);
    }
  }

  private static void stepThrough3(Node start) {
    final String xmlns = "xmlns";

    if (start.getNodeType() == Node.ELEMENT_NODE) {
      // построение сортированного по URI списка названий пространств имен элемента ...
      TreeMap<String,String> nsMap = new TreeMap();
      log.trace("Node=" + start.getNodeName() + " Pefix=" + start.getPrefix() + ", URI=" + start.getNamespaceURI());
      String elPrefix = start.getPrefix();
      String elUri = start.getNamespaceURI();
      if (elUri != null) {
        nsMap.put(elUri, StringUtils.defaultString(elPrefix));
      }

      // ... и его атрибутов
      NamedNodeMap startAttr = start.getAttributes();
      for (int i = 0; i < startAttr.getLength(); i++) {
        Attr attr = (Attr) startAttr.item(i);
        log.trace("Attribute=" + attr.getNodeName() + ", Prefix="  + attr.getPrefix() + ", URI=" + attr.getNamespaceURI());
        String prefix = attr.getPrefix();
        String uri = attr.getNamespaceURI();
        // собственно сами названия пространств имен в список не входят
        if (uri != null && !( xmlns.equals(attr.getNodeName()) || xmlns.equals(prefix) )) {
          nsMap.put(uri, StringUtils.defaultString(prefix));
        }
      }
      log.trace(new ToStringBuilder(start).append(nsMap).toString());

      // замена префиксов в списке на нумерованные
      int count = 1;
      Iterator<Entry<String,String>> it = nsMap.entrySet().iterator();
      while (it.hasNext()) {
        Entry<String,String> ns = it.next();
        ns.setValue("n" + count++);
      }
      log.trace(new ToStringBuilder(start).append(nsMap).toString());

      // замена префикса пространства имен элемента согласно списка
      start.setPrefix(nsMap.get(elUri));

      for (int i = 0; i < startAttr.getLength(); i++) {
        Attr attr = (Attr) startAttr.item(i);
        // удаление атрибута, являющегося узлом пространства имен
        if (xmlns.equals(attr.getNodeName()) || xmlns.equals(attr.getPrefix())) {
          attr.getOwnerElement().removeAttributeNode(attr);
          log.trace("Deleted namespace attribute: " + attr.getNodeName());
          i--; // атрибут удалили, надо счетчик отмотать !!!
        }
        else {
          // замена префикса пространства имен атрибута согласно списка
          String uri = attr.getNamespaceURI();
          if (uri != null)
            attr.setPrefix(nsMap.get(uri));
        }
      }

      // добавление атрибутов согласно списка
      it = nsMap.entrySet().iterator();
      while (it.hasNext()) {
        Entry<String,String> ns = it.next();
        ((Element)start).setAttribute(xmlns + ":" + ns.getValue(), ns.getKey());
      }
      log.trace(Utils.debug(start));

    }
    for (Node child = start.getFirstChild(); child != null; child = child.getNextSibling()) {
      stepThrough3(child);
    }
//    log.trace("+++++++++++++++++++++++++");
//    log.trace(Utils.debug(start));
//    log.trace("+++++++++++++++++++++++++");
  }

  private static void stepThrough4(Node start) {
    NodeList list = start.getChildNodes();
    for (int i = 0; i < list.getLength(); i++) {
      Node child = list.item(i);
      if (child.getNodeType() == Node.TEXT_NODE && StringUtils.isBlank(child.getNodeValue())) {
        start.removeChild(child);
        log.trace("Delete Empty TEXT_NODE");
        i--; // потомка удалили, надо счетчик отмотать !!!
        continue;
      }
      stepThrough4(child);
    }
  }

  public byte[] engineCanonicalizeSubTree(Node rootNode, String inclusiveNamespaces) throws CanonicalizationException {
    log.debug("rootNode=" + rootNode + ", inclusiveNamespaces=" + inclusiveNamespaces);
    return super.engineCanonicalizeSubTree(rootNode, inclusiveNamespaces);
  }

  public byte[] engineCanonicalizeXPathNodeSet(NodeList xpathNodeSet) throws CanonicalizationException {
    log.debug("xpathNodeSet=" + xpathNodeSet);
    return super.engineCanonicalizeXPathNodeSet(xpathNodeSet);
  }

  public byte[] engineCanonicalizeXPathNodeSet(NodeList xpathNodeSet, String inclusiveNamespaces) throws CanonicalizationException {
    log.debug("xpathNodeSet=" + xpathNodeSet + ", inclusiveNamespaces=" + inclusiveNamespaces);
    return super.engineCanonicalizeXPathNodeSet(xpathNodeSet, inclusiveNamespaces);
  }

  public byte[] engineCanonicalizeXPathNodeSet(Set xpathNodeSet) throws CanonicalizationException {
    log.debug("xpathNodeSet=" + xpathNodeSet);
    return super.engineCanonicalizeXPathNodeSet(xpathNodeSet);
  }

  public byte[] engineCanonicalizeXPathNodeSet(Set xpathNodeSet, String inclusiveNamespaces) throws CanonicalizationException {
    log.debug("xpathNodeSet=" + xpathNodeSet + ", inclusiveNamespaces=" + inclusiveNamespaces);
    return super.engineCanonicalizeXPathNodeSet(xpathNodeSet, inclusiveNamespaces);
  }

  public void setWriter(OutputStream os) {
    super.setWriter(os);
  }

  public byte[] engineCanonicalize(XMLSignatureInput input) throws CanonicalizationException {
    log.debug("input=" + input);
    return super.engineCanonicalize(input);
  }

  private static void stepThrough_(Node start) {
    int type = start.getNodeType();
    switch (type) {
      // print the document element
      case Node.DOCUMENT_NODE:
        stepThrough_(((Document)start).getDocumentElement());
        break;
      // print element and any attributes
      case Node.ELEMENT_NODE:
        NamedNodeMap attrs = start.getAttributes();
        for (int i = 0; i < attrs.getLength(); i++)
          stepThrough_(attrs.item(i));

        if (start.hasChildNodes()) {
          NodeList children = start.getChildNodes();
          for (int i = 0; i < children.getLength(); i++)
            stepThrough_(children.item(i));
        }
        break;
        // Print attribute nodes
      case Node.ATTRIBUTE_NODE:
        break;
      // handle entity reference nodes
      case Node.ENTITY_REFERENCE_NODE:
        break;
      // print cdata sections
      case Node.CDATA_SECTION_NODE:
        break;
      // print text
      case Node.TEXT_NODE:
        break;
      case Node.COMMENT_NODE:
        break;
      // print processing instruction
      case Node.PROCESSING_INSTRUCTION_NODE:
        break;
    }
  }
}
