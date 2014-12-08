package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.axis.client.Call;
import org.apache.axis.client.Service;
import org.apache.axis.encoding.XMLType;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import javax.xml.namespace.QName;
import javax.xml.rpc.ParameterMode;
import java.io.File;
import java.math.BigDecimal;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.*;

public class BTSConvertor {
    private static final String Encoding = "utf-8";
    private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
    private static final SimpleDateFormat CustomDateFormater = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat CustomTimeFormater = new SimpleDateFormat("HH:mm:ssZ");
    private static final SimpleDateFormat CustomDateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
    private static Logger log = LoggerFactory.getLogger(BTSConvertor.class);
    private String transportServer = null;

    public BTSConvertor(ServletContext sc) {
        transportServer = sc.getInitParameter("transportServer");
    }

    public void makePI(Long pdId) throws Exception {
        Session session = null;
        Transaction tx = null;
        long messageId = -1;

        if (transportServer == null) {
            throw new Exception("Адрес сервера ФТС не определен");
        }

        try {
            session = HibernateUtil.getSession();

            PackDoc pd = (PackDoc)session.get(PackDoc.class, pdId);
            if (pd != null) {
                CimSmgs cs = null;
                for (CimSmgs ccc : pd.getCimSmgses()) {
                    Byte type = ccc.getType();
                    if (type != null && (type == 1 || type == 2)) {
                        cs = ccc;
                        break;
                    }
                }
                if (cs != null) {
                    log.debug("Found document with HID=" + cs.getHid() + " and TYPE=" + cs.getType());
                    String ftsNomer = cs.getFtsNomer();
                    String[] res = getText(cs, ftsNomer);

                    log.debug(res[1] + " : " + res[0]);

//                    TbcLog tl = new TbcLog();
//                    tl.setHid_src(pd.getHid());
//                    tl.setIn_out((byte)2);
//                    tl.setXml(text);
//                    tl.setTbc_nomer(packageName);
//                    session.save(tl);

                    Service service = new Service();
                    Call call = (Call) service.createCall();
                    call.setTargetEndpointAddress(new java.net.URL(transportServer));
                    call.setOperationName(new QName("ECPServer", "sign"));
                    call.addParameter("xmlStr", XMLType.XSD_STRING, ParameterMode.IN);
                    call.setReturnType(XMLType.AXIS_VOID);
                    call.setTimeout(new Integer(5*60*1000));
//                    if (forwardUser != null && forwardPass != null) {
//                        //  *** HTTP Авторизация для org.apache.axis.transport.http.HTTPSender
//                        call.setUsername(forwardUser);
//                        call.setPassword(forwardPass);
//                    }
                    call.invoke(new Object[] {res[0]});

                    String query = "UPDATE CimSmgs cs SET cs.ftsNomer=:a, cs.ftsStatus=1 WHERE cs.hid=:id";
                    Query q = session.createQuery(query);
                    q.setString("a", ftsNomer);
                    q.setLong("id", cs.getHid());
                    q.executeUpdate();
                }
                else {
                    throw new Exception("Перевозочный документ не найден (pd = " + pdId + ")");
                }
            }
        }
        catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
    }

