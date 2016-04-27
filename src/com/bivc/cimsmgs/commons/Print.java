package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.commons.lang3.text.WordUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
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

    public ByteArrayOutputStream generatePdf(List<PrintTemplates> printTemplates, Object smgs) throws DocumentException, InvocationTargetException, IllegalAccessException, IOException, SQLException {
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
        for(PrintTemplates prnTempl: printTemplates){
            if(templatesCount > 0){
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


            if(!needBlank() || templatesCount > 0){ // no blank
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
                for(PrintBlankTemplRef refs: prnTempl.getPrintBlankTemplRefs()){
                    blanks.add(refs.getPrintBlank());
                }
                Collections.sort(blanks, new Comparator<PrintBlank>() {
                    @Override
                    public int compare(PrintBlank o1, PrintBlank o2) {
                        int result;
                        if(o1.getPage() == o2.getPage()){
                            result = new CompareToBuilder()
                                    .append(o1.getNcopy(), o2.getNcopy())
                                    .toComparison();
                            return result;
                        } else if(o1.getPage() < o2.getPage() && o1.getPage() - o2.getPage() == -1){
                            if(o1.getNcopy() <= o2.getNcopy()){
                                result = -1;
                            } else {
                                result = 1;
                            }
                            return result;
                        } else if(o1.getPage() > o2.getPage() && o1.getPage() - o2.getPage() == 1){
                            if(o1.getNcopy() < o2.getNcopy()){
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
                for(PrintBlank blank: blanks){
                    document.newPage();
                    document.add(createBlank1(prnTempl, blank));
                    for (PrintData printData : list) {
                        if (printThisPage1(blank.getPage(), printData.getPage()) && printData.printThisColumn()) {
                            drawText(printData, content, smgs);
                        }
                    }
                }
            }
            templatesCount++;
        }

        document.close();
        return baos;
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
