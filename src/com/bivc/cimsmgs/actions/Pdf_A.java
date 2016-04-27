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
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class Pdf_A extends CimSmgsSupport_A implements ServletResponseAware, SmgsDAOAware, PrintTemplatesDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Pdf_A.class);

    public String execute() throws DocumentException, IOException, InvocationTargetException, NoSuchMethodException, IllegalAccessException, SQLException {
//        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        log.info("Print");

        // check in route and user
        List<PrintTemplates> printTemplatesList = new ArrayList<>();
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
                prnTempl = checkDefaultTemplate();
            }
        }
        printTemplatesList.add(prnTempl);

        smgs = smgsDao.findById2(smgs);
        if(smgs.hasDopList()){     // todo - group doplist by docs type: smgs, cimsmgs ...
            doc = new DocDir(new BigDecimal(11));
            printTemplatesList.add(checkDefaultTemplate());
        }

        ByteArrayOutputStream baos = (print == null ? new Print().generatePdf(printTemplatesList, smgs) : print.generatePdf(printTemplatesList, smgs));

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

        return null;
    }

    private PrintTemplates checkDefaultTemplate() {
        prnTempls = prnTemplDao.findDefaultPrnTempls(doc);
        if(prnTempls.size() > 0){
            return prnTempls.get(0);
        } else {
            throw new BusinessException("Miss template for printing");
        }
    }

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
