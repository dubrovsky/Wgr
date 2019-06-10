package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Print;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import com.itextpdf.text.DocumentException;
import org.apache.commons.lang3.StringUtils;
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
import java.util.HashMap;
import java.util.List;

public class Pdf_A extends CimSmgsSupport_A implements ServletResponseAware, SmgsDAOAware, VedDAOAware, PrintTemplatesDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Pdf_A.class);

    public String execute() throws DocumentException, IOException, InvocationTargetException, NoSuchMethodException, IllegalAccessException, SQLException {
//        ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        ByteArrayOutputStream baos = null;

        log.info("Print");

        if (smgs != null) {
            // check in route and user
            List<PrintTemplates> printTemplatesList = new ArrayList<>();
            printTemplatesList.add(findMainPrintTemplate());

            smgs = smgsDao.findById2(smgs);
            if (smgs.hasDopList()) {     // todo - group doplist by docs type: smgs, cimsmgs ...
                doc = new DocDir(new BigDecimal(11));
                printTemplatesList.add(checkDefaultTemplate());
            }

            baos = (print == null ? new Print().generatePdf(printTemplatesList, smgs, isView) : print.generatePdf(printTemplatesList, smgs, isView));
        }
        else if (ved != null) {
            ved = vedDao.findById2(ved);
            if ("vag".equals(doc.getName()))
                baos = new Print().generateVagPdf(ved, getPageSize());
            else if ("per".equals(doc.getName())) {
                HashMap<String, List<VedVag>> map = new HashMap<>();
                for (VedVag vag : ved.getVags()) {
                    if(StringUtils.isNotBlank(vag.getPerVed())) {
                        if (map.containsKey(vag.getPerVed().trim())) {
                            map.get(vag.getPerVed().trim()).add(vag);    
                        }
                        else {
                            List<VedVag> lst = new ArrayList<>();
                            lst.add(vag);
                            map.put(vag.getPerVed().trim(), lst);
                        }
                    }
                }
                baos = new Print().generatePerPdf(ved, map, getPageSize());
            }
        }

        response.setHeader("Expires", "0");
        response.setHeader("Cache-Control", "must-revalidate, post-check=0, pre-check=0");
        response.setHeader("Pragma", "public");
        response.setContentType("application/pdf");
        response.setContentLength(baos.size());
        response.setHeader("Content-Disposition", " inline; filename=\"document.pdf\"");
        OutputStream os = response.getOutputStream();
            baos.writeTo(os);
            os.flush();
//            os.close();

        return null;
    }

    private PrintTemplates findMainPrintTemplate() {
        if(templHid == null) {
            ArrayList<RouteUnPrintTemplates> routeUnPrnTempls = prnTemplDao.findPrnTempls4UnRoute(doc, route, getUser().getUsername());
            if (routeUnPrnTempls.size() > 0) {
                prnTempl = routeUnPrnTempls.get(0).getPrintTemplates();
            } else { // check in route
                ArrayList<RoutePrintTemplates> routePrnTempls = prnTemplDao.findPrnTempls4Route(doc, route);
                if (routePrnTempls.size() > 0) {
                    prnTempl = routePrnTempls.get(0).getPrintTemplates();
                } else {  // check default
                    prnTempl = checkDefaultTemplate();
                }
            }
        } else {
            prnTempl = prnTemplDao.findById(templHid, false);
        }

        if(prnTempl == null){
            throw new BusinessException("Miss template for printing");
        }
        return prnTempl;
    }

    private PrintTemplates checkDefaultTemplate() {
        prnTempls = prnTemplDao.findDefaultPrnTempls(doc);
        if(prnTempls.size() > 0){
            return prnTempls.get(0);
        } else {
            return null;
        }
    }

    private HttpServletResponse response;
    private CimSmgs smgs;
    private Ved ved;
    private PrintTemplatesDAO prnTemplDao;
    private SmgsDAO smgsDao;
    private VedDAO vedDao;
    private PrintTemplates prnTempl;
    private ArrayList<PrintTemplates> prnTempls;
    private Route route;
    private DocDir doc;
    private Print print;
    private boolean isView;
    private Long templHid;
    private String pageSize;

//    private Font font;

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        response = httpServletResponse;
    }

    public String getPageSize() {
        return pageSize;
    }

    public void setPageSize(String pageSize) {
        this.pageSize = pageSize;
    }

    public Ved getVed() {
        return ved;
    }

    public void setVed(Ved ved) {
        this.ved = ved;
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

    public boolean isView() {
        return isView;
    }

    public void setIsView(boolean view) {
        isView = view;
    }

    public Long getTemplHid() {
        return templHid;
    }

    public void setTemplHid(Long templHid) {
        this.templHid = templHid;
    }

    @Override
    public void setVedDAO(VedDAO dao) {
        this.vedDao = dao;
    }

}
