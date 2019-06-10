package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.bivc.cimsmgs.exchange.DateFormat;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.commons.lang3.text.WordUtils;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.*;
import java.util.List;

/**
 * Date: 06.03.12
 * Time: 9:54
 */
public class Print {
    private boolean useBlanks;
    private List<Integer> pages;

    public boolean isUseBlanks() {
        return useBlanks;
    }

    public void setUseBlanks(boolean useBlanks) {
        this.useBlanks = useBlanks;
    }

    public List<Integer> getPages() {
        return pages;
    }

    public void setPages(List<Integer> pages) {
        this.pages = pages;
    }
    private static HashMap<String, Rectangle> pageSizeMap = new HashMap<>();
    static {
        pageSizeMap.put("A4", PageSize.A4);
        pageSizeMap.put("A3", PageSize.A3);
        pageSizeMap.put("A4L", new RectangleReadOnly(842.0F,595.0F ));
        pageSizeMap.put("A3L", new RectangleReadOnly(1191.0F, 842.0F));
    }

    public ByteArrayOutputStream generateVagPdf(Ved ved, String pageSize) throws DocumentException, InvocationTargetException, IllegalAccessException, IOException, SQLException {
        float[] widths0 = {20, 20, 20, 20, 20};
        float[] widths1 = {70, 30};
        float[] widths1_1 = {16, 16, 16, 16, 16, 20};
        float[] widths2 = {3, 14, 10, 15, 8, 5, 15, 20, 10};
        float[] widths3 = {21, 6, 12, 11, 20, 6, 8, 16};
        String fontFamily = "courier new";
        Font font_bold = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 9, Font.BOLD);
        Font font = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 9, Font.NORMAL);
        Font font_simple = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 8, Font.NORMAL);
        Font font7 = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 7, Font.NORMAL);
        Font font5 = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 5, Font.NORMAL);
        Document document = new Document(pageSizeMap.get(pageSize), 10, 10, 10, 10);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPdfVersion(PdfWriter.VERSION_1_5);
        writer.addViewerPreference(PdfName.PRINTSCALING, PdfName.NONE);
        writer.addViewerPreference(PdfName.PICKTRAYBYPDFSIZE, PdfBoolean.PDFTRUE);

        document.open();

        PdfPTable table0 = new PdfPTable(5);
        table0.setWidthPercentage(widths0, pageSizeMap.get(pageSize + "L"));
        table0.setWidthPercentage(100);
        table0.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);

        PdfPCell cell = new PdfPCell(new Phrase("Блок дополнительной информации, заполняемый железнодорожными компаниями при необходимости / Blok informacji dodatkowych, wypelniany przez przewoznika kolejowego w razie koniecznosci", "A3".equals(pageSize) ? font7 : font5));
        cell.setColspan(5);
        cell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table0.addCell(cell);

        table0.addCell(new Phrase("Пункт / Punkt", "A3".equals(pageSize) ? font_simple : font5));
        table0.addCell(new Phrase("Операция / Operacja", "A3".equals(pageSize) ? font_simple : font5));
        table0.addCell(new Phrase("Месяц / Miesiac", "A3".equals(pageSize) ? font_simple : font5));
        table0.addCell(new Phrase("Условная дата / Data umowna", "A3".equals(pageSize) ? font_simple : font5));
        table0.addCell(new Phrase("Число / Dzien", "A3".equals(pageSize) ? font_simple : font5));

        table0.addCell(new Phrase(StringUtils.defaultString(ved.getStninc()), font_simple));
        table0.addCell(new Phrase("", font_simple));
        table0.addCell(new Phrase(DateFormat.dateFormaterMonth.format(new Date()), font_simple));
        table0.addCell(new Phrase(DateFormat.dateFormaterPrintFull.format(new Date()), font_simple));
        table0.addCell(new Phrase(DateFormat.dateFormaterDay.format(new Date()), font_simple));



        document.add(table0);

        PdfPTable table1 = new PdfPTable(2);
        table1.setSpacingBefore(20);
        table1.setWidthPercentage(widths1, pageSizeMap.get(pageSize));
        table1.setWidthPercentage(90);
        table1.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);

        cell = new PdfPCell(new Phrase("ВАГОННАЯ ВЕДОМОСТЬ № " + StringUtils.defaultString(ved.getNum()), font_bold));
        cell.setColspan(2);
        cell.setBorder(Rectangle.NO_BORDER);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        table1.addCell(cell);

        cell = new PdfPCell(new Phrase("Wykaz zdawczy", font_simple));
        cell.setColspan(2);
        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        Phrase phrase = new Phrase();
        phrase.add(new Chunk("Вагонов, сданных с ",  font));
        phrase.add(new Chunk(StringUtils.defaultString(ved.getRailoutn()), font_bold));
        phrase.add(new Chunk(StringUtils.defaultString(ved.getCarroutn()), font_bold));
        cell = new PdfPCell(phrase);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("на ",  font));
        phrase.add(new Chunk(StringUtils.defaultString(ved.getRailinn()), font_bold));
        cell = new PdfPCell(phrase);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("Wagonow przekazanych z kolei",  font_simple));
        cell = new PdfPCell(phrase);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("na koleje",  font_simple));
        cell = new PdfPCell(phrase);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("На станции ",  font));
        phrase.add(new Chunk(StringUtils.defaultString(ved.getStninn()), font_bold));
        cell = new PdfPCell(phrase);
