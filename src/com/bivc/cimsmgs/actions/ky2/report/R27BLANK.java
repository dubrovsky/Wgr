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
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Types;
import java.util.Date;

public class R27BLANK extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(R27BLANK.class);

    public R27BLANK() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "R27BLANK";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

//        XSSFFont f1 = excel.createFont();
//        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;
        String t = "";
        Date dval;

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("poezd");
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid());

        Date d = new Date();
        String dt_d = dtf_day.format(d);

        dbt.read(st, Select.getSqlFile("ky/report/kartaPrzeladunkowa/poezd"), tv);
        if(st.getRowCount() > 0) {
//            st.setObject(0,"HID_CLIENT", report.getHid_client());
            dbt.readChildData(st, "vagon", Select.getSqlFile("ky/report/R27/vagon"), -1, "HID");
//            dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("ky/report/kartaPrzeladunkowa/kont"), null, "HID");

            row = sheet.getRow(0);
            row.getCell(0).setCellValue( row.getCell(0).getStringCellValue() + st.getTxt(0, "PROJ_NAME"));

            t = st.getTxt(0, "NPPRM");

            dval = (Date) st.getObject(0, "DUVED");
            if(dval != null) {
                String d1 = dtf_day.format(dval);
                String t1 = dtf_hhmmss.format(dval);
                row = sheet.getRow(2);
                row.getCell(10).setCellValue(d1);
                row.getCell(13).setCellValue(t1);

                row = sheet.getRow(3);
                row.getCell(10).setCellValue(d1);
                row.getCell(13).setCellValue(t1);

                row = sheet.getRow(4);
                row.getCell(10).setCellValue(d1);
                row.getCell(13).setCellValue(t1);
            }

            row = sheet.getRow(16);
            row.getCell(8).setCellValue(st.getTxt(0, "DPOGR"));


            stPack st_v = (stPack) st.getPack(0, "vagon");

            int r = 16;

            if(st_v != null) {
//                int v_count = st_v.getRowCount();
                int v_recount = 30;
//                int sheet_count =  v_count / v_recount + (v_count % v_recount != 0 ? 1 : 0);

                row = sheet.getRow(47);
                row.getCell(3).setCellValue(st_v.getRowCount());

//                for (int i = 1; i < sheet_count; i++) {
//                    excel.cloneSheet(0, "Arkusz" + (i + 1));
//                }

//                Number nval;
                for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                    if(r >= 46) {
                        row = insertRow(sheet, r);
                    }
                    else {
                        row = sheet.getRow(r);
                    }
                    r++;
                    String nvag = st_v.getTxt(i, "NVAG");
                    if(nvag.length() == 12) {
                        row.getCell(0).setCellValue(nvag.substring(0,2));
                        row.getCell(1).setCellValue(nvag.substring(2,4));
                        row.getCell(2).setCellValue(nvag.substring(4));
                    }
                    else {
                        row.getCell(2).setCellValue(nvag);
                    }

                    row.getCell(11).setCellValue((String) st_v.getObject(i, "PORUZ"));
                }

                if(r > 46) {
                    int r1 = r + 1;
                    sheet.addMergedRegion(new CellRangeAddress(r1, r1,3,4));
                    sheet.addMergedRegion(new CellRangeAddress(16, r1,5,5));
                    sheet.addMergedRegion(new CellRangeAddress(16, r1,6,6));
                    sheet.addMergedRegion(new CellRangeAddress(16, r1,7,7));
                    sheet.addMergedRegion(new CellRangeAddress(16, r1,8,8));
                    sheet.addMergedRegion(new CellRangeAddress(16, r1,9,9));

                    r1++;
                    sheet.addMergedRegion(new CellRangeAddress(r1, r1,10,14));
                    sheet.getRow(r1).setHeightInPoints(21);
                }
            }

            if(r <= 46) {
                sheet.addMergedRegion(new CellRangeAddress(16, 47,5,5));
                sheet.addMergedRegion(new CellRangeAddress(16, 47,6,6));
                sheet.addMergedRegion(new CellRangeAddress(16, 47,7,7));
                sheet.addMergedRegion(new CellRangeAddress(16, 47,8,8));
                sheet.addMergedRegion(new CellRangeAddress(16, 47,9,9));
            }

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
