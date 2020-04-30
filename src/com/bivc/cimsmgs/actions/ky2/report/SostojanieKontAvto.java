package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import com.isc.utils.dbStore.typesAndValues;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.sql.Types;
import java.util.Date;
import java.util.Set;

public class SostojanieKontAvto extends ReportAction {

    public SostojanieKontAvto() throws Exception {
    }

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

            if(kont.getType() != null && (kont.getType().equals("20") || kont.getType().equals("40"))) {
                if(!kont.getType().equals("20")) {
                    cell = row.getCell(10);
                    cell.getCellStyle().setFont(f1);
                }
                if(!kont.getType().equals("40")) {
                    cell = row.getCell(12);
                    cell.getCellStyle().setFont(f1);
                }
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

            if(avto.getDirection() != null) {
                if(avto.getDirection() == 1) {
                    cell = row.getCell(4);
                    cell.setCellValue(avto.getDriver_fio());

                    cell = row.getCell(11);
                    cell.setCellValue(report.getUser().getUsr().getNamKlient());
                }
                else if(avto.getDirection() == 2) {
                    cell = row.getCell(4);
                    cell.setCellValue(report.getUser().getUsr().getNamKlient());

                    cell = row.getCell(11);
                    cell.setCellValue(avto.getDriver_fio());
                }
            }



            report.setFilename(flNm + " - " + kont.getNkon() + ".xlsx");
        }


        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.flush();
        baos.close();
        byte[] mb = baos.toByteArray();

        if(kont != null && avto != null) {
            dbTool dbt = HibernateUtil.initDbTool();
            stPack st = new stPack("ky_avto_files");
            st.setKeyName("HID_AVTO,HID_KONT");
            stPack st_seq = new stPack();
            dbt.read(st_seq, "select NextVal('KY_AVTO_FILES_HID') AS NV", null);
            st.setObject(0, "HID", st_seq.getObject(0, 0));
            st.setObject(0, "HID_KONT", kont.getHid());
            st.setObject(0, "HID_AVTO", avto.getHid());
            st.setObject(0, "FILES", mb);
            st.setObject(0, "FILE_NAME", report.getFilename());
            st.setObject(0, "CONTENT_TYPE", "application/vnd.ms-excel");
            st.setObject(0, "LENGTH", mb.length);
            st.setObject(0, "UPLOADED", new Date());
            st.setObject(0, "DOC_TYPE", "AKT");
            dbt.save("KY_AVTO_FILES", st, 0, null);
            dbt.commit();
        }


        report.setInputStream(new ByteArrayInputStream(mb));
        return "excel";
    }
}
