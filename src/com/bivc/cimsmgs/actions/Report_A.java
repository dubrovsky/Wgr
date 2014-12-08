package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.MailHelper;
import com.bivc.cimsmgs.commons.MailHelperAttach;
import com.bivc.cimsmgs.commons.MailService;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.DocDir;
import com.bivc.cimsmgs.upload.ResponseCfg;
import com.bivc.cimsmgs.upload.excel.*;
import org.apache.commons.lang3.reflect.MethodUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;
import org.apache.struts2.util.ServletContextAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.internet.MimeUtility;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;
import java.util.concurrent.*;

/**
 * Date: 14.01.12
 * Time: 21:48
 */
public class Report_A extends CimSmgsSupport_A implements SmgsDAOAware, InvoiceDAOAware, ServletRequestAware, DocDirDAOAware, ServletResponseAware, SessionAware, /*MailSettingsDAOAware,*/ ServletContextAware {
    final static private Logger log = LoggerFactory.getLogger(Report_A.class);
    private boolean zipped;
    final public static String TK_FLAG = "tkFlag";
    private String receivers;
    private String msg;
    //    private MailSettingsDAO mailSettingsDAO;
    private CimSmgs smgs;
    private ServletContext servletContext;
    private String filename;
    private String dirDescr;

    public String viewReport() throws IOException {
        log.info("viewReport");
        List<CimSmgs> list = getSmgsDAO().findAllRep(getSearch(), getUser().getUsr());
//        excel = getSmgsDAO().findAllRep(getSearch(), getUser().getUsr());
        excel = new ExportReport2Excel().convert2Excel(list, getSearch());
        /*ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.close();
        inputStream = new ByteArrayInputStream(baos.toByteArray());
        return "view";*/

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.close();

        inputStream = new ByteArrayInputStream(baos.toByteArray());
        return "view";
    }

    public String viewReport1() throws IOException {
        log.info("viewReport1");
//            List<CimSmgs> list = getSmgsDAO().findAllRep1(getSearch(), getUser().getUsr());

        if (getSearch().getType() == null || getSearch().getType() != -1) {  // cimsmgs table
            List<CimSmgs> list;
            if (getSearch().getScope().equals("local")) {
                list = getSmgsDAO().findAll(-1, -1, getSearch(), getUser().getUsr());
            } else {
                list = getSmgsDAO().findStat(-1, -1, getSearch(), getUser().getUsr());
            }
            excel = new ExportReport2Excel().convert2Excel_1(list, getSearch(), docDirDAO.findAll(null, null, null, getUser().getUsr()));
        } else { // invoices
            List<CimSmgsInvoice> list;
            if (getSearch().getScope().equals("local")) {
                list = getInvoiceDAO().findAll(-1, -1, getSearch(), getUser().getUsr());
            } else {
                list = getInvoiceDAO().findStat(-1, -1, getSearch(), getUser().getUsr());
            }
            excel = new ExportReport2Excel().convert2Excel_2(list, getSearch());
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excel.write(baos);
        baos.close();

        inputStream = new ByteArrayInputStream(baos.toByteArray());
        return "view";
    }

    public String exportDir2Excel() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, IOException, InterruptedException {
        log.info("exportDir2Excel");
        session.put(TK_FLAG, true);

        ExportDir2Excel dir2Excel = new ExportDir2Excel(ExportDir2Excel.XLS, getDirDescr());
        MethodUtils.invokeMethod(dir2Excel, getName());
        ExcelWriter excelWriter = new ExcelWriter(dir2Excel, getDirDescr(), isZipped());
        ResponseCfg responseCfg = new ResponseCfg(response, request, excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());

        session.remove(TK_FLAG);
        return null;
    }

    /*public String exportContList2Excel() throws IOException, InvalidFormatException {
        log.info("exportAviso2Excel");
        if (getToken() == null) {  // 1-st request - check if have data to proceed
            Long docsQuant = getSmgsDAO().countDocsByNPoezd(getSearch().getNpoezd(), getType());
            setJSONData(docsQuant > 0 ? Constants.convert2JSON_True() : Constants.convert2JSON_False());
            return SUCCESS;
        } else {   //  2-nd request - push data to Excel
            session.put(EXPORT_2_EXCEL_FLAG, true);
            List<CimSmgs> docs = getSmgsDAO().findDocsByNPoezd(getSearch().getNpoezd(), getType());
            String path4ExcelTmpl = request.getSession().getServletContext().getRealPath(File.separator + "docs") + File.separator + "ContsList_SMGS.xls";
            ExportContList2Excel doc2Excel = new ExportContList2Excel(Export2Excel.XLS, docs, path4ExcelTmpl);
            doc2Excel.makeSmgsContList_PL();
            ExcelWriter excelWriter = new ExcelWriter(doc2Excel, "Container's List", false);
            ResponseCfg responseCfg = new ResponseCfg(response, request, excelWriter.getFileFullName());
            excelWriter.write(responseCfg.getResponse().getOutputStream());
            session.remove(EXPORT_2_EXCEL_FLAG);
            return null;
        }
    }*/

    private ExportAviso2Excel buildExcel(String method) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        String PATH2LOGO = request.getSession().getServletContext().getRealPath(File.separator + "build" + File.separator+ "production" + File.separator + "TK" + File.separator + "resources" + File.separator + "images") + File.separator + "tk-logo.png";
//        SmgsDAO smgsDao = new SmgsDAOHib();
        CimSmgs smgs = getSmgsDAO().findById(getHid(), false);
        ExportAviso2Excel doc2Excel = new ExportAviso2Excel(Export2Excel.XLS, /*getHid(),*/ smgs, PATH2LOGO);
        MethodUtils.invokeMethod(doc2Excel, method);
        return doc2Excel;
    }

