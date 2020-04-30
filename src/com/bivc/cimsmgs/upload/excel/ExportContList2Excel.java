package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.dao.hibernate.NsiStaDAOHib;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Road;
import com.bivc.cimsmgs.db.nsi.Sta;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.ss.util.RegionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.List;

public class ExportContList2Excel extends Export2Excel {
    final static private Logger log = LoggerFactory.getLogger(ExportContList2Excel.class);
    private final List<CimSmgs> docs;
    private Sheet sheet;
    private final String NETTO = "Н";
    private final String TARA = "Т";
    private final String BRUTTO = "Б";
    private final String CONT_SUFFIX = "P";

    private CellStyle cs10ArialBoldBorderThin;

    public ExportContList2Excel(String excelFormat, List<CimSmgs> docs, String path4ExcelTmpl) throws IOException, InvalidFormatException {
        super(excelFormat, path4ExcelTmpl);
        this.docs = docs;
        sheet = getWb().getSheetAt(0);
        initStyles();
    }

    private void initStyles()
    {
        Font font10Arial = getWb().createFont();
        font10Arial.setFontName("Arial");
        font10Arial.setFontHeightInPoints((short)10);

        cs10ArialBoldBorderThin = createWbStyle(BorderStyle.THIN,getWb());
        cs10ArialBoldBorderThin.setFont(font10Arial);
    }

    /**
     * генерирует EXEL лист с вагонной ведомостью СМГС2
     */
    public void makeSmgs2VagList() {
        log.debug("makeSmgs2VagList");
        int nPP=1,current_row=5;

        if(docs==null)
            return;

        if(docs.get(0)!=null)
        {
            CimSmgs smgs = docs.get(0);
            if (StringUtils.isNotEmpty(smgs.getG694())) {
                CellUtil.getCell (CellUtil.getRow(2, sheet),1).setCellValue(smgs.getG694());
            }
        }

        for (CimSmgs smgs: docs) {
            for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values()) {
                Row row= sheet.createRow(current_row);

                CellUtil.createCell(row,0,Integer.toString(nPP++),cs10ArialBoldBorderThin);
                CellUtil.createCell(row,1,StringUtils.defaultString(carList.getNvag()),cs10ArialBoldBorderThin);
                CellUtil.createCell(row,2,StringUtils.defaultString(carList.getVagOtm()),cs10ArialBoldBorderThin);
                CellUtil.createCell(row,3,carList.getGrPod()!=null?carList.getGrPod().toString():"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,4,carList.getKolOs()!=null?carList.getKolOs().toString():"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,5,carList.getTaraVag()!=null?carList.getTaraVag().toString():"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,6,StringUtils.defaultString(carList.getCicternType()),cs10ArialBoldBorderThin);

                int placesCount=0,plombsCount=0;
                StringBuilder plombs= new StringBuilder();
                BigDecimal massaTotal= new BigDecimal(0);
                if(carList.getCimSmgsKonLists()!=null)
                for (CimSmgsKonList konList:carList.getCimSmgsKonLists().values()) {

                    if(konList.getCimSmgsPlombs()!=null) {
                        plombsCount+=konList.getCimSmgsPlombs().values().size();
                        for (CimSmgsPlomb plomb : konList.getCimSmgsPlombs().values()) {
                            if(StringUtils.isNotEmpty(plomb.getZnak()))
                            {
                                if(plombs.length()>0)
                                    plombs.append(",");
                                plombs.append(plomb.getZnak());
                            }
                        }

                    }
                    if(konList.getCimSmgsGruzs()!=null)
                    for (CimSmgsGruz gruz:konList.getCimSmgsGruzs().values()) {
                        placesCount+=gruz.getPlaces()!=null?gruz.getPlaces():0;
                        massaTotal=massaTotal.add(gruz.getMassa()!=null?gruz.getMassa():new BigDecimal(0));
                    }
                }

                CellUtil.createCell(row,7,placesCount>0?Integer.toString(placesCount):"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,8,massaTotal.doubleValue()>0?massaTotal.toString():"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,9,"",cs10ArialBoldBorderThin);
                CellRangeAddress rangeAddress=new CellRangeAddress(current_row,current_row,9,10);
                sheet.addMergedRegion(rangeAddress);
                setRegionStyle(BorderStyle.THIN,rangeAddress,sheet);
                CellUtil.createCell(row,11,"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,12,"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,13,plombsCount>0?Integer.toString(plombsCount):"",cs10ArialBoldBorderThin);
                CellUtil.createCell(row,14,StringUtils.defaultString(plombs.toString().trim()),cs10ArialBoldBorderThin);
                CellUtil.createCell(row,15,"",cs10ArialBoldBorderThin);
                current_row++;
            }
        }
    }

