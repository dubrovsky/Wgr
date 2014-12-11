package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.*;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.io.File;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.*;

public class TDGConvertor extends Convertor {

  final static public String ENCODING = "utf-8";

  final static private String RWB_TYPE = "RWB.CFG.XML";
  final static private String INV_TYPE = "invoice.cfg.xml";
  final static private String TDG_FOLDER = "tdg_out";
  final static private String STATUS_FILE = "tdg_states.xml";
  final static private Logger log = LoggerFactory.getLogger(TDGConvertor.class);

  static private TreeMap<Integer, String> statesMap = new TreeMap<Integer, String>();

  private TDGClient client;

  static {
    try {
      SAXReader reader = new SAXReader(false);
      Document doc = reader.read(TDGConvertor.class.getResourceAsStream("/" + STATUS_FILE));
      @SuppressWarnings("unchecked")
      List<Node> nodes = doc.selectNodes("/states/pkgstate");
      for (Node n : nodes) {
        String id = n.valueOf("@id");
        String name = n.valueOf("name");
        try {
          statesMap.put(Integer.valueOf(id), name);
        }
        catch (Exception ex) {
          log.warn("Bad status \"" + id + "\"");
        }

        }
    }
    catch (DocumentException e) {
      log.error("File " + STATUS_FILE + " not found or read error");
    }
  }

  public enum TdgDir {

    FTS("2", "tdg_status1") {
    },

    PORTAL("1", "tdg_status2") {
    };

    private String dir;
    private String statusCol;
    private Byte goodStatus = (byte)46;
    private Byte badStatus = (byte)47;

    private TdgDir(String dir, String statusCol) {
      this.dir = dir;
      this.statusCol = statusCol;
    }

    String getDir() {
      return this.dir;
    }

    String getStatusCol() {
      return statusCol;
    }

    Byte getGoodStatus() {
      return goodStatus;
    }

    Byte getBadStatus() {
      return badStatus;
    }

  }

  public TDGConvertor(String serverURL, String user, String passwd) {
    client = new TDGClient(serverURL, user, passwd);
  }

  public TDGConvertor(ServletContext sc) throws Exception {
    String serverURL = sc.getInitParameter("TDGServer");
    if (log.isDebugEnabled()) log.debug("TDGServer=" + serverURL);

    String user = sc.getInitParameter("TDGAccount");
    if (log.isDebugEnabled()) log.debug("TDGAccount=" + user);

    String passwd = sc.getInitParameter("TDGPassword");
    if (log.isDebugEnabled()) log.debug("TDGPassword=" + passwd);

    if (StringUtils.isBlank(serverURL)) {
      final String mes = "ServerURL not defined in web.xml";
      log.error(mes);
      throw new Exception (mes);
    }
    client = new TDGClient(serverURL, user, passwd);
  }

  public void sendPackage(Long csId, TdgDir dir) throws Exception {
    Session session = null;
    Transaction tx = null;
    String oldPid = null;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csId);
      if (cs != null) {
//        List list = null;
//        if (cs.getKind() != null && cs.getKind() == 1 && StringUtils.isNotBlank(cs.getNpoezd())) {
//          list = session.createQuery("from CimSmgsCarList AS car WHERE car.cimSmgs.npoezd=:a AND car.cimSmgs.docType1=:b AND car.cimSmgs.kind=0")
//                  .setParameter("a", cs.getNpoezd())
//                  .setParameter("b", cs.getDocType1())
//                  .list();
//        }

        Iterator it = session.createQuery("SELECT t.pid FROM TdgLog AS t WHERE t.hid_cs=:p AND t.dir=:d ORDER BY t.hid DESC")
              .setLong("p", cs.getHid())
              .setString("d", dir.getDir())
              .iterate();
        if (it.hasNext()) {
          oldPid = (String)it.next();
        }

        String pid = client.postPackage(oldPid, dir.getDir());

        String text = getRWBText(cs);
        save2file(text, TDG_FOLDER + File.separator + pid, ENCODING, "RWB_", ".xml");
        client.postDocument(RWB_TYPE, text);

        List<CimSmgsInvoice> list = null;
//        if (cs.getKind() != null && cs.getKind() == 1 && StringUtils.isNotBlank(cs.getNpoezd())) {
//          list = session.createQuery("from CimSmgsInvoice AS inv WHERE inv.packDoc in (SELECT cs.packDoc FROM CimSmgs AS cs WHERE cs.npoezd=:a AND cs.docType1=:b AND cs.kind=0)")
//                  .setParameter("a", cs.getNpoezd())
//                  .setParameter("b", cs.getDocType1())
//                  .list();
//        }


        for (CimSmgsInvoice inv : ( list != null && list.size() > 0 ? list : cs.getPackDoc().getCsInvoices())) {
          text = getInvoiceText(inv);
          save2file(text, TDG_FOLDER + File.separator + pid, ENCODING, "INV_", ".xml");
          client.postDocument(INV_TYPE, text);
        }

        client.postCommit();

        String xml = client.getPackageList();
        SAXReader reader = new SAXReader(false);
        Document doc = reader.read(new StringReader(xml));
        Number status = doc.numberValueOf("/packages/package[@pid='" + pid + "']/status");

        TdgLog tdgLog = new TdgLog();
        tdgLog.setDattr(new Date());
        tdgLog.setDir(dir.getDir());
        tdgLog.setHid_cs(cs.getHid());
        tdgLog.setPid(pid);
        if (status != null) {
          Integer i = status.intValue();
          tdgLog.setStatus(i);
          tdgLog.setStatus_txt(statesMap.get(i));
        }
        session.save(tdgLog);

        String query = "UPDATE CimSmgs cs SET cs." + dir.getStatusCol() + "=:s WHERE cs.hid=:id";
        Query q = session.createQuery(query);
        q.setByte("s", dir.getGoodStatus());
        q.setLong("id", csId);
        q.executeUpdate();

        tx.commit();
      }
    }
    catch (Exception e) {
      tx.rollback();
//      session.clear();
      throw e;
    }
