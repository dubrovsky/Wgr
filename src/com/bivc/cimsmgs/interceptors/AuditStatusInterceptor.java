package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.actions.exchange.Btlc_A;
import com.bivc.cimsmgs.actions.exchange.GreenRail_A;
import com.bivc.cimsmgs.actions.exchange.Iftmin_A;
import com.bivc.cimsmgs.actions.exchange.Tdg_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.db.*;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.opensymphony.xwork2.util.ValueStack;
import org.hibernate.StatelessSession;
import org.hibernate.stat.Statistics;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;

/**
 * Date: 02.05.12
 * Time: 11:24
 */
public class AuditStatusInterceptor implements Interceptor {
    final static private Logger log = LoggerFactory.getLogger(AuditStatusInterceptor.class);

    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public void init() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public String intercept(ActionInvocation invocation) throws Exception {
        ValueStack stack = invocation.getStack();
        Object objStatus = stack.findValue("status");
        if (objStatus != null) {
            Byte status = (Byte) objStatus;
            if (status == 1 || status == 2 || status == 9 || status == 13 || status == 14 || status == 7) {
                HibernateUtil.getSessionFactory().getStatistics().clear();
            }
        }

        String result = invocation.invoke();

        Object targetObj = stack.findValue("smgs") != null ? stack.findValue("smgs") : stack.findValue("invoice");
        if (objStatus != null && targetObj != null) {
            Byte status = (Byte) objStatus;
            myUser user = (myUser) stack.findValue("user");
            StatelessSession session = HibernateUtil.getSessionFactory().openStatelessSession();
            session.beginTransaction();
            if (targetObj instanceof CimSmgs) { // cimsmgs table
                CimSmgs smgs = (CimSmgs) targetObj;

                if (status == Iftmin_A.IFTMIN_SENDED_STATUS || status == Btlc_A.BTLC_SENDED_STATUS || status == Tdg_A.TDG_SENDED_STATUS || status == GreenRail_A.GREENRAIL_SENDED_STATUS) {   // send iftmin
                    ArrayList<CimSmgs> smgsy = (ArrayList<CimSmgs>) stack.findValue("smgsy");
                    if(smgsy != null){
                        for (CimSmgs smgs1 : smgsy) {
                            session.insert(new Status(
                                    null,
                                    new StatusDir(new BigDecimal(status)),
                                    smgs1.getPackDoc(),
                                    (Usr) session.get(Usr.class, user.getUsername()),
                                    new DocDir(smgs1.getDocType1()),
//                                    new DocDir(Constants.buildDoctype(smgs1.getType())),
                                    new Date(),
                                    smgs1.getHid()
                            ));
                        }
                    }
                } else {
                    session.insert(new Status(
                            null,
                            new StatusDir(new BigDecimal(status)),
                            smgs.getPackDoc(),
                            (Usr) session.get(Usr.class, user.getUsername()),
                            new DocDir(smgs.getDocType1()),
//                            new DocDir(Constants.buildDoctype(smgs.getType())),
                            new Date(),
                            smgs.getHid()
                    ));
                    if (status == 7) { // convert aviso to smgs
                        ArrayList<CimSmgs> smgsy = (ArrayList<CimSmgs>) stack.findValue("smgsy");
                        for (CimSmgs smgs1 : smgsy) {
                            session.insert(new Status(
                                    null,
                                    new StatusDir(new BigDecimal(9)),
                                    smgs1.getPackDoc(),
                                    (Usr) session.get(Usr.class, user.getUsername()),
                                    new DocDir(smgs1.getDocType1()),
//                                    new DocDir(Constants.buildDoctype(smgs1.getType())),
                                    new Date(),
                                    smgs1.getHid()
                            ));
                        }
                    }
                }

            } else {     // invoice
                CimSmgsInvoice invoice = (CimSmgsInvoice) targetObj;
                session.insert(new Status(
                        null,
                        new StatusDir(new BigDecimal(status)),
                        invoice.getPackDoc(),
                        (Usr) session.get(Usr.class, user.getUsername()),
                        new DocDir(new BigDecimal(2)),
                        new Date(),
                        invoice.getHid()
                ));
            }
            session.getTransaction().commit();
            session.close();
            if (status == 1 || status == 2 || status == 9 || status == 13 || status == 14 || status == 7) {
                log.info(buildStatistics(HibernateUtil.getSessionFactory().getStatistics()));
            }
        }
        return result;
    }

    private String buildStatistics(Statistics stat) {
        return new StringBuilder()
                .append("Statistics[")
//                .append( "start time=" ).append(new SimpleDateFormat("dd.MM.yyyy HH:mm:ss,S").format(new Date(stat.getStartTime()))  )
//                .append( ",sessions opened=" ).append( stat.getSessionOpenCount() )
//                .append( ",sessions closed=" ).append( stat.getSessionCloseCount() )
                .append("transactions=").append(stat.getTransactionCount())
                .append(",successful transactions=").append(stat.getSuccessfulTransactionCount())
                .append(",flushes=").append(stat.getFlushCount())
                .append(",connections obtained=").append(stat.getConnectCount())
                .append(",statements prepared=").append(stat.getPrepareStatementCount())
                .append(",entities loaded=").append(stat.getEntityLoadCount())
                .append(",entities updated=").append(stat.getEntityUpdateCount())
                .append(",entities inserted=").append(stat.getEntityInsertCount())
                .append(",entities deleted=").append(stat.getEntityDeleteCount())
                .append(",entities fetched=").append(stat.getEntityFetchCount())
                .append(",collections loaded=").append(stat.getCollectionLoadCount())
                .append(",collections updated=").append(stat.getCollectionUpdateCount())
                .append(",collections removed=").append(stat.getCollectionRemoveCount())
                .append(",collections fetched=").append(stat.getCollectionFetchCount())
                .append(",queries executed to database=").append(stat.getQueryExecutionCount())
//                .append( ",max query time=" ).append( stat.getQueryExecutionMaxTime() ).append("ms")
                .append(']')
                .toString();
    }
}
