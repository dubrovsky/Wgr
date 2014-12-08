package com.bivc.cimsmgs.exchange;

import com.bivc.transport.Transport;
import com.bivc.transport.TransportArray;
import com.bivc.transport.TransportFactory;
import org.dom4j.Element;
import org.dom4j.Node;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.engine.SessionImplementor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URI;
import java.net.URISyntaxException;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.Properties;

//import org.hibernate.engine.spi.SessionImplementor;

public class Convertor {

  protected Transport sTr = null;
  protected Transport rTr = null;

  final static private Logger log = LoggerFactory.getLogger(Convertor.class);
  protected static final SimpleDateFormat dtf = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
  protected static final SimpleDateFormat dftd  = new SimpleDateFormat("yyyy-MM-dd_HH.mm.ss_");

  public Convertor() {
  }

  protected void addTransport(Node node, TransportArray tr) throws Exception {
    for (Iterator it = node.selectNodes("transport").iterator(); it.hasNext(); ) {
      Element el = (Element) it.next();
      Transport t = getTransport(el);
      tr.addTransport(t);
    }
  }

  protected Transport getTransport(Node el) throws Exception {
    Properties pr = new Properties();
    pr.setProperty("transport", el.valueOf("@name"));
    pr.setProperty("encoding", el.valueOf("@encoding"));
    pr.setProperty("filename", el.valueOf("filename"));
    pr.setProperty("email", el.valueOf("email"));
    pr.setProperty("server", el.valueOf("server/@host"));
    pr.setProperty("account", el.valueOf("server/@account"));
    pr.setProperty("password", el.valueOf("server/@password"));
    pr.setProperty("from", el.valueOf("from"));
    pr.setProperty("dir", el.valueOf("server/@dir"));
    pr.setProperty("port", el.valueOf("server/@port"));
    pr.setProperty("ssl", el.valueOf("server/@ssl"));
    pr.setProperty("chanel", el.valueOf("server/@chanel"));
    pr.setProperty("manager", el.valueOf("server/@manager"));
    pr.setProperty("queue", el.valueOf("server/@queue"));
    pr.setProperty("subject", el.valueOf("subject"));
    pr.setProperty("maxAttachCount", el.valueOf("maxAttachCount"));
    pr.setProperty("service", el.valueOf("server/service/@name"));
    pr.setProperty("getFuncName", el.valueOf("server/service/@getFuncName"));
    pr.setProperty("putFuncName", el.valueOf("server/service/@putFuncName"));
    pr.setProperty("putParamName", el.valueOf("server/service/@putParamName"));
    pr.setProperty("putParamText", el.valueOf("server/service/@putParamText"));

    Transport t = TransportFactory.getTransport(pr);
    return t;
  }

//  protected long prepareMessageId() {
//    long id = -1;
//
//    Session session = null;
//    Transaction tx = null;
//    try {
//      session = HibernateUtil.getSession();
//      tx = session.beginTransaction();
//
//      id = prepareMessageId(session);
//
//      tx.commit();
//    }
//    catch (Exception e) {
//      try {
//        log.error(e.getMessage(), e);
//        tx.rollback();
//        session.clear();
//      }
//      catch(HibernateException he) {}
//    }
//    /*finally {
//      if (session != null) {
//        try {
//          session.close();
//        }
//        catch (HibernateException ex) {
//          log.error(ex.getMessage(), ex);
//        }
//      }
//    }*/
//
//    return id;
//  }

  protected long prepareMessageId(Session session) throws HibernateException, SQLException {
    long id = -1;
    PreparedStatement pst = ((SessionImplementor)session).getBatcher().prepareSelectStatement("SELECT b_iftmin_log_hid.NEXTVAL FROM dual");
    ResultSet rs = pst.executeQuery();
    if (rs.next()) {
      id = rs.getLong(1);
    }
    rs.close();
    ((SessionImplementor)session).getBatcher().closeStatement(pst);
    log.debug("EDI ID=" + id);
    return id;
  }

