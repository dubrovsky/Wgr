package com.bivc.cimsmgs.services.ky2;

import com.isc.utils.dbStore.stPack;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author p.dzeviarylin
 */
public class ReportService {

    private DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
    private DateFormat timeFormat = new SimpleDateFormat("HH:mm");

    public HSSFWorkbook reportToExcel(stPack st) throws Exception {
        HSSFWorkbook wb = new HSSFWorkbook();

        Sheet sheet = wb.createSheet("DBO");
//        sheet.autoSizeColumn(2);   //adjust column width to fit the content

        short rowIndex = 0;
        int cellIndex = 0;
        Row row;
        Cell cell;
        Font font = wb.createFont();

        /// TABLE HEADER
        CellStyle style2 = wb.createCellStyle();
        style2.setFont(font);
        style2.setWrapText(true);  //to enable newlines you need set a cell styles with wrap=true
        style2.setAlignment(HorizontalAlignment.CENTER);
        style2.setVerticalAlignment(VerticalAlignment.TOP);
        style2.setBorderBottom(BorderStyle.THIN);
        style2.setBorderLeft(BorderStyle.THIN);
        style2.setBorderRight(BorderStyle.THIN);
        style2.setBorderTop(BorderStyle.THIN);

        row = sheet.createRow(rowIndex);
        row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));  //increase row height to accommodate two lines of text

        cell = row.createCell(cellIndex);
        cell.setCellValue("L.p");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Data\nwjazdu");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("RODZAJ\nTRANSPORTU");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Nr.\npociągu");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("GODZ\nPODSTAW");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Nr kontenera");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Rozmiar");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("TYP");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Dostawca");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Plomby");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Tara\nkontenera[kg]");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("MAXG\nROS[kg]");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("MASA");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("RELACJA");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Data\nzabrania");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("SRODEK\nTRANSPORTU");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Nr.\nTRANSPORTU");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Odebrał");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("godz\nwyjazdu");
        cell.setCellStyle(style2);
        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("LOŚĆ DNI\nPRZECHOWANIA");
        cell.setCellStyle(style2);
        cellIndex++;

        /// END TABLE HEADER
        /// TABLE DATA
        CellStyle style3 = wb.createCellStyle();
        style3.setFont(font);
        style3.setAlignment(HorizontalAlignment.CENTER);
        style3.setVerticalAlignment(VerticalAlignment.TOP);
        style3.setBorderBottom(BorderStyle.THIN);
        style3.setBorderLeft(BorderStyle.THIN);
        style3.setBorderRight(BorderStyle.THIN);
        style3.setBorderTop(BorderStyle.THIN);

        CellStyle style4 = wb.createCellStyle();
        style4.setFont(font);
        style4.setAlignment(HorizontalAlignment.RIGHT);
        style4.setVerticalAlignment(VerticalAlignment.TOP);
        style4.setBorderBottom(BorderStyle.THIN);
        style4.setBorderLeft(BorderStyle.THIN);
        style4.setBorderRight(BorderStyle.THIN);
        style4.setBorderTop(BorderStyle.THIN);

        rowIndex++;

        for (int i = 0; i < st.getRowCount(); i++) {
            // HID;NVAG1;NPPR1;DPRB;NKON;TYPE;VID;GRUZOTPR;KONT_PLOMB;MASSA_TAR;POD_SILA;MASSA_BRUTTO;KONT_POSITION;DOTP;KOLEYA;NVAG2;DRIVER_NM
            //  st.getTxt(i, "HID");
            //  st.getObject(i, "HID");
            cellIndex = 0;
            row = sheet.createRow(rowIndex);

            // A
            cell = row.createCell(cellIndex);
            cell.setCellValue(i + 1);
            cell.setCellStyle(style3);
            cellIndex++;

            // B
            Date dprb = (Date) st.getObject(i, "DPRB");
            cell = row.createCell(cellIndex);
            String date = dprb != null ? dateFormat.format(dprb) : "";
            cell.setCellValue(date);
            cell.setCellStyle(style3);
            cellIndex++;

            // C
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "NVAG1"));
            cell.setCellStyle(style3);
            cellIndex++;

            // D
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "NPPR1"));
            cell.setCellStyle(style3);
            cellIndex++;

            // E
            cell = row.createCell(cellIndex);
            date = dprb != null ? timeFormat.format(dprb) : "";
            cell.setCellValue(date);
            cell.setCellStyle(style3);
            cellIndex++;

            // F
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "NKON"));
            cell.setCellStyle(style3);
            cellIndex++;

            // G
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "TYPE"));
            cell.setCellStyle(style3);
            cellIndex++;

            // H
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "VID"));
            cell.setCellStyle(style3);
            cellIndex++;

            // I
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "GRUZOTPR"));
            cell.setCellStyle(style3);
            cellIndex++;

            // J
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "KONT_PLOMB"));
            cell.setCellStyle(style3);
            cellIndex++;

            // K
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "MASSA_TAR"));
            cell.setCellStyle(style3);
            cellIndex++;

            // L
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "POD_SILA"));
            cell.setCellStyle(style3);
            cellIndex++;

            // M
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "MASSA_BRUTTO"));
            cell.setCellStyle(style3);
            cellIndex++;

            // N
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "KONT_POSITION"));
            cell.setCellStyle(style3);
            cellIndex++;

            // O
            Date dotp = (Date) st.getObject(i, "DOTP");
            cell = row.createCell(cellIndex);
            date = dotp != null ? dateFormat.format(dotp) : "";
            cell.setCellValue(date);
            cell.setCellStyle(style3);
            cellIndex++;

            // P
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "KOLEYA"));
            cell.setCellStyle(style3);
            cellIndex++;

            // Q
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "NVAG2"));
            cell.setCellStyle(style3);
            cellIndex++;

            // R
            cell = row.createCell(cellIndex);
            cell.setCellValue(st.getTxt(i, "DRIVER_NM"));
            cell.setCellStyle(style3);
            cellIndex++;

            // S
            cell = row.createCell(cellIndex);
            date = dotp != null ? timeFormat.format(dotp) : "";
            cell.setCellValue(date);
            cell.setCellStyle(style3);
            cellIndex++;

            // T
            cell = row.createCell(cellIndex);
            cell.setCellValue(dayInterval(dprb, dotp));
            cell.setCellStyle(style4);
            cellIndex++;

            rowIndex++;
        }

        ///END  TABLE DATA

        sheet.autoSizeColumn((short) 0);
        sheet.autoSizeColumn((short) 1);
        sheet.autoSizeColumn((short) 2);
        sheet.autoSizeColumn((short) 3);
        sheet.autoSizeColumn((short) 4);
        sheet.autoSizeColumn((short) 5);
        sheet.autoSizeColumn((short) 6);
        sheet.autoSizeColumn((short) 7);
        sheet.autoSizeColumn((short) 8);
        sheet.autoSizeColumn((short) 9);
        sheet.autoSizeColumn((short) 10);
        sheet.autoSizeColumn((short) 11);
        sheet.autoSizeColumn((short) 12);
        sheet.autoSizeColumn((short) 13);
        sheet.autoSizeColumn((short) 14);
        sheet.autoSizeColumn((short) 15);
        sheet.autoSizeColumn((short) 16);
        sheet.autoSizeColumn((short) 17);
        sheet.autoSizeColumn((short) 18);
        sheet.autoSizeColumn((short) 19);

        return wb;
    }

    private String dayInterval(Date d1, Date d2) throws Exception {
        if(d1 == null || d2 == null) return "";
        int ro = TimeZone.getDefault().getRawOffset();
        long dt1 = (d1.getTime() + ro) / (1000 * 60 * 60 * 24);
        long dt2 = (d2.getTime() + ro) / (1000 * 60 * 60 * 24);
        return (dt2 - dt1 + 1) + " ";
    }

/*
    private String dateInterval(Date d1, Date d2) throws Exception {
        if(d1 == null || d2 == null) return "";
        long dt = (d2.getTime() - d1.getTime()) / 1000;
        String t = "";
        if(dt < 0) {
            t = "- ";
            dt = -dt;
        }
        StringBuffer ret = new StringBuffer();
        long ss = dt % 60;
        dt /= 60;
        long mm = dt % 60;
        dt /= 60;
        long hh = dt % 24;
        long dd = dt / 24;
        return t + (dd > 0 ? dd + " " : "")  + (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss + " ";
    }
*/

}