    public String exportAviso2Excel() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, IOException, InterruptedException {
        log.info("exportAviso2Excel");
        session.put(TK_FLAG, true);
        DocDir doc = docDirDAO.findById(getDocId(), false);
        ExportAviso2Excel doc2Excel = buildExcel(doc.getName());

        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, doc.getDescr(), doc.getZipped());
        ResponseCfg responseCfg = new ResponseCfg(response, request, excelWriter.getFileFullName());
        excelWriter.write(responseCfg.getResponse().getOutputStream());

        smgs = getSmgsDAO().findById(getHid(), false);  // 4 status logging
        session.remove(TK_FLAG);
        return null;
    }

    public String exportAviso2Excel2Mail() throws NoSuchMethodException, IllegalAccessException, InvocationTargetException, IOException, InterruptedException, ExecutionException {
        log.info("exportAviso2Excel2Mail");
        DocDir doc = docDirDAO.findById(getDocId(), false);
        ExportAviso2Excel doc2Excel = buildExcel(doc.getName());

        ExcelWriter excelWriter = new ExcelWriter(doc2Excel, doc.getDescr(), doc.getZipped());
        ByteArrayOutputStream os = new ByteArrayOutputStream();
        excelWriter.write(os);

//        MailSettings settings = mailSettingsDAO.findById(1L, false);
        MailHelper helper = new MailHelperAttach(getMsg(), (doc.getZipped() ? MailHelperAttach.ZIP : MailHelperAttach.EXCEL), excelWriter.getFileFullName(), os);
        MailService mail = new MailService(getReceivers(), servletContext.getInitParameter("mailSender"), servletContext.getInitParameter("mailServer"), servletContext.getInitParameter("mailAccount"), servletContext.getInitParameter("mailPassword"), doc.getName(), helper);

        class MyCallable implements Callable<Boolean> {
            private MailService mail;

            public MyCallable(MailService var) {
                mail = var;
            }

            @Override
            public Boolean call() throws Exception {
                return mail.send();
            }
        }

        ExecutorService executor = null;
        try {
            executor = Executors.newSingleThreadExecutor();
            Future<Boolean> result = executor.submit(new MyCallable(mail));
            result.get(20000, TimeUnit.MILLISECONDS);
        } catch (InterruptedException e) {
            throw e;
        } catch (ExecutionException e) {
            throw e;
        } catch (TimeoutException e) {
            e.printStackTrace();
        } finally {
            if(executor != null){
                executor.shutdown();
            }
        }

        smgs = getSmgsDAO().findById(getHid(), false);  // 4 status logging
        setJSONData(Constants.convert2JSON_SendingEmail());
        return SUCCESS;
    }

    public String checkFlagInSession() {
        log.info("checkFlag");
        setJSONData(session.containsKey(TK_FLAG) ? Constants.convert2JSON_False() : Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String getEncodedFileName(String filename) throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = user_agent.contains("MSIE");
        if (isIE) {
            return URLEncoder.encode(filename, "utf-8");
        } else {
            return MimeUtility.encodeWord(filename);
        }
    }

    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = user_agent.contains("MSIE");
        if (isIE) {
            return URLEncoder.encode(filename, "utf-8");
        } else {
            return MimeUtility.encodeWord(filename);
        }
    }

    public String stat() {
        log.info("stat");
        Long total;
        if (getSearch() == null || getSearch().getType() == null || getSearch().getType() != -1) { // cimsmgs table
            List<CimSmgs> smgslist = getSmgsDAO().findStat(getLimit(), getStart(), getSearch(), getUser().getUsr());
            total = getSmgsDAO().countAllStat(getSearch(), getUser().getUsr());
            setJSONData(Constants.convert2JSON_StatListCimSmgs(smgslist, total, docDirDAO.findAll(null, null, null, getUser().getUsr())));
        } else {  // invoices
            List<CimSmgsInvoice> invoicelist = getInvoiceDAO().findStat(getLimit(), getStart(), getSearch(), getUser().getUsr());
            total = getInvoiceDAO().countAllStat(getSearch(), getUser().getUsr());
            setJSONData(Constants.convert2JSON_StatListInvoice(invoicelist, total));
        }

        return SUCCESS;
    }

    public String viewLink() throws IOException {
        log.info("viewLink");

        inputStream = new FileInputStream(
                new File(request.getSession().getServletContext().getRealPath("/docs") + File.separator + "Gruzy.doc"));
        return "link";
    }

    public String instruction() throws IOException {
        log.info("instruction");

        inputStream = new FileInputStream(
                new File(request.getSession().getServletContext().getRealPath("/docs") + File.separator + getSearch().getKod() + ".doc"));
        return "instruction";
    }


    private HSSFWorkbook excel;
    private HttpServletRequest request;
    private DocDirDAO docDirDAO;
    private String npoezd;

    public void setExcel(HSSFWorkbook excel) {
        this.excel = excel;
    }

    public HSSFWorkbook getExcel() {
        return excel;
    }

    private SmgsDAO smgsDAO;
    private InvoiceDAO invoiceDAO;

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    private InputStream inputStream;

    public InputStream getInputStream() {
        return inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }

    public void setServletRequest(HttpServletRequest request) {
        this.request = request;
    }

    public HttpServletRequest getServletRequest() {
        return request;
    }

    public InvoiceDAO getInvoiceDAO() {
        return invoiceDAO;
    }

    public void setInvoiceDAO(InvoiceDAO invoiceDAO) {
        this.invoiceDAO = invoiceDAO;
    }

    @Override
    public void setDocDirDAO(DocDirDAO dao) {
        docDirDAO = dao;
        //To change body of implemented methods use File | Settings | File Templates.
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getDirDescr() {
        return dirDescr;
    }

    public void setDirDescr(String dirDescr) {
        this.dirDescr = dirDescr;
    }

    private HttpServletResponse response;

    @Override
    public void setServletResponse(HttpServletResponse httpServletResponse) {
        response = httpServletResponse;
    }

    public boolean isZipped() {
        return zipped;
    }

    public void setZipped(boolean zipped) {
        this.zipped = zipped;
    }

    private Map<String, Object> session;

    @Override
    public void setSession(Map<String, Object> session) {
        this.session = session;
    }

    public String getReceivers() {
        return receivers;
    }

    public void setReceivers(String receivers) {
        this.receivers = receivers;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    /*@Override
    public void setMailSettingsDAO(MailSettingsDAO dao) {
        this.mailSettingsDAO = dao;
    }*/

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public String getNpoezd() {
        return npoezd;
    }

    public void setNpoezd(String npoezd) {
        this.npoezd = npoezd;
    }
}
