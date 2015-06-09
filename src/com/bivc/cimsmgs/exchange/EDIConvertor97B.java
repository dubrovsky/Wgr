package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.StringArrayMap;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.db.CimSmgsDocs;
import com.bivc.cimsmgs.db.CimSmgsGruz;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import com.bivc.cimsmgs.db.CimSmgsPlatel;
import com.bivc.cimsmgs.db.nsi.Management;
import org.apache.commons.collections.bidimap.DualHashBidiMap;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import static org.apache.commons.lang3.StringUtils.*;

public class EDIConvertor97B extends EDIConvertor {

  final static private Logger log = LoggerFactory.getLogger(EDIConvertor97B.class);

  private DualHashBidiMap cod2DorMap = new DualHashBidiMap();
  private String iftminText;

  public EDIConvertor97B(EdiDir ediDir) throws Exception {
    this.ediDir = ediDir;
  }

  public EDIConvertor97B(String script, EdiDir ediDir) throws Exception {
    super(script, ediDir);
  }

  @Override
  void sendIftmin(Long csId) throws Exception {
    Session session = null;
    Transaction tx = null;
    long messageId;

    try {
      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      @SuppressWarnings("unchecked")
      List<Management> cod2DorList = session.createQuery("FROM Management").list();
      for (Management manag : cod2DorList) {
        cod2DorMap.put(manag.getCountrys().getCountryId(), manag.getManagNo());
      }
      cod2DorMap.put("", "");             // заглушка, чтобы потом не мучаться

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csId);
      if (cs != null) {
        List<CimSmgsCarList> list = null;
        if (cs.getKind() != null && cs.getKind() == 1 && isNotBlank(cs.getNpoezd())) {
          //noinspection unchecked
          list = session.createQuery("from CimSmgsCarList AS car WHERE car.cimSmgs.npoezd=:a AND car.cimSmgs.docType1=:b AND car.cimSmgs.kind=0")
                  .setParameter("a", cs.getNpoezd())
                  .setParameter("b", cs.getDocType1())
                  .list();
        }

        messageId = prepareMessageId(session);

        String oldId = null;
        Query q = session.createQuery("SELECT l.id FROM BIftminLog l WHERE l.dir='O' AND l.cod_dir=:cd AND l.mes_name='IFTMIN' ORDER BY l.hid DESC");
        q.setString("cd", ediDir.getDirName());
        Iterator it = q.iterate();
        if (it.hasNext()) {
          oldId = (String)it.next();
        }

        Date curDate = new Date();
        /*String text*/ iftminText = getText(cs, messageId, oldId, curDate, list);

/*
        String fileName = "IFTMIN_" + messageId + ".txt";
        sTr.put(fileName, text);

        saveLog(session, messageId, "IFTMIN", text, csId);

        String query = "UPDATE CimSmgs cs SET cs.iftminOut" + ediDir.getSuffix() + "=:a, cs.iftminId" + ediDir.getSuffix() + "=:b, cs." + ediDir.getStatusCol() + "=:s WHERE cs.hid=:id";
        q = session.createQuery(query);
        q.setTimestamp("a", curDate);
        q.setLong("b", messageId);
        q.setByte("s", ediDir.getGoodStatus());
        q.setLong("id", csId);
        q.executeUpdate();

        sTr.flush();
*/

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

  @Override
  void sendInvoice(Long cs_hid) throws Exception {
    throw new Exception("Not implemented");
  }

  @Override
  void receive() throws Exception {
    throw new Exception("Not implemented");
  }

  protected String getText(CimSmgs smgsOb, long messageId, String oldId, Date curDate, List<CimSmgsCarList> carList) throws Exception {
    log.debug("Started");
    String sender = "1234";

    String text = "UNA:+.? " + nl;
    text +=  "UNB+UNOA:1+" + format(sender, 35) + "+" + format(recipient, 35) + "::HOST+" +
            format(new SimpleDateFormat("yyMMdd").format(curDate), 6) + ":" + format(new SimpleDateFormat("HHmm").format(curDate), 4) + "+" +
            format(String.valueOf(messageId), 14) + "++++++1" + nl;

    text += "UNH+" + format(String.valueOf(messageId), 14) + "+IFTMIN:D:97B:UN:DBC104" + nl;

    Byte typeOb = smgsOb.getType();
    String g693 = trimToNull(smgsOb.getG693());
    text += "BGM+" + (/*(typeOb != null && typeOb.intValue() == 1) ? "701" :*/ "720" ) + "+" +
            (g693 != null ? format(g693, 4) + "-" : "") + format(smgsOb.getG694(), 30) + "+" + (oldId == null ? "9" : "4") + nl;

//    Date d = smgsOb.buildG16Date();
//    text += "DTM+143:" + format((d != null ? df203.format(d) : "00000000"), 35) + ":203" + nl;
    Date d = smgsOb.getG281();
    text += "DTM+137:" + format((d != null ? df204.format(d) : "00000000"), 35) + ":204" + nl;

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
        rqrStr = csdOb.getText2();
        if (isBlank(rqrStr))
          rqrStr = csdOb.getText();
        break;
      }
    }
    text += "FTX+RQT+++" + format(rqrStr, 70, 1) + "+RUS" + nl;

    int cnt = 1;
    boolean isGroup = carList != null && carList.size() > 0;
    Map<Byte, CimSmgsCarList> csc = smgsOb.getCimSmgsCarLists();
    if (isGroup)
      cnt = carList.size();
    text += "CNT+16:" + format(cnt, 18) + nl;

    Map<Byte, CimSmgsDocs> csd9 = smgsOb.getCimSmgsDocses9();
    for (CimSmgsDocs csdOb : csd9.values()) {
      text += "DOC+" + format(csdOb.getCode(), 3) + "+" + format(csdOb.getNdoc(), 35) + ":2" + (csdOb.getNcopy() != null ? "++" + format(csdOb.getNcopy()) : "") + nl;
    }

    text += "RFF+UCN:" + format(smgsOb.getHid(), 35) + nl;
//    text += "RFF+AWG:LPK" + nl;
    text += "RFF+ABV:" + format(smgsOb.getG142(), 35) + nl;

    text += "TDT+20+" + format(smgsOb.getNpoezd(), 17) + "+20++" + format(smgsOb.getG691(), 17) + ":36:12" + nl;
//    text += "TSR+BA::41+BA3::41" + nl;

    String diro = smgsOb.getG171();
    String knto = smgsOb.getG17();
    if (isBlank(diro) && isBlank(knto)) {
      diro = smgsOb.getG691();
      knto = smgsOb.getG692();
    }
    text += "LOC+5+" + leftPad(format(diro, 2), 2, '0') + leftPad(format(knto, 23), 6, '0') + ":37:12:" + format(smgsOb.getG162(), 70) + nl;

//    d = smgsOb.getG281();
//    if (d != null)
//      text += "DTM+180:" + format(df204.format(d), 35) + ":204" + nl;

    text += "LOC+8+" + leftPad(format(smgsOb.getG12(), 2), 2, '0') + leftPad(format(smgsOb.getG121(), 23), 6, '0') + ":37:288:" + format(smgsOb.getG101(), 70) + nl;

//    text += "LOC+92+" + format(smgsOb.getG60(), 25) /*808735147021730 */ + ":RFP:12" + nl;  // надо как-то разбирать гр.60 (2-зн. код администрации + 2 зн. код путкта перехода + 1 доп.зн.) и не более пяти переходов

    String notd_kod = smgsOb.getG2();
    String notd_naim = smgsOb.getG1();
    String notda_ul = smgsOb.getG19_1();
    String notda_g = smgsOb.getG18_1();
    String notda_r = "";
    String notda_i = smgsOb.getG17_1();
    String notd_eml = smgsOb.getG11_1();
    String notd_tel = smgsOb.getG12_1();
    String notd_fax = smgsOb.getG13_1();
    String notd_strn = smgsOb.getG15_1();
    text += "NAD+CZ+" +
            format(cod2DorMap.get(notd_strn), 2) + format(notd_kod, 33) + "::12++" + format(notd_naim, 35, 3) + "+" + format(notda_ul, 35, 2) + "+" + format(notda_g, 35) + "+" +
            format(notda_r, 9) + "+" + format(notda_i, 9) + "+" + format(notd_strn, 3) + nl;

    if (isNotBlank(notd_eml) || isNotBlank(notd_tel) || isNotBlank(notd_fax)) {
      text += "CTA+IC+:" + format("", 35) + nl;
      if (isNotBlank(notd_eml)) {
        text += "COM+" + format(notd_eml, 512) + ":EM" + nl;
      }
      if (isNotBlank(notd_tel)) {
        notd_tel = notd_tel.replaceAll("( |-)", "");
        text += "COM+" + format(notd_tel, 512) + ":TE" + nl;
      }
      if (isNotBlank(notd_fax)) {
        notd_fax = notd_fax.replaceAll("( |-)", "");
        text += "COM+" + format(notd_fax, 512) + ":FX" + nl;
      }
    }

    text += "TSR+14+::12" + nl;

    Map<Byte, CimSmgsDocs> csd7 = smgsOb.getCimSmgsDocses7();
    for (CimSmgsDocs csdOb : csd7.values()) {
      if ("11".equals(csdOb.getCode())) {
        String s = csdOb.getText();
        if (isNotBlank(s))
          text += "FTX+DCL+++" + format(s, 70, 5) + nl;
      }
    }

    String npol_kod = smgsOb.getG5();
    String npol_naim = smgsOb.getG4();
    String npola_ul = smgsOb.getG49();
    String npola_g = smgsOb.getG48_1();
    String npola_r = "";
    String npola_i = smgsOb.getG47_1();
    String npol_eml = smgsOb.getG41_1();
    String npol_tel = smgsOb.getG42_1();
    String npol_fax = smgsOb.getG43_1();
    String npol_strn = smgsOb.getG45_1();

    text += "NAD+CN+" +
            format(cod2DorMap.get(npol_strn), 2) + format(npol_kod, 33) + "::12++" + format(npol_naim, 35, 5) + "+" + format(npola_ul, 35, 4) + "+" + format(npola_g, 35) + "+" +
            format(npola_r, 9) + "+" + format(npola_i, 9) + "+" + format(npol_strn, 3) + nl;

    if (isNotBlank(npol_eml) || isNotBlank(npol_tel) || isNotBlank(npol_fax)) {
      text += "CTA+IC" + nl;
      if (isNotBlank(npol_eml)) {
        text += "COM+" + format(npol_eml, 512) + ":EM" + nl;
      }
      if (isNotBlank(npol_tel)) {
        npol_tel = npol_tel.replaceAll("( |-)", "");
        text += "COM+" + format(npol_tel, 512) + ":TE" + nl;
      }
      if (isNotBlank(npol_fax)) {
        npol_fax = npol_fax.replaceAll("( |-)", "");
        text += "COM+" + format(npol_fax, 512) + ":FX" + nl;
      }
    }

    text += "TSR+14+::12" + nl;

    text += "FTX+ICN+++" + format(smgsOb.getG15(), 70, 5) + nl;

    for (CimSmgsPlatel csp : smgsOb.getCimSmgsPlatels().values()) {
      String strana = defaultString(csp.getStrana());
      text += "NAD+FP+" +
              format(cod2DorMap.get(strana), 2) + format(csp.getKplat()/*код*/, 33) + "::12++" +
              format(csp.getPlat(), 35, 3) + "+++++" + format(strana, 3) + nl;
    }

    StringArrayMap nvahNkonMap = new StringArrayMap();
    int gidCount = 1;
    for (CimSmgsCarList cscOb : (isGroup ? carList : csc.values())) {
      CimSmgsKonList cskOb = null;
      Map<Byte, CimSmgsKonList> csk = cscOb.getCimSmgsKonLists();
      Iterator<CimSmgsKonList> itk = csk.values().iterator();
      if (itk.hasNext()) {
        cskOb = itk.next();
        String nvag = normNvagNkonStr(cscOb.getNvag());
        String nkon = normNvagNkonStr(cskOb.getUtiN());
        nvahNkonMap.add(nvag, nkon);
        for (CimSmgsGruz csgOb : cskOb.getCimSmgsGruzs().values()) {
          text += "GID+" + format(gidCount++, 5) + nl;
          text += "PIA+5+" + format(csgOb.getKgvn(), 35) + ":HS::12" + nl;
          text += "FTX+PRD+++" + format(csgOb.getNzgrEu(), 70, 5) + nl;

          text += "SGP+" + format(nvag, 17) + "::12" + nl;
          text += "MEA+WT+AAL+KGM:" + format(BigDecimal.ZERO/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

          text += "SGP+" + format(nkon, 17) + ":172:5" + nl;
          text += "MEA+WT+AAL+KGM:" + format(csgOb.getMassa()/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

          if (smgsOb.getG22() != null && smgsOb.getG22() == 1) {
            text += "DGS+RGE" + nl;
            text += "FTX+AAD+++" + format(csgOb.getKgvn(), 70, 5) + nl;
          }
        }
      }
    }

    for (Map.Entry<String, ArrayList<String>> item : nvahNkonMap.getMap().entrySet()) {
      text += "EQD+RR+" + format(item.getKey(), 17) + "::12++++" + format("5", 3) + nl;
      for (String nkon : item.getValue()) {
         text += "EQA+CN+" + format(nkon, 17) + "::5'" + nl;
      }
    }

    int abn = 1;
    for (CimSmgsCarList cscOb : (isGroup ? carList : csc.values())) {
      CimSmgsKonList cskOb = null;
      Map<Byte, CimSmgsKonList> csk = cscOb.getCimSmgsKonLists();
      Iterator<CimSmgsKonList> itk = csk.values().iterator();
//      BigDecimal mnetSum = BigDecimal.ZERO;
      if (itk.hasNext()) {
        cskOb = itk.next();

        String nkon = normNvagNkonStr(cskOb.getUtiN());

        Long size = cskOb.getSizeMm() != null ? cskOb.getSizeMm().longValue() : 0;
        String code = "";
        if (size == 0)
          ;
        else if (size < 6150)
          code = "CI10";
        else if (size < 7820)
          code = "CI20";
        else if (size < 9150)
          code = "CI30";
        else if (size < 10900)
          code = "CI40";
        else if (size < 13750)
          code = "CI50";

        boolean isEmpty = cskOb.getMassSend() == null || cskOb.getMassSend().compareTo(BigDecimal.ONE) == 0;

        text += "EQD+CN+" + format(nkon, 17) + "::5+" + format(code, 10) + "::41+++" + format(isEmpty ? "4" : "5", 3) + nl;

        text += "MEA+WT+AAA+KGM:" + format(cskOb.getMassSend()/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

        text += "MEA+WT+T+KGM:" + format(cskOb.getTaraKont(), 18) + nl;

        text += "DIM+10+FOT:" + format(cskOb.getSizeFoot(), 3)/* + "::9.6(Высота)"*/ + nl;

        if (isNotBlank(cskOb.getPlombs())) {
          text += "SEL+" + format(cskOb.getPlombs(), 10) + nl;
        }

        Integer sort = cscOb.getCimSmgs().getSort();
        text += "FTX+ABN+++" + format(isGroup ? (sort == null ? abn++ : sort) : 1, 70) + nl;

      }
    }

    text += "UNT+" + format(String.valueOf(new StringTokenizer(text, nl).countTokens() -1 ), 6) + "+" + format(String.valueOf(messageId), 14) + nl;

    text += "UNZ+1+" + format(String.valueOf(messageId), 14) + nl;

    log.debug("Completed");
    return text;
  }

  public String getIftminText() {
    return iftminText;
  }
}
