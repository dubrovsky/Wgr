package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
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
import java.util.Set;

public class KartaPrzeladunkowa extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(KartaPrzeladunkowa.class);

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "Karta przeladunkowa - kontenery";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;
        String t = "";

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("poezd");
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid_client()).add(Types.NUMERIC, report.getHid());

        dbt.read(st, Select.getSqlFile("ky/report/kartaPrzeladunkowa/poezd"), tv);
        if(st.getRowCount() > 0) {
//            st.setObject(0,"HID_CLIENT", report.getHid_client());
            dbt.readChildData(st, "vagon", Select.getSqlFile("ky/report/kartaPrzeladunkowa/vagon"), -1, "HID");
            dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("ky/report/kartaPrzeladunkowa/kont"), null, "HID,HID_CLIENT");

            int koleya = ((Number)st.getObject(0, "KOLEYA")).intValue();

            row = sheet.getRow(0);
            row.getCell(5).setCellValue(st.getTxt(0, "DOTP"));
            SimpleDateFormat dtf = new SimpleDateFormat("/MM/yyyy");
            row.getCell(9).setCellValue(dtf.format((Date) st.getObject(0, "DOTP")));

            row = sheet.getRow(2);
            row.getCell(4).setCellValue(t = (st.getTxt(0, "FNAME") + " - " + st.getTxt(0, "NPPRM")));

            stPack st_v = (stPack) st.getPack(0, "vagon");
            int r = 5;
            Number nval;
            for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                stPack st_k = (stPack) st_v.getPack(i, "kont");
                if(st_k != null && st_k.getRowCount() > 0) {
                    row = insertRow(sheet, r);
                    r++;
                    if(koleya == 1) {
                        row.getCell(1).setCellValue(st_v.getTxt(i, "NVAG"));
                    }
                    else if(koleya == 2) {
                        row.getCell(4).setCellValue(st_v.getTxt(i, "NVAG"));
                    }
                    nval = (Number)st_v.getObject(i, "POD_SILA");
                    if(nval != null) row.getCell(5).setCellValue(nval.doubleValue());
                    nval = (Number)st_v.getObject(i, "MAS_TAR");
                    if(nval != null) row.getCell(6).setCellValue(nval.longValue());
                    nval = (Number)st_v.getObject(i, "KOL_OS");
                    if(nval != null) row.getCell(7).setCellValue(nval.intValue());

                    Row row_k;
                    for (int j = 0; j < st_k.getRowCount(); j++) {
                        if(j > 0) {
                            row_k = insertRow(sheet, r);
                            r++;
                        }
                        else {
                            row_k = row;
                        }
                        row_k.getCell(0).setCellValue(r-5);

                        row_k.getCell(3).setCellValue(st_k.getTxt(j, "NKON"));
                        nval = (Number)st_k.getObject(j, "MASSA_BRUTTO_ALL");
                        if(nval != null) row_k.getCell(8).setCellValue(nval.longValue());
                        row_k.getCell(9).setCellValue(st_k.getTxt(j, "PLOMB"));
                        nval = (Number)st_k.getObject(j, "MASSA_TAR");
                        if(nval != null) row_k.getCell(10).setCellValue(nval.longValue());
                        nval = (Number)st_k.getObject(j, "POD_SILA");
                        if(nval != null) row_k.getCell(11).setCellValue(nval.longValue());
                        row_k.getCell(12).setCellValue(st_k.getTxt(j, "VID"));
                    }

                    if(st_k != null && st_k.getRowCount() > 1) {
                        int r1 = r - st_k.getRowCount();
                        int r2 = r - 1;
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,1,1));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,4,4));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,5,5));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,6,6));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,7,7));
                    }
                }
            }

            if(r > 5) {
                row = sheet.getRow(r + 1);
                row.getCell(8).setCellFormula("SUM(I" + 6 + ":I" + r + ")");
            }

            row = sheet.getRow(r + 5);
            row.getCell(2).setCellValue(report.getUser().getUsr().getNamKlient());

            log.debug(st.toString());
        }

        report.setFilename(flNm + " - " + t + " - " + st.getTxt(0, "DOTP") + ".xlsx");

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();

        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }

    private Row insertRow(Sheet sheet, int row) throws Exception {
        Row r0 = sheet.getRow(row);
        sheet.shiftRows(row, sheet.getLastRowNum(), 1);
        Row r = sheet.createRow(row);
        for (int i = 0; i < r0.getLastCellNum(); i++) {
            Cell c = r0.getCell(i);
            if(c != null) {
                r.createCell(i, c.getCellTypeEnum()).setCellStyle(c.getCellStyle());
            }
        }
        return r;
    }
}
