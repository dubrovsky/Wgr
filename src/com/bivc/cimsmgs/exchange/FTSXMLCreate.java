package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by LAN on 16.10.2015.
 */
public class FTSXMLCreate {
    final static private Logger log = LoggerFactory.getLogger(FTSXMLCreate.class);
    private static final String encoding = "utf-8";
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    private static final String SMGSTypeDoc = "SMGS";
    private static final String INVOICETypeDoc = "INVOICE";

    public String createFTSXML_5_9_0(Long hid_cs) {
        HibernateUtil.getSession().beginTransaction();
        CimSmgs cimSmgs = (CimSmgs)HibernateUtil.getSession().createQuery("from CimSmgs where hid = :h").setLong("h", hid_cs).uniqueResult();
        return cimSmgs != null ? createFTSXML_5_9_0(cimSmgs) : "";
    }

    public String createFTSXML_5_8_0(Long hid_cs, Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        HibernateUtil.getSession().beginTransaction();
        CimSmgs cimSmgs = (CimSmgs)HibernateUtil.getSession().createQuery("from CimSmgs where hid = :h").setLong("h", hid_cs).uniqueResult();
        return cimSmgs != null ? createFTSXML_5_8_0(cimSmgs, tbc2Pack, newProc) : "";
    }

    public String createFTSXML_5_9_0(CimSmgs cs) {
        String ftsxml = "";
        try {
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);

            Element root = doc.addElement("rwb:RailwayBill")
                    .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.8.0")
                    .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.8.0")
                    .addNamespace("cltTrans_ru", "urn:customs.ru:Information:TransportDocuments:TransportCommonLeafTypesCust:5.4.3")
                    .addNamespace("catTrans_ru", "urn:customs.ru:Information:TransportDocuments:TransportCommonAgregateTypesCust:5.8.0")
                    .addNamespace("rwb", "urn:customs.ru:Information:TransportDocuments:Railway:RailwayBill:5.9.0")
                    .addNamespace("catTrans_cu", "urn:customs.ru:Information:TransportDocuments:CUTransportCommonAgregateTypesCust:5.8.0")
                    .addNamespace("cltTrans_cu", "urn:customs.ru:Information:TransportDocuments:CUTransportCommonLeafTypesCust:5.8.0")
                    .addNamespace("rwb", "urn:customs.ru:Information:TransportDocuments:Railway:RailwayBill:5.9.0")
                    .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
//                    .addAttribute("xsi:schemaLocation", "urn:customs.ru:Information:TransportDocuments:Railway:RailwayBill:5.9.0 file:/E:/workIdea/cimsmgs2/doc/railwayBill/RailwayBill.xsd")
                    .addAttribute("DocumentModeID", "1003401E");

            root.addElement("rwb:Number").addText(StringUtils.defaultString(cs.getG694()));
            root.addElement("rwb:ConsignorNotice").addText(StringUtils.defaultString(cs.getZayav_otpr()));
            root.addElement("rwb:ConsignorOptionNotice").addText(StringUtils.defaultString(cs.getG141()));
            root.addElement("rwb:GrossWeightQuantity").addText(""+cs.getG24B());
            root.addElement("rwb:LoaderModeDescription").addText(cs.getG22() == 0 ? "Отправителем" : "Перевозчиком" );
            root.addElement("rwb:CustomsNotice").addText(StringUtils.defaultString(cs.getG26()));
            root.addElement("rwb:WeightDefinitionModeDescription").addText(StringUtils.defaultString(cs.getGs_48()));

            Element consignor = root.addElement("rwb:Consignor");
            consignor.addElement("cat_ru:OrganizationName").addText(StringUtils.defaultString(cs.getG1r()));
            consignor.addElement("cat_ru:OKPOID").addText(StringUtils.defaultString(cs.getG2()));

            if ("RU".equalsIgnoreCase(StringUtils.defaultString(cs.getG15_1()).trim())) {
                Element consignorRFOrganizationFeatures = consignor.addElement("cat_ru:RFOrganizationFeatures");
                consignorRFOrganizationFeatures.addElement("cat_ru:INN").addText(StringUtils.defaultString(cs.getG_2inn()));
            }

            Element consignorAddress = consignor.addElement("cat_ru:Address");
            consignorAddress.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(cs.getG17_1()));
            consignorAddress.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(cs.getG15_1()));
            consignorAddress.addElement("cat_ru:CounryName").addText(StringUtils.defaultString(cs.getG16r()));
            consignorAddress.addElement("cat_ru:City").addText(StringUtils.defaultString(cs.getG18r_1()));

            Element consignee = root.addElement("rwb:Consignee");
            consignee.addElement("cat_ru:OKPOID").addText(StringUtils.defaultString(cs.getG5_()));

            if ("RU".equalsIgnoreCase(StringUtils.defaultString(cs.getG45_1()).trim())) {
                Element consigneeRFOrganizationFeatures = consignee.addElement("cat_ru:RFOrganizationFeatures");
                consigneeRFOrganizationFeatures.addElement("cat_ru:INN").addText(StringUtils.defaultString(cs.getG_5inn()));
            }

            Element consigneeAddress = consignee.addElement("cat_ru:Address");
            consigneeAddress.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(cs.getG47_1()));
            consigneeAddress.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(cs.getG45_1()));
            consigneeAddress.addElement("cat_ru:CounryName").addText(StringUtils.defaultString(cs.getG46r()));
            consigneeAddress.addElement("cat_ru:City").addText(StringUtils.defaultString(cs.getG48r()));
            consigneeAddress.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(cs.getG49r()));

            Element destinationStation = root.addElement("rwb:DestinationStation");
            destinationStation.addElement("rwb:RailwayCode").addText(StringUtils.defaultString(cs.getG102r()));
            destinationStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cs.getG121()));
            destinationStation.addElement("rwb:RailwayAndStationName").addText(StringUtils.defaultString(cs.getG101r()));


            for (CimSmgsDocs cimSmgsDocses13 : cs.getCimSmgsDocses13().values()) {
                Element docses13 = root.addElement("rwb:BorderStation");
                docses13.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsDocses13.getText()));
                docses13.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsDocses13.getText2()));
                docses13.addElement("rwb:RailwayCode").addText(StringUtils.defaultString(cimSmgsDocses13.getRoad_s_name_r()));
            }

            for (CimSmgsCarList cimSmgsCarList : cs.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList cimSmgsKon : cimSmgsCarList.getCimSmgsKonLists().values()) {
                    for (CimSmgsGruz cimSmgsGruz : cimSmgsKon.getCimSmgsGruzs().values()) {
                        Element RWBGoods = root.addElement("rwb:RWBGoods");
                        RWBGoods.addElement("rwb:PlaceGoodsQuantity").addText(cimSmgsGruz.getPlaces() != null ? cimSmgsGruz.getPlaces().toString() : "");
                        RWBGoods.addElement("rwb:HarmonizedRangeGoods").addText(StringUtils.defaultString(cimSmgsGruz.getKgvn()));
                        RWBGoods.addElement("rwb:Packing").addText(StringUtils.defaultString(cimSmgsGruz.getUpak()));
                        RWBGoods.addElement("rwb:CarriageNumber").addText(StringUtils.defaultString(cimSmgsCarList.getNvag()));
                        RWBGoods.addElement("rwb:ContainerNumber").addText(StringUtils.defaultString(cimSmgsKon.getUtiN()));
                    }
                }
            }

            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList cimSmgsKon : cimSmgsCar.getCimSmgsKonLists().values()) {
                    Element container = root.addElement("rwb:Container");
                    container.addElement("rwb:RailwayCode").addText(cimSmgsKon.getKodSob() != null ? cimSmgsKon.getKodSob().toString() : "");
                    container.addElement("rwb:ContainerID").addText(StringUtils.defaultString(cimSmgsKon.getUtiN()));
                    container.addElement("rwb:Tare").addText(cimSmgsCar.getTaraVag() != null ? cimSmgsCar.getTaraVag().toString() : "");
                    container.addElement("rwb:GoodsWeight").addText(cs.getG24N() != null ? cs.getG24N().toString() : "");
                    container.addElement("rwb:ContainerLength").addText(StringUtils.defaultString(cimSmgsKon.getVid()));
                }
            }

            for (CimSmgsDocs cimSmgsDocses9 : cs.getCimSmgsDocses9().values()) {
                Element docses9 = root.addElement("rwb:ConsignorDocument");
                docses9.addElement("cat_ru:PrDocumentName").addText(StringUtils.defaultString(cimSmgsDocses9.getText()));
                docses9.addElement("cat_ru:PrDocumentNumber").addText(StringUtils.defaultString(cimSmgsDocses9.getNdoc()));
                docses9.addElement("cat_ru:PrDocumentDate").addText(cimSmgsDocses9.getDat() != null ? df.format(cimSmgsDocses9.getDat()): "");
                docses9.addElement("catTrans_ru:ModeCode").addText(StringUtils.defaultString(cimSmgsDocses9.getNcas()));
            }

            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
                Element carriage = root.addElement("rwb:Carriage");
                carriage.addElement("rwb:CarriageID").addText(StringUtils.defaultString(cimSmgsCar.getNvag()));
                carriage.addElement("rwb:OwnerType").addText(StringUtils.defaultString(cimSmgsCar.getVagOtm()));
                carriage.addElement("rwb:Power").addText(cimSmgsCar.getGrPod() != null ? cimSmgsCar.getGrPod().toString() : "");
                carriage.addElement("rwb:AxisQuantity").addText(cimSmgsCar.getKolOs() != null ? cimSmgsCar.getKolOs().toString() : "");
                carriage.addElement("rwb:Tare").addText(cimSmgsCar.getTaraVag() != null ? cimSmgsCar.getTaraVag().toString() : "");
                carriage.addElement("rwb:Caliber").addText(StringUtils.defaultString(cimSmgsCar.getCicternType()));
            }

            for (CimSmgsPlomb cimSmgsPlomb : cs.getCimSmgsPlombs().values()) {
                Element seal = root.addElement("rwb:Seal");
                seal.addElement("rwb:SealID").addText(StringUtils.defaultString(cimSmgsPlomb.getZnak()));
                seal.addElement("rwb:SealQuantity").addText(cimSmgsPlomb.getKpl() != null ? cimSmgsPlomb.getKpl().toString() : "");
                seal.addElement("rwb:IdentKind").addText(StringUtils.defaultString(cimSmgsPlomb.getType()));
            }

            for (CimSmgsPerevoz cimSmgsPerevoz : cs.getCimSmgsPerevoz().values()) {
                Element carrier = root.addElement("rwb:Carrier");
                carrier.addElement("rwb:CarrierName").addText(StringUtils.defaultString(cimSmgsPerevoz.getNamPer()));

                Element fromStation = carrier.addElement("rwb:FromStation");
                fromStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsPerevoz.getCodStBeg()));
                fromStation.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsPerevoz.getStBeg()));

                Element toStation = carrier.addElement("rwb:ToStation");
                toStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsPerevoz.getCodStEnd()));
                toStation.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsPerevoz.getStEnd()));
            }

            for (CimSmgsPlatel cimSmgsPlatel : cs.getCimSmgsPlatels().values()) {
                Element paidRailwayCodeName = root.addElement("rwb:PaidRailwayCodeName");
                paidRailwayCodeName.addElement("rwb:PaidRailwayCode").addText(StringUtils.defaultString(cimSmgsPlatel.getDorR()));

                Element infoPayer = paidRailwayCodeName.addElement("rwb:InfoPayer");
                infoPayer.addElement("rwb:PayerName").addText(StringUtils.defaultString(cimSmgsPlatel.getPlatR()));
                infoPayer.addElement("rwb:PayerCode").addText(StringUtils.defaultString(cimSmgsPlatel.getKplat()));
            }

            Element contractCarrierDate = root.addElement("rwb:ContractCarrierDate");
            contractCarrierDate.addElement("rwb:Date").addText(cs.getG281() != null ? df.format(cs.getG281()) : "");