//        cell.setHorizontalAlignment(Element.ALIGN_CENTER);
        cell.setPaddingTop(10);
        cell.setPaddingLeft(25);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("поезд №",  font));
        phrase.add(new Chunk(StringUtils.defaultString(ved.getTrain()), font_bold));
        cell = new PdfPCell(phrase);
        cell.setPaddingTop(10);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("Na stacji",  font_simple));
        cell = new PdfPCell(phrase);
        cell.setPaddingLeft(25);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);

        phrase = new Phrase();
        phrase.add(new Chunk("pociagiem",  font_simple));
        cell = new PdfPCell(phrase);
        cell.setBorder(Rectangle.NO_BORDER);
        table1.addCell(cell);
        document.add(table1);

        PdfPTable table1_1 = new PdfPTable(6);
        table1_1.setSpacingBefore(10);
        table1_1.setWidthPercentage(widths1_1, pageSizeMap.get(pageSize));
        table1_1.setWidthPercentage(60);
        table1_1.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table1_1.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);

        table1_1.addCell(new Phrase("Месяц\nmiesiac", font));
        table1_1.addCell(new Phrase(ved.getCrdate() != null ? DateFormat.dateFormater.format(ved.getCrdate()).substring(3, 5) : "" , font_bold));
        table1_1.addCell(new Phrase("день\ndzien", font));
        table1_1.addCell(new Phrase(ved.getCrdate() != null ? DateFormat.dateFormater.format(ved.getCrdate()).substring(0, 2) : "", font_bold));
        table1_1.addCell(new Phrase("года\nrok", font));
        table1_1.addCell(new Phrase(ved.getCrdate() != null ? DateFormat.dateFormater.format(ved.getCrdate()).substring(4, 8) : "", font_bold));
        document.add(table1_1);

        PdfPTable table2 = new PdfPTable(9);
        table2.setSpacingBefore(15);
        table2.setWidthPercentage(widths2, pageSizeMap.get(pageSize));
        table2.setHeaderRows(1);
        table2.setWidthPercentage(100);
        table2.getDefaultCell().setBorder(Rectangle.BOX);
        table2.getDefaultCell().setHorizontalAlignment(com.itextpdf.text.Element.ALIGN_CENTER);

        table2.addCell(new Phrase("№", font));
        table2.addCell(new Phrase("№ вагона\nNumer wagonu", font));
        table2.addCell(new Phrase("Код приписки вагона\nKod przypisania", font));
        table2.addCell(new Phrase("Владелец вагона\nPosiadacz wagonu", font));
        table2.addCell(new Phrase("Вагон совм. польз.\nWagon wspolnego uzytkow.", font));
        table2.addCell(new Phrase("Оси\nil osi" , font));
        table2.addCell(new Phrase("Гружен/Порожн.\nLadowny/prozny", font));
        table2.addCell(new Phrase("Станция назначения\nStacja przeznaczenia", font));
        table2.addCell(new Phrase("Примечание\nUwagi", font));

        int grCount = 0;
        int axCount = 0;
        for (VedVag vag : ved.getVags()) {
            table2.addCell(new Phrase(StringUtils.defaultString(vag.getIndexNum()), font));
            table2.addCell(new Phrase(StringUtils.defaultString(vag.getNvag()), font));
            String nvag = StringUtils.defaultString(vag.getNvag()).replaceAll(" ", "");
            table2.addCell(new Phrase(nvag.length()>4 ? nvag.substring(2, 4) : "", font));
            table2.addCell(new Phrase(StringUtils.defaultString(vag.getOwner()), font));
            table2.addCell(new Phrase(StringUtils.isBlank(vag.getOwner()) ? "X" : "", font));
            table2.addCell(new Phrase(vag.getAxes() != null ? vag.getAxes().toString() : "", font));
            String txt = "";
            if (vag.getMbrt() == null || vag.getMbrt().equals(new BigDecimal(0))) {
                txt = "Порожний";
            }
            else {
                txt = "Груженый";
                grCount++;
            }
            table2.addCell(new Phrase( txt , font));
            table2.addCell(new Phrase(StringUtils.defaultString(vag.getNstn()), font));
            table2.addCell(new Phrase(StringUtils.defaultString(vag.getPrim()), font));
            axCount += vag.getAxes() != null ? vag.getAxes() : 0;
        }
        document.add(table2);

        PdfPTable table3 = new PdfPTable(8);
        table3.setSpacingBefore(20);
        table3.setWidthPercentage(widths3, pageSizeMap.get(pageSize));
        table3.setWidthPercentage(90);
        table3.getDefaultCell().setBorder(Rectangle.NO_BORDER);
        table3.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
        

        table3.addCell(new Phrase("Итого груженых\nRazem ladownych", font));
        table3.addCell(new Phrase(""  + grCount, font));
        table3.addCell(new Phrase("порожних\nproznych", font));
        table3.addCell(new Phrase("" + (ved.getVags().size() - grCount), font));
        table3.addCell(new Phrase("Всего вагонов\nOgolem wagonow", font));
        table3.addCell(new Phrase("" + ved.getVags().size() , font));
        table3.addCell(new Phrase("осей\nosi", font));
        table3.addCell(new Phrase("" + axCount, font));

        table3.addCell(new Phrase("Вес НЕТТО\nWaga netto", font));
        table3.addCell(new Phrase("", font));
        table3.addCell(new Phrase("", font));
        table3.addCell(new Phrase("", font));
        table3.addCell(new Phrase("Вес БРУТТО\nWaga brutto", font));
        table3.addCell(new Phrase("" , font));
        table3.addCell(new Phrase("", font));
        table3.addCell(new Phrase("", font));

        cell = new PdfPCell(new Phrase("Вагонная ведомость вручена агенту принимающему в\nWykaz zdawczy wreczono ajentowi kolei pryjmujacej", font));
        cell.setColspan(5);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        cell = new PdfPCell(new Phrase("час     мин", font));
        cell.setColspan(3);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        cell = new PdfPCell(new Phrase("Агент сдающей жел. дороги\nAjent kolei zdajacej", font));
        cell.setColspan(4);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        cell = new PdfPCell(new Phrase("Агент принимающей жел. дороги\nAjent kolei przyjmujacej", font));
        cell.setColspan(4);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        cell = new PdfPCell(new Phrase("Штемпель сдающей дороги\nDatownik kolei zdajacej", font));
        cell.setColspan(4);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        cell = new PdfPCell(new Phrase("Штемпель принимающей дороги\nDatownik kolei przyjmujacej", font));
        cell.setColspan(4);
        cell.setBorder(Rectangle.NO_BORDER);
        table3.addCell(cell);
        document.add(table3);

        document.close();
        return baos;
    }

    public ByteArrayOutputStream generatePerPdf(Ved ved, HashMap<String, List<VedVag>> map, String pageSize) throws DocumentException, InvocationTargetException, IllegalAccessException, IOException, SQLException {
        float[] widths1 = {30, 30, 20, 20};
        float[] widths2 = {3, 12, 5, 10, 8, 10, 10, 10, 11, 11, 5, 5};
        float[] widths3 = {25, 25, 25, 25};
        String fontFamily = "courier new";
        Font font_bold = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 9, Font.BOLD);
        Font font = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, 9, Font.NORMAL);

        Document document = new Document( pageSizeMap.get(pageSize+"L"), 10, 10, 10, 10);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPdfVersion(PdfWriter.VERSION_1_5);
        writer.addViewerPreference(PdfName.PRINTSCALING, PdfName.NONE);
        writer.addViewerPreference(PdfName.PICKTRAYBYPDFSIZE, PdfBoolean.PDFTRUE);

        document.open();

        for (Map.Entry<String, List<VedVag>> entry : map.entrySet()) {
            Paragraph title = new Paragraph("ПЕРЕДАТОЧНАЯ ВЕДОМОСТЬ - WYKAZ ZDAWCZY № " + entry.getKey(), font_bold);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            PdfPTable table1 = new PdfPTable(4);
            table1.setSpacingBefore(10);
            table1.setWidthPercentage(widths1, pageSizeMap.get(pageSize + "L"));
            table1.setWidthPercentage(100);
            table1.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);

            Phrase phrase = new Phrase();
            phrase.add(new Chunk("Cдающий перевозчик (наименование и код)", font));
            phrase.add(Chunk.NEWLINE);
            phrase.add(new Chunk(StringUtils.defaultString(ved.getCarroutc()), font_bold));
            phrase.add(Chunk.NEWLINE);
            phrase.add(new Chunk(StringUtils.defaultString(ved.getCarroutn()), font_bold));
            PdfPCell cell = new PdfPCell(phrase);
            cell.setRowspan(3);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk("Принимающий перевозчик (наименование и код)", font));
            phrase.add(Chunk.NEWLINE);
            phrase.add(new Chunk(StringUtils.defaultString(ved.getCarrinc()), font_bold));
            phrase.add(Chunk.NEWLINE);
            phrase.add(new Chunk(StringUtils.defaultString(ved.getCarrinn()), font_bold));
            cell = new PdfPCell(phrase);
            cell.setRowspan(3);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk("станция передачи", font));
            cell = new PdfPCell(phrase);
            cell.setBorderWidthRight(0);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk(StringUtils.defaultString(ved.getStninn()), font_bold));
            cell = new PdfPCell(phrase);
            cell.setBorderWidthLeft(0);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk("поезд №\npociag", font));
            cell = new PdfPCell(phrase);
            cell.setBorderWidthRight(0);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk(StringUtils.defaultString(ved.getTrain()), font_bold));
            cell = new PdfPCell(phrase);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBorderWidthLeft(0);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk("дата\ndata", font));
            cell = new PdfPCell(phrase);
            cell.setBorderWidthRight(0);
            table1.addCell(cell);

            phrase = new Phrase();
            phrase.add(new Chunk(ved.getCrdate()!= null ? DateFormat.dateFormater.format(ved.getCrdate()) : "", font_bold));
            cell = new PdfPCell(phrase);
            cell.setVerticalAlignment(Element.ALIGN_MIDDLE);
            cell.setBorderWidthLeft(0);
            table1.addCell(cell);

            document.add(table1);

            PdfPTable table2 = new PdfPTable(12);
            table2.setWidthPercentage(widths2, pageSizeMap.get(pageSize + "L"));
            table2.setHeaderRows(3);
            table2.setWidthPercentage(100);
            table2.getDefaultCell().setBorder(Rectangle.BOX);
            table2.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);

            cell = new PdfPCell(new Phrase("№\nп/п", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("№ вагона и\nнаименование\nвладельца вагона\nNumer wagonu i\nnazwa wlasciciela\nwagonu", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Пломбы\nPlomby", font));
            cell.setColspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Отпрвка №\nList\nprzewozowy", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Дата\nзаключения\nдоговора\nперевозки\nData zawarcia\numowy przewozu", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Станция\nStacja", font));
            cell.setColspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Число мест и\nрод упаковки\n(№ груженого\nконтейнера)\nIlosc sztuk i\nrodzaj opakowania\n(№ konteneru)", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Наименование груза\nNazwa towaru", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Масса\nгруза,\nкг.\nMasa\ntowaru\n", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Приме\nчания\nUwagi", font));
            cell.setRowspan(2);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Кол.\nIlosc", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("Знаки\nZnaki", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("отправления\nnadania", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            cell = new PdfPCell(new Phrase("назначения\nprzeznaczenja", font));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            table2.addCell(cell);

            for (int i = 1; i < 13; i++) {
                cell = new PdfPCell(new Phrase("" + i, font));
                cell.setHorizontalAlignment(Element.ALIGN_CENTER);
                table2.addCell(cell);
            }

            int i = 1;
            for (VedVag vag : entry.getValue()) {
                table2.addCell(new Phrase("" + i++, font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getNvag()) + "\n" + StringUtils.defaultString(vag.getOwner()), font));
                table2.addCell(new Phrase(vag.getKpl() != null ? ""+vag.getKpl() : "", font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getZnak()), font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getNumClaim()), font));
                table2.addCell(new Phrase(vag.getG281() != null ? DateFormat.dateFormaterPrint.format(vag.getG281()) : "", font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getNsto()), font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getNstn()), font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getKont()) + "\n" +
                        StringUtils.defaultString(vag.getKontKind()) + " (" + (vag.getKontGp() != null ? vag.getKontGp() : "") + ") " + (vag.getKontTara() != null ? vag.getKontTara() : ""), font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getGngn()), font));
                table2.addCell(new Phrase(vag.getMbrt() != null ? "" + vag.getMbrt() : "", font));
                table2.addCell(new Phrase(StringUtils.defaultString(vag.getGng()), font));
            }
            document.add(table2);

            PdfPTable table3 = new PdfPTable(4);
            table3.setSpacingBefore(2);
            table3.setWidthPercentage(widths3, pageSizeMap.get(pageSize + "L"));
            table3.setWidthPercentage(100);
            table3.getDefaultCell().setBorder(Rectangle.BOX);
            table3.getDefaultCell().setHorizontalAlignment(Element.ALIGN_CENTER);
            table3.getDefaultCell().setMinimumHeight(60);

            table3.addCell(new Phrase("Оттиск календарного штемпеля\nсдающего перевозчика", font));
            table3.addCell(new Phrase("Подпись сдающего перевозчика", font));
            table3.addCell(new Phrase("Оттиск календарного штемпеля\nпринимающего перевозчика", font));
            table3.addCell(new Phrase("Подпись принимающего перевозчика", font));
            document.add(table3);

            document.newPage();
        }

        document.close();
        return baos;
    }

    public ByteArrayOutputStream generatePdf(List<PrintTemplates> printTemplates, Object smgs, boolean isView) throws DocumentException, InvocationTargetException, IllegalAccessException, IOException, SQLException {
        PrintTemplates printTemplate = printTemplates.iterator().next();
        Document document = new Document(new Rectangle(Utilities.millimetersToPoints(printTemplate.getPaperWidth()), Utilities.millimetersToPoints(printTemplate.getPaperHeight())), 0f, 0f, 0f, 0f);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPdfVersion(PdfWriter.VERSION_1_5);
        writer.addViewerPreference(PdfName.PRINTSCALING, PdfName.NONE);
        writer.addViewerPreference(PdfName.PICKTRAYBYPDFSIZE, PdfBoolean.PDFTRUE);

        document.open();
        PdfContentByte content = writer.getDirectContent();

        int templatesCount = 0;

        if(!isView) {
            for (PrintTemplates prnTempl : printTemplates) {
                if (templatesCount > 0) {
                    document.newPage();
                }

                List<PrintData> list = new ArrayList<>(prnTempl.getPrintDatas().values());
                Collections.sort(list, new Comparator<PrintData>() {
                    @Override
                    public int compare(PrintData o1, PrintData o2) {
                        return new CompareToBuilder()
                                .append(o1.getPage(), o2.getPage())
                                .toComparison();
                    }
                });


                if (!needBlank() || templatesCount > 0) { // no blank
                    for (PrintData printData : list) {
                        if (printThisPage(printData.getPage()) && printData.printThisColumn()) {
                            if (needNewPage(printData.getPage())) {
                                document.newPage();
                            }
                            drawText(printData, content, smgs);
                        }
                    }
                } else {   // print with blank      Only 1st template can have blanks
                    List<PrintBlank> blanks = new ArrayList<>(prnTempl.getPrintBlankTemplRefs().size());
                    for (PrintBlankTemplRef refs : prnTempl.getPrintBlankTemplRefs()) {
                        if(!refs.getPrintBlank().isPreview()) {
                            blanks.add(refs.getPrintBlank());
                        }
                    }
                    Collections.sort(blanks, new Comparator<PrintBlank>() {
                        @Override
                        public int compare(PrintBlank o1, PrintBlank o2) {
                            int result;
                            if (o1.getPage() == o2.getPage()) {
                                result = new CompareToBuilder()
                                        .append(o1.getNcopy(), o2.getNcopy())
                                        .toComparison();
                                return result;
                            } else if (o1.getPage() < o2.getPage() && o1.getPage() - o2.getPage() == -1) {
                                if (o1.getNcopy() <= o2.getNcopy()) {
                                    result = -1;
                                } else {
                                    result = 1;
                                }
                                return result;
                            } else if (o1.getPage() > o2.getPage() && o1.getPage() - o2.getPage() == 1) {
                                if (o1.getNcopy() < o2.getNcopy()) {
                                    result = -1;
                                } else {
                                    result = 1;
                                }
                                return result;
                            } else {
                                result = new CompareToBuilder()
                                        .append(o1.getPage(), o2.getPage())
                                        .toComparison();
                                return result;
                            }
                        }
                    });
                    for (PrintBlank blank : blanks) {
                        document.newPage();
                        if ("application/pdf".equals(blank.getContentType())) {
                            importFromPdf(writer, content, blank);
                        }
                        else {
                        document.add(createBlank1(prnTempl, blank));
                        }
                        for (PrintData printData : list) {
                            if (printThisPage1(blank.getPage(), printData.getPage()) && printData.printThisColumn()) {
                                drawText(printData, content, smgs);
                            }
                        }
                        /*if (isView) {
                            break;
                        }*/
                    }
                }

                /*if (isView) {   // print only 1st page
                    break;
                }*/
                templatesCount++;
            }
        } else {
            PrintTemplates prnTempl = printTemplates.iterator().next();
            if(prnTempl != null){
                List<PrintData> list = new ArrayList<>(prnTempl.getPrintDatas().values());
                PrintBlank blank = null;
                for (PrintBlankTemplRef refs : prnTempl.getPrintBlankTemplRefs()) {
                    if(refs.getPrintBlank().isPreview()) {
                        blank = refs.getPrintBlank();
                        break;
                    }
                }

                if(blank != null){
                    if ("application/pdf".equals(blank.getContentType())) {
                        importFromPdf(writer, content, blank);
                    }
                    else {
                    document.add(createBlank1(prnTempl, blank));
                    }
                    for (PrintData printData : list) {
                        if (printThisPage1(blank.getPage(), printData.getPage()) && printData.printThisColumn()) {
                            drawText(printData, content, smgs);
                        }
                    }
                } else {
                    for (PrintData printData : list) {
                        if (printThisPage(printData.getPage()) && printData.printThisColumn()) {
                            drawText(printData, content, smgs);
                        }
                    }
                }
            }
        }

        document.close();
        return baos;
    }

    private void importFromPdf(PdfWriter writer, PdfContentByte content, PrintBlank blank) throws IOException, SQLException {
        PdfReader reader = new PdfReader(blank.getData().getBytes(1, (int) blank.getData().length()));
        PdfImportedPage page = writer.getImportedPage(reader, 1);
        content.addTemplate(page, 0f, 0f);
    }

    private boolean printThisPage1(Byte blankPage, Byte dataPage) {
        return blankPage.equals(dataPage) && (pages == null || pages.contains((int) dataPage));
    }

    private Element createBlank1(PrintTemplates prnTempl, PrintBlank blank) throws SQLException, IOException, BadElementException {
        Image img = Image.getInstance(blank.getData().getBytes(1, (int) blank.getData().length()));
        img.scaleToFit(Utilities.millimetersToPoints(prnTempl.getPaperWidth()), Utilities.millimetersToPoints(prnTempl.getPaperHeight()));
        return img;
    }

    private boolean hasBlank(PrintTemplates prnTempl, Byte page) {
        for(PrintBlankTemplRef refs: prnTempl.getPrintBlankTemplRefs()){
            PrintBlank blank = refs.getPrintBlank();
            if(blank.getPage() == page){
                return true;
            }
        }
        return false;
    }

    private Image createBlank(PrintTemplates prnTempl, Byte page) throws SQLException, IOException, BadElementException {
        Image img = null;
        for(PrintBlankTemplRef refs: prnTempl.getPrintBlankTemplRefs()){
            PrintBlank blank = refs.getPrintBlank();
            if(blank.getPage() == page){
                img = Image.getInstance(blank.getData().getBytes(1, (int) blank.getData().length()));
                img.scaleToFit(Utilities.millimetersToPoints(prnTempl.getPaperWidth()), Utilities.millimetersToPoints(prnTempl.getPaperHeight()));
                break;
            }
        }
        return img;
    }

    private boolean needBlank() {
        return useBlanks;
    }

    private byte curPage = 0;

    public boolean needNewPage(Byte page) {
        if (page == curPage) {
            return false;
        } else {
            curPage = page;
            return true;
        }
    }

    public boolean printThisPage(Byte page) {
        if (pages == null || pages.contains(page)) {
            return true;
        } else
            return false;
    }

    private void drawText(PrintData printData, PdfContentByte content, Object doc) throws DocumentException, InvocationTargetException, IllegalAccessException {
        if(printData.getPrintDataTables().values().size() == 0) { // no table
            drawTextInRectangle(printData, content, doc);
        } else { // table
            drawTextInTable(printData, content, doc);
        }
    }

    private void drawTextInRectangle(PrintData printData, PdfContentByte content, Object doc) throws IllegalAccessException, InvocationTargetException, DocumentException {
        if(printData.getPrintDataPhrases().size() == 0){
            drawOnePhrase(printData, content, doc);
        } else {
            drawManyPhrases(printData, content, doc);
        }
    }

    private void drawManyPhrases(PrintData printData, PdfContentByte content, Object doc) throws IllegalAccessException, InvocationTargetException, DocumentException {
        Rectangle rectangle = drawRectangle(printData, content);
        ColumnText column = new ColumnText(content);
        column.setAlignment(Element.ALIGN_LEFT);
        column.setLeading(printData.getLeading() != null ? printData.getLeading() : printData.getPrintTemplates().getLeading());

        for (PrintDataPhrase printDataPhrase: printData.getPrintDataPhrases().values()){
            String text = getText(doc, printDataPhrase.getName());
            if (StringUtils.isNotEmpty(text)) {
                text = text.replace("||", "");
                Phrase phrase = getPhrase(printDataPhrase, text);
//                column.addText( Chunk.NEWLINE );
                column.addText(phrase);
                column.addText( Chunk.NEWLINE );
                column.addText( Chunk.NEWLINE );
            }
        }

        column.setSimpleColumn(rectangle);
        column.go();
    }

    private void drawOnePhrase(PrintData printData, PdfContentByte content, Object doc) throws IllegalAccessException, InvocationTargetException, DocumentException {
        String text = getText(doc, printData.getName());
        if (StringUtils.isNotBlank(text) ) {
            text = text.replace("||", "");
            Rectangle rectangle = drawRectangle(printData, content);

            Phrase phrase = getPhrase(printData, text);
            if (printData.getRotate() == null){
                ColumnText column = new ColumnText(content);
                column.setAlignment(Element.ALIGN_LEFT);

                column.setLeading(printData.getLeading() != null ? printData.getLeading() : printData.getPrintTemplates().getLeading());
                column.addText(phrase);
                column.setSimpleColumn(rectangle);
                column.go();
            } else {  // �������
                ColumnText.showTextAligned(content, Element.ALIGN_CENTER, phrase, Utilities.millimetersToPoints(printData.getLlx()), Utilities.millimetersToPoints(printData.getLly()), printData.getRotate());
            }
        }
    }

    private Rectangle drawRectangle(PrintData printData, PdfContentByte content) {
        Rectangle rectangle = new Rectangle(
                Utilities.millimetersToPoints(printData.getLlx()),
                Utilities.millimetersToPoints(printData.getLly()),
                Utilities.millimetersToPoints(printData.getUrx()),
                Utilities.millimetersToPoints(printData.getUry())
        );

        if(printData.isBorder()){
            rectangle.setBorder(Rectangle.BOX);
            rectangle.setBorderWidth(1);
            rectangle.setBorderColor(BaseColor.BLACK);
        }
        content.rectangle(rectangle);
        return rectangle;
    }

    private void drawTextInTable(PrintData printData, PdfContentByte content, Object doc) throws DocumentException, IllegalAccessException, InvocationTargetException {
        byte leading = printData.getLeading() != null ? printData.getLeading() : printData.getPrintTemplates().getLeading();
        Collection<PrintDataTable> printDataTables =  printData.getPrintDataTables().values();
//            ColumnText column = new ColumnText(content);
        PdfPTable table = new PdfPTable(printDataTables.size()); // column count

        float[] widths = new float[printDataTables.size()];  // column width
        int i = 0;
        for(PrintDataTable printDataTable: printDataTables){
            widths[i++] = Utilities.millimetersToPoints(printDataTable.getWidth());
        }
        table.setTotalWidth(widths);
        table.setLockedWidth(true);
        String text = getText(doc, printData.getName());
        StringTokenizer tokenizer = new StringTokenizer(text, "||");
        while (tokenizer.hasMoreTokens()){
            Phrase phrase = getPhrase(printData, tokenizer.nextToken());
            table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_LEFT);
            table.getDefaultCell().setBorder(PdfPCell.NO_BORDER);
            table.getDefaultCell().setLeading(leading, 0);
            table.addCell(phrase);
        }

        ColumnText column = new ColumnText(content);
        column.setAlignment(Element.ALIGN_LEFT);

        column.setLeading(leading);
        column.setSimpleColumn(Utilities.millimetersToPoints(printData.getLlx()), Utilities.millimetersToPoints(printData.getLly()), Utilities.millimetersToPoints(printData.getUrx()), Utilities.millimetersToPoints(printData.getUry()));
        column.addElement(table);
        column.go();
    }

    /**
     * invokes doc (smgs) object method by its name to build print string
     * @param doc smgs
     * @param columnName method name
     * @return print string
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     */
    private String getText(Object doc, String columnName) throws IllegalAccessException, InvocationTargetException {
        Object raw;
//        String text = "";
        try {
            raw = MethodUtils.invokeMethod(doc, "build" + WordUtils.capitalize(columnName) + "Print");
            /*if (raw != null) {
                text = !isUppercase ? raw.toString() : raw.toString().toUpperCase();
            }*/
        } catch (NoSuchMethodException e) {
            try {
                raw = MethodUtils.invokeMethod(doc, "get" + WordUtils.capitalize(columnName));
                /*if (raw != null) {
                    text = !isUppercase ? raw.toString() : raw.toString().toUpperCase();
                }*/
            } catch (NoSuchMethodException e1) {
                throw new BusinessException("Can't find method in class for column - " + columnName);
            }
        }
        return raw != null ? raw.toString() : "";
    }

    private Phrase getPhrase(PrintData printData, String text) {
        PrintTemplates parent = printData.getPrintTemplates();
        byte fontSize = printData.getFontSize() != null ? printData.getFontSize() : parent.getFontSize();
        String fontFamily = printData.getFontFamily() != null ? printData.getFontFamily() : parent.getFontFamily();

        Font font = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printData.isBold() ? Font.NORMAL : Font.BOLD));
        Font font_ch = FontFactory.getFont("kaiti_gb2312", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printData.isBold() ? Font.NORMAL : Font.BOLD));

        FontSelector selector = new FontSelector();
        selector.addFont(font);
        selector.addFont(font_ch);
        text = printData.isUppercase() ? text.toUpperCase() : text;
        Phrase phrase = selector.process(StringUtils.isNoneBlank(text) ? text.trim() : "");