    /**
     * генерирует EXEL лист с контейнерной ведомостью СМГС2
     */
    public void makeSmgs2ContList() {
        log.debug("makeSmgs2ContList");
        int nPP=1,current_row=6;

        if(docs==null)
            return;

        if(docs.get(0)!=null)
        {
            CimSmgs smgs = docs.get(0);
            if (StringUtils.isNotEmpty(smgs.getG694())) {
                CellUtil.getCell (CellUtil.getRow(2, sheet),0).setCellValue(smgs.getG694());
            }
        }

        for (CimSmgs smgs: docs) {
            for(CimSmgsCarList carList: smgs.getCimSmgsCarLists().values())
            {
                for (CimSmgsKonList konList:carList.getCimSmgsKonLists().values()) {
                    Row row= sheet.createRow(current_row);

                    CellUtil.createCell(row,0,Integer.toString(nPP++),cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,1,StringUtils.defaultString(konList.getUtiN()),cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,2,StringUtils.defaultString(konList.getUtiType()),cs10ArialBoldBorderThin);

                    CellRangeAddress rangeAddress=new CellRangeAddress(current_row,current_row,2,3);
                    sheet.addMergedRegion(rangeAddress);
                    setRegionStyle(BorderStyle.THIN,rangeAddress,sheet);

                    //пломбы
                    if(konList.getCimSmgsPlombs()!=null&&konList.getCimSmgsPlombs().values().size()>0) {
                        CellUtil.createCell(row, 4, Integer.toString(konList.getCimSmgsPlombs().values().size()), cs10ArialBoldBorderThin);

                        StringBuilder plombs= new StringBuilder();
                        for (CimSmgsPlomb plomb:konList.getCimSmgsPlombs().values()) {
                            if(StringUtils.isNotEmpty(plomb.getZnak()))
                            {
                                if(plombs.length()>0)
                                    plombs.append(",");
                                plombs.append(plomb.getZnak());
                            }
                        }

                        CellUtil.createCell(row,5, plombs.toString().trim(),cs10ArialBoldBorderThin);
                    }
                    else {
                        CellUtil.createCell(row, 4, "", cs10ArialBoldBorderThin);
                        CellUtil.createCell(row, 5, "", cs10ArialBoldBorderThin);
                    }
                    BigDecimal massaGruz= new BigDecimal(0);
                    //места // масса
                    if(konList.getCimSmgsGruzs()!=null&&konList.getCimSmgsGruzs().values().size()>0)
                    {
                        int placesTotal=0;
                        massaGruz= new BigDecimal(0);

                        for (CimSmgsGruz gruz:konList.getCimSmgsGruzs().values()) {
                            if(gruz.getPlaces()!=null)
                                placesTotal+=gruz.getPlaces();
                            if(gruz.getMassa()!=null)
                                massaGruz=massaGruz.add(gruz.getMassa());
                        }
                        CellUtil.createCell(row,6,placesTotal>0?Integer.toString(placesTotal):"",cs10ArialBoldBorderThin);
                        CellUtil.createCell(row,8,massaGruz.doubleValue()>0?massaGruz.toString():"",cs10ArialBoldBorderThin);
                    }
                    else {
                        CellUtil.createCell(row, 6, "", cs10ArialBoldBorderThin);
                        CellUtil.createCell(row, 8, "", cs10ArialBoldBorderThin);
                    }
                    rangeAddress=new CellRangeAddress(current_row,current_row,6,7);
                    sheet.addMergedRegion(rangeAddress);
                    setRegionStyle(BorderStyle.THIN,rangeAddress,sheet);

                    CellUtil.createCell(row, 9, konList.getTaraKont()!=null?konList.getTaraKont().toString():"", cs10ArialBoldBorderThin);
                    BigDecimal massaBrutto = new BigDecimal(0).add(massaGruz);
                    if(konList.getTaraKont()!=null)
                        massaBrutto=massaBrutto.add(new BigDecimal(konList.getTaraKont()));
                    CellUtil.createCell(row, 10, massaBrutto.doubleValue()>0?massaBrutto.toString():"", cs10ArialBoldBorderThin);

                    CellUtil.createCell(row,11,StringUtils.defaultString(carList.getNvag()),cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,12,StringUtils.defaultString(carList.getVagOtm()),cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,13,carList.getGrPod()!=null?carList.getGrPod().toString():"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,14,carList.getKolOs()!=null?carList.getKolOs().toString():"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,15,carList.getTaraVag()!=null?carList.getTaraVag().toString():"",cs10ArialBoldBorderThin);

                    CellUtil.createCell(row,16,"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,17,"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,18,"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,19,"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,20,"",cs10ArialBoldBorderThin);
                    CellUtil.createCell(row,21,"",cs10ArialBoldBorderThin);
                    current_row++;
                }
            }
        }
    }

