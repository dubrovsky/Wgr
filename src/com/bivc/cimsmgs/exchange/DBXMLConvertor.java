package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Sta;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.makeBigDecimal;
import static com.bivc.cimsmgs.exchange.Utils.makeByte;
import static com.bivc.cimsmgs.exchange.Utils.makeShort;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class DBXMLConvertor {

    private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
    private static final SimpleDateFormat dateTimeZoneFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ssX"); // 2009-04-29T14:42:24+02:00
    private static final SimpleDateFormat g16Formater = new SimpleDateFormat("MM-dd-HH");
    private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat dateFormater2 = new SimpleDateFormat("dd.MM.yyyy");
    private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
    private static Pattern kst = Pattern.compile("[0-9]{5}");
    private static Pattern prin_nkon = Pattern.compile("[a-zA-Z]{4}\\s*\\d{6}-*\\d");
    final static private Logger log = LoggerFactory.getLogger(DBXMLConvertor.class);
    final static private String nl = "\r\n";

    public DBXMLConvertor() {
    }

    public PackDoc receive(File file, String un, String trans, Route route, UsrGroupsDir usrgrdir) throws Exception {
        Date d = new Date();

        ArrayList<PackDoc> pdList = new ArrayList<>();

        try {
            SAXReader reader = new SAXReader(false);
            Document doc = reader.read(file);
            @SuppressWarnings("unchecked")
            List<Node> ecns = doc.selectNodes("/CIMECNMessages/ECNs/ECN");

            for (Node ecn : ecns) {
                try {
                   CimSmgs cs = new CimSmgs();
                    cs.setRoute(route);
                    cs.setType((byte) 10);
                    cs.setDattr(d);
                    cs.setUn(un);
                    cs.setTrans(trans);
                    cs.setG25((byte) 2);
                    cs.setTbcStatus((byte) 0);
                    cs.setDocType1(new BigDecimal(27));

                    cs.setAviso_num(doc.valueOf("/CIMECNMessages/ECNs/ECNHeader/MessageReferenceNumber"));
                    cs.setAmount(1L);

                    cs.setG17(ecn.valueOf("AcceptancePoint/Point/Code"));
                    cs.setG162(ecn.valueOf("AcceptancePoint/Point/Name"));
                    cs.setG171(ecn.valueOf("AcceptancePoint/Point/Country/UICCountryCode"));
                    Sta sta = loadSta(cs.getG17());
                    if (sta != null) {
                        cs.setG163(sta.getManagement().getMNameLat());
                    }

                    cs.setG692(ecn.valueOf("AcceptancePoint/Station/Code"));
                    cs.setG691(ecn.valueOf("AcceptancePoint/Station/Country/UICCountryCode"));
                    String g16Str = ecn.valueOf("AcceptancePoint/AcceptanceDate");
                    if (isNotBlank(g16Str)) {
                        Date dd = null;
                        try {
                            dd = dateTimeZoneFormater.parse(g16Str);
                        } catch (Exception ignore) {}
                        if (dd != null) {
                            cs.setG161(g16Formater.format(dd));
                        }
                    }
                    cs.setG693(ecn.valueOf("AcceptancePoint/CarrierCode"));
                    cs.setG694(ecn.valueOf("AcceptancePoint/ConsignmentNumber"));

                    cs.setG11(ecn.valueOf("DeliveryPoint/Point/Country/UICCountryCode") + " " + ecn.valueOf("DeliveryPoint/Point/Code"));

                    cs.setG121(ecn.valueOf("DeliveryPoint/Station/Code"));
                    cs.setG101(ecn.valueOf("DeliveryPoint/Station/Name"));
                    cs.setG12(ecn.valueOf("DeliveryPoint/Station/Country/UICCountryCode"));
                    sta = loadSta(cs.getG121());
                    if (sta != null) {
                        cs.setG102(sta.getManagement().getMNameLat());
                    }

                    Node custNode = ecn.selectSingleNode("Customers/Customer[@Type='CR']");
                    if (custNode != null) {
                        cs.setG2(custNode.valueOf("CustomerCode"));
                        cs.setG1(custNode.valueOf("Name"));
                        cs.setG110(custNode.valueOf("VAT"));
                        cs.setG19_1(custNode.valueOf("Street"));
                        cs.setG15_1(custNode.valueOf("Country"));
                        cs.setG17_1(custNode.valueOf("ZIPCode"));
                        cs.setG18_1(custNode.valueOf("City"));
                    }

                    custNode = ecn.selectSingleNode("Customers/Customer[@Type='CE']");
                    if (custNode != null) {
                        cs.setG4(custNode.valueOf("Name"));
                        cs.setG49(custNode.valueOf("Street"));
                        cs.setG45_1(custNode.valueOf("Country"));
                        cs.setG47_1(custNode.valueOf("ZIPCode"));
                        cs.setG48_1(custNode.valueOf("City"));
                    }

                    custNode = ecn.selectSingleNode("Customers/Customer[@Type='FPCE']");
                    if (custNode != null) {
                        cs.setG6(custNode.valueOf("CustomerCode"));
                    }

                    byte docSort = 0;
                    for (Node node : (List<Node>)ecn.selectNodes("ConsignorDeclarations/ConsignorDeclaration")) {
                        CimSmgsDocs csd = new CimSmgsDocs();
                        csd.setFieldNum("7");
                        csd.setCode(node.valueOf("Code"));
                        csd.setText2(node.valueOf("Text"));
                        csd.setSort(docSort++);
                        cs.addCimSmgsDocsItem(csd);
                    }

                    cs.setG15(ecn.valueOf("AdditionalInformation/InformationConsignee"));

                    for (Node node : (List<Node>)ecn.selectNodes("CommercialSpecifications/CommercialSpecification")) {
                        CimSmgsDocs csd = new CimSmgsDocs();
                        csd.setFieldNum("13");
                        csd.setCode(node.valueOf("Code"));
                        csd.setText2(node.valueOf("Text"));
                        csd.setSort(docSort++);
                        cs.addCimSmgsDocsItem(csd);
                    }

                    cs.setG591(ecn.valueOf("PrepaymentInstructions/PrepaidcodeCarrier"));

                    String tarif = ecn.valueOf("Tariff/ContractNumber");
                    if (isNotBlank(tarif)) {
                        cs.setG141("1");
                        cs.setG142(tarif);
                    }
                    else {
                        tarif = ecn.valueOf("Tariff/TariffNumber");
                        if (isNotBlank(tarif)) {
                            cs.setG141("2");
                            cs.setG142(tarif);
                        }
                    }

                    StringBuilder g60 = new StringBuilder();
                    // работает только до 10, т.к. сортирует как строки
                    for (Node node : (List<Node>)ecn.selectNodes("Routing/RouteSection", "number(@SequenceID)")) {
                        g60.append(node.valueOf("RouteCode"));
                    }
                    cs.setG60(g60.toString());

                    String g661Str = ecn.valueOf("CustomsData/STP");
                    cs.setGb661((byte)("true".equals(g661Str) ? 1 : 0));
                    cs.setGb662(ecn.valueOf("CustomsData/PrincipalCode"));
                    if ("true".equals(ecn.valueOf("CustomsData/CustomsSurveillance"))) {
                        cs.setG26(ecn.valueOf("CustomsData/MRNNumber"));
                    }

                    StringBuilder g65_1 = new StringBuilder();
                    StringBuilder g65_2 = new StringBuilder();
                    StringBuilder g65_3 = new StringBuilder();
                    byte perevozSort = 0;
                    for (Node node : (List<Node>)ecn.selectNodes("Carriers/Carrier", "number(@sequenceID)")) {
                        String status = node.valueOf("Status");
                        CimSmgsPerevoz per = new CimSmgsPerevoz();

                        per.setCodePer(node.valueOf("CarrierCode"));

                        per.setAdmStBeg(node.valueOf("SectionFrom/Station/UICCountryCode"));
                        per.setCodStBeg(node.valueOf("SectionFrom/Station/StationCode"));
                        per.setStBeg(node.valueOf("SectionFrom/Station/StationName"));

                        per.setAdmStEnd(node.valueOf("SectionTo/Station/UICCountryCode"));
                        per.setCodStEnd(node.valueOf("SectionTo/Station/StationCode"));
                        per.setStEnd(node.valueOf("SectionTo/Station/StationName"));

                        per.setSort(perevozSort++);
                        cs.addCimSmgsPerevozItem(per);

                        if (!"0".equals(status)) {
                            g65_1.append(nl)
                                    .append(per.getCodePer())
                                    .append("  ")
                                    .append(node.valueOf("CarrierName"));
                            g65_2.append(nl)
                                    .append(per.getAdmStBeg())
                                    .append(" ")
                                    .append(per.getCodStBeg())
                                    .append("   ")
                                    .append(per.getAdmStEnd())
                                    .append(" ")
                                    .append(per.getCodStEnd());
                            g65_3.append(nl)
                                    .append(status);
                        }
                    }
                    if (g65_1.length() > 2) g65_1.delete(0, 2);
                    if (g65_2.length() > 2) g65_2.delete(0, 2);
                    if (g65_3.length() > 2) g65_3.delete(0, 2);
                    cs.setG65(g65_1.toString());
                    cs.setG651(g65_2.toString());
                    cs.setG652(g65_3.toString());

                    cs.setGa66(ecn.valueOf("ContractualCarrier/CarrierCode") + nl + ecn.valueOf("ContractualCarrier/CarrierName"));

                    cs.setG28(ecn.valueOf("MadeOut/Place"));
                    Date dd = null;
                    try {
                        String g28Str = ecn.valueOf("MadeOut/Date");
                        dd = dateFormater.parse(g28Str);
                    }
                    catch (Exception ignore) {}
                    cs.setG281(dd);

                    for (Node node : (List<Node>)ecn.selectNodes("ChargingSections/ChargingSection")) {
                        cs.setGa491(node.valueOf("Start/UICCountryCode"));
                        cs.setGa493(node.valueOf("Start/StationCode"));
                        cs.setGa492(node.valueOf("End/UICCountryCode"));
                        cs.setGa494(node.valueOf("End/StationCode"));
                        cs.setGa50(node.valueOf("CommercialRouteCode"));
                        cs.setGa52(node.valueOf("CurrencyCode"));
                        cs.setGa51(node.valueOf("Tariff/NHMCode"));
                        cs.setGa54(node.valueOf("Tariff/TariffNumber"));
                        break; //отработать только одну итерацию
                    }

                    byte carSort = 0;
                    byte konSort = 0;
                    int gruzSort = 0;
                    StringBuilder allPlombs = new StringBuilder();
                    CimSmgsKonList firstKont = null;
                    boolean isRid = false;
                    for (Node vagNode : (List<Node>)ecn.selectNodes("Wagons/Wagon")) {
                        String nvag = vagNode.valueOf("@WagonNumber");
                        String tara_vag = vagNode.valueOf("WagonDetails/WagonTypeDetails/WagonMass");
                        String kol_os =  vagNode.valueOf("WagonDetails/WagonTypeDetails/AxleNumber");
                        String vag_len =  vagNode.valueOf("WagonDetails/WagonTypeDetails/WagonLength");

                        for (Node utiNode : (List<Node>) vagNode.selectNodes("UTI")) {
                            CimSmgsCarList csc = new CimSmgsCarList();
                            CimSmgsKonList csk = new CimSmgsKonList();
                            if (firstKont == null) {
                                firstKont = csk;
                            }

                            csc.setNvag(nvag);
                            csc.setTaraVag(makeBigDecimal(tara_vag));
                            csc.setKolOs(makeByte(kol_os));

                            csk.setUtiN(utiNode.valueOf("UTIDetails/Prefix") + utiNode.valueOf("UTIDetails/@Number"));
                            csk.setKat(utiNode.valueOf("UTIDetails/Dimensions/LengthCode"));
                            csk.setSizeFoot(makeBigDecimal(utiNode.valueOf("UTIDetails/Dimensions/Length[@measure='ft']/@value")));
                            csk.setSizeMm(makeBigDecimal(utiNode.valueOf("UTIDetails/Dimensions/Length[@measure='mm']/@value")));
                            csk.setTaraKont(makeShort(utiNode.valueOf("UTIDetails/TareWeight")));

                            StringBuilder kontPlombs = new StringBuilder();
                            byte plombSort = 0;
                            for (Node plombNode : (List<Node>) utiNode.selectNodes("UTIDetails/Seals")) {
                                String znak = plombNode.valueOf("SealsDescription");
                                CimSmgsPlomb csp = new CimSmgsPlomb();
                                csp.setKpl((short) 1);
                                csp.setZnak(znak);
                                csp.setSort(plombSort++);
                                cs.addCimSmgsPlombItem(csp);

                                kontPlombs.append(",").append(znak);
                            }
                            if (kontPlombs.length() > 1) kontPlombs.deleteCharAt(0);
                            csk.setPlombs(kontPlombs.toString());

                            for (Node gruzNode : (List<Node>) utiNode.selectNodes("Goods/Good")) {
                                CimSmgsGruz csg = new CimSmgsGruz();
                                csg.setKgvn(gruzNode.valueOf("NHMCode"));
                                csg.setNzgrEu(gruzNode.valueOf("GoodDescription"));
                                csg.setMassa(makeBigDecimal(gruzNode.valueOf("GrossMass")));

                                isRid = isRid || gruzNode.numberValueOf("count(RID)").intValue() > 0;
                                csg.setNzgrRidEu(gruzNode.valueOf("RID/LongTextDescription"));
                                csg.setNzgrRidEu(gruzNode.valueOf("RID/LongTextDescription"));

                                csg.setSort(gruzSort++);
                                firstKont.addCimSmgsGruzItem(csg);
                            }


                            csk.setSort(konSort++);
                            csc.addCimSmgsKonListItem(csk);

                            csc.setSort(carSort++);
                            cs.addCimSmgsCarListItem(csc);
                        }
                    }
                    if (allPlombs.length() > 1) allPlombs.deleteCharAt(0);
                    cs.setG2012(allPlombs.toString());
                    cs.setG22((byte) (isRid ? 1 : 0));

                    /*
                    String datStr = root.valueOf("Inst_InstDate");
                    if (StringUtils.isNotBlank(datStr)) {
                        try {
                            cs.setAviso_dat(dateFormater2.parse(datStr.trim()));
                        } catch (ParseException ignored) {
                        }
                    }

                    datStr = root.valueOf("Inst_TransEndPeriod");
                    if (StringUtils.isNotBlank(datStr)) {
                        try {
                            cs.setAviso_cod_dat(dateFormater2.parse(datStr.trim()));
                        } catch (ParseException ignored) {
                        }
                    }

                    long kol = 0;
                    String kolStr = root.valueOf("Inst_WagKontQnt");
                    try {
                        kol = Long.parseLong(kolStr);
                    } catch (NumberFormatException nfex) {
                    }
                    cs.setAmount(kol);
*/

                    PackDoc pd = new PackDoc();
                    pd.setRoute(route);
                    pd.setUsrGroupsDir(usrgrdir);
                    pd.addCimSmgsItem(cs);

                    HibernateUtil.getSession().save(pd);

                    pdList.add(pd);
                }
                catch (Exception e) {
                    log.error(e.getMessage(), e);
                }
            }
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }

        return pdList.size() > 0 ? pdList.get(0) : null;
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