   /* protected long prepareMessageId(Session session) throws HibernateException, SQLException {
        long id = -1;
        PreparedStatement st = ((SessionImplementor)session).getTransactionCoordinator().getJdbcCoordinator().getStatementPreparer().prepareStatement("SELECT b_iftmin_log_hid.NEXTVAL FROM dual");
//        PreparedStatement pst = ((SessionImplementor)session).getBatcher().prepareSelectStatement("SELECT b_iftmin_log_hid.NEXTVAL FROM dual");
        ResultSet rs = st.executeQuery();
        if (rs.next()) {
          id = rs.getLong(1);
        }
        rs.close();
        st.close();
        return id;
      }*/


//  protected void saveLog(long id, String mesName, String text, Long hid_src) {
//    Session session = null;
//    Transaction tx = null;
//    try {
//      session = HibernateUtil.getSession();
//      tx = session.beginTransaction();
//
//      saveLog(session, id, mesName, text, hid_src);
//
//      session.flush();
//      tx.commit();
//    }
//    catch (Exception e) {
//      try {
//        log.error(e.getMessage(), e);
//        tx.rollback();
//        session.clear();
//      }
//      catch(HibernateException he) {}
//    }
//    /*finally {
//      if (session != null) {
//        try {
//          session.close();
//        }
//        catch (HibernateException ex) {
//          log.error(ex.getMessage(), ex);
//        }
//      }
//    }*/
//
//  }

  protected void saveFailed(String message, String folder, String encoding) {
    try {
      save2file(message, folder, encoding, "fail_", ".txt");
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
    }
  }

  protected void save2file(String message, String folder, String encoding, String prefix, String suffix) throws URISyntaxException, IOException {
    File tmpDir = createDir(folder);
    File f = File.createTempFile(prefix + dftd.format(new Date()), suffix, tmpDir);
    FileOutputStream fos = new FileOutputStream(f);
    fos.write(message.getBytes(encoding));
    fos.close();
  }

  private File createDir(String folder) throws URISyntaxException {
    String tmpPath = new File(new URI(Convertor.class.getResource("/").toString())).getAbsolutePath();
    File tmpDir = new File(tmpPath, folder);
    if (!tmpDir.exists()) {
      log.debug("Create " + folder + " dir: " + tmpDir.getAbsolutePath());
      if (!tmpDir.mkdirs())
        log.warn("The dir has not been created");
    }
    return tmpDir;
  }

  protected String format(String d) {
    return d != null ? d : "";
  }

  protected String formatN(String d) {
    return d != null ? d : "0";
  }

  protected String format(BigDecimal d) {
    return d != null ? d.toString() : "";
  }

  protected String formatN(BigDecimal d) {
    return d != null ? d.toString() : "0";
  }

  protected String format(Long d) {
    return d != null ? d.toString() : "";
  }

  protected String formatN(Long d) {
    return d != null ? d.toString() : "0";
  }

  protected String format(Integer d) {
    return d != null ? d.toString() : "";
  }

  protected String formatN(Integer d) {
    return d != null ? d.toString() : "0";
  }

  protected String format(Byte d) {
    return d != null ? d.toString() : "";
  }

  protected String formatN(Byte d) {
    return d != null ? d.toString() : "0";
  }

  protected String format(Date d) {
    return d != null ? dtf.format(d) : "";
  }

  protected Date parceD(String val) throws ParseException {
    return (val != null && val.length() > 0 ? dtf.parse(val) : null);
  }

  protected String format(Date d, SimpleDateFormat sdf) {
    return d != null ? sdf.format(d) : "";
  }

  protected String normNvagNkonStr(String str) {
    String res = "";
    if (str != null) {
      res = str.replaceAll(" ", "").replaceAll("-", "");
    }
    return res;
  }

}
