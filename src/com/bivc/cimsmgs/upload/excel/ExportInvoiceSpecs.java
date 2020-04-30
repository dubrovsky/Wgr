package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.CimSmgsInvoiceGruz;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.CellReference;
import org.apache.poi.ss.util.CellUtil;
import org.apache.poi.ss.util.RegionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

public class ExportInvoiceSpecs extends Export2Excel  {
    final static private Logger log = LoggerFactory.getLogger(ExportInvoiceSpecs.class);
    private final List<CimSmgsInvoice> docs;
    private final String query;
    private Sheet sheet;

    private CellStyle cs10ArialBoldBorderThin;
    private CellStyle cs10ArialBoldBorderThinGrey;
    private CellStyle cs10ArialBoldBorderThinWrap;
    public ExportInvoiceSpecs(String excelFormat, List<CimSmgsInvoice> docs, String path4ExcelTmpl, String query) throws IOException, InvalidFormatException {
        super(excelFormat, path4ExcelTmpl);
        this.docs = docs;
        this.query = query;
        sheet = getWb().getSheetAt(0);
        initStyles();
    }
    public void makeSpecs()
    {
        log.debug("makeSpecs");
        String[] flags=query.split(",");
        // true - 6 digits, false - 10-digits
        boolean digits6_10= Boolean.parseBoolean(flags[0].trim());
        // true - code, false- code+name(ru)
        boolean codeName= Boolean.parseBoolean(flags[1].trim());
        // true - use price,false - dont use price
        boolean usePrice= Boolean.parseBoolean(flags[2].trim());

        if(docs==null)
            return;
        int current_row=8;
        int first_row=9;
        // карта КОД ТНВЭД - НАЗВАНИЕ НА РУССКОМ- ЕДИНИЦЫ ИЗМЕРЕНИЯ --- ГРУЗ
        Map<String,Map<String,Map<String,CimSmgsInvoiceGruz>>> gruzMap = new HashMap<>();
        for (CimSmgsInvoice invoice: docs) {

            Collection<CimSmgsInvoiceGruz> gruzs= invoice.getInvoiceGruzs().values();
            HibernateUtil.getSession().evict(invoice);
            for (CimSmgsInvoiceGruz gruz:gruzs)
            {
                //отсоединяем инвойс
                String tnved="";
                String eizm="";
                String nzgr="";
                // получаем код ТНВЭД на 6 или 10 символов
                if(gruz.getTnved()!=null)
                {
                    tnved=gruz.getTnved().trim()
                            .substring(0,Math.min(digits6_10?6:10,gruz.getTnved().trim().length()));
                }

                // получаем единицы измерения
                if(gruz.getEizm()!=null)
                {
                    eizm=gruz.getEizm().trim().replaceAll(",","").replaceAll("\\.","");
                }
                //получаем наименование на русском
                if(gruz.getNzgr()!=null)
                {
                    nzgr=gruz.getNzgr().trim();
                }

                Map<String,Map<String,CimSmgsInvoiceGruz>> tnvedGruz =gruzMap.get(tnved.toUpperCase());
                if(tnvedGruz!=null)
                {
                    Map<String,CimSmgsInvoiceGruz> eizmGruz=tnvedGruz.get(eizm.toUpperCase());
                    if(eizmGruz!=null)
                    {
                        CimSmgsInvoiceGruz invoiceGruz = eizmGruz.get(nzgr.toUpperCase());
                        if(invoiceGruz!=null)
                        {
                            if(gruz.getKolm()!=null) {
                                if (invoiceGruz.getKolm() == null) {
                                    invoiceGruz.setKolm(new BigDecimal(0));
                                }
                                invoiceGruz.setKolm(invoiceGruz.getKolm().add(gruz.getKolm()));
                            }
                            if(gruz.getMbrt()!=null) {
                                if (invoiceGruz.getMbrt() == null) {
                                    invoiceGruz.setMbrt(new BigDecimal(0));
                                }
                                invoiceGruz.setMbrt(invoiceGruz.getMbrt().add(gruz.getMbrt()));
                            }
                            if(gruz.getMnet()!=null) {
                                if (invoiceGruz.getMnet() == null) {
                                    invoiceGruz.setMnet(new BigDecimal(0));
                                }
                                invoiceGruz.setMnet(invoiceGruz.getMnet().add(gruz.getMnet()));
                            }
                            if(gruz.getKole()!=null) {
                                if (invoiceGruz.getKole() == null) {
                                    invoiceGruz.setKole(new BigDecimal(0));
                                }
                                invoiceGruz.setKole(invoiceGruz.getKole().add(gruz.getKole()));
                            }
                            if(gruz.getItogo()!=null) {
                                if (invoiceGruz.getItogo() == null) {
                                    invoiceGruz.setItogo("0");
                                }
                                if(invoiceGruz.getItogo()!=null&&!invoiceGruz.getItogo().isEmpty())
                                    invoiceGruz.setItogo((new BigDecimal (invoiceGruz.getItogo().replace(",", ".")).add(new BigDecimal(gruz.getItogo().replace(",", ".")))).toString());
                            }
                            if(gruz.getInvoice()!=null&&gruz.getInvoice().getInvoice()!=null) {
                                String[] arr =invoiceGruz.getNzgr().split("-----");


                                HashSet<String> invoicesSet= arr.length>1?new HashSet<>(Arrays.asList(arr[1].split(","))):new HashSet<>();
                                invoicesSet.add(gruz.getInvoice().getInvoice());
                                StringBuilder builder =new StringBuilder();
                                for (String s:invoicesSet) {
                                    if(builder.length()>0)
                                        builder.append(",");
                                    builder.append(s);
                                }
                                invoiceGruz.setNzgr(arr[0]+"-----"+builder.toString());
                            }
                        }
                        else
                        {
                            if(gruz.getInvoice()!=null&&gruz.getInvoice().getInvoice()!=null)
                                gruz.setNzgr(gruz.getNzgr()+"-----"+gruz.getInvoice().getInvoice());
                            eizmGruz.put(nzgr,gruz);
                        }
                    }
                    else
                    {
                        if(gruz.getInvoice()!=null&&gruz.getInvoice().getInvoice()!=null)
                            gruz.setNzgr(gruz.getNzgr()+"-----"+gruz.getInvoice().getInvoice());

                        Map<String,CimSmgsInvoiceGruz> nzgrGruzAdd =  new HashMap<>();
                        nzgrGruzAdd.put(nzgr.toUpperCase(),gruz);
                        tnvedGruz.put(eizm.toUpperCase(),nzgrGruzAdd);
                    }
                }
                else
                {
                    if(gruz.getInvoice()!=null&&gruz.getInvoice().getInvoice()!=null)
                        gruz.setNzgr(gruz.getNzgr()+"-----"+gruz.getInvoice().getInvoice());

                    Map<String,Map<String,CimSmgsInvoiceGruz>> tnvedGruzAdd =  new HashMap<>();
                    Map<String,CimSmgsInvoiceGruz> nzypGruzAdd =  new HashMap<>();
                    nzypGruzAdd.put(nzgr.toUpperCase(),gruz);
                    tnvedGruzAdd.put(eizm.toUpperCase(),nzypGruzAdd);
                    gruzMap.put(tnved,tnvedGruzAdd);
                }
            }
        }
        Map<String,Map<String,Map<String,CimSmgsInvoiceGruz>>> gruzMapSorted =gruzMap.entrySet().stream().sorted((o1, o2) -> o1.getKey().compareTo(o2.getKey()))
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue, (e1,e2) -> e1, LinkedHashMap::new));

        for (String tnved: gruzMapSorted.keySet()) {
            Map<String,Map<String,CimSmgsInvoiceGruz>> tnvedGruz =gruzMapSorted.get(tnved);
            for(String eizm:tnvedGruz.keySet())
            {
                Map<String,CimSmgsInvoiceGruz> nzgrGruz=tnvedGruz.get(eizm);

                if(codeName) { // код + ТНВЭД
                    for (String nzgr : nzgrGruz.keySet()) {
                        CimSmgsInvoiceGruz gruz = nzgrGruz.get(nzgr);
                        Row row = sheet.createRow(current_row);
                        //Номер по порядку
                        CellUtil.createCell(row, 0, Integer.toString(current_row - 7), cs10ArialBoldBorderThin);
                        //Код ТНВЭД
                        CellUtil.createCell(row, 1, gruz.getTnved() != null ? gruz.getTnved() : "", cs10ArialBoldBorderThin);
                        //Наименование товара
                        String arr[]=(gruz.getNzgr() != null ? gruz.getNzgr().toUpperCase() : "").split("-----");
                        CellUtil.createCell(row, 2,arr[0], cs10ArialBoldBorderThin);

                        //Наименование товара, Eng
                        CellUtil.createCell(row, 3, gruz.getNzgrEn() != null ? gruz.getNzgrEn().toUpperCase() : "", cs10ArialBoldBorderThin);

                        //Кол-во
                        Cell cell = row.createCell(4);
                        cell.setCellType(CellType.NUMERIC);
                        cell.setCellStyle(cs10ArialBoldBorderThin);
                        cell.setCellValue(gruz.getKole() != null ? gruz.getKole().doubleValue() : 0);

                        //Ед. измерения
                        CellUtil.createCell(row, 5, gruz.getEizm() != null ? gruz.getEizm() : "", cs10ArialBoldBorderThin);

                        //Вес нетто, кг
                        cell = row.createCell(6);
                        cell.setCellType(CellType.NUMERIC);
                        cell.setCellStyle(cs10ArialBoldBorderThin);
                        cell.setCellValue(gruz.getMnet() != null ? gruz.getMnet().doubleValue() : 0);

                        //Тара, кг
                        CellUtil.createCell(row, 7, "", cs10ArialBoldBorderThin);

                        //Вес брутто
                        cell = row.createCell(8);
                        cell.setCellType(CellType.NUMERIC);
                        cell.setCellStyle(cs10ArialBoldBorderThin);
                        cell.setCellValue(gruz.getMbrt() != null ? gruz.getMbrt().doubleValue() : 0);

                        //Стоимость
                        cell = row.createCell(9);
                        cell.setCellType(CellType.NUMERIC);
                        cell.setCellStyle(cs10ArialBoldBorderThin);
                        cell.setCellValue((gruz.getItogo() != null && StringUtils.isNumeric(gruz.getItogo().replaceAll(",", "").replaceAll("\\.", "")))
                                ? Double.parseDouble(gruz.getItogo()) : 0);

                        //Валюта
                        CellUtil.createCell(row, 10, "", cs10ArialBoldBorderThin);
                        //Инвойс №
                        CellUtil.createCell(row, 11,  arr.length>1?arr[1]:"", cs10ArialBoldBorderThinWrap);

                        //места
                        CellUtil.createCell(row, 12, "", cs10ArialBoldBorderThin);
                        current_row++;
                    }
                }
                else
                { // код
                    List<String> nzgrs = new ArrayList<>();
                    List<String> nzgrsEn = new ArrayList<>();
                    Set<String> invoices = new HashSet<>();
                    BigDecimal koleSum = new BigDecimal(0);
                    BigDecimal mnetSum = new BigDecimal(0);
                    BigDecimal mbrtSum = new BigDecimal(0);
                    BigDecimal itogoSum = new BigDecimal(0);
                    for(String nzgr : nzgrGruz.keySet())
                    {
                        CimSmgsInvoiceGruz gruz = nzgrGruz.get(nzgr);
                        String[] arr=null;
                        if(gruz.getNzgr()!=null) {
                            arr=(gruz.getNzgr() != null ? gruz.getNzgr().toUpperCase() : "").split("-----");
                            nzgrs.add(arr[0].trim().toUpperCase()+
                                    (gruz.getKole()!=null?" - "+fmtDouble(gruz.getKole().doubleValue())+
                                            (gruz.getEizm()!=null?" "+gruz.getEizm():""):""));
                        }
                        if(gruz.getNzgrEn()!=null) {
                            nzgrsEn.add(gruz.getNzgrEn().trim().toUpperCase());
                        }
                        if(gruz.getKole()!=null)
                            koleSum=koleSum.add(gruz.getKole());

                        if(gruz.getMnet()!=null)
                            mnetSum=mnetSum.add(gruz.getMnet());

                        if(gruz.getMbrt()!=null)
                            mbrtSum=mbrtSum.add(gruz.getMbrt());

                        if(arr!=null&&arr.length>1)
                            invoices.addAll(Arrays.asList(arr[1].split(",")));

                        if(gruz.getItogo()!=null&&StringUtils.isNumeric(gruz.getItogo().replaceAll(",", "").replaceAll("\\.", "")))
                        {
                            itogoSum=itogoSum.add(new BigDecimal(gruz.getItogo()));
                        }
                    }
                    Row row = sheet.createRow(current_row);
                    //Номер по порядку
                    CellUtil.createCell(row, 0, Integer.toString(current_row - 7), cs10ArialBoldBorderThin);
                    //Код ТНВЭД
                    CellUtil.createCell(row, 1, tnved, cs10ArialBoldBorderThin);
                    //Наименование товара
                    String toStr=nzgrs.toString();
                    CellUtil.createCell(row, 2, toStr.substring(1,toStr.length()-1), cs10ArialBoldBorderThinWrap);

                    //Наименование товара, Eng
                    toStr=nzgrsEn.toString();
                    CellUtil.createCell(row, 3, toStr.substring(1,toStr.length()-1), cs10ArialBoldBorderThinWrap);
                    current_row++;

                    //Кол-во
                    Cell cell = row.createCell(4);
                    cell.setCellType(CellType.NUMERIC);
                    cell.setCellStyle(cs10ArialBoldBorderThin);
                    cell.setCellValue(koleSum.doubleValue());

                    //Ед. измерения
                    CellUtil.createCell(row, 5,eizm, cs10ArialBoldBorderThin);

                    //Вес нетто, кг
                    cell = row.createCell(6);
                    cell.setCellType(CellType.NUMERIC);
                    cell.setCellStyle(cs10ArialBoldBorderThin);
                    cell.setCellValue(mnetSum.doubleValue());

                    //Тара, кг
                    CellUtil.createCell(row, 7, "", cs10ArialBoldBorderThin);

                    //Вес брутто
                    cell = row.createCell(8);
                    cell.setCellType(CellType.NUMERIC);
                    cell.setCellStyle(cs10ArialBoldBorderThin);
                    cell.setCellValue(mbrtSum.doubleValue());

                    //Стоимость
                    cell = row.createCell(9);
                    cell.setCellType(CellType.NUMERIC);
                    cell.setCellStyle(cs10ArialBoldBorderThin);
                    cell.setCellValue(itogoSum.doubleValue());

                    //Валюта
                    CellUtil.createCell(row, 10, "", cs10ArialBoldBorderThin);
                    //Инвойс №
                    toStr=invoices.toString();
                    CellUtil.createCell(row, 11, toStr.substring(1,toStr.length()-1),cs10ArialBoldBorderThinWrap);
                    //места
                    CellUtil.createCell(row, 12, "",cs10ArialBoldBorderThin);
                }
            }
        }
        if(!usePrice)
            sheet.setColumnHidden(9, true);

        Row row= sheet.createRow(current_row);
        String letter=CellReference.convertNumToColString(4);
        Cell cell=row.createCell(4);
        cell.setCellStyle(cs10ArialBoldBorderThinGrey);
        cell.setCellFormula("SUM("+letter+first_row+":"+letter+(current_row)+")");

        letter=CellReference.convertNumToColString(6);
        cell=row.createCell(6);
        cell.setCellStyle(cs10ArialBoldBorderThinGrey);
        cell.setCellFormula("SUM("+letter+first_row+":"+letter+(current_row)+")");

        letter=CellReference.convertNumToColString(8);
        cell=row.createCell(8);
        cell.setCellStyle(cs10ArialBoldBorderThinGrey);
        cell.setCellFormula("SUM("+letter+first_row+":"+letter+(current_row)+")");

        letter=CellReference.convertNumToColString(9);
        cell=row.createCell(9);
        cell.setCellStyle(cs10ArialBoldBorderThinGrey);
        cell.setCellFormula("SUM("+letter+first_row+":"+letter+(current_row)+")");