    private String[] getText(CimSmgs cs, String ftsNomer) throws Exception {
        String res = null;
        String docID = null;
        String path = new File(new URI(this.getClass().getClassLoader().getResource("cus503.xml").toString().replaceAll(" ", "%20"))).getAbsolutePath();
        SAXReader reader = new SAXReader(false);

        Session session = HibernateUtil.getSession();
        PackDoc pd = cs.getPackDoc();
        Set<CimSmgsInvoice> csiSet = pd.getCsInvoices();
        if (csiSet.size() > 0) {
            CimSmgsInvoice csi = csiSet.iterator().next();
            Document doc = reader.read(path);

            if (StringUtils.isBlank(ftsNomer))
                docID = UUID.randomUUID().toString();
            doc.selectSingleNode("//cat_ru:DocumentID").setText(docID);

            String direction = null;
            String moveCode = null;
            String dstCountry = csi.getCountry_p();
            if ("BY".equalsIgnoreCase(dstCountry)) {
                direction = "ИМ";
                moveCode = "02";
            } else {
                direction = "ТР";
                moveCode = "RU".equalsIgnoreCase(dstCountry) ? "12" : "03";
            }
            doc.selectSingleNode("//ESADout_CU:TransitDirectionCode").setText(direction);
            doc.selectSingleNode("//ESADout_CU:MovementCode").setText(moveCode);

            Set<CimSmgsInvoiceGruz> scigSet = new HashSet<CimSmgsInvoiceGruz>();
            for (CimSmgsInvoice inv : csiSet) {
                scigSet.addAll(inv.getInvoiceGruzs().values());
            }
            doc.selectSingleNode("//catESAD_cu:TotalGoodsNumber").setText(String.valueOf(scigSet.size()));
            BigDecimal totalPackageNumber = BigDecimal.ZERO;
            BigDecimal totalInvoiceCost = BigDecimal.ZERO;
            for (CimSmgsInvoiceGruz csig : scigSet) {
                try {
                    totalPackageNumber = totalPackageNumber.add(csig.getKolm());
                    totalInvoiceCost = totalInvoiceCost.add(csig.makeItogoDecimal());
                } catch (Exception eee) {
                    log.warn(eee.getMessage());
                }
            }
            doc.selectSingleNode("//catESAD_cu:TotalPackageNumber").setText(String.valueOf(totalPackageNumber));
            doc.selectSingleNode("//catESAD_cu:TotalSheetNumber").setText(String.valueOf(scigSet.size()));

            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:OrganizationName").setText(Utils.ss(csi.getNotd(), 0, 35));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:ShortName").setText(Utils.ss(csi.getNotd(), 0, 35));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:PostalCode").setText(StringUtils.defaultString(csi.getZip_o()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:CountryCode").setText(StringUtils.defaultString(csi.getCountry_o()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:City").setText(StringUtils.defaultString(csi.getCity_o()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignor/cat_ru:Address/cat_ru:StreetHouse").setText(StringUtils.defaultString(csi.getAdres_o()));

            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:OrganizationName").setText(Utils.ss(csi.getNpol(), 0, 35));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:ShortName").setText(Utils.ss(csi.getNpol(), 0, 35));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:PostalCode").setText(StringUtils.defaultString(csi.getZip_p()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:CountryCode").setText(StringUtils.defaultString(csi.getCountry_p()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:City").setText(StringUtils.defaultString(csi.getCity_p()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsignee/cat_ru:Address/cat_ru:StreetHouse").setText(StringUtils.defaultString(csi.getAdres_p()));

            doc.selectSingleNode("//ESADout_CU:ESADout_CUFilledPerson/catESAD_cu:ExecutionDate").setText(CustomDateFormater.format(new Date()));


            boolean isKont = false;
            CimSmgsKonList csk = null;
            Collection<CimSmgsCarList> cars = cs.getCimSmgsCarLists().values();
            if (cars.size() > 0) {
                CimSmgsCarList csc = cars.iterator().next();
                Collection<CimSmgsKonList> konts = csc.getCimSmgsKonLists().values();
                if (konts.size() > 0) {
                    isKont = true;
                    csk = konts.iterator().next();
                }
            }
            doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/catESAD_cu:ContainerIndicator").setText(isKont ? "1" : "0");
            String g18 = csk.getUtiN();
            if (isKont) {
                doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:ESADout_CUDepartureArrivalTransport/ESADout_CU:TransportMeans/cat_ru:TransportIdentifier").setText(g18);
//          doc.selectSingleNode("//ESADout_CU:ESADout_CUConsigment/ESADout_CU:ESADout_CUBorderTransport/ESADout_CU:TransportMeans/cat_ru:TransportIdentifier").setText(g18);
            } else {
                Node transportNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUDepartureArrivalTransport");
                Element transportNodeParent = transportNode.getParent();
                transportNodeParent.remove(transportNode);
                transportNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUBorderTransport");
                transportNodeParent.remove(transportNode);
            }

            doc.selectSingleNode("//ESADout_CU:ESADout_CUMainContractTerms/catESAD_cu:ContractCurrencyCode").setText(StringUtils.defaultString(csi.getCux()));
            doc.selectSingleNode("//ESADout_CU:ESADout_CUMainContractTerms/catESAD_cu:TotalInvoiceAmount").setText(totalInvoiceCost.toString());

            Node goodsNode = doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods");
            if (!isKont) {
                Node kontNode = goodsNode.selectSingleNode("//ESADout_CU:ESADContainer");
                Element kontNodeParent = kontNode.getParent();
                kontNodeParent.remove(kontNode);
            }
            Element goodsNodeParent = goodsNode.getParent();
            goodsNodeParent.remove(goodsNode);
            int j = 1;
            for (CimSmgsInvoiceGruz csig : scigSet) {
                goodsNodeParent.add((Node) goodsNode.clone());
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsNumeric").setText(String.valueOf(j));
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsDescription").setText(StringUtils.defaultString(csig.getNzgr()));
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GrossWeightQuantity").setText(csig.makeMbrtString());
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:NetWeightQuantity").setText(csig.makeMnetString());
                String price = csig.makeItogoDecimal().setScale(2, BigDecimal.ROUND_HALF_UP).toString();
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:InvoicedCost").setText(price);
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:GoodsTNVEDCode").setText(StringUtils.defaultString(csig.getTnved()));
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/catESAD_cu:AdditionalSheetCount").setText(String.valueOf(j));
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:CurrencyCode").setText(StringUtils.defaultString(csi.getCux()));

                String notp = cs.getG694();
                if (StringUtils.isBlank(notp)) {
                    notp = StringUtils.defaultString(csi.getNotpr());
                }
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument[1]/cat_ru:PrDocumentNumber").setText(notp);
                Date d = cs.getG281();
                if (d == null) {
                    d = cs.buildG16Date();
                }
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument[1]/cat_ru:PrDocumentDate").setText(d != null ? CustomDateFormater.format(d) : "");

                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument[2]/cat_ru:PrDocumentNumber").setText(StringUtils.defaultString(csi.getInvoice()));
                d = csi.getDat_inv();
                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADout_CUPresentedDocument[2]/cat_ru:PrDocumentDate").setText(d != null ? CustomDateFormater.format(d) : "");

                doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADGoodsPackaging/catESAD_cu:PakageQuantity").setText(csig.makeKolmString());

                if (isKont) {
                    doc.selectSingleNode("//ESADout_CU:ESADout_CUGoods[" + j + "]/ESADout_CU:ESADContainer/catESAD_cu:ContainerNumber/catESAD_cu:ContainerIdentificaror").setText(g18);
                }

                j++;
            }

            res = doc.asXML();
        }
        else {
            throw new Exception("Инвойс не найден");
        }

        return new String[]{res, docID};
    }
}
