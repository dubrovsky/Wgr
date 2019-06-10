package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
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
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class DocLoader {

  private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
  private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
  private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
  private static final Logger log = LoggerFactory.getLogger(DocLoader.class);
  private TreeMap<String, TreeMap<String, String>> mmm = new TreeMap<>();
  private TreeMap<Character, Long> srcMap = new TreeMap<>();

  public DocLoader() {
    Session session;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      @SuppressWarnings("unchecked")
      List<Object[]> srcList = session.createSQLQuery("SELECT src, route FROM SRC_DIR").list();
      for (Object[] row : srcList) {
        srcMap.put((Character)row[0], ((BigInteger)row[1]).longValue());
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
    TreeMap<Long, CimSmgsCarList> carMap = new TreeMap<>();
    TreeMap<Long, CimSmgsKonList> konMap = new TreeMap<>();
    TreeMap<Long, CimSmgsInvoice> invMap = new TreeMap<>();

    log.debug("Processing CIM_SMGS");
    @SuppressWarnings("unchecked")
    List<Node> scFields = doc.selectNodes("/doc/cim_smgs/*");
    CimSmgs cs = new CimSmgs();
    cs = processNode(scFields, cs);
    cs.setHid(null);
    DocType type = null;
    if (cs.getType() != null && cs.getType() == 2) {
      type = DocType.SMGS;
    }
    else if (cs.getType() == null || cs.getType() == 1 || cs.getType() == 0) {
      type = DocType.CIMSMGS;
    }
    if (type != null) {
      cs.setType(type.getType());
      cs.setDocType1(type.getDocType1());
    }
    else {
      log.warn("Unknown type=" + cs.getType());
    }

    cs.setDattr(d);
    cs.setUn(un);
    cs.setTrans(trans);
    cs.setReady(null);
    cs.setStatusBr(null);
//    cs.setKind(0);

    Long route = null;
    if (cs.getSrc() != null) {
      route =  srcMap.get(cs.getSrc());
    }
    if (route == null) {
      route = StringUtils.indexOf(cs.getG4r(), "БМВ") < 0 ? routes[0] : routes[1];
    }

    Route r = null;
    Session session;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();
      r = (Route) HibernateUtil.getSession().get(Route.class, route);
      tx.commit();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      if (tx != null)
        tx.rollback();
    }

//    Route r = new Route(route);
    if (r == null)
      throw new RuntimeException("route " + route + " not found");
    log.debug("route=" + route);
    cs.setRoute(r);

    PackDoc pd = new PackDoc();
    pd.setUsrGroupsDir(new UsrGroupsDir(trans));
    pd.setRoute(r);
    pd.addCimSmgsItem(cs);

    log.debug("Processing CIM_SMGS_PLATEL");
    @SuppressWarnings("unchecked")
    List<Node> cspNodes = doc.selectNodes("/doc/cim_smgs_platel", "sort/text()");
    byte i = 0;
    for (Node cspNode : cspNodes) {
      log.debug("CIM_SMGS_PLATEL[" + i + "]");
      @SuppressWarnings("unchecked")
      List<Node> scpFields = cspNode.selectNodes("*");
      CimSmgsPlatel csp = new CimSmgsPlatel();
      csp = processNode(scpFields, csp);
      csp.setHid(null);
      csp.setSort(i++);
      csp.setDattr(d);
      cs.addCimSmgsPlatelItem(csp);
    }

    log.debug("Processing CIM_SMGS_PEREVOZ");
    @SuppressWarnings("unchecked")
    List<Node> cspeNodes = doc.selectNodes("/doc/cim_smgs_perevoz", "sort/text()");
    i = 0;
    for (Node cspNode : cspeNodes) {
      log.debug("CIM_SMGS_PEREVOZ[" + i + "]");
      @SuppressWarnings("unchecked")
      List<Node> scpFields = cspNode.selectNodes("*");
      CimSmgsPerevoz csp = new CimSmgsPerevoz();
      csp = processNode(scpFields, csp);
      csp.setHid(null);
      csp.setSort(i++);
      cs.addCimSmgsPerevozItem(csp);
    }

    log.debug("Processing CIM_SMGS_CAR_LIST");
    @SuppressWarnings("unchecked")
    List<Node> cscNodes = doc.selectNodes("/doc/cim_smgs_car_list");
    i = 0;
    for (Node cscNode : cscNodes) {
      log.debug("CIM_SMGS_CAR_LIST[" + i + "]");
      @SuppressWarnings("unchecked")
      List<Node> sccFields = cscNode.selectNodes("*");
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
      @SuppressWarnings("unchecked")
      List<Node> sckFields = cskNode.selectNodes("*");
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
      @SuppressWarnings("unchecked")
      List<Node> scgFields = csgNode.selectNodes("*");
      CimSmgsGruz csg = new CimSmgsGruz();
      csg = processNode(scgFields, csg);

      csg.setHid(null);
      csg.setDattr(d);
      if (j == 0 && StringUtils.isEmpty(cs.getG23())) {
        cs.setG23(csg.getKgvn());
        cs.setG23b(csg.getEkgvn());
      }
      csg.setSort(j);

      String hidCarStr = csgNode.selectSingleNode("hid_car").getText();
      if (hidCarStr != null && hidCarStr.trim().length() > 0) {
        Long hid_car = Long.valueOf(hidCarStr);
        if (hid_car != 0) {
          CimSmgsCarList csc = carMap.get(hid_car);
          if (csc != null)
            csc.addCimSmgsGruzItem(csg);
        }
      }

      String hidKonStr = csgNode.selectSingleNode("hid_kon").getText();
      if (hidKonStr != null && hidKonStr.trim().length() > 0) {
        Long hid_kon = Long.valueOf(hidKonStr);
        if (hid_kon != 0) {
          CimSmgsKonList csk = konMap.get(hid_kon);
          if (csk != null) {
            csk.addCimSmgsGruzItem(csg);
            if (j == 0 && (csg.getMassa() == null || BigDecimal.ZERO.compareTo(csg.getMassa()) == 0)) {
              csg.setMassa(csk.getMassSend());
            }
            CimSmgsCarList csc = csk.getCimSmgsCarList();
            if (!csc.getCimSmgsGruzs().containsValue(csg)) {
              csc.addCimSmgsGruzItem(csg);
            }
          }
        }
      }
      j++;
    }

    log.debug("Processing CIM_SMGS_DOC");
    @SuppressWarnings("unchecked")
    List<Node> csdNodes = doc.selectNodes("/doc/cim_smgs_docs");
    i = 0;
    for (Node csdNode : csdNodes) {
      log.debug("CIM_SMGS_DOC[" + (i++) + "]");
      @SuppressWarnings("unchecked")
      List<Node> scdFields = csdNode.selectNodes("*");
      CimSmgsDocs csd = new CimSmgsDocs();
      csd = processNode(scdFields, csd);

      csd.setHid(null);
      csd.setDattr(d);
      csd.setSort(null);
      cs.addCimSmgsDocsItem(csd);

//      String hidCarStr = csdNode.selectSingleNode("hid_car").getText();
//      if (hidCarStr != null && hidCarStr.trim().length() > 0) {
//        Long hid_car = Long.valueOf(hidCarStr);
//        if (hid_car != 0) {
//          CimSmgsCarList csc = carMap.get(hid_car);
//          if (csc != null)
//            csc.addCimSmgsPlombItem(csd);
//        }
//      }

      String hidKonStr = csdNode.selectSingleNode("hid_kon").getText();
      if (hidKonStr != null && hidKonStr.trim().length() > 0) {
        Long hid_kon = Long.valueOf(hidKonStr);
        if (hid_kon != 0) {
          CimSmgsKonList csk = konMap.get(hid_kon);
          if (csk != null) {
            csk.addCimSmgsDocsItem(csd);
          }
        }
      }
    }

    log.debug("Processing CIM_SMGS_PLOMB");
    @SuppressWarnings("unchecked")
    List<Node> csplNodes = doc.selectNodes("/doc/cim_smgs_plomb");
    i = 0;
    for (Node csplNode : csplNodes) {
      log.debug("CIM_SMGS_PLOMB[" + i + "]");
      @SuppressWarnings("unchecked")
      List<Node> scplFields = csplNode.selectNodes("*");
      CimSmgsPlomb cspl = new CimSmgsPlomb();
      cspl = processNode(scplFields, cspl);

      cspl.setHid(null);
      cspl.setSort(i++);

      String hidCarStr = csplNode.selectSingleNode("hid_car").getText();
      if (hidCarStr != null && hidCarStr.trim().length() > 0) {
        Long hid_car = Long.valueOf(hidCarStr);
        if (hid_car != 0) {
          CimSmgsCarList csc = carMap.get(hid_car);
          if (csc != null)
            csc.addCimSmgsPlombItem(cspl);
        }
      }

      String hidKonStr = csplNode.selectSingleNode("hid_kon").getText();
      if (hidKonStr != null && hidKonStr.trim().length() > 0) {
        Long hid_kon = Long.valueOf(hidKonStr);
        if (hid_kon != 0) {
          CimSmgsKonList csk = konMap.get(hid_kon);
          if (csk != null) {
            csk.addCimSmgsPlombItem(cspl);
          }
        }
      }

      cs.addCimSmgsPlombItem(cspl);
    }

    log.debug("Processing CS_INVOICE");
    @SuppressWarnings("unchecked")
    List<Node> invNodes = doc.selectNodes("/doc/cs_invoice");
    i = 0;
    for (Node invNode : invNodes) {
      log.debug("CS_INVOICE[" + (i++) + "]");
      @SuppressWarnings("unchecked")
      List<Node> invFields = invNode.selectNodes("*");
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
      @SuppressWarnings("unchecked")
      List<Node> invgFields = invgNode.selectNodes("*");
      CimSmgsInvoiceGruz invg = new CimSmgsInvoiceGruz();
      invg = processNode(invgFields, invg);

      Long hid_csinv = Long.valueOf(invgNode.selectSingleNode("hid_csinv").getText());
      CimSmgsInvoice inv = invMap.get(hid_csinv);
      if (inv != null)
        inv.addInvoiceGruzItem(invg);

      invg.setHid(null);
    }

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

  private <T> T processNode(List<Node> fields, T ob) {
    String className = ob.getClass().getName();
    Map<String, String> map = prepareMaping(className);

    for (Node el : fields) {
      String elName = el.getName();
      String cn = map.get(el.getName());
      String data = el.getText();
      try  {
        Class<?> propertyType = PropertyUtils.getPropertyType(ob, cn);
        if(propertyType == null) {
          String errMsg = "Property " + cn + "(" +elName + ") not found in table " + ob.getClass().getName();
          throw new java.lang.IllegalArgumentException(errMsg);
        }

        if (data == null || data.equals("")) {
          PropertyUtils.setProperty(ob, cn, null);
        }
        else if (propertyType.isAssignableFrom(java.lang.Long.class)) {// если тип колонки Long
          Long lv;
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
    res = new TreeMap<>();
    Configuration cfg = HibernateUtil.getConfiguration();
    PersistentClass cl = cfg.getClassMapping(className);
    Iterator it = cl.getPropertyIterator();
    while (it.hasNext())     {
      Property pr = (Property)it.next();
      Iterator it1 = pr.getColumnIterator();
      if (it1.hasNext()) {
        Object ob = it1.next();
        if (ob instanceof Column) {
          Column co = (Column) ob;
          res.put(co.getCanonicalName(), pr.getName());
        }
      }
    }
    res.put("hid", "hid");

    switch (className) {
      case "com.bivc.cimsmgs.db.CimSmgsCarList" :
      case "com.bivc.cimsmgs.db.CimSmgsPlatel" :
      case "com.bivc.cimsmgs.db.CimSmgsPerevoz" :
      case "com.bivc.cimsmgs.db.CimSmgsInvoice" :
        res.remove("hid_cs");
        break;
      case "com.bivc.cimsmgs.db.CimSmgsKonList" :
        res.remove("hid_cs");
        res.remove("hid_car");
        break;
      case "com.bivc.cimsmgs.db.CimSmgsDocs" :
      case "com.bivc.cimsmgs.db.CimSmgsGruz" :
      case "com.bivc.cimsmgs.db.CimSmgsPlomb" :
        res.remove("hid_cs");
        res.remove("hid_car");
        res.remove("hid_kon");
        break;
      case "com.bivc.cimsmgs.db.CimSmgsInvoiceGruz" :
        res.remove("hid_csinv");
        break;
    }
    mmm.put(className, res);
    log.debug("Done");
    return res;
  }

}
