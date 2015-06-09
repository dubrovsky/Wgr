package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Sta;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.opc.OPCPackage;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.dom4j.Document;
import org.dom4j.Node;
import org.dom4j.io.SAXReader;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AvisoLoader {

    private static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss"); // 2009-04-29T14:42:24
    private static final SimpleDateFormat dateFormater = new SimpleDateFormat("yyyy-MM-dd");
    private static final SimpleDateFormat dateFormater2 = new SimpleDateFormat("dd.MM.yyyy");
    private static final SimpleDateFormat dateTimeFormater1 = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
    private static Pattern kst = Pattern.compile("[0-9]{5}");
    private static Pattern prin_nkon = Pattern.compile("[a-zA-Z]{4}\\s*\\d{6}-*\\d");
    final static private Logger log = LoggerFactory.getLogger(AvisoLoader.class);

    public AvisoLoader() {
    }

    public PackDoc loadXML(File file, String un, String trans, Route route, UsrGroupsDir usrgrdir, BigDecimal docType, byte type, String gu) throws Exception {
        Date d = new Date();

        PackDoc pd = null;

        try {
            SAXReader reader = new SAXReader(false);
            Document doc = reader.read(file);
            Node root = doc.selectSingleNode("/_x0023_TK_NaklInstruction");

            CimSmgs cs = new CimSmgs();
            cs.setRoute(route);
            cs.setType(type);
            cs.setDattr(d);
            cs.setUn(un);
            cs.setTrans(trans);
            cs.setG25((byte) 2);
            cs.setTbcStatus((byte) 0);
            cs.setDocType1(docType);
            if(gu != null && gu.length() > 0){
                cs.setGu(new Byte(gu));
            }
//            cs.setKontStatus((byte)2);

            cs.setG1r(root.valueOf("Inst_LoadFromTitle"));
            cs.setG19r(root.valueOf("Inst_LoadFromAddress"));
            cs.setG2(root.valueOf("Inst_LoadFromOKPO"));
            cs.setG4r(root.valueOf("Inst_LoadToTitle"));
            cs.setG49r(root.valueOf("Inst_LoadToAddress"));
            cs.setG5(root.valueOf("Inst_LoadToOKPO"));

            cs.setAviso_num(root.valueOf("Inst_InstNumber"));
            String datStr = root.valueOf("Inst_InstDate");
            if (StringUtils.isNotBlank(datStr)) {
                try {
                    cs.setAviso_dat(dateFormater2.parse(datStr.trim()));
                } catch (ParseException ignored) {
                }
            }

            datStr = root.valueOf("Inst_TransEndPeriod");
            if (StringUtils.isNotBlank(datStr)) {
                try {
                    cs.setAviso_cod_dat(dateFormater2.parse(datStr.trim()));
                } catch (ParseException ignored) {
                }
            }

            String ksto = root.valueOf("Inst_StationFromCode");
            Sta sta = loadSta(ksto);
            if (sta != null) {
                cs.setG171(sta.getManagement().getManagNo());
                cs.setG691(sta.getManagement().getManagNo());
                cs.setG17(sta.getStaNo().trim());
                cs.setG692(sta.getStaNo().trim());
                cs.setG162r(sta.getStaName());
                cs.setG162(sta.getStaName());
                cs.setG163r(sta.getRoad().getRoadName());
                cs.setG_16_33r(sta.getManagement().getMNameRus());
            }
            else {
                String nsto = root.valueOf("Inst_StationFromTitle");
                cs.setG162r(nsto);
                cs.setG162(nsto);
            }

            String kstn = root.valueOf("Inst_StationToCode");
            sta = loadSta(kstn);
            if (sta != null) {
                cs.setG12(sta.getManagement().getManagNo());
                cs.setG121(sta.getStaNo().trim());
                cs.setG101r(sta.getStaName());
                cs.setG102r(sta.getRoad().getRoadName());
                cs.setG_10_3r(sta.getManagement().getMNameRus());
            }

            long kol = 0;
            String kolStr = root.valueOf("Inst_WagKontQnt");
            try {
                kol = Long.parseLong(kolStr);
            } catch (NumberFormatException nfex) {
            }
            cs.setAmount(kol);

            ArrayList<String> konList = new ArrayList<String>((int) kol);
            String konStr = root.valueOf("Inst_Comment");
            Matcher m = prin_nkon.matcher(konStr);
            while (m.find()) {
                konList.add(m.group());
            }
            String[] konArr = konList.toArray(new String[konList.size()]);

            CimSmgsGruz gruz = new CimSmgsGruz();
            gruz.setSort(0);
            gruz.setEnzgr(root.valueOf("Inst_LoadETSNGTitle"));
            gruz.setEkgvn(root.valueOf("Inst_LoadETSNGCode"));
            gruz.setNzgr(root.valueOf("Inst_LoadGNGTitle"));
            gruz.setKgvn(root.valueOf("Inst_LoadGNGCode"));

            CimSmgsKonList kon = new CimSmgsKonList();
            kon.setSort((byte) 0);
            kon.setUtiN(Utils.ge(konArr, 0));
            String vid = root.valueOf("Inst_WagonKontTypeShortTitle");
            if (StringUtils.isNotBlank(vid)) {
              vid = StringUtils.substringAfter(vid, "-");
              kon.setVid(vid);
            }
            kon.addCimSmgsGruzItem(gruz);

            CimSmgsCarList vag = new CimSmgsCarList();
            vag.setSort((byte) 0);
            vag.addCimSmgsKonListItem(kon);

            cs.addCimSmgsCarListItem(vag);

            for (int i = 1; i < konArr.length; i++) {
                vag = new CimSmgsCarList();
                vag.setSort((byte) i);
                kon = new CimSmgsKonList();
                kon.setSort((byte) 0);
                kon.setUtiN(konArr[i]);
                vag.addCimSmgsKonListItem(kon);
                cs.addCimSmgsCarListItem(vag);
            }

            String s1 = root.valueOf("Inst_PayAccountCode");
            String s2 = StringUtils.trimToEmpty(root.valueOf("Inst_TransAccount"));
            String s3 = StringUtils.trimToEmpty(root.valueOf("Inst_CodeKontragent"));
            if (StringUtils.isNotBlank(s1)) {
                CimSmgsPlatel csp = new CimSmgsPlatel();
                csp.setSort((byte) 0);

                String s = s1 + (StringUtils.isNotEmpty(s1) && StringUtils.isNotEmpty(s3) ? "/" : "") + s3;
                csp.setKplat(s);
                csp.setKplat1(s2);
                csp.setPlatR("");

                cs.addCimSmgsPlatelItem(csp);
            }
//            s2 = StringUtils.removeStart(s2, "00");
//            s2 = StringUtils.removeEnd(s2, "0");
//            s2 = StringUtils.substring(s2, 2, 9);
            cs.setZakazNo(StringUtils.trimToEmpty(root.valueOf("Inst_TransNumber")));

            cs.setG4prim(root.valueOf("Inst_AdditionData4"));
            cs.setG15(root.valueOf("Inst_AdditionData6"));
            cs.setG26(root.valueOf("Inst_AdditionData26"));

            pd = new PackDoc();
            pd.setRoute(route);
            pd.setUsrGroupsDir(usrgrdir);
            pd.addCimSmgsItem(cs);

            HibernateUtil.getSession().save(pd);

            /*KontStatus status = new KontStatus();
            status.setDatBegin(d);
            status.setPackDoc(pd);
            status.setStatusDir(new StatusDir(new BigDecimal(2)));
            status.setCimSmgs(cs);
            status.setDocDir((DocDir)HibernateUtil.getSession().load(DocDir.class, type));
            Usr usr = new Usr();
            usr.setUn(un);
            status.setUsr(usr);
            HibernateUtil.getSession().save(status);*/

        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
        }

        return pd;
    }

    public PackDoc load(String fileName, String un, String trans, Route route, UsrGroupsDir usrgrdir) throws Exception {
        Date d = new Date();

        PackDoc pd = null;
        OPCPackage pkg = null;

        try {
            pkg = OPCPackage.open(fileName);
            XSSFWorkbook wb = new XSSFWorkbook(pkg);
//            XSSFWorkbook wb = new XSSFWorkbook(fileName);
            Sheet sheet = wb.getSheetAt(0);

            long kol = 1;
            String kolStr = sheet.getRow(4).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            String xStr = "количестве";
            int x = kolStr.indexOf(xStr);
            if (x >= 0) {
                kolStr = kolStr.substring(x + xStr.length()).trim();
                kolStr = Utils.ge(kolStr.split(" "), 0);
                try {
                    kol = Long.parseLong(kolStr);
                } catch (NumberFormatException nfex) {
                }
            }

            CimSmgs cs = new CimSmgs();
            cs.setRoute(route);
            cs.setType((byte) 3);
            cs.setDattr(d);
            cs.setUn(un);
            cs.setTrans(trans);
            cs.setAmount(kol);
            cs.setG25((byte) 2);
            cs.setTbcStatus((byte) 0);
            cs.setKind(0);

            String head = sheet.getRow(1).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            if (StringUtils.isNotBlank(head)) {
                String numStr = StringUtils.substringBetween(head, "№", "Дата");
                if (StringUtils.isNotBlank(numStr)) {
                    cs.setAviso_num(numStr.trim());
                }
                String datStr = StringUtils.substringAfter(head, "Дата:");
                if (StringUtils.isNotBlank(datStr)) {
                    try {
                        cs.setAviso_dat(dateFormater2.parse(datStr.trim()));
                    } catch (ParseException pex) {
                    }
                }
            }

            head = sheet.getRow(20).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            if (StringUtils.isNotBlank(head)) {
                String datStr = StringUtils.substringBetween(head, "до ", "г.");
                if (StringUtils.isNotBlank(datStr)) {
                    try {
                        cs.setAviso_cod_dat(dateFormater2.parse(datStr.trim()));
                    } catch (ParseException pex) {
                    }
                }
            }

            head = sheet.getRow(3).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            Matcher m = kst.matcher(head);
            if (m.find()) {
                String ksto = m.group();
                Sta sta = loadSta(ksto);
                if (sta != null) {
                    cs.setG171(sta.getManagement().getManagNo());
                    cs.setG691(sta.getManagement().getManagNo());
                    cs.setG17(sta.getStaNo().trim());
                    cs.setG692(sta.getStaNo().trim());
                    cs.setG162r(sta.getStaName());
                    cs.setG162(sta.getStaName());
                }
            }
            if (m.find()) {
                String kstn = m.group();
                Sta sta = loadSta(kstn);
                if (sta != null) {
                    cs.setG12(sta.getManagement().getManagNo());
                    cs.setG121(sta.getStaNo().trim());
                    cs.setG101r(sta.getStaName());
                    cs.setG102r(sta.getRoad().getRoadName());
                    cs.setG_10_3r(sta.getManagement().getMNameRus());
                }
            }

            cs.setG1r(cleanStr(sheet.getRow(6).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue()));
            cs.setG4r(cleanStr(sheet.getRow(8).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue()));

            String nzps = cleanStr(sheet.getRow(10).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue());
            if (StringUtils.isNotBlank(nzps)) {
                CimSmgsDocs csd = new CimSmgsDocs();
                csd.setCode("1");
                csd.setFieldNum("13");
                csd.setSort((byte) 0);
                csd.setText(nzps);
                cs.addCimSmgsDocsItem(csd);
            }

            cs.setG101r(cleanStr(sheet.getRow(12).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue()));

            CimSmgsGruz csg = null;
            String etsng = null;
            String gng = null;
            String nzgr = null;
            String gruzStr = sheet.getRow(14).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            if (gruzStr != null && gruzStr.length() > 0) {
                String[] gruzEl = gruzStr.split("[ \\-,]");
                int etsngIdx = ArrayUtils.indexOf(gruzEl, "ЕТСНГ");
                if (etsngIdx >= 0) {
                    etsng = Utils.ge(gruzEl, etsngIdx + 1);
                    nzgr = gruzStr.substring(0, gruzStr.indexOf("ЕТСНГ")).replaceAll("-", "").trim();
                }
                int gngIdx = ArrayUtils.indexOf(gruzEl, "ГНГ");
                if (gngIdx >= 0) {
                    gng = Utils.ge(gruzEl, gngIdx + 1);
                }

                csg = new CimSmgsGruz();
                csg.setSort(0);
                csg.setKgvn(gng);
                csg.setEkgvn(etsng);
                csg.setNzgr(nzgr);
            }
            if (csg != null) {
                CimSmgsKonList csk = new CimSmgsKonList();
                csk.setSort((byte) 0);
                csk.addCimSmgsGruzItem(csg);

                CimSmgsCarList csc = new CimSmgsCarList();
                csc.setSort((byte) 0);
                csc.addCimSmgsKonListItem(csk);

                cs.addCimSmgsCarListItem(csc);
            }

            String platStr = sheet.getRow(16).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue();
            if (platStr != null && platStr.length() > 0) {
                CimSmgsPlatel csp = new CimSmgsPlatel();
                csp.setSort((byte) 0);

                int i1 = platStr.indexOf("Оплата по ");
                int i2 = platStr.indexOf(" производится через ");
                String dor = platStr.substring(i1 + 10, i2);
                csp.setDorR(dor);

                platStr = platStr.substring(i2 + 20);
                int i3 = platStr.indexOf(" через");
                int i4 = platStr.indexOf(",");
                String plat = null;
                String prim = null;
                if (i3 >= 0) {
                    plat = platStr.substring(0, i3);
                    prim = platStr.substring(i3 + 6, Math.min(i4, platStr.length()));
                } else if (i4 >= 0) {
                    plat = platStr.substring(0, i4);
                }
                csp.setPlatR(plat);
                csp.setPrimR(prim);

                int i5 = platStr.indexOf("код плательщика ");
                if (i5 >= 0) {
                    csp.setKplat(platStr.substring(i5 + 16).replaceAll("[\\.,;]", ""));
                }

                cs.addCimSmgsPlatelItem(csp);
            }

            cs.setG15(cleanStr(sheet.getRow(18).getCell(0, Row.CREATE_NULL_AS_BLANK).getStringCellValue()));

            pd = new PackDoc();
            pd.setRoute(route);
            pd.setUsrGroupsDir(usrgrdir);
            pd.addCimSmgsItem(cs);

//            if (kol > 1) {
//              BeanTransformerSpi t = new BeanTransformer().initPropertyFilter(new AvisoPropertyFilter());
//              for (int i = 1; i < kol; i++ ) {
//                CimSmgs ob = new BeanReplicator(t).replicateBean(cs);
//
//                ob.addCimSmgsDocses7();
//                ob.addCimSmgsDocses9();
//                ob.addCimSmgsDocses13();
//
//                ob.addCimSmgsCarLists();
//
//                ob.addCimSmgsPlatels();
//
//                pd.addCimSmgsItem(ob);
//              }
//            }

            HibernateUtil.getSession().save(pd);

        } catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            throw ex;
//      if (tx != null)
//        tx.rollback();
//      if (session != null)
//        session.clear();
        }
        finally {
            pkg.close();
        }

        return pd;
    }

    private Sta loadSta(String kst) {
        Sta sta = null;
        if  (StringUtils.isNotBlank(kst)) {
        @SuppressWarnings("unchecked")
        List<Sta> list = HibernateUtil.getSession().createCriteria(Sta.class).add(Restrictions.like("staNo", kst, MatchMode.START)).list();
        Iterator<Sta> it = list.iterator();
        if (it.hasNext()) {
            sta = it.next();
        }
        }
        return sta;
    }

    private String cleanStr(String str) {
        String res = null;
        if (str != null) {
            res = str.trim();
            if (res.startsWith("-")) {
                res = res.substring(1).trim();
            }
        }
        return res;
    }