//            ftsxml = doc.asXML();
            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc);
            ftsxml = out.toString();

        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }

//        if (oldDocId != null) {
//          roi.addElement("roi:InitialEnvelopeID").addText(oldDocId);
//        }
//        roi.addElement("roi:SenderInformation").addText(senderInformation);
//        roi.addElement("roi:ReceiverInformation").addText(receiverInformation);
//        roi.addElement("roi:PreparationDateTime").addText(df3.format(curDate));
        return ftsxml;
    }


    public String createFTSXML_5_8_0(CimSmgs cs, Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        String ftsxml;
        String UID;
        Session session = null;
//        Transaction tx = null;

        try {
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);

            Element root = doc.addElement("rwb:RailwayBill")
                    .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.8.0")
                    .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
                    .addNamespace("cltTrans_cu", "urn:customs.ru:Information:TransportDocuments:CUTransportCommonLeafTypesCust:5.8.0")
                    .addNamespace("catTrans_ru", "urn:customs.ru:Information:TransportDocuments:TransportCommonAgregateTypesCust:5.8.0")
                    .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.8.0")
                    .addNamespace("cltTrans_ru", "urn:customs.ru:Information:TransportDocuments:TransportCommonLeafTypesCust:5.4.3")
                    .addNamespace("rwb", "urn:customs.ru:Information:TransportDocuments:Railway:RailwayBill:5.8.0")
                    .addNamespace("catTrans_cu", "urn:customs.ru:Information:TransportDocuments:CUTransportCommonAgregateTypesCust:5.8.0")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
//                    .addAttribute("xsi:schemaLocation", "urn:customs.ru:Information:TransportDocuments:Railway:RailwayBill:5.9.0 file:/E:/workIdea/cimsmgs2/doc/railwayBill/RailwayBill.xsd")
                    .addAttribute("DocumentModeID", "1003401E");


            if (newProc) {
                UID = UUID.randomUUID().toString();
            }
            else {
                List<Tbc2Log> tbc2Log = HibernateUtil.getSession().createQuery("from Tbc2Log where hid_pack = :h and doc_type = :t order by dattr desc").setLong("h", tbc2Pack.getHid()).setString("t", SMGSTypeDoc).list();
                if (tbc2Log.size() != 0) {
                    UID = tbc2Log.get(0).getDocId();
                }
                else
                    throw new Exception("Не найден идентификатор документа инвойс");
            }

            root.addElement("cat_ru:DocumentID").addText(UID);


            root.addElement("rwb:Number").addText(StringUtils.defaultString(cs.getG694()));
            root.addElement("rwb:ConsignorNotice").addText(StringUtils.defaultString(cs.getZayav_otpr()));
            root.addElement("rwb:ConsignorOptionNotice").addText(StringUtils.defaultString(cs.getG141()));
            root.addElement("rwb:GrossWeightQuantity").addText(""+cs.getG24B());
            root.addElement("rwb:LoaderModeDescription").addText(cs.getG22() == 0 ? "Отправителем" : "Перевозчиком" );
            root.addElement("rwb:CustomsNotice").addText(StringUtils.defaultString(cs.getG26()));
            root.addElement("rwb:WeightDefinitionModeDescription").addText(StringUtils.defaultString(cs.getGs_48()));

            root.addElement("rwb:RegistrationDocument");

            Element consignor = root.addElement("rwb:Consignor");
            consignor.addElement("cat_ru:OrganizationName").addText(StringUtils.defaultString(cs.getG1r()));

            if ("RU".equalsIgnoreCase(StringUtils.defaultString(cs.getG15_1()).trim())) {
                Element consignorRFOrganizationFeatures = consignor.addElement("cat_ru:RFOrganizationFeatures");
                consignorRFOrganizationFeatures.addElement("cat_ru:INN").addText(StringUtils.defaultString(cs.getG_2inn()));
            }

            consignor.addElement("cat_ru:OKPOID").addText(StringUtils.defaultString(cs.getG2()));

            Element consignorAddress = consignor.addElement("cat_ru:Address");
            if (!"".equals(StringUtils.defaultString(cs.getG17_1())))
                consignorAddress.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(cs.getG17_1()));
            consignorAddress.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(cs.getG15_1()));
            consignorAddress.addElement("cat_ru:CounryName").addText(StringUtils.defaultString(cs.getG16r()));
            consignorAddress.addElement("cat_ru:City").addText(StringUtils.defaultString(cs.getG18r_1()));

            Element consignee = root.addElement("rwb:Consignee");

            if ("RU".equalsIgnoreCase(StringUtils.defaultString(cs.getG45_1()).trim())) {
                Element consigneeRFOrganizationFeatures = consignee.addElement("cat_ru:RFOrganizationFeatures");
                consigneeRFOrganizationFeatures.addElement("cat_ru:INN").addText(StringUtils.leftPad(StringUtils.defaultString(cs.getG_5inn()), 10, "0"));
            }
            consignee.addElement("cat_ru:OKPOID").addText(StringUtils.defaultString(cs.getG5_()));

            Element consigneeAddress = consignee.addElement("cat_ru:Address");
            if (!"".equals(StringUtils.defaultString(cs.getG47_1())))
                consigneeAddress.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(cs.getG47_1()));
            consigneeAddress.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(cs.getG45_1()));
            consigneeAddress.addElement("cat_ru:CounryName").addText(StringUtils.defaultString(cs.getG46r()));
            consigneeAddress.addElement("cat_ru:City").addText(StringUtils.defaultString(cs.getG48r()));
            consigneeAddress.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(cs.getG49r()));

            Element departureStation = root.addElement("rwb:DepartureStation");
            departureStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cs.getG692()));
            departureStation.addElement("rwb:StationName").addText(StringUtils.defaultString(cs.getG162r()));
            departureStation.addElement("rwb:RailwayCode").addText(StringUtils.defaultString(cs.getG163r()));

            Element destinationStation = root.addElement("rwb:DestinationStation");
            destinationStation.addElement("rwb:RailwayCode").addText(StringUtils.defaultString(cs.getG102r()));
            destinationStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cs.getG121()));
            destinationStation.addElement("rwb:RailwayAndStationName").addText(StringUtils.defaultString(cs.getG101r()));


            for (CimSmgsDocs cimSmgsDocses13 : cs.getCimSmgsDocses13().values()) {
                Element docses13 = root.addElement("rwb:BorderStation");
                docses13.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsDocses13.getText()));
                docses13.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsDocses13.getText2()));
                docses13.addElement("rwb:RailwayCode").addText(StringUtils.defaultString(cimSmgsDocses13.getRoad_s_name_r()));
            }

            for (CimSmgsCarList cimSmgsCarList : cs.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList cimSmgsKon : cimSmgsCarList.getCimSmgsKonLists().values()) {
                    for (CimSmgsGruz cimSmgsGruz : cimSmgsKon.getCimSmgsGruzs().values()) {
                        Element RWBGoods = root.addElement("rwb:RWBGoods");
                        RWBGoods.addElement("cat_ru:GoodsDescription").addText(StringUtils.defaultString(cimSmgsGruz.getNzgr()));
                        RWBGoods.addElement("catTrans_ru:GoodsNumeric").addText(cimSmgsGruz.getSort() != null ? new Integer(cimSmgsGruz.getSort()+1).toString() : "");
                        RWBGoods.addElement("rwb:PlaceGoodsQuantity").addText(cimSmgsGruz.getPlaces() != null ? cimSmgsGruz.getPlaces().toString() : "");
                        RWBGoods.addElement("rwb:PlacesQuantity").addText(cimSmgsGruz.getPlaces() != null ? cimSmgsGruz.getPlaces().toString() : "");
                        RWBGoods.addElement("rwb:GrossWeightQuantity").addText(cimSmgsGruz.getMassa() != null ? cimSmgsGruz.getMassa().toString() : "");
                        RWBGoods.addElement("rwb:PlacesDescription").addText("_");
                        RWBGoods.addElement("rwb:HarmonizedRangeGoods").addText(StringUtils.defaultString(cimSmgsGruz.getKgvn()));
                        RWBGoods.addElement("rwb:Packing").addText(StringUtils.defaultString(cimSmgsGruz.getUpak()));
                        RWBGoods.addElement("rwb:CarriageNumber").addText(StringUtils.defaultString(cimSmgsCarList.getNvag()));
                        RWBGoods.addElement("rwb:ContainerNumber").addText(StringUtils.defaultString(cimSmgsKon.getUtiN()));
                    }
                }
            }

            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList cimSmgsKon : cimSmgsCar.getCimSmgsKonLists().values()) {
                    Element container = root.addElement("rwb:Container");
                    if (cimSmgsKon.getKodSob() != null)
                        container.addElement("rwb:RailwayCode").addText(cimSmgsKon.getKodSob().toString());
                    container.addElement("rwb:ContainerID").addText(StringUtils.defaultString(cimSmgsKon.getUtiN()));
                    container.addElement("rwb:ContainerModeDescription").addText(StringUtils.defaultString(cimSmgsKon.getVid(), " "));
//                    container.addElement("rwb:Tare").addText(cimSmgsCar.getTaraVag() != null ? cimSmgsCar.getTaraVag().toString() : "");
//                    container.addElement("rwb:GoodsWeight").addText(cs.getG24N() != null ? cs.getG24N().toString() : "");
//                    container.addElement("rwb:ContainerLength").addText(StringUtils.defaultString(cimSmgsKon.getVid()));
                }
            }

            for (CimSmgsDocs cimSmgsDocses9 : cs.getCimSmgsDocses9().values()) {
                Element docses9 = root.addElement("rwb:ConsignorDocument");
                docses9.addElement("cat_ru:PrDocumentName").addText(StringUtils.defaultString(cimSmgsDocses9.getText()));
                docses9.addElement("cat_ru:PrDocumentNumber").addText(StringUtils.defaultString(cimSmgsDocses9.getNdoc()));
                docses9.addElement("cat_ru:PrDocumentDate").addText(cimSmgsDocses9.getDat() != null ? df.format(cimSmgsDocses9.getDat()): "");
                docses9.addElement("catTrans_ru:ModeCode").addText(StringUtils.defaultString(cimSmgsDocses9.getNcas()));
            }

            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
                Element carriage = root.addElement("rwb:Carriage");
                carriage.addElement("rwb:CarriageID").addText(StringUtils.defaultString(cimSmgsCar.getNvag()));
