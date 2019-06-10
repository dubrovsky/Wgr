package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.stPack;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;

import java.io.ByteArrayInputStream;

/**
 * Created by p.dzeviarylin on 15.11.2014 13:34.
 */
public class ExportReport3 extends ExportBlank {


  public ExportReport3(stPack st, stPack stw) throws Exception {
//    wb = new HSSFWorkbook(new FileInputStream("D:\\Report3.xls"));
    wb = new HSSFWorkbook(new ByteArrayInputStream(Excel.getXlsFile("Report3")));
    initBook();
    Sheet sheet = wb.getSheetAt(0);
    short rowIndex = 4;
    Row row = null;
    Cell cell = null;

    row = sheet.getRow(1);
    cell = row.getCell(4);
    cell.setCellValue("zo: " + stw.getTxt(0, "dat1"));
    cell = row.getCell(6);
    cell.setCellValue("na: " + stw.getTxt(0, "dat2"));

    CellStyle s16 = getStyle((short) 16);
    CellStyle s10 = getStyle((short) 10);

    for (int i = 0; i < st.getRowCount(); i++) {
      stPack st2 = (stPack) st.getPack(i,"ky_vagon");
      if(st2 != null) {


        row = sheet.createRow(rowIndex);
        rowIndex ++;
        Cell[] cells = createCells(row, 0, 7);
        sheet.addMergedRegion(CellRangeAddress.valueOf("A" + rowIndex + ":H" + rowIndex));
        cells[0].setCellValue(st.getTxt(i, "foot"));
        cells[0].setCellStyle(s16);
        row.setHeight((short) 500);

        boolean o = false;
        for (int ii = 0; ii < st2.getRowCount(); ii++) {
          stPack st3 = (stPack) st2.getPack(ii,"ky_vagon2");

          if(st3 == null) {
            row = sheet.createRow(rowIndex);
            rowIndex ++;
            int j = 0;
            cell = createCell(row, j, st2.getTxt(ii, "NVAG"));
            j++;
//          cell.getCellStyle().setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
            createCell(row, j, st2.getTxt(ii, "DPRB"));
            j++;
            createCell(row, j, st2.getTxt(ii, "PORUZ"));
            j++;
            createCell(row, j, st2.getTxt(ii, "SOBSTV"));
            j++;
            createCell(row, j, st2.getTxt(ii, "REVIZ"));
            j++;
            createCell(row, j, st2.getTxt(ii, "PROBEG"), Cell.CELL_TYPE_NUMERIC );
            j++;
            createCell(row, j, st2.getTxt(ii, "DOTP"));
            j++;
            createCell(row, j, st2.getTxt(ii, "PRIM"));
            j++;
          }
          else {
            o = true;
          }
        }

        if(o) {
          row = sheet.createRow(rowIndex);
          rowIndex ++;
          cells = createCells(row, 0, 7);
          sheet.addMergedRegion(CellRangeAddress.valueOf("A" + rowIndex + ":H" + rowIndex));
          cells[0].setCellValue("odoslané");
          cells[0].setCellStyle(s10);
          row.setHeight((short) 400);

          for (int ii = 0; ii < st2.getRowCount(); ii++) {
            stPack st3 = (stPack) st2.getPack(ii,"ky_vagon2");
            if(st3 != null) {
              row = sheet.createRow(rowIndex);
              rowIndex ++;
              int j = 0;
              cell = createCell(row, j, st2.getTxt(ii, "NVAG"));
              j++;
//          cell.getCellStyle().setDataFormat(HSSFDataFormat.getBuiltinFormat("@"));
              createCell(row, j, st2.getTxt(ii, "DPRB"));
              j++;
              createCell(row, j, st2.getTxt(ii, "PORUZ"));
              j++;
              createCell(row, j, st3.getTxt(0, "SOBSTV"));
              j++;
              createCell(row, j, st3.getTxt(0, "REVIZ"));
              j++;
              createCell(row, j, st3.getTxt(0, "PROBEG"), Cell.CELL_TYPE_NUMERIC );
              j++;
              createCell(row, j, st3.getTxt(0, "DOTP"));
              j++;
              createCell(row, j, st3.getTxt(0, "PRIM"));
              j++;
            }
          }
        }
      }
    }

  }



}
