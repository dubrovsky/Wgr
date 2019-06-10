package com.bivc.cimsmgs.actions.ky;

import org.apache.poi.ss.usermodel.*;

import java.io.ByteArrayOutputStream;

/**
 * Created by vva on 12.03.15.
 */
public class ExportBlank {
  protected Workbook wb = null;
  protected Font font = null;
  protected CellStyle style = null;

  protected void initBook() throws Exception {
    font = wb.createFont();

    style = wb.createCellStyle();
    style.setFont(font);
    style.setBorderBottom(CellStyle.BORDER_THIN);
    style.setBorderLeft(CellStyle.BORDER_THIN);
    style.setBorderRight(CellStyle.BORDER_THIN);
    style.setBorderTop(CellStyle.BORDER_THIN);
    style.setVerticalAlignment(CellStyle.VERTICAL_TOP);
  }

  protected CellStyle getStyle(short fontSizePoints) {
    Font f = wb.createFont();
    f.setFontHeightInPoints(fontSizePoints);

    CellStyle s = wb.createCellStyle();
    s.setFont(f);
    s.setBorderBottom(CellStyle.BORDER_THIN);
    s.setBorderLeft(CellStyle.BORDER_THIN);
    s.setBorderRight(CellStyle.BORDER_THIN);
    s.setBorderTop(CellStyle.BORDER_THIN);
    return s;
  }

  protected Cell createCell(Row row, int j, String value, int type) {
    Cell cell = row.createCell(j);
    if(value != null && value.length() > 0) {
      switch (type) {
        case Cell.CELL_TYPE_NUMERIC:
          cell.setCellValue(new Double(value));
          break;
        default:
          cell.setCellValue(value);
          break;
      }
    }
    cell.setCellStyle(style);
    if(type != -1) cell.setCellType(type);
    return cell;
  }

  protected Cell createCell(Row row, int j, String value) {
    Cell cell = row.createCell(j);
    cell.setCellValue(value);
    cell.setCellStyle(style);
    return cell;
  }

  protected Cell[] createCells(Row row, int j1, int j2) {
    Cell[] cells = new Cell[j2 - j1 + 1];
    for (int i = 0; i < cells.length; i++) {
      cells[i] = row.createCell(i + j1);
      cells[i].setCellStyle(style);
    }
    return cells;
  }

  public ByteArrayOutputStream get() throws Exception {
    ByteArrayOutputStream baos = new ByteArrayOutputStream();
    wb.write(baos);
    baos.close();
    return baos;
  }

}
