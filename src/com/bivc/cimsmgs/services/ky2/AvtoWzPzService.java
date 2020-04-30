package com.bivc.cimsmgs.services.ky2;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontGruzHistory;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.db.nsi.Client;
import com.isc.utils.dbStore.stPack;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

public class AvtoWzPzService {

    private DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");

    public XSSFWorkbook avtoDocsToExcel(Avto avto, AvtoDocType avtoDocType, Usr usr, String num) throws IOException, InvalidFormatException {
        URL repo = AvtoWzPzService.class.getClassLoader().getResource("/xls"); 
        switch (avtoDocType) {
            case WZ:
                assert repo != null;
                return makeWZ(avto, repo, usr, num);
            case PZ:
                assert repo != null;
                return makePZ(avto, repo, usr, num);
            default:
                throw new RuntimeException("Unknown doc type");
        }
    }

    private XSSFWorkbook makeWZ (Avto avto, URL repo, Usr usr, String num) throws IOException, InvalidFormatException {
        XSSFWorkbook workbook = new XSSFWorkbook(new File(repo.getPath() + "wz.xlsx"));
        Sheet sheet = workbook.getSheetAt(0);
        sheet.getRow(0).getCell(4).setCellValue(num);
        sheet.getRow(2).getCell(6).setCellValue(avto.getDotp() != null ? dateFormat.format(avto.getDotp()) : "");
        if (!avto.getKonts().isEmpty()) {
            Kont kont = (Kont)avto.getKonts().toArray()[0];
            Client client = kont.getClient();
            sheet.getRow(4).getCell(4).setCellValue(client != null ? (StringUtils.isNotEmpty(client.getFname()) ? client.getFname() : client.getSname()) : "");
        }
        String termName = avto.getRoute().getName().toUpperCase();
        if (termName.toUpperCase().contains("AGROSTOP"))
            termName = "Terminal Przeładunkowy AGROSTOP Kobylany ul.Słoneczna 150";
        else
            termName = "TERMINAL " + termName;

        sheet.getRow(4).getCell(0).setCellValue(termName);
        int rowInd = 12;
        sheet.getRow(rowInd).getCell(4).setCellValue(StringUtils.defaultString(avto.getDriver_fio()));
        sheet.getRow(rowInd).getCell(5).setCellValue(StringUtils.defaultString(avto.getNo_avto()));
        sheet.getRow(rowInd).getCell(7).setCellValue(StringUtils.defaultString(avto.getNo_trail()));
        for (Kont kont : avto.getKonts()) {
            sheet.getRow(rowInd).getCell(0).setCellValue(StringUtils.defaultString(kont.getNkon()));
            sheet.getRow(rowInd).getCell(1).setCellValue(kont.getMassa_brutto_all() != null ? kont.getMassa_brutto_all().toString() : "");
            sheet.getRow(rowInd).getCell(2).setCellValue(StringUtils.defaultString(kont.getNotp()));
            String np = "";
            for (KontGruzHistory kontGruzHistory : kont.getHistory())
                if (kontGruzHistory.getPoezd() != null)
                    np = kontGruzHistory.getPoezd().getNpprm();
            sheet.getRow(rowInd).getCell(3).setCellValue(np);
            rowInd++;
            if (!kont.getPlombs().isEmpty()) {
                StringBuilder plombNum = new StringBuilder();
                for (Plomb plomb : kont.getPlombs())
                    plombNum.append(plomb.getZnak()).append(" ");
                sheet.getRow(rowInd).getCell(0).setCellValue("Plomba: " + plombNum );
                rowInd++;
            }
            if (kont.getPoruz() != null && kont.getPoruz()) {
                sheet.getRow(rowInd).getCell(0).setCellValue("Prozny: ");
                rowInd++;
            }
        }
        sheet.getRow(19).getCell(0).setCellValue(usr.getNamKlient());
        sheet.getRow(19).getCell(3).setCellValue(avto.getDriver_fio());
        return workbook;
    }

    private XSSFWorkbook makePZ (Avto avto, URL repo, Usr usr, String num) throws IOException, InvalidFormatException {
        XSSFWorkbook workbook = new XSSFWorkbook(new File(repo.getPath() + "pz.xlsx"));
        Sheet sheet = workbook.getSheetAt(0);
        sheet.getRow(0).getCell(4).setCellValue(num);
        sheet.getRow(2).getCell(6).setCellValue(avto.getDprb() != null ? dateFormat.format(avto.getDprb()) : "");
        if (!avto.getKonts().isEmpty()) {
            Kont kont = (Kont)avto.getKonts().toArray()[0];
            Client client = kont.getClient();
            sheet.getRow(4).getCell(4).setCellValue(client != null ? (StringUtils.isNotEmpty(client.getFname()) ? client.getFname() : client.getSname()) : "");
        }
        String termName = avto.getRoute().getName().toUpperCase();
        if (termName.toUpperCase().contains("AGROSTOP"))
            termName = "Terminal Przeładunkowy AGROSTOP Kobylany ul.Słoneczna 150";
        else
            termName = "TERMINAL " + termName;

        sheet.getRow(4).getCell(0).setCellValue(termName);
        int rowInd = 12;
        sheet.getRow(rowInd).getCell(2).setCellValue(StringUtils.defaultString(avto.getDriver_fio()));
        sheet.getRow(rowInd).getCell(5).setCellValue(StringUtils.defaultString(avto.getNo_avto()));
        sheet.getRow(rowInd).getCell(7).setCellValue(StringUtils.defaultString(avto.getNo_trail()));
        for (Kont kont : avto.getKonts()) {
            sheet.getRow(rowInd).getCell(0).setCellValue(StringUtils.defaultString(kont.getNkon()));
            sheet.getRow(rowInd).getCell(1).setCellValue(kont.getMassa_brutto_all() != null ? kont.getMassa_brutto_all().toString() : "");
            rowInd++;
            if (!kont.getPlombs().isEmpty()) {
                StringBuilder plombNum = new StringBuilder();
                for (Plomb plomb : kont.getPlombs())
                    plombNum.append(plomb.getZnak()).append(" ");
                sheet.getRow(rowInd).getCell(0).setCellValue("Plomba: " + plombNum );
                rowInd++;
            }
            if (kont.getPoruz()) {
                sheet.getRow(rowInd).getCell(0).setCellValue("Prozny");
                rowInd++;
            }
        }
        sheet.getRow(19).getCell(0).setCellValue(usr.getNamKlient());
        sheet.getRow(19).getCell(3).setCellValue(avto.getDriver_fio());
        return workbook;
    }

    public enum AvtoDocType {
        WZ,
        PZ
    }
}