//    finally {
//      if (session != null) {
//        session.close();
//      }
//    }
  }

  public void receiveStatus() throws Exception {
    Session session = null;
    Transaction tx = null;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      @SuppressWarnings("unchecked")
      List<TdgLog> list = session.createQuery("from TdgLog as t1 where t1.hid=(select max(t2.hid) from TdgLog as t2 where t1.hid_cs=t2.hid_cs and t1.dir=t2.dir)").list();
      log.debug("Found " + list.size() + " document(s)");
      if (list.size() > 0) {
        String xml = client.getPackageList();
        SAXReader reader = new SAXReader(false);
        Document doc = reader.read(new StringReader(xml));
        @SuppressWarnings("unchecked")
        List<Node> nodes = doc.selectNodes("/packages/package");
        log.debug("Found " + list.size() + " status(es)");
        TreeMap<String, Integer> packMap = new TreeMap<String, Integer>();
        for (Node n : nodes) {
          String pid = n.valueOf("@pid");
          String status = n.valueOf("status");
          try {
            packMap.put(pid, Integer.valueOf(status));
          }
          catch (Exception ex) {
            log.warn("Bad status \"" + status + "\" for pid=" + pid);
          }
        }

        for (TdgLog tdgLog : list) {
          String pid = tdgLog.getPid();
          Integer oldStatus = tdgLog.getStatus();
          Integer newStatus = packMap.get(pid);
          if (newStatus != null && (oldStatus == null || oldStatus != null && oldStatus.compareTo(newStatus) != 0)) {
            log.debug("pid=" + pid + " status=" + oldStatus + " -> " + newStatus);

            TdgLog clone = (TdgLog)BeanUtils.cloneBean(tdgLog);
            clone.setHid(null);
            clone.setDattr(new Date());
            clone.setStatus(newStatus);
            clone.setStatus_txt(statesMap.get(newStatus));

            try {
              String resStr = client.getPIResult(pid);
              if (resStr != null) {
                SAXReader resReader = new SAXReader(false);
                Document resDoc = resReader.read(new StringReader(resStr));
                Node n = resDoc.selectSingleNode("/DesNotif_PIResult/DesNotif_PIResult_ITEM/ResultInformation/RESULTINFORMATION_ITEM");
                String code = n.valueOf("ResultCode");
                String cat = n.valueOf("ResultCategory");
                String desc = n.valueOf("ResultDescription");
                log.debug("Result=" + code + " - " + cat + " - " + desc);
                clone.setResult_txt(/*code + " - " + cat + " - " + */desc);
              }
            }
            catch (Exception ex) {
              log.warn(ex.getMessage());
            }

            session.save(clone);
          }
        }
      }

      tx.commit();
    }
    catch (Exception e) {
      tx.rollback();
      throw e;
    }
  }

  protected String getRWBText(CimSmgs cs) throws Exception {
    Document doc = DocumentHelper.createDocument();
    doc.setXMLEncoding(ENCODING);

    Element rwb = doc.addElement("RWB")
       .addAttribute("xmlns:cnv", "http://www.ctm.ru/ctm/converter");

    Element rwbItem = rwb.addElement("RWB_ITEM");
    rwbItem.addElement("DOC_ID").addText(format(cs.getHid()));
    rwbItem.addElement("PIRegNumber");
    rwbItem.addElement("DocumentID");
    rwbItem.addElement("SMGSName");
    rwbItem.addElement("CONTROL").addText(format(cs.getG39()));
    rwbItem.addElement("RECEIVEDATE").addText(format(cs.buildG16Date()));
    rwbItem.addElement("RECEIVECODE").addText(format(cs.getG171()) + format(cs.getG17()));
    rwbItem.addElement("RECEIVESTATIONL1").addText(format(cs.getG162()));
    rwbItem.addElement("RECEIVESTATIONL2").addText(format(cs.getG162r()));
    rwbItem.addElement("DESTSTATIONL1").addText(format(cs.getG101()));
    rwbItem.addElement("DESTSTATIONL2").addText(format(cs.getG101r()));
    rwbItem.addElement("EXPCONTRACTNO").addText(format(cs.getG8()));
    rwbItem.addElement("DESTCODE").addText(format(cs.getG11()));
    rwbItem.addElement("RECEIVECOUNTRYL1").addText(format(cs.getG163()));
    rwbItem.addElement("RECEIVECOUNTRYL2").addText(format(cs.getG163r()));
    rwbItem.addElement("DESTCOUNTRYL1").addText(format(cs.getG102()));
    rwbItem.addElement("DESTCOUNTRYL2").addText(format(cs.getG102r()));
    rwbItem.addElement("PACKINGTYPE");
    rwbItem.addElement("RegNum").addText(format(cs.getG694()));
    rwbItem.addElement("RegDate").addText(format(cs.getG281() == null ? new Date() : cs.getG281()));

    CimSmgsCarList csc = null;
    Collection<CimSmgsCarList> carCol = cs.getCimSmgsCarLists().values();
    if (!carCol.isEmpty()) {
      csc = carCol.iterator().next();
    }
    rwbItem.addElement("CarriageId").addText(csc != null ? normNvagNkonStr(csc.getNvag()) : "");
    rwbItem.addElement("PropertyCarriage").addText(csc != null ? format(csc.getKodSob()) : "");

    Element paidRWC = rwbItem.addElement("RWBPaidRailwayCode");
    Element paidRWCItem = paidRWC.addElement("RWBPAIDRAILWAYCODE_ITEM");
    paidRWCItem.addElement("DOC_ID").addText("0");
    paidRWCItem.addElement("RailWayCode");

    rwbItem.addElement("CargoValue").addText(format(cs.getG27()));
    rwbItem.addElement("CustomsNotice").addText(format(cs.getG27()));
    rwbItem.addElement("WeightDefinitionModeDescription").addText(format(cs.getG48()));

    rwbItem.addElement("Consignor_CodeClPaid").addText(format(cs.getG2()));
    rwbItem.addElement("Consignor_Name").addText(format(cs.getG1r()));
    rwbItem.addElement("Consignor_INN");
    rwbItem.addElement("Consignor_KPP");
    rwbItem.addElement("Consignor_Phone").addText(format(cs.getG12_1()));
    rwbItem.addElement("Consignor_Fax").addText(format(cs.getG13_1()));
    rwbItem.addElement("Consignor_PostalCode").addText(format(cs.getG17_1()));
    rwbItem.addElement("Consignor_CountryCode").addText(format(cs.getG15_1())); // надо цифровой код заменить на буквенный
    rwbItem.addElement("Consignor_CountryName").addText(""); // NSI_COUNTRIES.KRNAIM
    rwbItem.addElement("Consignor_Region").addText(format(cs.getG16r()));
    rwbItem.addElement("Consignor_City").addText(format(cs.getG18r_1()));
    rwbItem.addElement("Consignor_StreetHouse").addText(format(cs.getG19r()));
    rwbItem.addElement("Consignor_Email").addText(format(cs.getG11_1()));

    rwbItem.addElement("Consignee_CodeClPaid").addText(format(cs.getG5()));
    rwbItem.addElement("Consignee_Name").addText(format(cs.getG4r()));
    rwbItem.addElement("Consignee_INN");
    rwbItem.addElement("Consignee_KPP");
    rwbItem.addElement("Consignee_Phone").addText(format(cs.getG42_1()));
    rwbItem.addElement("Consignee_Fax").addText(format(cs.getG43_1()));
    rwbItem.addElement("Consignee_PostalCode").addText(format(cs.getG47_1()));
    rwbItem.addElement("Consignee_CountryCode").addText(format(cs.getG45_1())); // надо цифровой код заменить на буквенный
    rwbItem.addElement("Consignee_CountryName").addText(""); // NSI_COUNTRIES.KRNAIM
    rwbItem.addElement("Consignee_Region").addText(format(cs.getG46r()));
    rwbItem.addElement("Consignee_City").addText(format(cs.getG48r()));
    rwbItem.addElement("Consignee_StreetHouse").addText(format(cs.getG49r()));
    rwbItem.addElement("Consignee_Email").addText(format(cs.getG41_1()));

    rwbItem.addElement("DepStationCode").addText(format(cs.getG17()));
    rwbItem.addElement("DepStationName").addText(format(cs.getG162r()));
    rwbItem.addElement("DepRailwayCode").addText(format(cs.getG171()));
    rwbItem.addElement("DestRailwayCode").addText(format(cs.getG12()));
    rwbItem.addElement("DestStationCode").addText(format(cs.getG121()));
    rwbItem.addElement("DestStationName").addText(format(cs.getG101r()));

    Element borderRWS = rwbItem.addElement("RWBBorderStation");
    for (int i = 0; i < 1; i++) {
      Element borderRWSItem = borderRWS.addElement("RWBBORDERSTATION_ITEM");
      borderRWSItem.addElement("DOC_ID").addText("0");
      borderRWSItem.addElement("StationCode");
      borderRWSItem.addElement("StationName");
      borderRWSItem.addElement("RailwayCode");
    }

    Element cs01 = rwbItem.addElement("CIM-SMGS_01");
    if (cs.getType().intValue() == 1) {
      Element cs01Item = cs01.addElement("CIM-SMGS_01_ITEM");
      cs01Item.addElement("DOC_ID").addText("0");
      cs01Item.addElement("DOCDATE").addText(format(cs.getG281() == null ? new Date() : cs.getG281()));
      cs01Item.addElement("DOCPLACE").addText(format(cs.getG28()));
      cs01Item.addElement("REFORWARDL1").addText(format(cs.getG29r()));
      cs01Item.addElement("REFORWARDL2").addText(format(cs.getG29()));
      cs01Item.addElement("RIDPRIL2").addText(formatN(cs.getG22()));
      cs01Item.addElement("ROUTES").addText(format(cs.getG60()));
      cs01Item.addElement("SENDCOUNTRYCODE").addText(format(cs.getG691()));
      cs01Item.addElement("SENDNO").addText(format(cs.getG694()));
      cs01Item.addElement("SENDSTASTIONCODE").addText(format(cs.getG692()));
      cs01Item.addElement("SENDTRANSPCODE").addText(format(cs.getG694()));
      cs01Item.addElement("SENDTYPE").addText("1");
    }

    rwbItem.addElement("CIM-SMGS_AB");
    rwbItem.addElement("CIM-SMGS_18A_SMGS");
    rwbItem.addElement("CIM-SMGS_18B_CIM");
    rwbItem.addElement("CIM-SMGS_13_COMMTERMS");
    rwbItem.addElement("CIM-SMGS_BACKDOP");
    rwbItem.addElement("CIM-SMGS_BACKPRIM");
    rwbItem.addElement("CIM-SMGS_STATEMENT_CONTAINERS");
    rwbItem.addElement("CIM-SMGS_STATEMENT_VAGONS");

    CimSmgsKonList csk = null;
    Collection<CimSmgsKonList> konCol = csc.getCimSmgsKonLists().values();
    if (!konCol.isEmpty()) {
      csk = konCol.iterator().next();
    }

    Element goods = rwbItem.addElement("RWBGoods");
    if (csk != null) {
      for(CimSmgsGruz csg : csk.getCimSmgsGruzs().values()) {
        Element goodsItem = goods.addElement("RWBGOODS_ITEM");
        goodsItem.addElement("DOC_ID").addText("0");
        goodsItem.addElement("GoodsMarking");
        goodsItem.addElement("GoodsDescription").addText(format(csg.getNzgr()));
        goodsItem.addElement("NHMCODE").addText(format(csg.getKgvn()));
        goodsItem.addElement("GoodsNumeric").addText(formatN(csg.getSort()));
        goodsItem.addElement("ContainerIndicator").addText("1");
        goodsItem.addElement("PlacesQuantity").addText(formatN(csg.getPlaces()));
        goodsItem.addElement("GrossWeightQuantity").addText(formatN(csg.getMassa()));
      }
    }
    rwbItem.addElement("RWBGoods_dop");
    rwbItem.addElement("RWBGoods_dop11");
    rwbItem.addElement("WorkToolContainerModeDescription");

    rwbItem.addElement("ContainerRailwayCode").addText(csk != null ? format(csk.getKodSob()) : "");
    rwbItem.addElement("ContainerID").addText(csk != null ? normNvagNkonStr(csk.getUtiN()) : "");
    rwbItem.addElement("ContainerModeDescription").addText(csk != null ? format(csk.getUtiType()) : "");
    rwbItem.addElement("ContainerCapacity").addText("0");
    rwbItem.addElement("ContainerCapacityUnitQualifierName");

    Element docs = rwbItem.addElement("RWBConsignorDocument");
    byte n = 1;
    for (CimSmgsDocs csd : cs.getCimSmgsDocses9().values()) {
      Element docsItem = docs.addElement("RWBCONSIGNORDOCUMENT_ITEM");
      docsItem.addElement("DOC_ID").addText(format(n++));
      docsItem.addElement("DocumentName").addText(format(csd.getText()));
    }

    Element car = rwbItem.addElement("RWBCarriage");
    if (csc != null) {
      Element carItem = car.addElement("RWBCARRIAGE_ITEM");
      carItem.addElement("DOC_ID").addText("0");
      carItem.addElement("CarriageId").addText(normNvagNkonStr(csc.getNvag()));
      carItem.addElement("Power").addText(formatN(csc.getGrPod()));
      carItem.addElement("AxisQuantity").addText(formatN(csc.getKolOs()));
      carItem.addElement("Tare").addText(formatN(csc.getTaraVag()));
    }

    return getString(doc);
  }

  protected String getInvoiceText(CimSmgsInvoice csi) throws Exception {
    Document doc = DocumentHelper.createDocument();
    doc.setXMLEncoding(ENCODING);

    Element inv = doc.addElement("INVOICE")
      .addAttribute("xmlns:cnv", "http://www.ctm.ru/ctm/converter");

    Element invItem = inv.addElement("INVOICE_ITEM");
    invItem.addElement("DOC_ID").addText(format(csi.getHid()));
    invItem.addElement("CurrencyName").addText(format(csi.getCux()));
    invItem.addElement("GrossWeightQuantity").addText(csi.calcMbrt());
    invItem.addElement("NetWeightQuantity").addText(csi.calcMnet());
    invItem.addElement("GCost").addText(csi.calcItogoStr());
    invItem.addElement("Buyer_Name").addText(format(csi.getNbuy()));
    invItem.addElement("Seler_Name").addText(format(csi.getNsel()));
    invItem.addElement("Consignor_Name").addText(format(csi.getNotd()));
    invItem.addElement("Consignee_Name").addText(format(csi.getNpol()));
    Element goods = invItem.addElement("INVOICEGoods");

    for (CimSmgsInvoiceGruz scig : csi.getInvoiceGruzs().values()) {
      Element goodsItem = goods.addElement("INVOICEGOODS_ITEM");
      goodsItem.addElement("DOC_ID").addText(format(scig.getHid()));
      goodsItem.addElement("GoodMarking").addText(format(scig.getZnak()));
      goodsItem.addElement("GoodsCode").addText(format(scig.getTnved()));
      goodsItem.addElement("GoodsDescription").addText(format(scig.getNzgr()));
      goodsItem.addElement("PlacesQuantity").addText(format(scig.getKolm()));
      goodsItem.addElement("GrossWeightQuantity").addText(format(scig.getMbrt()));
      goodsItem.addElement("NetWeightQuantity").addText(format(scig.getMnet()));
      goodsItem.addElement("Price").addText(format(scig.getCost()));
      goodsItem.addElement("TotalCost").addText(format(scig.getItogo()));
    }

    invItem.addElement("RegNum").addText(format(csi.getInvoice()));
    invItem.addElement("RegDate").addText(format(csi.getDat_inv()));
    invItem.addElement("ContractNum").addText(format(csi.getN_dog()));
    invItem.addElement("ContractDate").addText(format(csi.getDat_dog()));
    invItem.addElement("PlacesQuantity").addText(csi.calcKolm());

    return getString(doc);
  }

  private String getString(Document doc) throws IOException {
    //    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, ENCODING);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    return out.toString();
  }

}
