package com.bivc.cimsmgs.exchange.tbc;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exchange.FTSConvertor;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.dom4j.Document;
import org.dom4j.DocumentHelper;
import org.dom4j.Element;
import org.dom4j.io.OutputFormat;
import org.dom4j.io.XMLWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by LAN on 16.10.2015.
 */
public class ReqOpenProcTBC {
    final static private Logger log = LoggerFactory.getLogger(ReqOpenProcTBC.class);
    private static final String encoding = "utf-8";
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");


    public String createReqOpenProc(Long hid_cs) throws Exception {
        String resultXML = null;
        try {
            HibernateUtil.getSession().beginTransaction();
            CimSmgs cimSmgs = (CimSmgs) HibernateUtil.getSession().createQuery("from CimSmgs where hid = :h").setLong("h", hid_cs).uniqueResult();
            if (cimSmgs != null) {
                ECPWorker ecpWorker = new ECPWorker();
                String  createReqOpenProcXml = create(cimSmgs);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\createReqOpenProcXml.xml"), createReqOpenProcXml.getBytes(encoding));
                String reqOpenProcXmlSign =  ecpWorker.sign(createReqOpenProcXml);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\createReqOpenProcXmlSign.xml"), createReqOpenProcXmlSign.getBytes(encoding));

//                ED_Container ed_container = new ED_Container();
//                String ed_cont_xml = ed_container.createED_Container(Arrays.asList(reqOpenProcXmlSign));

                Envelope envelope = new Envelope();
                resultXML = envelope.makeEnvelope(null, UUID.randomUUID().toString(), "TBC.20001", "00", new Date(), Arrays.asList(reqOpenProcXmlSign), null);

//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\reqOpenProcXml.xml"), resultXML.getBytes(encoding));
            }
        }
        catch (Exception ex) {
            ex.getMessage();
            throw  ex;
        }
        return resultXML;
    }

    private String create(CimSmgs cs) {
        String reqOpenProcXml = null;
        try {
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);
            String defNamespace = "http://portal.tbc.su/customdocuments";
            Element root = doc.addElement("ReqOpenProcTBC")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
                    .addNamespace("", defNamespace);

            root.addElement("DocumentID", defNamespace).addText(UUID.randomUUID().toString());
            root.addElement("SMGSNumber", defNamespace).addText(StringUtils.defaultString(cs.getG694()));

            for (CimSmgsCarList cimSmgsCar : cs.getCimSmgsCarLists().values()) {
                root.addElement("Transport", defNamespace).addText(StringUtils.defaultString(cimSmgsCar.getNvag()));
            }

            root.addElement("CustomsCode", defNamespace).addText("10225020");
//            root.addElement("CustomsCode", defNamespace).addText(StringUtils.defaultString(cs.getRoute().getCustomCode()));
//            root.addElement("Consignor").addText(StringUtils.defaultString(cs.getG1r()));
//            root.addElement("Consignee").addText(StringUtils.defaultString(cs.getG4r()));
            root.addElement("ServiceType", defNamespace).addText("2");

            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc);
            reqOpenProcXml = out.toString();

//            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\ReqOpenProcTBC.xml"), reqOpenProcXml.getBytes(encoding));

        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return reqOpenProcXml;
    }
}
