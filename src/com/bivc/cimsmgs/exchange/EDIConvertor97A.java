package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.StringReader;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EDIConvertor97A extends EDIConvertor {

  final static private Logger log = LoggerFactory.getLogger(EDIConvertor97A.class);
  protected static final int SEL_LENGTH = 50;

  protected static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy");
  private static final SimpleDateFormat comntDateTimeFormater = Convertor.dtf;
  protected static final String encoding = "Cp1251";
  private static final HashMap<Byte, String> otmksobMap = new HashMap<Byte, String>();

  private final String folder = "EDI_Failed";

  static {
    otmksobMap.put((byte)1, "A");
    otmksobMap.put((byte)2, "1");
    otmksobMap.put((byte)3, "P");
  }

  public EDIConvertor97A(String script, EdiDir ediDir)  throws Exception {
    super(script, ediDir);
  }

//  public EDIConvertor(String script) {
//    readCfg(script);
//  }

  @Override
  public void sendIftmin(Long csId) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csId);
      if (cs != null) {
        List list = null;
        if (cs.getKind() != null && cs.getKind() == 1 && StringUtils.isNotBlank(cs.getNpoezd())) {
          list = session.createQuery("from CimSmgsCarList AS car WHERE car.cimSmgs.npoezd=:a AND car.cimSmgs.docType1=:b AND car.cimSmgs.kind=0")
                  .setParameter("a", cs.getNpoezd())
                  .setParameter("b", cs.getDocType1())
                  .list();
        }

        messageId = prepareMessageId(session);

        Date curDate = new Date();
        String text = getText(cs, messageId, curDate, list);

        String fileName = "IFTMIN_" + messageId + ".txt";
        sTr.put(fileName, text);

        saveLog(session, messageId, "IFTMIN", text, csId);

        String query = "UPDATE CimSmgs cs SET cs.iftminOut" + ediDir.getSuffix() + "=:a, cs.iftminId" + ediDir.getSuffix() + "=:b, cs." + ediDir.getStatusCol() + "=:s WHERE cs.hid=:id";
        Query q = session.createQuery(query);
        q.setTimestamp("a", curDate);
        q.setLong("b", messageId);
        q.setByte("s", ediDir.getGoodStatus());
        q.setLong("id", csId);
        q.executeUpdate();

        sTr.flush();

        tx.commit();
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
//      session.clear();
      throw e;
    }
//    finally {
//      if (session != null) {
//        session.close();
//      }
//    }
  }

/*
  @Deprecated
  public void sendInvoic(Long docId) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      CimSmgsInvoice inv = (CimSmgsInvoice)session.get(CimSmgsInvoice.class, docId);
      if (inv != null) {
        messageId = prepareMessageId(session);

        Date curDate = new Date();
        String text = getText(inv, messageId, curDate, null);

        String fileName = "INVOIC_" + messageId + ".txt";
        sTr.put(fileName, text);

        saveLog(session, messageId, "INVOIC", text, docId);

        String query = "UPDATE CimSmgsInvoice cs SET cs.invoicOut" + ediDir.getSuffix() + "=:a, cs.invoicId" + ediDir.getSuffix() + "=:b WHERE cs.hid=:id";
        Query q = session.createQuery(query);
        q.setTimestamp("a", curDate);
        q.setLong("b", messageId);
        q.setLong("id", docId);
        q.executeUpdate();

        sTr.flush();

        tx.commit();
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
//      session.clear();
      throw e;
    }
//    finally {
//      if (session != null) {
//        session.close();
//      }
//    }
  }
*/

/*
  @Deprecated
  public void sendIftmin(CimSmgs cs) throws Exception {
    log.debug("sendIftmin");
    Session session = null;
    Transaction tx = null;
    long messageId;

    if (cs != null) {
      try {
        session = HibernateUtil.getSession();
        tx = session.beginTransaction();

        cs = (CimSmgs) session.get(CimSmgs.class, cs.getHid());
        messageId = prepareMessageId(session);

        Date curDate = new Date();
        String text = getText(cs, messageId, curDate, null);

        String fileName = "IFTMIN_" + messageId + ".txt";
        sTr.put(fileName, text);

        saveLog(session, messageId, "IFTMIN", text, cs.getHid());

        String query = "UPDATE CimSmgs cs SET cs.iftminOut=:a, cs.iftminId=:b, cs.status='24' WHERE cs.hid=:id";
        Query q = session.createQuery(query);
        q.setTimestamp("a", curDate);
        q.setLong("b", messageId);
        q.setLong("id", cs.getHid());
        q.executeUpdate();

        sTr.flush();

        tx.commit();
      }
      catch (Exception e) {
        log.error(e.getMessage(), e);
        tx.rollback();
//        session.clear();
        throw e;
      }
//      finally {
//        if (session != null) {
//          session.close();
//        }
//      }
    }
  }
*/

  @Override
  public void sendInvoice(Long cs_hid) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();
      CimSmgs cs = (CimSmgs) session.get(CimSmgs.class, cs_hid);
      if (cs != null) {
        List<CimSmgsInvoice> list = null;
        if (cs.getKind() != null && cs.getKind() == 1 && StringUtils.isNotBlank(cs.getNpoezd())) {
          list = session.createQuery("from CimSmgsInvoice AS inv WHERE inv.packDoc in (SELECT cs.packDoc FROM CimSmgs AS cs WHERE cs.npoezd=:a AND cs.docType1=:b AND cs.kind=0)")
                  .setParameter("a", cs.getNpoezd())
                  .setParameter("b", cs.getDocType1())
                  .list();
        }


        for (CimSmgsInvoice inv : ( list != null && list.size() > 0 ? list : cs.getPackDoc().getCsInvoices())) {
          messageId = prepareMessageId(session);

          Date curDate = new Date();
          String text = getText(inv, messageId, curDate, cs);

          String fileName = "INVOIC_" + messageId + ".txt";
          sTr.put(fileName, text);

          saveLog(session, messageId, "INVOIC", text, inv.getHid());

          if (list == null) {
            String query = "UPDATE CimSmgsInvoice i SET i.invoicOut" + ediDir.getSuffix() + "=:a, i.invoicId" + ediDir.getSuffix() + "=:b WHERE i.hid=:id";
            Query q = session.createQuery(query);
            q.setTimestamp("a", curDate);
            q.setLong("b", messageId);
            q.setLong("id", inv.getHid());
            q.executeUpdate();
          }
        }

        sTr.flush();

        tx.commit();
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
//      session.clear();
      throw e;
    }
  }

