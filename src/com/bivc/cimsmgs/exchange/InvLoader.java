package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.TreeMap;

public class InvLoader {

  final static private Logger log = LoggerFactory.getLogger(InvLoader.class);
  public static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
  public static final SimpleDateFormat dateFormater = new SimpleDateFormat("dd.MM.yyyy");
  public static final SimpleDateFormat dateTimeFormater_slash = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  public static final SimpleDateFormat dateFormater_slash = new SimpleDateFormat("dd/MM/yyyy");
  public static final DecimalFormat invFormat = new DecimalFormat("0000000");

  private TreeMap<String, ArrayList<CimSmgsInvoice>> invMap = null;
  private String[] n_poezd;

  public InvLoader(InputStream is) throws Exception {
    log.debug("Start");
    try {
      Workbook wb = WorkbookFactory.create(is);
      Sheet sheet = wb.getSheetAt(0);

      n_poezd = getStrVal(sheet, 1, "AA").split(",");

      invMap = new TreeMap<String, ArrayList<CimSmgsInvoice>>();
      int j = 1;
      int lastRow = sheet.getLastRowNum() + 1;
      while (++j <= lastRow) {
        String nkon = getStrVal(sheet, j, "H");
        if (nkon.length() > 0) {
          CimSmgsInvoice inv = new CimSmgsInvoice();

          inv.setNotd("АДАМПОЛЬ АО");
          inv.setCountry_o("PL");
          inv.setZip_o("21-521");
          inv.setCity_o("Засьтянки ок. Белостока");
          inv.setAdres_o("ул. Услугова, 3");

          inv.setNpol("\"ООО \"ФОРД СОЛЛЕРС ЕЛАБУГА");
          inv.setCountry_p("RU");
          inv.setZip_p("423600");
          inv.setCity_p("г. Елабуга");
          inv.setAdres_p("Елабужский муниципальный р-н, терр ОЭЗ \"Алабуга\" , ул. Ш-2, корп. 1/1");

          inv.setDocType("Инвойс");
          inv.setUtiN(nkon);
          inv.setInvoice(invFormat.format(getNumVal(sheet, j, "B")));
          inv.setDat_inv(getDateVal(sheet, j, "C"));
          inv.setCux(getStrVal(sheet, j + 1, "Y"));
          CimSmgsInvoiceGruz gruz = new CimSmgsInvoiceGruz();
          gruz.setMnet(getNumVal(sheet, j, "E").setScale(3, BigDecimal.ROUND_HALF_UP));
          gruz.setMbrt(getNumVal(sheet, j, "F").setScale(3, BigDecimal.ROUND_HALF_UP));
          gruz.setItogo(getNumVal(sheet,j, "J").setScale(2, BigDecimal.ROUND_HALF_UP).toString());
          gruz.setKolm(getNumVal(sheet, j, "K"));

          boolean hasBody = false;
          while (getStrVal(sheet, ++j, "Q").length() > 0) {
            if (!hasBody) {
              String kgvn = getStrVal(sheet, j, "S");
              if (kgvn.startsWith("87071090")) {
                hasBody = true;
              }
            }
          }
          gruz.setKole(getNumVal(sheet, j, "P"));

          if (hasBody) {
            gruz.setTnved("87071000");
            gruz.setNzgr("Кузова в сборе для промышленной сборки автомобилей в комплекте с запчастями согласно прилагаемому счету");
          }
          else {
            gruz.setTnved("87089900");
            gruz.setNzgr("Части и принадлежности для промышленной сборки автомобилей согласно прилагаемому счету");
          }

          gruz.setNzyp("УПАКОВКА");
          gruz.setKypk("РК");
          gruz.setCus_edizm("ШТ");
          gruz.setType("Груз");

          inv.addInvoiceGruzItem(gruz);

          ArrayList<CimSmgsInvoice> list = invMap.get(nkon);
          if (list != null) {
            list.add(inv);
          }
          else {
            list = new ArrayList<CimSmgsInvoice>();
            list.add(inv);
            invMap.put(nkon, list);
          }
        }
      }
      log.debug("Create " + invMap.size() + " kont");
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      throw new Exception("Неверный формат файла");
    }

  }

