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

public class R27 extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(R27.class);

    public R27() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "R27";

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
                String t1 = dtf_hhmm.format(dval);
                row = sheet.getRow(1);
                row.getCell(17).setCellValue(d1);
                row.getCell(19).setCellValue(t1);

                row = sheet.getRow(2);
                row.getCell(17).setCellValue(d1);
                row.getCell(19).setCellValue(t1);

                row = sheet.getRow(3);
                row.getCell(17).setCellValue(d1);
                row.getCell(19).setCellValue(t1);
            }

            row = sheet.getRow(22);
            row.getCell(13).setCellValue(st.getTxt(0, "DPOGR"));


            stPack st_v = (stPack) st.getPack(0, "vagon");

            int r = 15;

            if(st_v != null) {
                int v_count = st_v.getRowCount();
                int v_recount = 26;
                int sheet_count =  v_count / v_recount + (v_count % v_recount != 0 ? 1 : 0);
                int sheet_i = 0;


                for (int i = 1; i < sheet_count; i++) {
                    excel.cloneSheet(0, "Arkusz" + (i + 1));
                }

//                Number nval;
                for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                    if(r >= 41) {
                        row = sheet.getRow(41);
                        row.getCell(10).setCellValue(r-15);

                        sheet_i++;
                        sheet = excel.getSheetAt(sheet_i);

                        r = 15;
                    }
                    row = sheet.getRow(r);

                    r++;
                    String nvag = st_v.getTxt(i, "NVAG");
                    if(nvag.length() == 12) {
                        row.getCell(0).setCellValue(nvag.substring(0,4) + "-" + nvag.substring(4));
                    }
                    else {
                        row.getCell(0).setCellValue(nvag);
                    }

                    row.getCell(16).setCellValue((String) st_v.getObject(i, "PORUZ"));
                }

                row = sheet.getRow(41);
                row.getCell(10).setCellValue(r-15);
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