    public void makeSmgsContList_PL() {
        log.debug("makeSmgsContList_PL");
        final int tableDataRowIndex = 14;
//        final int cellMaxIndex = 19;
        Row row;
        Cell cell;

        DataFormat format1 = getWb().createDataFormat();

        Font font = getWb().createFont();
        font.setBoldweight(Font.BOLDWEIGHT_BOLD);

        CellStyle cs1 = getWb().createCellStyle();
        cs1.setAlignment(CellStyle.ALIGN_CENTER);
        cs1.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs1.setBorderRight(CellStyle.BORDER_THIN);
        cs1.setBorderLeft(CellStyle.BORDER_THIN);
        cs1.setBorderBottom(CellStyle.BORDER_THIN);

        CellStyle cs2 = getWb().createCellStyle();
        cs2.setWrapText(true);
        cs2.setAlignment(CellStyle.ALIGN_CENTER);
        cs2.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs2.setBorderRight(CellStyle.BORDER_THIN);
        cs2.setBorderLeft(CellStyle.BORDER_THIN);
        cs2.setBorderBottom(CellStyle.BORDER_THIN);

        CellStyle cs3 = getWb().createCellStyle();
        cs3.setDataFormat(format1.getFormat("0.00"));
        cs3.setAlignment(CellStyle.ALIGN_CENTER);
        cs3.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle cs4 = getWb().createCellStyle();
        cs4.setDataFormat(format1.getFormat("0.0"));
        cs4.setAlignment(CellStyle.ALIGN_CENTER);
        cs4.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs4.setBorderRight(CellStyle.BORDER_THIN);
        cs4.setBorderLeft(CellStyle.BORDER_THIN);
        cs4.setBorderBottom(CellStyle.BORDER_THIN);

        CellStyle cs5 = getWb().createCellStyle();
        cs5.setWrapText(true);
        cs5.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle cs6 = getWb().createCellStyle();
        cs6.setAlignment(CellStyle.ALIGN_CENTER);
        cs6.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs6.setWrapText(true);
        cs6.setBorderTop(CellStyle.BORDER_THIN);

        CellStyle cs7 = getWb().createCellStyle();
        cs7.setDataFormat(format1.getFormat("0.00"));
        cs7.setAlignment(CellStyle.ALIGN_CENTER);
        cs7.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cs7.setFont(font);

        CellStyle cs8 = getWb().createCellStyle();
        cs8.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cs8.setFont(font);

        int index = 1;
        String prefix = "";
        StringBuilder sb;
        int rowIndex;
        int columnIndex;
        int regIndex;

        int itogoPlaces = 0;
        BigDecimal itogoBrutto = new BigDecimal(0);
        BigDecimal itogoTara = new BigDecimal(0);
        BigDecimal itogoNetto = new BigDecimal(0);
        for (CimSmgs doc : docs) {
            /// gr 8 shapka
            if (index == 1) {
                int colInd = 3;
                int rowInd = 8;
                if (StringUtils.isNotEmpty(doc.getG101r())) {
                    sb = new StringBuilder(doc.getG101r());
                    cell = CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs6);
                    if (StringUtils.isNotEmpty(doc.getG121())) {     // kod stn
                        List<Sta> stas = new NsiStaDAOHib().findAll(doc.getG121().trim());
                        if (stas.size() > 0) {
                            Road road = stas.get(0).getRoad();
                            if (road != null) {
                                sb.append(" (").append(road.getRoadSname().toUpperCase()).append(")");
                                cell.setCellValue(sb.toString());
                            }
                        }
                    }
                }

                rowInd = 9;
                colInd = 6;
                if (StringUtils.isNotEmpty(doc.getG12())) {
                    for (char ch : doc.getG12().toCharArray()) {
                        CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, Character.toString(ch));
                    }
                }
                colInd = 9;
                if (StringUtils.isNotEmpty(doc.getG121())) {
                    for (char ch : doc.getG121().toCharArray()) {
                        if (colInd == 13) {  // col 12 & 13 merged
                            colInd++;
                        }
                        CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, Character.toString(ch));
                    }

                }
            }
            /// gr 8 end

            rowIndex = tableDataRowIndex + index;
            columnIndex = 0;
            row = sheet.createRow(rowIndex);

            /// render all cells and set styles
            CellUtil.createCell(row, columnIndex++, "", cs1); // 1
            CellUtil.createCell(row, columnIndex++, "", cs1); // 2
            CellUtil.createCell(row, columnIndex++, "", cs1); // 3
            CellUtil.createCell(row, columnIndex++, "", cs1); // 4
            CellUtil.createCell(row, columnIndex++, "", cs2); // 5

            CellUtil.createCell(row, columnIndex, "", cs3); // 6
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            columnIndex++;

            CellUtil.createCell(row, columnIndex, "", cs3); // 7
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            columnIndex++;

            CellUtil.createCell(row, columnIndex, "", cs3); // 8
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            columnIndex++;

            CellUtil.createCell(row, columnIndex, "", cs1); // 9
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, columnIndex + 2));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            columnIndex += 3;

            CellUtil.createCell(row, columnIndex, "", cs4); // 10
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            columnIndex++;

            CellUtil.createCell(row, columnIndex++, "", cs1); // 11
            CellUtil.createCell(row, columnIndex++, "", cs4); // 12
            CellUtil.createCell(row, columnIndex++, "", cs1); // 13
            CellUtil.createCell(row, columnIndex++, "", cs1); // 14

            /// end render and set styles cells

            columnIndex = 0;
            /// 1 cell
            CellUtil.createCell(row, columnIndex++, Integer.toString(index), cs1);
            /// end 1 cell

            /// set cell values
            for (CimSmgsCarList car : doc.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList cont : car.getCimSmgsKonLists().values()) {
                    /// 2 cell
                    CellUtil.createCell(row, columnIndex++, StringUtils.defaultString(cont.getUtiN()));
                    /// end 2 cell

                    /// 3 cell
                    CellUtil.createCell(row, columnIndex++, StringUtils.defaultString(cont.getVid()));
                    /// end 3 cell

                    /// 4 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    for (CimSmgsGruz gruz : cont.getCimSmgsGruzs().values()) {
                        if (gruz.getPlaces() != null) {
                            cell.setCellValue(gruz.getPlaces());
                            itogoPlaces += gruz.getPlaces();
//                            cell.setCellStyle(cs1);
                        }

                        /// gr 11
                        sb = new StringBuilder();
                        sb.append(StringUtils.defaultString(gruz.getNzgr()));
                        if (StringUtils.isNotEmpty(gruz.getKgvn())) {
                            if (sb.length() > 0) {
                                sb.append(",");
                            }
                            sb.append(" ГНГ " + gruz.getKgvn());
                        }
                        CellUtil.createCell(CellUtil.getRow(10, sheet), 2, sb.toString(), cs5);

                        /// end gr 11
                        break;
                    }
                    /// end 4 cell

                    /// 5 cell
                    sb = new StringBuilder();
                    prefix = "";
                    for (CimSmgsPlomb plomb : doc.getCimSmgsPlombs().values()) {
                        sb.append(prefix);
                        prefix = ", ";
                        sb.append(StringUtils.defaultString(plomb.getZnak()));
                    }
                    CellUtil.createCell(row, columnIndex++, sb.toString());
                    /// end 5 cell

                    /// 6 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (doc.getG24N() != null) {
                        cell.setCellValue(doc.getG24N().doubleValue());
                        itogoNetto = itogoNetto.add(doc.getG24N());