  public CimSmgsInvoice[] makeInvoices(CimSmgs cs) {
    CimSmgsCarList vag;
    CimSmgsKonList kont;
//    CimSmgsGruz gruz;
    ArrayList<CimSmgsInvoice> list = null;

    Collection<CimSmgsCarList> vagList = cs.getCimSmgsCarLists().values();
    if (vagList.size() > 0) {
      vag = vagList.iterator().next();
      Collection<CimSmgsKonList> konList = vag.getCimSmgsKonLists().values();
      if (konList.size() > 0) {
        kont = konList.iterator().next();
        String nkon = StringUtils.defaultString(kont.getUtiN()).replaceAll(" ", "").replaceAll("-", "");
        list = invMap.get(nkon);
        if (list != null) {
          log.debug(nkon + " found in XLS");
          for (CimSmgsInvoice inv : list) {
            inv.setUtiN(nkon);
            inv.setNvag(vag.getNvag());
            inv.setDocType("Инвойс");

            inv.setNotd(StringUtils.defaultString(cs.getG1r()).trim());
            inv.setCountry_o("PL"/*StringUtils.defaultString(cs.getG15_1()).trim()*/);
            inv.setZip_o(StringUtils.defaultString(cs.getG17_1()).trim());
            inv.setCity_o(StringUtils.defaultString(cs.getG18r_1()).trim());
            inv.setAdres_o(StringUtils.defaultString(cs.getG19r()).trim());

            inv.setNpol(StringUtils.defaultString(cs.getG4r()).trim());
            inv.setCountry_p("RU"/*StringUtils.defaultString(cs.getG45_1()).trim()*/);
            inv.setZip_p(StringUtils.defaultString(cs.getG47_1()).trim());
            inv.setCity_p(StringUtils.defaultString(cs.getG48r()).trim());
            inv.setAdres_p(StringUtils.defaultString(cs.getG49r()).trim());

            Collection<CimSmgsGruz> gruzList = kont.getCimSmgsGruzs().values();
            if (gruzList.size() > 0) {
//              gruz = gruzList.iterator().next();
              CimSmgsInvoiceGruz invGruz = inv.getInvoiceGruzs().values().iterator().next();
//              invGruz.setTnved(StringUtils.defaultString(gruz.getKgvn()).trim());
//              invGruz.setNzgr(StringUtils.defaultString(gruz.getNzgr()).trim());
              invGruz.setNzyp("РАЗЛ. УПАКОВКИ");
              invGruz.setKypk("");
              invGruz.setCus_edizm("ШТ");
              invGruz.setType("Груз");
            }
          }
        }
        else {
          log.debug(nkon + " NOT found in XLS");
        }

      }
    }

    CimSmgsDocs d25 = null;
//    byte sort = 0;
    for (CimSmgsDocs doc : cs.getCimSmgsDocses7().values()) {
//      if (sort < doc.getSort()) {
//        sort = doc.getSort();
//      }
      if ("25".equals(doc.getCode())) {
        d25 = doc;
      }
    }
    if (d25 == null) {
      d25 = new CimSmgsDocs();
      d25.setFieldNum("7");
      d25.setCode("25");
//      d25.setSort(++sort);
    }
    d25.setNdoc("10404090");
    d25.setText("Т/П ЕЛАБУЖСКИЙ 10404090");
    cs.addCimSmgsDocsItem(d25);

    return list != null ? list.toArray(new CimSmgsInvoice[list.size()]) : null;
  }

