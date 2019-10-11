package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.xls.Excel;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Set;

public class SostojanieKontAvto extends ReportAction {
    @Override
    public String execute(Report_A report) throws Exception {
        String chk = "✓";

        String flNm = "OCENA STANU TECHNICZNEGO KONTENERA";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;

        Kont kont = report.getKontDAO().getByIdWithAllParents(report.getHid());
        Avto avto = kont.getAvto();
        if(kont != null && avto != null) {

            row = sheet.getRow(3);
            cell = row.getCell(6);
            cell.setCellValue(kont.getNkon());

            row = sheet.getRow(4);
            if(avto.getDirection() != null) {
                if(avto.getDirection() == 1) {
                    cell = row.getCell(2);
                    cell.setCellValue(chk);
                }
                else if(avto.getDirection() == 2) {
                    cell = row.getCell(4);
                    cell.setCellValue(chk);
                }
            }

            if(kont.getType() == null || !kont.getType().equals("20")) {
                cell = row.getCell(10);
                cell.getCellStyle().setFont(f1);
            }
            if(kont.getType() == null || !kont.getType().equals("40")) {
                cell = row.getCell(12);
                cell.getCellStyle().setFont(f1);
            }


            row = sheet.getRow(7);

            cell = row.getCell(1);
            cell.setCellValue(avto.getNo_avto());

            cell = row.getCell(6);
            cell.setCellValue(avto.getNo_trail());

            cell = row.getCell(12);
            Set<Plomb> pl = kont.getPlombs();
            if(pl != null) {
                StringBuffer sb = new StringBuffer();
                int i = 0;
                for (Plomb p: pl) {
                    if(i > 0) {
                        sb.append(", ");
                    }
                    sb.append(p.getZnak());
                    i++;
                }
                cell.setCellValue(sb.toString());
            }

            row = sheet.getRow(32);

            cell = row.getCell(4);
            cell.setCellValue(report.getUser().getUsr().getNamKlient());

            cell = row.getCell(11);
            cell.setCellValue(avto.getDriver_fio());

            report.setFilename(flNm + " - " + kont.getNkon() + ".xlsx");
        }


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();

        report.setInputStream(new ByteArrayInputStream(baos.toByteArray()));
        return "excel";
    }
}
