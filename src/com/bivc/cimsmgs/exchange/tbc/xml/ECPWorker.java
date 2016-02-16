package com.bivc.cimsmgs.exchange.tbc.xml;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringReader;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.cert.CertPathBuilder;
import java.security.cert.CertPathValidator;
import java.security.cert.CertPathValidatorResult;
import java.security.cert.CertStore;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.CollectionCertStoreParameters;
import java.security.cert.PKIXBuilderParameters;
import java.security.cert.PKIXCertPathBuilderResult;
import java.security.cert.TrustAnchor;
import java.security.cert.X509CertSelector;
import java.security.cert.X509Certificate;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.Enumeration;
import java.util.Properties;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.Multipart;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;
import javax.mail.util.ByteArrayDataSource;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServlet;
import javax.xml.crypto.dsig.DigestMethod;
import javax.xml.crypto.dsig.SignatureMethod;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.axis.MessageContext;
import org.apache.commons.lang.builder.ToStringBuilder;
//import org.apache.commons.vfs.FileContent;
//import org.apache.commons.vfs.FileObject;
//import org.apache.commons.vfs.FileSystemManager;
//import org.apache.commons.vfs.VFS;
import org.apache.log4j.Logger;
import org.apache.log4j.NDC;
import org.apache.struts2.ServletActionContext;
import org.apache.xml.security.Init;
import org.apache.xml.security.c14n.Canonicalizer;
import org.apache.xml.security.keys.KeyInfo;
import org.apache.xml.security.signature.ObjectContainer;
import org.apache.xml.security.signature.XMLSignature;
import org.apache.xml.security.transforms.Transform;
import org.apache.xml.security.transforms.Transforms;
import org.apache.xml.security.utils.Constants;
import org.apache.xml.security.utils.XMLUtils;
import org.apache.xpath.XPathAPI;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.xml.sax.InputSource;
//import ru.CryptoPro.JCPxml.xmldsig.JCPXMLDSigInit;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.apache.commons.lang.StringUtils;
//import ru.CryptoPro.JCPxml.XmlInit;
import org.apache.xml.security.utils.Base64;
import sun.security.pkcs.PKCS7;
import sun.security.pkcs.SignerInfo;
//import ru.CryptoPro.JCP.JCP;
import sun.security.util.DerValue;
import sun.security.pkcs.ContentInfo;
import java.math.BigInteger;
import sun.security.x509.AlgorithmId;
import sun.security.x509.X500Name;

public class ECPWorker {

  // ��� ���������
  static private String keyStoreName = null;//"HDImageStore";
  // ����� �����
  static private String keyAlias = null;//"TRCONT_TEST";
//  static private String keyAlias = "TEST_FTS";
  // ����� ����������� ���
  static private String rootAlias = null;//"testcryptopro0";
//  static private String rootAlias = "testfts";
  // ������ ������� � ���������� � ������
  static private String keyPassword = null;//"12345678";
  // ���� � ���������� ������������
  static private String certStorePath = null;//"c:\\test.store";
  // ������ ������� � ���������� ������������
  static private String certStorePassword = null;//"12345678";
  // ���� � ���
  static private String CRLPath = null;//"c:\\certcrl.crl";
//  static private String CRLPath = "http://www.cryptopro.ru/certenroll/Test%20Center%20CRYPTO-PRO(2).crl";

  // �������� ������� (���� � 34.10-2001)
  static private final String signMethod = SignatureMethod.RSA_SHA1;
//  static private final String signMethod = "http://www.w3.org/2001/04/xmldsig-more#gostr34102001-gostr3411";
  // �������� �����������, ������������ ��� ������� (���� � 34.11-94)
  static private final String digestMethod = DigestMethod.SHA1;
//  static private final String digestMethod = "http://www.w3.org/2001/04/xmldsig-more#gostr3411";
  static private final String transformURI = com.bivc.cimsmgs.exchange.tbc.xml.Transform11.implementedTransformURI;
  static private final String canonicURI = Canonic11.implementedCanonicalizerURI;

  static private final String URI_SOAP_ENV = "http://www.w3.org/2001/06/soap-envelope";

  static public final String encoding = "utf-8";

  static private String server = null;//"10.3.6.13";
  static private String account = null;//"ldn";
  static private String password = null;//"observantus1976";
  static private String from = null;//"ldn@brestrw.by";
  static private String email = null;//"ldn@brestrw.by";
  static private int smtpPort = 25;