  public ArrayList<PackDoc> makeInvoices_Smgs(Long routeId, String groupName) {
    ArrayList<PackDoc> res = new ArrayList<PackDoc>();

    for (String nkon : invMap.keySet()) {
      Date d = new Date();
      Route r = new Route(routeId);

      PackDoc pd = new PackDoc();
      pd.setUsrGroupsDir(new UsrGroupsDir(groupName));
      pd.setRoute(r);

      CimSmgs cs = new CimSmgs();
      cs.setType((byte)2);
      cs.setDocType1(BigDecimal.ONE);
      cs.setDattr(d);
      cs.setTrans(groupName);
      cs.setRoute(r);
      cs.setKind(0);
      cs.setKontKol("1");
      cs.setGs_48("ПО СТАНДАРТУ");
      pd.addCimSmgsItem(cs);

      CimSmgsDocs d25 = new CimSmgsDocs();
      d25.setFieldNum("7");
      d25.setCode("25");
      d25.setSort(0);
      d25.setNdoc("10404090");
      d25.setText("Т/П ЕЛАБУЖСКИЙ 10404090");
      cs.addCimSmgsDocsItem(d25);

      CimSmgsCarList csc = new CimSmgsCarList();
      csc.setSort((byte)0);
      csc.setNvag("8920");
      csc.setGrPod(new BigDecimal(69));
      csc.setKolOs((byte) 4);
      csc.setTaraVag(new BigDecimal(25000));
      cs.addCimSmgsCarListItem(csc);

      CimSmgsKonList csk = new CimSmgsKonList();
      csk.setSort((byte)0);
      csk.setVid("45G1/30.48");
      csk.setUtiType("45G1");
      csc.addCimSmgsKonListItem(csk);

      CimSmgsGruz csg = new CimSmgsGruz();
      csg.setSort(0);
      csk.addCimSmgsGruzItem(csg);

      BigDecimal mnet = BigDecimal.ZERO;
      int kolm = 0;
      boolean hasBody = false;
      int doc9Sort = 0;
      for (CimSmgsInvoice inv : invMap.get(nkon)) {
        inv.setRoute(r);

        CimSmgsDocs invDoc = new CimSmgsDocs();
        invDoc.setSort(doc9Sort++);
        invDoc.setFieldNum("9");
        invDoc.setCode("380");
        invDoc.setNcas("04021");
        invDoc.setText("Счет-фактура");
        invDoc.setNcopy(3);
        invDoc.setNdoc(inv.getInvoice());
        invDoc.setDat(inv.getDat_inv());
        cs.addCimSmgsDocsItem(invDoc);

        for (CimSmgsInvoiceGruz invGr : inv.getInvoiceGruzs().values()) {
          if (invGr.getMbrt() != null) {
            mnet = mnet.add(invGr.getMbrt());
          }
          if (invGr.getKolm() != null) {
            kolm += invGr.getKolm().intValue();
          }
          if ("87071000".equals(invGr.getTnved())) {
            hasBody = true;
          }
        }

        pd.addInvoiceItem(inv);
      }

      CimSmgsDocs ulDoc = new CimSmgsDocs();
      ulDoc.setSort(doc9Sort);
      ulDoc.setFieldNum("9");
      ulDoc.setCode("271");
      ulDoc.setNcas("02026");
      ulDoc.setText("Упаковочный лист");
      ulDoc.setNcopy(4);
      cs.addCimSmgsDocsItem(ulDoc);

      csk.setUtiN(nkon);

      csg.setMassa(mnet);
      csk.setMassSend(mnet);
      cs.setG24N(mnet);

      csg.setPlaces(kolm);

      if (hasBody) {
        csg.setKgvn("87071000");
        csg.setNzgr("КУЗОВА В СБОРЕ ДЛЯ ПРОМЫШЛЕННОЙ СБОРКИ АВТОМОБИЛЕЙ В КОМПЛЕКТЕ С ЗАПЧАСТЯМИ СОГЛАСНО ПРИЛАГАЕМЫМ СЧЕТАМ");
        csg.setEkgvn("381299");
        cs.setNpoezd(Utils.ge(n_poezd, 0).trim());
      }
      else {
        csg.setKgvn("87089900");
        csg.setNzgr("ЧАСТИ И ПРИНАДЛЕЖНОСТИ ДЛЯ ПРОМЫШЛЕННОЙ СБОРКИ АВТОМОБИЛЕЙ СОГЛАСНО ПРИЛАГАЕМЫМ СЧЕТАМ");
        csg.setEkgvn("");
        cs.setNpoezd(Utils.ge(n_poezd, 1).trim());
      }
      csg.setUpak("КОНТЕЙНЕР");

      res.add(pd);
    }

    log.debug("Create " + res.size() + " documents");
    return res;
  }

  private Cell getCell(Sheet sheet, int row, String col) {
    int colNum = CellReference.convertColStringToIndex(col);
    org.apache.poi.ss.usermodel.Row r = sheet.getRow(row - 1);
    if (r != null)
      return r.getCell(colNum, org.apache.poi.ss.usermodel.Row.CREATE_NULL_AS_BLANK);
    else
      return null;
  }

  private String getStrVal(Sheet sheet, int row, String col) {
    String res = "";
    Cell c = getCell(sheet, row, col);
    if (c != null) {
      switch (c.getCellType()) {
        case Cell.CELL_TYPE_STRING:
        case Cell.CELL_TYPE_BLANK:
          res = c.getStringCellValue();
          break;
        case Cell.CELL_TYPE_NUMERIC:
          res = new BigDecimal(c.getNumericCellValue()).toString();
          break;
      }
    }
    return res.trim();
  }

  private BigDecimal getNumVal(Sheet sheet, int row, String col) {
    BigDecimal res = null;
    Cell c = getCell(sheet, row, col);
    if (c != null) {
      switch (c.getCellType()) {
        case Cell.CELL_TYPE_STRING:
          try {
            res = new BigDecimal(c.getStringCellValue().trim().replaceAll(",", "."));
          }
          catch (NumberFormatException efe) {
            log.warn("Error convert " + col + row + " (" + c.getStringCellValue() + ") to number");
          }
          break
                  ;
        case Cell.CELL_TYPE_NUMERIC:
        case Cell.CELL_TYPE_FORMULA:
          res = new BigDecimal(c.getNumericCellValue());
          break;
      }
    }
    return res;
  }

  private Date getDateVal(Sheet sheet, int row, String col) {
    Date res = null;
    Cell c = getCell(sheet, row, col);
    if (c!= null) {
      String str = c.getStringCellValue();
      try {
        if (c.getCellType() == Cell.CELL_TYPE_STRING) {
          try {
            res = dateFormater_slash.parse(str);
          }
          catch (Exception e1) {
            try {
              res = dateFormater.parse(str);
            }
            catch (Exception e2) {
              try {
                res = dateTimeFormater_slash.parse(str);
              }
              catch (Exception e3) {
                try {
                  res = dateTimeFormater.parse(str);
                }
                catch (Exception e4) {
                  log.warn("Error convert " + col + row + " (" + str + ") to date");
                }
              }
            }
          }
        }
        else {
          res = c.getDateCellValue();
        }
      }
      catch (Exception ex) {
        log.warn(ex.getMessage());
      }
    }
    return res;
  }

}
