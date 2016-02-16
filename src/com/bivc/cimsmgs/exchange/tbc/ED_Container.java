package com.bivc.cimsmgs.exchange.tbc;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import com.bivc.cimsmgs.exchange.tbc.xml.Utils;
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
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * Created by LAN on 16.10.2015.
 */
public class ED_Container {
    final static private Logger log = LoggerFactory.getLogger(ED_Container.class);
    private static final String encoding = "utf-8";


    public String createED_Container(List<String> containerDocs) {
        String result = null;
        try {
            if (containerDocs.size() != 0) {
                ECPWorker ecpWorker = new ECPWorker();
                String containerDocXml = create(containerDocs);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\containerDocXml.xml"), containerDocXml.getBytes(encoding));
                String containerDocXmlSign = ecpWorker.sign(containerDocXml);
//                FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\containerDocXmlSign.xml"), containerDocXmlSign.getBytes(encoding));
                result = containerDocXmlSign;
            }
        }
        catch (Exception ex) {
            ex.getMessage();
        }
        return result;
    }

    private String create(List<String> containerDocs) {
        String reqOpenProcXml = null;
        try {
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);
            String ED_ContainerNamespace = "urn:customs.ru:Information:ExchangeDocuments:ED_Container:5.8.0";
            Element root = doc.addElement("ED_Container")
                    .addNamespace("xsi", "http://www.w3.org/2001/XMLSchema-instance")
                    .addNamespace("", ED_ContainerNamespace)
                    .addAttribute("DocumentModeID", "1006058E");

            root.addElement("DocumentID", "urn:customs.ru:CommonAggregateTypes:5.8.0").addText(UUID.randomUUID().toString());

            for (int i=1; i<=containerDocs.size(); i++) {
                Element contDoc = root.addElement("ContainerDoc", ED_ContainerNamespace);
                contDoc.addElement("Order").addText(""+i);
                contDoc.addElement("DocBody").add(Utils.getRoot(containerDocs.get(i-1)));

            }

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
