package com.bivc.cimsmgs.actions.exchange;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.db.*;
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

public class Iftmin_A extends CimSmgsSupport_A implements SmgsDAOAware, ServletContextAware {
    final static private Logger log = LoggerFactory.getLogger(Iftmin_A.class);
    public final static byte IFTMIN_READY_STATUS = 22;
    public final static byte IFTMIN_SENDED_STATUS = 24;

    public String close_open() {
        log.info("close_open");
        for (CimSmgs elem : smgsy) {
            getSmgsDAO().updateByReady(elem.getReady(), elem.getHid(), getUser().getUsr());
        }
        setJSONData(Constants.convert2JSON_Smgs_Save_Results());
        return SUCCESS;
    }

    private static synchronized List<Long> sendIftmins(Iftmin_A me) throws Exception {
        log.info("-----Begin send Iftmins---------");
        List<Long> sendedSmgs = new ArrayList<Long>();
        List<Long> hids;
        try {
            HibernateUtil.beginTransaction();
            hids = me.getSmgsDAO().findAll4Iftmins1(me.smgs.getType(), me.smgs.getRoute().getHid(), me.getUser().getUsr(), IFTMIN_READY_STATUS);
            HibernateUtil.commitTransaction();
        } catch (Exception e) {
            HibernateUtil.rollbackTransaction();
            log.error(e.getMessage(), e);
            throw e;
        } /*finally {
            HibernateUtil.closeSession();
        }*/
        if (hids.size() == 0) {
            log.info("-----Finish send Iftmins. Nothing to send");
            return null;
        }
        ExchangeServer server = new ExchangeServer();
        for (Long hid : hids) {
            if(server.SendIftmin(hid, me.getUser().getUsername(), EDIConvertor.EdiDir.BCH)){
                sendedSmgs.add(hid);
            }
        }
        log.info("-----Finish send Iftmins. Sended - " + sendedSmgs.size());
        return sendedSmgs;
    }

    public String send() throws ExecutionException, InterruptedException {
        log.info("Send");
        Long count = getSmgsDAO().countAll4Iftmins1(smgs.getType(), smgs.getRoute().getHid(), getUser().getUsr(), IFTMIN_READY_STATUS);
        if (count == 0) {
            setJSONData(Constants.convert2JSON_IFTMIN_Results1());
            return SUCCESS;
        }

        class MyCallable implements Callable<List<Long>> {
            private Iftmin_A iftmin_A;
            public MyCallable(Iftmin_A var) {
                iftmin_A = var;
            }
            @Override
            public List<Long> call() throws Exception {
                return sendIftmins(iftmin_A);
            }
        }
        ExecutorService executor = null;
        try {
            executor = Executors.newSingleThreadExecutor();
            Future<List<Long>> result = executor.submit(new MyCallable(this));
            List<Long> hids = result.get(20000, TimeUnit.MILLISECONDS);
            if(hids == null){
                setJSONData(Constants.convert2JSON_IFTMIN_Results1());
            } else {
                setJSONData(Constants.convert2JSON_SendingDocs(hids.size()));
            }
        } catch (TimeoutException e) {
            setJSONData(Constants.convert2JSON_SendingDocsWait());
           log.warn(e.toString());
        }
        finally {
            if(executor != null){
                executor.shutdown();
            }
        }


        return SUCCESS;
    }

    public String sendSTM() {
        log.info("sendSTM");
        ExchangeServer server = new ExchangeServer();
        List<String> errors = new ArrayList<String>();
        for (CimSmgs elem : smgsy) {
            if (!server.SendCTM(elem.getHid())) {
                errors.add(elem.getHid().toString());
                continue;
            }
        }
        setJSONData(Constants.convert2JSON_IFTMIN_Results(errors));
        return SUCCESS;
    }

    public String sendTBC() throws Exception {
        log.info("sendTBC");
        ExchangeServer server = new ExchangeServer();
        try {
            setJSONData(server.SendTBC(getHid()) ? Constants.convert2JSON_True() : Constants.convert2JSON_False());
            smgs = getSmgsDAO().findById(smgs.getHid(), false); // 4 status logging
        } catch (Exception e) {
            throw e;
        }
        return SUCCESS;
    }

    public String sendTBCOut() throws Exception {
        log.info("sendTBCOut");
        ExchangeServer server = new ExchangeServer();

        byte[] result = server.getFTSXMLFile(smgs.getHid(), getUser().getUsr().getUn(), servletContext);
//        byte[] arr = result[0].getBytes("UTF-8");
        inputStream = new ByteArrayInputStream(result);
        fileName = result[1] + ".zip";
        fileLength = result.length;
        smgs = getSmgsDAO().findById(smgs.getHid(), false); // 4 status logging

        return "view";
    }