//                        cell.setCellStyle(cs3);
                    }
                    columnIndex++;
                    /// end 6 cell

                    /// 7 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (doc.getG24T() != null) {
                        cell.setCellValue(doc.getG24T().doubleValue());
                        itogoTara = itogoTara.add(doc.getG24T());
//                        cell.setCellStyle(cs3);
                    }
                    columnIndex++;
                    /// end 7 cell

                    /// 8 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (doc.getG24B() != null) {
                        cell.setCellValue(doc.getG24B().doubleValue());
                        itogoBrutto = itogoBrutto.add(doc.getG24B());
//                        cell.setCellStyle(cs3);
                    }
                    columnIndex++;
                    /// end 8 cell

                    // 9 cell
                    CellUtil.createCell(row, columnIndex++, StringUtils.defaultString(car.getNvag()));
                    columnIndex += 2;
                    /// end 9 cell

                    /// 10 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (car.getGrPod() != null) {
                        cell.setCellValue(car.getGrPod().doubleValue());
//                        cell.setCellStyle(cs4);
                    }
                    columnIndex++;
                    /// end 10 cell

                    /// 11 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (car.getKolOs() != null) {
                        cell.setCellValue(car.getKolOs());
//                        cell.setCellStyle(cs1);
                    }
                    /// end 11 cell

                    /// 12 cell
                    cell = CellUtil.getCell(row, columnIndex++);
                    if (car.getTaraVag() != null) {
                        cell.setCellValue(car.getTaraVag().doubleValue());
//                        cell.setCellStyle(cs4);
                    }
                    /// end 12 cell

                    /// 13 cell
                    CellUtil.createCell(row, columnIndex++, "ОАО \"ТрансКонтейнер\""/*, cs1*/);
                    /// end 13 cell

                    /// 14 cell
