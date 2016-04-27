package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.Tbc2Log;
import com.bivc.cimsmgs.db.Tbc2Pack;
import com.bivc.cimsmgs.db.Tbc2Status;
import com.bivc.cimsmgs.exchange.tbc.CreateActionTBC;
import com.bivc.cimsmgs.exchange.tbc.DocTBC;
import com.bivc.cimsmgs.exchange.tbc.ReqOpenProcTBC;
import com.bivc.cimsmgs.exchange.tbc.soap.TBCAcsDocsServiceClient;
import com.bivc.cimsmgs.exchange.tbc.xml.ECPWorker;
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
import java.util.Date;
import java.util.List;

public class FTSExchange {
    private static final String encoding = "utf-8";
    final static private Logger log = LoggerFactory.getLogger(FTSExchange.class);
    private String debugLevel = "0";
    static private String TBCSoapHost = null;
    static private String TBCSoapLogin = null;
    static private String TBCSoapPass = null;
    static private String TBCSoapRepositoryPath = null;

    public void sendDocs(Long hid_cs, ServletContext sc) throws Exception {
        Session session = null;
        Transaction tx = null;
        boolean parseSuccess = true;
        String ResultCodeSucess = "00.00000.00";

        try {
            session = HibernateUtil.getSession();
            tx = session.beginTransaction();
            if (getStatus(hid_cs).equals("0") || getStatus(hid_cs).equals("6")) {
                initParam(sc);
                try (TBCAcsDocsServiceClient client = new TBCAcsDocsServiceClient(TBCSoapHost, TBCSoapLogin, TBCSoapPass, TBCSoapRepositoryPath)) {
                    debugLevel = sc.getInitParameter("TBCDebugLevel");

                    CimSmgs cimSmgs = (CimSmgs) session.get(CimSmgs.class, hid_cs);
                    if (cimSmgs != null) {
                        ECPWorker.initParam(sc);
                        SAXReader reader = new SAXReader(false);
                        String procedureID;
                        Tbc2Pack tbc2Pack;
                        boolean newProc = true;

                        @SuppressWarnings("unchecked")
                        List<Tbc2Log> tbc2LogList = HibernateUtil.getSession().createQuery("from Tbc2Log where hid_src = :h and doc_type = 'SMGS' and result is not null order by dattr desc").setLong("h", hid_cs).list();
                        if (tbc2LogList.size() == 0) {
                            ReqOpenProcTBC reqOpenProcTBC = new ReqOpenProcTBC();
                            String openProc = reqOpenProcTBC.createReqOpenProc(hid_cs);
                            debug(openProc);
                            log.debug("Open procedure exchange with TBC");
                            String openProcResponce = client.openProc(openProc);
                            debug(openProcResponce);

                            Document document = reader.read(new ByteArrayInputStream(openProcResponce.getBytes(encoding)));
                            procedureID = document.selectSingleNode("//*[name()='PermitOpenProcTBC']/*[name()='ProcedureID']").getText();

                            tbc2Pack = new Tbc2Pack(procedureID, new Date());
                            session.save(tbc2Pack);
                        } else {
                            tbc2Pack = (Tbc2Pack) session.get(Tbc2Pack.class, tbc2LogList.get(0).getTbc2Pack().getHid());
                            procedureID = tbc2Pack.getPackId();
                            newProc = false;
                        }
                        log.debug("procedureID - " + procedureID);


                        DocTBC docTBC = new DocTBC();
                        String doc = docTBC.createDoc(cimSmgs, procedureID, tbc2Pack, newProc);
                        debug(doc);

                        if (doc != null) {
                            log.debug("Send " + doc.length() + " bytes.");
                            String[] docResults = client.put(new String[]{doc});

                            for (String docResult : docResults) {
                                debug(docResult);
                            }

                            Document documentResult = reader.read(new ByteArrayInputStream(docResults[0].getBytes(encoding)));
                            @SuppressWarnings("unchecked")
                            List<Node> resultList = documentResult.selectNodes("//*[name()='Result']");
                            String parseError = "";
                            for (Node resultInformation : resultList) {
                                Node RefDocumentIDNode = resultInformation.selectSingleNode("*[name()='Response']/*[name()='RefDocumentID']");
                                String resultCode = resultInformation.selectSingleNode("*[name()='Response']/*[name()='ResultInformation']/*[name()='ResultCode']").getText();

                                if (RefDocumentIDNode != null) {
                                    String RefDocumentID = RefDocumentIDNode.getText();
                                    List<Tbc2Log> tbc2Logs = HibernateUtil.getSession().createQuery("from Tbc2Log where docId = :h order by dattr desc").setString("h", RefDocumentID).list();
                                    if (tbc2Logs.size() != 0) {
                                        Tbc2Log tbc2Log = tbc2Logs.get(0);
                                        tbc2Log.setResult(resultInformation.asXML());
                                        session.update(tbc2Log);
//                                    tx.commit();
                                    }
                                }

                                if (!ResultCodeSucess.equals(resultCode)) {
                                    @SuppressWarnings("unchecked")
                                    List<Node> resultDescriptionList = resultInformation.selectNodes("*[name()='Response']/*[name()='ResultInformation']/*[name()='ResultDescription']");
                                    for (Node descr : resultDescriptionList) {
                                        parseError += descr.getText() + "<br>";
                                    }
                                    parseSuccess = false;
                                }
                            }

                            if (!parseSuccess) {
                                Tbc2Status tbc2Status = new Tbc2Status(tbc2Pack.getHid(), new Date(), null, "Ошибка обработки сообщения", "Responce error", "-1", parseError);
                                session.save(tbc2Status);
                                log.debug("Ошибка обработки сообщения: " + parseError);
                            } else {
                                CreateActionTBC createActionTBC = new CreateActionTBC();
                                String createActionTBCXml = createActionTBC.create(procedureID);
                                debug(createActionTBCXml);

                                String[] createActionTBCResponce = client.put(new String[]{createActionTBCXml});
                                debug(createActionTBCResponce[0]);

                                Document documentCreateActionTBCResult = reader.read(new ByteArrayInputStream(createActionTBCResponce[0].getBytes(encoding)));
                                resultList = documentCreateActionTBCResult.selectNodes("//*[name()='Result']");
                                for (Node resultInformation : resultList) {
                                    String resultCode = resultInformation.selectSingleNode("*[name()='Response']/*[name()='ResultInformation']/*[name()='ResultCode']").getText();
                                    if (!ResultCodeSucess.equals(resultCode)) {
                                        @SuppressWarnings("unchecked")
                                        List<Node> resultDescriptionList = resultInformation.selectNodes("*[name()='Response']/*[name()='ResultInformation']/*[name()='ResultDescription']");
                                        for (Node descr : resultDescriptionList)
                                            parseError += descr.getText() + "<br>";
//                                            log.debug(descr.getText());
//                                        throw new Exception("Ошибка отправки данных менеджеру ТБЦ.");
                                        parseSuccess = false;
                                    }
                                }
                                if (!parseSuccess) {
                                    Tbc2Status tbc2Status = new Tbc2Status(tbc2Pack.getHid(), new Date(), null, "Ошибка отправки данных менеджеру ТБЦ", "Responce error", "-1", parseError);
                                    session.save(tbc2Status);
                                    log.debug("Ошибка отправки данных менеджеру ТБЦ: " + parseError);
                                }

                                log.debug("Documents from pack(" + procedureID + ") sended to manager");

                                // Get current pack status from TBC

//                        HibernateUtil.commitTransaction();
                            }
                        }
//                }
//                else {
//                    throw new Exception("Ошибка открытия процедуры обмена с ТБЦ");
//                }
                    } else {
                        throw new Exception("Перевозочный документ не найден (hid = " + hid_cs + ")");
                    }
                } catch (HibernateException ex) {
                    log.error(ex.getMessage(), ex);
//            if (tx != null)
//                tx.rollback();
                    if (session != null)
                        session.clear();
                    throw ex;
                } catch (Exception ex) {
                    log.error(ex.getMessage(), ex);
                    throw ex;
                }
            } else throw new Exception("Документ не может быть отправлен в ТБЦ");

            tx.commit();

        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            tx.rollback();
            throw ex;
        }

        TBC2ReceiverTask tbc2ReceiverTask = new TBC2ReceiverTask(sc);
        tbc2ReceiverTask.runTask();

    }

    private void debug (String msg) {
        if ("1".equals(debugLevel)) {
            log.debug(msg);
            log.debug("-------------------------------------");
        }
    }

    static private void initParam(ServletContext sc) throws URISyntaxException {
        if (sc != null) {
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

    public String getStatus(Long hid_cs) throws Exception {
        String destStatus = "0";
        try {
            @SuppressWarnings("unchecked")
            List<Tbc2Status> tbc2Statuses = HibernateUtil.getSession().createQuery("from Tbc2Status AS st WHERE st.hid_pack = (SELECT log.hid_pack FROM Tbc2Log AS log where log.hid_src = :h and log.doc_type = 'SMGS')  order by st.changeDate desc").setLong("h", hid_cs).list();
            if (tbc2Statuses.size() != 0)
                destStatus = tbc2Statuses.get(0).getStatus();
        }
        catch (Exception ex) {
            System.out.println(ex.getMessage());
        }
        return destStatus;
    }

}
