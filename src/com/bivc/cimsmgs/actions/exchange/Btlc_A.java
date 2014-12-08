package com.bivc.cimsmgs.actions.exchange;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.exchange.EDIConvertor;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class Btlc_A  extends CimSmgsSupport_A  implements SmgsDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Btlc_A.class);
    public final static byte BTLC_READY_STATUS = 39;
    public final static byte BTLC_SENDED_STATUS = 41;

    class MyCallable implements Callable<List<Long>> {
        private Btlc_A btlc_a;
        public MyCallable(Btlc_A var) {
            btlc_a = var;
        }
        @Override
        public List<Long> call() throws Exception {
            return runSendBtlc(btlc_a);
        }
    }

    public String sendBtlc() throws ExecutionException, InterruptedException {
        log.info("sendBtlc");
        Long count = getSmgsDAO().countAll4Btlc(smgs.getType(), smgs.getRoute().getHid(), getUser().getUsr(), BTLC_READY_STATUS);
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

    private static synchronized List<Long> runSendBtlc(Btlc_A me) throws Exception {
        log.info("-----Begin send BTLC---------");
        List<Long> sendedSmgs = new ArrayList<Long>();
        List<Long> hids;
        try {
            HibernateUtil.beginTransaction();
            hids = me.getSmgsDAO().findAll4Btlc(me.smgs.getType(), me.smgs.getRoute().getHid(), me.getUser().getUsr(), BTLC_READY_STATUS);
            HibernateUtil.commitTransaction();
        } catch (Exception e) {
            HibernateUtil.rollbackTransaction();
//            log.error(e.getMessage(), e);
            throw e;
        } /*finally {
            HibernateUtil.closeSession();
        }*/
        if (hids.size() == 0) {
            log.info("-----Finish send BTLC. Nothing to send");
            return null;
        }
        ExchangeServer server = new ExchangeServer();
        for (Long hid : hids) {
            if(server.SendIftmin(hid, me.getUser().getUsername(), EDIConvertor.EdiDir.BTLC)){
                sendedSmgs.add(hid);
            }
        }
        log.info("-----Finish send BTLC. Sended - " + sendedSmgs.size());
        return sendedSmgs;
    }

    private CimSmgs smgs;
    private SmgsDAO smgsDAO;
    private List<CimSmgs> smgsy;

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
}
