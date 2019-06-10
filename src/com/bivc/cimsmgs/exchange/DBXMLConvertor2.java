package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Sta;
import com.isc.translit.TranslitTool;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.StringWriter;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.*;

public class DBXMLConvertor2 {

    private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
    private static final SimpleDateFormat dateTimeZoneFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssXXX"); // 2009-04-29T14:42:24+02:00
    private static final SimpleDateFormat g16Formater = new SimpleDateFormat("MM-dd-HH");
    private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat dateFormater2 = new SimpleDateFormat("dd.MM.yyyy");
    private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
    private static final Pattern kst = Pattern.compile("[0-9]{5}");
    private static final Pattern prin_p = Pattern.compile("^[a-zA-Z]{4}");
    private static final Pattern nkon_p = Pattern.compile("[0-9]{7,9}$");
    private static final Pattern prin_nkon = Pattern.compile("[a-zA-Z]{4}\\s*\\d{6}-*\\d");
    private static final Logger log = LoggerFactory.getLogger(DBXMLConvertor2.class);
    private static final String Encoding = "utf-8";

    private static final String SENDER = "4010";
    public static final String RECEIVER = "2180";

    private TranslitTool tlt;

    public DBXMLConvertor2() throws Exception {
        tlt = new TranslitTool("/Translit-ru.xml");
    }

    public String getText(Long csId) throws Exception {
        CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, csId);

        Date d = new Date();
        Document doc = DocumentHelper.createDocument();
        doc.setXMLEncoding(Encoding);

        Byte typeOb = cs.getType();
        boolean isSmgs = typeOb != null && typeOb.intValue() == DocType.SMGS.getType();
        boolean isKont = cs.isContOtpr();

        Element root = doc.addElement("CustomerOrder_DBSR");
        root.addAttribute("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance").addAttribute("xsi:noNamespaceSchemaLocation", "CustomerOrder_DBSR_2.0.xsd");
        Element iHeader = root.addElement("InterchangeHeader");
        iHeader.addElement("InterchangeID").setText("12017070707");
        iHeader.addElement("SenderIdentification").setText(SENDER);
        iHeader.addElement("ReceiverIdentification").setText(RECEIVER);
        iHeader.addElement("MsgPreparationDatetime").setText(dateTimeZoneFormater.format(d));
        iHeader.addElement("xsdVersion").setText("2.0");
        iHeader.addElement("TestIndicator").setText("1");

        Element orders = root.addElement("Orders");

        Element header = orders.addElement("Header");
        header.addElement("SenderCode").addText(SENDER);
        header.addElement("ReceiverCode").addText(RECEIVER);
        header.addElement("MessageReferenceNumber").addText("2017070707");
        header.addElement("MessageType").addText("TPO");  /*TPOU для повторной передачи */
        header.addElement("ShipmentType").addText("CIM");
        header.addElement("CNPreparationDatetime").addText(dateTimeZoneFormater.format(d));
        header.addElement("CNVersionNumber").addText("1");
        header.addElement("ORFIMO").addText("true");

        Element order = orders.addElement("Order");
        Element aPoint = order.addElement("AcceptancePoint");
        Element point = aPoint.addElement("Point");
        String diro = cs.getG171();
        String ksto = cs.getG17();
        if (isBlank(diro)) {  /** @todo гр.17 надо запонять полностью */
            diro = cs.getG691();
        }
        if (isBlank(ksto)) {
            ksto = cs.getG692();
        }
        point.addElement("Code").addText(defaultString(ksto));
        point.addElement("Name").addText(translate(cs.getG162(), cs.getG162r()));
        point.addElement("CountryPoint").addElement("UICCountryCode").addText(defaultString(diro));

        Date dato = isSmgs ? cs.getG281() : cs.buildG16Date();
        if (dato != null)
            aPoint.addElement("AcceptanceDateTime").addElement("AcceptanceDate").addText(dateFormater.format(dato));
        aPoint.addElement("ForwardingTrainNumber").addText(defaultString(cs.getNpoezd()));

        Element dPoint = order.addElement("DeliveryPoint");
        point = dPoint.addElement("Point");
        point.addElement("Code").addText(defaultString(cs.getG121()));
        point.addElement("Name").addText(translate(cs.getG101(), cs.getG101r()));
        point.addElement("CountryPoint").addElement("UICCountryCode").addText(defaultString(cs.getG12()));

