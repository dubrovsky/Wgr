package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.ArrayMap;
import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.VidOtpr;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Node;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.apache.commons.lang3.StringUtils.*;

public class VedLoader {

  private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
  private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
  private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  private static final SimpleDateFormat dateFormater1 = new SimpleDateFormat("dd-MMM-yy", Locale.ENGLISH);
  private static final Logger log = LoggerFactory.getLogger(VedLoader.class);
  private TreeMap<String, Long> srcMap = new TreeMap<>();
  private static final int interval = 90;

  @SuppressWarnings("WeakerAccess")
  public VedLoader() {
    Session session;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      @SuppressWarnings("unchecked")
      List<Object[]> srcList = session.createSQLQuery("SELECT mask, route FROM SRC_VED_DIR WHERE NOW() >= date_bgn AND NOW() < date_end").list();
      for (Object[] row : srcList) {
        srcMap.put((String)row[0], ((BigInteger)row[1]).longValue());
      }
      tx.commit();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      if (tx != null)
        tx.rollback();
     }
  }

  public boolean load(Document doc, String un, String trans, String fullNum) {
    Date d = new Date();
    ArrayMap<String, XMLRow> docMap = new ArrayMap<>();

    Long route;
    String mask = Utils.ss(fullNum, 0, 2);
    route =  srcMap.get(mask);
    if (route == null) {
      log.warn("Not found route in SRC_VED_DIR for file name " + fullNum);
      return false;
    }

    String vedStr = StringUtils.substringBefore(fullNum, "_");

    Route r = null;
    Session session;
    Transaction tx = null;
    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();
      r = (Route) session.get(Route.class, route);
      if (r == null) {
        log.warn("route " + route + " not found");
        tx.commit();
        return false;
      }
      log.debug("route=" + r.getName() + " (" + route + ")");

      @SuppressWarnings("unchecked")
      List<PackDoc> pdList = session.createQuery("SELECT pd FROM PackDoc AS pd JOIN pd.cimSmgses AS cs WITH SUBSTRING_INDEX(cs.npoezd, '_', 1)=:p WHERE pd.route=:r AND pd.dattr > TIMESTAMPADD(DAY, -" + interval + ", NOW())")
              .setString("p", vedStr)
              .setEntity("r", r)
              .list();
      for (PackDoc item : pdList) {
        session.delete(item);
      }

      tx.commit();
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      if (tx != null)
        tx.rollback();
    }

    String rootName = doc.getRootElement().getName();

    @SuppressWarnings("unchecked")
    List<Node> nodes = doc.selectNodes("/" + rootName + "/row");
    int i = 0;
    for (Node node : nodes) {
      log.debug("row[" + i++ + "]");
      @SuppressWarnings("unchecked")
      List<Node> fields = node.selectNodes("*");
      XMLRow row = processNode(fields, new XMLRow());
      row.smgs = defaultString(row.smgs);
      docMap.add(row.smgs, row);
    }

    TreeMap<String, ArrayList<XMLRow>> map = docMap.getMap();
    for (String smgs : map.keySet()) {
      TreeMap<String, CimSmgsCarList> carMap = new TreeMap<>();
      byte carSort = 0;
      byte kontSort = 0;
      byte plombSort = 0;
      int gruzSort = 0;

      CimSmgs cs = new CimSmgs();
      cs.setType(DocType.CIMSMGS.getType());
      cs.setDocType1(DocType.CIMSMGS.getDocType1());
      cs.setDattr(d);
      cs.setAltered(d);
      cs.setUn(un);
      cs.setTrans(trans);
      cs.setNpoezd(fullNum);
      cs.setRoute(r);

      PackDoc pd = new PackDoc();
      pd.setUsrGroupsDir(new UsrGroupsDir(trans));
      pd.setRoute(r);
      pd.setDattr(d);
      pd.addCimSmgsItem(cs);

      cs.setG694(smgs);

      boolean first = true;
      for (XMLRow row : map.get(smgs)) {
        if (first) {
          cs.setG171(right(row.dotp, 2));
          cs.setG17(row.ksto);
          cs.setG162r(row.nsto);
          cs.setG281(row.date_pr);
          cs.setG121(row.kstn);
          cs.setG1r(row.notd);
          cs.setG4r(row.npol);
          cs.setG19r(row.adres_o);
          cs.setG49r(row.adres_p);
          first = false;
        }

        String nvag = row.nvag;
        CimSmgsCarList csc = carMap.get(nvag);
        if (csc == null) {
          csc = new CimSmgsCarList();
          csc.setNvag(nvag);
          csc.setTaraVag(row.tara_vag);
          csc.setKolOs(row.kol_osi);
          csc.setDattr(d);
          csc.setSort(carSort++);

          carMap.put(nvag, csc);
          cs.addCimSmgsCarListItem(csc);
        }

        String nkon = row.nkon;
        CimSmgsKonList csk = null;
        if (isNotBlank(nkon)) {
          csk = new CimSmgsKonList();
          csk.setUtiN(defaultString(row.prin) + nkon);
          csk.setUtiType(row.tip_razm);
          csk.setTaraKont(row.tara != null ? row.tara.shortValue() : null);
          csk.setMassSend(row.mnet != null ? row.mnet : row.mbrt);
          if (row.tara != null && csk.getMassSend() != null) {
            csk.setMassCalc(csk.getMassSend().add(row.tara));
          }
          csk.setDattr(d);
          csk.setSort(kontSort++);

          csc.addCimSmgsKonListItem(csk);
        }

        String plombStr = row.znak;
        if (isNotBlank(plombStr)) {
          String[] znakArr = plombStr.split(",");
          for (String znak : znakArr) {
            CimSmgsPlomb csp = new CimSmgsPlomb();
            csp.setZnak(znak);
            csp.setKpl((short) 1);
            csp.setSort(plombSort++);
            if (csk != null) {
              csk.addCimSmgsPlombItem(csp);
            }
            csc.addCimSmgsPlombItem(csp);
            cs.addCimSmgsPlombItem(csp);
          }
        }

        CimSmgsGruz csg = new CimSmgsGruz();
        csg.setKgvn(row.kgvn);
        csg.setNzgr(row.nzgr);
        csg.setPlaces(row.kolm);
        csg.setDattr(d);
        csg.setSort(gruzSort++);
        if (csk != null) {
          csk.addCimSmgsGruzItem(csg);
          csg.setMassa(csk.getMassSend());
        }
        csc.addCimSmgsGruzItem(csg);

        if (isBlank(cs.getG23())) {
          cs.setG23(csg.getKgvn());
        }
      }

      cs.setG25(kontSort > 0 ? VidOtpr.KONT.getG25() : VidOtpr.VAG.getG25());
      cs.setG2012(cs.buildG2012CsPrint());

      try {
        session = HibernateUtil.getSession();
        tx = session.beginTransaction();

        session.save(pd);
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
    }
    return true;
  }

  private <T> T processNode(List<Node> fields, T ob) {
//    String className = ob.getClass().getName();
//    Map<String, String> map = prepareMaping(className);

    for (Node el : fields) {
      String elName = el.getName();
      @SuppressWarnings("UnnecessaryLocalVariable")
      String cn = elName /*map.get(el.getName())*/;
      String data = el.getText();
      try  {
        Class<?> propertyType = PropertyUtils.getPropertyType(ob, cn);
        if(propertyType == null) {
          String errMsg = "Property " + cn + "(" +elName + ") not found in table " + ob.getClass().getName();
          throw new IllegalArgumentException(errMsg);
        }

        if (data == null || data.equals("")) {
          PropertyUtils.setProperty(ob, cn, null);
        }
        else if (propertyType.isAssignableFrom(Long.class)) {// если тип колонки Long
          Long lv;
          try {
            lv = Long.valueOf(data);
          }
          catch (Exception ex) {
            lv = new BigDecimal(data).longValue();
          }
          PropertyUtils.setProperty(ob, cn, lv);
        }
        else if (propertyType.isAssignableFrom(Integer.class)) // если тип колонки Integer
          PropertyUtils.setProperty(ob, cn, Integer.valueOf(data));
        else if (propertyType.isAssignableFrom(Short.class)) // если тип колонки Short
          PropertyUtils.setProperty(ob, cn, Short.valueOf(data));
        else if (propertyType.isAssignableFrom(Byte.class)) // если тип колонки Blob
          PropertyUtils.setProperty(ob, cn, Byte.valueOf(data));
        else if (propertyType.isAssignableFrom(BigDecimal.class)) // если тип колонки BigDecimal
          PropertyUtils.setProperty(ob, cn, new BigDecimal(data));
        else if(propertyType.isAssignableFrom(Date.class)) {// если тип колонки Date
          Date d = null;
          try {
            d = dateTimeFormater.parse(data);
          }
          catch(ParseException ex) {
            try {
              d = dateTimeFormater1.parse(data);
            }
            catch(ParseException ex1) {
              try {
                d = dateFormater.parse(data);
              }
              catch(ParseException ex2) {
                try {
                  d = dateFormater1.parse(data);
                }
                catch (ParseException ex3) {
                  log.warn("Not parserable data (" + data + ")");
                }
              }
            }
          }
          // преобразование передаваемого значения в тип Date и его установка в обьект таблицы
          PropertyUtils.setProperty(ob, cn, d);
        }
        else if (propertyType.isAssignableFrom(Character.class)) // если тип колонки BigDecimal
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

  @SuppressWarnings({"SpellCheckingInspection", "unused"})
  public class XMLRow {
    String por_vag;
    String nvag;
    BigDecimal tara_vag;
    Byte kol_osi;
    String nsto_f;
    String nsto;
    String dotp;
    String ksto;
    String smgs;
    Date date_pr;
    String prin;
    String nkon;
    BigDecimal mbrt;
    BigDecimal mnet;
    String tip_razm;
    String kstn;
    String kgvn;
    String nzgr;
    Integer kolm;
    String znak;
    String kpl;
    BigDecimal tara;
    String notd;
    String npol;
    String adres_o;
    String adres_p;

    public String getPor_vag() {
      return por_vag;
    }

    public void setPor_vag(String por_vag) {
      this.por_vag = por_vag;
    }

    public String getNvag() {
      return nvag;
    }

    public void setNvag(String nvag) {
      this.nvag = nvag;
    }

    public BigDecimal getTara_vag() {
      return tara_vag;
    }

    public void setTara_vag(BigDecimal tara_vag) {
      this.tara_vag = tara_vag;
    }

    public Byte getKol_osi() {
      return kol_osi;
    }

    public void setKol_osi(Byte kol_osi) {
      this.kol_osi = kol_osi;
    }

    public String getNsto_f() {
      return nsto_f;
    }

    public void setNsto_f(String nsto_f) {
      this.nsto_f = nsto_f;
    }

    public String getNsto() {
      return nsto;
    }

    public void setNsto(String nsto) {
      this.nsto = nsto;
    }

    public String getDotp() {
      return dotp;
    }

    public void setDotp(String dotp) {
      this.dotp = dotp;
    }

    public String getKsto() {
      return ksto;
    }

    public void setKsto(String ksto) {
      this.ksto = ksto;
    }

    public String getSmgs() {
      return smgs;
    }

    public void setSmgs(String smgs) {
      this.smgs = smgs;
    }

    public Date getDate_pr() {
      return date_pr;
    }

    public void setDate_pr(Date date_pr) {
      this.date_pr = date_pr;
    }

    public String getPrin() {
      return prin;
    }

    public void setPrin(String prin) {
      this.prin = prin;
    }

    public String getNkon() {
      return nkon;
    }

    public void setNkon(String nkon) {
      this.nkon = nkon;
    }

    public BigDecimal getMbrt() {
      return mbrt;
    }

    public void setMbrt(BigDecimal mbrt) {
      this.mbrt = mbrt;
    }

    public BigDecimal getMnet() {
      return mnet;
    }

    public void setMnet(BigDecimal mnet) {
      this.mnet = mnet;
    }

    public String getTip_razm() {
      return tip_razm;
    }

    public void setTip_razm(String tip_razm) {
      this.tip_razm = tip_razm;
    }

    public String getKstn() {
      return kstn;
    }

    public void setKstn(String kstn) {
      this.kstn = kstn;
    }

    public String getKgvn() {
      return kgvn;
    }

    public void setKgvn(String kgvn) {
      this.kgvn = kgvn;
    }

    public String getNzgr() {
      return nzgr;
    }

    public void setNzgr(String nzgr) {
      this.nzgr = nzgr;
    }

    public Integer getKolm() {
      return kolm;
    }

    public void setKolm(Integer kolm) {
      this.kolm = kolm;
    }

    public String getZnak() {
      return znak;
    }

    public void setZnak(String znak) {
      this.znak = znak;
    }

    public String getKpl() {
      return kpl;
    }

    public void setKpl(String kpl) {
      this.kpl = kpl;
    }

    public BigDecimal getTara() {
      return tara;
    }

    public void setTara(BigDecimal tara) {
      this.tara = tara;
    }

    public String getNotd() {
      return notd;
    }

    public void setNotd(String notd) {
      this.notd = notd;
    }

    public String getNpol() {
      return npol;
    }

    public void setNpol(String npol) {
      this.npol = npol;
    }

    public String getAdres_o() {
      return adres_o;
    }

    public void setAdres_o(String adres_o) {
      this.adres_o = adres_o;
    }

    public String getAdres_p() {
      return adres_p;
    }

    public void setAdres_p(String adres_p) {
      this.adres_p = adres_p;
    }
  }
}
