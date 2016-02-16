package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.ArrayMap;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Management;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.bidimap.DualHashBidiMap;
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
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TreeMap;
import java.util.regex.Matcher;

import static com.bivc.cimsmgs.exchange.Utils.ss;
import static org.apache.commons.lang3.StringUtils.*;

public class EDIConvertor97B extends EDIConvertor {

  private static final Logger log = LoggerFactory.getLogger(EDIConvertor97B.class);
  private static final String encoding = "Cp1251";
  private final String folder = "EDI_Failed";

  private DualHashBidiMap cod2DorMap = new DualHashBidiMap();
  private String iftminText;

  private ArrayList<CimSmgs> csList = new ArrayList<>();

  private static ConfigurableMapper mapper = new ConfigurableMapper();

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

  protected String getText(CimSmgs smgsOb, long messageId, String oldId, Date curDate, List<CimSmgsCarList> carList) throws Exception {
    log.debug("Started");
    String sender = "1234";
    recipient = "56780";

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
      if ("1".equals(code)) {
        rqrStr = csdOb.getText2();
        if (isBlank(rqrStr))
          rqrStr = csdOb.getText();
        break;
      }
    }
    text += "FTX+RQT+++" + format(rqrStr, 70, 1) + nl;

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

    ArrayMap<String, String> nvahNkonMap = new ArrayMap<>();
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
            text += "FTX+AAD+++" + format(csgOb.getNzgrRidEu(), 70, 5) + nl;
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
    Splitter.Element el;

    message = message.substring(message.indexOf("UNB"));

    EDIMessage st = new EDIMessage(message);
    Splitter s = st.next();

    if ("UNB".equals(s.val(0))) {

      s = st.next();
    }

    CimSmgs cs;
    ArrayList<CimSmgsDocs> docsList;
    ArrayList<CimSmgsPlatel> platelList;

