package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.Doc2DocTemplatesDAO;
import com.bivc.cimsmgs.dao.InvoiceDAO;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.Doc2docTemplates;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteRefs;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteUnRefs;
import com.bivc.cimsmgs.doc2doc.Doc2Doc;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Doc2Doc_A extends CimSmgsSupport_A implements ServletRequestAware, SessionAware, ServletResponseAware {
    final static private Logger log = LoggerFactory.getLogger(Doc2Doc_A.class);

    private Doc2Doc aviso2SmgsGu;
    private Doc2Doc smgs2Invoice;
    private Doc2Doc file2SmgsInvoice;
    private Doc2Doc aviso2SmgsAppend;
    private Doc2Doc smgs2Smgs4ContList;
    private Doc2Doc cimSmgs2CimSmgs4ContList;
    private Doc2Doc cimSmgs2ExcelContList_de;
    private Doc2Doc smgs2ExcelContList_pl;
    private Doc2Doc cimSmgs2ExcelDopList_de;
    private HttpServletResponse servletResponse;
    private Map<String, Object> session;

    public String execute() throws Exception {
        log.info("execute");
        Doc2Doc doc2doc = run();
        setJSONData(Constants.convert2JSON_True(doc2doc.getResultMsg()));
        return SUCCESS;
    }

    public String upload() throws Exception {
        log.info("upload");
        return execute();
    }

    public String downloadExcel() throws Exception {
        log.info("downloadExcel");

        session.put(Report_A.TK_FLAG, true);
        run();
        session.remove(Report_A.TK_FLAG);
        return null;
    }

    public String download() throws Exception {
        log.info("download");

        if (getToken() == null) {  // 1-st request - check if have data to proceed
            Long docsQuant = getSmgsDAO().countDocsByNPoezd(getSearch().getNpoezd(), getType(), getSearch().getRouteId());
            setJSONData(docsQuant > 0 ? Constants.convert2JSON_True() : Constants.convert2JSON_False());
            return SUCCESS;
        } else {   //  2-nd request - push data to Excel
            return downloadExcel();
        }
    }

    private Doc2Doc run() throws Exception {
        findTemplate();
        Doc2Doc doc2doc = (Doc2Doc) this.getClass().getMethod("get" + doc2docTempl.getMethodName()).invoke(this);
        doc2doc.convert(this);
        return doc2doc;
    }

    private void findTemplate() throws BusinessException {
        log.info("findTemplate");

        List<Doc2docTemplsRouteUnRefs> doc2DocRouteUnRefs = doc2DocTemplDao.findDoc2DocTempls4UnRoute(getSearch().getRouteId(), getUser().getUsername(), getGroupBy());
        if (doc2DocRouteUnRefs.size() > 0) {
            doc2docTempl = doc2DocRouteUnRefs.get(0).getDoc2docTemplates();
        } else {
            List<Doc2docTemplsRouteRefs> doc2DocRouteRefs = doc2DocTemplDao.findDoc2DocTempls4Route(getSearch().getRouteId(), getGroupBy());
            if (doc2DocRouteRefs.size() > 0) { // look for in refs
                doc2docTempl = doc2DocRouteRefs.get(0).getDoc2docTemplates();
            } else {  // check default
                List<Doc2docTemplates> doc2docTempls = doc2DocTemplDao.findDefaultDoc2DocTempls(getGroupBy());
                if (doc2docTempls.size() > 0) {
                    doc2docTempl = doc2docTempls.get(0);
                } else {
                    throw new BusinessException("Miss template for doc2doc module");
                }
            }
        }
    }

    private List<String> packIds;
    private List<Long> smgsIds;
    private BigDecimal docIdTo;
    private BigDecimal docIdFrom;
    private Doc2DocTemplatesDAO doc2DocTemplDao;
    /*private DocDirDAO docDirDAO;*/
    private SmgsDAO smgsDAO;
    private InvoiceDAO invoiceDAO;
    private Doc2docTemplates doc2docTempl;
    private File fileData;
    private String contentType;
    private String filename;
    private HttpServletRequest request;
    private CimSmgs smgs;
    private ArrayList<CimSmgs> smgsy;
    private Byte typeFrom;
    private Byte typeTo;
    private String groupBy;

    private List<File> fileUpload = new ArrayList<File>();
    private List<String> fileUploadContentType = new ArrayList<String>();
    private List<String> fileUploadFileName = new ArrayList<String>();

    public List<File> getFileUpload() {
        return fileUpload;
    }

    public void setFileUpload(List<File> fileUpload) {
        this.fileUpload = fileUpload;
    }

    public List<String> getFileUploadContentType() {
        return fileUploadContentType;
    }

    public void setFileUploadContentType(List<String> fileUploadContentType) {
        this.fileUploadContentType = fileUploadContentType;
    }

    public List<String> getFileUploadFileName() {
        return fileUploadFileName;
    }

    public void setFileUploadFileName(List<String> fileUploadFileName) {
        this.fileUploadFileName = fileUploadFileName;
    }

    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = (user_agent.indexOf("MSIE") > -1);
        if (isIE) {
            return URLEncoder.encode(filename, "utf-8");
        } else {
            return MimeUtility.encodeWord(filename);
        }
    }

    public void setUpload(File file) {
        this.fileData = file;
    }

    public File getUpload() {
        return this.fileData;
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


    public List<String> getPackIds() {
        return packIds;
    }

    public void setPackIds(List<String> packIds) {
        this.packIds = packIds;
    }

    public BigDecimal getDocIdTo() {
        return docIdTo;
    }

    public void setDocIdTo(BigDecimal docIdTo) {
        this.docIdTo = docIdTo;
    }

    public BigDecimal getDocIdFrom() {
        return docIdFrom;
    }

    public void setDocIdFrom(BigDecimal docIdFrom) {
        this.docIdFrom = docIdFrom;
    }

    public Doc2DocTemplatesDAO getDoc2DocTemplDao() {
        return doc2DocTemplDao;
    }

    public void setDoc2DocTemplatesDAO(Doc2DocTemplatesDAO dao) {
        doc2DocTemplDao = dao;
    }

   /* @Override
    public void setDocDirDAO(DocDirDAO dao) {
        docDirDAO = dao;
    }*/

    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletRequest getServletRequest() {
        return request;
    }

    public List<Long> getSmgsIds() {
        return smgsIds;
    }

    public void setSmgsIds(List<Long> smgsIds) {
        this.smgsIds = smgsIds;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public void setInvoiceDAO(InvoiceDAO dao) {
        invoiceDAO = dao;
    }

    public InvoiceDAO getInvoiceDAO() {
        return invoiceDAO;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public ArrayList<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public void setSmgsy(ArrayList<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }

    public Byte getTypeFrom() {
        return typeFrom;
    }

    public void setTypeFrom(Byte typeFrom) {
        this.typeFrom = typeFrom;
    }

    public Byte getTypeTo() {
        return typeTo;
    }

    public void setTypeTo(Byte typeTo) {
        this.typeTo = typeTo;
    }

    public String getGroupBy() {
        return groupBy;
    }

    public void setGroupBy(String groupBy) {
        this.groupBy = groupBy;
    }

    /*public String getClassPathPrefix() {
        return classPathPrefix;
    }

    public void setClassPathPrefix(String classPathPrefix) {
        this.classPathPrefix = classPathPrefix;
    }*/

    public Doc2Doc getAviso2SmgsGu() {
        return aviso2SmgsGu;
    }

    public void setAviso2SmgsGu(Doc2Doc aviso2SmgsGu) {
        this.aviso2SmgsGu = aviso2SmgsGu;
    }

    public Doc2Doc getSmgs2Invoice() {
        return smgs2Invoice;
    }

    public void setSmgs2Invoice(Doc2Doc smgs2Invoice) {
        this.smgs2Invoice = smgs2Invoice;
    }

    public Doc2Doc getFile2SmgsInvoice() {
        return file2SmgsInvoice;
    }

    public void setFile2SmgsInvoice(Doc2Doc file2SmgsInvoice) {
        this.file2SmgsInvoice = file2SmgsInvoice;
    }

    public Doc2Doc getAviso2SmgsAppend() {
        return aviso2SmgsAppend;
    }

    public void setAviso2SmgsAppend(Doc2Doc aviso2SmgsAppend) {
        this.aviso2SmgsAppend = aviso2SmgsAppend;
    }

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        servletResponse = httpServletResponse;
    }

    @Override
    public void setSession(Map<String, Object> stringObjectMap) {
        session = stringObjectMap;
    }

    public HttpServletResponse getServletResponse() {
        return servletResponse;
    }

    public Map<String, Object> getSession() {
        return session;
    }

    public Doc2Doc getSmgs2ExcelContList_pl() {
        return smgs2ExcelContList_pl;
    }

    public void setSmgs2ExcelContList_pl(Doc2Doc smgs2ExcelContList_pl) {
        this.smgs2ExcelContList_pl = smgs2ExcelContList_pl;
    }

    public Doc2Doc getSmgs2Smgs4ContList() {
        return smgs2Smgs4ContList;
    }

    public void setSmgs2Smgs4ContList(Doc2Doc smgs2Smgs4ContList) {
        this.smgs2Smgs4ContList = smgs2Smgs4ContList;
    }

    public Doc2Doc getCimSmgs2ExcelContList_de() {
        return cimSmgs2ExcelContList_de;
    }

    public void setCimSmgs2ExcelContList_de(Doc2Doc cimSmgs2ExcelContList_de) {
        this.cimSmgs2ExcelContList_de = cimSmgs2ExcelContList_de;
    }

    public Doc2Doc getCimSmgs2CimSmgs4ContList() {
        return cimSmgs2CimSmgs4ContList;
    }

    public void setCimSmgs2CimSmgs4ContList(Doc2Doc cimSmgs2CimSmgs4ContList) {
        this.cimSmgs2CimSmgs4ContList = cimSmgs2CimSmgs4ContList;
    }

    public Doc2Doc getCimSmgs2ExcelDopList_de() {
        return cimSmgs2ExcelDopList_de;
    }

    public void setCimSmgs2ExcelDopList_de(Doc2Doc cimSmgs2ExcelDopList_de) {
        this.cimSmgs2ExcelDopList_de = cimSmgs2ExcelDopList_de;
    }
}
