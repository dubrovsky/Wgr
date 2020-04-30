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
import java.util.Date;

public class KartaPrzeladunkowa04 extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(KartaPrzeladunkowa04.class);

    public KartaPrzeladunkowa04() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "Karta przeladunkowa";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;
        String t = "";

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("poezd");
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid());

        Date d = new Date();
        String dt_d = dtf_day.format(d);

        dbt.read(st, Select.getSqlFile("ky/report/kartaPrzeladunkowa/poezd"), tv);
        if(st.getRowCount() > 0) {
//            st.setObject(0,"HID_CLIENT", report.getHid_client());
            dbt.readChildData(st, "vagon", Select.getSqlFile("ky/report/kartaPrzeladunkowa/vagon"), -1, "HID");
            dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("ky/report/kartaPrzeladunkowa/kont"), null, "HID");

            int koleya = ((Number)st.getObject(0, "KOLEYA")).intValue();

            row = sheet.getRow(0);
            row.getCell(4).setCellValue(dt_d);
            row.getCell(8).setCellValue(dtf_m.format(d));

//            row = sheet.getRow(2);
//            row.getCell(5).setCellValue(t = ( /*st.getTxt(0, "FNAMES") + " - " +*/ st.getTxt(0, "NPPRM")));

            stPack st_v = (stPack) st.getPack(0, "vagon");
            int r = 5;
            Number nval;
            for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                stPack st_k = (stPack) st_v.getPack(i, "kont");
//                if(st_k != null && st_k.getRowCount() > 0) {
                    if(r > 5) {
                        row = insertRow(sheet, r);
                    }
                    else {
                        row = sheet.getRow(r);
                    }
                    r++;
                    row.getCell(0).setCellValue(r-5);

                    if(koleya == 1) {
                        row.getCell(1).setCellValue(st_v.getTxt(i, "NVAG"));
                    }
                    else if(koleya == 2) {
                        row.getCell(4).setCellValue(st_v.getTxt(i, "NVAG"));
                    }
                    nval = (Number)st_v.getObject(i, "POD_SILA");
                    if(nval != null) row.getCell(5).setCellValue(nval.doubleValue());
                    nval = (Number)st_v.getObject(i, "MAS_TAR");
                    if(nval != null) row.getCell(6).setCellValue(nval.doubleValue());
//                    nval = (Number)st_v.getObject(i, "KOL_OS");
//                    if(nval != null) row.getCell(7).setCellValue(nval.intValue());

                    Row row_k;
                    for (int j = 0; st_k != null && j < st_k.getRowCount(); j++) {
                        if(j > 0) {
                            row_k = insertRow(sheet, r);
                            r++;
                            row_k.getCell(0).setCellValue(r-5);
                        }
                        else {
                            row_k = row;
                        }

                        row_k.getCell(3).setCellValue(st_k.getTxt(j, "NKON"));
                        nval = (Number)st_k.getObject(j, "MASSA_BRUTTO_ALL");
                        if(nval != null) row_k.getCell(8).setCellValue(nval.doubleValue());
//                        row_k.getCell(9).setCellValue(st_k.getTxt(j, "PLOMB"));
//                        nval = (Number)st_k.getObject(j, "MASSA_TAR");
//                        if(nval != null) row_k.getCell(10).setCellValue(nval.doubleValue());
//                        nval = (Number)st_k.getObject(j, "POD_SILA");
//                        if(nval != null) row_k.getCell(11).setCellValue(nval.doubleValue());
//                        row_k.getCell(12).setCellValue(st_k.getTxt(j, "VID"));
                    }

                    if(st_k != null && st_k.getRowCount() > 1) {
                        int r1 = r - st_k.getRowCount();
                        int r2 = r - 1;
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,1,1));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,4,4));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,5,5));
                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,6,6));
//                        sheet.addMergedRegion(new CellRangeAddress(r1,r2,7,7));
                    }
//                }
            }

            if(r > 5) {
                sheet.shiftRows(r + 1, sheet.getLastRowNum(), -1);

                row = sheet.getRow(r + 1);
                row.getCell(8).setCellFormula("SUM(I" + 6 + ":I" + r + ")");
            }

//            row = sheet.getRow(r + 5);
//            row.getCell(2).setCellValue(report.getUser().getUsr().getNamKlient());

            log.debug(st.toString());
        }

        report.setFilename(flNm + " - " + t + " - " + dt_d + ".xlsx");

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();

        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }

}
