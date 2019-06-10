package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.db.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.ss.util.RegionUtil;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class ExportVagList2Excel extends Export2Excel {

    private final List<CimSmgs> docs;
    private Sheet sheet;

    public ExportVagList2Excel(String excelFormat, List<CimSmgs> docs, String path4ExcelTmpl) throws IOException, InvalidFormatException {
        super(excelFormat, path4ExcelTmpl);
        this.docs = docs;
        sheet = getWb().getSheetAt(0);
    }

    @Override
    public void export() {

        Font font = createFont(FontSettings.newBuilder().fontHeightInPoints(7).build());
        Font font3_8 = createFont(FontSettings.newBuilder().fontHeightInPoints(8).bold(true).build());
        Font font_8 = createFont(FontSettings.newBuilder().fontHeightInPoints(8).build());
        CellStyle cs11 = createCellStyle(CellStyleSettings.newBuilder().font(font).borderLeft(BorderStyle.MEDIUM).build());
        CellStyle cs1 = createCellStyle(CellStyleSettings.newBuilder().font(font).build());
        CellStyle cs2_boder_thin = createCellStyle(CellStyleSettings.newBuilder().font(font).borders(BorderStyle.THIN).build());
        CellStyle cs12 =  createCellStyle(CellStyleSettings.newBuilder().font(font).borders(BorderStyle.THIN).borderRight(BorderStyle.MEDIUM).build());
        CellStyle cs3 = createCellStyle(CellStyleSettings.newBuilder().font(font).borderLeft(BorderStyle.THIN).borderRight(BorderStyle.THIN).build());
        CellStyle cs31 = createCellStyle(CellStyleSettings.newBuilder().font(font).borderLeft(BorderStyle.MEDIUM).borderRight(BorderStyle.THIN).build());
        CellStyle cs32 = createCellStyle(CellStyleSettings.newBuilder().font(font).borderLeft(BorderStyle.THIN).borderRight(BorderStyle.MEDIUM).build());
        CellStyle cs2_boder_none_8 = createCellStyle(CellStyleSettings.newBuilder().font(font3_8).build());
        CellStyle cs2 = createCellStyle(CellStyleSettings.newBuilder().font(font).borders(BorderStyle.THIN).borderTop(BorderStyle.NONE).build());
        CellStyle cs3_1 = createCellStyle(CellStyleSettings.newBuilder().
                font(font_8).
                verticalAlignment(VerticalAlignment.CENTER).
                horizontalAlignment(HorizontalAlignment.CENTER).
                borderLeft(BorderStyle.THIN).
                borderRight(BorderStyle.THIN).
                rotation((short) 90).
                build()
        );
        CellStyle cs3_8 = createCellStyle(CellStyleSettings.newBuilder().font(font_8).borderLeft(BorderStyle.THIN).borderRight(BorderStyle.THIN).build());

        int smgsIndex = 1;
        int rowIndex;
        Row row;
        BigDecimal massa = new BigDecimal(0);
        for (CimSmgs smgs : docs) {
            StringBuilder sb;
            String prefix;
            // BEGIN SHAPKA
            if (smgsIndex == 1) {
                // g1
                int colInd = 0;
                int rowInd = 4;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG1())) {
                    sb.append(smgs.getG1()).append("\n");
                }
                if (StringUtils.isNotEmpty(smgs.getG19_1())) {
                    sb.append(smgs.getG19_1()).append(" ");
                }
                if (StringUtils.isNotEmpty(smgs.getG17_1())) {
                    sb.append(smgs.getG17_1()).append(" ");
                }
                sb.append(StringUtils.defaultString(smgs.getG18_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                rowInd = 6;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG1r())) {
                    sb.append(smgs.getG1r()).append("\n");
                }
                if (StringUtils.isNotEmpty(smgs.getG19r())) {
                    sb.append(smgs.getG19r()).append(" ");
                }
                if (StringUtils.isNotEmpty(smgs.getG17_1())) {
                    sb.append(smgs.getG17_1()).append(" ");
                }
                sb.append(StringUtils.defaultString(smgs.getG18r_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                colInd = 4;
                rowInd = 1;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG2()), cs2_boder_thin);

                colInd = 5;
                rowInd = 8;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG12_1()), cs1);

                colInd = 4;
                rowInd = 9;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG13_1()), cs1);

                // g2
                colInd = 0;
                rowInd = 13;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG4())) {
                    sb.append(smgs.getG4()).append("\n");
                }
                if (StringUtils.isNotEmpty(smgs.getG49())) {
                    sb.append(smgs.getG49()).append(" ");
                }
                if (StringUtils.isNotEmpty(smgs.getG47_1())) {
                    sb.append(smgs.getG47_1()).append(" ");
                }
                sb.append(StringUtils.defaultString(smgs.getG48_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                rowInd = 15;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG4r())) {
                    sb.append(smgs.getG4r()).append("\n");
                }
                if (StringUtils.isNotEmpty(smgs.getG49r())) {
                    sb.append(smgs.getG49r()).append(" ");
                }
                if (StringUtils.isNotEmpty(smgs.getG47_1())) {
                    sb.append(smgs.getG47_1()).append(" ");
                }
                sb.append(StringUtils.defaultString(smgs.getG48r()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                colInd = 4;
                rowInd = 10;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG5()), cs2_boder_thin);

                colInd = 5;
                rowInd = 17;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG42_1()), cs1);

                colInd = 4;
                rowInd = 18;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG43_1()), cs1);

                //  g3
                colInd = 7;
                rowInd = 4;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG162()), cs1);

                colInd = 7;
                rowInd = 5;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG162r()), cs1);

                colInd = 10;
                rowInd = 4;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG163()), cs1);

                colInd = 10;
                rowInd = 5;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG163r()), cs1);

                colInd = 10;
                rowInd = 1;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG161())) {
                    for (char ch : smgs.getG161().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs2_boder_thin);

                //  g4
                colInd = 10;
                rowInd = 8;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG611())) {
                    for (char ch : smgs.getG611().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString());

                colInd = 11;
                rowInd = 8;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG612())) {
                    for (char ch : smgs.getG612().toCharArray()) {
                        sb.append(prefix);
                        prefix = " ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString());

                //  g6
                colInd = 9;
                rowInd = 11;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG11()));

                // g7
                colInd = 10;
                rowInd = 11;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG12())) {
                    for (char ch : smgs.getG12().toCharArray()) {
                        sb.append(prefix);
                        prefix = " ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString());

                colInd = 11;
                rowInd = 11;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG121())) {
                    for (char ch : smgs.getG121().toCharArray()) {
                        sb.append(prefix);
                        prefix = " ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString());

                //  g5
                colInd = 7;
                rowInd = 15;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG101()), cs1);

                colInd = 7;
                rowInd = 16;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG101r()), cs1);

                colInd = 10;
                rowInd = 15;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG102()), cs1);

                colInd = 10;
                rowInd = 16;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG102r()), cs1);

                // g8

                colInd = 14;
                rowInd = 2;
                sb = new StringBuilder();
                prefix = "";

                if (StringUtils.isNotEmpty(smgs.getG171())) {
                    for (char ch : smgs.getG171().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs2_boder_thin);

                colInd = 16;
                rowInd = 2;
                sb = new StringBuilder();
                prefix = "";

                if (StringUtils.isNotEmpty(smgs.getG17())) {
                    for (char ch : smgs.getG17().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs12);

                colInd = 14;
                rowInd = 6;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG693())) {
                    for (char ch : smgs.getG693().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }

                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs2_boder_thin);

                colInd = 16;
                rowInd = 6;
                sb = new StringBuilder();
                prefix = "";
                if (StringUtils.isNotEmpty(smgs.getG694())) {
                    for (char ch : smgs.getG694().toCharArray()) {
                        sb.append(prefix);
                        prefix = "   ";
                        sb.append(ch);
                    }
                }
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs12);

                // g9
                colInd = 12;
                rowInd = 10;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG60()), cs1);
            }

            ///// END SHAPKA

            int tableDataColumnIndex = 20; ///////////////////// How many columns

            int tableRowIndex = 1;  ///////////////////// How many rows in one row of data
            int columnIndex;
            int vagIndex = 1;
            for (CimSmgsCarList vag : smgs.getCimSmgsCarLists().values()) {
                rowIndex = sheet.getLastRowNum() + 1;
                ///////////////////// How many rows in one row of data -- all info about container
                tableRowIndex = 1;
                if (vag.getCimSmgsGruzs().size() > 0) {
                    tableRowIndex = vag.getCimSmgsGruzs().size() * 2;      // 2 lang
                }
                ///////////////////////

                int gruzCount = vag.getCimSmgsGruzs().size();
                String unOon = "";
                for (int i = 0; i < tableRowIndex; i++) {
                    columnIndex = 0;
                    row = sheet.createRow(rowIndex + i);

                    // BEGIN draw all cells in rows
                    for (int y = 0; y < tableDataColumnIndex; y++) {
                        if (tableRowIndex - i == 1) {    // last string
                            CellUtil.createCell(row, y, "", cs2);
                        } else{
                            CellUtil.createCell(row, y, "", cs3);
                        }
                    }
                    /// END draw all cells in rows

                    // BEGIN g11
                    if (i == 0) {
                        CellUtil.createCell(row, columnIndex, String.valueOf(vagIndex), tableRowIndex - i == 1 ? cs2 : cs31);         // last string
                    } /*else if(tableRowIndex - i == 1){  // last string
                        CellUtil.createCell(row, columnIndex, "", cs2);
                    }*/
                    //// END g11

                    //BEGIN g12
                    columnIndex++;

                    if (i == 0) {
                        sb = new StringBuilder();
                        sb.append(StringUtils.defaultString(vag.getNvag()).trim());
                        if(StringUtils.isNotBlank(vag.getRod())){
                           sb.append("/");
                           sb.append(vag.getRod().trim());
                        }
                        if(StringUtils.isNotBlank(vag.getKlientName())){
                            sb.append(", ");
                            sb.append(vag.getKlientName().trim());
                        }
                        if(StringUtils.isNotBlank(vag.getVagOtm())){
                            sb.append(", ");
                            sb.append(vag.getVagOtm().trim().charAt(0));
                        }
                        if(vag.getGrPod() != null){
                            sb.append(", ");
                            sb.append(vag.getGrPod());
                        }
                        if(vag.getKolOs() != null){
                            sb.append(", ");
                            sb.append(vag.getKolOs());
                        }
                        if(vag.getTaraVag() != null){
                            sb.append(", ");
                            sb.append(vag.getTaraVag());
                        }
                        CellUtil.createCell(row, columnIndex, sb.toString(),  tableRowIndex - i == 1 ? cs2 : cs2_boder_none_8);
                    } /*else if(tableRowIndex - i == 1){
                        CellUtil.createCell(row, columnIndex, "", cs2);
                    }  */

                    ////END g12

                    //BEGIN g13
                    columnIndex++;

                    if (gruzCount > 0) {
                        CimSmgsGruz gruz = findGruzInVag(vag, (byte)(i / 2));

                        if(gruz != null){
                            sb = new StringBuilder();
                            if (i % 2 == 0) {  //even string
                                sb.append(StringUtils.defaultString(gruz.getNzgrEu()));
                                if(gruz.getPlaces() != null){
                                    sb.append("; " + gruz.getPlaces() + " " + StringUtils.defaultString(gruz.getUpakForeign()));
                                }

                                if (StringUtils.defaultString(gruz.getEkgvn()).length() > 0) {
                                    sb.append("; ET SNG ");
                                    sb.append(StringUtils.defaultString(gruz.getEkgvn()));
                                }

                                if(gruz.getCimSmgsDanGruzs() != null){
                                    for(CimSmgsDanGruz danGruz : gruz.getCimSmgsDanGruzs().values()){
                                        sb.append("\n");
                                        sb.append(danGruz.danGruzDe4CimSmgsEu());
                                        unOon += StringUtils.isNoneBlank(danGruz.getNumOon()) ? StringUtils.isBlank(unOon) ? "UN " + danGruz.getNumOon() : ", UN " + danGruz.getNumOon() : "";
                                    }
                                }
                                CellUtil.createCell(row, columnIndex, sb.length() > 0 ? sb.append("\n").toString() : "", tableRowIndex - i == 1 ? cs2 : cs3);
                            } else { // odd string
                                sb.append(StringUtils.defaultString(gruz.getNzgr()));
                                if(gruz.getPlaces() != null){
                                    sb.append("; " + gruz.getPlaces() + " " + StringUtils.defaultString(gruz.getUpak()));
                                }
                                if (StringUtils.defaultString(gruz.getEkgvn()).length() > 0) {
                                    sb.append("; ЕТ СНГ ");
                                    sb.append(StringUtils.defaultString(gruz.getEkgvn()));
                                }

                                if(gruz.getCimSmgsDanGruzs() != null){
                                    for(CimSmgsDanGruz danGruz : gruz.getCimSmgsDanGruzs().values()){
                                        sb.append("\n");
                                        sb.append(danGruz.danGruzRu4CimSmgsEu());
                                    }
                                }
                                CellUtil.createCell(row, columnIndex, sb.length() > 0 ? sb.append("\n").toString() : "", tableRowIndex - i == 1 ? cs2 : cs3);
                            }
                        }
                    }
                    ////END g13

                    //BEGIN g14
                    columnIndex++;

                    if (vag.getCimSmgsGruzs().size() > 0) {
                        CimSmgsGruz gruz = findGruzInVag(vag, (byte)(i / 2));
                        if(gruz != null){
                            if (i % 2 == 0) {  //even string
                                CellUtil.createCell(row, columnIndex, StringUtils.defaultString(gruz.getKgvn()), tableRowIndex - i == 1 ? cs2 : cs3);
                            }
                        }
                    }
                    ////END g14

                    //BEGIN g15
                    columnIndex++;
                    if (i == 0) {
                        CellUtil.createCell(row, columnIndex, (unOon.length() > 0 ? unOon : ""), tableRowIndex - i == 1 ? cs2 : cs3_1);
                    }
                    ////END g15

                    //BEGIN g16
                    columnIndex++;
                    if (i == 0) {
                        StringBuilder plombsString = new StringBuilder();
                        String suffix = "";
                        for(CimSmgsPlomb plomb: vag.getCimSmgsPlombs().values()){
                            plombsString.append(suffix);
                            suffix = "\n";
                            plombsString.append(plomb.getKpl() != null ? plomb.getKpl() : 0);
                            plombsString.append(" X ");
                            plombsString.append(StringUtils.defaultString(plomb.getZnak()));
                        }
                        CellUtil.createCell(row, columnIndex, plombsString.toString(), tableRowIndex - i == 1 ? cs2 : cs3_8);
                    }
                    //END g16

                    //BEGIN g17
                    columnIndex++;
                    if (vag.getCimSmgsGruzs().size() > 0) {
                        CimSmgsGruz gruz = findGruzInVag(vag, (byte)(i / 2));
                        if(gruz != null) {
                            if (i % 2 == 0) {  //even string
                                CellUtil.createCell(row, columnIndex, gruz.getMassa() != null ? gruz.getMassa().toString() : "", tableRowIndex - i == 1 ? cs2 : cs3);
                            }
                        }
                    }
                    //END g17
                }
                vagIndex++;
            }
            smgsIndex++;
            massa = massa.add(smgs.getG24B() != null ? smgs.getG24B() : BigDecimal.ZERO);
        }

        rowIndex = sheet.getLastRowNum();
        row = sheet.createRow(++rowIndex);
        row.setHeightInPoints((2*sheet.getDefaultRowHeightInPoints()));
        CellUtil.createCell(row, 0, "31", cs2_boder_thin);
        CellUtil.createCell(row, 1, "Общая масса отправки\nGesamtmasse der Sendung", cs2_boder_thin);
        int regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, 1, 5));
        RegionUtil.setBorderBottom(BorderStyle.THIN, sheet.getMergedRegion(regIndex), sheet);
        RegionUtil.setBorderLeft(BorderStyle.THIN, sheet.getMergedRegion(regIndex), sheet);
        RegionUtil.setBorderRight(BorderStyle.THIN, sheet.getMergedRegion(regIndex), sheet);
        CellUtil.createCell(row, 6, massa.toString(), cs2_boder_thin);
    }

    private CimSmgsGruz findGruzInVag(CimSmgsCarList vag, byte index) {
        int inx = 0;
        for(CimSmgsGruz gruz: vag.getCimSmgsGruzs().values()){
            if(inx == index){
                return gruz;
            }
            inx++;
        }
        return null;
    }
}