    public String sendIftminDBOut() throws Exception {
        log.info("sendIftminDB");
        ExchangeServer server = new ExchangeServer();
        String text = server.getIftminText(getHid_cs(), getUser().getUsr().getUn());
        inputStream = new ByteArrayInputStream(text.getBytes("CP1250"));
        fileName = String.format("IFTMIN-%s.txt", getHid_cs());
        fileLength = text.length();
        return "view-text";
    }

    public String sendIftminDBIn() throws IOException {
        log.info("sendIftminDBIn");
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(fileData), "CP1250"));
        String line;
        StringBuilder stringBuilder = new StringBuilder();
        String ls = System.getProperty("line.separator");

        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append(ls);
        }
        reader.close();

        ExchangeServer server = new ExchangeServer();
        server.receiveIftminText(stringBuilder.toString(), getUser().getUsername(), getUser().getUsr().getGroup().getName(), route, getUser().getUsr().getGroup());
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String saveFts() throws Exception {
        log.info("saveFts");
        try {
            getSmgsDAO().update4FTS(smgs.getNpoezd(), smgs.getIndex_p(), smgs.getN_ppv(), smgs.getDprb(), smgs.getRoute().getHid(), getUser().getUsr(), smgs.getType());
            setJSONData(Constants.convert2JSON_FTS_Save_Results());
        } catch (Exception e) {
            throw e;
        }
//            smgs = getSmgsDAO().findById(smgs.getHid(), false); // 4 status logging
        return SUCCESS;
    }

    public String sendFts() throws Exception {
        log.info("sendFts");
        try {

            smgsy = getSmgsDAO().findAll4FTS(smgs.getType(), smgs.getRoute().getHid(), getUser().getUsr());
            if (smgsy.size() == 0) {
                setJSONData(Constants.convert2JSON_IFTMIN_Results1());
                return SUCCESS;
            }

            ExchangeServer server = new ExchangeServer();
            List<String> error = new ArrayList<String>();
            for (CimSmgs smgs : smgsy) {
                if (!server.SendPIXML(smgs.getHid(), servletContext, getUser().getUsr())) {
                    error.add(smgs.getHid().toString());
                }
            }
            setJSONData(Constants.convert2JSON_IFTMIN_Results(error));
        } catch (Exception e) {
            throw e;
        }
//            smgs = getSmgsDAO().findById(smgs.getHid(), false); // 4 status logging
        return SUCCESS;
    }

    public String iftminText() {
        log.info("iftminText");
        List<BIftminLog> iftmins = getSmgsDAO().findIftminText(getSearch().getHid(), getSearch().getDocType(), getSearch().getCode());
        setJSONData(iftmins.size() > 0 ? iftmins.get(0).getText().replace("\r\n", "<br/>") : "");
//        setJSONData(iftmins.size() > 0 ? iftmins.get(0).getOut_text() : "");
        return SUCCESS;
    }

    public String aperakText() {
        log.info("aperakText");
        List<BIftminLog> iftmins = getSmgsDAO().findAperakText(getSearch().getHid(), getSearch().getDocType(), getSearch().getCode());
        Set<AperakDet> set = iftmins.get(0).getBAperakDetSet();
        setJSONData(Constants.convert2JSON_Aperak(set, set.size()));
        return SUCCESS;
    }

    public String comntText() {
        log.info("comntText");
        List<CsComnt> set = getSmgsDAO().findComntText(getSearch().getHid());
        Set<CsComntDet> det = null;
        for (CsComnt elem : set) {
            if (elem.hasDetail()) {
                if (det == null) {
                    det = elem.getComntDet();
                } else {
                    det.addAll(elem.getComntDet());
                }
            }
        }
        setJSONData(Constants.convert2JSON_Comnt(det));
        return SUCCESS;
    }

    public String tbcText() {
        log.info("tbcText");
        List<TbcLog> iftmins = getSmgsDAO().findTbcText(getSearch().getHid());
        StringBuffer text = new StringBuffer();
        for (int i = 0; i < iftmins.size(); i++) {
            if (iftmins.get(i).getIn_out() != null) {
                if (iftmins.get(i).getIn_out().intValue() == 2 &&
                        iftmins.get(i).getXml() != null && iftmins.get(i).getXml().length() > 0) {
                    text.append(StringEscapeUtils.escapeXml(iftmins.get(i).getXml()).replace("\n", "<br/>"));
                    text.append("<hr/>");
                } else if (iftmins.get(i).getIn_out().intValue() == 1 &&
                        iftmins.get(i).getText() != null && iftmins.get(i).getText().length() > 0) {
                    text.append(iftmins.get(i).getText().replace("\r\n", "<br/>"));
                    text.append("<hr/>");
                }
            }
        }
        setJSONData(text.toString());
        return SUCCESS;
    }

    private SmgsDAO smgsDAO;
    private CimSmgs smgs;
    private List<CimSmgs> smgsy;
    private List<CimSmgs> smgss;
    private ServletContext servletContext;
    private InputStream inputStream;
    private String fileName;
    private int fileLength;
    private File fileData;
    private String contentType;
    private String filename;
    private Route route;

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