        Element addInfo = order.addElement("AdditionalInformationOrder");
        if (isNotBlank(cs.getG15()))
            addInfo.addElement("InformationConsignee").addText(substring(cs.getG15(), 0, 350));
        else if (isNotBlank(cs.getG15r()))
            addInfo.addElement("InformationConsignee").addText(substring(translate(cs.getG15r()), 0, 350));

        for (CimSmgsDocs csd : cs.getCimSmgsDocses7().values()) {
            Element conDecl = addInfo.addElement("ConsignorDeclaration");
            conDecl.addElement("Code").addText(defaultString(csd.getCode()));
            conDecl.addElement("Text").addText(defaultString(csd.getText2(), defaultString(csd.getText())));
        }

        if (!isKont)
            addDocs(addInfo, cs.getCimSmgsDocses9().values());

        Element customers = order.addElement("Customers");
        Element customer = customers.addElement("Customer").addAttribute("Type", "CE");
        if (isNotBlank(cs.getG2()))
            customer.addElement("CustomerCode").addText(defaultString(cs.getG2()));
        customer.addElement("Name").addText(translate(cs.getG1(), cs.getG1r()));
        if (isNotBlank(cs.getG19_1()) || isNotBlank(cs.getG19r()))
            customer.addElement("Street").addText(substring(translate(cs.getG19_1(), cs.getG19r()), 0, 35));
        if (isNotBlank(cs.getG17_1()))
            customer.addElement("ZIPCode").addText(defaultString(cs.getG17_1()));
        if (isNotBlank(cs.getG18_1()) || isNotBlank(cs.getG18r_1()))
            customer.addElement("City").addText(translate(cs.getG18_1(), cs.getG18r_1()));
        customer.addElement("ISOCountryCode").addText(defaultString(cs.getG15_1()));

        customer = customers.addElement("Customer").addAttribute("Type", "CR");
        if (isNotBlank(cs.getG5()))
            customer.addElement("CustomerCode").addText(defaultString(cs.getG5()));
        customer.addElement("Name").addText(translate(cs.getG4(), cs.getG4r()));
        if (isNotBlank(cs.getG49()) || isNotBlank(cs.getG49r()))
            customer.addElement("Street").addText(substring(translate(cs.getG49(), cs.getG49r()), 1, 35));
        if (isNotBlank(cs.getG47_1()))
            customer.addElement("ZIPCode").addText(defaultString(cs.getG47_1()));
        if (isNotBlank(cs.getG48_1()) || isNotBlank(cs.getG48r()))
            customer.addElement("City").addText(translate(cs.getG48_1(), cs.getG48r()));
        customer.addElement("ISOCountryCode").addText(defaultString(cs.getG45_1()));

        for (CimSmgsPlatel csp : cs.getCimSmgsPlatels().values()) {
            customer = customers.addElement("Customer").addAttribute("Type", "FPCE");
            String code = defaultString(substringBefore(csp.getKplat(), "/")); /** @todo подкод надо вводить в поле для подкода, а не лупить все подряд */
//            if (isNotBlank(csp.getKplat1())) {
//                code += "/" + csp.getKplat1();
//                if (isNotBlank(csp.getKplat2())) {
//                    code += "/" + csp.getKplat2();
//                    if (isNotBlank(csp.getKplat3())) {
//                        code += "/" + csp.getKplat3();
//                    }
//                }
//            }
            customer.addElement("CustomerCode").addText(code);
            if (isNotBlank(csp.getPlat()) || isNotBlank(csp.getPlatR()))
                customer.addElement("Name").addText(translate(csp.getPlat(), csp.getPlatR()));
        }

        Element equipment = order.addElement("Equipment");

        ArrayList<CimSmgsKonList> kontList = new ArrayList<>();
        for (CimSmgsCarList cscOb : cs.getCimSmgsCarLists().values()) {
            kontList.addAll(cscOb.getCimSmgsKonLists().values());
        }

