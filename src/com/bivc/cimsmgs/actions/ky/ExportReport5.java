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
public class ExportReport5 extends ExportBlank {


    public ExportReport5(stPack st, int koleya) throws Exception {
        wb = new HSSFWorkbook(new ByteArrayInputStream(Excel.getXlsFile("Report5")));
        initBook();
        Sheet sheet = wb.getSheetAt(0);
        short rowIndex = 3;
        Row row = null;
        Cell cell = null;

        row = sheet.getRow(0);
        cell = row.getCell(0);
        cell.setCellValue(cell.getStringCellValue() + ", " + (koleya == 1 ? "широкая колея" : "узкая колея"));

        row = sheet.getRow(1);
        cell = row.getCell(5);
        cell.setCellValue(cell.getStringCellValue() + mf.currentDate("dd.MM.yyyy HH:mm:ss"));

        CellStyle s12 = getStyle((short) 12);
//    s12.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle sTxt = getStyle((short) 10);
        sTxt.setWrapText(true);
//    s12.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        for (int i = 0; i < st.getRowCount(); i++) {
            stPack st2 = (stPack) st.getPack(i, "kont_owner");
            if (st2 != null) {

                row = sheet.createRow(rowIndex);
                rowIndex++;
                Cell[] cells = createCells(row, 0, 6);
                sheet.addMergedRegion(CellRangeAddress.valueOf("A" + rowIndex + ":G" + rowIndex));
                cells[0].setCellValue(st.getTxt(i, "NAMEOWN") + ",   nomer puti: " + st.getTxt(i, "LINE") + ",   data: " + st.getTxt(i, "DPRB"));
                cells[0].setCellStyle(s12);
                row.setHeight((short) 350);

//        int r_b = rowIndex + 1;
//        int r_e = rowIndex + st2.getRowCount();
                for (int ii = 0; ii < st2.getRowCount(); ii++) {
                    row = sheet.createRow(rowIndex);
                    rowIndex++;
                    int j = 0;
                    createCell(row, j, st2.getTxt(ii, "NVAG"));
                    j++;
                    createCell(row, j, st2.getTxt(ii, "NKON"));
                    j++;
                    createCell(row, j, st2.getTxt(ii, "VID"));
                    j++;
                    createCell(row, j, st2.getTxt(ii, "POD_SILA"));
                    j++;
                    createCell(row, j, st2.getTxt(ii, "MASSA_TAR"));
                    j++;
                    StringBuffer p = new StringBuffer();
                    stPack st3 = (stPack) st2.getPack(ii, "ky_plomb");
                    if (st3 != null) {
                        for (int i3 = 0; i3 < st3.getRowCount(); i3++) {
                            if (i3 > 0) p.append(", ");
                            if (st3.getObject(i3, "KPL") != null && ((Number) st3.getObject(i3, "KPL")).intValue() != 1) {
                                p.append(st3.getTxt(i3, "KPL"));
                                p.append(" - ");
                            }
                            p.append(st3.getTxt(i3, "ZNAK"));
                        }
                    }
                    cell = createCell(row, j, p.toString());
                    cell.setCellStyle(sTxt);
                    j++;
                    createCell(row, j, st2.getTxt(ii, "PRIM"));
                    j++;
                }
//        if(r_e > r_b) sheet.addMergedRegion(CellRangeAddress.valueOf("A" + r_b + ":A" + r_e));
            }
        }

    }


}
