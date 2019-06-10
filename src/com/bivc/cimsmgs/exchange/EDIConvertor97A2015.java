package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.DocType;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Management;
import org.apache.commons.collections4.bidimap.DualHashBidiMap;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.HibernateException;
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

import static org.apache.commons.lang3.StringUtils.defaultString;
import static org.apache.commons.lang3.StringUtils.isNotBlank;
import static org.apache.commons.lang3.StringUtils.leftPad;

public class EDIConvertor97A2015 extends EDIConvertor {

  private static final Logger log = LoggerFactory.getLogger(EDIConvertor97A2015.class);
  private static final String encoding = "utf-8";
  private static final String folder = "EDI_Failed";

  private static final DualHashBidiMap<String, String> cod2DorMap = new DualHashBidiMap<>();
  private static final DualHashBidiMap<String, Byte> otmksobMap3 = new DualHashBidiMap<>();
  private static final DualHashBidiMap<Byte, String> loadingMap = new DualHashBidiMap<>();

  private ArrayList<CimSmgs> csList = new ArrayList<>();


  static {
    loadingMap.put((byte)1, "4");
    loadingMap.put((byte)2, "1");

    otmksobMap3.put("П", (byte) 3);
    otmksobMap3.put("О", (byte) 2);
    otmksobMap3.put("", null);
  }


  public EDIConvertor97A2015(EdiDir ediDir) throws Exception {
    this.ediDir = ediDir;
    recipient = "GVCMPSRU";
  }

