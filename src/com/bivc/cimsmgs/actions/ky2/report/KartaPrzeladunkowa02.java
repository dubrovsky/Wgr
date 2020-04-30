package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.sql.Select;
import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Types;
import java.text.SimpleDateFormat;
import java.util.Date;

public class KartaPrzeladunkowa02 extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(KartaPrzeladunkowa02.class);

    public KartaPrzeladunkowa02() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "NOWA KARTA PRZELADUNKOWA - KONTENERY";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("poezd");
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid());

        Date d = new Date();
        String dt_d = dtf_day.format(d);

        dbt.read(st, Select.getSqlFile("ky/report/kartaPrzeladunkowa/poezd"), tv);
        if(st.getRowCount() > 0) {


            dbt.readChildData(st, "vagon", Select.getSqlFile("ky/report/kartaPrzeladunkowa/vagon"), -1, "HID");
            dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("ky/report/kartaPrzeladunkowa/kont"), null, "HID");
            dbt.readChildData(st, "kont", "gruz", Select.getSqlFile("ky/report/kartaPrzeladunkowa/gruz"), null, "HID");
            dbt.readChildData(st, "kont", "arrival", Select.getSqlFile("ky/report/kartaPrzeladunkowa/arrival"), null, "HID");

//            int koleya = ((Number)st.getObject(0, "KOLEYA")).intValue();
            row = sheet.getRow(2);
            row.getCell(2).setCellValue(st.getTxt(0, "PROJ_NAME"));
            row.getCell(12).setCellValue(dt_d);

            row = sheet.getRow(4);
            row.getCell(12).setCellValue(dtf_m.format(d));

            
            row = sheet.getRow(9);
//            row.getCell(4).setCellValue(st.getTxt(0, "FNAMES"));
            row.getCell(10).setCellValue(st.getTxt(0, "NPPRM"));

            stPack st_v = (stPack) st.getPack(0, "vagon");
            int r = 13;
            Number nval;
            Date dval;
            int count_vag = 0;
            for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                stPack st_k = (stPack) st_v.getPack(i, "kont");
//                if(st_k != null && st_k.getRowCount() > 0) {
                    if(r == 13) row = sheet.getRow(r);
                    else row = insertRow(sheet, r);
                    r++;
                    row.getCell(1).setCellValue(r-13);
                    count_vag++;

                    row.getCell(9).setCellValue(st_v.getTxt(i, "NVAG"));
                    nval = (Number)st_v.getObject(i, "POD_SILA");
                    if(nval != null) row.getCell(10).setCellValue(nval.doubleValue());
                    nval = (Number)st_v.getObject(i, "MAS_TAR");
                    if(nval != null) row.getCell(11).setCellValue(nval.doubleValue());

                    Row row_k;
                    for (int j = 0; st_k != null && j < st_k.getRowCount(); j++) {
                        if(j > 0) {
                            row_k = insertRow(sheet, r);
                            r++;
                            row_k.getCell(1).setCellValue(r-13);
                        }
                        else {
                            row_k = row;
                        }

                        stPack st_ar = (stPack) st_k.getPack(j, "arrival");
                        if(st_ar != null && st_ar.getRowCount() > 0) {
                            row_k.getCell(2).setCellValue(st_ar.getTxt(0, "NVAG2"));
                        }

                        row_k.getCell(3).setCellValue(st_k.getTxt(j, "KONT_POSITION"));
                        dval = (Date) st_k.getObject(j, "DPRB");
                        if(dval != null) row_k.getCell(4).setCellValue(dtf_day.format(dval));
                        row_k.getCell(5).setCellValue(st_k.getTxt(j, "NOTP"));
                        stPack st_g = (stPack) st_k.getPack(j, "gruz");
                        if(st_g != null && st_g.getRowCount() > 0) {
                            row_k.getCell(6).setCellValue(st_g.getTxt(0, "NZGR"));
                        }
                        nval = (Number)st_k.getObject(j, "MASSA_BRUTTO_ALL");
                        if(nval != null) row_k.getCell(7).setCellValue(nval.doubleValue());
                        row_k.getCell(12).setCellValue(st_k.getTxt(j, "NKON"));
                        row_k.getCell(13).setCellValue(st_k.getTxt(j, "TYPE"));
                    }

                if(st_k != null && st_k.getRowCount() > 1) {
                    int r1 = r - st_k.getRowCount();
                    int r2 = r - 1;
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,9,9));
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,10,10));
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,11,11));
                }

//                }
            }
            
            if(r > 13) {
                row = sheet.getRow(r + 2);
                row.getCell(7).setCellFormula("SUM(H" + 13 + ":H" + r + ")");

                row.getCell(9).setCellValue(count_vag + " wagony PKP");
            }

            row = sheet.getRow(r += 4);
            sheet.addMergedRegion(new CellRangeAddress(r,r,2,3));
            sheet.addMergedRegion(new CellRangeAddress(r,r,11,13));

            row = sheet.getRow(++r);
            row.getCell(2).setCellValue(report.getUser().getUsr().getNamKlient());
            sheet.addMergedRegion(new CellRangeAddress(r,r,2,3));
            sheet.addMergedRegion(new CellRangeAddress(r,r,11,13));

            log.debug(st.toString());
        }

        report.setFilename(flNm + /*" - " + st.getTxt(0, "FNAMES") +*/ " - " + st.getTxt(0, "NPPRM") + " - " + dt_d + ".xlsx");

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();

        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }
}