//                carriage.addElement("rwb:OwnerType").addText(StringUtils.defaultString(cimSmgsCar.getVagOtm()));
                carriage.addElement("rwb:Power").addText(cimSmgsCar.getGrPod() != null ? cimSmgsCar.getGrPod().toString() : "");
                carriage.addElement("rwb:AxisQuantity").addText(cimSmgsCar.getKolOs() != null ? cimSmgsCar.getKolOs().toString() : "");
                carriage.addElement("rwb:Tare").addText(cimSmgsCar.getTaraVag() != null ? cimSmgsCar.getTaraVag().toString() : "");
//                carriage.addElement("rwb:Caliber").addText(StringUtils.defaultString(cimSmgsCar.getCicternType()));
            }

            for (CimSmgsPlomb cimSmgsPlomb : cs.getCimSmgsPlombs().values()) {
                Element seal = root.addElement("rwb:Seal");
                seal.addElement("rwb:SealID").addText(StringUtils.rightPad(StringUtils.defaultString(cimSmgsPlomb.getZnak()), 7).substring(0, 7));
                seal.addElement("rwb:SealQuantity").addText(cimSmgsPlomb.getKpl() != null ? cimSmgsPlomb.getKpl().toString() : "");
                seal.addElement("rwb:IdentKind").addText("1");
            }