  public EDIConvertor97A2015(String script, EdiDir ediDir) throws Exception {
    super(script, ediDir);
    recipient = "GVCMPSRU";
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
/*
        Query q = session.createQuery("SELECT l.id FROM BIftminLog l WHERE l.dir='O' AND l.cod_dir=:cd AND l.mes_name='IFTMIN' ORDER BY l.hid DESC");
        q.setString("cd", ediDir.getDirName());
        Iterator it = q.iterate();
        if (it.hasNext()) {
          oldId = (String)it.next();
        }
*/

        Date curDate = new Date();
        iftminText = getText(cs, messageId, curDate);

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

  protected String getText(CimSmgs smgsOb, long messageId, Date curDate) throws Exception {
    log.debug("Started");
    String text;
    text =  "UNB+UNOA:1+DBWGR::HOST+" + format(recipient, 35) + "::HOST+" +
            format(new SimpleDateFormat("yyMMdd").format(curDate), 6) + ":" + format(new SimpleDateFormat("HHmm").format(curDate), 4) + "+" +
            format(String.valueOf(messageId), 14) + "++IFTMIN_DBWGR++++1" + nl;
    text += "UNH+" + format(String.valueOf(messageId), 14) + "+IFTMIN:D:97A:UN:OSJD" + nl;
    Object oldId = null /*smgsOb.getIftminId()*/;
    Byte typeOb = smgsOb.getType();
    boolean isSmgs = typeOb != null && typeOb.intValue() == DocType.SMGS.getType();
    String g693 = StringUtils.trimToNull(smgsOb.getG693());
    text += "BGM+" + (isSmgs ? "722" : "701" ) + "+" +
            (g693 != null ? format(g693, 4) + "-" : "") + format(smgsOb.getG694(), 30) + "+" + (oldId == null ? "9" : "4") + nl;
    Date d = isSmgs ? smgsOb.getG281() : smgsOb.buildG16Date();        // fucking developers
    text += "DTM+143:" + format(EDIDateFormat.DF203.format(d), 35) + ":203" + nl;
//    d = smgsOb.getG281(); for CIM/SMGS
//    text += "DTM+137:" + format(EDIDateFormat.DF203.format(d), 35) + ":203" + nl;
    text += "TSR++" + format(loadingMap.get(smgsOb.getG22()), 3) + nl;

    if (isSmgs) {
      text += "FTX+DCL+++" + format(smgsOb.getZayav_otpr(), 70, 5) + nl;
    }
    else {
      Map<Integer, CimSmgsDocs> csd7 = smgsOb.getCimSmgsDocses7();
      for (CimSmgsDocs csdOb : csd7.values()) {
        String s = csdOb.getText();
        if (StringUtils.isNotBlank(s) || StringUtils.isNotBlank(csdOb.getNdoc()))
          text += "FTX+DCL+" + format(csdOb.getCode(), 3) + "+" + format(csdOb.getNdoc(), 17) + "+" + format(s, 70, 5) + nl;
      }
    }

    text += "FTX+ICN+++" + format(StringUtils.isBlank(smgsOb.getG15r()) ? smgsOb.getG15() : smgsOb.getG15r(), 70, 5)  + nl;

    /** @todo Навести порядок со переходными станциями */
    String rqrStr = "";
    Map<Integer, CimSmgsDocs> csd13 = smgsOb.getCimSmgsDocses13();
    for (CimSmgsDocs csdOb : csd13.values()) {
      String code = csdOb.getCode();
      String txt = csdOb.getText();
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
      if (isNotBlank(txt)) {
        if (isSmgs && "1".equals(code)) {
          rqrStr += "/" + txt;
        }
        else {
          if ("6".equals(code)) {
            rqrStr = txt;
            break;
          }
        }
      }
    }
    if (isSmgs && rqrStr.length() > 0)
      rqrStr = rqrStr.substring(1);
    text += "FTX+RQR+++" + format(rqrStr, 70, 5) + nl;

    if (isSmgs && isNotBlank(smgsOb.getG28()))
      text += "FTX+TRA+++" + format(smgsOb.getG28(), 70, 5) + nl;


    /** @todo Заполнить коды документов в справочнике */
    ArrayList<CimSmgsDocs> csd9 = new ArrayList<>( smgsOb.getCimSmgsDocses9().values());
    text += createPrilDoc(csd9, 0);

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
    if (isNotBlank(smgsOb.getG26())) {
      text += "FTX+AAH+++" + format(smgsOb.getG26(), 70, 5) + nl;
    }

    text += "TDT+21++2" + nl;
/*
* Станция отправления
*  g_17_1     код администрации   (В СМГС не проставляется)
*  G16_3(r)   краткое наименование администрации
*  g_17       код станции    (В СМГС g_69_2)
*  g_16_2(r)  наименование станции
*
* Станция назначения
*  g_12       код администрации   (В СМГС не проставляется)
*  g_10_2(r)  краткое наименование администрации
*  g_12_1     код станции
*  g_10_1(r)  наименование станции
*/
    String diro = smgsOb.getG171();
    String ksto = smgsOb.getG17();
    if (StringUtils.isBlank(diro) && StringUtils.isBlank(ksto)) {
      diro = smgsOb.getG691();
      ksto = smgsOb.getG692();
    }
    text += "LOC+5+" + StringUtils.leftPad(format(diro, 2), 2, '0') + StringUtils.leftPad(format(ksto, 23), 6, '0') +
            ":37:288:" + format(smgsOb.getG162r(), 70) + "+" + format(smgsOb.getG163r(), 70) + nl;
    text += "LOC+8+" + StringUtils.leftPad(format(smgsOb.getG12(), 2), 2, '0') + StringUtils.leftPad(format(smgsOb.getG121(), 23), 6, '0') +
            ":37:288:" + format(smgsOb.getG101r(), 70) + "+" + format(smgsOb.getG102r(), 70) + nl;

    boolean first = true;
    for (CimSmgsDocs csdOb : csd13.values()) {
      String code = csdOb.getCode();
      if (isSmgs && "1".equals(code)) {
        text += "LOC+" + (first ? "17" : "42") + "+" + StringUtils.leftPad(format("", 2), 2, '0') + StringUtils.leftPad(format(csdOb.getText(), 23), 6, '0') +
                ":37:288:" + format(csdOb.getText2(), 70) + nl;
        if (first)
          first = false;
      }
    }

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

    text += "NAD+CZ+" + format(notd_kod, 35) + ":Z00++" + format(notd_naim, 35, 5) + "+" + format(notda_ul, 35, 4) + "+" + format(notda_g, 35) + "+" +
            format(notda_r, 9) + "+" + format(notda_i, 9) + "+" + format(notd_strn, 3) + nl;

    if (isNotBlank(smgsOb.getG14()))
      text += "CTA+EB+:" + format(smgsOb.getG14(), 35) + nl;

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

    text += createPrilDoc(csd9, 9);

    int docIdx = 2;
    while (9 * docIdx < csd9.size()) {
      text += "NAD+CZ" + nl;
      text += createPrilDoc(csd9, 9 * docIdx);
      docIdx++;
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

    text += "NAD+CN+" + format(npol_kod, 35) + ":Z00++" + format(npol_naim, 35, 5) + "+" + format(npola_ul, 35, 4) + "+" + format(npola_g, 35) + "+" +
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
      /** @todo Дополнить базу наименованием и кодоп перевозчика */
      text += "NAD+GS+" + format(csp.getKplat() +
                      (StringUtils.isNotBlank(csp.getKplat1()) ? "/" + csp.getKplat1() : "") +
                      (StringUtils.isNotBlank(csp.getKplat2()) ? "/" + csp.getKplat2() : "") +
                      (StringUtils.isNotBlank(csp.getKplat3()) ? "/" + csp.getKplat3() : ""),
              35) + ":Z00++" +
              format(csp.getPlatR(), 35, 5) + nl;
    }

    for (CimSmgsPerevoz perevoz : smgsOb.getCimSmgsPerevoz().values()) {
      text += "NAD+CA+" + format(perevoz.getCodePer(), 35) + ":Z13" + "++" + format(perevoz.getNamPer(), 35) + nl;
      text += "LOC+32+" + leftPad(format(perevoz.getAdmStBeg(), 2), 2, '0') + leftPad(format(perevoz.getCodStBeg(), 23), 6, '0') +
              ":37:288:" + format(perevoz.getStBeg(), 70) + nl;
      text += "LOC+56+" + leftPad(format(perevoz.getAdmStEnd(), 2), 2, '0') + leftPad(format(perevoz.getCodStEnd(), 23), 6, '0') +
              ":37:288:" + format(perevoz.getStEnd(), 70) + nl;
    }

    boolean isKont = smgsOb.isContOtpr();
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

    boolean isGroup = smgsOb.isGroupContOtpr();
    boolean isManyGruz = !isGroup && gruzList.size() > 1;
    Integer placesTotal = 0;
    if (isGroup) {
      for (CimSmgsGruz csgOb : gruzList) {
        Integer places = csgOb.getPlaces();
        if (places != null)
          placesTotal += places;
      }
    }

    int gidCount = 1;
    for (CimSmgsGruz csgOb : gruzList) {
      /** @todo Нужен код упаковки */
      text += "GID+" + format(gidCount++, 5) + "+" + format(isManyGruz ? placesTotal : csgOb.getPlaces(), 8) + ":" + format("", 17) + ":::" + format(csgOb.getUpak(), 35) + nl;
      /** @todo Нужены страна отправления и назначения */
//      text += "LOC+35+" + format(epdOb.getNsto().getDor().getCountry_code(), 25) + ":162:5" + nl;
//      text += "LOC+28+" + format(epdOb.getNstn().getDor().getCountry_code(), 25) + ":162:5" + nl;
      text += "PIA+5+" + format(csgOb.getKgvn(), 35) + ":HS::12" + nl;
      text += "PIA+5+" + format(csgOb.getEkgvn(), 35) + ":ET::288" + nl;
      text += "FTX+AAA+++" + format(csgOb.getNzgr(), 70, 5) + nl;
      text += "FTX+IRP+++" + format(smgsOb.getGs_48(), 70, 5) + nl;

      if (isGroup) {
        BigDecimal mnet = smgsOb.getG24N() == null ? BigDecimal.ZERO : smgsOb.getG24N();
        text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
        BigDecimal mbrt = smgsOb.getG24B() == null ? BigDecimal.ZERO : smgsOb.getG24B();
        text += "MEA+AAH+G+KGM:" + format(mbrt.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
      }
      else if (!isManyGruz) {
        BigDecimal mnet = csgOb.getMassa();
        if (mnet == null || BigDecimal.ZERO.compareTo(mnet) == 0) {
          if (isKont) {
            mnet = csgOb.getCimSmgsKonList().getMassSend();
          }
          else {
            Long val = csgOb.getCimSmgsCarList().getMassSend();
            if (val != null)
              mnet = new BigDecimal(val);
          }
        }
        if (mnet == null || BigDecimal.ZERO.compareTo(mnet) == 0) {
          mnet = smgsOb.getG24N();
        }
        if (mnet == null) {
          mnet = BigDecimal.ZERO;
        }
        text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;

        if (isKont) {
          BigDecimal mbrt = csgOb.getCimSmgsKonList().getMassCalc();
          if (mbrt == null || BigDecimal.ZERO.compareTo(mbrt) == 0) {
            mbrt = smgsOb.getG24B();
          }
          if (mbrt == null) {
            mbrt = BigDecimal.ZERO;
          }
          text += "MEA+AAH+G+KGM:" + format(mbrt.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
        }
      }
      else if (isManyGruz) {
        BigDecimal mnet = csgOb.getMassa();
        if (mnet == null) {
          mnet = BigDecimal.ZERO;
        }
        text += "MEA+WT+G+KGM:" + format(mnet.setScale(3, BigDecimal.ROUND_HALF_UP), 18) + nl;
      }

      //if (new Byte((byte)1).equals(smgsOb.getG22())) {
      Collection<CimSmgsDanGruz> dangList = csgOb.getCimSmgsDanGruzs().values();
      if (dangList.size() > 0) {
        CimSmgsDanGruz dangOb = dangList.iterator().next();
        /** @todo Разделить знак опасности на над и под чертой */
        text += "DGS+RID+" + format(dangOb.getEmergenC(), 7) + "+" + format(dangOb.getNumOon(), 4) + "++" + format(dangOb.getGroupPack(), 3) + "++++" + format(dangOb.getCodDanger(), 4) +
                "+" + format(dangOb.getDangSign(), 4) /*+ ":" + format(gruz.getDangnomd(), 4)*/ + nl;
        text += "FTX+AAD+++" + format(dangOb.getCarDName(), 70, 5) + nl;
        if (isNotBlank(dangOb.getDopInfo()))
          text += "FTX+AAC+++" + format(dangOb.getDopInfo(), 70, 5) + nl;
      }

      if (isGroup)
        break;
    }

    if (isKont) {
      ArrayList<CimSmgsKonList> kontList = new ArrayList<>();
      for (CimSmgsCarList cscOb : smgsOb.getCimSmgsCarLists().values()) {
        kontList.addAll(cscOb.getCimSmgsKonLists().values());
      }

      for (CimSmgsKonList cskOb : kontList) {
        BigDecimal mnet = (cskOb.getMassSend() == null || cskOb.getMassSend().compareTo(BigDecimal.ZERO) == 0) ? calcMassSend(cskOb.getCimSmgsGruzs().values()) : cskOb.getMassSend();
        boolean isEmpty = BigDecimal.ZERO.compareTo(mnet) == 0;

        CimSmgsCarList cscOb = cskOb.getCimSmgsCarList();
        text += "EQD+RR+" + format(normNvagNkonStr(cscOb.getNvag()), 17) + "++++" + format("5", 3) + nl;
        text += "MEA+WT+T+KGM:" + format(cscOb.getTaraVag(), 18) + nl;
        text += "MEA+AAI+T+KGM:" + format(cskOb.getTaraKont(), 18) + nl;

        BigDecimal brutto = cskOb.getMassCalc();
        if (brutto == null || brutto.compareTo(BigDecimal.ZERO) == 0) {
          if (!isGroup) {
            brutto = cscOb.getCimSmgs().getG24B();
          }
          else {
            if (cskOb.getTaraKont() != null) {
              brutto = mnet.add(new BigDecimal(cskOb.getTaraKont()));
            }
          }
        }
        if (brutto == null)
          brutto = BigDecimal.ZERO;
        text += "MEA+AAE+G+KGM:" + format(brutto.setScale(0, BigDecimal.ROUND_HALF_UP), 18) + nl;

        text += "MEA+SV++TNE:" + format(cscOb.getGrPod(), 18) + nl;
        text += "МЕА+NAX++PCE:" + format(cscOb.getKolOs(), 18) + nl;

        if (isGroup) {
          text += "MEA+WT+AAD+KGM:" + format(mnet.setScale(0, BigDecimal.ROUND_HALF_UP), 18) + nl;
        }

        for (CimSmgsPlomb plomb : cskOb.getCimSmgsPlombs().values()) {
          Short kpl = plomb.getKpl();
          if (kpl == null)
            kpl = 1;

          for (int k = 0; k < kpl; k++) {
            text += "SEL+" + format(plomb.getZnak(), 10) + nl;
          }
        }

        text += "FTX+TDT+++" + format(defaultString(cskOb.getUtiType()) + (cskOb.getGrpod() != null ? " (" + cskOb.getGrpod() + ")" : ""), 70, 5) + nl;

        text += "NAD+CW+" + format(cskOb.getKodSob(), 2) + "/" + format(otmksobMap3.getKey(cskOb.getOtmKSob()), 1) + ":36:12++" + format(cscOb.getKlientName(), 35, 5) + nl;
        text += "EQA+CN+" + format(normNvagNkonStr(cskOb.getUtiN()), 17) + "/" + format(cskOb.getUtiType(), 4) + ":::" + (isEmpty ? "4" : "5") + nl;
      }

    }
    else { //if (isKont)
      for (CimSmgsCarList cscOb : smgsOb.getCimSmgsCarLists().values()) {
        Long mnet = (cscOb.getMassSend() == null || cscOb.getMassSend() == 0) ? calcMassSend(cscOb.getCimSmgsGruzs().values()).longValue() : cscOb.getMassSend();
        boolean isEmpty = mnet == 0;

        text += "EQD+RR+" + format(normNvagNkonStr(cscOb.getNvag()), 17) + "+" + format(cscOb.getCicternType(), 10) + "+++" + format(isEmpty ? "4" : "5", 3) + nl;
        BigDecimal tara = cscOb.getTaraVag();
        text += "MEA+WT+T+KGM:" + format(tara, 18) + nl;
        text += "MEA+SV++TNE:" + format(cscOb.getGrPod(), 18) + nl;
        text += "МЕА+NAX++PCE:" + format(cscOb.getKolOs(), 18) + nl;

        if (isGroup) {
          text += "MEA+WT+AAD+KGM:" + format(mnet, 18) + nl;
        }

        for (CimSmgsPlomb plomb : cscOb.getCimSmgsPlombs().values()) {
          Short kpl = plomb.getKpl();
          if (kpl == null)
            kpl = 1;

          for (int k = 0; k < kpl; k++) {
            text += "SEL+" + format(plomb.getZnak(), 10) + nl;
          }
        }

        text += "NAD+CW+" + format(cscOb.getKodSob(), 2) + "/" + format(otmksobMap3.getKey(cscOb.getOtmKSob()), 1) + ":36:12++" + format(cscOb.getKlientName(), 35, 5) + nl;
      }
    }

    text += "UNT+" + format(String.valueOf(new StringTokenizer(text, nl).countTokens()), 6) + "+" + format(String.valueOf(messageId), 14) + nl;
    text += "UNZ+1+" + format(String.valueOf(messageId), 14) + nl;

    log.debug("Completed");
    return text;
  }

  private String createPrilDoc(ArrayList<CimSmgsDocs> csd, int bgnIdx) {
    String text = "";
    for (int j = bgnIdx; j < Math.min(bgnIdx + 9, csd.size()); j++) {
      CimSmgsDocs csdOb = csd.get(j);
      Date d = csdOb.getDat();
      text += "DOC+" + format(csdOb.getCode(), 3) + ":::" + format(csdOb.getText(), 35) + "+" + format(csdOb.getNdoc(), 35) + ":2:" + format(d != null ? ddoc.format(d) : "", 35)  + nl;
    }
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

  }

  public String getIftminText() {
    return iftminText;
  }
}
