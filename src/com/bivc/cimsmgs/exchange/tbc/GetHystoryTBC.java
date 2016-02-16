package com.bivc.cimsmgs.exchange.tbc;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import org.apache.commons.io.FileUtils;
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
import java.util.Arrays;
import java.util.Date;
import java.util.UUID;

/**
 * Created by LAN on 16.10.2015.
 */
public class GetHystoryTBC {
    final static private Logger log = LoggerFactory.getLogger(GetHystoryTBC.class);
    private static final String encoding = "utf-8";
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS");


    public String create(Date startDate, String processId) throws Exception {
        String resultXML = null;
        try {
            log.debug("GetHystoryTBC: processId = [" + processId + "]");
            HibernateUtil.getSession().beginTransaction();
            ECPWorker ecpWorker = new ECPWorker();
            String getHistoryTBCXml = getHistoryTBC(startDate);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\createReqOpenProcXml.xml"), createReqOpenProcXml.getBytes(encoding));
            String getHistoryTBCXmlSign =  ecpWorker.sign(getHistoryTBCXml);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\createReqOpenProcXmlSign.xml"), createReqOpenProcXmlSign.getBytes(encoding));

//            ED_Container ed_container = new ED_Container();
//            String ed_cont_xml = ed_container.createED_Container(Arrays.asList(getHistoryTBCXmlSign));

            Envelope envelope = new Envelope();
            resultXML = envelope.makeEnvelope(null, UUID.randomUUID().toString(), "TBC.20005", "00", new Date(), Arrays.asList(getHistoryTBCXmlSign), processId);

//            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\getHistoryTBC.xml"), resultXML.getBytes(encoding));
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }
        return resultXML;
    }

    private String getHistoryTBC(Date startDate) throws Exception {
        String createActionXml = null;
        try {
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);
            String defNamespace = "http://portal.tbc.su/customdocuments";
            Element root = doc.addElement("GetHistoryTBC")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
                    .addNamespace("", defNamespace);

            root.addElement("DocumentID", defNamespace).addText(UUID.randomUUID().toString());
            root.addElement("StartDate", defNamespace).addText(df.format(startDate));

            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc);
            createActionXml = out.toString();

//            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\ReqOpenProcTBC.xml"), reqOpenProcXml.getBytes(encoding));

        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }
        return createActionXml;
    }
}
