package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Print;
import com.bivc.cimsmgs.dao.PrintTemplatesDAO;
import com.bivc.cimsmgs.dao.PrintTemplatesDAOAware;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.itextpdf.text.DocumentException;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.lang.reflect.InvocationTargetException;
import java.sql.SQLException;
import java.util.ArrayList;

public class Pdf_A extends CimSmgsSupport_A implements ServletResponseAware, SmgsDAOAware, PrintTemplatesDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Pdf_A.class);

    public String execute() throws DocumentException, IOException, InvocationTargetException, NoSuchMethodException, IllegalAccessException, SQLException {
//        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        log.info("Print");

        // check in route and unser
        ArrayList<RouteUnPrintTemplates> routeUnPrnTempls = prnTemplDao.findPrnTempls4UnRoute(doc, route, getUser().getUsername());
        if(routeUnPrnTempls.size() > 0){
            prnTempl = routeUnPrnTempls.get(0).getPrintTemplates();
        }
        else { // check in route
            ArrayList<RoutePrintTemplates> routePrnTempls = prnTemplDao.findPrnTempls4Route(doc, route);
            if(routePrnTempls.size() > 0){
                prnTempl = routePrnTempls.get(0).getPrintTemplates();
            }
            else{  // check default
                prnTempls = prnTemplDao.findDefaultPrnTempls(doc);
                if(prnTempls.size() > 0){
                    prnTempl = prnTempls.get(0);
                } else {
                    throw new BusinessException("Miss template for printing");
                }
            }
        }

        smgs = smgsDao.findById2(smgs);
        ByteArrayOutputStream baos = (print == null ? new Print().generatePdf(prnTempl, smgs) : print.generatePdf(prnTempl, smgs));

        /*Document document = new Document(new Rectangle(Utilities.millimetersToPoints(prnTempl.getPaperWidth()), Utilities.millimetersToPoints(prnTempl.getPaperHeight())), 0f, 0f, 0f, 0f);
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
                        .append(o1.getPage(), o1.getPage())
                        .toComparison();
            }
        });*/


        /*Image img = null;
        if(prnTempl.getPrintBlankTemplRefs().size() > 0){
            PrintBlank blank = prnTempl.getPrintBlankTemplRefs().iterator().next().getPrintBlank();
            try {
                img = Image.getInstance(blank.getData().getBytes(1, (int) blank.getData().length()));
                img.scaleToFit(Utilities.millimetersToPoints(prnTempl.getPaperWidth()), Utilities.millimetersToPoints(prnTempl.getPaperHeight()));
//                document.add(img);
//                document.add(img);
            } catch (SQLException e) {
                e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
            }
        }
*/
        /*for(PrintData printData : list){
            if(printData.printThisData() && prnTempl.printThisPage(printData, print)){
                if(prnTempl.needNewPage(printData, print)){
                    document.newPage();
                }
                drawDocColumn(printData, content, smgs);
            }
        }

        document.close();*/

        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setContentType("application/pdf");
        response.setContentLength(baos.size());
        response.setHeader("Content-Disposition", " inline; filename=\"document.pdf\"");
        OutputStream os = response.getOutputStream();
        baos.writeTo(os);
        os.flush();
        os.close();
        /*byte[] bytes = null;
        bytes = buffer.toByteArray();

        if (bytes != null) {
            inputStream = new ByteArrayInputStream(bytes);
            contentLength = bytes.length;
            fileName = "document.pdf";
        }*/
        return null;
    }

   /* private void drawDocColumn(PrintData printData, PdfContentByte content, Object doc) throws DocumentException, InvocationTargetException, IllegalAccessException {
        String string = "";
        Object raw;
        try {
            raw = MethodUtils.invokeMethod(doc, "build" + WordUtils.capitalize(printData.getName()) + "Print");
            if(raw != null){
                string = !printData.isUppercase() ? raw.toString() : raw.toString().toUpperCase();
            }
        } catch (NoSuchMethodException e) {
            try {
                raw = MethodUtils.invokeMethod(doc, "get" + WordUtils.capitalize(printData.getName()));
                if(raw != null){
                    string = !printData.isUppercase() ? raw.toString() : raw.toString().toUpperCase();
                }
            } catch (NoSuchMethodException e1) {
                throw new BusinessException("Can't find method in class for column - " + printData.getName());
            }
        }

        if(StringUtils.isNotBlank(string)){
//                string = StringEscapeUtils.escapeEcmaScript(string);
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
//            float ury = Utilities.millimetersToPoints(printData.getUry()) - (font.getBaseFont().getFontDescriptor(BaseFont.ASCENT, fontSize) - font.getBaseFont().getFontDescriptor(BaseFont.DESCENT, fontSize));
            column.setSimpleColumn(phrase, Utilities.millimetersToPoints(printData.getLlx()), Utilities.millimetersToPoints(printData.getLly()), Utilities.millimetersToPoints(printData.getUrx()), Utilities.millimetersToPoints(printData.getUry()), leading, Element.ALIGN_LEFT);
            column.go();

//                PdfPTable table = new PdfPTable(new float[] { 2, 1, 2, 5, 1 });
//                table.setWidthPercentage(100f);

            *//*PdfPTable table = new PdfPTable(3);
            table.setTotalWidth(new float[]{ 300, 120, 72 });
//                table.setLockedWidth(true);

            PdfPCell cell;
            table.getDefaultCell().setHorizontalAlignment(Element.ALIGN_JUSTIFIED);
            for (int i = 0; i < 2; i++) {
                cell = new PdfPCell();
                phrase = selector.process("你好你好你好 你好你好你好 你好你好你好");
                phrase.setLeading(leading);
                cell.addElement(phrase);
                cell.setBorder(PdfPCell.NO_BORDER);

                table.addCell(cell);
                table.addCell(selector.process("Time"));
                table.addCell(selector.process("Run Length"));
//                    table.addCell(selector.process("Title"));
//                    table.addCell(selector.process("Year"));
            }

            column.setLeading(leading);
            column.setAlignment(Element.ALIGN_JUSTIFIED);
            column.addElement(table);
            column.setSimpleColumn(50, 500, 400, 601);
            column.go();*//*
        }
    }
*/
    private HttpServletResponse response;
    private CimSmgs smgs;
    private PrintTemplatesDAO prnTemplDao;
    private SmgsDAO smgsDao;
    private PrintTemplates prnTempl;
    private ArrayList<PrintTemplates> prnTempls;
    private Route route;
    private DocDir doc;
    private Print print;
//    private Font font;

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        response = httpServletResponse;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    @Override
    public void setSmgsDAO(SmgsDAO dao) {
        smgsDao = dao;
    }

    public PrintTemplates getPrnTempl() {
        return prnTempl;
    }

    public void setPrnTempl(PrintTemplates prnTempl) {
        this.prnTempl = prnTempl;
    }

    @Override
    public void setPrintTemplatesDAO(PrintTemplatesDAO dao) {
        prnTemplDao = dao;
    }

    public void setPrnTempls(ArrayList<PrintTemplates> prnTempls) {
        this.prnTempls = prnTempls;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public DocDir getDoc() {
        return doc;
    }

    public void setDoc(DocDir doc) {
        this.doc = doc;
    }


    public Print getPrint() {
        return print;
    }

    public void setPrint(Print print) {
        this.print = print;
    }
}
