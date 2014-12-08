package com.bivc.cimsmgs.actions.exchange;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.dao.TdgLogDAO;
import com.bivc.cimsmgs.dao.TdgLogDAOAware;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.TdgLog;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import com.bivc.cimsmgs.exchange.TDGConvertor;
import org.apache.commons.lang3.StringUtils;
import org.apache.struts2.util.ServletContextAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class Tdg_A  extends CimSmgsSupport_A implements SmgsDAOAware, ServletContextAware, TdgLogDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Tdg_A.class);
    public final static byte TDG_READY_STATUS = 44;
    public final static byte TDG_SENDED_STATUS = 46;

    class MyCallable implements Callable<List<Long>> {
        private Tdg_A tdg_a;
        public MyCallable(Tdg_A var) {
            tdg_a = var;
        }
        @Override
        public List<Long> call() throws Exception {
            return runSend(tdg_a);
        }
    }

    public String send() throws ExecutionException, InterruptedException {
        log.info("sendTDG");
        Long count = getSmgsDAO().countAll4Tdg(smgs.getType(), smgs.getRoute().getHid(), getUser().getUsr(), TDG_READY_STATUS);
        if (count == 0) {
            setJSONData(Constants.convert2JSON_IFTMIN_Results1());
            return SUCCESS;
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
                setStatus(TDG_SENDED_STATUS);
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

    private static synchronized List<Long> runSend(Tdg_A me) throws Exception {
        log.info("-----Begin send TDG---------");
        List<Long> sendedSmgs = new ArrayList<Long>();
        List<Long> hids;
        try {
            HibernateUtil.beginTransaction();
            hids = me.getSmgsDAO().findAll4Tdg(me.smgs.getType(), me.smgs.getRoute().getHid(), me.getUser().getUsr(), TDG_READY_STATUS);
            HibernateUtil.commitTransaction();
        } catch (Exception e) {
            HibernateUtil.rollbackTransaction();
            throw e;
        }
        if (hids.size() == 0) {
            log.info("-----Finish send TDG. Nothing to send");
            return null;
        }
        ExchangeServer server = new ExchangeServer();
        for (Long hid : hids) {
            if(server.SendTDG(hid, me.getUser().getUsername(), TDGConvertor.TdgDir.FTS, me.getServletContext())){
                sendedSmgs.add(hid);
            }
        }
        log.info("-----Finish send TDG. Sended - " + sendedSmgs.size());
        return sendedSmgs;
    }

    public String showTextMsg(){
        log.info("showTextMsg");
        TdgLog tdgLog = tdgLogDAO.findById(getSearch().getHid(), false);
        setJSONData(StringUtils.isNotEmpty(tdgLog.getResult_txt()) ? tdgLog.getResult_txt().replace("\r\n", "<br/>") : "");
        return SUCCESS;
    }

    private CimSmgs smgs;
    private SmgsDAO smgsDAO;
    private TdgLogDAO tdgLogDAO;
    private List<CimSmgs> smgsy;
    private ServletContext servletContext;

    @Override
    public void setTdgLogDAO(TdgLogDAO dao) {
        tdgLogDAO = dao;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    @Override
    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public List<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public void setSmgsy(List<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }

    @Override
    public void setServletContext(ServletContext context) {
        this.servletContext = context;
    }

    public ServletContext getServletContext() {
        return servletContext;
    }
}
