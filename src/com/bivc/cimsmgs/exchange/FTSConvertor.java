package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import javax.xml.rpc.ServiceException;
import java.io.StringReader;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.net.MalformedURLException;
import java.rmi.RemoteException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.apache.commons.lang3.StringUtils.isBlank;

/* Статусы для CimSmgs.ftsStatus
   25 - новый
   27 - отправлен
   28 - получен
   29 - обработан
   30 - получен ftsNomer
   31 - отправлен повторно
   32 - отмена
*/

public class FTSConvertor extends Convertor {

  final static private Logger log = LoggerFactory.getLogger(FTSConvertor.class);

  private static String sender = "000";
  private static final String encoding = "utf-8";
  private static final String folder = "FTS_Failed";
  private static final String TRASH = "TRASH";
  private static final String PROCESSED = "PROCESSED";
  private static final DecimalFormat pnf = new DecimalFormat("000000000");
  private static final SimpleDateFormat df3 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

  private static final String OKCode = "00.00000.00";
  private static final String OKDesc = "Сообщение успешно обработано.";

  private static final String BadECPCode = "01.00051.01";
  private static final String BadECPDesc = "Некорректная ЭЦП.";

  private static final String BadCertCode = "01.00052.01";
  private static final String BadCertDesc = "Ошибка проверки сертификата.";

  private String transportServer = null;
  private String senderInformation = "smtp://eps.customs.ru/stmmt.infodek";
  private String receiverInformation = "smtp://eps.customs.ru/gateway";
  private String softVersion = "5.0.5/3.0.3";
  private String participantID = "1027739048482";

  private static TreeMap<String, String> subjs = new TreeMap<String, String>();

  static {
    subjs.put("VMIITDEX CFM", "3");
    subjs.put("VMIITDEX CFMВ", "4");
    subjs.put("VMIITDEX NOTCFMD", "5");

    df3.setTimeZone(TimeZone.getTimeZone("GMT"));  // время надо передавать в UTC
  }

    public FTSConvertor() {
      transportServer = "";
    }

    public FTSConvertor(ServletContext sc) {
    transportServer = sc.getInitParameter("transportServer");

    String str = sc.getInitParameter("senderInformation");
    if (StringUtils.isNotBlank(str))
      senderInformation = str;

    str = sc.getInitParameter("receiverInformation");
    if (StringUtils.isNotBlank(str))
      receiverInformation = str;

    str = sc.getInitParameter("SoftVersion");
    if (StringUtils.isNotBlank(str))
      softVersion = str;

    str = sc.getInitParameter("ParticipantID");
    if (StringUtils.isNotBlank(str))
      participantID = str;
  }

  public void send(Long csHid, Usr usr) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId = -1;