//    class AvisoPropertyFilter implements PropertyFilter {
//        public boolean propagate(String propertyName, Method eaderMethod) {
//           return
//                        !"route".equals(propertyName) &&
//                        !"packDoc".equals(propertyName) &&
//                        !"cimSmgs".equals(propertyName) &&
//                        !"cimSmgsCarList".equals(propertyName) &&
//                        !"cimSmgsKonList".equals(propertyName) &&
//                        !"cimSmgses".equals(propertyName) &&
//                        !"csComnt".equals(propertyName) &&
//                        !"BIftminLogs".equals(propertyName);
////                    return
////                        (readerMethod.getReturnType() != Route.class) &&
////                        (readerMethod.getReturnType() != PackDoc.class);
//                }
//    }

//      public static void main(String[] args) {
//        try {
//            HibernateUtil.beginTransaction();
//            AvisoLoader avisoLoader = new AvisoLoader();
//
//            File f = new File(args[0]);
////            File[] files = f.listFiles();
//
////            for (int i = 0; i < files.length; i++) {
////                log.info("Loading file " + files[i]);
////                avisoLoader.load(files[i].getAbsolutePath(), "transinform-01", "1264", null, null);
//                avisoLoader.load(f.getAbsolutePath(), "transinform-01", "1264", null, null);
////            }
//
//              HibernateUtil.commitTransaction();
//        } catch (Exception ex) {
//            log.error(ex.getMessage(), ex);
//        }
//
//    }
}
