package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.mf;
import com.isc.utils.dbStore.stPack;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.util.CellRangeAddress;

import java.io.ByteArrayInputStream;

/**
 * Created by p.dzeviarylin on 15.11.2014 13:34.
 */
public class ExportReport4 extends ExportBlank {


  public ExportReport4(stPack st, int koleya) throws Exception {
    wb = new HSSFWorkbook(new ByteArrayInputStream(Excel.getXlsFile("Report4")));
    initBook();
    Sheet sheet = wb.getSheetAt(0);
    short rowIndex = 4;
    Row row = null;
    Cell cell = null;

    row = sheet.getRow(0);
    cell = row.getCell(0);
    cell.setCellValue(cell.getStringCellValue() + ", " + (koleya == 1 ? "широкая колея":"узкая колея"));

    row = sheet.getRow(1);
    cell = row.getCell(6);
    cell.setCellValue(cell.getStringCellValue() + mf.currentDate("dd.MM.yyyy HH:mm:ss"));

    CellStyle s12 = getStyle((short) 12);
    s12.setVerticalAlignment(CellStyle.VERTICAL_TOP);

    for (int i = 0; i < st.getRowCount(); i++) {
      stPack st2 = (stPack) st.getPack(i,"ky_vagon");
      if(st2 != null) {

/*
        row = sheet.createRow(rowIndex);
        rowIndex ++;
        Cell[] cells = createCells(row, 0, 7);
        sheet.addMergedRegion(CellRangeAddress.valueOf("A" + rowIndex + ":H" + rowIndex));
        cells[0].setCellValue(st.getTxt(i, "line"));
        cells[0].setCellStyle(s16);
        row.setHeight((short) 500);
*/

        int r_b = rowIndex + 1;
        int r_e = rowIndex + st2.getRowCount();
        for (int ii = 0; ii < st2.getRowCount(); ii++) {
          row = sheet.createRow(rowIndex);
          rowIndex ++;
          int j = 0;
          if(ii == 0) {
            cell = createCell(row, j, st.getTxt(i, "line"));
            cell.setCellStyle(s12);
//            System.out.println(row + " - " + j + " - " + i + " - " + st.getTxt(i, "line"));
          }
          else {
            createCell(row, j, "");
          }
          j++;
          createCell(row, j, st2.getTxt(ii, "NVAG"));
          j++;
          createCell(row, j, st2.getTxt(ii, "FOOT") + "-" + st2.getTxt(ii, "MAS_TAR") + "-" + st2.getTxt(ii, "POD_SILA") );
          j++;
          createCell(row, j, st2.getTxt(ii, "REVIZE"));
          j++;
          createCell(row, j, st2.getTxt(ii, "PORUZ"));
          j++;
          createCell(row, j, st2.getTxt(ii, "DEFECTIVE"));
          j++;
          createCell(row, j, st2.getTxt(ii, "SOBSTV"));
          j++;
          createCell(row, j, st2.getTxt(ii, "PRIM"));
          j++;
        }
        if(r_e > r_b) sheet.addMergedRegion(CellRangeAddress.valueOf("A" + r_b + ":A" + r_e));
      }
    }

  }



}