//        CellUtil.createCell(row, 0, docs.stream().map(CimSmgsInvoice::getHid).collect(Collectors.toList()).toString(),cs10ArialBoldBorderThin);
//        getWb().getCreationHelper().createFormulaEvaluator().evaluateAll();

//        Row row= sheet.createRow(current_row);
//        CellUtil.createCell(row,1, docs.stream().map(CimSmgsInvoice::getHid).collect(Collectors.toSet()).toString(),cs10ArialBoldBorderThin);
    }
    private void initStyles()
    {
        Font font10Arial = getWb().createFont();
        font10Arial.setFontName("Arial");
        font10Arial.setFontHeightInPoints((short)10);

        cs10ArialBoldBorderThin = createWbStyle(BorderStyle.THIN,getWb(),false,null);
        cs10ArialBoldBorderThin.setFont(font10Arial);

        cs10ArialBoldBorderThinWrap= createWbStyle(BorderStyle.THIN,getWb(),true,null);
        cs10ArialBoldBorderThinWrap.setFont(font10Arial);

        cs10ArialBoldBorderThinGrey= createWbStyle(BorderStyle.THIN,getWb(),false,IndexedColors.GREY_25_PERCENT.getIndex());
        cs10ArialBoldBorderThinGrey.setFont(font10Arial);


    }
    private CellStyle createWbStyle(BorderStyle style, Workbook wb, boolean wrap,Short BackgroundColor)
    {
        CellStyle cellStyle = wb.createCellStyle();
        cellStyle.setBorderBottom(style);
        cellStyle.setBorderRight(style);
        cellStyle.setBorderTop(style);
        cellStyle.setBorderLeft(style);
        cellStyle.setAlignment(HorizontalAlignment.LEFT);
        cellStyle.setVerticalAlignment (VerticalAlignment.TOP);
        cellStyle.setWrapText(wrap);
        if(BackgroundColor!=null) {
            cellStyle.setFillForegroundColor(IndexedColors.GREY_50_PERCENT.getIndex());
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }

        return cellStyle;

    }
    private void setRegionStyle(BorderStyle style, CellRangeAddress range, Sheet sheet)
    {
        RegionUtil.setBorderBottom(style, range, sheet);
        RegionUtil.setBorderTop(style, range, sheet);
        RegionUtil.setBorderLeft(style, range, sheet);
        RegionUtil.setBorderRight(style, range, sheet);
    }


    public static String fmtDouble(double d)
    {
        if(d == (long) d)
            return String.format("%d",(long)d);
        else
            return String.format("%s",d);
    }
}
