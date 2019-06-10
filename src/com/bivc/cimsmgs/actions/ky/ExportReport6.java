package com.bivc.cimsmgs.actions.ky;

import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.stPack;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;

import java.io.ByteArrayInputStream;

/**
 * Created by p.dzeviarylin on 15.11.2014 13:34.
 */
public class ExportReport6 extends ExportBlank {


  public ExportReport6(stPack st, int direction) throws Exception {
//    wb = new HSSFWorkbook(new FileInputStream("D:\\Report3.xls"));
    wb = new HSSFWorkbook(new ByteArrayInputStream(Excel.getXlsFile("Priamy_preklad")));
    initBook();
    Sheet sheet = wb.getSheetAt(0);
    short d_rowIndex = 6;
    short rowIndex = 6;
    Row row = null;
    Cell cell = null;

    cell = sheet.getRow(2).getCell(9);
    cell.setCellValue(st.getTxt(0, "NPPR"));
    cell = sheet.getRow(3).getCell(9);
    cell.setCellValue(st.getTxt(0, "DAT"));

    cell = sheet.getRow(7).getCell(3);
    cell.setCellValue(st.getTxt(0, "COUNT_V"));
    cell = sheet.getRow(8).getCell(3);
    cell.setCellValue(st.getTxt(0, "COUNT_K"));

//    CellStyle s16 = getStyle((short) 16);
    CellStyle sTxt = getStyle((short) 10);
    sTxt.setWrapText(true);

    for (int i = 0; i < st.getRowCount(); i++) {
      stPack st_v = (stPack) st.getPack(i,"vagon");
      if(st_v != null) {

        for (int i_rv = 0; i_rv < st_v.getRowCount(); i_rv++) {
          stPack st_k = (stPack) st_v.getPack(i_rv,"kont");

          if(st_k != null) {

            for (int i_rk = 0; i_rk < st_k.getRowCount(); i_rk++) {
              sheet.shiftRows(rowIndex, sheet.getLastRowNum(), 1);
              row = sheet.createRow(rowIndex);
              rowIndex ++;
              int j = 0;
              createCell(row, j, "" + (rowIndex - d_rowIndex), Cell.CELL_TYPE_NUMERIC);
              j++;
              createCell(row, j, " " + st_v.getTxt(i_rv, "NVAG"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "NKON"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "VID"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "POD_SILA"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "MASSA_TAR"));
              j++;
              StringBuffer p = new StringBuffer();
              stPack st3 = (stPack) st_k.getPack(i_rk,"plomb");
              if(st3 != null) {
                for (int i3 = 0; i3 < st3.getRowCount(); i3++) {
                  if(i3 > 0) p.append(", ");
                  if(st3.getObject(i3,"KPL") != null && ((Number)st3.getObject(i3,"KPL")).intValue() != 1) {
                    p.append(st3.getTxt(i3,"KPL"));
                    p.append(" - ");
                  }
                  p.append(st3.getTxt(i3,"ZNAK"));
                }
              }
              cell = createCell(row, j, p.toString());
              cell.setCellStyle(sTxt);
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "NPPR"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "NVAG"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "MAS_TAR"));
              j++;
              createCell(row, j, st_k.getTxt(i_rk, "POD_SILA_V"));
              j++;
            }
          }
          else {
            sheet.shiftRows(rowIndex, sheet.getLastRowNum(), 1);
            row = sheet.createRow(rowIndex);
            rowIndex ++;
            int j = 0;
            createCell(row, j, "" + (rowIndex - d_rowIndex), Cell.CELL_TYPE_NUMERIC);
            j++;
            createCell(row, j, " " + st_v.getTxt(i_rv, "NVAG"));
            j++;
            createCells(row,2,10);
          }
        }
      }
    }

  }



}
