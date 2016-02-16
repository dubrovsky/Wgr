package com.bivc.cimsmgs.exchange.tbc;

import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import com.bivc.cimsmgs.exchange.tbc.xml.Utils;
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
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * Created by LAN on 16.10.2015.
 */
public class Envelope {
    final static private Logger log = LoggerFactory.getLogger(Envelope.class);
    private static final String encoding = "utf-8";
    private String senderInformation = "smtp://eps.customs.ru/aed_asc_asc.tbc";
    private String receiverInformation = "smtp://eps.customs.ru/gateway";
    private String softVersion = "5.8.0/3.2.5";
    private String participantID = "1027739048482";
    private static final SimpleDateFormat df3 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");



    public String makeEnvelope(String oldDocId, String docId, String messType, String customCode, Date curDate, List<String> containerDocs, String processId) {
        String envelopeXml = null;

        try {

            // create ED-Container
            ED_Container ed_container = new ED_Container();
            String ed_cont_xml = ed_container.createED_Container(containerDocs);
            log.debug(ed_cont_xml);
            // create Envelop container
            Document doc = DocumentHelper.createDocument();
            doc.setXMLEncoding(encoding);
            String envelopeNamespace = "http://www.w3.org/2001/06/soap-envelope";
            Element root = doc.addElement("Envelope")
                    .addNamespace("roi", "urn:customs.ru:Envelope:RoutingInf:1.0")
                    .addNamespace("api", "urn:customs.ru:Envelope:ApplicationInf:1.0")
                    .addNamespace("edh", "urn:customs.ru:Envelope:EDHeader:2.0")
                    .addNamespace("att", "urn:customs.ru:Envelope:Attachments:1.0")
                    .addNamespace("", envelopeNamespace);

            Element header = root.addElement("Header", envelopeNamespace);
            Element roi = header.addElement("roi:RoutingInf");
            roi.addElement("roi:EnvelopeID").addText(docId);
//        if (oldDocId != null) {
//            roi.addElement("roi:InitialEnvelopeID").addText(oldDocId);
//        }
            roi.addElement("roi:SenderInformation").addText(senderInformation);
            roi.addElement("roi:ReceiverInformation").addText(receiverInformation);
            roi.addElement("roi:PreparationDateTime").addText(df3.format(curDate));

            Element app = header.addElement("api:ApplicationInf");
            app.addElement("api:SoftVersion").addText(softVersion);

            Element edhead = header.addElement("edh:EDHeader");
            if (processId != null)
                edhead.addElement("edh:ProccessID").addText(processId);
            edhead.addElement("edh:MessageType").addText(messType);
            edhead.addElement("edh:ParticipantID").addText(participantID);
            Element rcvCustom = edhead.addElement("edh:ReceiverCustoms");
            rcvCustom.addElement("edh:CustomsCode").addText(customCode);
            rcvCustom.addElement("edh:ExchType").addText("19200");

            // add ED-Container to Envelop container
            root.addElement("Body", envelopeNamespace).add(Utils.getRoot(ed_cont_xml));

            OutputFormat format = new OutputFormat("  ", true, encoding);
            format.setExpandEmptyElements(false);
            StringWriter out = new StringWriter();
            XMLWriter writer = new XMLWriter(out, format);
            writer.write(doc.getRootElement());
            envelopeXml = out.toString();

//            FileUtils.writeByteArrayToFile(new File("E:\\workIdea\\wgr\\doc\\envelope.xml"), envelopeXml.getBytes(encoding));
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
        }
        return envelopeXml;
    }
}
