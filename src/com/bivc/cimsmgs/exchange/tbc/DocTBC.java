package com.bivc.cimsmgs.exchange.tbc;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.Tbc2Log;
import com.bivc.cimsmgs.db.Tbc2Pack;
import com.bivc.cimsmgs.db.Tbc2Status;
import com.bivc.cimsmgs.exchange.FTSXMLCreate;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import org.apache.commons.io.FileUtils;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.util.*;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class DocTBC {
    final static private Logger log = LoggerFactory.getLogger(DocTBC.class);
    private static final String encoding = "utf-8";
    private static String SMGS = "smgs";
    private static String INVOICE = "invoice";

    List<String> containerDocs = new ArrayList<>();

    public String createDoc(Long hid_cs, String processId, Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        HibernateUtil.getSession().beginTransaction();
        CimSmgs cimSmgs = (CimSmgs) HibernateUtil.getSession().createQuery("from CimSmgs where hid = :h").setLong("h", hid_cs).uniqueResult();
        return cimSmgs != null ? createDoc(cimSmgs, processId, tbc2Pack, newProc) : "";
    }

    public byte[] createDocDownload(Long hid_cs) throws Exception {
        HibernateUtil.getSession().beginTransaction();
        CimSmgs cimSmgs = (CimSmgs) HibernateUtil.getSession().createQuery("from CimSmgs where hid = :h").setLong("h", hid_cs).uniqueResult();
        return cimSmgs != null ? createDocDownload(cimSmgs) : null;
    }

    public String createDoc(CimSmgs cimSmgs, String processId, Tbc2Pack tbc2Pack, boolean newProc) throws Exception {
        String resultXML = null;
        try {
            if (cimSmgs != null) {
                ECPWorker ecpWorker = new ECPWorker();
                FTSXMLCreate ftsxmlCreate = new FTSXMLCreate();
                Envelope envelope = new Envelope();
                CheckXML checkXML = new CheckXML();

                // create smgs xml and add to documents container
                String  cimSmgsFtsXml = ftsxmlCreate.createFTSXML_5_8_0(cimSmgs, tbc2Pack, newProc);
                // check smgs xml
                String errorCheck = checkXML.checkSmgs(cimSmgsFtsXml, SMGS);

                String cimSmgsFtsXmlSign =  ecpWorker.sign(cimSmgsFtsXml);
                containerDocs.add(cimSmgsFtsXmlSign);

                // create invoice xml and add to documents container
                ArrayList<String> ftsInvoiceXmlList = ftsxmlCreate.createFTSInvoiceXML(cimSmgs.getHid(), tbc2Pack, newProc);
                for (String ftsInvoiceXml: ftsInvoiceXmlList) {
                    errorCheck += checkXML.checkSmgs(ftsInvoiceXml, INVOICE);
                    String ftsInvoiceXmlSign =  ecpWorker.sign(ftsInvoiceXml);
                    containerDocs.add(ftsInvoiceXmlSign);
                }

                if (errorCheck.trim().length() != 0) {
                    Tbc2Status tbc2Status = new Tbc2Status(tbc2Pack.getHid(), new Date(), new Date(), "Ошибка формирования документа", "wgr", "-1", errorCheck);
                    Session session = HibernateUtil.getSession();
                    session.save(tbc2Status);
                    log.debug("Неверный формат XML: " + errorCheck);
                    return null;
                }
                // make envelope container
                resultXML = envelope.makeEnvelope(null, UUID.randomUUID().toString(), newProc ? "TBC.20002" : "TBC.20008", "00", new Date(), containerDocs, processId);

//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\packDoc"+new Date().getTime()+".xml"), resultXML.getBytes(encoding));
            }
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }
        return resultXML;
    }


    public byte[] createDocDownload(CimSmgs cimSmgs) throws Exception {
        byte[] resultXML = null;
        try {
            if (cimSmgs != null) {
                FTSXMLCreate ftsxmlCreate = new FTSXMLCreate();

                // create smgs xml and add to documents container
                String  cimSmgsFtsXml = ftsxmlCreate.createFTSXML_5_8_0(cimSmgs, null, true);

                containerDocs.add(cimSmgsFtsXml);

                ByteArrayOutputStream zip = new ByteArrayOutputStream();
                ZipOutputStream out = new ZipOutputStream(zip);
                out.putNextEntry(new ZipEntry("SMGS_" + cimSmgs.getG694() + ".xml"));
                out.write(cimSmgsFtsXml.getBytes(encoding));

                // create invoice xml and add to documents container
                ArrayList<String> ftsInvoiceXmlList = ftsxmlCreate.createFTSInvoiceXML(cimSmgs.getHid(), null, true);
                int idx = 1;
                for (String ftsInvoiceXml: ftsInvoiceXmlList) {
                    containerDocs.add(ftsInvoiceXml);
                    out.putNextEntry(new ZipEntry("INVOICE_" + idx++ + ".xml"));
                    out.write(ftsInvoiceXml.getBytes(encoding));
                }
                out.close();
                resultXML = zip.toByteArray();
            }
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }
        return resultXML;
    }

//    private String create(CimSmgs cs) {
//        String reqOpenProcXml = null;
//        try {
//            Document doc = DocumentHelper.createDocument();
//            doc.setXMLEncoding(encoding);
//            String defNamespace = "http://portal.tbc.su/customdocuments";
//            Element root = doc.addElement("ReqOpenProcTBC")
//                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
//                    .addNamespace("", defNamespace);
//
//            root.addElement("DocumentID", defNamespace).addText(UUID.randomUUID().toString());
//            root.addElement("SMGSNumber", defNamespace).addText(StringUtils.defaultString(cs.getG694()));
//
//            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
//                root.addElement("Transport", defNamespace).addText(StringUtils.defaultString(cimSmgsCar.getNvag()));
//            }
//
//            root.addElement("CustomsCode", defNamespace).addText("10225020");
////            root.addElement("CustomsCode", defNamespace).addText(StringUtils.defaultString(cs.getRoute().getCustomCode()));
////            root.addElement("Consignor").addText(StringUtils.defaultString(cs.getG1r()));
////            root.addElement("Consignee").addText(StringUtils.defaultString(cs.getG4r()));
//            root.addElement("ServiceType", defNamespace).addText("2");
//
//            OutputFormat format = new OutputFormat("  ", true, encoding);
//            format.setExpandEmptyElements(false);
//            StringWriter out = new StringWriter();
//            XMLWriter writer = new XMLWriter(out, format);
//            writer.write(doc);
//            reqOpenProcXml = out.toString();
//
////            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\ReqOpenProcTBC.xml"), reqOpenProcXml.getBytes(encoding));
//
//        }
//        catch (Exception ex) {
//            log.error(ex.getMessage(), ex);
//        }
//        return reqOpenProcXml;
//    }
}
