package com.bivc.cimsmgs.actions.ky2.report;

import com.bivc.cimsmgs.actions.ky2.Report_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.xls.Excel;
import com.isc.utils.dbStore.dbTool;
import com.isc.utils.dbStore.stPack;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Date;
import java.util.Set;

public class InterchangeKontAvto extends ReportAction {
    private static final Logger log = LoggerFactory.getLogger(InterchangeKontAvto.class);

    public InterchangeKontAvto() throws Exception {
    }

    @Override
    public String execute(Report_A report) throws Exception {
        String chk = "✓";

        String flNm = "INTERCHANGE";

        XSSFWorkbook excel = new XSSFWorkbook(new ByteArrayInputStream(Excel.getXlsxFile(flNm)));

        XSSFFont f1 = excel.createFont();
        f1.setStrikeout(true);

        Sheet sheet = excel.getSheetAt(0);
        Row row = null;
        Cell cell = null;

        Kont kont = report.getKontDAO().getByIdWithAllParents(report.getHid());
        Avto avto = kont.getAvto();
        if(kont != null && avto != null) {

            row = sheet.getRow(12);
            row.getCell(9).setCellValue(kont.getNkon());

            Date d1 = null;
            row = sheet.getRow(9);
            if(avto.getDirection() != null) {
                if(avto.getDirection() == 1) {
                    row.getCell(16).setCellValue(chk);
                    d1 = kont.getDprb();
                }
                else if(avto.getDirection() == 2) {
                    row.getCell(2).setCellValue(chk);
                    d1 = kont.getDotp();
                }
            }

            row = sheet.getRow(10);
            if(d1 != null) {
                row.getCell(7).setCellValue(dtf_day.format(d1));
                row.getCell(15).setCellValue(dtf_hhmm.format(d1));
            }


            row = sheet.getRow(11);
            if(kont.getPoruz() == null || !kont.getPoruz()) {
                row.getCell(16).setCellValue(chk);
            }
            else {
                row.getCell(2).setCellValue(chk);
            }

            row = sheet.getRow(13);
            if(kont.getType() != null) {
                if(kont.getType().equals("20")) {
                    row.getCell(4).setCellValue(chk);
                }
                else if(kont.getType().equals("30")) {
                    row.getCell(7).setCellValue(chk);
                }
                else if(kont.getType().equals("40")) {
                    row.getCell(10).setCellValue(chk);
                }
                else if(kont.getType().equals("45")) {
                    row.getCell(13).setCellValue(chk);
                }
            }

            row = sheet.getRow(14);
            if(kont.getMassa_brutto_all() != null) {
                row.getCell(2).setCellValue(numf_3.format(kont.getMassa_brutto_all().doubleValue()));
            }

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
                row.getCell(9).setCellValue(sb.toString());
            }

            Client cl = kont.getClient();
            row.getCell(18).setCellValue(cl.getFname() != null && cl.getFname().length() > 0 ?  cl.getFname() : cl.getSname());

            row = sheet.getRow(31);
            if(report.getStan() != null && report.getStan().length() > 0) {
                String[] stan = report.getStan().split("\\s?,\\s?");
                for (int i = 0; i < stan.length; i++) {
//                    log.debug(i + " - " + stan[i]);
                    switch (Stan.valueOf(stan[i])) {
                        case BT:
                            row.getCell(0).setCellValue(chk);
                            break;
                        case L:
                            row.getCell(2).setCellValue(chk);
                            break;
                        case M:
                            row.getCell(4).setCellValue(chk);
                            break;
                        case BR:
                            row.getCell(6).setCellValue(chk);
                            break;
                        case C:
                            row.getCell(8).setCellValue(chk);
                            break;
                        case H:
                            row.getCell(10).setCellValue(chk);
                            break;
                        case CR:
                            row.getCell(12).setCellValue(chk);
                            break;
                        case R:
                            row.getCell(14).setCellValue(chk);
                            break;
                        case B:
                            row.getCell(16).setCellValue(chk);
                            break;
                        case S:
                            row.getCell(18).setCellValue(chk);
                            break;
                        case PO:
                            row.getCell(20).setCellValue(chk);
                            break;
                        case D:
                            row.getCell(22).setCellValue(chk);
                            break;
                    }
                }
            }

            row = sheet.getRow(33);
            row.getCell(13).setCellValue(avto.getDriver_fio());

            row = sheet.getRow(34);
            row.getCell(13).setCellValue(avto.getNo_avto() + "/" + avto.getNo_trail());

//            row = sheet.getRow(35);
//            row.getCell(13).setCellValue();
/*


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
*/

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

    private enum Stan {BT,L,M,BR,C,H,CR,R,B,S,PO,D};
}