//                    CellUtil.createCell(row, columnIndex++, ""/*, cs1*/);
                    /// end 14 cell
                    break;
                }

                break;
            }

            index++;
        }
        rowIndex = tableDataRowIndex + index;

        CellUtil.createCell(CellUtil.getRow(rowIndex, sheet), 0, "RAZEM:", cs8);

        row = CellUtil.getRow(rowIndex, sheet);
        columnIndex = 3;
        if (itogoPlaces > 0) {
            cell = CellUtil.getCell(row, columnIndex);
            cell.setCellValue(itogoPlaces);
            cell.setCellStyle(cs8);
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex + 1, columnIndex, columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        }
        if (itogoNetto.intValue() > 0) {
            columnIndex = 5;
            cell = CellUtil.getCell(row, columnIndex);
            cell.setCellValue(itogoNetto.doubleValue());
            cell.setCellStyle(cs7);
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex + 1, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        }
        if (itogoTara.intValue() > 0) {
            columnIndex = 7;
            cell = CellUtil.getCell(row, columnIndex);
            cell.setCellValue(itogoTara.doubleValue());
            cell.setCellStyle(cs7);
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex + 1, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        }
        if (itogoBrutto.intValue() > 0) {
            columnIndex = 9;
            cell = CellUtil.getCell(row, columnIndex);
            cell.setCellValue(itogoBrutto.doubleValue());
            cell.setCellStyle(cs7);
            regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex + 1, columnIndex, ++columnIndex));
            RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
            RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        }

        CellUtil.createCell(CellUtil.getRow(++rowIndex, sheet), 0, "ИТОГО:", cs8);

        rowIndex += 3;
        CellUtil.createCell(CellUtil.getRow(rowIndex++, sheet), 0, "Podpis nadawcy");
        CellUtil.createCell(CellUtil.getRow(rowIndex, sheet), 0, "Подпись отправителя _____________________________");
    }

    public void export() {
        log.debug("export");
        Row row;

        Font font = getWb().createFont();
        font.setFontHeightInPoints((short) 7);

        Font font_8 = getWb().createFont();
        font_8.setFontHeightInPoints((short) 8);

        Font font2 = getWb().createFont();
        font2.setFontHeightInPoints((short) 7);
        font2.setBoldweight(Font.BOLDWEIGHT_BOLD);

        Font font3 = getWb().createFont();
        font3.setFontHeightInPoints((short) 7);
        font3.setBoldweight(Font.BOLDWEIGHT_BOLD);

        Font font3_8 = getWb().createFont();
        font3_8.setFontHeightInPoints((short) 8);
        font3_8.setBoldweight(Font.BOLDWEIGHT_BOLD);

        CellStyle cs1 = getWb().createCellStyle();
        cs1.setWrapText(true);
        cs1.setFont(font);
        cs1.setAlignment(CellStyle.ALIGN_LEFT);
        cs1.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle cs11 = getWb().createCellStyle();
        cs11.setWrapText(true);
        cs11.setFont(font);
        cs11.setAlignment(CellStyle.ALIGN_LEFT);
        cs11.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs11.setBorderLeft(CellStyle.BORDER_MEDIUM);

        CellStyle cs12 = getWb().createCellStyle();
        cs12.setWrapText(true);
        cs12.setFont(font);
        cs12.setAlignment(CellStyle.ALIGN_LEFT);
        cs12.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs12.setBorderRight(CellStyle.BORDER_MEDIUM);
        cs12.setBorderLeft(CellStyle.BORDER_THIN);
        cs12.setBorderBottom(CellStyle.BORDER_THIN);
        cs12.setBorderTop(CellStyle.BORDER_THIN);

        CellStyle cs2 = getWb().createCellStyle();
        cs2.setWrapText(true);
        cs2.setFont(font3);
        cs2.setAlignment(CellStyle.ALIGN_LEFT);
        cs2.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs2.setBorderLeft(CellStyle.BORDER_MEDIUM);
        cs2.setBorderBottom(CellStyle.BORDER_MEDIUM);
        cs2.setBorderRight(CellStyle.BORDER_MEDIUM);
        cs2.setBorderTop(CellStyle.BORDER_MEDIUM);

        CellStyle cs2_8 = getWb().createCellStyle();
        cs2_8.setWrapText(true);
        cs2_8.setFont(font3_8);
        cs2_8.setAlignment(CellStyle.ALIGN_LEFT);
        cs2_8.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs2_8.setBorderLeft(CellStyle.BORDER_MEDIUM);
        cs2_8.setBorderBottom(CellStyle.BORDER_MEDIUM);
        cs2_8.setBorderRight(CellStyle.BORDER_MEDIUM);
        cs2_8.setBorderTop(CellStyle.BORDER_MEDIUM);

        CellStyle cs2_boder_none = getWb().createCellStyle();
        cs2_boder_none.setWrapText(true);
        cs2_boder_none.setFont(font3);
        cs2_boder_none.setAlignment(CellStyle.ALIGN_LEFT);
        cs2_boder_none.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle cs2_boder_none_8 = getWb().createCellStyle();
        cs2_boder_none_8.setWrapText(true);
        cs2_boder_none_8.setFont(font3_8);
        cs2_boder_none_8.setAlignment(CellStyle.ALIGN_LEFT);
        cs2_boder_none_8.setVerticalAlignment(CellStyle.VERTICAL_TOP);

        CellStyle cs2_boder_thin = getWb().createCellStyle();
        cs2_boder_thin.setWrapText(true);
        cs2_boder_thin.setFont(font);
        cs2_boder_thin.setAlignment(CellStyle.ALIGN_LEFT);
        cs2_boder_thin.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs2_boder_thin.setBorderLeft(CellStyle.BORDER_THIN);
        cs2_boder_thin.setBorderBottom(CellStyle.BORDER_THIN);
        cs2_boder_thin.setBorderRight(CellStyle.BORDER_THIN);
        cs2_boder_thin.setBorderTop(CellStyle.BORDER_THIN);

        CellStyle cs3 = getWb().createCellStyle();
        cs3.setWrapText(true);
        cs3.setFont(font);
        cs3.setAlignment(CellStyle.ALIGN_LEFT);
        cs3.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs3.setBorderLeft(CellStyle.BORDER_THIN);
        cs3.setBorderRight(CellStyle.BORDER_THIN);

        CellStyle cs3_1 = getWb().createCellStyle();
        cs3_1.setWrapText(true);
        cs3_1.setFont(font_8);
        cs3_1.setAlignment(CellStyle.ALIGN_CENTER);
        cs3_1.setVerticalAlignment(CellStyle.VERTICAL_CENTER);
        cs3_1.setBorderLeft(CellStyle.BORDER_THIN);
        cs3_1.setBorderRight(CellStyle.BORDER_THIN);
        cs3_1.setRotation((short) 90);

        CellStyle cs3_8 = getWb().createCellStyle();
        cs3_8.setWrapText(true);
        cs3_8.setFont(font_8);
        cs3_8.setAlignment(CellStyle.ALIGN_LEFT);
        cs3_8.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs3_8.setBorderLeft(CellStyle.BORDER_THIN);
        cs3_8.setBorderRight(CellStyle.BORDER_THIN);

        CellStyle cs31 = getWb().createCellStyle();
        cs31.setWrapText(true);
        cs31.setFont(font);
        cs31.setAlignment(CellStyle.ALIGN_LEFT);
        cs31.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs31.setBorderLeft(CellStyle.BORDER_MEDIUM);
        cs31.setBorderRight(CellStyle.BORDER_THIN);

        CellStyle cs32 = getWb().createCellStyle();
        cs32.setWrapText(true);
        cs32.setFont(font);
        cs32.setAlignment(CellStyle.ALIGN_LEFT);
        cs32.setVerticalAlignment(CellStyle.VERTICAL_TOP);
        cs32.setBorderLeft(CellStyle.BORDER_THIN);
        cs32.setBorderRight(CellStyle.BORDER_MEDIUM);
        int tableRowIndex = 0;
        String prefix;
        String nl = "\n";
        String space = " ";
        StringBuilder sb;
        int rowIndex = 0;
        int columnIndex;
        BigDecimal massa = new BigDecimal(0);

        int smgsIndex = 1;
        int carIndex = 1;
        int konIndex = 1;

        for (CimSmgs smgs : docs) {
            // shapka
            if (smgsIndex == 1) {
                // g1
                int colInd = 0;
                int rowInd = 4;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG1())) {
                    sb.append(smgs.getG1()).append(nl);
                }
                if (StringUtils.isNotEmpty(smgs.getG19_1())) {
                    sb.append(smgs.getG19_1()).append(space);
                }
                if (StringUtils.isNotEmpty(smgs.getG17_1())) {
                    sb.append(smgs.getG17_1()).append(space);
                }
                sb.append(StringUtils.defaultString(smgs.getG18_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                rowInd = 6;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG1r())) {
                    sb.append(smgs.getG1r()).append(nl);
                }
                if (StringUtils.isNotEmpty(smgs.getG19r())) {
                    sb.append(smgs.getG19r()).append(space);
                }
                if (StringUtils.isNotEmpty(smgs.getG17_1())) {
                    sb.append(smgs.getG17_1()).append(space);
                }
                sb.append(StringUtils.defaultString(smgs.getG18r_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                colInd = 4;
                rowInd = 1;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG2()), cs2_boder_thin);

                colInd = 4;
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
                    sb.append(smgs.getG4()).append(nl);
                }
                if (StringUtils.isNotEmpty(smgs.getG49())) {
                    sb.append(smgs.getG49()).append(space);
                }
                if (StringUtils.isNotEmpty(smgs.getG47_1())) {
                    sb.append(smgs.getG47_1()).append(space);
                }
                sb.append(StringUtils.defaultString(smgs.getG48_1()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                rowInd = 15;
                sb = new StringBuilder();
                if (StringUtils.isNotEmpty(smgs.getG4r())) {
                    sb.append(smgs.getG4r()).append(nl);
                }
                if (StringUtils.isNotEmpty(smgs.getG49r())) {
                    sb.append(smgs.getG49r()).append(space);
                }
                if (StringUtils.isNotEmpty(smgs.getG47_1())) {
                    sb.append(smgs.getG47_1()).append(space);
                }
                sb.append(StringUtils.defaultString(smgs.getG48r()));
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, sb.toString(), cs11);

                colInd = 4;
                rowInd = 10;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG5()), cs2_boder_thin);

                colInd = 4;
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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

                //  g6
                colInd = 9;
                rowInd = 11;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG11()));


                //g7
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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString(), cs12);

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

                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString());

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
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd++, sb.toString(), cs12);

                // g9
                colInd = 12;
                rowInd = 10;
                CellUtil.createCell(CellUtil.getRow(rowInd, sheet), colInd, StringUtils.defaultString(smgs.getG60()), cs1);

            }
            ///// END SHAPKA

            int tableDataColumnIndex = 18;

            for (CimSmgsCarList car : smgs.getCimSmgsCarLists().values()) {

                int konInCarIndex = 1;
                BigDecimal nettoInVag = BigDecimal.ZERO;
                BigDecimal taraInVag = BigDecimal.ZERO;
                for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                    rowIndex = sheet.getLastRowNum() + 1;

                    ///////////////////// How many rows in one row of data -- all info about container
                    tableRowIndex = 1;
                    if (kon.getCimSmgsGruzs().size() > 0) {
                        tableRowIndex = kon.getCimSmgsGruzs().size() * 2;      // 2 lang
                    }
                    else if (kon.getCimSmgsDocses9().size() > 0) {
                        tableRowIndex = 2;
                    }
//                    int itogStringCount = car.getCimSmgsKonLists().size() == 1 || car.getCimSmgsKonLists().size() == konInCarIndex ? 2 : 1;
                    int itogStringCount = 2;
                    tableRowIndex += itogStringCount; // itog
                    ///////////////////////

                    int gruzCount = kon.getCimSmgsGruzs().size();
                    BigDecimal netto = new BigDecimal(0);
                    BigDecimal tara = kon.getTaraKont() != null ? new BigDecimal(kon.getTaraKont()) : BigDecimal.ZERO;
                    taraInVag = taraInVag.add(tara);

                    String unOon = "";

                    for (int i = 0; i < tableRowIndex; i++) {
                        columnIndex = 0;
                        row = sheet.createRow(rowIndex + i);

                        // BEGIN draw all cells in rows
                        for (int y = 0; y < tableDataColumnIndex; y++) {
                            if (tableRowIndex - i <= itogStringCount) {    // 2 last itog strings
                                CellUtil.createCell(row, y, "", cs2);
                            }
                            else {
                                if (tableDataColumnIndex - y != 1) {
                                    CellUtil.createCell(row, y, "", cs3);
                                }
                                else {
                                    CellUtil.createCell(row, y, "", cs32); // last column
                                }
                            }
                        }
                        /// END draw all cells in rows

                        // BEGIN g11
                        if (i == 0) {
                            CellUtil.createCell(row, columnIndex, String.valueOf(konIndex), cs31);
                        }
                        else if (tableRowIndex - i > itogStringCount) {    // NOT 2 last itog strings
                            CellUtil.createCell(row, columnIndex, "", cs31);
                        }
                        //// END g11

                        //BEGIN g12
                        columnIndex++;

                        if (i == 0) {
                            CellUtil.createCell(row, columnIndex, StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN() + " " : "", cs2_boder_none_8);
                        }
                        else if (tableRowIndex - i == itogStringCount) { // last or predlast itog string
                            CellUtil.createCell(row, columnIndex, StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN() + " " : "", cs2_8);
                        }
                        else if (tableRowIndex - i == itogStringCount - 1) {  // last itog string
                            CellUtil.createCell(row, columnIndex, String.valueOf(carIndex) + ". Wag/Bar.", cs2_8);
                        }

                        ////END g12

                        //BEGIN g13
                        columnIndex++;
                        if (i == 0) {
                            StringBuilder cel13 = new StringBuilder();
                            if ((kon.getSizeFoot() != null) && (kon.getSizeFoot().compareTo(new BigDecimal(0)) != 0))
                                cel13.append(kon.getSizeFoot());

                            if (cel13.length() > 0)
                                cel13.append("\n");

                            cel13.append(StringUtils.defaultString(kon.getUtiType()));

                            if (!StringUtils.defaultString(kon.getUtiType()).isEmpty())
                                cel13.append("\n");

                            if ((kon.getGrpod() != null) && (kon.getGrpod().compareTo(new BigDecimal(0)) != 0))
                                cel13.append(StringUtils.defaultString(kon.getGrpod().toString()));

                            CellUtil.createCell(row, columnIndex, cel13.toString(), cs3);
                        }
                        ////END g13

                        //BEGIN g14
                        columnIndex++;
                        if (tableRowIndex - i == itogStringCount) {    //  last or predlast itog string
                            CellUtil.createCell(row, columnIndex, gruzCount + " Ladung\n" + gruzCount + " Груз", cs2);
                        }
                        else if (tableRowIndex - i == itogStringCount - 1) {    // last itog strings
                            int konCount = car.getCimSmgsKonLists().size();
                            CellUtil.createCell(row, columnIndex, /*konCount*/ " Container\n" + /*konCount*/ " Контейнер", cs2);
                        }
                        else {
                            if (gruzCount > 0) {
//                                CimSmgsGruz gruz = kon.getCimSmgsGruzs().get((byte)(i / 2));
                                CimSmgsGruz gruz = findGruzInKont(kon, (byte) (i / 2));

                                sb = new StringBuilder();
                                if (i % 2 == 0) {  //even string
                                    sb.append(StringUtils.defaultString(gruz.getNzgrEu()));
                                    if (gruz.getPlaces() != null) {
                                        sb.append("; " + gruz.getPlaces() + " " + StringUtils.defaultString(gruz.getUpakForeign()));
                                    }

                                    if (StringUtils.defaultString(gruz.getEkgvn()).length() > 0) {
                                        sb.append("; ET SNG ");
                                        sb.append(StringUtils.defaultString(gruz.getEkgvn()));
                                    }

                                    if (gruz.getCimSmgsDanGruzs() != null) {
                                        for (CimSmgsDanGruz danGruz : gruz.getCimSmgsDanGruzs().values()) {
                                            sb.append("\n");
                                            sb.append(danGruz.danGruzDe4CimSmgsEu());
                                            unOon += StringUtils.isNoneBlank(danGruz.getNumOon()) ? StringUtils.isBlank(unOon) ? "UN " + danGruz.getNumOon() : ", UN " + danGruz.getNumOon() : "";
                                        }
                                    }

                                    CellUtil.createCell(row, columnIndex, sb.length() > 0 ? sb.append("\n").toString() : "", cs3);
                                }
                                else { // odd string
                                    sb.append(StringUtils.defaultString(gruz.getNzgr()));
                                    if (gruz.getPlaces() != null) {
                                        sb.append("; " + gruz.getPlaces() + " " + StringUtils.defaultString(gruz.getUpak()));
                                    }
                                    if (StringUtils.defaultString(gruz.getEkgvn()).length() > 0) {
                                        sb.append("; ЕТ СНГ ");
                                        sb.append(StringUtils.defaultString(gruz.getEkgvn()));
                                    }

                                    if (gruz.getCimSmgsDanGruzs() != null) {
                                        for (CimSmgsDanGruz danGruz : gruz.getCimSmgsDanGruzs().values()) {
                                            sb.append("\n");
                                            sb.append(danGruz.danGruzRu4CimSmgsEu());
                                        }
                                    }
                                    CellUtil.createCell(row, columnIndex, sb.length() > 0 ? sb.append("\n").toString() : "", cs3);

                                }
                            }
                        }
                        ////END g14

                        //BEGIN g15
                        columnIndex++;

                        if (tableRowIndex - i > itogStringCount) { // ne itog
                            if (kon.getCimSmgsGruzs().size() > 0) {
                                CimSmgsGruz gruz = findGruzInKont(kon, (byte) (i / 2));
                                if (i % 2 == 0) {  //even string
                                    CellUtil.createCell(row, columnIndex, StringUtils.defaultString(gruz.getKgvn()), cs3);
                                }
                            }
                        }
                        ////END g15

                        //BEGIN g16
                        columnIndex++;
                        if (i == 0) {
                            CellUtil.createCell(row, columnIndex, (unOon.length() > 0 ? unOon : ""), cs3_1);
                        }
                        ////END g16

                        //BEGIN g17
                        columnIndex++;
                        if (tableRowIndex - i == itogStringCount) {    //  last or predlast itog string
                            sb = new StringBuilder();
                            sb.append(NETTO + " " + netto);
                            sb.append("\n");
                            sb.append(TARA + " " + tara);
                            CellUtil.createCell(row, columnIndex, sb.toString(), cs2);
                            nettoInVag = nettoInVag.add(netto);
                        }
                        else if (tableRowIndex - i == itogStringCount - 1) {    // last itog strings
//                            CellUtil.createCell(row, columnIndex, BRUTTO + " " + BigDecimal.ZERO.add(taraInVag).add(nettoInVag), cs2);
                            CellUtil.createCell(row, columnIndex, BRUTTO + " " + BigDecimal.ZERO.add(netto).add(tara), cs2);
                        }
                        else {
                            if (kon.getCimSmgsGruzs().size() > 0) {
                                CimSmgsGruz gruz = findGruzInKont(kon, (byte) (i / 2));
                                if (i % 2 == 0) {  //even string
                                    CellUtil.createCell(row, columnIndex, gruz.getMassa() != null ? gruz.getMassa().toString() : "", cs3);
                                    netto = netto.add(gruz.getMassa() != null ? gruz.getMassa() : BigDecimal.ZERO);
                                }
                            }
                        }
                        ////END g17

                        //BEGIN g18
                        columnIndex++;
                        if (i == 0) {
                            StringBuilder plombsString = new StringBuilder();
                            String suffix = "";
                            for (CimSmgsPlomb plomb : kon.getCimSmgsPlombs().values()) {
                                plombsString.append(suffix);
                                suffix = "\n";
                                plombsString.append(plomb.getKpl() != null ? plomb.getKpl() : 0);
//                                plombsString.append(" X SEALED ");
                                plombsString.append(" X ");
                                plombsString.append(StringUtils.defaultString(plomb.getZnak()));
                            }
                            CellUtil.createCell(row, columnIndex, plombsString.toString(), cs3_8);
                        }
                        ////END g18

                        //BEGIN g19
                        columnIndex++;
                        sb = new StringBuilder();
                        prefix = "";
                        if (i == 0) {
                            for (CimSmgsDocs dc : kon.getCimSmgsDocses9().values()) {
                                if (StringUtils.defaultString(dc.getText2()).length() > 0) {
                                    sb.append(prefix);
                                    sb.append(StringUtils.defaultString(dc.getText2()));
                                }
                                if (StringUtils.isNotBlank(dc.getNdoc())) {
                                    sb.append(" ");
                                    sb.append(dc.getNdoc());
                                }
                                if (dc.getDat() != null) {
                                    sb.append(", ");
                                    sb.append(new SimpleDateFormat("dd.MM.yyyy").format(dc.getDat()));
                                }

                                prefix = "; ";
                            }
                            if (sb.length() > 0) {
                                CellUtil.createCell(row, columnIndex, sb.toString(), cs3);
                            }
                        }
                        else if (i == 1) {
                            for (CimSmgsDocs dc : kon.getCimSmgsDocses9().values()) {
                                if (StringUtils.defaultString(dc.getText()).length() > 0) {
                                    sb.append(prefix);
                                    sb.append(StringUtils.defaultString(dc.getText()));
                                }
                                if (StringUtils.isNotBlank(dc.getNdoc())) {
                                    sb.append(" ");
                                    sb.append(dc.getNdoc());
                                }
                                if (dc.getDat() != null) {
                                    sb.append(", ");
                                    sb.append(new SimpleDateFormat("dd.MM.yyyy").format(dc.getDat()));
                                }

                                prefix = "; ";
                            }
                            if (sb.length() > 0) {
                                CellUtil.createCell(row, columnIndex, sb.toString(), cs3);
                            }
                        }
                        ////END g19

                        //BEGIN g20
                        columnIndex++;
                        if (car != null) {
                            String input = StringUtils.defaultString(car.getNvag()) + " ";
                            if ((car.getRod() != null) && (!car.getRod().isEmpty()))
                                input += car.getRod() + " / ";
                            if ((car.getKlientName() != null) && (!car.getKlientName().isEmpty()))
                                input += car.getKlientName() + " / ";
                            if ((car.getVagOtm() != null) && (!car.getVagOtm().isEmpty()))
                                input += car.getVagOtm() + " / ";
                            if ((car.getGrPod() != null) && (car.getGrPod().compareTo(new BigDecimal(0)) != 0))
                                input += car.getGrPod() + " / ";
                            if ((car.getKolOs() != null) && (car.getKolOs() != 0))
                                input += car.getKolOs() + " / ";
                            if ((car.getTaraVag() != null) && (car.getTaraVag().compareTo(new BigDecimal(0)) != 0))
                                input += car.getTaraVag();

                            if (i == 0) {
                                CellUtil.createCell(row, columnIndex, input, cs2_boder_none_8);
                            }
                            else if (tableRowIndex - i == 1) {    // last itog strings
                                CellUtil.createCell(row, columnIndex, input, cs2_8);
                            }
                        }
                        ////END g20

                    }

                    konInCarIndex++;
                    konIndex++;
                }
                carIndex++;
            }
            smgsIndex++;
            massa = massa.add(smgs.getG24B() != null ? smgs.getG24B() : BigDecimal.ZERO);
        }

        rowIndex = sheet.getLastRowNum();
        row = sheet.createRow(++rowIndex);
        row.setHeightInPoints((2 * sheet.getDefaultRowHeightInPoints()));
        CellUtil.createCell(row, 0, "31", cs2_boder_thin);
        CellUtil.createCell(row, 1, "Общая масса отправки\nGesamtmasse der Sendung", cs2_boder_thin);
        int regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, 1, 5));
        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        CellUtil.createCell(row, 6, massa.toString(), cs2_boder_thin);
    }

    private CimSmgsGruz findGruzInKont(CimSmgsKonList kon, byte index) {
        int inx = 0;
        for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
            if (inx == index) {
                return gruz;
            }
            inx++;
        }
        return null;
    }

    private void addBorderedMergedRegion(int rowIndex, int columnIndex, int columnInterval) {
        int regIndex = sheet.addMergedRegion(new CellRangeAddress(rowIndex, rowIndex, columnIndex, columnIndex + columnInterval - 1));
        RegionUtil.setBorderTop(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        RegionUtil.setBorderBottom(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        RegionUtil.setBorderLeft(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
        RegionUtil.setBorderRight(CellStyle.BORDER_THIN, sheet.getMergedRegion(regIndex), sheet, getWb());
    }

    private CellStyle createWbStyle(BorderStyle style, Workbook wb)
    {
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setBorderBottom(style);
        cellStyle.setBorderRight(style);
        cellStyle.setBorderTop(style);
        cellStyle.setBorderLeft(style);
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment (VerticalAlignment.CENTER);
        return cellStyle;

    }
    private void setRegionStyle(BorderStyle style, CellRangeAddress range, Sheet sheet)
    {
        RegionUtil.setBorderBottom(style, range, sheet);
        RegionUtil.setBorderTop(style, range, sheet);
        RegionUtil.setBorderLeft(style, range, sheet);
        RegionUtil.setBorderRight(style, range, sheet);
    }

}