  static private String inFolder = "in";
  static private String outFolder = "out";

  static private DocumentBuilderFactory dbf;
  static private Logger log = Logger.getLogger(ECPWorker.class);

  private static int counter = 0;
  private int instanceNumber = 0;

  final static private String SERVER_VERSION = "12.02.2010";

  static {
    try {
      System.setProperty("org.apache.xml.security.ignoreLineBreaks", "true");
      /* � ������ ������� ������������ ����������� ��������� ������� ���� � 34.10-2001*/
//      JCPXMLDSigInit.init();
      Init.init();
      // ����������� ��������� �������������
      Transform.register(transformURI, "com.bivc.cimsmgs.exchange.tbc.xml.Transform11");
      // ����������� ��������� �����������
      Canonicalizer.register(canonicURI, "com.bivc.cimsmgs.exchange.tbc.xml.Canonic11");

      dbf = DocumentBuilderFactory.newInstance();
      // ��������� �����, ������������� ������������� �������� � ���������� ��������� ��� ��������� XML-���������
      dbf.setIgnoringElementContentWhitespace(true);
      // ��������� �����, ������������� �������������� ����� CDATA � ��������� ���� ��� ��������� XML-���������
      dbf.setCoalescing(true);
      // ��������� �����, ������������� ��������� ����������� ���� ��� ��������� XML-���������
      dbf.setNamespaceAware(true);

    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  public ECPWorker() throws URISyntaxException {
    instanceNumber = ++counter;
    NDC.remove();   // ������� ������ �������������, ���� �� ���, �� �������� ������ � ���� ������� �������
    NDC.push(Integer.toString(instanceNumber));
    if (keyStoreName == null)
      initParam(ServletActionContext.getServletContext());
  }

  public String getServerVersion() {
    String res = null;
    String br = "<br>";
    try {
      res = "Server Version: " + SERVER_VERSION + br + org.apache.axis.Version.getVersion() + br;

      SAXParser saxParser = getSAXParser();
      res += "XML parser : " + (saxParser != null ? saxParser.getClass().getName() : "Parser not found") + br;
      res += "Date : " + new SimpleDateFormat("dd.MM.yyyy HH:mm:ss Z (z)").format(new Date());
    }
    catch(Exception ex) {
      log.fatal(ex.getMessage(), ex);
    }

    return res;
  }

  public String sign(String xmlStr) throws Exception {
    try {
      log.debug("Call sign");
      String fileMask = save2file(xmlStr, null, inFolder);

      log.debug("Load keys");
      KeyStore hdImageStore = KeyStore.getInstance(keyStoreName);
      // �������� ����������� ��������� ��� ������ �����
//      hdImageStore.load(null, null);
      hdImageStore.load(new BufferedInputStream(new FileInputStream(certStorePath)), certStorePassword.toCharArray());

      // ��������� ��������� ����� �� ���������
      PrivateKey privateKey = (PrivateKey) hdImageStore.getKey(keyAlias, keyPassword.toCharArray());
      log.trace("key = " + privateKey);
      final X509Certificate cert = (X509Certificate) hdImageStore.getCertificate(keyAlias);
      log.trace("cert=" + cert);

      log.debug("Sign document");
      // ������������� ������� ������ XML-���������

      /* ��������� ������������� XML-�������� �� ������ */
      InputSource source = new InputSource(new StringReader(xmlStr));
//    String encoding = getEncoding(xmlStr);
      source.setEncoding(encoding);

      // �������� ����������� �������������� ��������� �� ������ ������������� ������� ������
      final DocumentBuilder documentBuilder = dbf.newDocumentBuilder();
      final Document doc = documentBuilder.parse(source);
      final Document newDoc = documentBuilder.newDocument();

      /* ���������� ���� ������� <ds:Signature> � ����� XML-�������� */

      // ������������� ������� ������������ ��� � ������������ � ���������� ���� � 34.10-2001
      final XMLSignature sig = new XMLSignature(newDoc, "", signMethod, canonicURI);
      //sig.setId("sigId");
      // ���������� � �������� ���� XML-��������� ���� �������
      newDoc.appendChild(sig.getElement());

      // ���������� � �������������� �������� ����� ��������� ���������
      ObjectContainer obj = new ObjectContainer(newDoc);
      // ��������� ��������� ���� XML-���������
      Node docRoot = doc.getDocumentElement();
//      Element nscontext = XMLUtils.createDSctx(doc, "env", URI_SOAP_ENV);
//      Element docRoot = (Element) XPathAPI.selectSingleNode(doc, "/env:Envelope/env:Body/*", nscontext);
      // ������ � ����� �������� ����������� ���������
      Node objElement = newDoc.importNode(docRoot, true);
      obj.appendChild(objElement);

      String Id = "Object";
      obj.setId(Id);
      sig.appendObject(obj);

      // �������� ������ ���� ������� ���� <ds:KeyInfo> ���������� �� �������� ����� �� ������ �����������
      sig.addKeyInfo(cert);
      sig.getKeyInfo().setId("KeyInfo");

      /* ����������� ������ ������ � XML-���������� � ���������� � ���� ������� ���� ������ */

      // �������� ���� �������������� <ds:Transforms> ��������������� XML-���������
//    final Transforms transforms = new Transforms(newDoc);

      // ���������� � ���� �������������� ������ ������ � ����������
//    transforms.addTransform(Transforms.TRANSFORM_ENVELOPED_SIGNATURE);
//    transforms.addTransform(Transforms.TRANSFORM_C14N_OMIT_COMMENTS);
//    transforms.addTransform("urn:xmldsig:transformation:v1.1");

      // ���������� � ���� ������� ������ (���� <ds:Reference>), ������������ ������� ������ �
      // XML-���������� (�������������� ������� �������� � ��������� � ���� <ds:Transforms> ���������
      // � �������� ���������� �����������)
//    sig.addDocument("", transforms, digestMethod);

      final Transforms transforms1 = new Transforms(newDoc);
      transforms1.addTransform(transformURI);
      sig.addDocument("#KeyInfo", transforms1, digestMethod);

      final Transforms transforms2 = new Transforms(newDoc);
      transforms2.addTransform(transformURI);
      sig.addDocument("#Object", transforms2, digestMethod);
      /* �������� ������� ����� ����������� XML-��������� �� ������ ��������� �����, �������� ������ � ���������� */

      // �������� ������� XML-���������
      sig.sign(privateKey);

      /* ������������ ������� � PKCS7 */
      Element nscontext2 = XMLUtils.createDSctx(newDoc, "ds", Constants.SignatureSpecNS);
      // ����� �� ������������ ����������� ������������ ����� ���� ������� <ds:Signature>
      Element sigVal = (Element) XPathAPI.selectSingleNode(newDoc, "//ds:SignatureValue[1]", nscontext2);
      byte[] oldSig = Base64.decode(sigVal);
      byte[] newSig = null;
      PKCS7 pkcs7 = makePKCS7(privateKey, cert, oldSig);
      ByteArrayOutputStream bos = new ByteArrayOutputStream();
      pkcs7.encodeSignedData(bos);
      newSig =  bos.toByteArray();
      Element newSigVal = Base64.encodeToElement(newDoc, "SignatureValue", newSig);
      sigVal.getParentNode().replaceChild(newSigVal, sigVal);

      /* ���������� ������������ XML-��������� � ���� */

      Element newDocRoot = newDoc.getDocumentElement();
      Node parenNode = docRoot.getParentNode();
      parenNode.replaceChild(doc.importNode(newDocRoot, true), docRoot);

      // ����������� ������, � ������� �������������� ������ ������������ XML-���������
      ByteArrayOutputStream os = new ByteArrayOutputStream();

      // ������������� ������� ����������� ����������� XML-��������� � �����
      final TransformerFactory tf = TransformerFactory.newInstance();

      // �������� ������� ����������� ����������� XML-��������� � �����
      final Transformer trans = tf.newTransformer();

      // ����������� ����������� XML-��������� � �����
      trans.transform(new DOMSource(doc), new StreamResult(os));
      os.close();

      // �������� � ����, ����� �������� ����� ����
      save2file(os, fileMask, inFolder);
      return new String(os.toByteArray(), encoding);

//      final FileOutputStream fos = new FileOutputStream(signFile);
//      os.writeTo(fos);
//      fos.close();

//      log.debug("Construct mail");
//      boolean isAuth = account != null && account.trim().length() > 0;
//      // �������� �� �����
//      Properties props = System.getProperties();
//      props.put("mail.smtp.host", server);
//      props.put("mail.smtp.port", smtpPort);
//      props.put("mail.smtp.connectiontimeout", "30000");
//      props.put("mail.smtp.timeout", "30000");
//      if (isAuth) {
//        props.put("mail.smtp.auth", "true");
//      }
//      javax.mail.Session mailSession = javax.mail.Session.getInstance(props);
//
//      // create a message
//      MimeMessage msg = new MimeMessage(mailSession);
//      msg.setFrom(new InternetAddress(from));
//      msg.setRecipients(javax.mail.Message.RecipientType.TO, InternetAddress.parse(email));
//      msg.setSubject("EDS");
//      Multipart mp = new MimeMultipart();
//
//      // ������ ����� ������
//      MimeBodyPart mbp1 = new MimeBodyPart();
//      mbp1.setText("");
//      mp.addBodyPart(mbp1);
//
//      // �� ������ ����� zip � xml
//      /*
//          String name = "data";
//          ByteArrayOutputStream zip = new ByteArrayOutputStream();
//          ZipOutputStream out = new ZipOutputStream(zip);
//          out.putNextEntry(new ZipEntry(name + ".xml"));
//          os.writeTo(out);
//          out.close();
//          DataSource ds = new ByteArrayDataSource(zip.toByteArray(), "application/zip");
//          MimeBodyPart mbp2 = new MimeBodyPart();
//          mbp2.setDataHandler(new DataHandler(ds));
//          mbp2.setFileName(MimeUtility.encodeText(name + ".zip", encoding, null));
//          mp.addBodyPart(mbp2);
//       */
//
//      // �� ������ ����� xml
//      String name = "data";
//      DataSource ds = new ByteArrayDataSource(os.toByteArray(), "text/xml; charset=utf-8");
//      MimeBodyPart mbp2 = new MimeBodyPart();
//      mbp2.setDataHandler(new DataHandler(ds));
//      mbp2.setFileName(MimeUtility.encodeText(name + ".xml", encoding, null));
//      mp.addBodyPart(mbp2);
//      // add the Multipart to the message
//      msg.setContent(mp);
//      // set the Date: header
//      msg.setSentDate(new Date());
//      msg.saveChanges();
//
//      // send the message
//      javax.mail.Transport tr = mailSession.getTransport("smtp");
//      if (isAuth) {
//        tr.connect(server, smtpPort, account, password);
//      }
//      else {
//        tr.connect();
//      }
//      tr.sendMessage(msg, msg.getAllRecipients());
//      tr.close();
//
//      log.info("Send mail to " + email);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      throw ex;
    }
  }


  static public void initParam(String TBCKeyStoreName, String TBCKeyAlias, String TBCKeyPassword,  String TBCCertStorePath, String TBCCertStorePassword) {
    keyStoreName = TBCKeyStoreName;
    if (log.isDebugEnabled())
      log.debug("TBCKeyStoreName=" + keyStoreName);

    keyAlias = TBCKeyAlias;
    if (log.isDebugEnabled())
      log.debug("TBCKeyAlias=" + keyAlias);

//    rootAlias = sc.getInitParameter("rootAlias");
//    if (log.isDebugEnabled())
//      log.debug("rootAlias=" + rootAlias);

    keyPassword = TBCKeyPassword;
    if (log.isDebugEnabled())
      log.debug("TBCKeyPassword=" + keyPassword);

    certStorePath = TBCCertStorePath;
    if (log.isDebugEnabled())
      log.debug("TBCCertStorePath=" + certStorePath);

    certStorePassword = TBCCertStorePassword;
    if (log.isDebugEnabled())
      log.debug("TBCCertStorePassword=" + certStorePassword);

//    CRLPath = sc.getInitParameter("CRLPath");
//    if (log.isDebugEnabled())
//      log.debug("CRLPath=" + CRLPath);
  }

  static public void initParam(ServletContext sc) throws URISyntaxException {
    if (sc != null) {
      keyStoreName = sc.getInitParameter("TBCKeyStoreName");
      if (log.isDebugEnabled())
        log.debug("TBCKeyStoreName=" + keyStoreName);

      keyAlias = sc.getInitParameter("TBCKeyAlias");
      if (log.isDebugEnabled())
        log.debug("TBCKeyAlias=" + keyAlias);

//    rootAlias = sc.getInitParameter("rootAlias");
//    if (log.isDebugEnabled())
//      log.debug("rootAlias=" + rootAlias);

      keyPassword = sc.getInitParameter("TBCKeyPassword");
      if (log.isDebugEnabled())
        log.debug("TBCKeyPassword=" + keyPassword);

      certStorePath = new File(ECPWorker.class.getResource(sc.getInitParameter("TBCCertStorePath")).toURI()).getAbsolutePath();
//      certStorePath = sc.getInitParameter("TBCCertStorePath");
      if (log.isDebugEnabled())
        log.debug("TBCCertStorePath=" + certStorePath);

      certStorePassword = sc.getInitParameter("TBCCertStorePassword");
      if (log.isDebugEnabled())
        log.debug("TBCCertStorePassword=" + certStorePassword);

//    CRLPath = sc.getInitParameter("CRLPath");
//    if (log.isDebugEnabled())
//      log.debug("CRLPath=" + CRLPath);
    }
  }

  private PKCS7 makePKCS7(PrivateKey privateKey, X509Certificate cert, byte[] digest) throws Exception {
    String digestAlgorithmName = "SHA1"; //"GOST3411" - "1.2.643.2.2.9";
    String elKeyAlgorithmName = "RSA";          //"1.2.643.2.2.19" ;

    String s = digestAlgorithmName + "with" + elKeyAlgorithmName;

    AlgorithmId digestAlgorithmId = AlgorithmId.get(digestAlgorithmName);

    DerValue dervalue = null;
    ContentInfo contentInfo = new ContentInfo(ContentInfo.DATA_OID, dervalue);

    X500Name x500name;
    if (cert.getIssuerDN() instanceof X500Name)
      x500name = (X500Name)cert.getIssuerDN();
    else
      try {
        x500name = new X500Name(cert.getIssuerDN().toString());
      }
      catch (IOException ioexception) {
        throw new Exception("Failed to parse signer DN. " + ioexception.getMessage());
      }
    BigInteger serial = cert.getSerialNumber();
    log.debug("privateKey.getAlgorithm()=" + privateKey.getAlgorithm());
    // ���� �� privateKey.getAlgorithm(), �� �� ���������� GOST3410, � ���� GOST3410EL
    AlgorithmId algorithmid = AlgorithmId.get(elKeyAlgorithmName);
    SignerInfo signerInfo = new SignerInfo(x500name, serial, digestAlgorithmId, algorithmid, digest);

    PKCS7 pkcs7 = new PKCS7(new AlgorithmId[] {digestAlgorithmId}, contentInfo, null, new SignerInfo[] {signerInfo});

    log.debug("PKCS7 = " + pkcs7);
    return pkcs7;
  }

//  /**
//   *
//   * @throws Exception
//   */
//  public VerifyResult verify(String xmlStr) throws Exception {
//    int ecpCode = 1;
//    String fileMask = save2file(xmlStr, null, outFolder);
//    // �������� ������ �� XML
//    if (!xmlStr.startsWith("<")) {
//      xmlStr = "<" + StringUtils.substringAfter(xmlStr, "<");
//    }
//    if (!xmlStr.startsWith("<?xml ")) {
//      xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + xmlStr;
//    }
//    InputSource source = new InputSource(new StringReader(xmlStr));
////    String encoding = getEncoding(xmlStr);
//    source.setEncoding(encoding);
//    // �������� ����������� �������������� ��������� �� ������ ������������� ������� ������
//    final DocumentBuilder documentBuilder = dbf.newDocumentBuilder();
//    /* ��������� ����������� XML-�������� �� ����� */
//    final Document doc = documentBuilder.parse(source);
//
//    /* ������ ���� ������� <ds:Signature> �� XML-��������� */
//
//    // ������ �� ������������ ��������� ����������� ������������ ����� Signature
////    final Element nscontext = doc.createElementNS(null, "namespaceContext");
////    nscontext.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:" + "ds".trim(), Constants.SignatureSpecNS);
//    Element nscontext = XMLUtils.createDSctx(doc, "ds", Constants.SignatureSpecNS);
//    // ����� �� ������������ ����������� ������������ ����� ���� ������� <ds:Signature>
//    Element sigElement = (Element) XPathAPI.selectSingleNode(doc, "//ds:Signature[1]", nscontext);
//
//    if (sigElement != null) {
//      /* �������� ������� XML-��������� �� ������ ���������� �� �������� �����, ���������� � XML-��������� */
//      Element sigVal = (Element) XPathAPI.selectSingleNode(sigElement, "//ds:SignatureValue[1]", nscontext);
//      byte[] sig = Base64.decode(sigVal);
//      byte[] newSig = null;
//      // ���� ��� ��������� � PKCS#7
//      if (sig.length > 64) {
//        PKCS7 pkcs7 = new PKCS7(sig);
//        log.debug(pkcs7);
//        SignerInfo[] signerInfos = pkcs7.getSignerInfos();
//        if ((signerInfos == null) || (signerInfos.length == 0)) {
//          throw new Exception("No signer info found.");
//        }
//        SignerInfo signer = signerInfos[0];
////        log.debug(signer.toString());
//        newSig = signer.getEncryptedDigest();
//        Element newSigVal = Base64.encodeToElement(doc, "SignatureValue", newSig);
//        sigVal.getParentNode().replaceChild(newSigVal, sigVal);
//      }
//
//      // ������������� ������� �������� �������
//      final XMLSignature signature = new XMLSignature(sigElement, "");
//      // ������ ���� <ds:KeyInfo> ���������� �� �������� �����
//      final KeyInfo ki = signature.getKeyInfo();
//      // ������ ����������� �� ���� ���������� �� �������� �����
//      final X509Certificate certKey = ki.getX509Certificate();
//
//      // ���� ���������� ������, �� �������������� �������� ������� �� ������ ����������
//      if (certKey != null) {
//        boolean check = signature.checkSignatureValue(certKey);
//        log.info("The XML signature is " + (check ? "valid (good)" : "invalid (bad)"));
//        ecpCode = check ? 0 : 2;
//        if (check) {
//          // �������� ����������� ������������
//          ecpCode = checkCert(certKey) ? 0 : 2;
//        }
//      }
//      // � ��������� ������ �������������� �������� �� �������� �����
//      else {
//        // ������ ��������� ����� �� ���� ���������� �� �������� �����
//        final PublicKey pk = ki.getPublicKey();
//        // ���� �������� ���� ������, �� �� ��� �������������� �������� �������
//        if (pk != null) {
//          boolean check = signature.checkSignatureValue(pk);
//          log.info("The XML signature is " + (check ? "valid (good)" : "invalid (bad)"));
//          ecpCode = check ? 0 : 2;
//        }
//        // � ��������� ������ �������� �� ����� ���� ���������
//        else {
//          log.warn("There are no information about public key. Verification couldn't be implemented");
//          ecpCode = 1;
//        }
//      }
//
//      // ������� �� XML ������� � ��������
//      log.debug("Removing ECP");
//      Element objElement = (Element) XPathAPI.selectSingleNode(doc, "//ds:Object[1]/*", nscontext);
//      if (objElement != null) {
//        sigElement.getParentNode().replaceChild(objElement, sigElement);
//      }
//      else {
//        log.warn("ds:Object not found");
//      }
//    }
//    else {
//      log.error("There are no information about XML signature. Verification couldn't be implemented");
//      ecpCode = 1;
//    }
//
//    // ����������� ������, � ������� �������������� ������ ������������ XML-���������
//    ByteArrayOutputStream os = new ByteArrayOutputStream();
//    // ������������� ������� ����������� ����������� XML-��������� � �����
//    final TransformerFactory tf = TransformerFactory.newInstance();
//    // �������� ������� ����������� ����������� XML-��������� � �����
//    final Transformer trans = tf.newTransformer();
//    // ����������� ����������� XML-��������� � �����
//    trans.transform(new DOMSource(doc), new StreamResult(os));
//    os.close();
//
//    save2file(os, fileMask, outFolder);
//
//    xmlStr = os.toString(encoding);
//
//    return new VerifyResult(xmlStr, ecpCode);
//  }


//  private boolean checkCert(Certificate cert) {
//    log.debug("Certificate=" + cert);
//
//    boolean res = true;
//
//    try {
//      // ������������� ��������� ���������� ������������ � ��������� ��������
//      final KeyStore keyStore = KeyStore.getInstance(keyStoreName);
//
//      // �������� ����������� ���������  � ����������� ��������� ��������
//      keyStore.load(new BufferedInputStream(new FileInputStream(certStorePath)), certStorePassword.toCharArray());
//
//      Certificate rootCert = keyStore.getCertificate(rootAlias);
//      log.trace("rootCert=" + rootCert);
//      if (rootCert == null) {
//        String msg = "Root Certificate [" + rootAlias + "] not found in keystore [" + keyStoreName + "]";
//        log.error(msg);
//        throw new KeyStoreException(msg);
//      }
//
//      //���������� ������� �� ����������� ������������, ������� � ��������� �����������
//      //(� ������ rootAlias) � ���������� ������������ ��������� ����� cert
//
//      // ����������� ������ ������������, �� ������� �������������� ���������� �������
//      ArrayList<Certificate> certs = new ArrayList<Certificate> ();
//      certs.add(cert);
//
//      Enumeration<String> en = keyStore.aliases();
//      while (en.hasMoreElements()) {
//        String alias = en.nextElement();
//        log.debug(alias);
//        certs.add(keyStore.getCertificate(alias));
//      }
//
//      // ����������� ���������� ������������ ��������� ������������,
//      // � ������� ������������ ��� ������������ � ���������� ������� �����������
//      final CollectionCertStoreParameters par = new CollectionCertStoreParameters(certs);
//      // �������� ������������ ��������� ������������ �� ������ ����������, ������������ ������� ������������
//      final CertStore store = CertStore.getInstance("Collection", par);
//
//      // ����������� ��������� ����������� (� �������� ���������� ���������� �������)
//      final TrustAnchor anchor = new TrustAnchor( (X509Certificate) rootCert, null);
//
//      // ������������� ������� ������� �����������, ������� ������������� ���������� �������
//      final X509CertSelector selector = new X509CertSelector();
//      // ����������� �����������, ������� ������������� ���������� �������
//      selector.setCertificate( (X509Certificate) cert);
//
//      // ������������� ���������� ���������� ������� ������������
//      final PKIXBuilderParameters params = new PKIXBuilderParameters(Collections.singleton(anchor), new X509CertSelector());
//      // ���������� � ���������� ������������, �� ������� ����� ��������� �������
//      params.addCertStore(store);
//      params.setTargetCertConstraints(selector);
//
//      //  === �� ��������� CRL ===
////      params.setRevocationEnabled(false);
//
//      //  === ������ �������� �� URL �� ����������� CRLDistributionPoints ===
////      params.setRevocationEnabled(true);
////      System.setProperty("com.sun.security.enableCRLDP", "true");
//
//      //  === ���������� ���� ������  �� ����� ===
//      params.setRevocationEnabled(true);
//      CertificateFactory cf = CertificateFactory.getInstance("X.509");
//
//      FileSystemManager fsManager = VFS.getManager();
//      FileObject CRLFile = fsManager.resolveFile(CRLPath);
//      FileContent fc = CRLFile.getContent();
//      // ��� �������������� ������ �� �������� � ���������� HTTP
//      ByteArrayOutputStream bos = new ByteArrayOutputStream();
//      InputStream is = fc.getInputStream();
//      int i;
//      while ((i = is.read()) >= 0) {
//        bos.write(i);
//      }
//      is.close();
//      ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
//
//      Collection crls = cf.generateCRLs(bis);
//      log.debug(new ToStringBuilder(this).append("crl list", crls).toString());
//      final CollectionCertStoreParameters CRLpar = new CollectionCertStoreParameters(crls);
//      final CertStore CRLstore = CertStore.getInstance("Collection", CRLpar);
//      params.addCertStore(CRLstore);
//      //  ===  ===
//
//      // ������������� ������� ���������� ������� ������������
//      final CertPathBuilder cpb = CertPathBuilder.getInstance("PKIX");
//      //��� ��� ������������� � ��������� ��
//      //CertPathBuilder cpb = CertPathBuilder.getInstance("CPPKIX");
//
//      // ���������� ������� ������������
//      final PKIXCertPathBuilderResult chain = (PKIXCertPathBuilderResult) cpb.build(params);
//
//      /* �������� ����������� ������� ������������ */
//
//      // ������������� ������� �������� ������� ������������
//      final CertPathValidator validator = CertPathValidator.getInstance("PKIX");
//      //��� ��� ������������� � ��������� ��
//      //CertPathValidator validator = CertPathValidator.getInstance("CPPKIX");
//
//      // �������� ������� ������������
//      final CertPathValidatorResult val_res = validator.validate(chain.getCertPath(), params);
//      // ����� ���������� �������� � ������� ����
//      log.trace(val_res.toString());
//      log.info("Cert is valid");
//    }
//    catch (Exception ex) {
//      res = false;
//      log.error(ex.getMessage(), ex);
//    }
//    return res;
//  }

//  public static void main(String[] args) {
//    try {
//      ECPWorker ecpw = new ECPWorker();
//
////      DataHandler dh1 = new DataHandler(new FileDataSource(/*"in/20090623200925_out_35281.xml"*/"PI_RwInformation.xml"/*"envelop.xml"*/));
////      ByteArrayOutputStream os1 = new ByteArrayOutputStream();
////      dh1.writeTo(os1);
////      String xmlStr = os1.toString("utf-8");
////
////      log.debug("");
////      log.debug("=========================================== SIGN ===========================================");
////      log.debug("");
////
////      ecpw.sign(xmlStr);
//
//      String signFile = "data.xml";
//      DataHandler dh2 = new DataHandler(new FileDataSource(signFile));
//      ByteArrayOutputStream os2 = new ByteArrayOutputStream();
//      dh2.writeTo(os2);
//      String xmlStr = os2.toString("utf-8");
//
//      log.debug("");
//      log.debug("========================================== VERIFY ==========================================");
//      log.debug("");
//
//      ecpw.verify(xmlStr);
//
//    }
//    catch (Exception e) {
//      e.printStackTrace();
//    }
//
//  }

  static protected SAXParser getSAXParser() {
    SAXParserFactory saxParserFactory = SAXParserFactory.newInstance();
    if(saxParserFactory == null) {
      return null;
    }
    SAXParser saxParser = null;
    try {
      saxParser = saxParserFactory.newSAXParser();
    }
    catch(Exception e) {
    }
    return saxParser;
  }

  private String save2file(String str, String mask, String folder) throws IOException, URISyntaxException {
    ByteArrayOutputStream bos = new ByteArrayOutputStream();
    bos.write(str.getBytes(encoding));
    return save2file(bos, mask, folder);
  }

  private String save2file(ByteArrayOutputStream bos, String mask, String folder) throws IOException, URISyntaxException {
    String tmpPath = new File(new URI(ECPWorker.class.getResource("/").toString())).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      tmpDir.mkdirs();
    }

    String newMask = mask == null ? new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()) : mask;
    File file = File.createTempFile(newMask + "_" + (mask == null ? "in" : "out") + "_", ".xml", tmpDir);
    log.debug("Output file = " + file.getName());
    BufferedOutputStream os = new BufferedOutputStream(new FileOutputStream(file));
    bos.writeTo(os);
    os.close();

//    signFile = file.getAbsolutePath();

    return newMask;
  }

