package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.Node;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.mapping.Column;
import org.hibernate.mapping.PersistentClass;
import org.hibernate.mapping.Property;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DocLoader {

  private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
  private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
  private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
  final static private Logger log = LoggerFactory.getLogger(DocLoader.class);
  private TreeMap<String, TreeMap<String, String>> mmm = new TreeMap<String, TreeMap<String, String>>();
  private TreeMap<Character, Long> srcMap = new TreeMap<Character, Long>();

  public DocLoader() {
    Session session = null;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      @SuppressWarnings("unchecked")
      List<Object[]> srcList = session.createSQLQuery("SELECT src, route FROM src_dir").list();
      for (Object[] row : srcList) {
        srcMap.put((Character)row[0], ((BigDecimal)row[1]).longValue());
      }
      tx.commit();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      if (tx != null)
        tx.rollback();
     }
  }

  public CimSmgs load(Document doc, String un, String trans, long[] routes) {
    Date d = new Date();
    TreeMap<Long, CimSmgsCarList> carMap = new TreeMap<Long, CimSmgsCarList>();
    TreeMap<Long, CimSmgsKonList> konMap = new TreeMap<Long, CimSmgsKonList>();
    TreeMap<Long, CimSmgsInvoice> invMap = new TreeMap<Long, CimSmgsInvoice>();

    log.debug("Processing CIM_SMGS");
    List scFields = doc.selectNodes("/doc/cim_smgs/*");
    CimSmgs cs = new CimSmgs();
    cs = processNode(scFields, cs);
    cs.setHid(null);
    if (cs.getHidSmgs() == null || cs.getHidSmgs() == 0) {
      cs.setType((byte)1);
      cs.setDocType1(new BigDecimal(4));
    }
    else {
      cs.setType((byte)2);
      cs.setDocType1(BigDecimal.ONE);
    }
    cs.setDattr(d);
    cs.setUn(un);
    cs.setTrans(trans);
    cs.setReady(null);
    cs.setStatusBr(null);
    cs.setKind(0);

    Long route = null;
    if (cs.getSrc() != null) {
      route =  srcMap.get(cs.getSrc());
    }
    if (route == null) {
      route = StringUtils.indexOf(cs.getG4r(), "БМВ") < 0 ? routes[0] : routes[1];
    }

    Route r = new Route(route);
    log.debug("route=" + route);
    cs.setRoute(r);

    PackDoc pd = new PackDoc();
    pd.setUsrGroupsDir(new UsrGroupsDir(trans));
    pd.setRoute(r);
    pd.addCimSmgsItem(cs);

    log.debug("Processing CIM_SMGS_DOC");
    @SuppressWarnings("unchecked")
    List<Node> csdNodes = doc.selectNodes("/doc/cim_smgs_docs");
    byte i = 0;
    for (Node csdNode : csdNodes) {
      log.debug("CIM_SMGS_DOC[" + (i++) + "]");
      List scdFields = csdNode.selectNodes("*");
      CimSmgsDocs csd = new CimSmgsDocs();
      csd = processNode(scdFields, csd);
      csd.setHid(null);
      csd.setDattr(d);
      csd.setSort(null);
      cs.addCimSmgsDocsItem(csd);
    }

    log.debug("Processing CIM_SMGS_PLATEL");
    @SuppressWarnings("unchecked")
    List<Node> cspNodes = doc.selectNodes("/doc/cim_smgs_platel", "sort/text()");
    i = 0;
    for (Node cspNode : cspNodes) {
      log.debug("CIM_SMGS_PLATEL[" + i + "]");
      List scpFields = cspNode.selectNodes("*");
      CimSmgsPlatel csp = new CimSmgsPlatel();
      csp = processNode(scpFields, csp);
      csp.setHid(null);
      csp.setSort(i++);
      csp.setDattr(d);
      cs.addCimSmgsPlatelItem(csp);
    }

    log.debug("Processing CIM_SMGS_CAR_LIST");
    @SuppressWarnings("unchecked")
    List<Node> cscNodes = doc.selectNodes("/doc/cim_smgs_car_list");
    i = 0;
    for (Node cscNode : cscNodes) {
      log.debug("CIM_SMGS_CAR_LIST[" + i + "]");
      List sccFields = cscNode.selectNodes("*");
      CimSmgsCarList csc = new CimSmgsCarList();
      csc = processNode(sccFields, csc);
      carMap.put(csc.getHid(), csc); /******/
      csc.setHid(null);
      csc.setSort(i++);
      csc.setDattr(d);
      cs.addCimSmgsCarListItem(csc);
    }

    log.debug("Processing CIM_SMGS_KON_LIST");
    @SuppressWarnings("unchecked")
    List<Node> cskNodes = doc.selectNodes("/doc/cim_smgs_kon_list");
    i = 0;
    for (Node cskNode : cskNodes) {
      log.debug("CIM_SMGS_KON_LIST[" + i + "]");
      List sckFields = cskNode.selectNodes("*");
      CimSmgsKonList csk = new CimSmgsKonList();
      csk = processNode(sckFields, csk);

      konMap.put(csk.getHid(), csk); /******/

      csk.setHid(null);
      csk.setSort(i++);
      csk.setDattr(d);

      Long hid_car = Long.valueOf(cskNode.selectSingleNode("hid_car").getText());
      CimSmgsCarList csc = carMap.get(hid_car);
      if (csc != null) {
        csc.addCimSmgsKonListItem(csk);
        // Перенос пломб для совместимости
        CimSmgs cc = csc.getCimSmgs();
        if (cc != null)
          cc.setG2012(csk.getPlombs());
      }
    }

    log.debug("Processing CIM_SMGS_GRUZ");
    @SuppressWarnings("unchecked")
    List<Node> csgNodes = doc.selectNodes("/doc/cim_smgs_gruz");
    int j = 0;
    for (Node csgNode : csgNodes) {
      log.debug("CIM_SMGS_GRUZ[" + j + "]");
      List scgFields = csgNode.selectNodes("*");
      CimSmgsGruz csg = new CimSmgsGruz();
      csg = processNode(scgFields, csg);

      csg.setHid(null);
      csg.setDattr(d);
      if (j == 0) {
        cs.setG23(csg.getKgvn());
        cs.setG23b(csg.getEkgvn());
      }
      csg.setSort(j);

      String hidCarStr = csgNode.selectSingleNode("hid_car").getText();
      if (hidCarStr != null && hidCarStr.trim().length() > 0) {
        Long hid_car = Long.valueOf(hidCarStr);
        CimSmgsCarList csc = carMap.get(hid_car);
        if(csc != null)
          csc.addCimSmgsGruzItem(csg);
      }

      String hidKonStr = csgNode.selectSingleNode("hid_kon").getText();
      if (hidKonStr != null && hidKonStr.trim().length() > 0) {
        Long hid_kon = Long.valueOf(hidKonStr);
        CimSmgsKonList csk = konMap.get(hid_kon);
        if(csk != null) {
          csk.addCimSmgsGruzItem(csg);
          if (j == 0) {
            csg.setMassa(csk.getMassSend());
          }
        }
      }
      j++;
    }

    log.debug("Processing CS_INVOICE");
    @SuppressWarnings("unchecked")
    List<Node> invNodes = doc.selectNodes("/doc/cs_invoice");
    i = 0;
    for (Node invNode : invNodes) {
      log.debug("CS_INVOICE[" + (i++) + "]");
      List invFields = invNode.selectNodes("*");
      CimSmgsInvoice inv = new CimSmgsInvoice();
      inv = processNode(invFields, inv);
      invMap.put(inv.getHid(), inv); /******/
      inv.setHid(null);
      inv.setDattr(d);
      inv.setTrans(trans);
      inv.setUn(un);
      inv.setRoute(r);
//      cs.addInvoiceItem(inv);
      pd.addInvoiceItem(inv);
    }

    log.debug("Processing CS_INVOICE_GRUZ");
    @SuppressWarnings("unchecked")
    List<Node> invgNodes = doc.selectNodes("/doc/cs_invoice_gruz");
    j = 0;
    for (Node invgNode : invgNodes) {
      log.debug("CS_INVOICE_GRUZ[" + (j++) + "]");
      List invgFields = invgNode.selectNodes("*");
      CimSmgsInvoiceGruz invg = new CimSmgsInvoiceGruz();
      invg = processNode(invgFields, invg);

      Long hid_csinv = Long.valueOf(invgNode.selectSingleNode("hid_csinv").getText());
      CimSmgsInvoice inv = invMap.get(hid_csinv);
      if (inv != null)
        inv.addInvoiceGruzItem(invg);

      invg.setHid(null);
    }

    Session session = null;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      session.save(pd);
//      for (CimSmgsInvoice elem : cs.getInvoices()) {
//        session.save(elem);
//      }

      tx.commit();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      if (tx != null)
        tx.rollback();
//      if (session != null)
//        session.clear();
    }
    /*finally {
      if (session != null)
        session.close();
    }*/

    return cs;
  }

  private <T> T processNode(List fields, T ob) {
    String className = ob.getClass().getName();
    Map<String, String> map = prepareMaping(className);

    for (Iterator it = fields.iterator(); it.hasNext(); ) {
      Element el = (Element) it.next();

      String elName = el.getName();
      String cn = map.get(el.getName());
      String data = el.getText();
      try  {
        Class propertyType = PropertyUtils.getPropertyType(ob, cn);
        if(propertyType == null) {
          String errMsg = "Property " + cn + "(" +elName + ") not found in table " + ob.getClass().getName();
          throw new java.lang.IllegalArgumentException(errMsg);
        }

        if (data == null || data.equals("")) {
          PropertyUtils.setProperty(ob, cn, null);
        }
        else if (propertyType.isAssignableFrom(java.lang.Long.class)) {// если тип колонки Long
          Long lv = null;
          try {
            lv = Long.valueOf(data);
          }
          catch (Exception ex) {
            lv = new java.math.BigDecimal(data).longValue();
          }
          PropertyUtils.setProperty(ob, cn, lv);
        }
        else if (propertyType.isAssignableFrom(java.lang.Integer.class)) // если тип колонки Integer
          PropertyUtils.setProperty(ob, cn, Integer.valueOf(data));
        else if (propertyType.isAssignableFrom(java.lang.Short.class)) // если тип колонки Short
          PropertyUtils.setProperty(ob, cn, Short.valueOf(data));
        else if (propertyType.isAssignableFrom(java.lang.Byte.class)) // если тип колонки Blob
          PropertyUtils.setProperty(ob, cn, Byte.valueOf(data));
        else if (propertyType.isAssignableFrom(java.math.BigDecimal.class)) // если тип колонки BigDecimal
          PropertyUtils.setProperty(ob, cn, new java.math.BigDecimal(data));
        else if(propertyType.isAssignableFrom(java.util.Date.class)) {// если тип колонки Date
          Date d = null;
          try {
            d = dateTimeFormater.parse(data);
          }
          catch(ParseException ex) {
            try {
              d = dateFormater.parse(data);
            }
            catch(ParseException ex1) {
              try {
                d = dateTimeFormater1.parse(data);
              }
              catch(ParseException ex2) {
                log.warn(" Not parserable data (" + data + ")");
              }
            }
          }
          // преобразование передаваемого значения в тип Date и его установка в обьект таблицы
          PropertyUtils.setProperty(ob, cn, d);
        }
        else if (propertyType.isAssignableFrom(java.lang.Character.class)) // если тип колонки BigDecimal
          PropertyUtils.setProperty(ob, cn, data.charAt(0));
        else {
          // установка передаваемого значения в обьект таблицы
          //log.debug("ColumnName=" + cn + " ColumnType=" + ob.getClass().getName() + " Data=" + data);
          PropertyUtils.setProperty(ob, cn, data);
        }
      }
      catch(Exception e) {
        log.warn("Exception for field=" + cn + "(" +elName + "), value=" + data);
      }
    }
    return ob;
  }

  private Map<String, String> prepareMaping(String className) {
    log.debug("Preparing map for " + className);
    TreeMap<String, String> res = mmm.get(className);
    if (res != null) {
      log.debug("Found in cache");
      return res;
    }

    log.debug("Building");
    res = new TreeMap<String, String>();
    Configuration cfg = HibernateUtil.getConfiguration();
    PersistentClass cl = cfg.getClassMapping(className);
    Iterator it = cl.getPropertyIterator();
    while (it.hasNext())     {
      Property pr = (Property)it.next();
      Iterator it1 = pr.getColumnIterator();
      if (it1.hasNext()) {
        Column co = (Column)it1.next();
        res.put(co.getCanonicalName(), pr.getName());
      }
    }
    res.put("hid", "hid");

    if ("com.bivc.cimsmgs.db.CimSmgsDocs".equals(className)) {
      res.remove("hid_cs");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsCarList".equals(className)) {
      res.remove("hid_cs");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsPlatel".equals(className)) {
      res.remove("hid_cs");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsKonList".equals(className)) {
      res.remove("hid_cs");
      res.remove("hid_car");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsGruz".equals(className)) {
      res.remove("hid_cs");
      res.remove("hid_car");
      res.remove("hid_kon");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsInvoice".equals(className)) {
      res.remove("hid_cs");
    }
    else if ("com.bivc.cimsmgs.db.CimSmgsInvoiceGruz".equals(className)) {
      res.remove("hid_csinv");
    }

    mmm.put(className, res);
    log.debug("Done");
    return res;
  }

}
