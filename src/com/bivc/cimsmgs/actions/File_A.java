package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exchange.AvisoLoader;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import com.isc.leechdictionary.SynchPNSI;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;

public class File_A extends CimSmgsSupport_A implements FileDAOAware, FileInfDAOAware, ServletRequestAware, InvoiceDAOAware, SmgsDAOAware {
    final static private Logger log = LoggerFactory.getLogger(File_A.class);
    private InvoiceDAO invoiceDAO;
    private SmgsDAO smgsDAO;

    public String listInf() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("listInf");
        List<CimSmgsFileInf> files = getFileInfDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getFileInfDAO().countAll(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_FileInfList(files, total));
        return SUCCESS;
    }

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<CimSmgsFile> files = getFileDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getFileDAO().countAll(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_FileList(files, total));
        return SUCCESS;
    }

    public String view1() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException {
        log.info(getTask());
        StringBuilder result = new StringBuilder();
        file = getFileInfDAO().findById2(file);
        if(file != null){
            result.append("{");
            result.append("doc:");
            result.append(JsonUtils.doJson(file));
            result.append("}");
        }
        setJSONData(result.toString());
        return SUCCESS;
    }

    public String view() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException, SQLException {
        log.info(getTask());
        files = getFileDAO().findById(files.getHid(), false);
        inputStream = new ByteArrayInputStream(files.getFiles().getBytes((long) 1, (int) files.getFiles().length()));
        return "view";
    }

    public String saveFile() throws Exception {
        log.info("saveFile");
        saveFileHelper();

        getFileDAO().save(files, fileData);
        setJSONData(Constants.convert2JSON_Smgs_Save_Results(file, "file"));
        return SUCCESS;
    }

    public String saveFile(OutputStreamWriters osw) throws Exception {
        log.info("saveFile");
        saveFileHelper();

        getFileDAO().save(files, osw);
        setJSONData(Constants.convert2JSON_Smgs_Save_Results(file, "file"));
        return SUCCESS;
    }

    private void saveFileHelper() throws Exception {

        if (file == null || file.getHid() == null) {
            save();
        } else {
            file = getFileInfDAO().findById2(file);
        }
        files = new CimSmgsFile();
        files.setFileName(filename);
        files.setContentType(contentType);
        if(fileData != null){
            files.setLength(new BigDecimal(fileData.length()));
        }
        files.setCimSmgsFileInf(file);
    }

    public String save() throws Exception {
        log.info("save");
        Route route = getRouteDAO().findById(file.getRoute().getHid(), false);
        if (file.hasPack()) {
            file.setPackDoc(getPackDocDAO().findById(file.getPackDoc().getHid(), false));
            file.getPackDoc().setDattr(new Date());
        } else {
            PackDoc pack = new PackDoc();
            pack.setRoute(route);
            pack.setUsrGroupsDir(getUsrGroupsDirDAO().findById(getUser().getUsr().getGroup().getName(), false));
            pack.addFileInfItem(file);
            pack.setDattr(new Date());
        }
        file.setRoute(route);
        file.prepare4save(getUser());

//        if (file.getHid() != null) { // обновить
//            file = getFileInfDAO().makePersistent(file);
//        } else {
//            getPackDocDAO().makePersistent(file.getPackDoc());
//        }

        if (file.getHid() != null) { // обновить
            file = getFileInfDAO().merge(file);
        } else {
            if (file.hasPack()) { // пришли с др закладки, смгс еще нет
                getFileInfDAO().makePersistent(file);
            } else {
                getPackDocDAO().makePersistent(file.getPackDoc());
            }
        }

        setJSONData(Constants.convert2JSON_Smgs_Save_Results(file, "file"));
        return SUCCESS;
    }

    public String deleteFile() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("deleteFile");

        CimSmgsFile smgsOrigin = getFileDAO().findById(file.getHid(), true);
        getFileDAO().makeTransient(smgsOrigin);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String delete() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("delete");

        if (file.getHid() != null) {
            getFileInfDAO().makeTransient(getFileInfDAO().findById(file.getHid(), true));
            Long count = getSmgsDAO().countAll(file.getPackDoc()) + getInvoiceDAO().countAll(file.getPackDoc()) + getFileInfDAO().countAll(file.getPackDoc());
            log.info("Pack_Doc has - " + count + " docs in CimSmgs and CimSmgsInvoice table and CimSmgsFileInf table");
            if(count == 0){
                log.info("No more docs with PackDoc hid " + file.getPackDoc().getHid() + ". Delete PackDoc");
                getPackDocDAO().makeTransient(getPackDocDAO().getById(file.getPackDoc().getHid(), true));
            }
        } else if (file.getPackDoc().getHid() != null) {
            getPackDocDAO().makeTransient(getPackDocDAO().findById(file.getPackDoc().getHid(), true));
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    /*public String uploadAviso() throws Exception {
        log.info("");
        AvisoLoader al = new AvisoLoader();
        al.load(fileData.getAbsolutePath(), getUser().getUsername(), getUser().getUsr().getGroup().getName(), new Route(getSearch().getRouteId()),getUser().getUsr().getGroup());
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }*/
    public String uploadAviso() throws Exception {
        log.info("uploadAviso");
        PackDoc pack = new AvisoLoader().loadXML(fileData, getUser().getUsername(), getUser().getUsr().getGroup().getName(), new Route(getSearch().getRouteId()), getUser().getUsr().getGroup(), new BigDecimal(getSearch().getDocId()), getSearch().getType(), getSearch().getKod());
        smgs = pack.getCimSmgses().iterator().next(); // for status log
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String uploadAvisoDB() throws Exception {
        log.info("uploadAvisoDB");
        PackDoc pack = new ExchangeServer().receiveDBXML(fileData, getUser().getUsername(), getUser().getUsr().getGroup().getName(), new Route(getSearch().getRouteId()), getUser().getUsr().getGroup());
        smgs = pack.getCimSmgses().iterator().next(); // for status log
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String uploadNsi() throws Exception {
        log.info(getUploadFileName());
        SynchPNSI rp = new SynchPNSI();
        rp.setLogPath(
                new File(request.getSession().getServletContext().getRealPath("/")).getParentFile().getParentFile().getAbsolutePath() +
                        File.separator + "logs" + File.separator + "SynchPNSI" + File.separator
        );
        rp.init();

        if (fileData != null) {
            rp.replaceTablePNSI(new FileInputStream(fileData));
            setJSONData(Constants.convert2JSON_True());
        }
        return SUCCESS;
    }

    public String uploadTBC() throws IOException {
        log.info("uploadTBC");
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(fileData), "UTF-8"));
//        BufferedReader reader = new BufferedReader(new FileReader(fileData));
        String line = null;
        StringBuilder stringBuilder = new StringBuilder();
        String ls = System.getProperty("line.separator");

        while ((line = reader.readLine()) != null) {
            stringBuilder.append(line);
            stringBuilder.append(ls);
        }
        reader.close();

        ExchangeServer server = new ExchangeServer();
        server.ReceiveTBCFile(stringBuilder.toString(), filename, getUser().getUsername(), getUser().getUsr().getGroup().getName(), route, getUser().getUsr().getGroup());
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private FileDAO fileDAO;
    private FileInfDAO fileInfDAO;
    private CimSmgsFileInf file;
    private CimSmgsFile files;
    private File fileData;
    private String contentType;
    private String filename;
    private InputStream inputStream;
    private OutputStream outputStreamt;
    private HttpServletRequest request;
    private CimSmgs smgs;
    private Route route;

    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = (user_agent.indexOf("MSIE") > -1);
        if (isIE) {
            return URLEncoder.encode(files.getFileName(), "utf-8");
        } else {
            return MimeUtility.encodeWord(files.getFileName());
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

    public FileInfDAO getFileInfDAO() {
        return fileInfDAO;
    }

    public void setFileInfDAO(FileInfDAO fileInfDAO) {
        this.fileInfDAO = fileInfDAO;
    }

    private FileDAO getFileDAO() {
        return fileDAO;
    }

    public void setFileDAO(FileDAO fileDAO) {
        this.fileDAO = fileDAO;
    }

    public CimSmgsFileInf getFile() {
        return file;
    }

    public void setFile(CimSmgsFileInf file) {
        this.file = file;
    }

    public CimSmgsFile getFiles() {
        return files;
    }

    public void setFiles(CimSmgsFile file) {
        this.files = file;
    }


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

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    @Override
    public void setInvoiceDAO(InvoiceDAO dao) {
        this.invoiceDAO = dao;
    }

    public InvoiceDAO getInvoiceDAO() {
        return invoiceDAO;
    }


    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }
    @Override
    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public OutputStream getOutputStreamt() {
        return outputStreamt;
    }

    public void setOutputStreamt(OutputStream outputStreamt) {
        this.outputStreamt = outputStreamt;
    }

}