//            for (CimSmgsPerevoz cimSmgsPerevoz : cs.getCimSmgsPerevoz().values()) {
//                Element carrier = root.addElement("rwb:Carrier");
//                carrier.addElement("rwb:CarrierName").addText(StringUtils.defaultString(cimSmgsPerevoz.getNamPer()));
//
//                Element fromStation = carrier.addElement("rwb:FromStation");
//                fromStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsPerevoz.getCodStBeg()));
//                fromStation.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsPerevoz.getStBeg()));
//
//                Element toStation = carrier.addElement("rwb:ToStation");
//                toStation.addElement("rwb:StationCode").addText(StringUtils.defaultString(cimSmgsPerevoz.getCodStEnd()));
//                toStation.addElement("rwb:StationName").addText(StringUtils.defaultString(cimSmgsPerevoz.getStEnd()));
//            }

//            for (CimSmgsPlatel cimSmgsPlatel : cs.getCimSmgsPlatels().values()) {
//                Element paidRailwayCodeName = root.addElement("rwb:PaidRailwayCodeName");
//                paidRailwayCodeName.addElement("rwb:PaidRailwayCode").addText(StringUtils.defaultString(cimSmgsPlatel.getDorR()));
//
//                Element infoPayer = paidRailwayCodeName.addElement("rwb:InfoPayer");
//                infoPayer.addElement("rwb:PayerName").addText(StringUtils.defaultString(cimSmgsPlatel.getPlatR()));
//                infoPayer.addElement("rwb:PayerCode").addText(StringUtils.defaultString(cimSmgsPlatel.getKplat()));
//            }