    try {
      if (transportServer == null) {
        throw new Exception("Адрес сервера ФТС не определен");
      }

      session = HibernateUtil.getSession();

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csHid);
      if (cs != null) {
        log.debug("Found document with HID=" + cs.getHid() + " and TYPE=" + cs.getType());
        String docId = cs.getFtsDocId();
        Date curDate = new Date();
        String[] res = getText(cs, docId, curDate);
        log.debug(res[1] + " : " + res[0]);

        sendSoap(res[0]);

        FtsLog fl = new FtsLog();
        fl.setHid_src(csHid);
        fl.setIn_out((byte) 2);
        fl.setXml(res[0]);
        fl.setDoc_id(res[1]);
        fl.setMessage_type(res[2]);
        fl.setDoc_date(curDate);
        session.save(fl);

        byte status = (byte)(docId == null ? 27 : 31);
        String query = "UPDATE CimSmgs cs SET cs.ftsStatus=:status WHERE cs.hid=:id";
        Query q = session.createQuery(query);
        q.setByte("status", status);
        q.setLong("id", cs.getHid());
        q.executeUpdate();

        session.save(new Status(null, new StatusDir(new BigDecimal(status)), cs.getPackDoc(), usr,
                                /*new DocDir(Constants.buildDoctype(cs.getType()))*/ new DocDir(cs.getDocType1()), curDate, cs.getHid()));

//        tx.commit();
      }
      else {
        throw new Exception("Перевозочный документ не найден (hid = " + csHid + ")");
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
//      tx.rollback();
//      session.clear();
      throw e;
    }
  }

  private void sendSoap(String xmlStr) throws ServiceException, MalformedURLException, RemoteException {
    log.debug("Send to " + transportServer);
    Service service = new Service();
    Call call = (Call) service.createCall();
    call.setTargetEndpointAddress(new java.net.URL(transportServer));
    call.setOperationName(new QName("ECPServer", "sign"));
    call.addParameter("xmlStr", XMLType.XSD_STRING, ParameterMode.IN);
    call.setReturnType(XMLType.AXIS_VOID);
    call.setTimeout(new Integer(5*60*1000));
//          if (forwardUser != null && forwardPass != null) {
//          //  *** HTTP Авторизация для org.apache.axis.transport.http.HTTPSender
//             call.setUsername(forwardUser);
//             call.setPassword(forwardPass);
//          }
    call.invoke(new Object[] {xmlStr});
  }

  private Element makeHeader(String oldDocId, String docId, String messType, String customCode, Date curDate) {
    Document doc = DocumentHelper.createDocument();
    doc.setXMLEncoding(encoding);

    Element root = doc.addElement("Envelope")
            .addNamespace("roi", "urn:customs.ru:Envelope:RoutingInf:1.0")
            .addNamespace("app", "urn:customs.ru:Envelope:ApplicationInf:1.0")
            .addNamespace("edhead", "urn:customs.ru:Envelope:EDHeader:2.0")
            .addNamespace("", "http://www.w3.org/2001/06/soap-envelope")
            .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance");

    Element header = root.addElement("Header", "http://www.w3.org/2001/06/soap-envelope");
    Element roi = header.addElement("roi:RoutingInf");
    roi.addElement("roi:EnvelopeID").addText(docId);
    if (oldDocId != null) {
      roi.addElement("roi:InitialEnvelopeID").addText(oldDocId);
    }
    roi.addElement("roi:SenderInformation").addText(senderInformation);
    roi.addElement("roi:ReceiverInformation").addText(receiverInformation);
    roi.addElement("roi:PreparationDateTime").addText(df3.format(curDate));

    Element app = header.addElement("app:ApplicationInf");
    app.addElement("app:SoftVersion").addText(softVersion);

    Element edhead = header.addElement("edhead:EDHeader");
    edhead.addElement("edhead:MessageType").addText(messType);
    edhead.addElement("edhead:ParticipantID").addText(participantID);
    Element rcvCustom = edhead.addElement("edhead:ReceiverCustoms");
    rcvCustom.addElement("edhead:CustomsCode").addText(customCode);
    rcvCustom.addElement("edhead:ExchType").addText("92410");

    Element body = root.addElement("Body", "http://www.w3.org/2001/06/soap-envelope");

    return body;
  }

  protected String[] getText(CimSmgs cs, String oldDocId, Date curDate) throws Exception {
    CimSmgsCarList csc = null;
    Collection<CimSmgsCarList> carCol = cs.getCimSmgsCarLists().values();
    if (!carCol.isEmpty()) {
      csc = carCol.iterator().next();
    }

    CimSmgsKonList csk = null;
    if (csc != null) {
      Collection<CimSmgsKonList> konCol = csc.getCimSmgsKonLists().values();
      if (!konCol.isEmpty()) {
        csk = konCol.iterator().next();
      }
    }
    else {
      log.error("VAG not found in CimSmgs(" + cs.getHid() + ")");
      throw new Exception("В накладной отсутствует вагон");
    }

    String customCode = cs.getRoute().getCustomCode();
    if (StringUtils.isBlank(customCode)) {
      log.error("Custom code not set for route " + cs.getRoute().getName() + "(" + cs.getRoute().getHid() + ")");
      throw new Exception("Не задан код таможни для данного маршрута");
    }

    String docId = UUID.randomUUID().toString();

    String messType = isBlank(oldDocId) ? "CMN.12015" : "CMN.12016";
    Element body = makeHeader(oldDocId, docId, messType, customCode, curDate);

    Element arrive = body.addElement("PI_RwArrive")
            .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.0.3")
            .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
            .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.0.3")
            .addNamespace("", "urn:customs.ru:Information:PriorInformation:PI_RWArrive:5.0.5")
            .addNamespace("catpi_ru", "urn:customs.ru:Information:PriorInformation:PriorCommonAggregateTypes:5.0.5")
            .addNamespace("cltpi_ru", "urn:customs.ru:Information:PriorInformation:PriorCommonLeafTypes:5.0.5")
            .addAttribute("DocumentModeID", "1006815E");

    arrive.addElement("cat_ru:DocumentID").addText(docId);
    if (oldDocId != null) {
      arrive.addElement("cat_ru:RefDocumentID").addText("oldDocId");
      arrive.addElement("PI_URN").addText(format(cs.getFtsNomer()));
    }

    Element train = arrive.addElement("Train", "urn:customs.ru:Information:PriorInformation:PI_RWArrive:5.0.5");
    train.addElement("TrainNumber").addText(format(cs.getNpoezd()));
    train.addElement("TrainIndex").addText(format(cs.getIndex_p()));
    train.addElement("PPVNumber").addText(format(cs.getN_ppv()));
    if (cs.getDprb() != null) {
      train.addElement("ArrivalDate").addText(format(cs.getDprb(), df3));
    }
    Element wagon = train.addElement("Wagon");
    wagon.addElement("WagonNumber").addText(format(csc.getNvag()));
    String ksto = cs.getG17();
    if (isBlank(ksto)) {
      ksto = cs.getG692();
    }
    wagon.addElement("DepartureStation").addText(format(ksto));
    wagon.addElement("DestinationStation").addText(format(cs.getG121()));
    BigDecimal mnet = null;
    if (csk != null) {
      mnet = csk.getMassSend();
      if (mnet == null) {
        mnet = cs.getG24N();
      }
    }
    if (mnet != null) {
      wagon.addElement("GoodsWeightQuantity").addText(format(mnet.toString()));
    }
    boolean isEpmty = mnet == null || mnet.compareTo(BigDecimal.ZERO) == 0;
    wagon.addElement("EmptyIndicator").addText(Boolean.toString(isEpmty));
    if (csk != null) {
      wagon.addElement("ContainerNumbers").addText(format(csk.getUtiN()));
    }
    wagon.addElement("WagonNumeric").addText("1");

    Element goodsship = arrive.addElement("GoodsShipment", "urn:customs.ru:Information:PriorInformation:PI_RWArrive:5.0.5");
    goodsship.addElement("WagonNumbers").addText(format(csc.getNvag()));
    goodsship.addElement("DepartureStation").addText(format(ksto));
    goodsship.addElement("ContainerIndicator").addText(Boolean.toString(csk != null));
    goodsship.addElement("SMGSNumber").addText(format(cs.getG694()));
    goodsship.addElement("DestinationStation").addText(format(cs.getG121()));

    Set<CimSmgsInvoice> invSet = cs.getPackDoc().getCsInvoices();
    if (invSet.isEmpty()) {
      log.error("Invoice not found for CimSmgs (" + cs.getHid() + ")");
      throw new Exception("Отсутствует информация об инвойсах");
    }
    Element goods = goodsship.addElement("Goods");
    int goodsNum = 1;
    for (CimSmgsInvoice inv : invSet) {
      for (CimSmgsInvoiceGruz invGruz : inv.getInvoiceGruzs().values()) {
        goods.addElement("catpi_ru:GoodsNumeric").addText(String.valueOf(goodsNum));
        goods.addElement("catpi_ru:GoodsTNVEDCode").addText(format(invGruz.getTnved()));
        goods.addElement("catpi_ru:GoodsDescription").addText(format(invGruz.getNzgr()));
        goods.addElement("catpi_ru:GrossWeightQuantity").addText(format(invGruz.getMbrt()));
        goods.addElement("catpi_ru:NetWeightQuantity").addText(format(invGruz.getMnet()));
        goods.addElement("catpi_ru:ContainerNumbers").addText(format(csk.getUtiN()));
        goods.addElement("catpi_ru:InvoicedCost").addText(format(invGruz.getItogo()));
        goods.addElement("catpi_ru:CurrencyCode").addText(format(inv.getCux()));
        Element goodsMea = goods.addElement("catpi_ru:GoodsMeasureQuantity");
        goodsMea.addElement("catpi_ru:GoodsQuantity").addText(format(invGruz.getKole()));
        goodsMea.addElement("catpi_ru:MeasureUnitQualifierName").addText(format(invGruz.getEizm()));
        Element goodsPack = goods.addElement("catpi_ru:GoodsPackaging");
        goodsPack.addElement("catpi_ru:PakageQuantity").addText(format(invGruz.getKolm()));
        goodsPack.addElement("catpi_ru:CargoCode").addText(format(invGruz.getNzyp()));
      }
    }

    Element consignor = goodsship.addElement("Consignor");
    consignor.addElement("cat_ru:OrganizationName").addText(format(cs.getG1r()));
    Element addr_o = consignor.addElement("Address");
    addr_o.addElement("catpi_ru:PostalCode").addText(format(cs.getG17_1()));
    addr_o.addElement("catpi_ru:CountryCode").addText(format(cs.getG15_1()));
    addr_o.addElement("catpi_ru:CounryName").addText(format(cs.getG16r()));
    addr_o.addElement("catpi_ru:City").addText(format(cs.getG18r_1()));
    addr_o.addElement("catpi_ru:StreetHouse").addText(format(cs.getG19r()));

    Element consignee = goodsship.addElement("Consignee");
    consignee.addElement("cat_ru:OrganizationName").addText(format(cs.getG4r()));
    Element addr_p = consignee.addElement("Address");
    addr_p.addElement("catpi_ru:PostalCode").addText(format(cs.getG47_1()));
    addr_p.addElement("catpi_ru:CountryCode").addText(format(cs.getG45_1()));
    addr_p.addElement("catpi_ru:CounryName").addText(format(cs.getG46r()));
    addr_p.addElement("catpi_ru:City").addText(format(cs.getG48r()));
    addr_p.addElement("catpi_ru:StreetHouse").addText(format(cs.getG49r()));

    Element PIoutDestination = goodsship.addElement("PIoutDestination");
    PIoutDestination.addElement("catpi_ru:DestinationRWStationCode").addText(format(cs.getG121()));
    PIoutDestination.addElement("catpi_ru:DestinationRWStationName").addText(format(cs.getG101r()));
    Element addr_n = PIoutDestination.addElement("Address");
    addr_n.addElement("catpi_ru:PostalCode");
    addr_n.addElement("catpi_ru:CountryCode");
    addr_n.addElement("catpi_ru:CounryName");
    addr_n.addElement("catpi_ru:City");
    addr_n.addElement("catpi_ru:StreetHouse");

//    Element destinationCountry = goodsship.addElement("DestinationCountry");

//    Element dispatchCountry = goodsship.addElement("DispatchCountry");

    Document doc = body.getDocument();
//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return new String[] {text, docId, messType};
  }

  public int receive(String xmlStr, int status) {
    Session session = null;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      SAXReader reader = new SAXReader(false);
      Document document = reader.read(new StringReader(xmlStr));

      String docDateStr = document.valueOf("//*[namespace-uri()='urn:customs.ru:Envelope:RoutingInf:1.0' and local-name()='PreparationDateTime']");
      Date docDate = null;
      try {
        docDate = df3.parse(docDateStr);
      }
      catch (Exception ex) {
        log.warn("Not parsable string " + docDateStr);
      }
      String envId = document.valueOf("//*[namespace-uri()='urn:customs.ru:Envelope:RoutingInf:1.0' and local-name()='EnvelopeID']");
      String refEnvId = document.valueOf("//*[namespace-uri()='urn:customs.ru:Envelope:RoutingInf:1.0' and local-name()='InitialEnvelopeID']");
      String messType = document.valueOf("//*[namespace-uri()='urn:customs.ru:Envelope:EDHeader:2.0' and local-name()='MessageType']");
      String customCode = document.valueOf("//*[namespace-uri()='urn:customs.ru:Envelope:EDHeader:2.0' and local-name()='SenderCustoms']" +
                                           "/*[namespace-uri()='urn:customs.ru:Envelope:EDHeader:2.0' and local-name()='CustomsCode']");

      Node body = document.selectSingleNode("//*[namespace-uri()='http://www.w3.org/2001/06/soap-envelope' and local-name()='Body']");
      String docId = body.valueOf("//*[local-name()='DocumentID']");
      String refDocId = body.valueOf("//*[local-name()='RefDocumentID']");
      String resCode = body.valueOf("//*[local-name()='Response']/*[local-name()='ResultInformation']/*[local-name()='ResultCode']");
      String resDesc = body.valueOf("//*[local-name()='Response']/*[local-name()='ResultInformation']/*[local-name()='ResultDescription']");
      String regId = null;
      String regStatus = null;
      if ("CMN.12002".equals(messType) || "CMN.12003".equals(messType)) {
        regId = body.valueOf("//*[local-name()='Response']/*[local-name()='PI_DocResult']/*[local-name()='PI_RegID']");
        regStatus = body.valueOf("//*[local-name()='Response']/*[local-name()='PI_DocResult']/*[local-name()='PI_Status']");
      }
      if (isBlank(docId)) {
        docId = envId;
        refDocId = refEnvId;
      }

      Long hidSrc = null;
      Query q = session.createQuery("FROM FtsLog AS t WHERE t.in_out=2 AND t.doc_id=:id ORDER BY t.hid DESC");
      q.setString("id", refDocId);
      Iterator<FtsLog> oldLogIt = q.iterate();
      if (oldLogIt.hasNext())
        hidSrc  = oldLogIt.next().getHid_src();

      FtsLog fl = new FtsLog();
      fl.setIn_out((byte) 1);
      fl.setDoc_date(docDate);
      fl.setMessage_type(messType);
      fl.setDoc_id(docId);
      fl.setRef_doc_id(refDocId);
      fl.setRes_code(resCode);
      fl.setRes_descr(resDesc);
      fl.setHid_src(hidSrc);
      fl.setReg_id(regId);
      fl.setXml(xmlStr);
      fl.setReg_status(regStatus);
      fl.setEcp_res((byte)status);
      session.save(fl);

      if (status != 0) {
        Date curDate = new Date();
        String[] res = make00001(docId, customCode, curDate, status);

        sendSoap(res[0]);

        FtsLog fl4 = new FtsLog();
        fl4.setIn_out((byte) 2);
        fl4.setDoc_date(curDate);
        fl4.setMessage_type(res[2]);
        fl4.setDoc_id(res[1]);
        fl4.setRef_doc_id(docId);
        if (status == 2) {
          fl4.setRes_code(BadECPCode);
          fl4.setRes_descr(BadECPDesc);
        }
        else if (status == 1) {
          fl4.setRes_code(BadCertCode);
          fl4.setRes_descr(BadCertDesc);
        }
        fl4.setHid_src(hidSrc);
        fl4.setXml(res[0]);
        session.save(fl4);
      }
      else {
        if (hidSrc != null) {
          CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, hidSrc);
          if ("CMN.00002".equals(messType)) {
            cs.setFtsStatus((byte)28);
          }
          else if ("CMN.00004".equals(messType)) {
            cs.setFtsStatus((byte)(Byte.valueOf((byte)35).equals(cs.getFtsStatus()) ? 32 :29));
            cs.setFtsDocId(refDocId);
          }
          else if ("CMN.00001".equals(messType) || "CMN.12003".equals(messType) || "CMN.12006".equals(messType) ||
                   "CMN.12008".equals(messType) || "CMN.12009".equals(messType)) {
            cs.setFtsStatus((byte)34);
          }
          else if ("CMN.12002".equals(messType) || "CMN.12005".equals(messType)) {
            cs.setFtsStatus((byte)30);
            cs.setFtsNomer(regId);
          }
          session.save(cs);

          session.save(new Status(null, new StatusDir(new BigDecimal(cs.getFtsStatus())), cs.getPackDoc(),
                       (Usr)session.get(Usr.class, "fts_robot"), new DocDir(cs.getDocType1())/*new DocDir(Constants.buildDoctype(cs.getType()))*/, new Date(), cs.getHid()));

          if ("CMN.12002".equals(messType) || "CMN.12003".equals(messType) || "CMN.12005".equals(messType) ||
              "CMN.12006".equals(messType) || "CMN.12008".equals(messType) || "CMN.12009".equals(messType)) {
            Date curDate = new Date();
            String[] res = make00004(docId, customCode, curDate);

            sendSoap(res[0]);

            FtsLog fl4 = new FtsLog();
            fl4.setIn_out((byte) 2);
            fl4.setDoc_date(curDate);
            fl4.setMessage_type(res[2]);
            fl4.setDoc_id(res[1]);
            fl4.setRef_doc_id(docId);
            fl4.setRes_code(OKCode);
            fl4.setRes_descr(OKDesc);
            fl4.setHid_src(hidSrc);
            fl4.setXml(res[0]);
            session.save(fl4);
          }
        }
      }

      tx.commit();
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      if (tx != null)
        tx.rollback();
      if (session != null)
        session.clear();
    }
    /*finally {
      if (session != null) {
        session.close();
      }
    }*/

    return 0;
  }

  protected String[] make00004(String oldDocId, String customCode, Date curDate) throws Exception {
    String docId = UUID.randomUUID().toString();

    String messType = "CMN.00004";
    Element body = makeHeader(oldDocId, docId, messType, customCode, curDate);

    Element result = body.addElement("Result")
//            .addNamespace("catExch_ru", "urn:customs.ru:Information:ExchangeDocuments:ExchangeCommonAggregateTypes:5.0.3")
//            .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.0.3")
            .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.0.3")
//            .addNamespace("cltExch_ru", "urn:customs.ru:Information:ExchangeDocuments:ExchangeCommonLeafTypes:4.2.0")
//            .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
            .addNamespace("", "urn:customs.ru:Information:ExchangeDocuments:Result:5.0.5")
            .addAttribute("DocumentModeID", "1004054E");

    result.addElement("cat_ru:DocumentID").addText(docId);
    result.addElement("cat_ru:RefDocumentID").addText(oldDocId);
    Element responce = result.addElement("Response", "urn:customs.ru:Information:ExchangeDocuments:Result:5.0.5");
    responce.addElement("RefDocumentID").addText(oldDocId);
    Element resInfo = responce.addElement("RefDocumentID");
    resInfo.addElement("ResultCode").addText(OKCode);
    resInfo.addElement("ResultDescription").addText(OKDesc);

    Document doc = body.getDocument();
//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return new String[] {text, docId, messType};
  }

  protected String[] make00001(String oldDocId, String customCode, Date curDate, int ecpStatus) throws Exception {
    String docId = UUID.randomUUID().toString();

    String messType = "CMN.00001";
    Element body = makeHeader(oldDocId, docId, messType, customCode, curDate);

    Element result = body.addElement("Result")
//            .addNamespace("catExch_ru", "urn:customs.ru:Information:ExchangeDocuments:ExchangeCommonAggregateTypes:5.0.3")
//            .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.0.3")
            .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.0.3")
//            .addNamespace("cltExch_ru", "urn:customs.ru:Information:ExchangeDocuments:ExchangeCommonLeafTypes:4.2.0")
//            .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
            .addNamespace("", "urn:customs.ru:Information:ExchangeDocuments:Result:5.0.5")
            .addAttribute("DocumentModeID", "1004054E");

    result.addElement("cat_ru:DocumentID").addText(docId);
    result.addElement("cat_ru:RefDocumentID").addText(oldDocId);
    Element responce = result.addElement("Response", "urn:customs.ru:Information:ExchangeDocuments:Result:5.0.5");
    responce.addElement("RefDocumentID").addText(oldDocId);
    Element resInfo = responce.addElement("RefDocumentID");
    if (ecpStatus == 2) {
      resInfo.addElement("ResultCode").addText(BadECPCode);
      resInfo.addElement("ResultDescription").addText(BadECPDesc);
    }
    else if (ecpStatus == 1) {
      resInfo.addElement("ResultCode").addText(BadCertCode);
      resInfo.addElement("ResultDescription").addText(BadCertDesc);
    }
    else {
      log.error("Unknown ECP check status");
      throw new Exception("Неизвестный код проверки ЭЦП");
    }

    Document doc = body.getDocument();
//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return new String[] {text, docId, messType};
  }

  protected String[] make12007(String oldDocId, String customCode, Date curDate, String regId) throws Exception {
    String docId = UUID.randomUUID().toString();

    String messType = "CMN.12007";
    Element body = makeHeader(oldDocId, docId, messType, customCode, curDate);

    Element delete = body.addElement("ReqPI_Delete")
            .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.0.3")
//            .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.0.3")
//            .addNamespace("catpi_ru", "urn:customs.ru:Information:PriorInformation:PriorCommonAggregateTypes:5.0.5")
//            .addNamespace("cltpi_ru", "urn:customs.ru:Information:PriorInformation:PriorCommonLeafTypes:5.0.5")
//            .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
            .addNamespace("", "urn:customs.ru:Information:PriorInformation:ReqPI_Delete:5.0.5")
            .addAttribute("DocumentModeID", "1006806E");

    delete.addElement("cat_ru:DocumentID").addText(docId);
    delete.addElement("cat_ru:RefDocumentID").addText(oldDocId);
    delete.addElement("PI_RegID").addText(regId);

    Document doc = body.getDocument();
//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return new String[] {text, docId, messType};
  }

}
