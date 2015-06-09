package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.hibernate.Query;
import org.hibernate.StatelessSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContext;
import java.io.File;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.Date;

public class ExchangeServer {
    final static private Logger log = LoggerFactory.getLogger(ExchangeServer.class);
    private static final String fileName = "script.xml";

    public ExchangeServer() {
    }

    public boolean SendTDG(Long hid_cs, String user, TDGConvertor.TdgDir dir, ServletContext sc) throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + hid_cs);
        boolean res = false;

        try {
            TDGConvertor conv = new TDGConvertor(sc);
            conv.sendPackage(hid_cs, dir);

            saveStatus(hid_cs, user, dir.getGoodStatus(), dir.getStatusCol(), false);

            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage());
            saveStatus(hid_cs, user, dir.getBadStatus(), dir.getStatusCol(), true);
            throw e;
        }
        return res;
    }

    public String getIftminText(Long hid_cs, String user)  throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + hid_cs);

        EDIConvertor97B conv = new EDIConvertor97B(EDIConvertor.EdiDir.DB);
        conv.sendIftmin(hid_cs);
        return conv.getIftminText();
    }

    public boolean SendIftmin(Long hid_cs, String user, EDIConvertor.EdiDir dir) throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + hid_cs);
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            EDIConvertor97A conv = new EDIConvertor97A(path, dir);

            conv.sendIftmin(hid_cs);
       /* try{
        HibernateUtil.beginTransaction();
        HibernateUtil.getSession().refresh(cs);
        HibernateUtil.commitTransaction();
        }catch (Exception e) {
            HibernateUtil.rollbackTransaction();
            log.error(e.getMessage(), e);
            throw e;
        }*/

            /*for (CimSmgsInvoice inv : cs.getPackDoc().getCsInvoices()) {
                conv.sendInvoic(inv);
            }*/
            conv.sendInvoice(hid_cs);
            saveStatus(hid_cs, user, dir.getGoodStatus(), dir.getStatusCol(), false);

            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage());
            saveStatus(hid_cs, user, dir.getBadStatus(), dir.getStatusCol(), true);
            throw e;
        }
        return res;
    }

    private void saveStatus(Long cs_hid, String user, byte status, String col, boolean isBad) {
        StatelessSession session = HibernateUtil.getSessionFactory().openStatelessSession();
        session.beginTransaction();
        CimSmgs cs = (CimSmgs) session.get(CimSmgs.class, cs_hid);
        session.insert(new Status(
                null,
                new StatusDir(new BigDecimal(status)),
                cs.getPackDoc(),
                (Usr) session.get(Usr.class, user),
                new DocDir(cs.getDocType1()),
//            new DocDir(Constants.buildDoctype(cs.getType())),
                new Date(),
                cs.getHid()
        ));

        if (isBad) {
            String query = "UPDATE CimSmgs cs SET cs." + col + "=:s WHERE cs.hid=:id";
            Query q = session.createQuery(query);
            q.setByte("s", status);
            q.setLong("id", cs.getHid());
            q.executeUpdate();
        }
        session.getTransaction().commit();
        session.close();
    }

/*
    @Deprecated
    public boolean SendIftmin(Long id) {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            EDIConvertor conv = new EDIConvertor(path, EDIConvertor.EdiDir.BCH);

            conv.sendIftmin(id);
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;
    }
*/

