package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Font;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Iterator;
import java.util.List;
import java.util.TreeMap;

public class ExportReport2Excel {
    final static private String nl = "\n";
    static private TreeMap<Byte, String> vid = new TreeMap<Byte, String>();
    static private TreeMap<Integer, String> tableHeader = new TreeMap<Integer, String>();
    static private TreeMap<Integer, String> tableHeader1 = new TreeMap<Integer, String>();
    static private TreeMap<Integer, String> tableHeader2 = new TreeMap<Integer, String>();
    static private TreeMap<Integer, String> tableHeader3 = new TreeMap<Integer, String>();
    static private TreeMap<Integer, String> tableHeader4 = new TreeMap<Integer, String>();
    static private SimpleDateFormat df1 = new SimpleDateFormat("dd.MM.yy");

    static {
//        vid.put((byte) 0, "ЭПД");
//        vid.put((byte) 1, "ЦИМ/СМГС");
//        vid.put((byte) 2, "СМГС");
//        vid.put((byte) 3, "Инструкция для СМГС");
//        vid.put((byte) 4, "ГУ-29К (27К)");
//        vid.put((byte) 5, "ЦИМ");
//        vid.put((byte) 6, "Инструкция для ГУ-29К(27К)");

//    tableHeader.put(0, "№ п.п");
//    tableHeader.put(1, "Идентификатор");
//    tableHeader.put(2, "№ контейнера");
//    tableHeader.put(3, "Размер\nконтейнера");
//    tableHeader.put(4, "Наименование грузоотправителя");
//    tableHeader.put(5, "Адрес грузоотправителя");
//    tableHeader.put(6, "Код станции\nотправления");
//    tableHeader.put(7, "Наименование станции\nотправления");
//    tableHeader.put(8, "Наименование грузополучателя");
//    tableHeader.put(9, "Адрес грузополучателя");
//    tableHeader.put(10, "Код станции\nназначения");
//    tableHeader.put(11, "Наименование станции\nназначения");
//    tableHeader.put(12, "Код ГНГ");
//    tableHeader.put(13, "Наименование груза по ГНГ");
//    tableHeader.put(14, "Код ЕТСНГ");
//    tableHeader.put(15, "Наименование груза по ЕТСНГ");

        tableHeader.put(0, "№");
        tableHeader.put(1, "Дата отправления\nконтейнеров со ст.\nТКД Добра\nDate of\ndeparture from\nTKD Dobrá");
        tableHeader.put(2, "Номер контейнера\nContainer №");
        tableHeader.put(3, "Номер вагона\nWagon №");
        tableHeader.put(4, "         Пломба Seal         ");
        tableHeader.put(5, "Мест Pieces");
        tableHeader.put(6, "Вес нетто\nNet weight");
        tableHeader.put(7, "    Тара    \n    Tare    ");
        tableHeader.put(8, "Вес брутто\nGross weight");
        tableHeader.put(9, "Накладная\nSMGS №");
        tableHeader.put(10, "№ поезд\nTrain №");
        tableHeader.put(11, "Станция отправления\nStation of departure");
        tableHeader.put(12, "Станция назначения\nStation of destination");
        tableHeader.put(13, "     Груз     \n     Cargo     ");

        tableHeader1.put(0, "№");
        tableHeader1.put(1, "Номер контейнера\nContainer №");
        tableHeader1.put(2, "Номер вагона\nWagon №");
        tableHeader1.put(3, "         Пломба Seal         ");
        tableHeader1.put(4, "Мест Pieces");
        tableHeader1.put(5, "Вес нетто\nNet weight");
        tableHeader1.put(6, "    Тара    \n    Tare    ");
        tableHeader1.put(7, "Вес брутто\nGross weight");
        tableHeader1.put(8, "Накладная\nSMGS №");
        tableHeader1.put(9, "Станция отправления\nStation of departure");
        tableHeader1.put(10, "Станция назначения\nStation of destination");
        tableHeader1.put(11, "     Груз     \n     Cargo     ");

        tableHeader2.put(12, "Документ");
        tableHeader2.put(13, "    Маршрут    ");
        tableHeader2.put(14, "   Проект   ");

        tableHeader3.put(0, "№");
        tableHeader3.put(1, "Номер инвойса");
        tableHeader3.put(2, "Вес нетто\nNet weight");
        tableHeader3.put(3, "Вес брутто\nGross weight");
        tableHeader3.put(4, "Стоимость");
        tableHeader3.put(5, "Валюта");
        tableHeader3.put(6, "     Груз     ");

        tableHeader4.put(7, "    Маршрут    ");
        tableHeader4.put(8, "   Проект   ");
    }

