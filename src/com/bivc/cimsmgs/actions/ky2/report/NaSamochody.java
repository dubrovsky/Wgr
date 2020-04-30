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
import java.util.Set;
import java.util.Vector;

public class NaSamochody extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(NaSamochody.class);

    public NaSamochody() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String flNm = "ZESTAWIENIA WYDAN KONTENEROW NA SAMOCHODY";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

//        -- (SELECT GROUP_CONCAT(af2.NUM SEPARATOR ', ') AS NUM FROM KY_AVTO_FILES af2 WHERE af2.HID_AVTO=a2.HID AND af2.NUM IS NOT NULL) AS A_NUM,
//        log.debug(report.getStartDt().toString());
//        log.debug(report.getEndDt().toString());

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;
        String t = "";

        if (report.getStartDt() == null || report.getEndDt() == null) throw new Exception("No reporting period specified");

//        WHERE p1.DPRB>=? AND p1.DPRB<?
        StringBuffer query = new StringBuffer();
        dbTool dbt = HibernateUtil.initDbTool();
        stPack st = new stPack("kont");

        typesAndValues tv = new typesAndValues();
        tv.add(Types.DATE, report.getStartDt()).add(Types.DATE, report.getEndDate(report.getEndDt()));

        query.append(" AND a2.TRANS IN (");
        for(int i = 0; i < report.getUser().getUsr().getTrans().size(); i++) {
            tv.add(Types.CHAR, report.getUser().getUsr().getTrans().get(i));
            if(i > 0) query.append(",");
            query.append("?");
        }
        query.append(")");

        if(report.getHid_client() != null) {
            query.append(" AND k.HID_CLIENT=?");
            tv.add(Types.NUMERIC, report.getHid_client());
        }

        Date d = new Date();
        String dt_d = dtf_day.format(d);

        row = sheet.getRow(3);
        if(report.getStartDt().compareTo(report.getEndDt()) == 0) {
            dt_d = dtf_day.format(report.getStartDt());
        }
        else {
            dt_d = dtf_day.format(report.getStartDt()) + " - " + dtf_day.format(report.getEndDt());
        }
        row.getCell(1).setCellValue(row.getCell(1).getStringCellValue() + dt_d);


        dbt.read(st, String.format(Select.getSqlFile("ky/report/NaSamochody/kont[-a]"), query), tv);
        if (st.getRowCount() > 0) {
            int r = 6;
            Number nval;
            Object ob;
            Vector hid_cl = new Vector();
            StringBuffer name_cl = new StringBuffer();
            for (int i = 0; i < st.getRowCount(); i++) {
                if (i > 0 && i < st.getRowCount() - 2) row = insertRow(sheet, r);
                else row = sheet.getRow(r);
                r++;
                row.getCell(0).setCellValue(r - 6);

                row.getCell(1).setCellValue(st.getTxt(i, "A_NUM"));
                row.getCell(2).setCellValue(st.getTxt(i, "NKON"));
                row.getCell(3).setCellValue(st.getTxt(i, "NO_AVTO"));
                row.getCell(4).setCellValue(st.getTxt(i, "NO_TRAIL"));
                if ((ob = st.getObject(i, "DPRB")) != null) {
                    row.getCell(5).setCellValue(dtf_day.format(ob));
                }
                row.getCell(6).setCellValue(st.getTxt(i, "NO_ZAYAV"));
                nval = (Number) st.getObject(i, "HID_CLIENT");
                if(nval != null && hid_cl.indexOf(nval) == -1) {
                    hid_cl.add(nval);
                    if(name_cl.length() > 0) name_cl.append(", ");
                    name_cl.append(st.getTxt(i, "NAME_CLIENT"));
                }
            }

            row = sheet.getRow(4);
            row.getCell(1).setCellValue(t = name_cl.toString());
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
