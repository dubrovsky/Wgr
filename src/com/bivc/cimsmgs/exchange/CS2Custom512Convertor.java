package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.GroupedData2;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Countrys;
import com.bivc.cimsmgs.db.nsi.Management;
import com.bivc.cimsmgs.dto.CimSmgsInvoiceGruzDTO;
import org.apache.commons.collections4.bidimap.DualHashBidiMap;
import org.apache.commons.lang.time.FastDateFormat;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.SAXReader;
import org.dom4j.io.XMLWriter;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.transform.Transformers;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.util.*;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.commons.DocType.CIMSMGS;
import static com.bivc.cimsmgs.commons.DocType.SMGS;
import static com.bivc.cimsmgs.exchange.Utils.*;
import static org.apache.commons.lang3.StringUtils.*;

public class CS2Custom512Convertor {

    final static private Logger log = LoggerFactory.getLogger(DBXMLConvertor.class);
    final static private TreeMap<Byte, String[]> dspdocMap = new TreeMap<>();
    final static private TreeMap<String, Countrys> strnMap = new TreeMap<>();
    final static private DualHashBidiMap<Byte, String> loadingMap = new DualHashBidiMap<>();
    final static private Pattern prin_p = Pattern.compile("^[a-zA-Z]{4}");
    final static private Pattern nkon_p = Pattern.compile("[0-9]{7,9}$");
    final static private BigDecimal TWO = new BigDecimal(2);
    final static private BigDecimal THOUSAND = new BigDecimal(1000);
    final static private FastDateFormat dateTimeFormater = FastDateFormat.getInstance("dd.MM.yyyy HH:mm:ss");
    final static private FastDateFormat customDateFormater = FastDateFormat.getInstance("yyyy-MM-dd");
    final static private DecimalFormat df2bit = new DecimalFormat("#0.##");
    final static private DecimalFormat df3bit = new DecimalFormat("#0.###");
    final static private Countrys emptyCountry = new Countrys();
    final static private Countrys diffCountry = new Countrys();
    final static private String UTF8 = StandardCharsets.UTF_8.name();

    private Session session;

    static {
        dspdocMap.put(SMGS.getType(), new String[] {"80", "СМГС"});
        dspdocMap.put(CIMSMGS.getType(), new String[] {"89", "ЦИМ/СМГС"});
        dspdocMap.put((byte) 0, new String[] {"", ""});

        loadingMap.put((byte)1, "4");   // отправителем
        loadingMap.put((byte)2, "1");   // перевозчиком

        emptyCountry.setCountryNo("00");
        emptyCountry.setCountryName("");

        diffCountry.setCountryNo("");
        diffCountry.setCountryName("");
    }


    public CS2Custom512Convertor() {
        session = HibernateUtil.getSession();
        @SuppressWarnings("unchecked")
        List<Management> managList = session.createQuery("FROM Management").list();
        for (Management manag : managList) {
            strnMap.put(manag.getManagNo(), manag.getCountrys());
        }
    }

