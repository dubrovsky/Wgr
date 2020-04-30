package com.bivc.cimsmgs.actions.exchange;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exchange.CS2Custom512Convertor;
import com.bivc.cimsmgs.exchange.EDIConvertor;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.struts2.util.ServletContextAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.*;

public class Astana1_A extends CimSmgsSupport_A implements SmgsDAOAware, ServletContextAware {
    final static private Logger log = LoggerFactory.getLogger(Astana1_A.class);


    public String unLoad_5_12() throws Exception {
        log.info("unLoad_5_12");
        String res = new CS2Custom512Convertor().transform(getHid_cs());
        byte[] buf = new byte[0];
        buf = res.getBytes("utf-8");
        fileName = String.format("astana-%s.xml", getHid_cs());
        contentType = "text/xml";

        inputStream = new ByteArrayInputStream(buf);
        fileLength = buf.length;
        return "view-text";
    }


    private InputStream inputStream;
    private String fileName;
    private int fileLength;
    private String contentType;
    private String filename;

    private File fileData;
    private Route route;
    private SmgsDAO smgsDAO;
    private CimSmgs smgs;
    private List<CimSmgs> smgsy;
    private List<CimSmgs> smgss;
    private ServletContext servletContext;

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
    }
    public void setUploadContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getUploadContentType() {
        return this.contentType;
    }

    public void setUploadFileName(String filename) {
        this.filename = filename;
    }

    public String getUploadFileName() {
        return this.filename;
    }


    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public void setSmgsy(List<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public List<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public int getFileLength() {
        return fileLength;
    }

    public void setFileLength(int fileLength) {
        this.fileLength = fileLength;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}
