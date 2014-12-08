package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.StringWriter;
import java.util.Collection;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class CTMConvertor  extends Convertor {

    final static private Logger log = LoggerFactory.getLogger(CTMConvertor.class);

  public CTMConvertor() {
  }

  public CTMConvertor(String script) {
    try {
      SAXReader reader = new SAXReader(true);
      Document document = reader.read(script);

      List list = document.selectNodes("/script/action[@name='send' and @direction='ctm']");
      for (Iterator it = list.iterator(); it.hasNext(); ) {
        Element el = (Element) it.next();
        sTr = getTransport(el.selectSingleNode("transport"));
      }

      list = document.selectNodes("/script/action[@name='receive']");
      for (Iterator it = list.iterator(); it.hasNext(); ) {
        Element el = (Element) it.next();
        rTr = getTransport(el.selectSingleNode("transport"));
      }

    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  public void sendPackage(Long csId) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csId);
      if (cs != null) {
        messageId = -1;
        messageId = prepareMessageId(session);

        Date curDate = new Date();
        String text = getText(cs);

        log.debug(text);

        String fileName = "Package_" + messageId + ".xml";
        sTr.put(fileName, text);

//        saveLog(session, messageId, "CTM", text, csId);

//        String query = "UPDATE CimSmgs cs SET cs.iftminOut=:a, cs.iftminId=:b, cs.ready='2' WHERE cs.hid=:id";
//        Query q = session.createQuery(query);
//        q.setTimestamp("a", curDate);
//        q.setLong("b", new Long(messageId));
//        q.setLong("id", csId);
//        q.executeUpdate();

        sTr.flush();

        tx.commit();
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
      session.clear();
      throw e;
    }
    /*finally {
      if (session != null) {
        session.close();
      }
    }*/
  }

  protected String getText(CimSmgs cs) throws Exception {
    String Encoding = "utf-8";
    Document doc = DocumentHelper.createDocument();
    doc.setXMLEncoding(Encoding);

    Element root = doc.addElement("Package");

    /*if (!cs.getInvoices().isEmpty()) {
      Element inv = root.addElement("INVOICE")
        .addAttribute("ctmtd:CfgName", "invoice.cfg.xml")
        .addAttribute("xmlns:ctmtd", "http://rail.ctm.ru/TD/Document");

      for (CimSmgsInvoice invOb : cs.getInvoices()) {
        Element invItem = inv.addElement("INVOICE_ITEM");
        invItem.addElement("DOC_ID").addText(format(invOb.getHid()));
        invItem.addElement("CurrencyName").addText(format(invOb.getCux()));
        invItem.addElement("GrossWeightQuantity").addText(invOb.calcMbrt());
        invItem.addElement("NetWeightQuantity").addText(invOb.calcMnet());
        invItem.addElement("GCost").addText(invOb.calcItogoStr());
        invItem.addElement("Buyer_Name").addText(format(invOb.getNbuy()));
        invItem.addElement("Seler_Name").addText(format(invOb.getNsel()));
        invItem.addElement("Consignor_Name").addText(format(invOb.getNotd()));
        invItem.addElement("Consignee_Name").addText(format(invOb.getNpol()));
        Element goods = invItem.addElement("INVOICEGoods");

        for (CimSmgsInvoiceGruz invGruzOb : invOb.getInvoiceGruzs().values()) {
          Element goodsItem = goods.addElement("INVOICEGOODS_ITEM");
          goodsItem.addElement("DOC_ID").addText(format(invGruzOb.getHid()));
          goodsItem.addElement("GoodMarking").addText(format(invGruzOb.getZnak()));
          goodsItem.addElement("GoodsCode").addText(format(invGruzOb.getTnved()));
          goodsItem.addElement("GoodsDescription").addText(format(invGruzOb.getNzgr()));
          goodsItem.addElement("PlacesQuantity").addText(format(invGruzOb.getKolm()));
          goodsItem.addElement("GrossWeightQuantity").addText(format(invGruzOb.getMbrt()));
          goodsItem.addElement("NetWeightQuantity").addText(format(invGruzOb.getMnet()));
          goodsItem.addElement("Price").addText(format(invGruzOb.getCost()));
          goodsItem.addElement("TotalCost").addText(format(invGruzOb.getItogo()));
        }

        invItem.addElement("RegNum").addText(format(invOb.getInvoice()));
        invItem.addElement("RegDate").addText(format(invOb.getDat_inv()));
        invItem.addElement("ContractNum").addText(format(invOb.getN_dog()));
        invItem.addElement("ContractDate").addText(format(invOb.getDat_dog()));
        invItem.addElement("PlacesQuantity").addText(invOb.calcKolm());
      }
    }*/

    Element rwb = root.addElement("RWB")
       .addAttribute("ctmtd:CfgName", "CIM-SMGS.CFG.XML")
       .addAttribute("xmlns:ctmtd", "http://rail.ctm.ru/TD/Document");

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


//    String text = doc.asXML();
    OutputFormat format = new OutputFormat("  ", true, Encoding);
    format.setExpandEmptyElements(false);
    StringWriter out = new StringWriter();
    XMLWriter writer = new XMLWriter(out, format);
    writer.write(doc);
    String text = out.toString();
    return text;
  }

  public static void main(String[] args) {
    try {
      CTMConvertor ctm = new CTMConvertor("script.xml");
      ctm.sendPackage(new Long(8298));
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }
}

/*

<Package>
  <INVOICE ctmtd:CfgName="invoice.cfg.xml" xmlns:ctmtd="http://rail.ctm.ru/TD/Document">
    <INVOICE_ITEM>
      <DOC_ID>0</DOC_ID>
    </INVOICE_ITEM>
  </INVOICE>
  <RWB xmlns:ctmtd="http://rail.ctm.ru/TD/Document" ctmtd:CfgName="CIM-SMGS.CFG.XML">
    <RWB_ITEM>
       <DOC_ID>0</DOC_ID>
       <CIM-SMGS_18A_SMGS> </CIM-SMGS_18A_SMGS>
       <CIM-SMGS_18B_CIM>  </CIM-SMGS_18B_CIM>
       <CIM-SMGS_13_COMMTERMS> </CIM-SMGS_13_COMMTERMS>
       <CIM-SMGS_BACKDOP> </CIM-SMGS_BACKDOP>
       <CIM-SMGS_BACKPRIM> </CIM-SMGS_BACKPRIM>
       <CIM-SMGS_STATEMENT_CONTAINERS> </CIM-SMGS_STATEMENT_CONTAINERS>
       <CIM-SMGS_STATEMENT_VAGONS> </CIM-SMGS_STATEMENT_VAGONS>
       <WorkToolContainerModeDescription>WorkToolContainerModeDescription0</WorkToolContainerModeDescription>
       <ContainerModeDescription>Cont</ContainerModeDescription>
       <ContainerCapacity>0</ContainerCapacity>
       <ContainerCapacityUnitQualifierName>ContainerCapa</ContainerCapacityUnitQualifierName>
    </RWB_ITEM>
  </RWB>

  <DesNotif_PIResult>
    <DesNotif_PIResult_ITEM>
      <DocumentID>90adb195-3394-4134-af84-3381ba85269e</DocumentID>
      <RefDocumentID/>
      <ResultInformation>
        <RESULTINFORMATION_ITEM>
          <ResultCode>00.00000.00</ResultCode>
          <ResultDescription>OK</ResultDescription>
          <ResultCategory/>
        </RESULTINFORMATION_ITEM>
      </ResultInformation>
    </DesNotif_PIResult_ITEM>
  </DesNotif_PIResult>
</Package>

 */
