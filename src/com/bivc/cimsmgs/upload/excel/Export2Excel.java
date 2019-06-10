package com.bivc.cimsmgs.upload.excel;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;

public class Export2Excel {
    static final public String XLSX = "xlsx";
    static final public String XLS = "xls";

    private Workbook wb;
    private final String excelFormat;

    public Export2Excel(String excelFormat) {
        this.excelFormat = excelFormat;
        wb = excelFormat.equals(XLSX) ? new XSSFWorkbook() : new HSSFWorkbook();
    }

    public Export2Excel(String excelFormat, String path4ExcelTmpl) throws IOException, InvalidFormatException {
        this.excelFormat = excelFormat;
        wb = WorkbookFactory.create(new File(path4ExcelTmpl));
    }

    public void export(){

    }

    public Workbook getWb() {
        return wb;
    }

    public void setWb(Workbook wb) {
        this.wb = wb;
    }

    public String getExcelFormat() {
        return excelFormat;
    }

    public static void copyRow(Sheet sheet, int sourceRowNum, int destinationRowNum) {
        // Get the source / new row
        Row newRow = sheet.getRow(destinationRowNum);
        Row sourceRow = sheet.getRow(sourceRowNum);

        // If the row exist in destination, push down all rows by 1 else create a new row
        if (newRow != null) {
            sheet.shiftRows(destinationRowNum, sheet.getLastRowNum(), 1);
        } else {
            newRow = sheet.createRow(destinationRowNum);
        }

        // Loop through source columns to add to new row
        for (int i = 0; i < sourceRow.getLastCellNum(); i++) {
            // Grab a copy of the old/new cell
            Cell oldCell = sourceRow.getCell(i);
            Cell newCell = newRow.createCell(i);

            // If the old cell is null jump to next cell
            if (oldCell == null) {
                newCell = null;
                continue;
            }

            // Use old cell style
            newCell.setCellStyle(oldCell.getCellStyle());
            // If there is a cell comment, copy
            if (newCell.getCellComment() != null) {
                newCell.setCellComment(oldCell.getCellComment());
            }

            // If there is a cell hyperlink, copy
            if (oldCell.getHyperlink() != null) {
                newCell.setHyperlink(oldCell.getHyperlink());
            }

            // Set the cell data type
            newCell.setCellType(oldCell.getCellType());

            // Set the cell data value
            switch (oldCell.getCellType()) {
                case Cell.CELL_TYPE_BLANK:
                    break;
                case Cell.CELL_TYPE_BOOLEAN:
                    newCell.setCellValue(oldCell.getBooleanCellValue());
                    break;
                case Cell.CELL_TYPE_ERROR:
                    newCell.setCellErrorValue(oldCell.getErrorCellValue());
                    break;
                case Cell.CELL_TYPE_FORMULA:
                    newCell.setCellFormula(oldCell.getCellFormula());
                    break;
                case Cell.CELL_TYPE_NUMERIC:
                    newCell.setCellValue(oldCell.getNumericCellValue());
                    break;
                case Cell.CELL_TYPE_STRING:
                    newCell.setCellValue(oldCell.getRichStringCellValue());
                    break;
            }
        }
    }

   CellStyle createCellStyle(CellStyleSettings styleSettings){
       CellStyle cellStyle = getWb().createCellStyle();
       cellStyle.setAlignment(styleSettings.getHorizontalAlignment());
       cellStyle.setWrapText(styleSettings.isWrapText());
       cellStyle.setFont(styleSettings.getFont());
       cellStyle.setVerticalAlignment(styleSettings.getVerticalAlignment());
       cellStyle.setBorderBottom(styleSettings.getBorderBottom());
       cellStyle.setBorderLeft(styleSettings.getBorderLeft());
       cellStyle.setBorderRight(styleSettings.getBorderRight());
       cellStyle.setBorderTop(styleSettings.getBorderTop());
       cellStyle.setRotation(styleSettings.getRotation());
       return cellStyle;
   }

    Font createFont(FontSettings fontSettings){
        Font font = getWb().createFont();
        font.setFontHeightInPoints((short) fontSettings.getFontHeightInPoints());
        font.setBold(fontSettings.isBold());
        return font;
    }

}
