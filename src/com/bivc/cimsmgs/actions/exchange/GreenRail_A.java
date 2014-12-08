package com.bivc.cimsmgs.actions.exchange;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.concurrent.*;

/**
 * Created by peter on 02.05.2014.
 */
public class GreenRail_A extends CimSmgsSupport_A  implements SmgsDAOAware {
    final static private Logger log = LoggerFactory.getLogger(GreenRail_A.class);
    private CimSmgs smgs;

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    private SmgsDAO smgsDAO;
    public final static byte GREENRAIL_SENDED_STATUS = 49;

    public String send() throws ExecutionException, InterruptedException {
        log.info("send");
        Long count = smgsDAO.countDocsByNPoezd(getSearch().getNpoezd(), getSearch().getType(), getSearch().getRouteId());
        if (count == 0) {
            log.info("No docs to send for train " + getSearch().getNpoezd());
            setJSONData(Constants.convert2JSON_IFTMIN_Results1());
            return SUCCESS;
        }

        ExecutorService executor = null;
        try {
            executor = Executors.newSingleThreadExecutor();
            Future<Long> result = executor.submit(new MyCallable(this));
            Long sended = result.get(20000, TimeUnit.MILLISECONDS);
            if(sended == null){
                setJSONData(Constants.convert2JSON_IFTMIN_Results1());
            } else {
                setJSONData(Constants.convert2JSON_SendingDocs(sended.intValue()));
                setStatus(GREENRAIL_SENDED_STATUS);
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

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public void setSmgsDAO(SmgsDAO smgsDAO) {
        this.smgsDAO = smgsDAO;
    }

    class MyCallable implements Callable<Long> {
        private GreenRail_A action;
        public MyCallable(GreenRail_A var) {
            action = var;
        }
        @Override
        public Long call() throws Exception {
            return runSend(action);
        }
    }

    private static synchronized Long runSend(GreenRail_A action) throws Exception {
        log.info("----- Begin send docs for Green Rail ---------");
        /*try {
            HibernateUtil.beginTransaction();
            Long count = action.getSmgsDAO().countDocsByNPoezd(action.getSearch().getNpoezd(), action.getSearch().getType(), action.getSearch().getRouteId());
            log.info(String.format("Found %s docs to send", count));
            HibernateUtil.commitTransaction();

            if (count == 0) {
                log.info("-----Finish send TDG. Nothing to send");
                return null;
            }
        } catch (Exception e) {
            HibernateUtil.rollbackTransaction();
            throw e;
        }*/

        Long sended = new ExchangeServer().SendGR(action.getSearch().getNpoezd(), new Route(action.getSearch().getRouteId()), action.getSearch().getType(), action.getUser().getUsername());
        log.info("-----Finish send docs for Green Rail. Sended - " + sended);
        return sended;
    }
}
