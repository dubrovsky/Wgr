package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

public abstract class ReportAction {
    protected SimpleDateFormat dtf_day = new SimpleDateFormat("dd.MM.yyyy");
    protected SimpleDateFormat dtf_hhmm = new SimpleDateFormat("HH:mm");
    protected SimpleDateFormat dtf_hhmmss = new SimpleDateFormat("HH:mm:ss");
    protected SimpleDateFormat dtf_m = new SimpleDateFormat("/MM/yyyy");
    protected DecimalFormat numf_3 = new DecimalFormat();

    public ReportAction() throws Exception {
        numf_3.setMaximumFractionDigits(3);
        numf_3.setMinimumFractionDigits(0);
        numf_3.setGroupingUsed(false);
    }
    public abstract String execute(Report_A report) throws Exception;

    protected Row insertRow(Sheet sheet, int row) throws Exception {
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
