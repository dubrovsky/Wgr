package com.bivc.cimsmgs.exchange;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.exchange.xls2kypoezd.AgrostopReader;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;
import java.util.regex.Matcher;
import java.util.stream.Collectors;

import static com.bivc.cimsmgs.exchange.Utils.*;
import static com.bivc.cimsmgs.exchange.xls2kypoezd.AbstractReader.PRINNKON_P;
import static org.apache.commons.lang3.StringUtils.isNotBlank;

public class KYKontsLoader {
    private static final Logger log = LoggerFactory.getLogger(KYKontsLoader.class);

    private XSSFCellStyle rowStyle;
    private XSSFCellStyle rowLeftStyle;
//    private XSSFCellStyle rowDateStyle;
    private XSSFCellStyle rowNumStyle;
    private XSSFCellStyle rowNum2Style;
    private XSSFCellStyle rowNum3Style;

    public HashSet<String> load(File file) throws Exception {
        HashSet<String> kontList = new HashSet<>();

        try (Workbook wb = WorkbookFactory.create(file)) {
            Sheet sheet = wb.getSheetAt(0);

            for (Row row : sheet) {
                if (row.getCell(0) == null)
                    continue;
                String nkon = row.getCell(0).getStringCellValue();
                nkon = normNvagNkonStr(nkon);
                Matcher m = PRINNKON_P.matcher(nkon);
                if (m.matches() )
                    kontList.add(nkon);
            }
        }

        return kontList;
    }

    public ByteArrayOutputStream create(Poezd poezd) throws IOException {
        ArrayList<Kont> kontList = new ArrayList<>();
        for (Vagon vag : poezd.getVagons()) {
            if (vag != null) {
                for (Kont kont : vag.getKonts()) {
                    if (kont != null) {
                        kontList.add(kont);
                    }
                    else {
                        log.warn("Kont in Vagon [" + vag.getHid() + "] IS NULL");
                    }
                }
            }
        }
        return createInt(kontList, true);
    }

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