/*
    @Deprecated
    public boolean SendIvoice(Long id) {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            EDIConvertor conv = new EDIConvertor(path, EDIConvertor.EdiDir.BCH);

            conv.sendInvoic(id);
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;
    }
*/

    public boolean SendCTM(Long id) {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            CTMConvertor conv = new CTMConvertor(path);

            conv.sendPackage(id);
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;
    }

    public boolean SendTBC(Long id) throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            TBCConvertor conv = new TBCConvertor(path);

            conv.sendPackage(id, false);
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
        return res;
    }

    public String[] SendTBC2File(Long id) throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        String[] res = null;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            TBCConvertor conv = new TBCConvertor(path);

            res = conv.sendPackage(id, true);
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }
        return res;
    }

    /**
     * @param id - CimSmgs.hid
     * @param sc - ServletContext
     * @return { file_content, file_name }
     * @throws Exception
     */
    public boolean SendPIXML(Long id, ServletContext sc, Usr usr) throws Exception {
        if (log.isDebugEnabled()) log.debug("ID = " + id);
        boolean res = false;

        try {
            FTSConvertor conv = new FTSConvertor(sc);
            conv.send(id, usr);
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            throw e;
        }

        return res;
    }

    public boolean ReceiveEDI() {
        if (log.isDebugEnabled()) log.debug("Start");
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            EDIConvertor97A conv = new EDIConvertor97A(path, EDIConvertor.EdiDir.BCH);

            conv.receive();
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;
    }

    public boolean ReceiveTBC() {
        if (log.isDebugEnabled()) log.debug("Start");
        boolean res = false;

        try {
            String path = getScriptFile();
            if (log.isDebugEnabled()) log.debug("Path=" + path);

            TBCConvertor conv = new TBCConvertor(path);

            conv.receive();
            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;
    }

    public boolean ReceiveTBCFile(String xmlStr, String fileName, String un, String trans, Route route, UsrGroupsDir usrgrdir) {
        if (log.isDebugEnabled()) log.debug("Start");
        boolean res = false;

        try {
            TBCConvertor conv = new TBCConvertor();

//      conv.receive(xmlStr, fileName, un, trans, route, usrgrdir);
            conv.receiveXML(xmlStr, un, trans, route, usrgrdir);

            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;

    }

    public boolean ReceiveTBCFile(String xmlStr, String un, String trans, Route route, UsrGroupsDir usrgrdir) {
        if (log.isDebugEnabled()) log.debug("Start");
        boolean res = false;

        try {
            TBCConvertor conv = new TBCConvertor();

            conv.receiveXML(xmlStr, un, trans, route, usrgrdir);

            res = true;
            log.info("Complete");
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
        return res;

    }

    private String getScriptFile() throws URISyntaxException {
        return new File(new java.net.URI(ExchangeServer.class.getClassLoader().getResource(fileName).toString().replaceAll(" ", "%20"))).getAbsolutePath();
    }

    public Long SendGR(String npoezd, Route route, Byte type, String user) throws Exception {
      if (log.isDebugEnabled()) log.debug("npoezd = " + npoezd + "route = " + route.getHid() );
      Long[] hids;

      try {
        String path = getScriptFile();
        if (log.isDebugEnabled()) log.debug("Path=" + path);

        DocUnloader conv = new DocUnloader(path);
        hids = conv.sendXML(npoezd, route, type);

        for (Long hid_cs : hids) {
          saveStatus(hid_cs, user, (byte)49, "greenRail_status", false);
        }

        log.info("Complete");
      }
      catch (Exception e) {
        log.error(e.getMessage(), e);
        throw e;
      }
      return (long)hids.length;
    }

/*
  static public void main(String[] args) {
    try {
      ExchangeServer server = new ExchangeServer();
      boolean res = false;
//    res = server.Peregruz("12345678", "23456789", "345", "Груз", "12121212", new Date(), new Date(), "111111");
//      res = server.PeredVed("1", new Date(), "1234 001 9876", "123456", "12345678", "20", "1", "ABCD1234567", "2210", "20", "1", "12345", new Integer(2000), "CN", "234567", "9999", "987654", "RU", "1111", new Integer(2), "55555", "5550000", "5", new Date(), new String[] {"1", "2", "3"}, "Сам себе экспедитор");
//      res = server.Inform("ABCD1234567", "20", "1", "12345678", "130100", "130100", "180000", "2", new Date(), "21", "JJJ", "Трубы", "543216");
      res = server.SendIftmin(new Long(3519));
//      res = server.SendIvoice(new Long(713));
//      res = server.Receive();
      res = server.SendCTM(new Long(3519));

      log.info("Result = " + res);
    }
    catch(Exception e) {
      e.printStackTrace();
    }
    System.exit(0);
  }
*/

}
