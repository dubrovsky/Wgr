package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.db.nsi.Client;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.exchange.Utils.*;

public class KYStan {
    private static final Logger log = LoggerFactory.getLogger(KYStan.class);

    private XSSFCellStyle headStyle;
    private XSSFCellStyle rowStyle;
    private XSSFCellStyle rowLeftStyle;
    private XSSFCellStyle rowDateStyle;
    private XSSFCellStyle rowNumStyle;
    private XSSFCellStyle rowNum2Style;
    private XSSFCellStyle rowNum3Style;

    public ByteArrayOutputStream create(List<Yard> yardList) throws IOException {
        ArrayList<Kont> kontList = new ArrayList<>();
        for (Yard yard : yardList) {
            Iterator<Kont> it = yard.getKonts().iterator();
            Kont kont;
            if (it.hasNext()) {
                kont = it.next();
                if (kont != null) {
                    kontList.add(kont);
                }
                else {
                    log.warn("Kont in Yard [" + yard.getHid() + "] IS NULL");
                }
            }
            else {
                log.warn("Kont not found in Yard [" + yard.getHid() + "]");
            }
        }
        return createInt(kontList, false);
    }

    private ByteArrayOutputStream createInt(List<Kont> kontList, @SuppressWarnings({"unused", "SameParameterValue"}) boolean withVagon) throws IOException {
        XSSFWorkbook res = new XSSFWorkbook();
        CreationHelper helper = res.getCreationHelper();
        createStyles(res, helper);
        XSSFSheet sheet = res.createSheet();

        Instant now = Instant.now();
        int idx = 0;
        Row row = sheet.createRow(idx++);
        createCell(row, "A", headStyle).setCellValue("SEKTOR");
        createCell(row, "B", headStyle).setCellValue("№ konteneraa");
        createCell(row, "C", headStyle).setCellValue("Tara, kg");
        createCell(row, "D", headStyle).setCellValue("Brutto, kg");
        createCell(row, "E", headStyle).setCellValue("Max ladunek, t");
        createCell(row, "F", headStyle).setCellValue("Typ");
        createCell(row, "G", headStyle).setCellValue("Rozmiar");
        createCell(row, "H", headStyle).setCellValue("Plomby");
        createCell(row, "I", headStyle).setCellValue("Próżny?");
        createCell(row, "J", headStyle).setCellValue("№ pociągu");
        createCell(row, "K", headStyle).setCellValue("Data przybycia");
        createCell(row, "L", headStyle).setCellValue("Notatki");
        createCell(row, "M", headStyle).setCellValue("Klient");
        createCell(row, "N", headStyle).setCellValue("Ilosc dni");

        for (Kont kont : kontList) {
            String nkon = kont.getNkon();
            log.debug(kont.getHid() + " - " + nkon);
            row = sheet.createRow(idx++);

            YardSector sector = kont.getYard().getSector();
            Cell cell = createCell(row, "A", rowStyle);
            if (sector != null)
                cell.setCellValue(sector.getName());

            createCell(row, "B", rowStyle).setCellValue(nkon);
            setDoubleCellValue(createCell(row, "C", rowNum3Style), kont.getMassa_tar(),3, RoundingMode.HALF_UP);
            setDoubleCellValue(createCell(row, "D", rowNum3Style), kont.getMassa_brutto_all(),3, RoundingMode.HALF_UP);

            cell = createCell(row, "E", rowNum2Style);
            if (kont.getPod_sila() != null)
                setDoubleCellValue(cell, kont.getPod_sila().scaleByPowerOfTen(-3),2, RoundingMode.HALF_UP);

            createCell(row, "F", rowStyle).setCellValue(kont.getVid());
            createCell(row, "G", rowStyle).setCellValue(kont.getType());
            createCell(row, "H", rowLeftStyle).setCellValue(kont.getPlombs().stream().map(Plomb::getZnak).collect(Collectors.joining(",")));
            createCell(row, "I", rowStyle).setCellValue(kont.getMassa_brutto() == null || BigDecimal.ZERO.compareTo(kont.getMassa_brutto()) > 0 ? "Tak" : "Nie");

            String npprm = "";
            Date datOper = null;
            for (KontGruzHistory history : kont.getHistory()) {
                if (history.getDirection() != null && history.getDirection() == 1) {
                    if (history.getDateOperation() != null) {
                        if (datOper == null ||  datOper.after(history.getDateOperation())){
                            Poezd p = history.getPoezd();
                            if (p != null) {
                                datOper = history.getDateOperation();
                                npprm = p.getNpprm();
                            }
                        }
                    }
                }
            }
            createCell(row, "J", rowStyle).setCellValue(npprm);

            Date dprb = kont.getDprb();
            cell = createCell(row, "K", rowDateStyle);
            if (dprb != null) {
                cell.setCellValue(dprb);
            }

            createCell(row, "L", rowStyle).setCellValue(kont.getPrim());

            Client client = kont.getClient();
            createCell(row, "M", rowStyle).setCellValue(client != null ? client.getSname() : "");

            cell = createCell(row, "N", rowNumStyle);
            if (dprb != null) {
                long between = ChronoUnit.DAYS.between(dprb.toInstant(), now);
                cell.setCellValue(between);
            }

        }

        sheet.autoSizeColumn(0);
        sheet.autoSizeColumn(1);
        sheet.autoSizeColumn(2);
        sheet.autoSizeColumn(3);
        sheet.autoSizeColumn(4);
        sheet.autoSizeColumn(5);
        sheet.autoSizeColumn(6);
        sheet.autoSizeColumn(7);
        sheet.autoSizeColumn(8);
        sheet.autoSizeColumn(9);
        sheet.autoSizeColumn(10);
        sheet.autoSizeColumn(11);
        sheet.autoSizeColumn(12);
        sheet.autoSizeColumn(13);

        ByteArrayOutputStream os = new ByteArrayOutputStream(20480);
        res.write(os);
        os.close();
        return os;
    }