    private ByteArrayOutputStream createInt(List<Kont> kontList, boolean withVagon) throws IOException {
        XSSFWorkbook res = new XSSFWorkbook();
        CreationHelper helper = res.getCreationHelper();
        createStyles(res, helper);
        XSSFSheet sheet = res.createSheet();

        Row row = sheet.createRow(2);
        createCell(row, "B", rowStyle).setCellValue("numer pociągu");
        row = sheet.createRow(3);
        createCell(row, "B", rowStyle).setCellValue("Data nadania");

        int idx = 5;
        row = sheet.createRow(idx++);
        sheet.setColumnWidth(0, 3 * 256);
        createCell(row, "A", rowStyle).setCellValue("LP");

        sheet.setColumnWidth(1, 14 * 256);
        createCell(row, "B", rowStyle).setCellValue("nr wagonu");

        sheet.setColumnWidth(2, 13 * 256);
        createCell(row, "C", rowStyle).setCellValue("Arendator wagonu");

        sheet.setColumnWidth(3, 9 * 256);
        createCell(row, "D", rowStyle).setCellValue("tara wagonu, tn");

        sheet.setColumnWidth(4, 11 * 256);
        createCell(row, "E", rowStyle).setCellValue("max. ladownosc wagonu, tn");

        sheet.setColumnWidth(5, 6 * 256);
        createCell(row, "F", rowStyle).setCellValue("ilosc osi");

        sheet.setColumnWidth(6, 14 * 256);
        createCell(row, "G", rowStyle).setCellValue("nr kontenera");

        sheet.setColumnWidth(7, 14 * 256);
        createCell(row, "H", rowStyle).setCellValue("Typ kontenera");

        sheet.setColumnWidth(8, 7 * 256);
        createCell(row, "I", rowStyle).setCellValue("FT");

        sheet.setColumnWidth(9, 11 * 256);
        createCell(row, "J", rowStyle).setCellValue("max. ladownosc  kontener");

        sheet.setColumnWidth(10, 13 * 256);
        createCell(row, "K", rowStyle).setCellValue("masa towaru, kg");

        sheet.setColumnWidth(11, 9 * 256);
        createCell(row, "L", rowStyle).setCellValue("Tara, kg");

        sheet.setColumnWidth(12, 11 * 256);
        createCell(row, "M", rowStyle).setCellValue("masa brutto, kg");

        sheet.setColumnWidth(13, 15 * 256);
        createCell(row, "N", rowStyle).setCellValue("nr listu przewozowego");

        sheet.setColumnWidth(14, 10 * 256);
        createCell(row, "O", rowStyle).setCellValue("NHM");

        sheet.setColumnWidth(15, 20 * 256);
        createCell(row, "P", rowStyle).setCellValue("Nazwa Towaru");

        sheet.setColumnWidth(16, 22 * 256);
        createCell(row, "Q", rowStyle).setCellValue("Plomby");

        sheet.setColumnWidth(17, 25 * 256);
        createCell(row, "R", rowStyle).setCellValue("notatka");

        int npp = 1;
        for (Kont kont : kontList) {
            String nkon = kont.getNkon();
            log.debug(kont.getHid() + " - " + nkon);
            row = sheet.createRow(idx++);
            createCell(row, "A", rowNumStyle).setCellValue(npp++);
            if (withVagon) {
                Vagon vag = kont.getVagon();
                if (vag != null) {
                    createCell(row, "B", rowStyle).setCellValue(vag.getNvag());
                    createCell(row, "C", rowStyle).setCellValue(vag.getSobstv());
                    setDoubleCellValue(createCell(row, "D", rowStyle), vag.getMasTar(), 3, RoundingMode.HALF_UP);
                    setDoubleCellValue(createCell(row, "E", rowStyle), vag.getPodSila(), 2, RoundingMode.HALF_UP);
                    Cell cell = createCell(row, "F", rowNumStyle);
                    if (vag.getKolOs() != null)
                        cell.setCellValue(vag.getKolOs());
                }
            }
            else {
                createCell(row, "B", rowStyle);
                createCell(row, "C", rowStyle);
                createCell(row, "D", rowStyle);
                createCell(row, "E", rowStyle);
                createCell(row, "F", rowStyle);
            }
            createCell(row, "G", rowStyle).setCellValue(nkon);
            createCell(row, "H", rowStyle).setCellValue(kont.getVid());
            createCell(row, "I", rowStyle).setCellValue(kont.getType());

            Cell cell = createCell(row, "J", rowNum2Style);
            if (kont.getPod_sila() != null)
                setDoubleCellValue(cell, kont.getPod_sila().scaleByPowerOfTen(-3),2, RoundingMode.HALF_UP);

            setDoubleCellValue(createCell(row, "K", rowNum3Style), kont.getMassa_brutto(),3, RoundingMode.HALF_UP);
            setDoubleCellValue(createCell(row, "L", rowNum3Style), kont.getMassa_tar(),3, RoundingMode.HALF_UP);
            setDoubleCellValue(createCell(row, "M", rowNum3Style), kont.getMassa_brutto_all(),3, RoundingMode.HALF_UP);

            createCell(row, "N", rowStyle).setCellValue(kont.getNotp());

            String kgvn = null;
            String nzgr = null;
            Iterator<Gruz> it = kont.getGruzs().iterator();
            if (it.hasNext()) {
                Gruz gruz = it.next();
                kgvn = gruz.getKgvn();
                nzgr = gruz.getNzgr();
            }
            createCell(row, "O", rowStyle).setCellValue(kgvn);
            createCell(row, "P", rowStyle).setCellValue(nzgr);
            createCell(row, "Q", rowLeftStyle).setCellValue(kont.getPlombs().stream().map(Plomb::getZnak).collect(Collectors.joining(",")));
            createCell(row, "R", rowStyle).setCellValue(kont.getPrim());
        }

        ByteArrayOutputStream os = new ByteArrayOutputStream(20480);
        res.write(os);
        os.close();
        return os;
    }

