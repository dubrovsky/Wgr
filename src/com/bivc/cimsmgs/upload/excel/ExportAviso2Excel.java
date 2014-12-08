package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.dao.NsiStaDAO;
import com.bivc.cimsmgs.dao.hibernate.NsiStaDAOHib;
import com.bivc.cimsmgs.db.CimSmgs;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.util.IOUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class ExportAviso2Excel extends /*ExportDoc2Excel*/ Export2Excel{
    private CimSmgs smgs;
    private String path2Logo;
    private Sheet sheet;

    public ExportAviso2Excel(String excelFormat, CimSmgs smgs, String path2Logo) {
        super(excelFormat/*, hid*/);
        this.smgs = smgs;
        this.path2Logo = path2Logo;
        sheet = getWb().createSheet();
    }

    public void avisogu29k() throws IOException {
        // get data
//        SmgsDAO smgsDao = new SmgsDAOHib();
//        CimSmgs smgs = smgsDao.findById(hid, false);


        AvisoDataBuilder dataBuilder = new AvisoDataBuilder(smgs);
        // end get data

        // create 1 row
        // create logo img
        Row row = sheet.createRow(0);
        row.setHeightInPoints(75f);
        row.createCell(0);
        sheet.setColumnWidth(0, 25600); // 100 simbols (*256)
        addImage(0, 0, Workbook.PICTURE_TYPE_PNG, path2Logo);
        // end 1 row


        /*Font font = getWb().createFont();
        CellStyle style = getWb().createCellStyle();
        style.setFont(font);*/
        // create 2 row
        createCell(1, 0, dataBuilder.build2Row());
        // end 2 row

        // create 3 row
        Font font2 = getWb().createFont();
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        createCell(2, 0, dataBuilder.build3Row(), font2);
        // end 3 row

        // create 4 row
        NsiStaDAO staDao = new NsiStaDAOHib();
        createCell(3, 0, dataBuilder.build4Row(staDao), 50f, true, CellStyle.VERTICAL_TOP);
        // end 4 row

        // create 5 row
        createCell(4, 0, dataBuilder.build5Row());
        // end 5 row

        // create 7 row
        createCell(6, 0, dataBuilder.build7Row(), 50f, true, CellStyle.VERTICAL_TOP);
        // end 7 row

        // create 9 row
        createCell(8, 0, dataBuilder.build9Row(), 50f, true, CellStyle.VERTICAL_TOP);
        // end 9 row

        // create 11 row
//        createCell(10, 0, dataBuilder.build11Row(staDao), 30f, true, CellStyle.VERTICAL_TOP);
        // end 11 row

        // create 13 row
        createCell(10, 0, dataBuilder.build13Row(staDao));
        // end 13 row

        // create 15 row
        createCell(12, 0, dataBuilder.build15Row(), 30f, true, CellStyle.VERTICAL_TOP);
        // end 15 row

        // create 17 row
        createCell(14, 0, dataBuilder.build17Row(), 30f, true, CellStyle.VERTICAL_TOP);
        // end 17 row

        // create 19 row
//        createCell(18, 0, dataBuilder.build19Row());
        // end 19 row

        // create 20 row
        createCell(15, 0, dataBuilder.build20Row(), 40f, true, CellStyle.VERTICAL_TOP);
        // end 20 row

        // create 21 row
        createCell(16, 0, dataBuilder.build21Row());
        // end 21 row

        Font font1 = getWb().createFont();
        font1.setUnderline(Font.U_SINGLE);
        // create 6 row
        createCell(5, 0, "В графе 1 «Отправитель»:", font1);
        // end 6 row

        // create 8 row
        createCell(7, 0, "В графе 5 «Получатель»:", font1);
        // end 8 row

        // create 10 row
//        createCell(9, 0, "В графе 7 «Пограничные станции перехода»:", font1);
        // end 10 row

        // create 12 row
        createCell(9, 0, "В графе 8 «Дорога и станция назначения»:", font1);
        // end 12 row

        // create 14 row
        createCell(11, 0, "В графе 11 «Наименование груза»:", font1);
        // end 14 row

        // create 16 row
        createCell(13, 0, "В графе 4 «Особые заявления отправителя»:", font1);
        // end 16 row

        // create 18 row
//        createCell(17, 0, "В графе 6 «Отметки, не обязательные для железной дороги»:", font1);
        // end 18 row
    }

    public void avisogu29k1() throws IOException {
        avisogu29k();
    }

    public void aviso1() throws IOException {
        aviso();
    }

    public void aviso() throws IOException {
        // get data
//        SmgsDAO smgsDao = new SmgsDAOHib();
//        CimSmgs smgs = smgsDao.findById(hid, false);


        AvisoDataBuilder dataBuilder = new AvisoDataBuilder(smgs);
        // end get data

        // create 1 row
        // create logo img
        Row row = sheet.createRow(0);
        row.setHeightInPoints(75f);
        row.createCell(0);
        sheet.setColumnWidth(0, 25600); // 100 simbols (*256)
        addImage(0, 0, Workbook.PICTURE_TYPE_PNG, path2Logo);
        // end 1 row


        /*Font font = getWb().createFont();
        CellStyle style = getWb().createCellStyle();
        style.setFont(font);*/
        // create 2 row
        createCell(1, 0, dataBuilder.build2Row());
        // end 2 row

        // create 3 row
        Font font2 = getWb().createFont();
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);
        createCell(2, 0, dataBuilder.build3Row(), font2);
        // end 3 row

        // create 4 row
        NsiStaDAO staDao = new NsiStaDAOHib();
        createCell(3, 0, dataBuilder.build4Row(staDao), 50f, true, CellStyle.VERTICAL_TOP);
        // end 4 row

        // create 5 row
        createCell(4, 0, dataBuilder.build5Row());
        // end 5 row

        // create 7 row
        createCell(6, 0, dataBuilder.build7Row(), 50f, true, CellStyle.VERTICAL_TOP);
        // end 7 row

        // create 9 row
        createCell(8, 0, dataBuilder.build9Row(), 50f, true, CellStyle.VERTICAL_TOP);
        // end 9 row

        // create 11 row
        createCell(10, 0, dataBuilder.build11Row(staDao), 30f, true, CellStyle.VERTICAL_TOP);
        // end 11 row

        // create 13 row
        createCell(12, 0, dataBuilder.build13Row(staDao));
        // end 13 row

        // create 15 row
        createCell(14, 0, dataBuilder.build15Row(), 30f, true, CellStyle.VERTICAL_TOP);
        // end 15 row

        // create 17 row
        createCell(16, 0, dataBuilder.build17Row(), 30f, true, CellStyle.VERTICAL_TOP);
        // end 17 row

        // create 19 row
        createCell(18, 0, dataBuilder.build19Row());
        // end 19 row

        // create 20 row
        createCell(19, 0, dataBuilder.build20Row(), 40f, true, CellStyle.VERTICAL_TOP);
        // end 20 row

        // create 21 row
        createCell(20, 0, dataBuilder.build21Row());
        // end 21 row

        Font font1 = getWb().createFont();
        font1.setUnderline(Font.U_SINGLE);
        // create 6 row
        createCell(5, 0, "В графе 1 «Отправитель»:", font1);
        // end 6 row

        // create 8 row
        createCell(7, 0, "В графе 5 «Получатель»:", font1);
        // end 8 row

        // create 10 row
        createCell(9, 0, "В графе 7 «Пограничные станции перехода»:", font1);
        // end 10 row

        // create 12 row
        createCell(11, 0, "В графе 8 «Дорога и станция назначения»:", font1);
        // end 12 row

        // create 14 row
        createCell(13, 0, "В графе 11 «Наименование груза»:", font1);
        // end 14 row

        // create 16 row
        createCell(15, 0, "В графе 4 «Особые заявления отправителя»:", font1);
        // end 16 row

        // create 18 row
        createCell(17, 0, "В графе 6 «Отметки, не обязательные для железной дороги»:", font1);
        // end 18 row
    }

    private void createCell(int rowInx, int cellInx, String cellValue){
        Row row = sheet.createRow(rowInx);
        Cell cell = row.createCell(cellInx);
        cell.setCellValue(cellValue);
    }

    private void createCell(int rowInx, int cellInx, String cellValue, CellStyle style){
        Row row = sheet.createRow(rowInx);
        Cell cell = row.createCell(cellInx);
        cell.setCellValue(cellValue);
        cell.setCellStyle(style);
    }

    private void createCell(int rowInx, int cellInx, String cellValue, Font font){
        Row row = sheet.createRow(rowInx);
        Cell cell = row.createCell(cellInx);
        cell.setCellValue(cellValue);
        CellStyle cellStyle = getWb().createCellStyle();
        cellStyle.setFont(font);
        cell.setCellStyle(cellStyle);
    }

    private void createCell(int rowInx, int cellInx, String cellValue, float rowHeight, boolean wrap, short valign){
        Row row = sheet.createRow(rowInx);
        row.setHeightInPoints(rowHeight);
        Cell cell = row.createCell(cellInx);
        cell.setCellValue(cellValue);
        CellStyle cellStyle = getWb().createCellStyle();
        cell.setCellStyle(cellStyle);
        cellStyle.setWrapText(wrap);
        cellStyle.setVerticalAlignment(valign);
    }

    public void addImage(int rowInx, int colInx, int picType, String path2Img) throws IOException {
        InputStream is = new FileInputStream(path2Img);
        byte[] bytes = IOUtils.toByteArray(is);
        int pictureIdx = getWb().addPicture(bytes, picType);
        is.close();
        CreationHelper helper = getWb().getCreationHelper();

        // Create the drawing patriarch.  This is the top level container for all shapes.
        Drawing drawing = sheet.createDrawingPatriarch();

        //add a picture shape
        ClientAnchor anchor = helper.createClientAnchor();
        //set top-left corner of the picture,
        //subsequent call of Picture#resize() will operate relative to it
        anchor.setCol1(colInx);
        anchor.setRow1(rowInx);
//        sheet.autoSizeColumn(0);
        Picture pict = drawing.createPicture(anchor, pictureIdx);
        //auto-size picture relative to its top-left corner
        pict.resize(/*0.25*/);

    }
}