    private HSSFCellStyle styleTableHeader;
    private HSSFCellStyle styleTableHeaderLeft;
    private HSSFCellStyle styleTableHeaderRigth;
    private HSSFCellStyle styleTableFooter;
    private HSSFCellStyle styleBody;
    private HSSFCellStyle styleBodyLeft;
    private HSSFCellStyle styleBodyRigth;
    private HSSFCellStyle styleSum;

    private void initStyles(HSSFWorkbook workbook) {
        short borderBold = 5;
        short border = 1;

        // Create a new font and alter it.
        Font fontHeader = workbook.createFont();
        fontHeader.setBoldweight(Font.BOLDWEIGHT_BOLD);
        fontHeader.setFontName("Calibri");
//        fontHeader.setFontHeight((short)12);

        // Table header style
        styleTableHeader = workbook.createCellStyle();
        styleTableHeader.setBorderTop(borderBold);
        styleTableHeader.setBorderBottom(borderBold);
        styleTableHeader.setBorderLeft(borderBold);
        styleTableHeader.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTableHeader.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        styleTableHeader.setFont(fontHeader);
        styleTableHeader.setWrapText(true);
        styleTableHeader.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        styleTableHeader.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);

        // Table header style left cell
        styleTableHeaderLeft = workbook.createCellStyle();
        styleTableHeaderLeft.setBorderLeft(borderBold);
        styleTableHeaderLeft.setBorderTop(borderBold);
        styleTableHeaderLeft.setBorderBottom(borderBold);
        styleTableHeaderLeft.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTableHeaderLeft.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        styleTableHeaderLeft.setFont(fontHeader);
        styleTableHeaderLeft.setWrapText(true);
        styleTableHeaderLeft.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        styleTableHeaderLeft.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);

        // Table header style right cell
        styleTableHeaderRigth = workbook.createCellStyle();
        styleTableHeaderRigth.setBorderLeft(borderBold);
        styleTableHeaderRigth.setBorderRight(borderBold);
        styleTableHeaderRigth.setBorderTop(borderBold);
        styleTableHeaderRigth.setBorderBottom(borderBold);
        styleTableHeaderRigth.setAlignment(HSSFCellStyle.ALIGN_CENTER);
        styleTableHeaderRigth.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        styleTableHeaderRigth.setFont(fontHeader);
        styleTableHeaderRigth.setWrapText(true);
        styleTableHeaderRigth.setFillPattern(HSSFCellStyle.SOLID_FOREGROUND);
        styleTableHeaderRigth.setFillForegroundColor(HSSFColor.LIGHT_YELLOW.index);

        // Table footer
        styleTableFooter = workbook.createCellStyle();
        styleTableFooter.setBorderTop(borderBold);

        // Table content
        styleBody = workbook.createCellStyle();
        styleBody.setBorderBottom(border);
        styleBody.setBorderLeft(border);
//        styleBody.setWrapText(true);
        styleBody.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        styleBody.setVerticalAlignment(HSSFCellStyle.VERTICAL_TOP);

        // Table content left cell
        styleBodyLeft = workbook.createCellStyle();
        styleBodyLeft.setBorderBottom(border);
        styleBodyLeft.setBorderLeft(borderBold);