//            Element contractCarrierDate = root.addElement("rwb:ContractCarrierDate");
//            contractCarrierDate.addElement("rwb:Date").addText(cs.getG281() != null ? df.format(cs.getG281()) : "");



//            ftsxml = doc.asXML();
            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc);
            ftsxml = out.toString();

            if (tbc2Pack != null) {
                Tbc2Log tbc2Log = new Tbc2Log(cs.getHid(), ftsxml, UID, null, SMGSTypeDoc);
                tbc2Log.setTbc2Pack(tbc2Pack);

                session = HibernateUtil.getSession();
                session.save(tbc2Log);
            }
//            tx.commit();
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
//            if (tx != null)
//                tx.rollback();
            if (session != null)
                session.clear();
            throw  ex;
        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw  ex;
        }

//        if (oldDocId != null) {
//          roi.addElement("roi:InitialEnvelopeID").addText(oldDocId);
//        }
//        roi.addElement("roi:SenderInformation").addText(senderInformation);
//        roi.addElement("roi:ReceiverInformation").addText(receiverInformation);
//        roi.addElement("roi:PreparationDateTime").addText(df3.format(curDate));
        return ftsxml;
    }

    public ArrayList<String> createFTSInvoiceXML(Long hid_cs,  Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        ArrayList<String> result  = new ArrayList<>();
//        HibernateUtil.getSession().beginTransaction();

        List<CimSmgsInvoice> cimSmgsInvoiceList = HibernateUtil.getSession().createQuery("from CimSmgsInvoice AS inv WHERE inv.packDoc = (SELECT cs.packDoc FROM CimSmgs AS cs where hid = :h)").setLong("h",hid_cs).list();
        for (CimSmgsInvoice cimSmgsInvoice : cimSmgsInvoiceList) {
            result.add(createFTSInvoiceXML(cimSmgsInvoice, tbc2Pack, newProc));
        }
        return result;
    }

    private String createFTSInvoiceXML(CimSmgsInvoice csi,  Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        String ftsxml = "";
        Session session = null;
//        Transaction tx = null;
        try {
            String UID;

            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);

            Element root = doc.addElement("inv:Invoice")
                    .addNamespace("clt_ru", "urn:customs.ru:CommonLeafTypes:5.8.0")
                    .addNamespace("cat_ru", "urn:customs.ru:CommonAggregateTypes:5.8.0")
                    .addNamespace("CategoryCust", "urn:customs.ru:Categories:3.0.0")
                    .addNamespace("cltComFin_ru", "urn:customs.ru:Information:CommercialFinanceDocuments:CommercialFinanceCommonLeafTypesCust:5.8.0")
                    .addNamespace("catComFin_ru", "urn:customs.ru:Information:CommercialFinanceDocuments:CommercialFinanceCommonAgregateTypesCust:5.8.0")
                    .addNamespace("inv", "urn:customs.ru:Information:CommercialFinanceDocuments:Invoice:5.8.0")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
                    .addAttribute("DocumentModeID", "1002007E");

            if (newProc)
                UID = UUID.randomUUID().toString();
            else {
                List<Tbc2Log> tbc2Log = HibernateUtil.getSession().createQuery("from Tbc2Log where hid_pack = :h and doc_type = :t and hid_src = :i order by dattr desc").setLong("h", tbc2Pack.getHid()).setString("t", INVOICETypeDoc).setLong("i", csi.getHid()).list();
                if (tbc2Log.size() != 0)
                    UID = tbc2Log.get(0).getDocId();
                else
                    throw new Exception("Не найден идентификатор документа СМГС");
            }

            root.addElement("cat_ru:DocumentID").addText(UID);

            root.addElement("inv:CurrencyCode").addText(StringUtils.defaultString(csi.getCux()));

            BigDecimal gcost = new BigDecimal(0);
            if (csi.getItogo() != null)
                gcost = new BigDecimal(csi.getItogo());
            else {
                for (CimSmgsInvoiceGruz cimSmgsInvoiceGruz : csi.getInvoiceGruzs().values()) {
                    gcost = gcost.add(new BigDecimal(StringUtils.defaultString(cimSmgsInvoiceGruz.getItogo(), "0")));
                }
            }

            DecimalFormatSymbols symbols = new DecimalFormatSymbols();
            symbols.setDecimalSeparator('.');
            DecimalFormat df = new DecimalFormat("###.##", symbols);
//            df.setMaximumFractionDigits(2);
//            df.setGroupingUsed(false);
//            DecimalFormatSymbols decimalFormatSymbols = new DecimalFormatSymbols();
//            decimalFormatSymbols.setDecimalSeparator('.');
//            df.setd

            root.addElement("inv:GCost").addText(df.format(gcost));
            root.addElement("inv:TotalCost").addText(df.format(gcost));

            Element buyer = root.addElement("inv:Buyer");
            buyer.addElement("catComFin_ru:Name").addText(StringUtils.defaultString(csi.getNbuy()));

            Element postalAddress = buyer.addElement("inv:PostalAddress");
            postalAddress.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(csi.getAdres_b()));

            Element seler = root.addElement("inv:Seler");
            seler.addElement("catComFin_ru:Name").addText(StringUtils.defaultString(csi.getNsel()));

            Element postalAddressSeler = seler.addElement("inv:PostalAddress");
            postalAddressSeler.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(csi.getAdres_s()));

            Element consignor = root.addElement("inv:Consignor");
            consignor.addElement("cat_ru:OrganizationName").addText(StringUtils.defaultString(csi.getNotd()));

            Element address_o = consignor.addElement("cat_ru:Address");
            address_o.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(csi.getZip_o()));
            address_o.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(csi.getCountry_o()));
            address_o.addElement("cat_ru:City").addText(StringUtils.defaultString(csi.getCity_o()));
            address_o.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(csi.getAdres_o()));

            Element consignee = root.addElement("inv:Consignee");
            consignee.addElement("cat_ru:OrganizationName").addText(StringUtils.defaultString(csi.getNpol()));

            Element address_p = consignee.addElement("cat_ru:Address");
            address_p.addElement("cat_ru:PostalCode").addText(StringUtils.defaultString(csi.getZip_p()));
            address_p.addElement("cat_ru:CountryCode").addText(StringUtils.defaultString(csi.getCountry_p()));
            address_p.addElement("cat_ru:City").addText(StringUtils.defaultString(csi.getCity_p()));
            address_p.addElement("cat_ru:StreetHouse").addText(StringUtils.defaultString(csi.getAdres_p()));

            for (CimSmgsInvoiceGruz cimSmgsInvoiceGruz : csi.getInvoiceGruzs().values()) {
                Element invoiceGoods = root.addElement("inv:InvoiceGoods");
                invoiceGoods.addElement("catComFin_ru:GoodsCode").addText(StringUtils.defaultString(cimSmgsInvoiceGruz.getTnved()));
                invoiceGoods.addElement("catComFin_ru:GoodsDescription").addText(StringUtils.substring(StringUtils.defaultString(cimSmgsInvoiceGruz.getNzgr()), 0, 250));
                invoiceGoods.addElement("catComFin_ru:GoodsQuantity").addText(cimSmgsInvoiceGruz.getKolm() != null ? cimSmgsInvoiceGruz.getKolm().toString() : "");
                invoiceGoods.addElement("catComFin_ru:MeasureUnitQualifierName").addText(StringUtils.defaultString(cimSmgsInvoiceGruz.getEizm()));
                invoiceGoods.addElement("catComFin_ru:GrossWeightQuantity").addText(cimSmgsInvoiceGruz.getMbrt() != null ? cimSmgsInvoiceGruz.getMbrt().toString() : "");
                invoiceGoods.addElement("catComFin_ru:NetWeightQuantity").addText(cimSmgsInvoiceGruz.getMnet() != null ? cimSmgsInvoiceGruz.getMnet().toString() : "");
                invoiceGoods.addElement("catComFin_ru:Price").addText(StringUtils.defaultString(cimSmgsInvoiceGruz.getCost()));
                invoiceGoods.addElement("catComFin_ru:TotalCost").addText(StringUtils.defaultString(cimSmgsInvoiceGruz.getItogo()));
            }

            Element deliveryTerms = root.addElement("inv:DeliveryTerms");
            deliveryTerms.addElement("catComFin_ru:DeliveryPlace").addText(StringUtils.defaultString(csi.getPostavkaPunkt()));
            deliveryTerms.addElement("catComFin_ru:DeliveryTermsStringCode").addText(StringUtils.defaultString(csi.getPostavka()));
            deliveryTerms.addElement("inv:DispatchCountryCode").addText(StringUtils.isEmpty(csi.getCountry_o()) ? "00" : csi.getCountry_o());
            deliveryTerms.addElement("inv:TradingCountryCode").addText(StringUtils.isEmpty(csi.getCountry_p()) ? "00" : csi.getCountry_p());
            deliveryTerms.addElement("inv:DestinationCountryCode").addText(StringUtils.isEmpty(csi.getCountry_p()) ? "00" : csi.getCountry_p());

            Element transportMeans = root.addElement("inv:TransportMeans");
            transportMeans.addElement("catComFin_ru:Number").addText(StringUtils.defaultString(csi.getUtiN()));
            transportMeans.addElement("catComFin_ru:ModeCode").addText("20");

            Element registration = root.addElement("inv:Registration");
            if (StringUtils.isNotEmpty(csi.getInvoice()))
                registration.addElement("cat_ru:PrDocumentNumber").addText(StringUtils.defaultString(csi.getInvoice()));
            if (csi.getDat_inv() != null)
                registration.addElement("cat_ru:PrDocumentDate").addText(StringUtils.defaultString(df.format(csi.getDat_inv())));

//            ftsxml = doc.asXML();
            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc);
            ftsxml = out.toString();
//            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\ftsinvoice"+new Date().getTime()+".xml"), ftsxml.getBytes(encoding));

            if (tbc2Pack != null) {
                Tbc2Log tbc2Log = new Tbc2Log(csi.getHid(), ftsxml, UID, null, INVOICETypeDoc);
                tbc2Log.setTbc2Pack(tbc2Pack);

                session = HibernateUtil.getSession();
//            tx = session.beginTransaction();
                session.save(tbc2Log);
            }
//            tx.commit();
        } catch (HibernateException ex) {
            log.error(ex.getMessage());
//            if (tx != null)
//                tx.rollback();
            if (session != null)
                session.clear();
            throw ex;
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }

//        if (oldDocId != null) {
//          roi.addElement("roi:InitialEnvelopeID").addText(oldDocId);
//        }
//        roi.addElement("roi:SenderInformation").addText(senderInformation);
//        roi.addElement("roi:ReceiverInformation").addText(receiverInformation);
//        roi.addElement("roi:PreparationDateTime").addText(df3.format(curDate));
        return ftsxml;
    }


}