        Element wagons = equipment.addElement("Wagons");
        for (CimSmgsCarList cscOb : cs.getCimSmgsCarLists().values()) {
            Element wag = wagons.addElement("Wagon")
                    .addAttribute("WagonNumber", defaultString(normNvagNkonStr(cscOb.getNvag())));

            Long mnet = (cscOb.getMassSend() == null || cscOb.getMassSend() == 0) ? calcMassSend(cscOb.getCimSmgsGruzs().values()).longValue() : cscOb.getMassSend();
            boolean isEmpty = mnet == 0 && !isKont;

            Element wagDet = wag.addElement("WagonDetails").addAttribute("LoadingStatus",  isEmpty ? "empty" : "loaded");
            Element wagTypeDet = wagDet.addElement("WagonTypeDetails");
            wagTypeDet.addElement("WagonMass").addText(cscOb.getTaraVag() != null ? cscOb.getTaraVag().setScale(1, BigDecimal.ROUND_HALF_UP).toString() : "");
            Byte kolOs = cscOb.getKolOs();
            if (kolOs != null && kolOs != 0)
                wagTypeDet.addElement("AxleNumber").addText(String.valueOf(kolOs));

            if (!isKont) {
                wagDet.addElement("Seals").addElement("NumberOfSeals").addText(String.valueOf(cscOb.getCimSmgsPlombs().size()));

                if (cscOb.getMassCalc() != null)
                    wag.addElement("TotalMass").addText(String.valueOf(cscOb.getMassCalc()));
                wag.addElement("NetWeightPayloadWaggon").addText(String.valueOf(mnet));

                Element goods = wag.addElement("Goods");
                boolean isManyGruz = cscOb.getCimSmgsGruzs().values().size() > 1;

                for (CimSmgsGruz csgOb : cscOb.getCimSmgsGruzs().values()) {
                    addGruz(new BigDecimal(mnet), isEmpty, goods, isManyGruz, csgOb);
                }
            }
        }

        if (isKont) {
            Element utis = equipment.addElement("UTIs");
            int i = 1;
            for (CimSmgsKonList cskOb : kontList) {
                Element uti = utis.addElement("UTI").addAttribute("OrderPosNr", String.valueOf(i++));
                String prinNkon = cskOb.getUtiN();
                String prin = "", nkon = "";
                if (isNotBlank(prinNkon)) {
                    prinNkon = normNvagNkonStr(prinNkon);
                    Matcher m = prin_p.matcher(prinNkon);
                    if (m.find())
                        prin = m.group();
                    m = nkon_p.matcher(prinNkon);
                    if (m.find())
                        nkon = m.group();
                }

                BigDecimal mnet = (cskOb.getMassSend() == null || BigDecimal.ZERO.compareTo(cskOb.getMassSend()) == 0) ? calcMassSend(cskOb.getCimSmgsGruzs().values()) : cskOb.getMassSend();
                boolean isEmpty = BigDecimal.ZERO.compareTo(mnet) == 0;

                Element utiDet = uti.addElement("UTIDetails")
                        .addAttribute("Number", nkon)
                        .addAttribute("Prefix", prin)
                        .addAttribute("LoadingStatus", isEmpty ? "empty" : "loaded");
                if (isNotBlank(cskOb.getUtiType()))
                    utiDet.addAttribute("ContainerISOCode", cskOb.getUtiType());

                addDocs(utiDet, cskOb.getCimSmgsDocses9().values());

//                Element dim = utiDet.addElement("Dimensions");
                utiDet.addElement("Seals").addElement("NumberOfSeals").addText(String.valueOf(cskOb.getCimSmgsPlombs().size()));
                utiDet.addElement("TareWeight").addText(cskOb.getTaraKont() != null ? cskOb.getTaraKont().toString() : "");
                utiDet.addElement("WagonNumber").addText(defaultString(normNvagNkonStr(cskOb.getCimSmgsCarList().getNvag())));

                Element goods = uti.addElement("Goods");
                boolean isManyGruz = cskOb.getCimSmgsGruzs().values().size() > 1;

                for (CimSmgsGruz csgOb : cskOb.getCimSmgsGruzs().values()) {
                    addGruz(mnet, isEmpty, goods, isManyGruz, csgOb);
                }
            }

        }

