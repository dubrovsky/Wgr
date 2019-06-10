package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.ArrayMap;
import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.VidOtpr;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Management;
import org.apache.commons.collections4.bag.HashBag;
import org.apache.commons.collections4.bidimap.DualHashBidiMap;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;

import static com.bivc.cimsmgs.exchange.Utils.ss;
import static org.apache.commons.lang3.StringUtils.*;

public class EDIConvertor97B extends EDIConvertor {

  private static final Logger log = LoggerFactory.getLogger(EDIConvertor97B.class);
  private static final String encoding = "utf-8";
  private static final String folder = "EDI_Failed";
  private static final HashSet<String> NADSet = new HashSet<>(Arrays.asList("BVB", "BHV", "BSI", "BTF", "B01", "B02"));

  private DualHashBidiMap<String, String> cod2DorMap = new DualHashBidiMap<>();

  private ArrayList<CimSmgs> csList = new ArrayList<>();

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
      cod2DorMap.put("", "  ");

      CimSmgs cs = (CimSmgs)session.get(CimSmgs.class, csId);
      if (cs != null) {
        List<CimSmgsCarList> list = null;

        messageId = prepareMessageId(session);

        String oldId = null;
        Query q = session.createQuery("SELECT l.id FROM BIftminLog l WHERE l.dir='O' AND l.cod_dir=:cd AND l.mes_name='IFTMIN' ORDER BY l.hid DESC");
        q.setString("cd", ediDir.getDirName());
        Iterator it = q.iterate();
        if (it.hasNext()) {
          oldId = (String)it.next();
        }

        Date curDate = new Date();
        /*String text*/ iftminText = getText(cs, messageId, oldId, curDate);

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
  public void receive() throws Exception {
    throw new Exception("Not implemented");
  }

  public void receive(String message, String un, String trans, Route route, UsrGroupsDir usrgrdir) throws Exception {
    Session session = null;
    Transaction tx = null;

    try {
      ProcessMessage(message);

      session = HibernateUtil.getSession();
      tx = session.beginTransaction();

      for (CimSmgs item : csList) {
        item.setRoute(route);
        item.setUn(un);
        item.setTrans(trans);

        PackDoc pd = new PackDoc();
        pd.setRoute(route);
        pd.setUsrGroupsDir(usrgrdir);
        pd.addCimSmgsItem(item);
        session.save(pd);

        BIftminLog il = new BIftminLog();
        il.setId(String.valueOf(item.getIftminId()));
        il.setHid_src(item.getHid());
        il.setText(message);
        il.setSrc("CIMSMGS");
        il.setDir("I");
        il.setCod_dir("db");
        session.save(il);
      }

//        session.flush();
      tx.commit();
    }
    catch (ParseException pex) {
      log.error(pex.getMessage());
      saveFailed(message, folder, encoding);
      throw pex;
    }
    catch (HibernateException ex) {
      log.error(ex.getMessage());
      saveFailed(message, folder, encoding);
      tx.rollback();
//      session.clear();
      throw ex;
    }
    catch (Exception ioex) {
      log.error(ioex.getMessage(), ioex);
      throw ioex;
    }
    finally {
      csList.clear();
    }
  }

  protected String getText(CimSmgs smgsOb, long messageId, String oldId, Date curDate) throws Exception {
    log.debug("Started");
    String sender = "1234";
    recipient = "56780";

    int vagCount = 0;
    int kontCount = 0;
    for (CimSmgsCarList csc : smgsOb.getCimSmgsCarLists().values()) {
      vagCount++;
      kontCount += csc.getCimSmgsKonLists().values().size();
    }
    boolean isKont = kontCount > 0;

    String text = "UNA:+.? " + nl;
    text += "UNB+UNOA:1+" + format(sender, 35) + "+" + format(recipient, 35) + "::HOST+" +
            format(new SimpleDateFormat("yyMMdd").format(curDate), 6) + ":" + format(new SimpleDateFormat("HHmm").format(curDate), 4) + "+" +
            format(String.valueOf(messageId), 14) + "++++++1" + nl;

    text += "UNH+" + format(String.valueOf(messageId), 14) + "+IFTMIN:D:97B:UN:" + (isKont ? "DBC104" : "DBC105") + nl;

    Byte typeOb = smgsOb.getType();
    String g693 = trimToNull(smgsOb.getG693());
    text += "BGM+" + (/*(typeOb != null && typeOb.intValue() == 1) ? "701" :*/ "720") + "+" +
            (g693 != null ? format(g693, 4) + "-" : "") + format(smgsOb.getG694(), 30) + "+" + (oldId == null ? "9" : "4") + nl;

//    Date d = smgsOb.buildG16Date();
//    text += "DTM+143:" + format((d != null ? df203.format(d) : "00000000"), 35) + ":203" + nl;
    Date d = smgsOb.getG281();
    text += "DTM+137:" + format(EDIDateFormat.DF204.format(d), 35) + ":204" + nl;

    String rqrStr = "";
    Map<Integer, CimSmgsDocs> csd13 = smgsOb.getCimSmgsDocses13();
    for (CimSmgsDocs csdOb : csd13.values()) {
      rqrStr = csdOb.getText2();
      if (isNotBlank(rqrStr)) {
        text += "FTX+RQT++" + format(csdOb.getCode(), 17) + "+" + format(rqrStr, 70, 1) + nl;
      }
    }

    text += "CNT+16:" + format(isKont ? kontCount : vagCount, 18) + nl;

    Map<Integer, CimSmgsDocs> csd9 = smgsOb.getCimSmgsDocses9();
    for (CimSmgsDocs csdOb : csd9.values()) {
      String nameDoc = csdOb.getText2();
      text += "DOC+" + format(csdOb.getCode(), 3) + (isNotBlank(nameDoc) ? ":::" + format(nameDoc, 35) : "") + "+" + format(csdOb.getNdoc(), 35) + ":2" + (csdOb.getNcopy() != null ? "++" + format(csdOb.getNcopy()) : "") + nl;
    }

    d = smgsOb.getG281();
    if (d != null) {
      text += "LOC+44'";
      text += "DTM+182:" + format(EDIDateFormat.DF102.format(d), 35) + ":102" + nl;
    }

    text += "RFF+UCN:" + format(smgsOb.getHid(), 35) + nl;
//    text += "RFF+AWG:LPK" + nl;
    if (isNotBlank(smgsOb.getG142())) {
      text += "RFF+ABV:" + format(smgsOb.getG142(), 35) + nl;
    }

    text += "TDT+20+" + format(smgsOb.getNpoezd(), 17) + "+20++" + format(smgsOb.getG691(), 17) + ":36:12" + nl;
    text += "TSR+BA::41+" + (isKont ? "BA1" : "") + "::41" + nl;

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

    text += "LOC+8+" + leftPad(format(smgsOb.getG12(), 2), 2, '0') + leftPad(format(smgsOb.getG121(), 23), 6, '0') + ":37:12:" + format(smgsOb.getG101(), 70) + nl;

    String g60 = defaultString(smgsOb.getG60());
    text += "LOC+92+" + format(ss(smgsOb.getG60(), 0, 25), 25) /*808735147021730 */ + ":RFP:12" + (g60.length() > 60 ? format(ss(smgsOb.getG60(), 25, 25), 25) : "") + nl;  // код железнодорожной администрации[n2]+код МСЖД пограничного пункта[n2]+дополнительный знак[n1] : итого не более 5 пунктов

    for (CimSmgsPerevoz perevoz : smgsOb.getCimSmgsPerevoz().values()) {
      text += "TDT+BA+++++++" + format(perevoz.getSort(), 9) + nl;
      text += "LOC+BAB+" + leftPad(format(perevoz.getAdmStBeg(), 2), 2, '0') + leftPad(format(perevoz.getCodStBeg(), 23), 6, '0') + ":37:12:" + format(perevoz.getStBeg(), 70) + nl;
      text += "LOC+BAE+" + leftPad(format(perevoz.getAdmStEnd(), 2), 2, '0') + leftPad(format(perevoz.getCodStEnd(), 23), 6, '0') + ":37:12:" + format(perevoz.getStEnd(), 70) + nl;
    }

    String notd_kod = smgsOb.getG2();
    String notd_naim = smgsOb.getG1();
    String notda_ul = smgsOb.getG19_1();
    String notda_g = smgsOb.getG18_1();
    String notda_r = "";
    String notda_i = smgsOb.getG17_1();
    String notd_eml = smgsOb.getG11_1();
    String notd_tel = smgsOb.getG12_1();
    String notd_fax = smgsOb.getG13_1();
    String notd_strn = defaultString(smgsOb.getG15_1());
    text += "NAD+OY+" +
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

    Map<Integer, CimSmgsDocs> csd7 = smgsOb.getCimSmgsDocses7();
    for (CimSmgsDocs csdOb : csd7.values()) {
      String s = csdOb.getText2();
      String code = csdOb.getCode();
      if (isNotBlank(s)) {
        if ("11".equals(code)) {
          text += "TSR+14+U08::12" + nl;
          text += "FTX+DCL+++" + format(s, 70, 5) + nl;
        }
        else if ("16".equals(code)) {
          text += "TSR+14+16::12" + nl;
          text += "FTX+SIC+++" + format(s, 70, 5) + nl;
        }
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
    String npol_strn = defaultString(smgsOb.getG45_1());

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

    text += "TSR+14" + nl;

    if (isNotBlank(smgsOb.getG15())) {
      text += "FTX+ICN+++" + format(smgsOb.getG15(), 70, 5) + nl;
    }

    for (CimSmgsPlatel csp : smgsOb.getCimSmgsPlatels().values()) {
      String strana = defaultString(csp.getStrana());
      text += "NAD+FP+" +
              format(cod2DorMap.get(strana), 2) + format(csp.getKplat()/*���*/, 33) + "::12++" +
              format(csp.getPlat(), 35, 3) + "+++++" + format(strana, 3) + nl;
    }

    for (CimSmgsPerevoz perevoz : smgsOb.getCimSmgsPerevoz().values()) {
      text += "NAD+" + "B01" + "+" + format(perevoz.getCodePer(), 3) + "::12++" + format(perevoz.getNamPer(), 9) + nl;
      text += "TSR+28" + nl;
      text += "TPL+" + format(perevoz.getSort(), 9) + nl;
    }

    ArrayList<CimSmgsGruz> gruzList = new ArrayList<>();
    for (CimSmgsCarList cscOb : smgsOb.getCimSmgsCarLists().values()) {
      if (isKont) {
        for (CimSmgsKonList cskOb : cscOb.getCimSmgsKonLists().values()) {
          gruzList.addAll(cskOb.getCimSmgsGruzs().values());
        }
      }
      else {
        gruzList.addAll(cscOb.getCimSmgsGruzs().values());
      }
    }

    int gidCount = 1;
    for (CimSmgsGruz csgOb : gruzList) {
      CimSmgsKonList csk = null;
      CimSmgsCarList csc = null;
      if (isKont) {
        csk = csgOb.getCimSmgsKonList();
        csc = csk.getCimSmgsCarList();
      }
      else {
        csc = csgOb.getCimSmgsCarList();
      }

      text += "GID+" + format(gidCount++, 5) + nl;
      text += "PIA+5+" + format(csgOb.getKgvn(), 35) + ":HS:39:12" + nl;
      text += "FTX+AAA+++" + format(csgOb.getNzgrEu(), 70, 5) + nl;

      text += "SGP+" + format(normNvagNkonStr(csc.getNvag()), 17) + "::12" + nl;
      text += "MEA+WT+AAL+KGM:" + format(isKont ? BigDecimal.ZERO : csc.getMassSend() /*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

      if (isKont) {
        text += "SGP+" + format(normNvagNkonStr(csk.getUtiN()), 17) + ":172:5" + nl;
        text += "MEA+WT+AAL+KGM:" + format(csk.getMassSend() != null ? csk.getMassSend()/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/ : BigDecimal.ZERO, 18) + nl;
      }

      /*todo Доделать SG31, если это кому-нибудь надо*/
      text += "TCC+4::41+" + format(smgsOb.getGa54(), 18) + ":137:41+" + format(smgsOb.getGa51(), 9) + ":39:12" + nl;
      text += "QTY+100:" + format(smgsOb.getGa53(), 15) + ":KGM" + nl;

      if (csgOb.getCimSmgsDanGruzs() != null && csgOb.getCimSmgsDanGruzs().size() > 0) {
        CimSmgsDanGruz dang = csgOb.getCimSmgsDanGruzs().values().iterator().next();
        text += "DGS+RGE+" +format(dang.getClazz(), 7) + "+++" + format(dang.getGroupPack(), 3) + "+++" + format(dang.getEmergenC(), 10) + "+" + format(dang.getCodDanger(), 4) + ":" + format(dang.getNumOon(), 4) + "+" + format(dang.getDangSign(), 4) + nl;
        text += "FTX+AAD+++" + format(dang.getCarDNameDe(), 70, 5) + nl;
        text += "FTX+AAC+++" + format(dang.getStampDName(), 70, 5) + nl;

        if ("1".equals(dang.getClazz())) {
          text += "SGP+" + (isKont ? format(normNvagNkonStr(csk.getUtiN()), 17) + ":172:5" : format(csc.getNvag(), 17) + "::12") + nl;
          text += "MEA+WT+ACF+KGM:" + format(isKont ? csk.getMassSend() : csc.getMassSend(), 18) + nl;
        }
      }
//      else if (smgsOb.getG22() != null && smgsOb.getG22() == 1) {
//        text += "DGS+RGE" + nl;
//        text += "FTX+AAD+++" + format(csgOb.getNzgrRidEu(), 70, 5) + nl;
//      }
    }

    int abn = 1;
    for (CimSmgsCarList csc : smgsOb.getCimSmgsCarLists().values()) {
      text += "EQD+RR+" + format(normNvagNkonStr(csc.getNvag()), 17) + "::12++++" + format("5", 3) + nl;
      if (isKont) {
        for (CimSmgsKonList csk : csc.getCimSmgsKonLists().values()) {
          text += "EQA+CN+" + format(normNvagNkonStr(csk.getUtiN()), 17) + "::5'" + nl;
        }
      }
      else {
        BigDecimal mnet = csc.getMassSend() == null ? calcMassSend(csc.getCimSmgsGruzs().values()) : new BigDecimal(csc.getMassSend());
        text += "MEA+WT+AAA+KGM:" + format(mnet/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;
        text += "MEA+WT+AAB+KGM:" + format(mnet/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;
        text += "MEA+WT+ADL+TNE:" + format(csc.getGrPod().setScale(1, BigDecimal.ROUND_HALF_UP), 18) + nl;
        text += "MEA+WT+T+KGM:" + format(csc.getTaraVag()/*.setScale(1, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

        for (CimSmgsPlomb plomb : csc.getCimSmgsPlombs().values()) {
          Short kpl = plomb.getKpl();
          if (kpl == null)
            kpl = 1;

          for (int k = 0; k < kpl; k++) {
            text += "SEL+" + format(plomb.getZnak(), 10) + nl;
          }
        }

        text += "FTX+ABN+++" + format(abn++, 70) + nl;

      }
    }

    if (isKont) {
      abn = 1;
      for (CimSmgsCarList cscOb : smgsOb.getCimSmgsCarLists().values()) {
        for (CimSmgsKonList cskOb : cscOb.getCimSmgsKonLists().values()) {
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

          BigDecimal mnet = cskOb.getMassSend() == null ? calcMassSend(cskOb.getCimSmgsGruzs().values()) : cskOb.getMassSend();
          boolean isEmpty = BigDecimal.ZERO.compareTo(mnet) == 0;

          text += "EQD+CN+" + format(nkon, 17) + "::5+" + format(code, 10) + "::41+++" + format(isEmpty ? "4" : "5", 3) + nl;

          text += "MEA+WT+AAA+KGM:" + format(mnet/*.setScale(0, BigDecimal.ROUND_HALF_UP)*/, 18) + nl;

          text += "MEA+WT+T+KGM:" + format(cskOb.getTaraKont(), 18) + nl;

          text += "DIM+10+FOT:" + format(cskOb.getSizeFoot(), 3) + nl;

          for (CimSmgsPlomb plomb : cskOb.getCimSmgsPlombs().values()) {
            Short kpl = plomb.getKpl();
            if (kpl == null)
              kpl = 1;

            for (int k = 0; k < kpl; k++) {
              text += "SEL+" + format(plomb.getZnak(), 10) + nl;
            }
          }

          if (isNotBlank(cskOb.getPlombs())) {
            text += "SEL+" + format(cskOb.getPlombs(), 10) + nl;
          }

          text += "FTX+ABN+++" + format(abn++, 70) + nl;
        }
      }
    }

    text += "UNT+" + format(String.valueOf(new StringTokenizer(text, nl).countTokens() -1 ), 6) + "+" + format(String.valueOf(messageId), 14) + nl;

    text += "UNZ+1+" + format(String.valueOf(messageId), 14) + nl;

    log.debug("Completed");
    return text;
  }

  private void ProcessMessage(String message) throws ParseException, NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
    String s;
    String[] seg;
    String[] el;
    Object res = null;

    Matcher m = UNH.matcher(message);
    if(m.find()) {
      s = m.group();
      seg = split(s, pl, ms);
      el = split(ge(seg, 2), dd, ms);
      String msg = ge(el, 0);

      if("IFTMIN".equals(msg))
        ProcessIftmin(message);
//      else if("APERAK".equals(msg))
//        res = ProcessAperak(message);
      else
        throw new ParseException("Message type=\"" + msg + "\", required (\"IFTMIN\")", 0);
    }
    else {
      throw new ParseException("Unknown message type :\"" + message + "\"", 0);
    }
  }

  private void ProcessIftmin(String message) throws ParseException, InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
    class Plomb {
      String znak;
      String prin;

      @Override
      public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Plomb plomb = (Plomb) o;
        return Objects.equals(znak, plomb.znak) &&
                Objects.equals(prin, plomb.prin);
      }

      @Override
      public int hashCode() {
        return Objects.hash(znak, prin);
      }

      @Override
      public String toString() {
        return "Plomb{znak='" + znak + "', prin='" + prin + "'}";
      }
    }

    Splitter.Element el;

    message = message.substring(message.indexOf("UNB"));

    EDIMessage st = new EDIMessage(message);
    Splitter s = st.next();
    Date datUNB = null;

    if ("UNB".equals(s.val(0))) {
      try {
        datUNB = dunb.parse(s.val(4));
      }
      catch (Exception pex) {
        log.warn(pex.getMessage());
      }

      s = st.next();
    }

    CimSmgs cs;
    ArrayList<CimSmgsDocs> docsList;
    TreeMap<Integer, CimSmgsPerevoz> perevozMap = new TreeMap<>();

    while ("UNH".equals(s.val(0))) {
      int scSort = 0;
      cs = new CimSmgs();
      cs.setIftminId(s.gs(1).geL(0));
      cs.setIftminIn(datUNB);
      docsList = new ArrayList<>();

      s = st.next();

      if ("BGM".equals(s.val(0))) {
        DocType type = DocType.CIMSMGS;
        cs.setType(type.getType());
        cs.setDocType1(type.getDocType1());
        cs.setG694(s.val(2));

        s = st.next();
      }

      if ("DTM".equals(s.val(0))) {
        el = s.gs(1);
        Date d = null;
        String df = el.ge(2);
        String val = el.ge(1);
        try {
          d = EDIDateFormat.getEnum(df).parse(val);
        }
        catch (Exception pex) {
          log.warn(pex.getMessage());
        }
        if (d != null) {
          String ss = el.ge(0);
          if ("143".equals(ss))
            cs.setG161(dg16.format(d));
          else if ("137".equals(ss))
            cs.setG281(d);
        }

        s = st.next();
      }

      while ("TSR".equals(s.val(0))) {

        s = st.next();
      }

      if ("CUX".equals(s.val(0))) {

        s = st.next();
      }

      if ("MOA".equals(s.val(0))) {

        s = st.next();
      }

      Integer docSort = 0;
      while ("FTX".equals(s.val(0))) {
        String ss = s.val(1);
        String n = s.val(4);

        if ("RQT".equals(ss)) {
          CimSmgsDocs csd = new CimSmgsDocs();
          csd.setFieldNum("13");
          csd.setCode(s.val(3));
          csd.setText2(n);
          csd.setSort(docSort++);
          cs.addCimSmgsDocsItem(csd);
        }

        s = st.next();
      }

//      int kontCount = 0;
      if ("CNT".equals(s.val(0))) {
        try {
//          kontCount = s.gs(1).geI(1);
        }
        catch (Exception ignore) {}

        s = st.next();
      }

      while ("DOC".equals(s.val(0))) {
        el = s.gs(1);
        Splitter.Element el2 = s.gs(2);

        if ("2".equals(el2.ge(1))) {
          CimSmgsDocs csd = new CimSmgsDocs();
          csd.setFieldNum("9");
          String code = el.ge(0);
          csd.setCode(code);
          csd.setText2(el.ge(3));
          csd.setNdoc(el2.ge(0));
          csd.setNcopy(s.gs(4).geI(0));
          csd.setSort(docSort++);

//          if (isNotBlank(code)) {
//            String ncas = codDocMap.get(code);
//            if (isNotBlank(ncas)) {
//              csd.setNcas(ncas);
//            }
//          }

          cs.addCimSmgsDocsItem(csd);
          docsList.add(csd);
        }

        s = st.next();
      }

      while ("LOC".equals(s.val(0))) {
        String n = s.val(1);

        s = st.next();

        if ("DTM".equals(s.val(0))) {
          el = s.gs(1);
          if ("44".equals(n) && "182".equals(el.ge(0))) {
            Date d = null;
            String df = el.ge(2);
            String val = el.ge(1);
            try {
              d = EDIDateFormat.getEnum(df).parse(val);
            }
            catch (Exception pex) {
              log.warn(pex.getMessage());
            }
            if (d != null) {
              cs.setG281(d);
            }
          }
          s = st.next();
        }
      }


      if ("TOD".equals(s.val(0))) {

        s = st.next();

        if ("LOC".equals(s.val(0))) {

          s = st.next();
        }
      }

      while ("RFF".equals(s.val(0))) {
        el = s.gs(1);
        String ss = el.ge(0);
        String n = el.ge(1);

        if ("ABV".equals(ss)) {
          cs.setG142(n);
        }

        s = st.next();

        if ("DTM".equals(s.val(0))) {

          s = st.next();
        }
      }

      if ("GOR".equals(s.val(0))) {

        s = st.next();

        if ("FTX".equals(s.val(0))) {

          s = st.next();
        }
      }


      while ("CPI".equals(s.val(0))) {

        s = st.next();

        if ("LOC".equals(s.val(0))) {

          s = st.next();
        }

        if ("MOA".equals(s.val(0))) {

          s = st.next();
        }
      }

      while ("TCC".equals(s.val(0))) {

        s = st.next();

        if ("LOC".equals(s.val(0))) {

          s = st.next();
        }

        if ("FTX".equals(s.val(0))) {

          s = st.next();
        }

        if ("QTY".equals(s.val(0))) {

          s = st.next();
        }

        if ("MOA".equals(s.val(0))) {

          s = st.next();
        }

      }

      byte perevozSort = 0;
      while ("TDT".equals(s.val(0))) {
        String n = s.val(1);

        if ("20".equals(n)) {
          cs.setNpoezd(s.val(2));
          cs.setG691(s.gs(5).ge(0));
          s = st.next();

          while ("TSR".equals(s.val(0))) {
            s = st.next();
          }

          while ("LOC".equals(s.val(0))) {
            String ss = s.val(1);
            el = s.gs(2);
            String kst = el.ge(0);
            String nst = el.ge(3);

            if ("5".equals(ss)) {
              cs.setG171(ss(kst, 0, 2));
              cs.setG17(ss(kst, 2, 6));
              cs.setG162(nst);
            }
            else if ("8".equals(ss)) {
              cs.setG12(ss(kst, 0, 2));
              cs.setG121(ss(kst, 2, 6));
              cs.setG101(nst);
            }
            else if ("92".equals(ss)) {
              cs.setG60(kst);
            }
            else if ("10".equals(ss)) {

            }

            s = st.next();

            while ("DTM".equals(s.val(0))) {

              s = st.next();
            }
          }
        }
        else if ("BA".equals(n)) {
          int por = s.gs(8).geI(0);
          CimSmgsPerevoz perevoz = new CimSmgsPerevoz();
          perevoz.setSort(perevozSort++);

          s = st.next();

          while ("LOC".equals(s.val(0))) {
            String ss = s.val(1);
            el = s.gs(2);
            String kst = el.ge(0);
            String nst = el.ge(3);

            if ("BAB".equals(ss)) {
              perevoz.setAdmStBeg(ss(kst, 0, 2));
              perevoz.setCodStBeg(ss(kst, 2, 6));
              perevoz.setStBeg(nst);
            }
            else if ("BAE".equals(ss)) {
              perevoz.setAdmStEnd(ss(kst, 0, 2));
              perevoz.setCodStEnd(ss(kst, 2, 6));
              perevoz.setStEnd(nst);
            }

            s = st.next();
          }

          perevozMap.put(por, perevoz);
        }

      }

      byte platSort = 0;
      while ("NAD".equals(s.val(0))) {
        String n = s.val(1);

        if (NADSet.contains(n)) {
          String cod = s.gs(2).ge(0);
          String nam = s.val(4);

          s = st.next();

          if ("TSR".equals(s.val(0))) {
            s = st.next();
          }

          if ("TPL".equals(s.val(0))) {
            int por = s.gs(1).geI(0);
            CimSmgsPerevoz perevoz = perevozMap.get(por);
            if (perevoz != null) {
              perevoz.setCodePer(cod);
              perevoz.setNamPer(nam);
            }

            s = st.next();
          }

        }
        else {
          String cod = substring(s.gs(2).ge(0), 2);

          if ("CZ".equals(n) || "OY".equals(n)) {
            cs.setG2(cod);
            cs.setG1(s.val(4));
            cs.setG19_1(s.val(5));
            cs.setG18_1(s.val(6));
            cs.setG17_1(s.val(8));
            cs.setG15_1(s.val(9));
          }
          else if ("CN".equals(n)) {
            cs.setG5(cod);
            cs.setG4(s.val(4));
            cs.setG49(s.val(5));
            cs.setG48_1(s.val(6));
            cs.setG47_1(s.val(8));
            cs.setG45_1(s.val(9));
          }
          else if ("FP".equals(n)) {
            CimSmgsPlatel csp = new CimSmgsPlatel();
            csp.setKplat(cod);
            csp.setPlat(s.val(4));
            csp.setStrana(s.val(9));
            csp.setSort(platSort++);
            cs.addCimSmgsPlatelItem(csp);
          }

          s = st.next();

          if ("CTA".equals(s.val(0))) {
            s = st.next();

            while ("COM".equals(s.val(0))) {
              s = st.next();
            }
          }

          if ("TCC".equals(s.val(0))) {
            s = st.next();
          }

          if ("RFF".equals(s.val(0))) {
            s = st.next();
          }

          while ("TSR".equals(s.val(0))) {
            s = st.next();

            if ("FTX".equals(s.val(0))) {
              String sss = s.val(1);

              if ("DCL".equals(sss)) {

              }
              else if ("ICN".equals(sss)) {

              }
              else if ("SIC".equals(sss)) {
                String ss = s.val(4);
                CimSmgsDocs csd = new CimSmgsDocs();
                csd.setFieldNum("7");
                csd.setCode(substringBefore(ss, " "));
                csd.setText2(substringAfter(ss, " "));
                csd.setSort(docSort++);
                cs.addCimSmgsDocsItem(csd);
              }

              s = st.next();
            }

            if ("FTX".equals(s.val(0))) {
              s = st.next();
            }
          }

        }
      }

      for (CimSmgsPerevoz perevoz : perevozMap.values()) {
        cs.addCimSmgsPerevozItem(perevoz);
      }

      int gruzSort = 0;
      ArrayMap<String, CimSmgsGruz> nkonGruzMap = new ArrayMap<>();
      ArrayMap<String, CimSmgsGruz> nvagGruzMap = new ArrayMap<>();
      while ("GID".equals(s.val(0))) {
        CimSmgsGruz csg = new CimSmgsGruz();
        csg.setSort(gruzSort++);

        String nkon = null;
        String nvag = null;

        s = st.next();

        if ("RNG".equals(s.val(0))) {
          s = st.next();
        }

        while ("LOC".equals(s.val(0))) {
          s = st.next();
        }

        if ("PIA".equals(s.val(0))) {
          csg.setKgvn(s.gs(2).ge(0));

          s = st.next();
        }

        String nzgr = "";
        while ("FTX".equals(s.val(0))) {
          String n = s.val(1);

          if ("AAA".equals(n) || "PRD".equals(n)) {
            if (isNotEmpty(nzgr))
              nzgr += "\r\n";
            nzgr += s.val(4);
          }

          s = st.next();
        }
        csg.setNzgrEu(nzgr);

        while ("RFF".equals(s.val(0))) {
          s = st.next();
        }

        while ("DOC".equals(s.val(0))) {
          s = st.next();
        }

        while ("TPL".equals(s.val(0))) {
          s = st.next();
        }

        BigDecimal nkonMassa = BigDecimal.ZERO;
        BigDecimal nvagMassa = BigDecimal.ZERO;
        while ("SGP".equals(s.val(0)) && isEmpty(s.gs(1).ge(1))) {
          nvag = s.gs(1).ge(0);
          nvagGruzMap.add(nvag, csg);

          s = st.next();

          while ("MEA".equals(s.val(0))) {
            if ("WT".equals(s.val(1)) && "AAL".equals(s.val(2))) {
              nvagMassa = nvagMassa.add(s.gs(3).geD0(1));
            }

            s = st.next();
          }
        }

        while ("SGP".equals(s.val(0))) {
          nkon = s.gs(1).ge(0);
          nkonGruzMap.add(nkon, csg);

          s = st.next();

          if ("MEA".equals(s.val(0)) && "WT".equals(s.val(1)) && "AAL".equals(s.val(2))) {
            nkonMassa = nkonMassa.add(s.gs(3).geD0(1));

            s = st.next();
          }
        }

        csg.setMassa(nkonGruzMap.getMap().isEmpty() ? nvagMassa : nkonMassa);

        while ("TCC".equals(s.val(0))) {
          cs.setGa51(s.gs(4).ge(0));

          s = st.next();

          if ("PRI".equals(s.val(0))) {
            s = st.next();
          }

          if ("PCD".equals(s.val(0))) {
            s = st.next();
          }

          while ("MOA".equals(s.val(0))) {
            s = st.next();
          }

          while ("QTY".equals(s.val(0))) {
            el = s.gs(1);
            if ("100".equals(el.ge(0))) {
              cs.setGa53(el.ge(1));
            }

            s = st.next();
          }

          if ("LOC".equals(s.val(0))) {

            s = st.next();
          }
        }

        if ("DGS".equals(s.val(0))) {
          cs.setG22((byte)1);

          s = st.next();

          StringBuilder nzgrRid = new StringBuilder();
          while ("FTX".equals(s.val(0))) {
            String ss = s.val(1);
            nzgrRid.append(s.val(4)).append(' ');

            s = st.next();
          }
          csg.setNzgrRidEu(nzgrRid.toString().trim());

          while ("SGP".equals(s.val(0))) {
            s = st.next();

            if ("MEA".equals(s.val(0))) {
              s = st.next();
            }
          }
        }

      }

      byte carSort = 0;
      TreeMap<String, CimSmgsCarList> nkonNvagMap = new TreeMap<>();
      while ("EQD".equals(s.val(0)) && "RR".equals(s.val(1))) {
        String nvag = s.gs(2).ge(0);
        CimSmgsCarList csc = new CimSmgsCarList();
        csc.setSort(carSort++);
        csc.setNvag(nvag);
        ArrayList<CimSmgsGruz> gruzList = nvagGruzMap.getArray(nvag);
        if (gruzList != null) {
          for (CimSmgsGruz item : gruzList) {
            csc.addCimSmgsGruzItem(item);
          }
        }
        cs.addCimSmgsCarListItem(csc);

        s = st.next();

        while ("MEA".equals(s.val(0))) {
          String kod = s.val(1);
          String ss = s.val(2);
          el = s.gs(3);
          Long longVal = el.geL(1);
          BigDecimal numVal = el.geD(1);

          if ("WT".equals(kod)) {
            if ("AAA".equals(ss) ) {
              csc.setMassSend(longVal);
            }
            else if ("AAB".equals(ss)) {
              csc.setMassSend(longVal);
            }
            else if ("ADL".equals(ss)) {
              csc.setGrPod(numVal);
            }
            else if ("T".equals(ss)) {
              csc.setTaraVag(numVal);
            }
            else if ("SV".equals(ss)) {
            }
          }

          s = st.next();
        }

        HashBag<Plomb> plombs = new HashBag<>();
        while ("SEL".equals(s.val(0))) {
          Plomb pl = new Plomb();
          pl.znak = (s.val(1));
          pl.prin = (s.gs(4).ge(0));
          plombs.add(pl);

          s = st.next();
        }

        byte plombSort = 0;
        for (Plomb pl : plombs.uniqueSet()) {
          CimSmgsPlomb plomb = new CimSmgsPlomb();
          plomb.setZnak(pl.znak);
          plomb.setType(pl.prin);
          plomb.setKpl((short)plombs.getCount(pl));
          plomb.setSort(plombSort++);
          csc.addCimSmgsPlombItem(plomb);
          cs.addCimSmgsPlombItem(plomb);
        }

        while ("TPL".equals(s.val(0))) {
          s = st.next();
        }

        if ("HAN".equals(s.val(0))) {
          s = st.next();
        }

        while ("FTX".equals(s.val(0))) {
          if ("ABN".equals(s.val(1))) {

          }

          s = st.next();
        }

        while ("RFF".equals(s.val(0))) {
          s = st.next();
        }

        while ("TCC".equals(s.val(0))) {
          s = st.next();
        }

        if ("NAD".equals(s.val(0))) {
          s = st.next();
        }

        while ("EQA".equals(s.val(0)) && "CN".equals(s.val(1))) {
          String nkon = s.gs(2).ge(0);
          nkonNvagMap.put(nkon, csc);

          s = st.next();

          if ("EQN".equals(s.val(0))) {
            s = st.next();
          }
        }
      }

      byte kontSort = 0;
      while ("EQD".equals(s.val(0)) && "CN".equals(s.val(1))) {
        CimSmgsKonList csk = new CimSmgsKonList();
        csk.setSort(kontSort++);
        String nkon = s.gs(2).ge(0);
        csk.setUtiN(nkon);

        CimSmgsCarList csc = nkonNvagMap.get(nkon);
        if (csc != null) {
          csc.addCimSmgsKonListItem(csk);
        }

        ArrayList<CimSmgsGruz> gruzList = nkonGruzMap.getArray(nkon);
        if (gruzList != null) {
          for (CimSmgsGruz item : gruzList) {
            csk.addCimSmgsGruzItem(item);
          }
        }

        s = st.next();

        while ("MEA".equals(s.val(0)) && "WT".equals(s.val(1))) {
          String ss = s.val(2);
          if ("AAA".equals(ss)) {
            csk.setMassSend(s.gs(3).geD(1));
          }
          else if ("T".equals(ss)) {
            csk.setTaraKont(s.gs(3).geI(1).shortValue());
          }

          s = st.next();
        }

        if ("DIM".equals(s.val(0))) {
          csk.setSizeFoot(s.gs(2).geD(1));

          s = st.next();
        }

        HashBag<Plomb> plombs = new HashBag<>();
        while ("SEL".equals(s.val(0))) {
          Plomb pl = new Plomb();
          pl.znak = (s.val(1));
          pl.prin = (s.gs(4).ge(0));
          plombs.add(pl);

          s = st.next();
        }

        byte plombSort = 0;
        for (Plomb pl : plombs.uniqueSet()) {
          CimSmgsPlomb plomb = new CimSmgsPlomb();
          plomb.setZnak(pl.znak);
          plomb.setType(pl.prin);
          plomb.setKpl((short)plombs.getCount(pl));
          plomb.setSort(plombSort++);
          csk.addCimSmgsPlombItem(plomb);
          cs.addCimSmgsPlombItem(plomb);
        }

        while ("TPL".equals(s.val(0))) {
          s = st.next();
        }

        if ("FTX".equals(s.val(0))) {
          if ("ABN".equals(s.val(1))) {

          }

          s = st.next();
        }

        while ("RFF".equals(s.val(0))) {

          s = st.next();
        }

        if ("NAD".equals(s.val(0))) {
          s = st.next();

          if ("DTM".equals(s.val(0))) {
            s = st.next();
          }
        }


        while ("EQA".equals(s.val(0)) && "CN".equals(s.val(1))) {
          s = st.next();

          if ("EQN".equals(s.val(0))) {
            s = st.next();
          }
        }

      }

      while ("EQD".equals(s.val(0))/* && !("RR".equals(s.val(1)) || "CN".equals(s.val(1)))*/) {
        s = st.next();

        if ("MEA".equals(s.val(0))) {
          s = st.next();
        }
      }

      if ("UNT".equals(s.val(0))) {

        s = st.next();
      }

      cs.setG25(kontSort > 0 ? VidOtpr.KONT.getG25() : VidOtpr.VAG.getG25());

      CimSmgsCarList car = cs.getCimSmgsCarLists().values().iterator().next();
      if (car != null) {
        if (kontSort == 0) {
          for (CimSmgsDocs item : docsList) {
            car.addCimSmgsDocsItem(item);
          }
        }
        else {
          CimSmgsKonList kont = car.getCimSmgsKonLists().values().iterator().next();
          if (kont != null) {
            for (CimSmgsDocs item : docsList) {
              kont.addCimSmgsDocsItem(item);
            }
          }
        }
      }

      log.debug(new ToStringBuilder(cs).append(cs).toString());
      csList.add(cs);
    }

    if ("UNZ".equals(s.val(0))) {
      st.next();
    }
  }

}