//        byte leading = printData.getLeading() != null ? printData.getLeading() : parent.getLeading();
//        phrase.setLeading(leading);

        if(printData.isUnderline()) {
            underline(phrase);
        }

        return phrase;
    }



    private Phrase getPhrase(PrintDataPhrase printDataPhrase, String text) {
        PrintData printData = printDataPhrase.getPrintData();
        PrintTemplates parent = printData.getPrintTemplates();
        byte fontSize = printDataPhrase.getFontSize() != null ? printDataPhrase.getFontSize() : printData.getFontSize() != null ? printData.getFontSize() : parent.getFontSize();
        String fontFamily = printDataPhrase.getFontFamily() != null ? printDataPhrase.getFontFamily() : printData.getFontFamily() != null ? printData.getFontFamily() : parent.getFontFamily();

        Font font = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printDataPhrase.getBold() && !printData.isBold() ? Font.NORMAL : Font.BOLD));
        Font font_ch = FontFactory.getFont("kaiti_gb2312", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printDataPhrase.getBold() && !printData.isBold() ? Font.NORMAL : Font.BOLD));

        FontSelector selector = new FontSelector();
        selector.addFont(font);
        selector.addFont(font_ch);
        text = printDataPhrase.getUppercase() || printData.isUppercase() ? text.toUpperCase() : text;
        Phrase phrase = selector.process(StringUtils.isNoneBlank(text) ? text.trim() : "");

//        byte leading = printDataPhrase.getLeading() != null ? printDataPhrase.getLeading() : printData.getLeading() != null ? printData.getLeading() : parent.getLeading();
//        phrase.setLeading(leading);

        if(printDataPhrase.getUnderline() || printData.isUnderline()) {
            underline(phrase);
        }

        return phrase;
    }

    private void underline(Phrase phrase) {
        List<Chunk> chunks = phrase.getChunks();
        for (Chunk chunk : chunks) {
            chunk.setUnderline(0.1f, -2f);
        }
    }

}
