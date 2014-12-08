package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.bivc.cimsmgs.commons.Constants.delHids;

public class PrintTemplates_A extends CimSmgsSupport_A implements PrintTemplatesDAOAware, RoutePrintTemplatesDAOAware, PrintBlankDAOAware, PrintBlankTemplRefDAOAware, RouteUnPrintTemplatesDAOAware, ServletRequestAware {
    final static private Logger log = LoggerFactory.getLogger(PrintTemplates_A.class);

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<PrintTemplates> prnTempls = getPrintTemplatesDao().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getPrintTemplatesDao().countAll(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_PrintTemplatesList(prnTempls, total));

        return SUCCESS;
    }

    public String templs_view() throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        log.info("templs_view");
        List<PrintTemplates> prnTempls = getPrintTemplatesDao().findAllNotDeafault(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getPrintTemplatesDao().countAllNotDeafault(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_PrintTemplatesList1(prnTempls, total, getSearch(), getUser().getUsername()));
        return SUCCESS;
    }

    public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("save");
        if ("copy".equals(getTask())){
            delHids(prnTempl);
//            prnTempl.setDefaults(false);
        } /*else {
            if (!prnTempl.isDefaults()) {        // add routers to print templates
                List<RoutePrintTemplates> routes = routePrintTemplatesDAO.findByPrintTemplId(prnTempl.getHid());
                prnTempl.setRoutePrintTemplateses(new HashSet<RoutePrintTemplates>(routes));
            }
            // add blanks

        }*/
        prnTempl.preparePrintData4Save();
        dao.merge(prnTempl);

        setJSONData(Constants.convert2JSON_PrintTemlate_Save_Results(prnTempl));
        return SUCCESS;
    }

    /*public String bindRoutes() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("Bind Routes");
        prnTempl = dao.findById1(prnTempl.getHid());
        prnTempl.bindRoutes(routes);
//        HibernateUtil.getSession().clear();
        dao.merge(prnTempl);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }*/

    public String view1() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException {
        log.info("view1");
        // check if tempale can be default
        if("copy".equals(getTask()) || "edit".equals(getTask())){
            prnTempl = dao.findById2(prnTempl);
            if("copy".equals(getTask())){
                prnTempl.setDefaultable(dao.findDefaultDocTemplate(null, prnTempl.getDocDir()) == 0 ? true : false);
            }
            else if("edit".equals(getTask())){
                prnTempl.setDefaultable(dao.findDefaultDocTemplate(prnTempl.getHid(), prnTempl.getDocDir()) == 0 ? true : false);
            }
        }
        /*else if("edit".equals(getTask()) && !prnTempl.isDefaults()){
            prnTempl = dao.findById2(prnTempl);
            prnTempl.setDefaultable(dao.findDefaultDocTemplate(prnTempl.getHid(), prnTempl.getDocDir()) == 0 ? true : false);
        }*/ else if("create".equals(getTask())){
            prnTempl.setDefaultable(dao.findDefaultDocTemplate(null, prnTempl.getDocDir()) == 0 ? true : false);
        }
        /*if ("copy".equals(getTask())) {
            HibernateBeanReplicator r = new Hibernate3BeanReplicator(null, null,
                    new PropertyFilter() {
                        public boolean propagate(String propertyName, Method readerMethod) {
                            return
                                    !"routePrintTemplateses".equals(propertyName) &&
                                    !"docDir".equals(propertyName) *//*&&
                                    !"cimSmgs".equals(propertyName) &&
                                    !"cimSmgses".equals(propertyName) &&
                                    !"csComnt".equals(propertyName) &&
                                    !"BIftminLogs".equals(propertyName) &&
                                    !"statuses".equals(propertyName)*//*;
                        }
                    }
            );

            PrintTemplates copy = r.copy(prnTempl);
            delHids(copy);
//            smgsCopy.setHid((long)0);
//            setJSONData(JsonUtils.doJson(smgsCopy).replace("\"hid\":0","\"hid\":\"\""));
            setJSONData(JsonUtils.doJson(copy));
        } else {*/
            setJSONData(prnTempl != null ? "{prnTempl:" + JsonUtils.doJson(prnTempl) + "}" : "");
//        }
        return SUCCESS;
    }

    public String delete() {
        log.info("delete");

        PrintTemplates origin = dao.findById(prnTempl.getHid(), false);
        dao.makeTransient(origin);

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String deleteBlank() {
        log.info("deleteBlank");

        PrintBlank blank = daoBlank.findById(getHid(), false);
        daoBlank.makeTransient(blank);

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String updateBlank() {
        log.info("updateBlank");

        daoBlank.updateBlank(blank);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String saveBlank() throws IOException, SQLException  {
        log.info("saveBlank");
        List<String> allowedTypes = Arrays.asList("image/png","image/gif","image/jpeg","image/tiff");
        if(!allowedTypes.contains(contentType)){
            throw new BusinessException("Можно загружать следующие типы файлов: png, gif, jpeg, tiff");
        }

        blank.prepare4save(getUser(), this);
        daoBlank.saveBlank(blank, upload);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String viewBlanks(){
        log.info("viewBlanks");
        List<PrintBlank> blanks = daoBlank.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_PrintBlanks(blanks));
        return SUCCESS;
    }

    public String bindRoutes() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("bindRoutes");
        routePrintTemplatesDAO.deleteRefs(getHid());
        if(routes != null){
            for(Route route : routes){
                routePrintTemplatesDAO.makePersistent(new RoutePrintTemplates(new RoutePrintTemplatesId(getHid(), route.getHid())));
            }
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String bindUnRoutes() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("bindRoutes");
        routeUnPrintTemplatesDAO.deleteRefs(getSearch().getDocId(), getSearch().getRouteId(), getUser().getUsername()); // unbind
        if(getHid() != null){   // bind, if any
            routeUnPrintTemplatesDAO.makePersistent(new RouteUnPrintTemplates(new RouteUnPrintTemplatesId(getHid(), getSearch().getRouteId(), getUser().getUsername())));
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String bindBlanks(){
        log.info("bindBlanks");

        daoPrintBlankTempl.deleteRefs(getHid());
        if(blanks != null){
            for(PrintBlank blank : blanks){
                daoPrintBlankTempl.makePersistent(new PrintBlankTemplRef(new PrintBlankTemplRefId(blank.getHid(), getHid())/*, blank.getPage()*/));
            }
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String viewBlank() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException, SQLException {
        log.info("view Binary Blank");
        blank = daoBlank.findById(getHid(), false);
        inputStream = new ByteArrayInputStream(blank.getData().getBytes((long) 1, (int) blank.getData().length()));
        return "view";
    }

    public String printWinParams(){
        log.info("printWinParams");
        Long nBlankRefs;
        List<Integer> pages = dao.findPages4BindedUnPrnTemplate(doc, route, getUser().getUsername());
        if(pages.size() == 0){
            pages = dao.findPages4BindedPrnTemplate(doc, route);
            if(pages.size() == 0){
                pages = dao.findPages4DefaultPrnTemplate(doc);
                nBlankRefs = dao.countPrnBlankRefs4Default(doc);
            } else {
                nBlankRefs = dao.countPrnBlankRefs(doc, route);
            }
        } else{
            nBlankRefs = dao.countUnPrnBlankRefs(doc, route, getUser().getUsername());
        }

        setJSONData(Constants.convert2JSON_PrintWinParams(pages, nBlankRefs));
        return SUCCESS;
    }

    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = (user_agent.indexOf("MSIE") > -1);
        if (isIE) {
            return URLEncoder.encode(blank.getFileName(), "utf-8");
        } else {
            return MimeUtility.encodeWord(blank.getFileName());
        }
    }

    /*public String viewDownloadedBlanks(){
        log.info("viewBlanks");
        List<PrintBlank> blanks = daoBlank.findAllDownloaded(getQuery());
        setJSONData(Constants.convert2JSON_PrintBlanks(blanks));
        return SUCCESS;
    }*/
    private InputStream inputStream;
    private PrintTemplates prnTempl;
    private PrintTemplatesDAO dao;
    private PrintBlankDAO daoBlank;
    private RoutePrintTemplatesDAO routePrintTemplatesDAO;
    private RouteUnPrintTemplatesDAO routeUnPrintTemplatesDAO;
    private List<Route> routes;
    private PrintBlank blank;
    private ArrayList<PrintBlank> blanks;
    private String contentType;
    private String filename;
    private File upload;
    private PrintBlankTemplRefDAO daoPrintBlankTempl;
    private HttpServletRequest request;
    private Route route;
    private DocDir doc;


    public void setUpload(File file) {
        this.upload = file;
    }

    public File getUpload() {
        return this.upload;
    }

    public void setUploadContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getUploadContentType() {
        return this.contentType;
    }

    public void setUploadFileName(String filename) {
        this.filename = filename;
    }

    public String getUploadFileName() {
        return this.filename;
    }

    public PrintTemplates getPrnTempl() {
        return prnTempl;
    }

    public void setPrnTempl(PrintTemplates prnTempl) {
        this.prnTempl = prnTempl;
    }

    @Override
    public void setPrintTemplatesDAO(PrintTemplatesDAO dao) {
        this.dao = dao;
    }

    public PrintTemplatesDAO getPrintTemplatesDao() {
        return dao;
    }

    @Override
    public void setRoutePrintTemplatesDAO(RoutePrintTemplatesDAO dao) {
        routePrintTemplatesDAO = dao;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public PrintBlank getBlank() {
        return blank;
    }

    public void setBlank(PrintBlank blank) {
        this.blank = blank;
    }

    @Override
    public void setPrintBlankDAO(PrintBlankDAO dao) {
        this.daoBlank = dao;
    }

    @Override
    public void setServletRequest(HttpServletRequest httpServletRequest) {
        request =  httpServletRequest;
    }

    public ArrayList<PrintBlank> getBlanks() {
        return blanks;
    }

    public void setBlanks(ArrayList<PrintBlank> blanks) {
        this.blanks = blanks;
    }

    @Override
    public void setPrintBlankTemplRefDAO(PrintBlankTemplRefDAO dao) {
        daoPrintBlankTempl = dao;
    }

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public void setDoc(DocDir doc) {
        this.doc = doc;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    @Override
    public void setRouteUnPrintTemplatesDAO(RouteUnPrintTemplatesDAO dao) {
        routeUnPrintTemplatesDAO = dao;
    }
}