//        styleBodyLeft.setWrapText(true);
        styleBodyLeft.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        styleBodyLeft.setVerticalAlignment(HSSFCellStyle.VERTICAL_TOP);

        // Table content right cell
        styleBodyRigth = workbook.createCellStyle();
        styleBodyRigth.setBorderBottom(border);
        styleBodyRigth.setBorderRight(borderBold);
        styleBodyRigth.setBorderLeft(border);
//        styleBodyRigth.setWrapText(true);
        styleBodyRigth.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        styleBodyRigth.setVerticalAlignment(HSSFCellStyle.VERTICAL_TOP);

        styleSum = workbook.createCellStyle();
        styleSum.setBorderTop(border);
        styleSum.setBorderBottom(border);
        styleSum.setBorderLeft(border);
        styleSum.setBorderRight(border);
        styleSum.setAlignment(HSSFCellStyle.ALIGN_LEFT);
        styleSum.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER);
        styleSum.setFont(fontHeader);
    }

    public HSSFWorkbook convert2Excel(List<CimSmgs> list, Search search) {
        int tableHeaderSize = tableHeader.size();

        int rowHeaderPadding = 0;
        int rowTablePadding = 0;
        int headerSize = 0;

        int cellHeaderPadding = 3;
        int cellTablePadding = 0;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet firstSheet = workbook.createSheet("Summary");
        initStyles(workbook);

        //  Table Header
        HSSFRow rowTableHeader = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding);
        for (int i = 0; i < tableHeaderSize; i++) {
            HSSFCell cellTableHeader = rowTableHeader.createCell(cellTablePadding + i);
            cellTableHeader.setCellValue(tableHeader.get(i));
            if (i == 0)
                cellTableHeader.setCellStyle(styleTableHeaderLeft);
            else if (i == tableHeaderSize - 1)
                cellTableHeader.setCellStyle(styleTableHeaderRigth);
            else
                cellTableHeader.setCellStyle(styleTableHeader);
            firstSheet.autoSizeColumn(i);
        }
        // Table content

        int i = 1;
        for (CimSmgs elem : list) {
            HSSFRow rowTable = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding + (i));

            HSSFCell cellTableBody = rowTable.createCell(cellTablePadding + 0);
            cellTableBody.setCellValue(i);
            cellTableBody.setCellStyle(styleBodyLeft);

            cellTableBody = rowTable.createCell(cellTablePadding + 1);
            cellTableBody.setCellValue("");
            cellTableBody.setCellStyle(styleBody);

            String UtiN = "";
            String SizeFoot = "";
            String kgvn = "";
            int places = 0;

            for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                    UtiN += StringUtils.defaultString(kon.getUtiN()) + nl;
                    String footStr = "";
                    if (kon.getSizeFoot() != null)
                        footStr = kon.getSizeFoot().toString();
                    SizeFoot += footStr + nl;
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        String sss = StringUtils.defaultString(gruz.getKgvn());
                        if (sss.length() > 0) {
                            kgvn += "," + sss;
                        }
                        if (gruz.getPlaces() != null) {
                            places += gruz.getPlaces();
                        }
                    }
                }
            }
            if (kgvn.length() > 0) {
                kgvn = kgvn.substring(1);
            }

            cellTableBody = rowTable.createCell(cellTablePadding + 2);
            cellTableBody.setCellValue(UtiN);
            cellTableBody.setCellStyle(styleBody);

            String nvag = "";
            Iterator<CimSmgsCarList> it = elem.getCimSmgsCarLists().values().iterator();
            if (it.hasNext()) {
                CimSmgsCarList car = it.next();
                nvag = StringUtils.defaultString(car.getNvag());
                nvag = nvag.replaceAll(" ", "");
            }
            if (nvag.length() == 12) {
                nvag = nvag.substring(4);
            }
            cellTableBody = rowTable.createCell(cellTablePadding + 3);
            cellTableBody.setCellValue(nvag);
            cellTableBody.setCellStyle(styleBody);

            String plombs = "";
            for (CimSmgsPlomb plomb : elem.getCimSmgsPlombs().values()) {
                plombs += "," + StringUtils.defaultString(plomb.getZnak());
            }
            if (plombs.length() > 0) {
                plombs = plombs.substring(1);
            }

            cellTableBody = rowTable.createCell(cellTablePadding + 4);
            cellTableBody.setCellValue(StringUtils.defaultString(plombs));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 5);
            cellTableBody.setCellValue(StringUtils.defaultString(String.valueOf(places)));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 6);
            cellTableBody.setCellValue(elem.getG24N() != null ? elem.getG24N().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 7);
            cellTableBody.setCellValue(elem.getG24T() != null ? elem.getG24T().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 8);
            cellTableBody.setCellValue(elem.getG24B() != null ? elem.getG24B().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 9);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG694()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 10);
