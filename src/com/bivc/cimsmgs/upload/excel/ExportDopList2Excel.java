package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.commons.TextToLinesSplitter;
import com.bivc.cimsmgs.db.CimSmgs;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.ss.util.RegionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class ExportDopList2Excel extends Export2Excel {
    final static private Logger log = LoggerFactory.getLogger(ExportDopList2Excel.class);
    private final CimSmgs doc;
    private Sheet sheet;
    private CellStyle cs;
//    private TextToLinesSplitter splitter;

    public ExportDopList2Excel(String excelFormat, CimSmgs doc, String path4ExcelTmpl) throws IOException, InvalidFormatException {
        super(excelFormat, path4ExcelTmpl);
        this.doc = doc;
        sheet = getWb().getSheetAt(0);
        cs = newCellStyle();
//        splitter =  getDefaultTextToLinesSplitter();
    }

    public void makeCimSmgsDopList_de() {
        Cell cell;

        // Номер накладной
        int rowInd = 5;
        int colInd = 0;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG694()), cs);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        // Отправитель
        rowInd = 7;
        colInd = 0;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG1()), cs);
        setRowHeight(cell, 320);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);

        rowInd = 8;
        colInd = 0;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG1r()), cs);
        setRowHeight(cell, 368);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        // Получатель
        rowInd = 7;
        colInd = 5;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG4()), cs);
        setRowHeight(cell, 320);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);

        rowInd = 8;
        colInd = 5;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG4r()), cs);
        setRowHeight(cell, 368);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        // Станция отправления
        rowInd = 10;
        colInd = 0;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG162()), cs);
        setRowHeight(cell, 192);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);

        rowInd = 10;
        colInd = 3;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG162r()), cs);
        setRowHeight(cell, 128);

        rowInd = 11;
        colInd = 0;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG163()), cs);
        setRowHeight(cell, 192);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        rowInd = 11;
        colInd = 3;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG163r()), cs);
        setRowHeight(cell, 128);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        // Станция назначения
        rowInd = 10;
        colInd = 5;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG101()), cs);
        setRowHeight(cell, 196);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);

        rowInd = 10;
        colInd = 9;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG101r()), cs);
        setRowHeight(cell, 171);

        rowInd = 11;
        colInd = 5;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG102()), cs);
        setRowHeight(cell, 196);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_LEFT, CellStyle.BORDER_THIN);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        rowInd = 11;
        colInd = 9;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(doc.getG102r()), cs);
        setRowHeight(cell, 171);
        CellUtil.setCellStyleProperty(cell, getWb(), CellUtil.BORDER_BOTTOM, CellStyle.BORDER_THIN);

        // Тело документа

        rowInd = 11;
        CellRangeAddress region = null;
        //Поле 7
        if (isSatisfiedToCreateRegion(doc.getG7c(), doc.buildG7Cs())) {
            region = createDataRegion(doc.buildG7Cs(), rowInd, "7");
            rowInd = region.getLastRow();
        }
        //Поле 9
        if (isSatisfiedToCreateRegion(doc.getG9c(), doc.buildG9Cs())) {
            region = createDataRegion(doc.buildG9Cs(), rowInd, "9");
            rowInd = region.getLastRow();
        }
        //Поле 13
        if (isSatisfiedToCreateRegion(doc.getG13c(), doc.buildG13Cs())) {
            region = createDataRegion(doc.buildG13Cs(), rowInd, "13");
            rowInd = region.getLastRow();
        }
        //Поле 15
        if (isSatisfiedToCreateRegion(doc.getG15c(), doc.buildG15_cs())) {
            region = createDataRegion(doc.buildG15_cs(), rowInd, "15");
            rowInd = region.getLastRow();
        }
        if (isSatisfiedToCreateRegion(doc.getG15c(), doc.buildG15r_cs())) {
            region = createDataRegion(doc.buildG15r_cs(), rowInd);
            rowInd = region.getLastRow();
        }
        //Поле 18
        if (isSatisfiedToCreateRegion(doc.getG18c(), doc.buildG18Cs())) {
            region = createDataRegion(doc.buildG18Cs(), rowInd, "18");
            rowInd = region.getLastRow();
        }
        //Поле 20
        if (isSatisfiedToCreateRegion(doc.getG20c(), doc.buildG20Cs())) {
            region = createDataRegion(doc.buildG20Cs(), rowInd, "20");
            rowInd = region.getLastRow();
        }

        // Apply last Row style
        if(region != null){
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, region, sheet, getWb());
        }

    }

    private boolean isSatisfiedToCreateRegion(Byte checked, String text) {
        return checked != null && checked == 1 && StringUtils.isNotBlank(text);
    }

    private int getLastRowInd(int rowInd, CellRangeAddress region) {
        return region != null ? region.getLastRow() : rowInd;
    }

    private CellRangeAddress createDataRegion(String text, int rowInd, String headerText) {
        Cell cell;
        CellRangeAddress region;
        int colInd = 0;
        final String DATA_HEADER_TMPL = "Поле / Feld %s:";
        final int SHEET_MAX_WIDTH_PX = 738;

        if (headerText != null) {    // шапка не всегда нужна
            rowInd++;
            CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, String.format(DATA_HEADER_TMPL, headerText), cs);
            region = addMergedRegion(rowInd);

        }

        rowInd++;
        cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, text, cs);
        region = addMergedRegion(rowInd);
        setRowHeight(cell, SHEET_MAX_WIDTH_PX);
        return region;
    }

    private CellRangeAddress createDataRegion(String text, int rowInd) {
        return createDataRegion(text, rowInd, null);
    }

    private CellRangeAddress addMergedRegion(int rowInd) {
        final String CELL_MAX_RANGE_ADDRESS_TMPL = "A%s:R%s";
        int rowIndAbsolut = (rowInd + 1);
        CellRangeAddress region = CellRangeAddress.valueOf(String.format(CELL_MAX_RANGE_ADDRESS_TMPL, rowIndAbsolut, rowIndAbsolut));
        sheet.addMergedRegion(region);
        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, region, sheet, getWb());
        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, region, sheet, getWb());
        return region;
    }

    private void setRowHeight(Cell cell, int cellWidthPx) {
        String text = "";
        try {
            text = cell.getStringCellValue();
        } catch (RuntimeException ignore) {
            text = Double.toString(cell.getNumericCellValue());
        }

        final int cellMarginsPx = 5;
        if (StringUtils.isNotBlank(text)) {
            cellWidthPx = (cellWidthPx - cellMarginsPx);
            Font font = getWb().getFontAt(cell.getCellStyle().getFontIndex());

            initTextToLinesSplitter(font);

            int lineCnt = TextToLinesSplitter.countLinesInText(text, cellWidthPx);
            if (lineCnt > 1) {
                Row currRow = cell.getRow();
                currRow.setHeight((short) (currRow.getHeight() * lineCnt));
            }
        }
    }

    private void initTextToLinesSplitter(Font font) {
        TextToLinesSplitter.setFontHeightPt(font.getFontHeightInPoints());
        TextToLinesSplitter.setFontName(font.getFontName());
        if (font.getBoldweight() == Font.BOLDWEIGHT_BOLD) {
            TextToLinesSplitter.setFontWeight(TextToLinesSplitter.FONT_BOLD);
        }
        if (font.getItalic()) {
            TextToLinesSplitter.setFontWeight(TextToLinesSplitter.FONT_ITALIC);
        }
    }

    private Font newFont(short height, short weight) {
        Font font = getWb().createFont();
        font.setFontHeightInPoints(height);
        font.setBoldweight(weight);
//        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        return font;
    }

    private CellStyle newCellStyle() {
        CellStyle cs = getWb().createCellStyle();
        cs.setWrapText(true);
        cs.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs.setAlignment(CellStyle.ALIGN_LEFT);
        cs.setFont(newFont((short) 9, Font.BOLDWEIGHT_NORMAL));
        return cs;
    }

    /*private CellStyle cellStyle2() {
        CellStyle cs = getWb().createCellStyle();
        cs.setWrapText(true);
        cs.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs.setAlignment(CellStyle.ALIGN_LEFT);
        cs.setFont(font1());
        cs.setBorderBottom(CellStyle.BORDER_THIN);
        return cs;
    }*/
}