    public String transform(Long hidCs) throws Exception {
        boolean withKontList = false;
        String res = null;
        try {
            CimSmgs cs = (CimSmgs) session.get(CimSmgs.class, hidCs);
            if (cs == null) {
                log.error("CIM_SMGS with hid=" + hidCs + " not found");
                throw new Exception("HID=" + hidCs + " not found");
            }

            Set<CimSmgsInvoice> csiSet = cs.getPackDoc().getCsInvoices();
            if (csiSet.size() == 0) {
                log.error("CS_INVOICE not found");
                throw new Exception("CS_INVOICE nod found for CIM_SMGS HID=" + hidCs);
            }

            SAXReader reader = new SAXReader(false);
            Document doc = reader.read(new File(getClass().getResource("/cus512.xml").toURI()));

            String docID = cs.getBtsNomer();
            if (StringUtils.isBlank(docID)) {
                docID = UUID.randomUUID().toString();
                cs.setBtsNomer(docID);
            }
            doc.selectSingleNode("//cat_ru:DocumentID").setText(docID.replaceAll("-", "").toUpperCase());

            String direction = null;
            String moveCode = null;
            CimSmgsInvoice firstCsi = csiSet.iterator().next();
            String dstCountry = firstCsi.getCountry_p();
            if (StringUtils.isBlank(dstCountry) && cs.getG12() != null) {
                Countrys cntr = strnMap.get(cs.getG12());
                if (cntr != null) {
                    dstCountry = cntr.getCountryId();
                }
            }
            if ("KZ".equalsIgnoreCase(dstCountry)) {
                direction = "ИМ";
                moveCode = "02";
            }
            else if ("RU".equalsIgnoreCase(dstCountry) || "BY".equalsIgnoreCase(dstCountry) || "KG".equalsIgnoreCase(dstCountry)) {
                direction = "ИМ";
                moveCode = "12";
            }
            else {
                direction = "ТР";
                moveCode = "14";
            }
            doc.selectSingleNode("//ESADout_CU:TransitDirectionCode").setText(direction);
            doc.selectSingleNode("//ESADout_CU:MovementCode").setText(moveCode);

            Byte typeOb = cs.getType();
            boolean isSmgs = typeOb != null && typeOb.intValue() == DocType.SMGS.getType();
            boolean isKont = cs.hasKont();
            boolean isGroup = true; //tab4.rowCount() > 1;
            ArrayList<String> nkonList = new ArrayList<>(cs.countConts());
            ArrayList<String> nvagList = new ArrayList<>(cs.vagsConts());

            SQLQuery sqlQuery = session.createSQLQuery(
                    "SELECT (SELECT GROUP_CONCAT(DISTINCT k.uti_n SEPARATOR ',') FROM CIM_SMGS_KON_LIST k, CIM_SMGS_CAR_LIST c, CIM_SMGS n WHERE k.hid_car=c.hid AND c.hid_cs=n.hid AND n.hid_pack=i.hid_pack) nkon, i.invoice, i.dat_inv, i.cux," +
                    " g.kolm, g.mbrt, g.tnved, g.cus_edizm, g.nzgr, g.mnet, g.itogo, g.kole FROM CIM_SMGS_INVOICE_GRUZ g, CIM_SMGS_INVOICE i WHERE i.hid=g.hid_csinv AND i.hid_pack=" + cs.getPackDoc().getHid());
            @SuppressWarnings("unchecked")
            List<CimSmgsInvoiceGruzDTO> grusList = sqlQuery.setResultTransformer(Transformers.aliasToBean(CimSmgsInvoiceGruzDTO.class)).list();
            TreeMap<String, GroupedData2> groupedData2Map = new TreeMap<>();
            groupGruzBit3(grusList, groupedData2Map);

            doc.selectSingleNode("//catESAD_cu:TotalGoodsNumber").setText(/*isGroup ? "1" : */String.valueOf(groupedData2Map.size()));
            TreeSet<String> cuxSet = new TreeSet<>();
            for (CimSmgsInvoice item : csiSet) {
                String cux = item.getCux();
                if (StringUtils.isNotBlank(cux)) {
                    cuxSet.add(cux.toUpperCase());
                }
            }

            BigDecimal totalPackageNumber = BigDecimal.ZERO;
            BigDecimal totalInvoiceCost = BigDecimal.ZERO;
            BigDecimal totalMbrt = BigDecimal.ZERO;
            for (GroupedData2 gd : groupedData2Map.values()) {
                String cux = gd.getCux();
                if (StringUtils.isNotBlank(cux)) {
                    cuxSet.add(cux.toUpperCase());
                }

                totalPackageNumber = totalPackageNumber.add(gd.getKolm());
                totalInvoiceCost = totalInvoiceCost.add(gd.getSum());
                totalMbrt = totalMbrt.add(gd.getBrutto());
            }
            totalInvoiceCost = totalInvoiceCost.setScale(2, RoundingMode.HALF_UP);

            boolean zeroTotalInvoiceCost = BigDecimal.ZERO.compareTo(totalInvoiceCost) == 0;

            doc.selectSingleNode("//catESAD_cu:TotalPackageNumber").setText(df3bit.format(totalPackageNumber));

            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:ShortName").setText(Utils.ss(cs.getG1r(), 0, 35).toUpperCase());
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:PostalCode").setText(format(cs.getG17_1()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:CountryCode").setText(format(cs.getG15_1()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:CounryName").setText(format(cs.getG16r()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:City").setText(formatUpClean(cs.getG18r_1()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:StreetHouse").setText(ss(formatUpClean(cs.getG19r()), 0, 50).toUpperCase());

            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:ShortName").setText(Utils.ss(cs.getG4r(), 0, 35).toUpperCase());
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:PostalCode").setText(format(cs.getG47_1()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:CountryCode").setText(format(cs.getG45_1()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:CounryName").setText(format(cs.getG46r()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:City").setText(formatUpClean(cs.getG48r()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:StreetHouse").setText(ss(formatUpClean(cs.getG49r()), 0, 50).toUpperCase());

            doc.selectSingleNode("//ESADout_CU:ESADout_CUFilledPerson/catESAD_cu:ExecutionDate").setText(customDateFormater.format(new Date()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:ContainerIndicator").setText(isKont ? "1" : "0");

            String admoc = format(cs.getG171());
            String stationoc = format(cs.getG17());
            if (isBlank(admoc) && isBlank(stationoc)) {
                admoc = format(cs.getG691());
            }
            Countrys countrys = strnMap.get(admoc);
            if (countrys == null) {
                countrys = emptyCountry;
            }
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:DispatchCountryCode").setText(countrys.getCountryId());
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:DispatchCountryName").setText(formatUp(countrys.getCountryName()));

            String admnc = format(cs.getG12());
            countrys = strnMap.get(admnc);
            if (countrys == null) {
                countrys = emptyCountry;
            }
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:DestinationCountryCode").setText(countrys.getCountryId());
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:DestinationCountryName").setText(formatUp(countrys.getCountryName()));

            Node transportMeansNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUDepartureArrivalTransport/ESADout_CU:TransportMeans");
            Element transportMeansNodeParent = transportMeansNode.getParent();
            transportMeansNodeParent.remove(transportMeansNode);

            if (isKont) {
                doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:ESADout_CUDepartureArrivalTransport/ESADout_CU:TransportMeansQuantity").setText(String.valueOf(cs.countConts()));

                ArrayList<CimSmgsKonList> kontList = new ArrayList<>();
                for (CimSmgsCarList csc : cs.getCimSmgsCarLists().values()) {
                    kontList.addAll(csc.getCimSmgsKonLists().values());
                }


                for (CimSmgsKonList csk : kontList) {
                    String g18 = normNvagNkonStr(csk.getUtiN());
//          String prin = "";
//          String nkon = "";
//          Matcher m = prin_p.matcher(g18);
//          if (m.find())
//            prin = m.group();
//          m = nkon_p.matcher(g18);
//          if (m.find())
//            nkon = m.group();
//          g18 = isBrest ? nkon + prin : prin + nkon;
                    nkonList.add(g18);

                    Node clone = (Node)transportMeansNode.clone();
                    transportMeansNodeParent.add(clone);
                    clone.selectSingleNode("cat_ru:TransportKindCode").setText("901");
                    clone.selectSingleNode("cat_ru:TransportIdentifier").setText(g18);
                    countrys = diffCountry;
                    if (csk.getKodSob() != null) {
                        countrys = Optional.ofNullable(strnMap.get(String.valueOf(csk.getKodSob()))).orElse(diffCountry);
                    }
                    clone.selectSingleNode("cat_ru:TransportMeansNationalityCode").setText(countrys.getCountryNo());
                }
            }
            else {
                doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:ESADout_CUDepartureArrivalTransport/ESADout_CU:TransportMeansQuantity").setText(String.valueOf(cs.vagsConts()));
                for (CimSmgsCarList csc : cs.getCimSmgsCarLists().values()) {
                    String g18 = normNvagNkonStr(csc.getNvag());
                    nvagList.add(g18);

                    Node clone = (Node)transportMeansNode.clone();
                    transportMeansNodeParent.add(clone);
                    clone.selectSingleNode("cat_ru:TransportKindCode").setText("298");
                    clone.selectSingleNode("cat_ru:TransportIdentifier").setText(g18);
                    countrys = diffCountry;
                    if (csc.getKodSob() != null) {
                        countrys = Optional.ofNullable(strnMap.get(String.valueOf(csc.getKodSob()))).orElse(diffCountry);
                    }
                    clone.selectSingleNode("cat_ru:TransportMeansNationalityCode").setText(countrys.getCountryNo());
                }
            }

            String tpCode = "";
            String tpName = "";
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:TDDeliveryPlace/ESADout_CU:DeliveryCustomsOffice/cat_ru:Code").setText(tpCode);
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:TDDeliveryPlace/ESADout_CU:DeliveryCustomsOffice/cat_ru:OfficeName").setText(tpName);

            doc.selectSingleNode("//ESADout_CU:ESADout_CUMainContractTerms/catESAD_cu:ContractCurrencyCode").setText(zeroTotalInvoiceCost ? "" : defaultString(firstCsi.getCux()));
//            doc.selectSingleNode("//ESADout_CU:ESADout_CUMainContractTerms/catESAD_cu:CurrencyQuantity").setText(zeroTotalInvoiceCost ? "" : String.valueOf(cuxSet.size()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUMainContractTerms/catESAD_cu:TotalInvoiceAmount").setText(cuxSet.size() == 1 && !zeroTotalInvoiceCost ? totalInvoiceCost.toString() : "");

            if (isGroup) {
                doc.selectSingleNode("//catESAD_cu:TotalSheetNumber").setText(String.valueOf((groupedData2Map.size() - 1 + 2) / 3 + 1));

                Node goodsNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods");
                if (!isKont) {
                    Node kontNode = goodsNode.selectSingleNode("//ESADout_CU:ESADContainer");
                    Element kontNodeParent = kontNode.getParent();
                    kontNodeParent.remove(kontNode);
                }

                Element goodsNodeParent = goodsNode.getParent();
                @SuppressWarnings("unchecked")
                List<Node> lst = goodsNodeParent.elements();
                int goodsIdx = lst.indexOf(goodsNode);
                //        goodsNodeParent.remove(goodsNode);
                lst.remove(goodsIdx);

                Iterator<Map.Entry<String, GroupedData2>> it = groupedData2Map.entrySet().iterator();
                for (int k = 0, j = 1; k < groupedData2Map.size(); k++, j++) {
                    Map.Entry<String, GroupedData2> ent = it.next();
                    GroupedData2 gd = ent.getValue();
                    //          goodsNodeParent.add((Node)goodsNode.clone());
                    lst.add(goodsIdx++, (Node)goodsNode.clone());

                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsNumeric").setText(String.valueOf(j));
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsDescription").setText(Utils.formatUp(gd.getName()));
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GrossWeightQuantity").setText(gd.getBrutto().setScale(3, RoundingMode.HALF_UP).toString());
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:NetWeightQuantity").setText(gd.getNetto().setScale(3, RoundingMode.HALF_UP).toString());
                    BigDecimal pr = gd.getSum().setScale(2, BigDecimal.ROUND_HALF_UP);
                    boolean zeroPrice = BigDecimal.ZERO.compareTo(pr) == 0;
                    String price = pr.toString();
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:InvoicedCost").setText(zeroPrice ? "" : price);
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsTNVEDCode").setText(defaultString(ent.getKey()));
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:AdditionalSheetCount").setText(String.valueOf((j - 1 + 2) / 3 + 1));
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:CurrencyCode").setText(defaultString(zeroPrice ? "" : gd.getCux()));

                    String notp = cs.getG694();
                    if (StringUtils.isBlank(notp)) {
                        notp = defaultString(firstCsi.getNotpr());
                    }
                    Node docNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument/catESAD_cu:PresentedDocumentModeCode[text()='02013']/parent::*");
                    docNode.selectSingleNode("cat_ru:PrDocumentNumber").setText(notp);
                    Date d = isSmgs ? cs.getG281() : cs.buildG16Date();
                    docNode.selectSingleNode("cat_ru:PrDocumentDate").setText(d != null ? customDateFormater.format(d) : "");

                    docNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument/catESAD_cu:PresentedDocumentModeCode[text()='02014']/parent::*");
                    if (withKontList) {
                        if (docNode != null) {
                            docNode.selectSingleNode("cat_ru:PrDocumentDate").setText(d != null ? customDateFormater.format(d) : "");
                        }
                    }
                    else {
                        docNode.getParent().remove(docNode);
                    }

                    docNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument/catESAD_cu:PresentedDocumentModeCode[text()='04021']/parent::*");
                    Element docNodeParent = docNode.getParent();
                    @SuppressWarnings("unchecked")
                    List<Node> lst3 = docNodeParent.elements();
                    int docIdx = lst3.indexOf(docNode);
                    //          docNodeParent.remove(docNode);
                    lst3.remove(docIdx);
                    for (Map.Entry<String, Date> invNoDateEnt : gd.getInvNoDateSet().entrySet()) {
                        Node clone = (Node)docNode.clone();
                        lst3.add(docIdx++, clone);
                        //            docNodeParent.add(clone);
                        clone.selectSingleNode("cat_ru:PrDocumentNumber").setText(defaultString(invNoDateEnt.getKey()));
                        d = invNoDateEnt.getValue();
                        clone.selectSingleNode("cat_ru:PrDocumentDate").setText(d != null ? customDateFormater.format(d) : "");
                    }

                    docNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument/catESAD_cu:PresentedDocumentModeCode[text()='+++']/parent::*");
                    docNodeParent = docNode.getParent();
                    @SuppressWarnings("unchecked")
                    List<Node> lst2 = docNodeParent.elements();
                    int idx = lst2.indexOf(docNode);
                    lst2.remove(idx);
                    for (CimSmgsDocs csd : cs.getCimSmgsDocses9().values()) {
                        String code = csd.getCode();
                        String text = csd.getText();
                        String ncas = csd.getNcas();
                        String ndoc = csd.getNdoc();
                        d = csd.getDat();

                        if ("380".equals(code) || "04021".equals(ncas) || "ИНВОЙС".equalsIgnoreCase(text)) {
                            continue;
                        }
                        if (("271".equals(code) || "02026".equals(ncas)) && StringUtils.isBlank(ndoc) && d == null) {
                            log.debug("Found document CODE=271 with empty NDOC and DAT - skipping");
                            continue;
                        }
                        if (!withKontList && "02014".equals(ncas)) {
                            log.debug("Found document NCAS=02014 - skipping");
                            continue;
                        }
                        if (StringUtils.isBlank(ncas)) {
                            continue;
                        }

                        Node clone = (Node)docNode.clone();
                        lst2.add(idx++, clone);
                        clone.selectSingleNode("catESAD_cu:PresentedDocumentModeCode").setText(ncas);
                        if (StringUtils.isBlank(ndoc)) {
                            ndoc = text;
                        }
                        clone.selectSingleNode("cat_ru:PrDocumentNumber").setText(Utils.formatUp(ndoc));
                        clone.selectSingleNode("cat_ru:PrDocumentDate").setText(d != null ? customDateFormater.format(d) : "");
                    }

                    BigDecimal kole2 = BigDecimal.ZERO /*gd.getAmount()*/;
                    if (BigDecimal.ZERO.compareTo(kole2) != 0) {
                        doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:SupplementaryGoodsQuantity/cat_ru:GoodsQuantity").setText(df3bit.format(kole2));
                        doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:SupplementaryGoodsQuantity/cat_ru:MeasureUnitQualifierName").setText("ШТ");
                        doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:SupplementaryGoodsQuantity/cat_ru:MeasureUnitQualifierCode").setText("796");
                    }
                    else {
                        Node kole2Node = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:SupplementaryGoodsQuantity");
                        Element kole2NodeParent = kole2Node.getParent();
                        kole2NodeParent.remove(kole2Node);
                    }

                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADGoodsPackaging/catESAD_cu:PakageQuantity").setText(df3bit.format(gd.getKolm()));
//          doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADGoodsPackaging/catESAD_cu:PackageCode").setText(defaultString(tab7.getElementAt(0, "kypk")));

                    if (isKont) {
                        doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADContainer/catESAD_cu:ContainerQuantity").setText(String.valueOf(gd.getNkonSet().size()));

                        Node kontNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADContainer/catESAD_cu:ContainerNumber");
                        Element kontNodeParent = kontNode.getParent();
                        kontNodeParent.remove(kontNode);

                        for (String g18 : gd.getNkonSet()) {
                            Node clone = (Node)kontNode.clone();
                            kontNodeParent.add(clone);
                            clone.selectSingleNode("catESAD_cu:ContainerIdentificaror").setText(g18);
                        }
                    }

                } // for (groupedData2Map.size())
            }  // if (isGroup)

//            res = doc.asXML();
            OutputFormat format = OutputFormat.createPrettyPrint();
            format.setEncoding(UTF8);
            StringWriter sw = new StringWriter();
            XMLWriter writer = new XMLWriter(sw, format);
            writer.write(doc);
            writer.close();
            res = sw.toString();
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }

        return res;
    }

    private TreeMap<String, GroupedData2> groupGruzBit3(List<CimSmgsInvoiceGruzDTO> tab, TreeMap<String, GroupedData2> groupedData2Map) {
        for (CimSmgsInvoiceGruzDTO item : tab) {
            String tnved = defaultString(item.getTnved());
            GroupedData2 gd = groupedData2Map.get(tnved);
            if (gd == null) {
                gd = new GroupedData2();
                groupedData2Map.put(tnved, gd);
            }

            gd.addInvNoDate(item.getInvoice(), item.getDat_inv());
            BigDecimal amount = item.getKole();
            gd.addAmount(amount);
            gd.addKolm(item.getKolm());
            gd.addNetto(item.getMnet());
            gd.addBrutto(item.getMbrt());
            gd.addSum(makeBigDecimal(item.getItogo()));
            gd.addName(item.getNzgr(), amount, item.getCus_edizm());
            gd.setCux(item.getCux());
            gd.addNkon(defaultString(item.getNkon()).split(","));
        }

        BigDecimal totalKolm = BigDecimal.ZERO;
        BigDecimal maxBrutto = BigDecimal.ZERO;
        Map.Entry<String, GroupedData2> maxBruttoTnved = null;
        for (Map.Entry<String, GroupedData2> item : groupedData2Map.entrySet()) {
            GroupedData2 gd = item.getValue();
            totalKolm = totalKolm.add(gd.getKolm());
            gd.setKolm(BigDecimal.ZERO);
            if (gd.getBrutto().compareTo(maxBrutto) > 0) {
                maxBrutto = gd.getBrutto();
                maxBruttoTnved = item;
            }
        }

        if (maxBruttoTnved != null) {
            maxBruttoTnved.getValue().setKolm(totalKolm);
        }

        return groupedData2Map;
    }

    private BigDecimal inc(BigDecimal total, BigDecimal val) {
        if (val != null)
            total = total.add(val);
        return total;
    }

    private BigDecimal inc(BigDecimal total, Short val) {
        if (val != null)
            total = total.add(new BigDecimal(val));
        return total;
    }

    private BigDecimal inc(BigDecimal total, Integer val) {
        if (val != null)
            total = total.add(new BigDecimal(val));
        return total;
    }

}
