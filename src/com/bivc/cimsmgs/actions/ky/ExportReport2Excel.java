package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.dto.ky.ListForPoezdDTO;
import com.bivc.cimsmgs.dto.ky.ListForVagonDTO;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

/**
 * Created by p.dzeviarylin on 15.11.2014 13:34.
 */
public class ExportReport2Excel {
    public static ByteArrayOutputStream convertReport1(ListForPoezdDTO poezdDTO, String nppr) throws IOException {
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = wb.createSheet("Список по поезду " + nppr);

        short rowIndex = 0;
        int cellIndex = 1;
        Row row;
        Cell cell;

        /// TITLE

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("Список по поезду " + nppr);

        Font font = wb.createFont();
        CellStyle style = wb.createCellStyle();
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style.setFont(font);
        cell.setCellStyle(style);

        rowIndex++;
        rowIndex++;
        /// TABLE HEADER

        CellStyle style2 = wb.createCellStyle();
        style2.setFont(font);
        style2.setBorderBottom(CellStyle.BORDER_THIN);
        style2.setBorderLeft(CellStyle.BORDER_THIN);
        style2.setBorderRight(CellStyle.BORDER_THIN);
        style2.setBorderTop(CellStyle.BORDER_THIN);

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("№ п/п");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Номер вагона");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Номер контейнера");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Порожний?");
        cell.setCellStyle(style2);

        rowIndex++;
        /// TABLE DATA

        CellStyle style3 = wb.createCellStyle();
        style3.setBorderBottom(CellStyle.BORDER_THIN);
        style3.setBorderLeft(CellStyle.BORDER_THIN);
        style3.setBorderRight(CellStyle.BORDER_THIN);
        style3.setBorderTop(CellStyle.BORDER_THIN);
        for(ListForVagonDTO vagonDTO: poezdDTO.getVags()){
            cellIndex = 1;

            row = sheet.createRow(rowIndex);

            cell = row.createCell(cellIndex);
            cell.setCellValue(vagonDTO.getNumpp() == null ? "" : vagonDTO.getNumpp().toString());
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(vagonDTO.getNvag());
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(vagonDTO.getNkon());
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            if(vagonDTO.getPoruz() == null){
                cell.setCellValue("");
            } else {
                cell.setCellValue(vagonDTO.getPoruz() ? "ДА" : "НЕТ");
            }
            cell.setCellStyle(style3);

            rowIndex++;
        }

        sheet.autoSizeColumn((short)2);
        sheet.autoSizeColumn((short)3);
        sheet.autoSizeColumn((short)4);

        /// SUMS
        cellIndex = 1;
        rowIndex++;

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("Количество вагонов - " + poezdDTO.getVagSum());
        cell.setCellStyle(style);

        rowIndex++;

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("Количество контейнеров - " + poezdDTO.getKontSum());
        cell.setCellStyle(style);


        return writeToOutputStream(wb);
    }

    public static ByteArrayOutputStream convertReport2(List<Yard> yards) throws IOException {
        Workbook wb = new HSSFWorkbook();
        Sheet sheet = wb.createSheet("Расположение контейнеров на площадке");

        short rowIndex = 0;
        int cellIndex = 1;
        Row row;
        Cell cell;

        /// TITLE

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("Расположение контейнеров на площадке");

        Font font = wb.createFont();
        CellStyle style = wb.createCellStyle();
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);
        style.setFont(font);
        cell.setCellStyle(style);

        rowIndex++;
        rowIndex++;
        /// TABLE HEADER

        CellStyle style2 = wb.createCellStyle();
        style2.setFont(font);
        style2.setBorderBottom(CellStyle.BORDER_THIN);
        style2.setBorderLeft(CellStyle.BORDER_THIN);
        style2.setBorderRight(CellStyle.BORDER_THIN);
        style2.setBorderTop(CellStyle.BORDER_THIN);

        row = sheet.createRow(rowIndex);
        cell = row.createCell(cellIndex);
        cell.setCellValue("№ п/п");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Номер контейнера");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Типоразмер контейнера");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Сектор");
        cell.setCellStyle(style2);

        cellIndex++;

        cell = row.createCell(cellIndex);
        cell.setCellValue("Позиция");
        cell.setCellStyle(style2);

        cellIndex++;
        cell = row.createCell(cellIndex);
        cell.setCellValue("Ряд");
        cell.setCellStyle(style2);

        cellIndex++;
        cell = row.createCell(cellIndex);
        cell.setCellValue("Ярус");
        cell.setCellStyle(style2);

        cellIndex++;
        cell = row.createCell(cellIndex);
        cell.setCellValue("Дата размещения");
        cell.setCellStyle(style2);

        rowIndex++;
        /// TABLE DATA
        CellStyle style3 = wb.createCellStyle();
        style3.setBorderBottom(CellStyle.BORDER_THIN);
        style3.setBorderLeft(CellStyle.BORDER_THIN);
        style3.setBorderRight(CellStyle.BORDER_THIN);
        style3.setBorderTop(CellStyle.BORDER_THIN);

        int n_pp = 1;
        for(Yard yard: yards){
            cellIndex = 1;

            row = sheet.createRow(rowIndex);

            cell = row.createCell(cellIndex);
            cell.setCellValue(n_pp);
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getKont() != null ? yard.getKont().getNkon() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getKont() != null && yard.getKont().getType() != null ? yard.getKont().getType().toString() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getSector() != null ? yard.getSector().getName() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getX() != null ? yard.getX().toString() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getY() != null ? yard.getY().toString() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getZ() != null ? yard.getZ().toString() : "");
            cell.setCellStyle(style3);
            cellIndex++;

            cell = row.createCell(cellIndex);
            cell.setCellValue(yard.getKont() != null && yard.getKont().getDprb() != null ? new SimpleDateFormat("dd.MM.yy HH:mm:ss").format(yard.getKont().getDprb()) : "");
            cell.setCellStyle(style3);
            cellIndex++;

            rowIndex++;
            n_pp++;
        }

        sheet.autoSizeColumn((short)2);
        sheet.autoSizeColumn((short)3);
        sheet.autoSizeColumn((short)4);
        sheet.autoSizeColumn((short)5);
        sheet.autoSizeColumn((short)6);
        sheet.autoSizeColumn((short)7);
        sheet.autoSizeColumn((short)8);
        sheet.autoSizeColumn((short)9);

        return writeToOutputStream(wb);
    }

    private static ByteArrayOutputStream writeToOutputStream(Workbook wb) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        wb.write(baos);
        baos.close();
        return baos;
    }


}
