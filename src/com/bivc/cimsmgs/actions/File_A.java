package com.bivc.cimsmgs.actions;

import Ti.DataProcessing.Tools.DataProcessingTools;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exchange.AvisoLoader;
import com.bivc.cimsmgs.exchange.ExchangeServer;
import com.isc.leechdictionary.SynchPNSI;
import org.apache.commons.collections4.ListUtils;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static com.bivc.cimsmgs.commons.Constants.convert2JSON_True;

public class File_A extends CimSmgsSupport_A implements FileDAOAware, FileInfDAOAware, ServletRequestAware, InvoiceDAOAware, SmgsDAOAware, FileNewDAOAware {
    final static private Logger log = LoggerFactory.getLogger(File_A.class);
    private InvoiceDAO invoiceDAO;
    private SmgsDAO smgsDAO;

    public String listInf() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("listInf");
        List<CimSmgsFileInf> files = getFileInfDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getFileInfDAO().countAll(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_FileInfList(files, total, getUser()));
        return SUCCESS;
    }

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<CimSmgsFile> files = getFileDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getFileDAO().countAll(getSearch(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_FileList(files, total, getUser().getUsr()));
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

        // set record about view of document
        CimSmgsFileNew cimSmgsFileNew = new CimSmgsFileNew(new Date(), getUser().getUsr().getUn(), getUser().getUsr().getGroup().getName());
        cimSmgsFileNew.setCimSmgsFile(files);
        fileNewDAO.makePersistent(cimSmgsFileNew);
        return "view";
    }

    public String saveFlag() throws Exception {
        CimSmgsFile cimSmgsFile = getFileDAO().findById(files.getHid(), false);
        cimSmgsFile.setUserFlag(getUserFlag());
        getFileDAO().makePersistent(cimSmgsFile);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String saveFile() throws Exception {
        log.info("saveFile");

        for (int i=0; i< fileData.length; i++) {
            saveFileHelper(fileData[i], filename[i], contentType[i], getUser().getUsr().getUn());

            getFileDAO().save(files, fileData[i]);
        }
        setJSONData(Constants.convert2JSON_Smgs_Save_Results(file, "file"));
        return SUCCESS;
    }

    public String saveFile(OutputStreamWriters osw) throws Exception {
        log.info("saveFile");
        saveFileHelper(null, filename[0], contentType[0], "");

        getFileDAO().save(files, osw);
        setJSONData(Constants.convert2JSON_Smgs_Save_Results(file, "file"));
        return SUCCESS;
    }

    private void saveFileHelper(File fileData, String filename, String contentType, String un) throws Exception {

        if (file == null || file.getHid() == null) {
            save();
        } else {
            file = getFileInfDAO().findById2(file);
        }
        files = new CimSmgsFile();
        files.setFileName(filename);
        files.setContentType(contentType);
        files.setDat(new Date());
        files.setUn(un);
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

        CimSmgsFile cimSmgsFile = getFileDAO().findById(file.getHid(), false);
        if(cimSmgsFile != null){
            cimSmgsFile.setDeleted(true);
            getFileDAO().makePersistent(cimSmgsFile);
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String destroyFile() {
        log.info("destroyFile");

        CimSmgsFile cimSmgsFile = getFileDAO().findById(file.getHid(), false);
        if(cimSmgsFile != null){
            getFileDAO().makeTransient(cimSmgsFile);
        }

        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String restoreFile() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("restoreFile");

        CimSmgsFile cimSmgsFile = getFileDAO().findById(files.getHid(), false);
        if(cimSmgsFile != null){
            cimSmgsFile.setDeleted(false);
            getFileDAO().makePersistent(cimSmgsFile);
        }
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    /*public String deleteFile1() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("deleteFile");

        CimSmgsFile cimSmgsFile = getFileDAO().findById(file.getHid(), false);
        getFileDAO().makeTransient(cimSmgsFile);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }*/
    public String restore() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("restore");
//        PackDoc packDoc = getPackDocDAO().getById(getFile().getPackDoc().getHid(), false);
//        if(packDoc != null){
//            packDoc.setDeleted(false);
//            getPackDocDAO().makePersistent(packDoc);
//        }
        restoreDelete(false);
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }
    public String delete() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("delete");

        restoreDelete(true);
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }
    private void restoreDelete(boolean delete)
    {
        if (file == null) {
            String hIDsInput[] = getQuery1().split(",");
            Long hIDs[] = DataProcessingTools.stringArrToLongList(hIDsInput);
            if (hIDs != null) {
                for (int i = 0; i < hIDs.length; i++) {
                    file = getFileInfDAO().getById(hIDs[i], false);
                    if (file != null) {
                        PackDoc packDoc = file.getPackDoc();
                        packDoc.setDeleted(delete);
                        getPackDocDAO().makePersistent(packDoc);
                    }
                }
            }
        }
        else {
            file = getFileInfDAO().getById(file.getHid(), true);
            if(file != null){
                PackDoc packDoc = file.getPackDoc();
                packDoc.setDeleted(delete);
                getPackDocDAO().makePersistent(packDoc);
            }
        }
    }

    public String destroy() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("destroy");

        file = getFileInfDAO().getById(file.getHid(), true);
        if(file != null){
            PackDoc packDoc = file.getPackDoc();
            getPackDocDAO().makeTransient(packDoc);
        }

        /*if (file.getHid() != null) {
            getFileInfDAO().makeTransient(getFileInfDAO().findById(file.getHid(), true));
            Long count = getSmgsDAO().countAll(file.getPackDoc()) + getInvoiceDAO().countAll(file.getPackDoc()) + getFileInfDAO().countAll(file.getPackDoc());
            log.info("Pack_Doc has - " + count + " docs in CimSmgs and CimSmgsInvoice table and CimSmgsFileInf table");
            if(count == 0){
                log.info("No more docs with PackDoc hid " + file.getPackDoc().getHid() + ". Delete PackDoc");
                getPackDocDAO().makeTransient(getPackDocDAO().getById(file.getPackDoc().getHid(), true));
            }
        } else if (file.getPackDoc().getHid() != null) {
            getPackDocDAO().makeTransient(getPackDocDAO().findById(file.getPackDoc().getHid(), true));
        }*/
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
        PackDoc pack = new AvisoLoader().loadXML(fileData[0], getUser().getUsername(), getUser().getUsr().getGroup().getName(), new Route(getSearch().getRouteId()), getUser().getUsr().getGroup(), new BigDecimal(getSearch().getDocId()), getSearch().getType(), getSearch().getKod());
        smgs = pack.getCimSmgses().iterator().next(); // for status log
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String uploadAvisoDB() throws Exception {
        log.info("uploadAvisoDB");
        PackDoc pack = new ExchangeServer().receiveDBXML(fileData[0], getUser().getUsername(), getUser().getUsr().getGroup().getName(), new Route(getSearch().getRouteId()), getUser().getUsr().getGroup());
        smgs = pack.getCimSmgses().iterator().next(); // for status log
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String uploadNsi() throws Exception {
        log.info(getUploadFileName()[0]);
        SynchPNSI rp = new SynchPNSI();
        rp.setLogPath(
                new File(request.getSession().getServletContext().getRealPath("/")).getParentFile().getParentFile().getAbsolutePath() +
                        File.separator + "logs" + File.separator + "SynchPNSI" + File.separator
        );
        rp.init();

        if (fileData != null && fileData.length != 0) {
            rp.replaceTablePNSI(new FileInputStream(fileData[0]));
            setJSONData(Constants.convert2JSON_True());
        }
        return SUCCESS;
    }

    public String uploadTBC() throws IOException {
        log.info("uploadTBC");
        BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(fileData[0]), "UTF-8"));
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
        server.ReceiveTBCFile(stringBuilder.toString(), filename[0], getUser().getUsername(), getUser().getUsr().getGroup().getName(), route, getUser().getUsr().getGroup());
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private FileDAO fileDAO;
    private FileInfDAO fileInfDAO;
    private CimSmgsFileInf file;
    private CimSmgsFile files;
    private File[] fileData;
    private String[] contentType;
    private String[] filename;
    private InputStream inputStream;
    private OutputStream outputStreamt;
    private HttpServletRequest request;
    private CimSmgs smgs;
    private Route route;
    private FileNewDAO fileNewDAO;
    Integer userFlag;


    public String getEncodedFileName() throws UnsupportedEncodingException {
        String user_agent = request.getHeader("user-agent");
        boolean isIE = (user_agent.indexOf("MSIE") > -1);
        if (isIE) {
            return URLEncoder.encode(files.getFileName(), "utf-8");
        } else {
            return MimeUtility.encodeWord(files.getFileName());
        }
    }

    public Integer getUserFlag() {
        return userFlag;
    }

    public void setUserFlag(Integer userFlag) {
        this.userFlag = userFlag;
    }

    public void setUpload(File[] file) {
        this.fileData = file;
    }

    public File[] getUpload() {
        return this.fileData;
    }

    public void setUploadContentType(String[] contentType) {
        this.contentType = contentType;
    }

    public String[] getUploadContentType() {
        return this.contentType;
    }

    public void setUploadFileName(String[] filename) {
        this.filename = filename;
    }

    public String[] getUploadFileName() {
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

    public FileNewDAO getFileNewDAO() {
        return fileNewDAO;
    }

    public void setFileNewDAO(FileNewDAO fileNewDAO) {
        this.fileNewDAO = fileNewDAO;
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