    public Map<String, List<?>> update(File file, List<Yard> yardList) throws IOException, InvalidFormatException {
        Map<String, List<?>> res = new HashMap<>(1);
        ArrayList<Kont> kontList = new ArrayList<>();
        TreeMap<String, Kont> kontMap = new TreeMap<>();

        try (Workbook wb = WorkbookFactory.create(file)) {
            Sheet sheet = wb.getSheetAt(0);

            AgrostopReader r = new AgrostopReader(sheet);

            for (Yard yard : yardList) {
                Iterator<Kont> it = yard.getKonts().iterator();
                Kont kont ;
                if (it.hasNext()) {
                    kont = it.next();
                    if (kont != null) {
                        kontMap.put(normNvagNkonStr(kont.getNkon()), kont);
                    }
                }
            }

            for (int j = r.start(); j <= sheet.getLastRowNum() + 1; j++) {
                String nkon = r.getNkon(j);
                if (!PRINNKON_P.matcher(nkon).matches())
                    continue;

                Kont kont = kontMap.get(nkon);
                kontList.add(kont);

                String notp = r.getNotp(j);
                if (isNotBlank(notp))
                    kont.setNotp(notp);

                String typeKont = r.getTypeKont(j);
                if (isNotBlank(typeKont))
                    kont.setType(typeKont);

                String vidKont = r.getVidKont(j);
                if (isNotBlank(vidKont))
                    kont.setVid(vidKont);

                BigDecimal podSilaKont = r.getPodSilaKont(j);
                if (podSilaKont != null)
                    kont.setPod_sila(podSilaKont);

                String primKont = r.getPrimKont(j);
                if (isNotBlank(primKont))
                    kont.setPrim(primKont);

                BigDecimal tara = r.getTaraKont(j);
                if (tara != null)
                    kont.setMassa_tar(tara);

                BigDecimal mbrt = r.getBruttoKont(j);
                if (mbrt != null)
                    kont.setMassa_brutto(mbrt);

                kont.setMassa_brutto_all(r.getBruttoAllKont(j, kont.getMassa_tar(), kont.getMassa_brutto()));

                kont.removePlomby();
                int plombSort = 0;
                String plStr = r.getPlombZnak(j);
                if (isNotBlank(plStr)) {
                    String[] znakAr = plStr.split(",|;/");
                    for (String znak : znakAr) {
                        Plomb plomb = new Plomb();
                        plomb.setZnak(znak.trim());
                        plomb.setKpl((short) 1);
                        plomb.setSort(plombSort++);
                        kont.addPlomb(plomb);
                    }
                }

                String kgvn = r.getKgvn(j);
                String nzgr = r.getNzgr(j);
                if (isNotBlank(kgvn) || isNotBlank(nzgr)) {
                    kont.removeGruzy();
                    Gruz gruz = new Gruz();
                    gruz.setSort(0);
                    gruz.setKgvn(kgvn);
                    gruz.setNzgr(nzgr);
                    gruz.setMassa(kont.getMassa_brutto());
                    kont.addGruz(gruz);
                }

            }
        }

        res.put("konts", kontList);
        return res;
    }

    private void createStyles(XSSFWorkbook res, CreationHelper helper) {
//        Font rowFont = res.createFont();
//        rowFont.setFontName("Arial");
//        rowFont.setFontHeightInPoints((short) 9);
//
//        Font rowCodeFont = res.createFont();
//        rowCodeFont.setFontName("Arial");
//        rowCodeFont.setFontHeightInPoints((short) 9);
//        rowCodeFont.setBold(true);

        CellStyle commonStyle = res.createCellStyle();
        commonStyle.setAlignment(HorizontalAlignment.CENTER);
        commonStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        commonStyle.setBorderTop(BorderStyle.THIN);
        commonStyle.setBorderBottom(BorderStyle.THIN);
        commonStyle.setBorderLeft(BorderStyle.THIN);
        commonStyle.setBorderRight(BorderStyle.THIN);
        commonStyle.setWrapText(true);
//        commonStyle.setFont(rowFont);

        rowStyle = res.createCellStyle();
        rowStyle.cloneStyleFrom(commonStyle);
        rowStyle.setAlignment(HorizontalAlignment.CENTER);

        rowLeftStyle = res.createCellStyle();
        rowLeftStyle.cloneStyleFrom(commonStyle);
        rowLeftStyle.setAlignment(HorizontalAlignment.LEFT);

//        rowDateStyle = res.createCellStyle();
//        rowDateStyle.cloneStyleFrom(commonStyle);
//        rowDateStyle.setWrapText(false);
//        rowDateStyle.setDataFormat((short) 14);

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