    while ("UNH".equals(s.val(0))) {
      int scSort = 0;
      cs = new CimSmgs();
      docsList = new ArrayList<>();
      platelList = new ArrayList<>();

      s = st.next();

      if ("BGM".equals(s.val(0))) {
        cs.setType((byte)1);
        cs.setDocType1(new BigDecimal(4));
        cs.setG694(s.val(2));

        s = st.next();
      }

      if ("DTM".equals(s.val(0))) {
        el = s.gs(1);
        Date d = null;
        String df = el.ge(2);
        String val = el.ge(1);
        try {
          if ("203".equals(df))
            d = df203.parse(val);
          else if ("204".equals(df))
            d = df204.parse(val);
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

      byte docSort = 0;
      while ("FTX".equals(s.val(0))) {
        String ss = s.val(1);
        String n = s.val(4);

        if ("RQT".equals(ss)) {
          CimSmgsDocs csd = new CimSmgsDocs();
          csd.setFieldNum("13");
          csd.setCode(substringBefore(n, " "));
          csd.setText2(substringAfter(n, " "));
          csd.setSort(docSort++);
          //cs.addCimSmgsDocsItem(csd);
          docsList.add(csd);
        }

        s = st.next();
      }

      int kontCount = 0;
      if ("CNT".equals(s.val(0))) {
        try {
          kontCount = s.gs(1).geI(1);
        }
        catch (Exception ignore) {}
        if (kontCount > 1) {
          cs.setKind(0);
        }

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
          csd.setNdoc(el2.ge(0));
          csd.setSort(docSort++);

//          if (isNotBlank(code)) {
//            String ncas = codDocMap.get(code);
//            if (isNotBlank(ncas)) {
//              csd.setNcas(ncas);
//            }
//          }

          //cs.addCimSmgsDocsItem(csd);
          docsList.add(csd);
        }

        s = st.next();
      }

      while ("RFF".equals(s.val(0))) {
        el = s.gs(1);
        String ss = el.ge(0);
        String n = el.ge(1);

        if ("ABV".equals(ss)) {
          cs.setG142(n);
        }

        s = st.next();
      }

      if ("CPI".equals(s.val(0))) {
        s = st.next();
      }

      if ("TDT".equals(s.val(0))) {
        cs.setNpoezd(s.val(2));
        cs.setG691(s.gs(5).ge(0));
        s = st.next();
      }

      if ("TSR".equals(s.val(0))) {
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

        s = st.next();

        while ("DTM".equals(s.val(0))) {

          s = st.next();
        }
      }

      byte platSort = 0;
      while ("NAD".equals(s.val(0))) {
        String ss = s.val(1);
        String cod = substring(s.gs(2).ge(0), 2);

        if ("CZ".equals(ss)) {
          cs.setG2(cod);
          cs.setG1(s.val(4));
          cs.setG19_1(s.val(5));
          cs.setG18_1(s.val(6));
          cs.setG17_1(s.val(8));
          cs.setG15_1(s.val(9));
        }
        else if ("CN".equals(ss)) {
          cs.setG5(cod);
          cs.setG4(s.val(4));
          cs.setG49(s.val(5));
          cs.setG48_1(s.val(6));
          cs.setG47_1(s.val(8));
          cs.setG45_1(s.val(9));
        }
        else if ("FP".equals(ss)) {
          CimSmgsPlatel csp = new CimSmgsPlatel();
          csp.setKplat(cod);
          csp.setPlat(s.val(4));
          csp.setStrana(s.val(9));
          csp.setSort(platSort++);
          //cs.addCimSmgsPlatelItem(csp);
          platelList.add(csp);
        }

        s = st.next();

        if ("CTA".equals(s.val(0))) {
          s = st.next();
        }

        while ("COM".equals(s.val(0))) {
          s = st.next();
        }

        if ("TCC".equals(s.val(0))) {
          s = st.next();
        }

        if ("RFF".equals(s.val(0))) {
          s = st.next();
        }

        if ("TSR".equals(s.val(0))) {
          s = st.next();
        }

        if ("FTX".equals(s.val(0))) {
          String sss = s.val(1);

          if ("DCL".equals(sss)) {

          }
          else if ("ICN".equals(sss)) {

          }
          else if ("SIC".equals(sss)) {
            String n = s.val(4);
            CimSmgsDocs csd = new CimSmgsDocs();
            csd.setFieldNum("7");
            csd.setCode(substringBefore(n, " "));
            csd.setText2(substringAfter(n, " "));
            csd.setSort(docSort++);
            //cs.addCimSmgsDocsItem(csd);
            docsList.add(csd);
          }

          s = st.next();
        }

      }

      int gruzSort = 0;
      ArrayMap<String, CimSmgsGruz> nkonGruzMap = new ArrayMap<>();
      while ("GID".equals(s.val(0))) {
        CimSmgsGruz csg = new CimSmgsGruz();
        csg.setSort(gruzSort++);

        String nkon = null;
        String nvag = null;

        s = st.next();

        if ("PIA".equals(s.val(0))) {
          csg.setKgvn(s.gs(2).ge(0));

          s = st.next();
        }

        if ("FTX".equals(s.val(0)) && "PRD".equals(s.val(1))) {
          csg.setNzgrEu(s.val(4));

          s = st.next();
        }

        if ("SGP".equals(s.val(0))) {
          nvag = s.gs(1).ge(0);

          s = st.next();
        }

        if ("MEA".equals(s.val(0))) {
          s = st.next();
        }

        if ("SGP".equals(s.val(0))) {
          nkon = s.gs(1).ge(0);

          s = st.next();
        }

        if ("MEA".equals(s.val(0)) && "WT".equals(s.val(1))) {
          csg.setMassa(s.gs(3).geD(1));

          s = st.next();
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
        }

        nkonGruzMap.add(nkon, csg);
      }

      TreeMap<String, String> nkonNvagMap = new TreeMap<>();
      while ("EQD".equals(s.val(0)) && "RR".equals(s.val(1))) {
        String nvag = s.gs(2).ge(0);

        s = st.next();

        while ("EQA".equals(s.val(0)) && "CN".equals(s.val(1))) {
          String nkon = s.gs(2).ge(0);
          nkonNvagMap.put(nkon, nvag);

          s = st.next();
        }
      }

      while ("EQD".equals(s.val(0)) && "CN".equals(s.val(1))) {
        CimSmgsKonList csk = new CimSmgsKonList();
        csk.setSort((byte)0);
        String nkon = s.gs(2).ge(0);
        csk.setUtiN(nkon);

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

        StringBuilder sel = new StringBuilder();
        while ("SEL".equals(s.val(0))) {
          sel.append(',').append(s.val(1));

          s = st.next();
        }
        if (sel.length() > 0) {
          csk.setPlombs(sel.substring(1));
        }

        if ("FTX".equals(s.val(0))) {
          s = st.next();
        }

        while ("RFF".equals(s.val(0))) {

          s = st.next();
        }

        ArrayList<CimSmgsGruz> gruzList = nkonGruzMap.getMap().get(nkon);
        int j = 0;
        for (CimSmgsGruz item : gruzList) {
          item.setSort(j++);
          csk.addCimSmgsGruzItem(item);
        }

        CimSmgsCarList csc = new CimSmgsCarList();
        csc.setSort((byte)0);
        csc.setNvag(nkonNvagMap.get(nkon));
        csc.addCimSmgsKonListItem(csk);

//        CimSmgs clone = mapper.map(cs, CimSmgs.class);
//        Type docsMapType = new TypeBuilder<Map<Byte, CimSmgsDocs>>(){}.build();
//        clone.setCimSmgsDocses7(mapper.mapAsMap(cs.getCimSmgsDocses7(), docsMapType, docsMapType));
//        clone.setCimSmgsDocses9(mapper.mapAsMap(cs.getCimSmgsDocses9(), docsMapType, docsMapType));
//        clone.setCimSmgsDocses13(mapper.mapAsMap(cs.getCimSmgsDocses13(), docsMapType, docsMapType));
//        Type platelMapType = new TypeBuilder<Map<Byte, CimSmgsPlatel>>(){}.build();
//        clone.setCimSmgsPlatels(mapper.mapAsMap(cs.getCimSmgsPlatels(), platelMapType, platelMapType));

        CimSmgs clone = (CimSmgs) BeanUtils.cloneBean(cs);
        if (kontCount > 1) {
          clone.setSort(scSort++);
        }
        clone.setCimSmgsDocses7(new TreeMap<Byte, CimSmgsDocs>());
        clone.setCimSmgsDocses9(new TreeMap<Byte, CimSmgsDocs>());
        clone.setCimSmgsDocses13(new TreeMap<Byte, CimSmgsDocs>());
        for (CimSmgsDocs csd : docsList) {
          clone.addCimSmgsDocsItem((CimSmgsDocs) BeanUtils.cloneBean(csd));
        }
        clone.setCimSmgsPlatels(new TreeMap<Byte, CimSmgsPlatel>());
        for (CimSmgsPlatel csp : platelList) {
          clone.addCimSmgsPlatelItem((CimSmgsPlatel) BeanUtils.cloneBean(csp));
        }
        clone.setCimSmgsCarLists(new TreeMap<Byte, CimSmgsCarList>());
        clone.addCimSmgsCarListItem(csc);

        if (gruzList.size() == 1) {
          clone.setG23(gruzList.get(0).getKgvn());
        }

        clone.setG24T(new BigDecimal(csk.getTaraKont() != null ? csk.getTaraKont() : 0));

        log.debug(new ToStringBuilder(clone).append(clone).toString());
        csList.add(clone);
      }

      if ("UNT".equals(s.val(0))) {

        s = st.next();
      }

    }

    if ("UNZ".equals(s.val(0))) {
    }
  }

  public String getIftminText() {
    return iftminText;
  }
}
