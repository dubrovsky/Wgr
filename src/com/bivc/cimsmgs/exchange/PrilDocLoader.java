package com.bivc.cimsmgs.exchange;

import Ti.DataProcessing.ImportXLSMapPogruz;
import Ti.db.MapPogruzDBOperations;
import Ti.model.MapPogruz;
import com.bivc.cimsmgs.commons.ArrayMap;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.VidOtpr;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.db.CimSmgsDocs;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.CellReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static com.bivc.cimsmgs.exchange.Utils.normNvagNkonStr;

public class PrilDocLoader {

  private static final Pattern prin_nkon_p = Pattern.compile("[a-zA-Z]{4}[ -]?\\d{6}[-]?\\d{1}");
  private static final Pattern nvag_p = Pattern.compile("\\d{4}[ -]?\\d{7}[ -]?\\d{1}");

  private static final Logger log = LoggerFactory.getLogger(PrilDocLoader.class);

  public static final SimpleDateFormat dateTimeFormater = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
  public static final SimpleDateFormat dateFormater = new SimpleDateFormat("dd.MM.yyyy");
  public static final SimpleDateFormat dateTimeFormater_slash = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
  public static final SimpleDateFormat dateFormater_slash = new SimpleDateFormat("dd/MM/yyyy");

  private ArrayMap<String, Doc> docMap = new ArrayMap<>();
  private ArrayList<String> notFoundList = new ArrayList<>();

  private class Doc {
    private String ndoc;
    private Date ddoc;

    public Doc(String ndoc, Date ddoc) {
      this.ndoc = ndoc;
      this.ddoc = ddoc;
    }
  }

  public PrilDocLoader() {
  }

  public ArrayList<String> load(Long hid_cs, CimSmgsDocs templ, InputStream is) throws Exception {
    log.debug("Start");

    try {
      Workbook wb = WorkbookFactory.create(is);
      Sheet sheet = wb.getSheetAt(0);

      int j = 0;
      int lastRow = sheet.getLastRowNum() + 1;
      while (++j <= lastRow) {
        String colA = getStrVal(sheet, j, "A");
        if (colA.length() > 0) {
          Matcher m = prin_nkon_p.matcher(colA);
          if (!m.matches()) {
            m = nvag_p.matcher(colA);
            if (!m.matches()) {
              continue;
            }
          }

          String sep = "[\r\n]+";
          String valStr = getStrVal(sheet, j, "B");
          String[] ndocArr = Utils.split(valStr, sep);
          valStr = getStrVal(sheet, j, "C");
          String[] datArr = Utils.split(valStr, sep);

          int maxLen = Math.max(ndocArr.length, datArr.length);

          for (int k = ndocArr.length; k < maxLen; k++)
            ndocArr = (String[]) ArrayUtils.add(ndocArr, "");

          for (int k = datArr.length; k < maxLen; k++)
            datArr = (String[]) ArrayUtils.add(datArr, "");

          for (int k = 0; k < maxLen; k++) {
            Date ddoc = null;
            try {
              ddoc = dateFormater.parse(datArr[k]);
            }
            catch (ParseException pex) {
              log.warn("Error convert " + datArr[k] + ") to date");
            }

            docMap.add(normNvagNkonStr(colA), new Doc(ndocArr[k], ddoc));
          }

        }
      }
      log.debug("Create " + docMap.getMap().size() + " transport units");
      if (docMap.getMap().size() == 0) {
        throw new Exception("Numbers of transport unit not found. Possibly wrong file format.");
      }

      CimSmgs cs = (CimSmgs) HibernateUtil.getSession().get(CimSmgs.class, hid_cs);
      Byte g25 = cs.getG25();
      for (CimSmgsCarList csc : cs.getCimSmgsCarLists().values()) {
        if (g25 != null && VidOtpr.KONT.getG25() == g25) {
          for (CimSmgsKonList csk : csc.getCimSmgsKonLists().values()) {
            ArrayList<CimSmgsDocs> docList = createDoc(csk.getUtiN(), templ);
            for (CimSmgsDocs item : docList) {
              cs.addCimSmgsDocsItem(item);
              csk.addCimSmgsDocsItem(item);
            }
          }
        }
        else {
          ArrayList<CimSmgsDocs> docList = createDoc(csc.getNvag(), templ);
          for (CimSmgsDocs item : docList) {
            cs.addCimSmgsDocsItem(item);
            csc.addCimSmgsDocsItem(item);
          }
        }
      }

      notFoundList.addAll(docMap.getMap().keySet());
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      throw new RuntimeException(ex);
    }

    return notFoundList;
  }


//    @Deprecated
//    public ArrayList<String> processMapPeregruz2(List<Long> hid_csList, InputStream is) {
//        ImportXLSMapPogruz importXLSMapPogruz = new ImportXLSMapPogruz();
//        ArrayList<String> errors = new ArrayList<>();
//        if (importXLSMapPogruz.init(is)) {
//            ArrayList<MapPogruz> mapPeregruzs = importXLSMapPogruz.processSheet();
//            if (importXLSMapPogruz.getErrors().size() > 1) {
//                return importXLSMapPogruz.getErrors();
//            }
//            else {
//                for (Long hid_cs : hid_csList) {
//                    try {
//                        MapPogruzDBOperations.processBase(mapPeregruzs, hid_cs);
//                        MapPogruzDBOperations.delEmtyCarsFromSMGS(hid_cs);
//                        MapPogruzDBOperations.setUpVagonPlaces(mapPeregruzs, hid_cs);
//                    }
//                    catch (Exception e) {
//                        errors.add("Something wrong with CIM/SMGS record N:" + hid_cs);
//                    }
//                }
//            }
//        }
//        else {
//            errors.add("Wrong Excel file!");
//        }
//        return errors;
//    }