    private void createStyles(XSSFWorkbook res, CreationHelper helper) {
        Font defFont = res.getFontAt((short)0);

//        Font rowFont = res.createFont();
//        rowFont.setFontName("Arial");
//        rowFont.setFontHeightInPoints((short) 9);
//
        Font boltfont = res.createFont();
        boltfont.setFontName(defFont.getFontName());
        boltfont.setBold(true);

        CellStyle commonStyle = res.createCellStyle();
//        commonStyle.setAlignment(HorizontalAlignment.CENTER);
        commonStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        commonStyle.setBorderTop(BorderStyle.THIN);
        commonStyle.setBorderBottom(BorderStyle.THIN);
        commonStyle.setBorderLeft(BorderStyle.THIN);
        commonStyle.setBorderRight(BorderStyle.THIN);
        commonStyle.setWrapText(true);
//        commonStyle.setFont(rowFont);

        headStyle = res.createCellStyle();
        headStyle.cloneStyleFrom(commonStyle);
        headStyle.setAlignment(HorizontalAlignment.CENTER);
        headStyle.setFont(boltfont);

        rowStyle = res.createCellStyle();
        rowStyle.cloneStyleFrom(commonStyle);
//        rowStyle.setAlignment(HorizontalAlignment.CENTER);

        rowLeftStyle = res.createCellStyle();
        rowLeftStyle.cloneStyleFrom(commonStyle);
        rowLeftStyle.setAlignment(HorizontalAlignment.LEFT);

        rowDateStyle = res.createCellStyle();
        rowDateStyle.cloneStyleFrom(commonStyle);
        rowDateStyle.setWrapText(false);
        rowDateStyle.setDataFormat((short) 14);

        rowNumStyle = res.createCellStyle();
        rowNumStyle.cloneStyleFrom(commonStyle);
        rowNumStyle.setWrapText(false);
        rowNumStyle.setDataFormat(helper.createDataFormat().getFormat("0"));

        rowNum2Style = res.createCellStyle();
        rowNum2Style.cloneStyleFrom(rowNumStyle);
        rowNum2Style.setDataFormat(helper.createDataFormat().getFormat("0.00"));

        rowNum3Style = res.createCellStyle();
        rowNum3Style.cloneStyleFrom(rowNumStyle);
        rowNum3Style.setDataFormat(helper.createDataFormat().getFormat("0.000"));
    }

}