        OutputFormat format = OutputFormat.createPrettyPrint();
        format.setEncoding(Encoding);
        StringWriter sw = new StringWriter();
        XMLWriter writer = new XMLWriter(sw, format);
        writer.write(doc);
        writer.close();
        return sw.toString();
//        return doc.asXML();
    }

    private void addDocs(Element parent, Collection<CimSmgsDocs> docs) {
        if (docs.size() > 0) {
            Element attDocs = parent.addElement("AttachedDocuments");
            for (CimSmgsDocs csdOb : docs) {
                Element attDoc = attDocs.addElement("AttachedDocument");
                attDoc.addElement("Type").addText(defaultString(csdOb.getCode()));
                if (isNotBlank(csdOb.getText()))
                    attDoc.addElement("DocumentDescription").addText(substring(csdOb.getText(), 0, 35));
                Integer ncopy = csdOb.getNcopy();
                if (ncopy != null && ncopy > 0)
                    attDoc.addElement("NumberOfOriginal").addText(ncopy.toString());
                if (csdOb.getDat() != null)
                    attDoc.addElement("DocumentDate").addText(dateTimeFormater.format(csdOb.getDat()));
            }
        }
    }

    private void addGruz(BigDecimal mnet, boolean isEmpty, Element goods, boolean isManyGruz, CimSmgsGruz csgOb) {
        Element good = goods.addElement("Good");

        String massaStr;
        if (!isEmpty) {
            if ((csgOb.getMassa() == null || BigDecimal.ZERO.compareTo(csgOb.getMassa()) == 0) && !isManyGruz)
                massaStr = mnet.setScale(1, BigDecimal.ROUND_HALF_UP).toString();
            else {
                massaStr = csgOb.getMassa().setScale(1, BigDecimal.ROUND_HALF_UP).toString();
            }
        }
        else {
            massaStr = "0";
        }

        Collection<CimSmgsDanGruz> dangList = csgOb.getCimSmgsDanGruzs().values();
        if (dangList.size() > 0) {
            Element rid = good.addElement("RID");
            CimSmgsDanGruz dangOb = dangList.iterator().next();
            rid.addElement("Law").addText("2017");
            if (isNotBlank(dangOb.getDangSign()))
                rid.addElement("DangerLabel").addText(substring(dangOb.getDangSign(), 0, 3));
            if (isNotBlank(dangOb.getCarDNameDe()))
                rid.addElement("LongTextDescription").addText(substring(dangOb.getCarDNameDe(), 1, 350));
            rid.addElement("Weight").addText(massaStr); /** @todo Не хватает массы опасного груза */
            rid.addElement("HazardNumber").addText(defaultString(dangOb.getCodDanger()));
            rid.addElement("UNNumber").addText(defaultString(dangOb.getNumOon()));
            rid.addElement("Class").addText(defaultString(dangOb.getClazz()));
            if (isNotBlank(dangOb.getGroupPack()))
                rid.addElement("PackingGroup").addText(dangOb.getGroupPack());
        }

        Element pack = good.addElement("Packing");
//                    pack.addElement("NatureOfPacking"); /** @todo Нет кода упаковки */
        pack.addElement("NumberOfPackages").addText(csgOb.getPlaces() != null ? csgOb.getPlaces().toString() : "");

        if (isNotBlank(csgOb.getKgvn()))
            good.addElement("NHMCode").addText(rightPad(substring(csgOb.getKgvn(), 0, 6), 6, '0'));
        good.addElement("GoodDescription").addText(defaultString(csgOb.getNzgrEu()));
        good.addElement("GrossMass").addText(massaStr);
    }

    private BigDecimal calcMassSend(Collection<CimSmgsGruz> values) {
        BigDecimal res = BigDecimal.ZERO;
        for (CimSmgsGruz csg : values) {
            if (csg.getMassa() != null) {
                res = res.add(csg.getMassa());
            }
        }
        return res;
    }

    private String translate(String text) throws Exception {
        return (isNotBlank(text)) ? tlt.getForward("de", text) : "";
    }

    private String translate(String text, String forTrans) throws Exception {
        return isNotBlank(text) ? text : translate(forTrans);
    }

    private Sta loadSta(String kst) {
        Sta sta = null;
        if  (isNotBlank(kst)) {
            @SuppressWarnings("unchecked")
            List<Sta> list = HibernateUtil.getSession().createCriteria(Sta.class).add(Restrictions.like("staNo", kst, MatchMode.START)).list();
            Iterator<Sta> it = list.iterator();
            if (it.hasNext()) {
                sta = it.next();
            }
        }
        return sta;
    }

    private String cleanStr(String str) {
        String res = null;
        if (str != null) {
            res = str.trim();
            if (res.startsWith("-")) {
                res = res.substring(1).trim();
            }
        }
        return res;
    }

}