//            cellTableBody.setCellValue(StringUtils.substringAfter(StringUtils.defaultString(elem.getG4prim()), "BMW "));
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getNpoezd()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 11);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG162r()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 12);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG101r()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 13);
            cellTableBody.setCellValue(kgvn);
            cellTableBody.setCellStyle(styleBodyRigth);

            i++;
        }

        // Table footer
        HSSFRow rowTable = firstSheet.createRow(i);
        for (int j = 0; j < tableHeaderSize; j++) {
            HSSFCell cellTableFooter = rowTable.createCell(cellTablePadding + j);
            cellTableFooter.setCellValue((""));
            cellTableFooter.setCellStyle(styleTableFooter);

        }
        return workbook;
    }

    public HSSFWorkbook convert2Excel_1(List<CimSmgs> list, Search search, List<DocDir> docDirs) {
        boolean isGlobal = "global".equalsIgnoreCase(search.getScope());

        int tableHeaderSize = tableHeader1.size() + (isGlobal ? tableHeader2.size() : 0);

        int rowHeaderPadding = 0;
        int rowTablePadding = 0;
        int headerSize = 0;

        int cellHeaderPadding = 3;
        int cellTablePadding = 0;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet firstSheet = workbook.createSheet("Report");
        initStyles(workbook);

        //  Table Header
        HSSFRow rowTableHeader = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding);
        for (int i = 0; i < tableHeaderSize; i++) {
            HSSFCell cellTableHeader = rowTableHeader.createCell(cellTablePadding + i);
            cellTableHeader.setCellValue(i < tableHeader1.size() ? tableHeader1.get(i) : tableHeader2.get(i));
            if (i == 0)
                cellTableHeader.setCellStyle(styleTableHeaderLeft);
            else if (i == tableHeaderSize - 1)
                cellTableHeader.setCellStyle(styleTableHeaderRigth);
            else
                cellTableHeader.setCellStyle(styleTableHeader);
            firstSheet.autoSizeColumn(i);
        }
        // Table content

        int i = 1;
        for (CimSmgs elem : list) {
            HSSFRow rowTable = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding + (i));

            HSSFCell cellTableBody = rowTable.createCell(cellTablePadding + 0);
            cellTableBody.setCellValue(i);
            cellTableBody.setCellStyle(styleBodyLeft);

            String UtiN = "";
            String SizeFoot = "";
            String kgvn = "";
            int places = 0;
            String prefix;
            for (CimSmgsCarList vag : elem.getCimSmgsCarLists().values()) {
                prefix = "";
                for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                    UtiN += prefix;
                    SizeFoot += prefix;
                    prefix = nl;
                    UtiN += StringUtils.defaultString(kon.getUtiN());
                    String footStr = "";
                    if (kon.getSizeFoot() != null)
                        footStr = kon.getSizeFoot().toString();
                    SizeFoot += footStr;
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        String sss = StringUtils.defaultString(gruz.getKgvn());
                        if (sss.length() > 0) {
                            kgvn += "," + sss;
                        }
                        if (gruz.getPlaces() != null) {
                            places += gruz.getPlaces();
                        }
                    }
                }
            }
            if (kgvn.length() > 0) {
                kgvn = kgvn.substring(1);
            }

            cellTableBody = rowTable.createCell(cellTablePadding + 1);
            cellTableBody.setCellValue(UtiN);
            cellTableBody.setCellStyle(styleBody);

            String nvag = "";
            Iterator<CimSmgsCarList> it = elem.getCimSmgsCarLists().values().iterator();
            if (it.hasNext()) {
                CimSmgsCarList car = it.next();
                nvag = StringUtils.defaultString(car.getNvag());
                nvag = nvag.replaceAll(" ", "");
            }
            if (nvag.length() == 12) {
                nvag = nvag.substring(4);
            }
            cellTableBody = rowTable.createCell(cellTablePadding + 2);
            cellTableBody.setCellValue(nvag);
            cellTableBody.setCellStyle(styleBody);

            String plombs = "";
            for (CimSmgsPlomb plomb : elem.getCimSmgsPlombs().values()) {
                plombs += "," + StringUtils.defaultString(plomb.getZnak());
            }
            if (plombs.length() > 0) {
                plombs = plombs.substring(1);
            }

            cellTableBody = rowTable.createCell(cellTablePadding + 3);
            cellTableBody.setCellValue(StringUtils.defaultString(plombs));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 4);
            cellTableBody.setCellValue(StringUtils.defaultString(String.valueOf(places)));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 5);
            cellTableBody.setCellValue(elem.getG24N() != null ? elem.getG24N().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 6);
            cellTableBody.setCellValue(elem.getG24T() != null ? elem.getG24T().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 7);
            cellTableBody.setCellValue(elem.getG24B() != null ? elem.getG24B().toString() : "");
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 8);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG694()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 9);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG162r()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 10);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getG101r()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 11);
            cellTableBody.setCellValue(kgvn);
            cellTableBody.setCellStyle(isGlobal ? styleBody : styleBodyRigth);

            if (isGlobal) {
                cellTableBody = rowTable.createCell(cellTablePadding + 12);

                for(DocDir docDir: docDirs){
                    if(docDir.getHid().equals(elem.getDocType1())){
                        cellTableBody.setCellValue(docDir.getDescr());
                        break;
                    }
                }

//                cellTableBody.setCellValue(StringUtils.defaultString(Constants.buildDocName(elem.getType())));
                cellTableBody.setCellStyle(styleBody);

                Route route = elem.getRoute();
                cellTableBody = rowTable.createCell(cellTablePadding + 13);
                cellTableBody.setCellValue(StringUtils.defaultString(route.getName()));
                cellTableBody.setCellStyle(styleBody);

                cellTableBody = rowTable.createCell(cellTablePadding + 14);
                cellTableBody.setCellValue(StringUtils.defaultString(route.getProject().getName()));
                cellTableBody.setCellStyle(styleBodyRigth);
            }

            i++;
        }

        // Table footer
        HSSFRow rowTable = firstSheet.createRow(i);
        for (int j = 0; j < tableHeaderSize; j++) {
            HSSFCell cellTableFooter = rowTable.createCell(cellTablePadding + j);
            cellTableFooter.setCellValue((""));
            cellTableFooter.setCellStyle(styleTableFooter);

        }

        rowTable = firstSheet.createRow(i + 1);
        HSSFCell sumCell = rowTable.createCell(cellTablePadding + 1);
        sumCell.setCellValue("Итого: " + list.size());
        sumCell.setCellStyle(styleSum);

        return workbook;
    }

    public HSSFWorkbook convert2Excel_2(List<CimSmgsInvoice> list, Search search) {
        boolean isGlobal = "global".equalsIgnoreCase(search.getScope());

        int tableHeaderSize = tableHeader3.size() + (isGlobal ? tableHeader4.size() : 0);

        int rowHeaderPadding = 0;
        int rowTablePadding = 0;
        int headerSize = 0;

        int cellHeaderPadding = 3;
        int cellTablePadding = 0;

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet firstSheet = workbook.createSheet("Report");
        initStyles(workbook);

        //  Table Header
        HSSFRow rowTableHeader = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding);
        for (int i = 0; i < tableHeaderSize; i++) {
            HSSFCell cellTableHeader = rowTableHeader.createCell(cellTablePadding + i);
            cellTableHeader.setCellValue(i < tableHeader3.size() ? tableHeader3.get(i) : tableHeader4.get(i));
            if (i == 0)
                cellTableHeader.setCellStyle(styleTableHeaderLeft);
            else if (i == tableHeaderSize - 1)
                cellTableHeader.setCellStyle(styleTableHeaderRigth);
            else
                cellTableHeader.setCellStyle(styleTableHeader);
            firstSheet.autoSizeColumn(i);
        }
        // Table content

        int i = 1;
        for (CimSmgsInvoice elem : list) {
            HSSFRow rowTable = firstSheet.createRow(headerSize + rowHeaderPadding + rowTablePadding + (i));

            HSSFCell cellTableBody = rowTable.createCell(cellTablePadding + 0);
            cellTableBody.setCellValue(i);
            cellTableBody.setCellStyle(styleBodyLeft);

            BigDecimal mnet = new BigDecimal(0);
            BigDecimal mbrt = new BigDecimal(0);
            BigDecimal cost = new BigDecimal(0);
            String kgvn = "";
            int places = 0;

            for (CimSmgsInvoiceGruz gruz : elem.getInvoiceGruzs().values()) {
                if (gruz.getMnet() != null) {
                    mnet = mnet.add(gruz.getMnet());
                }

                if (gruz.getMbrt() != null) {
                    mbrt = mbrt.add(gruz.getMbrt());
                }

                BigDecimal itogo = new BigDecimal(0);
                try {
                    itogo = new BigDecimal(gruz.getItogo());
                }
                catch (Exception ex) {
                }
                cost = cost.add(itogo);

                String sss = gruz.getTnved();
                if (StringUtils.isNotBlank(sss)) {
                    kgvn += "," + sss;
                }
            }
            if (kgvn.length() > 0) {
                kgvn = kgvn.substring(1);
            }

            cellTableBody = rowTable.createCell(cellTablePadding + 1);
            cellTableBody.setCellValue(StringUtils.defaultString(elem.getInvoice()));
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 2);
            cellTableBody.setCellValue(mnet.toString());
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 3);
            cellTableBody.setCellValue(mbrt.toString());
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 4);
            cellTableBody.setCellValue(cost.toString());
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 5);
            cellTableBody.setCellValue(elem.getCux());
            cellTableBody.setCellStyle(styleBody);

            cellTableBody = rowTable.createCell(cellTablePadding + 6);
            cellTableBody.setCellValue(kgvn);
            cellTableBody.setCellStyle(isGlobal ? styleBody : styleBodyRigth);

            if (isGlobal) {
                Route route = elem.getRoute();
                cellTableBody = rowTable.createCell(cellTablePadding + 7);
                cellTableBody.setCellValue(StringUtils.defaultString(route.getName()));
                cellTableBody.setCellStyle(styleBody);

                cellTableBody = rowTable.createCell(cellTablePadding + 8);
                cellTableBody.setCellValue(StringUtils.defaultString(route.getProject().getName()));
                cellTableBody.setCellStyle(styleBodyRigth);
            }

            i++;
        }

        // Table footer
        HSSFRow rowTable = firstSheet.createRow(i);
        for (int j = 0; j < tableHeaderSize; j++) {
            HSSFCell cellTableFooter = rowTable.createCell(cellTablePadding + j);
            cellTableFooter.setCellValue((""));
            cellTableFooter.setCellStyle(styleTableFooter);

        }

        rowTable = firstSheet.createRow(i + 1);
        HSSFCell sumCell = rowTable.createCell(cellTablePadding + 1);
        sumCell.setCellValue("Итого: " + list.size());
        sumCell.setCellStyle(styleSum);

        return workbook;
    }
}
