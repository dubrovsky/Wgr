package com.bivc.cimsmgs.exchange.tbc;

import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.dom4j.util.XMLErrorHandler;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.validation.SchemaFactory;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.net.URL;
import java.util.List;

public class CheckXML {

    private static String SMGS = "smgs";
    private static String INVOICE = "invoice";
    private static final String encoding = "utf-8";

    public String checkSmgs (String xml, String type) throws Exception {
        SAXParserFactory factory = SAXParserFactory.newInstance();
        StringBuilder error = new StringBuilder();

        SchemaFactory schemaFactory =
                SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");

        URL repo = CheckXML.class.getClassLoader().getResource("/xsd");
        if (repo != null) {
            factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CommonAggregateTypesCust.xsd")));
            factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CommonLeafTypesCust.xsd")));
            factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CategoriesCust.xsd")));

            if (SMGS.equals(type)) {
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CUTransportCommonLeafTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "TransportCommonAggregateTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "TransportCommonLeafTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CUTransportCommonAggregateTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "RailwayBill.xsd")));
//                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "RailwayBill.xsd")));
            }
            else if (INVOICE.equals(type)) {
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CommercialFinanceCommonAggregateTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "CommercialFinanceCommonLeafTypesCust.xsd")));
                factory.setSchema(schemaFactory.newSchema(new File(repo.getPath() + "Invoice.xsd")));
            }

            SAXParser parser = factory.newSAXParser();

            XMLErrorHandler errorHandler = new XMLErrorHandler();
            SAXReader reader = new SAXReader(parser.getXMLReader());
            reader.setValidation(false);
            reader.setErrorHandler(errorHandler);
            reader.read(new ByteArrayInputStream(xml.getBytes(encoding)));

            List<Element> lst = errorHandler.getErrors().content();
            for (Element el : lst) {
                error.append(el.getText());
                error.append("<br>");
            }
        }
        return error.toString();
    }

}
