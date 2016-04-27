package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.Tbc2Pack;
import com.bivc.cimsmgs.db.Tbc2Status;
import com.bivc.cimsmgs.exchange.tbc.GetHystoryTBC;
import com.bivc.cimsmgs.exchange.tbc.soap.TBCAcsDocsServiceClient;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
import org.apache.commons.lang.time.DateUtils;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.net.URISyntaxException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class TBC2ReceiverTask extends AbstractTask {
    private static final SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SS");
    final static private Logger log = LoggerFactory.getLogger(TBC2ReceiverTask.class);
    private static final String encoding = "utf-8";
    private static String TBCSoapHost;
    private static String TBCSoapLogin;
    private static String TBCSoapPass;
    private static String TBCSoapRepositoryPath;
    private static String TBCFinalStatus;
    private ServletContext sc;

    public TBC2ReceiverTask(ServletContext sc) {
      this.sc = sc;
    }

    protected void runTask() throws Exception {
        Session session = null;
        Transaction tx = null;
        List<String> ids = new ArrayList<>();

        initParam(sc);
        ECPWorker.initParam(sc);

        try (TBCAcsDocsServiceClient client = new TBCAcsDocsServiceClient(TBCSoapHost, TBCSoapLogin, TBCSoapPass, TBCSoapRepositoryPath)) {

            session = HibernateUtil.getSession();
            tx = session.beginTransaction();
            Object tbc2StatusMaxDate = session.createSQLQuery("select max(st.change_date) from tbc2_status st where st.status != -1 ").uniqueResult();
            Date chDate = new Date();
            if (tbc2StatusMaxDate != null)
                chDate = new Date(((Timestamp) tbc2StatusMaxDate).getTime());
            else
                chDate = DateUtils.addHours(chDate, -10);

            GetHystoryTBC getHystoryTBC = new GetHystoryTBC();
            String HystoryTBCXML = getHystoryTBC.create(chDate, "");
            log.debug(HystoryTBCXML);
            String statusResult = client.get(HystoryTBCXML);
            log.debug(statusResult);

            if (statusResult != null) {
                SAXReader reader = new SAXReader(false);
                Document documentGetHystoryTBC = reader.read(new ByteArrayInputStream(statusResult.getBytes(encoding)));
                List<Node> historyTBCList = documentGetHystoryTBC.selectNodes("//*[name()='HistoryTBC']");
                if (historyTBCList.size() != 0) {
                    for (Node historyTBC : historyTBCList) {
                        String proccessID = historyTBC.selectSingleNode("*[name()='ProccessID']").getText();
                        ids.add(proccessID);
                    }

                    List<Tbc2Pack> tbc2Packs = session.createQuery("from Tbc2Pack where packId in :p").setParameterList("p", ids).list();
                    for (Tbc2Pack tbc2Pack : tbc2Packs) {
                        for (Node historyTBC : historyTBCList) {
                            String proccessID = historyTBC.selectSingleNode("*[name()='ProccessID']").getText();
                            if (tbc2Pack.getPackId().equals(proccessID)) {

                                String author = historyTBC.selectSingleNode("*[name()='Author']").getText();
                                String changeDate = historyTBC.selectSingleNode("*[name()='ChangeDate']").getText();
                                String description = historyTBC.selectSingleNode("*[name()='Description']").getText();
                                String destStatus = historyTBC.selectSingleNode("*[name()='DestStatus']").getText();
                                Node comment = historyTBC.selectSingleNode("*[name()='SignComment']");
                                String signComment = comment != null ? comment.getText() : "";
                                Tbc2Status tbc2Status = new Tbc2Status(tbc2Pack.getHid(), new Date(), df.parse(changeDate), description, author, destStatus, signComment);
                                session.save(tbc2Status);
                            }
                        }
                    }
                }
            }
            tx.commit();
        }
        catch (HibernateException ex) {
            log.debug(ex.getMessage(), ex);
            if (tx != null)
                tx.rollback();
            if (session != null && session.isOpen())
                session.clear();
        }
        catch (Exception ex) {
            log.debug(ex.getMessage(), ex);
        }
    }

    static private void initParam(ServletContext sc) throws URISyntaxException {
        if (sc != null) {
            TBCFinalStatus = sc.getInitParameter("TBCFinalStatus");
            if (log.isDebugEnabled())
                log.debug("TBCFinalStatus=" + TBCFinalStatus);

            TBCSoapHost = sc.getInitParameter("TBCSoapHost");
            if (log.isDebugEnabled())
                log.debug("TBCSoapHost=" + TBCSoapHost);

            TBCSoapLogin = sc.getInitParameter("TBCSoapLogin");
            if (log.isDebugEnabled())
                log.debug("TBCSoapLogin=" + TBCSoapLogin);

            TBCSoapPass = sc.getInitParameter("TBCSoapPass");
            if (log.isDebugEnabled())
                log.debug("TBCSoapPass=" + TBCSoapPass);

            TBCSoapRepositoryPath = new File(FTSExchange.class.getResource(sc.getInitParameter("TBCSoapRepositoryPath")).toURI()).getAbsolutePath();
            if (log.isDebugEnabled())
                log.debug("TBCSoapRepositoryPath=" + TBCSoapRepositoryPath);

        }
        else
            log.error("ServletContext not found");
    }


    public static void main(String[] args) throws Exception {
        TBCSoapHost = "https://serv2.tbc.su:4443/ascnew/AscAscDocs.svc";
        TBCSoapLogin = "aed_asc_asc";
        TBCSoapPass = "3R5T7I6W";
        TBCSoapRepositoryPath = "E:\\Lib\\Java\\Axix\\axis2-1.6.3\\repository";
        TBCFinalStatus= "15";
        ECPWorker.initParam("JKS", "test_lv", "12345678", "E:\\workIdea\\wgr\\resources\\keys\\keystore", "12345678");

        TBC2ReceiverTask tbc2ReceiverTask = new TBC2ReceiverTask(null);
        tbc2ReceiverTask.runTask();

    }

}
