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

public class KartaPrzeladunkowa03 extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(KartaPrzeladunkowa03.class);

    public KartaPrzeladunkowa03() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "KARTA PRZELADUNKOWA - POCIAGU";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;

        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("poezd");
        typesAndValues tv = new typesAndValues().add(Types.NUMERIC, report.getHid());

        Date d = new Date();
        String dt_d = dtf_day.format(d);

        dbt.read(st, Select.getSqlFile("ky/report/kartaPrzeladunkowa03/poezd"), tv);
        if(st.getRowCount() > 0) {
            dbt.readChildData(st, "vagon", Select.getSqlFile("ky/report/kartaPrzeladunkowa03/vagon"), -1, "HID");
            dbt.readChildData(st, "vagon", "kont", Select.getSqlFile("ky/report/kartaPrzeladunkowa03/kont"), null, "HID");

            excel.setSheetName(excel.getSheetIndex(sheet), st.getTxt(0, "NPPRM").replaceAll("/", "_"));

            stPack st_v = (stPack) st.getPack(0, "vagon");
            int r = 2;
            Number nval;
            for (int i = 0; st_v != null && i < st_v.getRowCount(); i++) {
                stPack st_k = (stPack) st_v.getPack(i, "kont");
//                if(st_k != null && st_k.getRowCount() > 0) {
                    if(r == 2) row = sheet.getRow(r);
                    else row = insertRow(sheet, r);
                    r++;
//                    row.getCell(0).setCellValue(r-2);

                    row.getCell(0).setCellValue(i+1);
                    // Вагон
                    row.getCell(1).setCellValue(st_v.getTxt(i, "NVAG"));
                    row.getCell(4).setCellValue(st_v.getTxt(i, "SOBSTV"));
                    nval = (Number)st_v.getObject(i, "MAS_TAR");
                    if(nval != null) row.getCell(11).setCellValue( nval.doubleValue() );
                    nval = (Number)st_v.getObject(i, "POD_SILA");
                    if(nval != null) row.getCell(12).setCellValue( nval.doubleValue() );
                    nval = (Number)st_v.getObject(i, "KOL_OS");
                    if(nval != null) row.getCell(13).setCellValue(nval.longValue());


                    Row row_k;
                    for (int j = 0; st_k != null && j < st_k.getRowCount(); j++) {
                        if(j > 0) {
                            row_k = insertRow(sheet, r);
                            r++;
//                            row_k.getCell(0).setCellValue(r-2);
                            row_k.getCell(0).setCellValue(i+1);
                            // Вагон
                            row_k.getCell(1).setCellValue(st_v.getTxt(i, "NVAG"));
                            row_k.getCell(4).setCellValue(st_v.getTxt(i, "SOBSTV"));
                            nval = (Number)st_v.getObject(i, "MAS_TAR");
                            if(nval != null) row_k.getCell(11).setCellValue( nval.doubleValue() );
                            nval = (Number)st_v.getObject(i, "POD_SILA");
                            if(nval != null) row_k.getCell(12).setCellValue( nval.doubleValue() );
                            nval = (Number)st_v.getObject(i, "KOL_OS");
                            if(nval != null) row_k.getCell(13).setCellValue(nval.longValue());
                        }
                        else {
                            row_k = row;
                        }
                        row_k.getCell(2).setCellValue(st_k.getTxt(j, "NKON"));
                        row_k.getCell(3).setCellValue(st_k.getTxt(j, "NOTP"));
//                        row_k.getCell(4).setCellValue(st_k.getTxt(j, "SOBSTV"));
                        row_k.getCell(5).setCellValue(st_k.getTxt(j, "TYPE"));
                        row_k.getCell(6).setCellValue(st_k.getTxt(j, "VID"));
                        row_k.getCell(7).setCellValue(st_k.getTxt(j, "PLOMB"));

                        nval = (Number)st_k.getObject(j, "MASSA_TAR");
                        if(nval != null) row_k.getCell(8).setCellValue(nval.doubleValue());
                        nval = (Number)st_k.getObject(j, "POD_SILA");
                        if(nval != null) row_k.getCell(9).setCellValue(nval.doubleValue());
                        nval = (Number)st_k.getObject(j, "MASSA_BRUTTO");
                        if(nval != null) row_k.getCell(10).setCellValue(nval.doubleValue());

                    }

/*
                if(st_k != null && st_k.getRowCount() > 1) {
                    int r1 = r - st_k.getRowCount();
                    int r2 = r - 1;
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,1,1));
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,11,11));
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,12,12));
                    sheet.addMergedRegion(new CellRangeAddress(r1,r2,13,13));
                }
*/

//                }
            }

            row = sheet.getRow(r += 2);
            row.getCell(2).setCellValue(st.getTxt(0, "NPPRM"));
            row = sheet.getRow( ++r );
//            row.getCell(2).setCellValue();
            row = sheet.getRow( ++r );
//            row.getCell(2).setCellValue(report.getUser().getUsr().getNamKlient());
            row = sheet.getRow( ++r );
//            row.getCell(2).setCellValue();
            row = sheet.getRow( ++r );
//            row.getCell(2).setCellValue();
            row = sheet.getRow( ++r );
            row.getCell(2).setCellValue(dt_d);


            log.debug(st.toString());
        }

        report.setFilename(flNm + " - " + st.getTxt(0, "NPPRM") + " - " + dt_d + ".xlsx");

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();

        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }

}