/*
  @Deprecated
  public void sendInvoic(CimSmgsInvoice inv) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    if (inv != null) {
      try {
        session = HibernateUtil.getSession();
        tx = session.beginTransaction();

        messageId = prepareMessageId(session);

        Date curDate = new Date();
        String text = getText(inv, messageId, curDate, null);

        String fileName = "INVOIC_" + messageId + ".txt";
        sTr.put(fileName, text);

        saveLog(session, messageId, "INVOIC", text, inv.getHid());

        String query = "UPDATE CimSmgsInvoice i SET i.invoicOut=:a, i.invoicId=:b WHERE i.hid=:id";
        Query q = session.createQuery(query);
        q.setTimestamp("a", curDate);
        q.setLong("b", messageId);
        q.setLong("id", inv.getHid());
        q.executeUpdate();

        sTr.flush();

        tx.commit();
      }
      catch (Exception e) {
        log.error(e.getMessage(), e);
        tx.rollback();
//        session.clear();
        throw e;
      }
//      finally {
//        if (session != null) {
//          session.close();
//        }
//      }
    }
  }
*/

  @Override
  public void receive() throws Exception {
    Session session = null;
    Transaction tx = null;

    try {
      while (rTr.hasNext()) {
        Object[] res = null;
        String message = null;
        try {
          message = rTr.get();
          res = (Object[])ProcessMessage(message);

          session = HibernateUtil.getSession();
          tx = session.beginTransaction();

          if (res[0] instanceof Contrl) {
            Contrl x = (Contrl) res[0];
            Long hidIftminLog = null;
            String idUnbOri = x.getIdUnbOri();
            @SuppressWarnings("unchecked")
            Iterator<Long> it = session.createQuery("SELECT a.hid FROM BIftminLog AS a WHERE a.id=:id AND a.cod_dir=:cd AND a.dir='O'")
                    .setString("id", idUnbOri)
                    .setString("cd", ediDir.name())
                    .iterate();
            if (it.hasNext()) {
              hidIftminLog = it.next();
              log.debug("Found IFTMIN (ID=" + idUnbOri + " HID= " + hidIftminLog + ")");
              x.setHid_iftmin_log(hidIftminLog);
            }
            else {
              log.warn("Not found IFTMIN with ID=" + idUnbOri);
            }
          }

          else if (res[0] instanceof Aperak) {
            Aperak x = (Aperak) res[0];
            Long hidIftminLog = null;
            String idUnhOri;
            Iterator<AperakDet> i = x.getAperakDet().iterator();
            if (i.hasNext()) {
              idUnhOri = i.next().getIdUnhOri();
              @SuppressWarnings("unchecked")
              Iterator<Long> it = session.createQuery("SELECT a.hid FROM BIftminLog AS a WHERE a.id=:id AND a.cod_dir=:cd AND a.dir='O'")
                      .setString("id", idUnhOri)
                      .setString("cd", ediDir.name())
                      .iterate();
              if (it.hasNext()) {
                hidIftminLog = it.next();
                log.debug("Found IFTMIN (ID=" + idUnhOri + " HID= " + hidIftminLog + ")");
                x.setHid_iftmin_log(hidIftminLog);
              }
              else {
                log.warn("Not found IFTMIN with ID=" + idUnhOri);
              }
            }
            else {
              log.warn("Not found AperakDet");
            }
          }

          session.save(res[0]);
//          session.flush();
          tx.commit();
//          session.evict(res[0]);
        }
        catch (ParseException pex) {
          log.error(pex.getMessage());
          saveFailed(message, folder, encoding);
        }
        catch (HibernateException ex) {
          log.error(ex.getMessage());
          saveFailed(message, folder, encoding);
          tx.rollback();
//          session.clear();
        }
        catch (Exception ioex) {
          log.error(ioex.getMessage(), ioex);
        }
        finally {
          if (res != null) log.debug(new ToStringBuilder(res).append(res).toString());
        }
      }
    }
    catch (Exception e) {
      log.error(e.getMessage(), e);
      tx.rollback();
//      session.clear();
    }
//    finally {
//      if (session != null) {
//        session.close();
//      }
//    }
  }

  protected String getText(CimSmgs smgsOb, long messageId, Date curDate, List<CimSmgsCarList> carList) throws Exception {
    String text;
    text =  "UNB+UNOA:1+WGR::HOST+" + format(recipient, 35) + "::HOST+" +
            format(new SimpleDateFormat("yyMMdd").format(curDate), 6) + ":" + format(new SimpleDateFormat("HHmm").format(curDate), 4) + "+" +
            format(String.valueOf(messageId), 14) + "++IFTMIN_TK++++1" + nl;
    text += "UNH+" + format(String.valueOf(messageId), 14) + "+IFTMIN:D:97A:UN:OSJD" + nl;
    Object oldId = smgsOb.getIftminId();
    Byte typeOb = smgsOb.getType();
    String g693 = StringUtils.trimToNull(smgsOb.getG693());
    text += "BGM+" + ((typeOb != null && typeOb.intValue() == 1) ? "701" : "720" ) + "+" +
            (g693 != null ? format(g693, 4) + "-" : "") + format(smgsOb.getG694(), 30) + "+" + (oldId == null ? "9" : "4") + nl;
    Date d = smgsOb.buildG16Date();
    text += "DTM+143:" + format((d != null ? df203.format(d) : "00000000"), 35) + ":203" + nl;
    d = smgsOb.getG281();
    text += "DTM+137:" + format((d != null ? df203.format(d) : "00000000"), 35) + ":203" + nl;
    text += "TSR++" + format("4", 3) + ":::4+3" + nl; /** @todo уточнит кем осуществляется погрузка */

    Map<Byte, CimSmgsDocs> csd7 = smgsOb.getCimSmgsDocses7();
    for (CimSmgsDocs csdOb : csd7.values()) {
      String s = csdOb.getText();
      if (StringUtils.isNotBlank(s) || StringUtils.isNotBlank(csdOb.getNdoc()))
        text += "FTX+DCL+" + format(csdOb.getCode(), 3) + "+" + format(csdOb.getNdoc(), 17) + "+" + format(s, 70, 5) + "+RUS" + nl;
    }
    text += "FTX+ICN+++" + format(StringUtils.isBlank(smgsOb.getG15r()) ? smgsOb.getG15() : smgsOb.getG15r(), 70, 5) + "+RUS" + nl;

    /** @todo Навести порядок со переходными станциями */
    String rqrStr = "";
    Map<Byte, CimSmgsDocs> csd13 = smgsOb.getCimSmgsDocses13();
    for (CimSmgsDocs csdOb : csd13.values()) {
      String code = csdOb.getCode();
//  Теперь передают по одной строке на код, а будут по одной станции на строку
//      int idx = -1;
//      if (code != null) {
//        String[] codeAr = code.split("[,;]");
//        Arrays.sort(codeAr);
//        idx = Arrays.binarySearch(codeAr, "6"); // сначала ищем с кодом "6"
//        if (idx < 0)
//          idx = Arrays.binarySearch(codeAr, "1"); // если нет, то с кодом "1"
//        if ( idx >= 0 ) {
//          rqrStr = csdOb.getText();
//          break;
//        }
//      }
      if ("6".equals(code)) {
        rqrStr = csdOb.getText();
        break;
      }
    }
    text += "FTX+RQR+++" + format(rqrStr, 70, 5) + "+RUS" + nl;

//    if (isDosylka) {
//      text += "FTX+CHG++113" + nl;
//    }
//

    /** @todo Заполнить коды документов в справочнике */
    Map<Byte, CimSmgsDocs> csd9 = smgsOb.getCimSmgsDocses9();
    for (CimSmgsDocs csdOb : csd9.values()) {
      d = csdOb.getDat();
      text += "DOC+" + format(csdOb.getCode(), 3) + ":::" + format(csdOb.getText(), 35) + "+" + format(csdOb.getNdoc(), 35) + ":2:" + format(d != null ? dateTimeFormater1.format(d) : "", 35)  + nl;
    }
    for (CimSmgsInvoice invOb : smgsOb.getPackDoc().getCsInvoices()) {
      text += "DOC+380:::Инвойс+" +format(invOb.getInvoice(), 35) + ":4" + nl;
    }

//    text += "LOC+149+" + format(smgsOb.getG65(), 25) + ":162:5" + nl;

    text += "TOD+6++SD" + nl;
    if (oldId != null) {
      text += "RFF+ACW:" + format(String.valueOf(oldId), 35) + nl;
    }
    if (StringUtils.isNotBlank(smgsOb.getN_packet())) {
      text += "RFF+AHE:" + format(String.valueOf(smgsOb.getN_packet()), 35) + nl;
    }
//    if (isDosylka) {
//      text += "RFF+AAP:" + format(String.valueOf(oriId), 35) + nl;
//    }
    /** @todo пока всегда экспорт, но по хорошему надо как-то определяться */
    text += "GOR+1+5" + nl;
    text += "TDT+21++2" + nl;
    String diro = smgsOb.getG171();
    String knto = smgsOb.getG17();
    if (StringUtils.isBlank(diro) && StringUtils.isBlank(knto)) {
      diro = smgsOb.getG691();
      knto = smgsOb.getG692();
    }
    text += "LOC+5+" + StringUtils.leftPad(format(diro, 2), 2, '0') + StringUtils.leftPad(format(knto, 23), 6, '0') +
            ":37:288:" + format(smgsOb.getG162r(), 70) + nl;
    text += "LOC+8+" + StringUtils.leftPad(format(smgsOb.getG12(), 2), 2, '0') + StringUtils.leftPad(format(smgsOb.getG121(), 23), 6, '0') +
            ":37:288:" + format(smgsOb.getG101r(), 70) + nl;
    String g29 = smgsOb.getG29r();
    if (StringUtils.isNotBlank(g29)) {
      String[] g29Array = split(g29, " ");
      text += "LOC+13+" + format(ge(g29Array, 0), 2) + format(ge(g29Array, 1), 23) + ":37:288:" + format(ge(g29Array, 2), 70) + nl;
    }
    text += "LOC+91+:::" + format(smgsOb.getG28(), 70) + nl;
    /** @todo Навести порядок со переходными станциями */
//    it = epdOb.getNzps().iterator();
//    if (it.hasNext()) {
//      EpdBorderStation ebs = (EpdBorderStation)it.next();
//      station = ebs.getStation_name();
//      text += "LOC+17+" + format(station.getDor().getLandid() + station.getImp_newcode(), 25) + ":37:288:" + format(station.getImp_newname(), 70) + nl;
//    }
//    while (it.hasNext()) {
//      EpdBorderStation ebs = (EpdBorderStation)it.next();
//      station = ebs.getStation_name();
//      text += "LOC+42+" + format(station.getDor().getLandid() + station.getImp_newcode(), 25) + ":37:288:" + format(station.getImp_newname(), 70) + nl;
//    }
//
    String notd_kod = smgsOb.getG2();
    String notd_naim = smgsOb.getG1r();
    String notda_ul = smgsOb.getG19r();
    String notda_g = smgsOb.getG18r_1();
    String notda_r = "";
    String notda_i = smgsOb.getG17_1();
    String notd_eml = smgsOb.getG11_1();
    String notd_tel = smgsOb.getG12_1();
    String notd_fax = smgsOb.getG13_1();
    String notd_strn = smgsOb.getG15_1();

    text += "NAD+CZ+" + format(notd_kod, 35) + ":100++" + format(notd_naim, 35, 5) + "+" + format(notda_ul, 35, 4) + "+" + format(notda_g, 35) + "+" +
             format(notda_r, 9) + "+" + format(notda_i, 9) + "+" + format(notd_strn, 3) + nl;

    if (StringUtils.isNotBlank(notd_eml) || StringUtils.isNotBlank(notd_tel) || StringUtils.isNotBlank(notd_fax)) {
      text += "CTA+IC" + nl;
      if(StringUtils.isNotBlank(notd_eml)) {
        text += "COM+" + format(notd_eml, 512) + ":EM" + nl;
      }
      if(StringUtils.isNotBlank(notd_tel)) {
        notd_tel = notd_tel.replaceAll("( |-)", "");
        text += "COM+" + format(notd_tel, 512) + ":TE" + nl;
      }
      if(StringUtils.isNotBlank(notd_fax)) {
        notd_fax = notd_fax.replaceAll("( |-)", "");
        text += "COM+" + format(notd_fax, 512) + ":FX" + nl;
      }
    }

    String npol_kod = smgsOb.getG5();
    String npol_naim = smgsOb.getG4r();
    String npola_ul = smgsOb.getG49r();
    String npola_g = smgsOb.getG48r();
    String npola_r = "";
    String npola_i = smgsOb.getG47_1();
    String npol_eml = smgsOb.getG41_1();
    String npol_tel = smgsOb.getG42_1();
    String npol_fax = smgsOb.getG43_1();
    String npol_strn = smgsOb.getG45_1();

    text += "NAD+CN+" + format(npol_kod, 35) + ":100++" + format(npol_naim, 35, 5) + "+" + format(npola_ul, 35, 4) + "+" + format(npola_g, 35) + "+" +
             format(npola_r, 9) + "+" + format(npola_i, 9) + "+" + format(npol_strn, 3) + nl;

    if (StringUtils.isNotBlank(npol_eml) || StringUtils.isNotBlank(npol_tel) || StringUtils.isNotBlank(npol_fax)) {
      text += "CTA+IC" + nl;
      if(StringUtils.isNotBlank(npol_eml)) {
        text += "COM+" + format(npol_eml, 512) + ":EM" + nl;
      }
      if(StringUtils.isNotBlank(npol_tel)) {
        npol_tel = npol_tel.replaceAll("( |-)", "");
        text += "COM+" + format(npol_tel, 512) + ":TE" + nl;
      }
      if(StringUtils.isNotBlank(npol_fax)) {
        npol_fax = npol_fax.replaceAll("( |-)", "");
        text += "COM+" + format(npol_fax, 512) + ":FX" + nl;
      }
    }

    for (CimSmgsPlatel csp : smgsOb.getCimSmgsPlatels().values()) {
      text += "NAD+GS+" + format(csp.getKplat() +
                              (StringUtils.isNotBlank(csp.getKplat1()) ? "^" + csp.getKplat1() : "") +
                              (StringUtils.isNotBlank(csp.getKplat2()) ? "^" + csp.getKplat2() : "") +
                              (StringUtils.isNotBlank(csp.getKplat3()) ? "^" + csp.getKplat3() : ""),
                          35) + ":100++" +
                          format(csp.getPlatR(), 35, 5) + "+" + format(csp.getPrimR(), 35, 4) + "++++" + format(csp.getStrana(), 3) + nl;
    }
    text += "NAD+DCP+" + format(smgsOb.getG3(), 35) + ":100" + nl;

    int gidCount = 1;
    boolean isKont = false;
    boolean isManyGruz = false;
    boolean isGroup = carList != null && carList.size() > 0;
    Map<Byte, CimSmgsCarList> csc = smgsOb.getCimSmgsCarLists();
    for (CimSmgsCarList cscOb : csc.values()) {
      Map<Byte, CimSmgsKonList> csk = cscOb.getCimSmgsKonLists();
      for (CimSmgsKonList cskOb : csk.values()) {
        isKont = true;
        Map<Integer, CimSmgsGruz> csg = cskOb.getCimSmgsGruzs();
        isManyGruz = csg.size() > 1;
        for (CimSmgsGruz csgOb : csg.values()) {
          /** @todo Нужен код упаковки */
          text += "GID+" + format(gidCount++, 5) + "+" + format(csgOb.getPlaces(), 8) + ":" + format("", 17) + ":::" + format(csgOb.getUpak(), 35) + nl;
          /** @todo Нужены страна отправления и назначения */
//        text += "LOC+35+" + format(epdOb.getNsto().getDor().getCountry_code(), 25) + ":162:5" + nl;
//        text += "LOC+28+" + format(epdOb.getNstn().getDor().getCountry_code(), 25) + ":162:5" + nl;
          text += "PIA+5+" + format(csgOb.getKgvn(), 35) + ":HS::12" + nl;
          text += "PIA+5+" + format(csgOb.getEkgvn(), 35) + ":ET::288" + nl;
          text += "FTX+AAA+++" + format(csgOb.getNzgr(), 70, 5) + "+RUS" + nl;
//        text += "FTX+IRP+++" + format("XX", 70, 5) + nl;

          if (isGroup) {
            BigDecimal mnet = smgsOb.getG24N() == null ? BigDecimal.ZERO : smgsOb.getG24N();
            text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
            BigDecimal mbrt = smgsOb.getG24B() == null ? BigDecimal.ZERO : smgsOb.getG24B();
            text += "MEA+ASW+G+KGM:" + format(mbrt.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
          }
          else if (!isManyGruz) {
            BigDecimal mnet = csgOb.getMassa();
            if (mnet == null || BigDecimal.ZERO.compareTo(mnet) == 0) {
              mnet = cskOb.getMassSend();
            }
            if (mnet == null || BigDecimal.ZERO.compareTo(mnet) == 0) {
              mnet = smgsOb.getG24N();
            }
            if (mnet == null) {
              mnet = BigDecimal.ZERO;
            }
            text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;

            BigDecimal mbrt = cskOb.getMassCalc();
            if (mbrt == null || BigDecimal.ZERO.compareTo(mbrt) == 0) {
              mbrt = smgsOb.getG24B();
            }
            if (mbrt == null) {
              mbrt = BigDecimal.ZERO;
            }
            text += "MEA+ASW+G+KGM:" + format(mbrt.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
          }
          else if (isManyGruz) {
            BigDecimal mnet = csgOb.getMassa();
            if (mnet == null) {
              mnet = BigDecimal.ZERO;
            }
            text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
          }
          if (new Byte((byte)1).equals(smgsOb.getG22())) {
             text += "DGS+RID" + nl;
             text += "FTX+AAD+++" + format(csgOb.getKgvn(), 70, 5) +"+RUS" + nl;
          }
        }
      }
      /** @todo А вот тут надо работать с вагонными отправками, но не будем */
    }

    for (CimSmgsCarList cscOb : (isGroup ? carList : csc.values())) {
      CimSmgsKonList cskOb = null;
      Map<Byte, CimSmgsKonList> csk = cscOb.getCimSmgsKonLists();
      Iterator<CimSmgsKonList> itk = csk.values().iterator();
      BigDecimal mnetSum = BigDecimal.ZERO;
      if (itk.hasNext()) {
        cskOb = itk.next();
        for (CimSmgsGruz csg : cskOb.getCimSmgsGruzs().values()) {
          BigDecimal mm = csg.getMassa();
          if (mm != null)
            mnetSum = mnetSum.add(mm);
        }
      }

      text += "EQD+RR+" + format(normNvagNkonStr(cscOb.getNvag()), 17) + "+" + format(/*rod_vag*/"", 10) + "+++" + format("5", 3) + nl;
      BigDecimal tara = isKont ? (cskOb.getTaraKont() == null ? cscOb.getCimSmgs().getG24T() : new BigDecimal(cskOb.getTaraKont())) : cscOb.getTaraVag();
      text += "MEA+WT+T+KGM:" + format(tara, 18) + nl;
      if (isKont) {
        BigDecimal brutto = cskOb.getMassCalc();
        if (brutto == null || brutto.compareTo(BigDecimal.ZERO) == 0) {
          if (!isGroup) {
            brutto = cscOb.getCimSmgs().getG24B();
          }
          else {
            if (tara != null) {
              brutto = mnetSum.add(tara);
            }
          }
        }
        if (brutto == null)
          brutto = BigDecimal.ZERO;
        text += "MEA+AAE+G+KGM:" + format(brutto.setScale(0, BigDecimal.ROUND_HALF_UP), 18) + nl;
      }
      text += "MEA+SV++TNE:" + format(cscOb.getGrPod(), 18) + nl;
      text += "MEA+AAE+ACW+PCE:" + format(cscOb.getKolOs(), 18) + nl;
//      text += "MEA+AAE+LN+DTM:" + format("", 18) + nl;
      if (isKont) {
        text += "DIM+10+FOT:" + format(cskOb.getSizeFoot(), 15) + nl;

        if (cscOb.getCimSmgs().getCimSmgsPlombs().size() > 0) {
          for (CimSmgsPlomb plomb : cscOb.getCimSmgs().getCimSmgsPlombs().values()) {
            if (StringUtils.isNotBlank(plomb.getZnak()))
              text += "SEL+" + format(plomb.getZnak(), SEL_LENGTH) + "+CA" + nl;
          }
        }
        else {
          String s = cskOb.getPlombs();
          if (s != null) {
            String[] plombs = s.split("[,;]");
            for (int i = 0; i < plombs.length; i++) {
              text += "SEL+" + format(plombs[i], SEL_LENGTH) + "+CA" + nl;
            }
          }
        }

        text += "NAD+CW+" + format(cskOb.getKodSob(), 2) + "/" + format(otmksobMap.get(cskOb.getOtmKSob()) , 1) + ":36:12" + nl;
        text += "EQA+CN+" + format(normNvagNkonStr(cskOb.getUtiN()), 17) + "/" + format(cskOb.getUtiType(), 4) + nl;
      }

      if (!isKont) {
        if (cscOb.getCimSmgs().getCimSmgsPlombs().size() > 0) {
          for (CimSmgsPlomb plomb : cscOb.getCimSmgs().getCimSmgsPlombs().values()) {
            if (StringUtils.isNotBlank(plomb.getZnak()))
              text += "SEL+" + format(plomb.getZnak(), SEL_LENGTH) + "+CA" + nl;
          }
        }
        else {
          String s = cscOb.getPlombs();
          if (s != null) {
            String[] plombs = s.split("[,;]");
            for (int i = 0; i < plombs.length; i++) {
              text += "SEL+" + format(plombs[i], SEL_LENGTH) + "+CA" + nl;
            }
          }
        }

        text += "NAD+CW+" + format(cscOb.getKodSob(), 2) + "/" + format(otmksobMap.get(cscOb.getOtmKSob()) , 1) + ":36:12" + nl;
      }
    }

    text += "UNT+" + format(String.valueOf(new StringTokenizer(text, nl).countTokens()), 6) + "+" + format(String.valueOf(messageId), 14) + nl;
    text += "UNZ+1+" + format(String.valueOf(messageId), 14) + nl;
    return text;
  }

  protected String getText(CimSmgsInvoice invOb, long messageId, Date curDate, CimSmgs cs) throws Exception {
    String text;

    text =  "UNB+UNOA:1+WGR::HOST+" + format(recipient, 35) + "::HOST+" +
            format(new SimpleDateFormat("yyMMdd").format(curDate), 6) + ":" + format(new SimpleDateFormat("HHmm").format(curDate), 4) + "+" +
            format(String.valueOf(messageId), 14) + "++INVOIC_TK++++1" + nl;
    text += "UNH+" + format(String.valueOf(messageId), 14) + "+INVOIC:D:97A:UN:OSJD" + nl;
    Object ob = invOb.getInvoicId();
    text += "BGM+380+" + format(invOb.getInvoice(), 35) + "+" + (ob == null ? "9" : "4") + nl;
    Date d = invOb.getDat_inv();
    text += "DTM+137:" + format((d != null ? df203.format(d) : "00000000"), 35) + ":203" + nl;
//    text += "RFF+CT:" + format(invOb.getN_dog(), 35) + nl;
    if (cs == null) {
      for (CimSmgs csOb : invOb.getPackDoc().getCimSmgses()) {
        Byte type = csOb.getType();
        if (type != null && (type == 1 || type == 2)) {
          cs = csOb;
          break;
        }
      }
    }
    text += "RFF+CT:" + format(BeanUtils.getProperty(cs, "iftminId" + ediDir.getSuffix()), 35) + nl;

    String buy_kod = invOb.getKod_b();
    String buy_naim = StringUtils.defaultString(invOb.getNbuy());
    String buy_addr = StringUtils.defaultString(invOb.getAdres_b());
    String buy_ul = "";
    String buy_g = "";
    String buy_r = "";
    String buy_i = "";
    String buy_strn = "";
    text += "NAD+BY+" + format(buy_kod, 35) + "+" + format(buy_addr, 35, 5) + "+" + format(buy_naim, 35, 5) + "+" +
            format(buy_ul, 35, 4) + "+" + format(buy_g, 35) + "+" + format(buy_r, 9) + "+" + format(buy_i, 9) + "+" +
            format(buy_strn, 3) + nl;

    String npol_kod = invOb.getKod_pol();
    String npol_naim = StringUtils.defaultString(invOb.getNpol());
    String npol_addr = "";
    String npol_ul = StringUtils.defaultString(invOb.getAdres_p());
    String npol_g = StringUtils.defaultString(invOb.getCity_p());
    String npol_r = "";
    String npol_i = StringUtils.defaultString(invOb.getZip_p());
    String npol_strn = StringUtils.defaultString(invOb.getCountry_p());
    text += "NAD+CN+" + format(npol_kod, 35) + "+" + format(npol_addr, 35, 5) + "+" + format(npol_naim, 35, 5) + "+" +
            format(npol_ul, 35, 4) + "+" + format(npol_g, 35) + "+" + format(npol_r, 9) + "+" + format(npol_i, 9) + "+" +
            format(npol_strn, 3) + nl;

    String notd_kod = "";
    String notd_naim = StringUtils.defaultString(invOb.getNotd());
    String notd_addr = "";
    String notd_ul = StringUtils.defaultString(invOb.getAdres_o());
    String notd_g = StringUtils.defaultString(invOb.getCity_o());
    String notd_r = "";
    String notd_i = StringUtils.defaultString(invOb.getZip_o());
    String notd_strn = StringUtils.defaultString(invOb.getCountry_o());
    text += "NAD+CZ+" + format(notd_kod, 35) + "+" + format(notd_addr, 35, 5) + "+" + format(notd_naim, 35, 5) + "+" +
            format(notd_ul, 35, 4) + "+" + format(notd_g, 35) + "+" + format(notd_r, 9) + "+" + format(notd_i, 9) + "+" +
            format(notd_strn, 3) + nl;

    String sel_kod = "";
    String sel_naim = StringUtils.defaultString(invOb.getNsel());
    String sel_addr = StringUtils.defaultString(invOb.getAdres_s());
    String sel_ul = "";
    String sel_g = "";
    String sel_r = "";
    String sel_i = "";
    String sel_strn = "";
    text += "NAD+SE+" + format(sel_kod, 35) + "+" + format(sel_addr, 35, 5) + "+" + format(sel_naim, 35, 5) + "+" +
            format(sel_ul, 35, 4) + "+" + format(sel_g, 35) + "+" + format(sel_r, 9) + "+" + format(sel_i, 9) + "+" +
            format(sel_strn, 3) + nl;

    text += "UNS+D" + nl;
    int i = 1;
    BigDecimal itogo = BigDecimal.ZERO;
    for (CimSmgsInvoiceGruz grOb : invOb.getInvoiceGruzs().values()) {
      text += "LIN+" + format(String.valueOf(i++), 6) + nl;
      text += "IMD+F++" + format(grOb.getTnved(), 17) + ":::" + format(grOb.getNzgr(), 35, 4) + nl;
      text += "MEA+ASW+G+KGM:" + format(grOb.getMbrt(), 18) + nl;
      text += "QTY+47:" + format(grOb.getKole(), 15) + ":" + format(grOb.getCus_edizm(), 3) + nl;
      BigDecimal val = BigDecimal.ZERO;
      try {
        val = new BigDecimal(grOb.getItogo());
      }
      catch (Exception e) {
        log.warn(e.getMessage());
      }
      itogo = itogo.add(val);
      text += "PRI+AAB:" + format(val, 15) + ":CT" + nl;
      text += "PAC+" + format(grOb.getKolm(), 8) + "++" + format(grOb.getKypk(), 17) + ":67::" + format(grOb.getNzyp(), 35) + nl;
    }

    text += "UNS+S" + nl;
    text += "MOA+79:" + format(String.valueOf(itogo), 18) + ":" + format(invOb.getCux(), 3) + nl;
    text += "UNT+" + format(String.valueOf(new StringTokenizer(text, nl).countTokens()), 6) + "+" + format(String.valueOf(messageId), 14) + nl;
    text += "UNZ+1+" + format(String.valueOf(messageId), 14) + nl;
    return text;
  }

  private Object ProcessMessage(String message) throws ParseException {
    String s;
    String[] seg;
    String[] el;
    Object res = null;

    String xml = message.trim();
    if (xml.startsWith("<?xml")) {
      res = ProcessComnt(message);
    }
    else {
      Matcher m = UNH.matcher(message);
      if(m.find()) {
        s = m.group();
        seg = split(s, pl, ms);
        el = split(ge(seg, 2), dd, ms);
        String msg = ge(el, 0);

        if("CONTRL".equals(msg))
          res = ProcessContrl(message);
        else if("APERAK".equals(msg))
          res = ProcessAperak(message);
        else
          throw new ParseException("Message type=\"" + msg + "\", required (\"CONTRL\" | \"APERAK\")", 0);
      }
      else {
        throw new ParseException("Unknown message type :\"" + message + "\"", 0);
      }
    }
    return res;
  }

  private Object ProcessContrl(String message) throws ParseException {
    String[] seg;
    String[] el;

    Contrl x = new Contrl();
    x.setText(message);

    StringTokenizer st = new StringTokenizer(message, nl);
    String s = st.nextToken();
    seg = split(s, pl, ms);

    if ("UNB".equals( ge(seg, 0) )) {
      el = split(ge(seg, 4), dd, ms);
      x.setDatUnb(dunb.parse(ge(el, 0) + ge(el, 1)));
      x.setIdUnb(ge(seg, 5));

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UNH".equals( ge(seg, 0) )) {
      x.setId(ge(seg, 1));
      el = split(ge(seg, 2), dd, ms);
      if (!"CONTRL".equals(ge(el, 0)))
        throw new ParseException("Message type=\"" + ge(el, 0) + "\", required \"CONTRL\"", 0);

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UCI".equals( ge(seg, 0) )) {
      el = split(ge(seg, 1), dd, ms);
      x.setOtpOri(ge(el, 0));

      el = split(ge(seg, 2), dd, ms);
      x.setPolOri(ge(el, 0));

      x.setIdUnbOri(ge(seg, 3));
      x.setError(ge(seg, 4));

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UNT".equals( ge(seg, 0) )) {

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UNZ".equals( ge(seg, 0) )) {

    }

    return new Object[] {x, null};
  }

  private Object ProcessAperak(String message) throws ParseException {
    String[] seg;
    String[] el;

    Aperak x = new Aperak();
    x.setText(message);

    StringTokenizer st = new StringTokenizer(message, nl);
    String s = st.nextToken();
    seg = split(s, pl, ms);

    if ("UNB".equals( ge(seg, 0) )) {
      el = split(ge(seg, 4), dd, ms);
      x.setDatUnb(dunb.parse(ge(el, 0) + ge(el, 1)));
      x.setIdUnb(ge(seg, 5));

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UNH".equals( ge(seg, 0) )) {
      x.setId(ge(seg, 1));
      el = split(ge(seg, 2), dd, ms);
      if (!"APERAK".equals(ge(el, 0)))
        throw new ParseException("Message type=\"" + ge(el, 0) + "\", required \"APERAK\"", 0);

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("BGM".equals( ge(seg, 0) )) {
      x.setKodDoc(ge(seg, 1));
      x.setIdBgm(ge(seg, 2));
      x.setStatus(ge(seg, 3));
      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("DTM".equals( ge(seg, 0) )) {
      el = split(ge(seg, 1), dd, ms);
      Date d = null;
      String df = ge(el, 2);
      try {
        if ("203".equals(df))
          d = df203.parse(ge(el, 1));
        else if ("204".equals(df))
          d = df204.parse(ge(el, 1));
      }
      catch (Exception ex) {
        log.warn(ex.getMessage());
      }
      x.setDatOf(d);
      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("FTX".equals( ge(seg, 0) )) {
      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("RFF".equals( ge(seg, 0) )) {
      el = split(ge(seg, 1), dd, ms);
      x.setSmgs(ge(el, 1));
      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("DTM".equals( ge(seg, 0) )) {
      el = split(ge(seg, 1), dd, ms);
      Date d = null;
      String df = ge(el, 2);
      try {
        if ("203".equals(df))
          d = df203.parse(ge(el, 1));
        else if ("204".equals(df))
          d = df204.parse(ge(el, 1));
      }
      catch (Exception ex) {
        log.warn(ex.getMessage());
      }
      x.setDprv(d);
      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    while ("ERC".equals( ge(seg, 0) )) {
      AperakDet ad = new AperakDet();

      el = split(ge(seg, 1), dd, ms);
      String[] kod = split(ge(el, 0), "/");
      ad.setKod1(ge(kod, 0));
      ad.setKod2(ge(kod, 1));
      s = st.nextToken();
      seg = split(s, pl, ms);

      if ("FTX".equals( ge(seg, 0) )) {
        ad.setErrText(ge(seg, 4).replaceAll(dd, ""));
        s = st.nextToken();
        seg = split(s, pl, ms);
      }

      if ("RFF".equals( ge(seg, 0) )) {
        el = split(ge(seg, 1), dd, ms);
        ad.setIdUnhOri(ge(el, 1));
        s = st.nextToken();
        seg = split(s, pl, ms);
      }

      if ("FTX".equals( ge(seg, 0) )) {
        ad.setErrText2(ge(seg, 4).replaceAll(dd, ""));
        s = st.nextToken();
        seg = split(s, pl, ms);
      }

      x.addAperakDet(ad);
    }

    if ("UNT".equals( ge(seg, 0) )) {

      s = st.nextToken();
      seg = split(s, pl, ms);
    }

    if ("UNZ".equals( ge(seg, 0) )) {

    }

    return new Object[] {x, null};
  }

  private Object ProcessComnt(String message) throws ParseException {
    CsComnt x = new CsComnt();
    x.setText(message);

    try {
      SAXReader reader = new SAXReader(false);
      Document document = reader.read(new StringReader(message));

      x.setId(document.valueOf("/doc/@id"));

      String s = document.valueOf("/doc/@date");
      Date d = comntDateTimeFormater.parse(s);
      x.setDatSend(d);

      x.setRefId(document.valueOf("/doc/ref/@id"));

      s = document.valueOf("/doc/ref/@date");
      d = comntDateTimeFormater.parse(s);
      x.setRefDate(d);

      x.setRefType(document.valueOf("/doc/ref/@type"));


      List<Element> list = document.selectNodes("/doc/data");
      for (Element el : list) {
        CsComntDet det = new CsComntDet();
        det.setSeg(el.valueOf("segment"));
        det.setText(el.valueOf("text"));
        x.addComntDet(det);
      }

    }
    catch(DocumentException ex) {
      log.error(ex.getMessage(), ex);
      throw new ParseException(ex.getMessage(), 0);
    }

    return new Object[] {x, null};
  }

  /* Moved to class CimSmgs
  private Date getG16Date(String g16) {
    Date res = null;

    if (StringUtils.isNotBlank(g16)) {
      String[] ss = g16.split("-");
      if (ss.length >= 2) {
        String s1 = ss[0];
        String s2 = ss[1];
        if (StringUtils.isNotBlank(s1) && StringUtils.isNotBlank(s2)) {
          try {
            Calendar cal = Calendar.getInstance();
            cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(s2));
            cal.set(Calendar.MONTH, Integer.parseInt(s1) - 1);
            cal.set(Calendar.HOUR_OF_DAY, 0);
            cal.set(Calendar.MINUTE, 0);
            Calendar cur = Calendar.getInstance();
            cur.add(Calendar.MONTH, 2);
            if (cal.after(cur)) {
              cal.add(Calendar.YEAR, -1);
            }
            res = cal.getTime();
          }
          catch (Exception ex) {
            Logger.getRootLogger().warn(ex.getMessage(), ex);
          }
        }
      }
    }

    return res;
  }
*/

}