  public TKServer.SendMessageResult sendMessage(java.lang.String xmlString, int status) throws java.rmi.RemoteException {
    log.debug("xmlString=" + xmlString + ", status=" + status);
    return new TKServer.SendMessageResult(0, "Ok");
  }

  public class VerifyResult {
    private String xmlStr;
    private int ecpCode;

    public VerifyResult() {
    }

    public VerifyResult(String xmlStr, int ecpCode) {
      this.xmlStr = xmlStr;
      this.ecpCode = ecpCode;
    }

    public String getXmlStr() {
      return xmlStr;
    }

    public void setXmlStr(String xmlStr) {
      this.xmlStr = xmlStr;
    }

    public int getEcpCode() {
      return ecpCode;
    }

    public void setEcpCode(int ecpCode) {
      this.ecpCode = ecpCode;
    }
  }

/*
  private static String getEncoding(String text) {
      String result = null;

      String xml = text.trim();

      if (xml.startsWith("<?xml")) {
          int end = xml.indexOf("?>");
          String sub = xml.substring(0, end);
          StringTokenizer tokens = new StringTokenizer(sub, " =\"\'");

          while (tokens.hasMoreTokens()) {
              String token = tokens.nextToken();

              if ("encoding".equals(token)) {
                  if (tokens.hasMoreTokens()) {
                      result = tokens.nextToken();
                  }

                  break;
              }
          }
      }

      return result;
  }
*/
/*
  private static Element createDSctx(Document doc, String prefix, String namespace) {

    if ((prefix == null) || (prefix.trim().length() == 0)) {
        throw new IllegalArgumentException("You must supply a prefix");
    }

    Element ctx = doc.createElementNS(null, "namespaceContext");

    ctx.setAttributeNS(Constants.NamespaceSpecNS, "xmlns:" + prefix.trim(), namespace);

    return ctx;
}
*/
}