    /**
     * processMapPeregruz is processing input map peregruz file and adding records to DB according cim smgs records id
     *
     * @param hid_csList list list of id
     * @param mapPogruzs list list peregruz records
     * @return errors list
     */
    public ArrayList<String> processMapPeregruz(List<Long> hid_csList, ArrayList<MapPogruz> mapPogruzs) {
        ArrayList<String> errors = new ArrayList<>();
        for (Long hid_cs : hid_csList) {
            try {
                MapPogruzDBOperations.createList2BaseList(mapPogruzs, hid_cs);
            }
            catch (Exception e) {
                errors.add("Something wrong with CIM/SMGS record N:" + hid_cs);
            }
        }
        return errors;
    }

    /**
     * processPeregruz2BaseList writes Map pogruz to db
     * @param mapPogruzs list of pogruz map
     * @return errors list
     */
    public ArrayList<String> processPeregruz2BaseList(List<MapPogruz> mapPogruzs) {
        ArrayList errors = new ArrayList();
        for (MapPogruz pogruz : mapPogruzs) {
            try {
                MapPogruzDBOperations.processBase(mapPogruzs, pogruz.getCs_hid());
                MapPogruzDBOperations.delEmtyCarsFromSMGS(pogruz.getCs_hid());
                MapPogruzDBOperations.setUpVagonPlaces(mapPogruzs, pogruz.getCs_hid());
            }
            catch (Exception e) {
                errors.add("Something wrong with CIM/SMGS record N:" + pogruz.getCs_hid());
            }
        }
        return errors;
    }


  private ArrayList<CimSmgsDocs> createDoc(String transport, CimSmgsDocs templ) throws InvocationTargetException, NoSuchMethodException, InstantiationException, IllegalAccessException {
    ArrayList<CimSmgsDocs> res = new ArrayList<>();
    ArrayList<Doc> docList = docMap.getMap().remove(normNvagNkonStr(transport));
    if (docList != null) {
      for (Doc item : docList) {
        CimSmgsDocs doc = (CimSmgsDocs) BeanUtils.cloneBean(templ);
        doc.setFieldNum("9");
        doc.setNdoc(item.ndoc);
        doc.setDat(item.ddoc);
        doc.setNcopy(1);
        res.add(doc);
      }
    }
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
