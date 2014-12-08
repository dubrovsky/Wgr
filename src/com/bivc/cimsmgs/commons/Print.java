package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.db.PrintBlank;
import com.bivc.cimsmgs.db.PrintBlankTemplRef;
import com.bivc.cimsmgs.db.PrintData;
import com.bivc.cimsmgs.db.PrintTemplates;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang3.builder.CompareToBuilder;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.commons.lang3.text.WordUtils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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

    public ByteArrayOutputStream generatePdf(PrintTemplates prnTempl, Object smgs) throws DocumentException, InvocationTargetException, IllegalAccessException, IOException, SQLException {
        Document document = new Document(new Rectangle(Utilities.millimetersToPoints(prnTempl.getPaperWidth()), Utilities.millimetersToPoints(prnTempl.getPaperHeight())), 0f, 0f, 0f, 0f);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = PdfWriter.getInstance(document, baos);
        writer.setPdfVersion(PdfWriter.VERSION_1_5);
        writer.addViewerPreference(PdfName.PRINTSCALING, PdfName.NONE);
        writer.addViewerPreference(PdfName.PICKTRAYBYPDFSIZE, PdfBoolean.PDFTRUE);

        document.open();
        PdfContentByte content = writer.getDirectContent();

        List<PrintData> list = new ArrayList<PrintData>(prnTempl.getPrintDatas().values());
        Collections.sort(list, new Comparator<PrintData>() {
            @Override
            public int compare(PrintData o1, PrintData o2) {
                return new CompareToBuilder()
                        .append(o1.getPage(), o2.getPage())
                        .toComparison();
            }
        });


        if(!needBlank()){ // no blank
            for (PrintData printData : list) {
                if (printThisPage(printData.getPage()) && printData.printThisColumn()) {
                    if (needNewPage(printData.getPage())) {
                        document.newPage();
                    }
                    drawDocColumn(printData, content, smgs);
                }
            }
        } else {   // print with blank
            List<PrintBlank> blanks = new ArrayList<PrintBlank>(prnTempl.getPrintBlankTemplRefs().size());
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
                        drawDocColumn(printData, content, smgs);
                    }
                }
            }
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

    /*private void removeNotSelectedPages(List<PrintBlank> blanks) {
        for(PrintBlank blank: blanks){
            if(!pages.contains(blank.getPage())){
                blanks.remove(blank);
            }
        }
    }*/

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

    private void drawDocColumn(PrintData printData, PdfContentByte content, Object doc) throws DocumentException, InvocationTargetException, IllegalAccessException {
        String string = "";
        Object raw;
        try {
            raw = MethodUtils.invokeMethod(doc, "build" + WordUtils.capitalize(printData.getName()) + "Print");
            if (raw != null) {
                string = !printData.isUppercase() ? raw.toString() : raw.toString().toUpperCase();
            }
        } catch (NoSuchMethodException e) {
            try {
                raw = MethodUtils.invokeMethod(doc, "get" + WordUtils.capitalize(printData.getName()));
                if (raw != null) {
                    string = !printData.isUppercase() ? raw.toString() : raw.toString().toUpperCase();
                }
            } catch (NoSuchMethodException e1) {
                throw new BusinessException("Can't find method in class for column - " + printData.getName());
            }
        }

        if (StringUtils.isNotBlank(string)) {
            PrintTemplates parent = printData.getPrintTemplates();
            ColumnText column = new ColumnText(content);
            byte fontSize = printData.getFontSize() != null ? printData.getFontSize() : parent.getFontSize();
            String fontFamily = printData.getFontFamily() != null ? printData.getFontFamily() : parent.getFontFamily();

            Font font = FontFactory.getFont(fontFamily, BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printData.isBold() ? Font.NORMAL : Font.BOLD));
            Font font_ch = FontFactory.getFont("kaiti_gb2312", BaseFont.IDENTITY_H, BaseFont.EMBEDDED, fontSize, (!printData.isBold() ? Font.NORMAL : Font.BOLD));

            FontSelector selector = new FontSelector();
            selector.addFont(font);
            selector.addFont(font_ch);
            Phrase phrase = selector.process(string);

            byte leading = printData.getLeading() != null ? printData.getLeading() : parent.getLeading();
            column.setSimpleColumn(phrase, Utilities.millimetersToPoints(printData.getLlx()), Utilities.millimetersToPoints(printData.getLly()), Utilities.millimetersToPoints(printData.getUrx()), Utilities.millimetersToPoints(printData.getUry()), leading, Element.ALIGN_LEFT);
            column.go();
        }
    }
}
