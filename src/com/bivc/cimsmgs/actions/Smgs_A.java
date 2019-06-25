package com.bivc.cimsmgs.actions;

import Ti.DataProcessing.Tools.DataProcessingTools;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Print;
import com.bivc.cimsmgs.dao.DocDirDAO;
import com.bivc.cimsmgs.dao.DocDirDAOAware;
import com.bivc.cimsmgs.dao.FieldsAccessFobiddenDAO;
import com.bivc.cimsmgs.dao.FieldsAccessFobiddenDAOAware;
import com.bivc.cimsmgs.dao.FileInfDAO;
import com.bivc.cimsmgs.dao.FileInfDAOAware;
import com.bivc.cimsmgs.dao.InvoiceDAO;
import com.bivc.cimsmgs.dao.InvoiceDAOAware;
import com.bivc.cimsmgs.dao.NsiSmgsG1DAO;
import com.bivc.cimsmgs.dao.NsiSmgsG1DAOAware;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.dao.SmgsDAOAware;
import com.bivc.cimsmgs.dao.StatusDAO;
import com.bivc.cimsmgs.dao.StatusDAOAware;
import com.bivc.cimsmgs.dao.StatusDirDAO;
import com.bivc.cimsmgs.dao.StatusDirDAOAware;
import com.bivc.cimsmgs.dao.UsrDAO;
import com.bivc.cimsmgs.dao.UsrDAOAware;
import com.bivc.cimsmgs.dao.hibernate.InvoiceDAOHib;
import com.bivc.cimsmgs.dao.hibernate.PackDocDAOHib;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.dto.CimSmgsTrainDateDTO;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import com.bivc.cimsmgs.formats.json.Deserializer;
import com.bivc.cimsmgs.formats.json.JsonViews;
import com.bivc.cimsmgs.formats.json.Serializer;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.config.entities.ResultConfig;
import org.apache.commons.lang3.text.WordUtils;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.bivc.cimsmgs.commons.Constants.*;

public class Smgs_A extends CimSmgsSupport_A implements SmgsDAOAware, NsiSmgsG1DAOAware, StatusDAOAware, StatusDirDAOAware, UsrDAOAware, DocDirDAOAware, InvoiceDAOAware, FileInfDAOAware, ServletRequestAware, FieldsAccessFobiddenDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Smgs_A.class);

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<CimSmgs> smgslist = getSmgsDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getSmgsDAO().countAll(getSearch(), getUser().getUsr());
        switch (getSearch().getType()) {
            case 1:
                setJSONData(convert2JSON_CimSmgsList(smgslist, total, getUser()));
                break;
            case 2:
            case 12:
            case 112:
                setJSONData(convert2JSON_SmgsList(smgslist, total, getUser()));
                break;
            case 3:
            case 6:
            case 10:
            case 11:
                setJSONData(convert2JSON_AvisoList(smgslist, total));
                break;
            case 14:
                setJSONData(convert2JSON_AvisoList(smgslist, total));
                break;
            case 8:
            case 4:
                setJSONData(convert2JSON_Gu29kList(smgslist, total));
                break;
            case 5:
            case 7:
            case 9:
                setJSONData(convert2JSON_CimList(smgslist, total));
                break;
            case 0:
                setJSONData(convert2JSON_EpdList(smgslist, total));
                break;
            /* case -1: // stat
            setJSONData(convert2JSON_StatList(smgslist, total));
            break;*/
            /*case 0:
                setJSONData(Constants.convert2JSON_EpdList1(smgslist, total));
                break;*/
        }

        return SUCCESS;
    }

    // get list of train numbrers and  count of smgs that are binded to the train in some period
    public String cimsmgsDate()
    {
        List<CimSmgsTrainDateDTO> dtos = getSmgsDAO().findTrainDate(getLimit(),getStart(),getSearch(),getUser().getUsr());
        setJSONData(convert2JSON_trainDate(dtos));
        return SUCCESS;
    }
// get list of smgs that are  binded to the chosen train in some period
    public String cimsmgsTrain()
    {
        List<CimSmgs> smgsHIDs = getSmgsDAO().findSmgsTrainDate(getLimit(),getStart(),getSearch(),getUser().getUsr());
        setJSONData(convert2JSON_trainDateList(smgsHIDs));
        return SUCCESS;
    }

    public String vags() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        List<CimSmgs> smgslist = getSmgsDAO().findByIds(getSearch().getIds());
        setJSONData(convert2JSON_4VedVagList(smgslist));
        return SUCCESS;
    }

    /*public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("save");


        Route route = getRouteDAO().findById(smgs.getRoute().getHid(), false);
        if (smgs.hasPack()) {
            smgs.setPackDoc(getPackDocDAO().findById(smgs.getPackDoc().getHid(), false));
        } else {
            PackDoc pack = new PackDoc();
            pack.setRoute(route);
            pack.setUsrGroupsDir(getUsrGroupsDirDAO().findById(getUser().getUsr().getGroup().getName(), false));
            pack.addCimSmgsItem(smgs);
        }
        smgs.setRoute(route);

        smgs.prepare4save(*//*getUser()*//*);
        if (smgs.getHid() != null) { // обновить
            smgs = getSmgsDAO().merge(smgs);
        } else { // new smgs
            if (smgs.hasPack()) { // пришли с др закладки, смгс еще нет
                smgs = getSmgsDAO().makePersistent(smgs);
            } else {
                getPackDocDAO().makePersistent(smgs.getPackDoc());
            }
        }

        setJSONData(convert2JSON_Smgs_Save_Results(smgs, "smgs"));
        return SUCCESS;
    }*/

    public String save() throws Exception {
        if(smgs.getRoute() == null){
            log.error("Route object is not initialized for CimSmgs table object with hid - {}", smgs.getHid());
            throw new InfrastructureException("Error. Please contact support team.");
        }

        smgs.prepare4save();
        if (smgs.getHid() != null) { // update
            update();
        } else { // insert
            add();
        }

        if(!smgs.isEpd()){  // save EPD only when smgs is not EPD
            saveEpd(smgs.getPackDoc(), EPD_ACTION.ADD);
        }

        setJSONData(convert2JSON_Smgs_Save_Results(smgs, "smgs", defaultSerializer.setView(getView()).setLocale(getLocale()).write(smgs)));
//        setJSONData(convert2JSON_Smgs_Save_Results(smgs, "smgs", cimSmgsKonListSerializer.setLocale(getLocale()).write(smgs)));
        return SUCCESS;
    }

    private void add() {
        if (smgs.hasPackDoc()) { // пришли с др закладки, смгс еще нет, но пакет уже есть
            smgs = getSmgsDAO().makePersistent(smgs);
        } else { // new smgs and new packDoc
            PackDoc pack = new PackDoc(smgs.getRoute(), getUser().getUsr().getGroup());
            pack.addCimSmgsItem(smgs);
            getPackDocDAO().makePersistent(smgs.getPackDoc());
            log.debug("Added a PackDoc entry with information: {}", pack);
        }

        log.debug("Added a Doc entry with hid: {}", smgs.getHid());
    }

    private void update() {
        smgs = getSmgsDAO().merge(smgs);
        log.debug("Updated the information of a Doc entry with hid: {}", smgs.getHid());
    }



    public String restore() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("restore");

//        if(smgs==null) {
//            String hIDsInput[]=getQuery1().split(",");
//            Long hIDs[]= DataProcessingTools.stringArrToLongList(hIDsInput);
//            // checking if record to delete is alone
//            if(hIDs!=null)
//            {
//                for(int i=0;i<hIDs.length;i++)
//                {
//                    smgs = getSmgsDAO().getById(hIDs[i], true);
//                    if(smgs != null){
//                        PackDoc packDoc = smgs.getPackDoc();
//                        packDoc.setDeleted(false);
//                        getPackDocDAO().makePersistent(packDoc);
//                    }
//                }
//            }
//        }
//        else {
//            smgs = getSmgsDAO().getById(smgs.getHid(), true);
//            PackDoc packDoc = smgs.getPackDoc();
////            PackDoc packDoc = getPackDocDAO().getById(getSmgs().getPackDoc().getHid(), false);
//            if (packDoc != null) {
//                packDoc.setDeleted(false);
//                getPackDocDAO().makePersistent(packDoc);
//            }
//        }
        restoreDelete(false);
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    /**
     * delete smgs record/multiple records
     * @return response
     * @throws IllegalAccessException
     * @throws InvocationTargetException
     * @throws NoSuchMethodException
     */
    public String delete() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("delete");
//        if(smgs==null) {
//            String hIDsInput[]=getQuery1().split(",");
//            Long hIDs[]= DataProcessingTools.stringArrToLongList(hIDsInput);
//            // checking if record to delete is alone
//            if(hIDs!=null)
//            {
//                for(int i=0;i<hIDs.length;i++)
//                {
//                    smgs = getSmgsDAO().getById(hIDs[i], true);
//                    if(smgs != null){
//                        PackDoc packDoc = smgs.getPackDoc();
//                        packDoc.setDeleted(true);
//                        getPackDocDAO().makePersistent(packDoc);
//                        setJSONData(Constants.convert2JSONUploadDoc9Result(smgs.getHid().toString()));
//                    }
//                }
//            }
//        }
//        else{
//            smgs = getSmgsDAO().getById(smgs.getHid(), true);
//            if(smgs != null){
//                PackDoc packDoc = smgs.getPackDoc();
//                packDoc.setDeleted(true);
//                getPackDocDAO().makePersistent(packDoc);
//            }
//        }
        restoreDelete(true);
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }
    private void restoreDelete(Boolean delete)
    {
        if(smgs==null) {
            String hIDsInput[]=getQuery1().split(",");
            Long hIDs[]= DataProcessingTools.stringArrToLongList(hIDsInput);
            // checking if record to delete is alone
            if(hIDs!=null)
            {
                for(int i=0;i<hIDs.length;i++)
                {
                    smgs = getSmgsDAO().getById(hIDs[i], true);
                    if(smgs != null){
                        PackDoc packDoc = smgs.getPackDoc();
                        packDoc.setDeleted(delete);
                        getPackDocDAO().makePersistent(packDoc);
//                        setJSONData(Constants.convert2JSONUploadDoc9Result(smgs.getHid().toString()));
                    }
                }
            }
        }
        else{
            smgs = getSmgsDAO().getById(smgs.getHid(), true);
            if(smgs != null){
                PackDoc packDoc = smgs.getPackDoc();
                packDoc.setDeleted(delete);
                getPackDocDAO().makePersistent(packDoc);
            }
        }
    }
    
    public String destroy() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("destroy");

        smgs = getSmgsDAO().getById(smgs.getHid(), true);
        if(smgs != null){
            PackDoc packDoc = smgs.getPackDoc();
            getPackDocDAO().makeTransient(packDoc);
        }

        /*if (smgs.getHid() != null) {
            getSmgsDAO().makeTransient(getSmgsDAO().getById(smgs.getHid(), true));

            // check pack_doc in smgs and invoice
            Long count = getSmgsDAO().countAll(smgs.getPackDoc()) + getInvoiceDAO().countAll(smgs.getPackDoc()) + getFileInfDAO().countAll(smgs.getPackDoc());
            log.info("Pack_Doc has - " + count + " docs in CimSmgs and CimSmgsInvoice and CimSmgsFileInf table");
            if (count < 2) {
                log.info("No more docs with PackDoc hid " + smgs.getPackDoc().getHid() + ". Delete PackDoc");
                getPackDocDAO().makeTransient(getPackDocDAO().getById(smgs.getPackDoc().getHid(), true));
            }
        } else if (smgs.getPackDoc().getHid() != null) {
            log.info("Delete PackDoc");
            getPackDocDAO().makeTransient(getPackDocDAO().getById(smgs.getPackDoc().getHid(), true));
        }*/

        setJSONData(convert2JSON_True());
        return SUCCESS;
    }


    public String view() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException {
        log.info("view");
        smgs = getSmgsDAO().findById2(smgs);
        Map<String, ResultConfig> resultsMap = ActionContext.getContext().getActionInvocation().getProxy().getConfig().getResults();
        String group = getUser().getUsr().getGroup().getName();
        if ("cimsmgs".equals(getTask())) {
            return "cimsmgsKaluga";
        } else if ("smgs".equals(getTask())) {
            if (resultsMap.get("smgs" + WordUtils.capitalize(group)) != null) {
                return "smgs" + WordUtils.capitalize(group);
            } else {
                return "smgsDobra";
            }
        } else if ("aviso".equals(getTask())) {
            return "aviso";
        } else if ("gu29k".equals(getTask())) {
            return "gu29k";
        } else if ("gu27v".equals(getTask())) {
            return "gu27v";
        } else if ("cim".equals(getTask())) {
            return "cim";
        } else if ("cmr".equals(getTask())) {
            return "cmr";
        } else if ("smgsnvr".equals(getTask())) {
            return "smgsnvr";
        }
        return getSearch().getDocType();
    }

    public String view1() throws Exception {
        log.info("view1");

        smgs = getSmgsDAO().findById2(smgs);
        setJSONData(doc2form().toString());
        return SUCCESS;
    }

    private StringBuilder doc2form() throws Exception {
        StringBuilder result = new StringBuilder();

        if (smgs != null) {
            Class view = getView();

            result.append("{");
            result.append("success:true,");
            result.append("doc:");
            if ("copy".equals(getTask())) {
                log.info("copy");

                CimSmgs smgsCopy = mapper.copy(smgs, CimSmgs.class);
                result.append(defaultSerializer.setLocale(getLocale()).setView(view).write(smgsCopy));
//                result.append(cimSmgsKonListSerializer.setLocale(getLocale()).write(smgsCopy));
            } else {
                log.info("view");
                result.append(defaultSerializer.setLocale(getLocale()).setView(view).write(smgs));
//                result.append(cimSmgsKonListSerializer.setLocale(getLocale()).write(smgs));
            }
            result.append("}");
        }

        return result;
    }

    private Class getView() {
        Class view = JsonViews.DefaultPerevozView.class;
        if(smgs.getType() == 1 || smgs.getType() == 10 || smgs.getType() == 7  || smgs.getType() == 12 || smgs.getType() == 11|| smgs.getType() == 14) {
            view = JsonViews.ContPerevozView.class;
            if (smgs.getG25() != null && smgs.getG25() == 1) {
                view = JsonViews.VagPerevozView.class;
            }
        }
        return view;
    }

    public String doc2EpdRewrite() throws Exception {
        PackDoc pack;
        if(!smgs.hasPackDoc()){
            log.info("DOC entity has empty PackDoc. Create new PackDoc.");
            if(!smgs.hasRoute()){
                throw new RuntimeException(String.format("DOC entity has empty ROUTE"));
            }
            pack = new PackDoc(smgs.getRoute(), getUser().getUsr().getGroup());
            getPackDocDAO().makePersistent(pack);
        } else {
            pack = smgs.getPackDoc();
        }
        log.debug("Copying DOC entity with id: {} to EPD", smgs.getHid());

        CimSmgs epd = saveEpd(pack, EPD_ACTION.UPDATE);

//        setJSONData(Constants.convert2JSON_True(epd.getHid().toString()));

        setJSONData(convert2JSON_Smgs_Save_Results(epd, "smgs", defaultSerializer.setLocale(getLocale()).write(epd)));
        return SUCCESS;
    }

    public String epd2DocRewrite() throws Exception {
        if(!smgs.hasPackDoc()){
            throw new RuntimeException("DOC entity has empty PackDoc. Nothing to copy. Please, save DOC at first.");
        }

        CimSmgs epd = getSmgsDAO().findDocInPackDoc(smgs.getPackDoc().getHid(), CimSmgs.EPD_DOC_TYPE_HID);
        if(epd == null){
            throw new RuntimeException(String.format("EPD entity is not found in PACKDOC with id: %s. Nothing to copy. Please, save DOC at first.", smgs.getPackDoc().getHid()));
        }

        log.debug("Copying EPD entity with id: {} to DOC entity with id: {}", epd.getHid(), smgs.getHid());
        epd2DocUpdateMapper.copy(epd, smgs);

        setJSONData(doc2form().toString());
        return SUCCESS;
    }

    private CimSmgs saveEpd(PackDoc packDoc, EPD_ACTION epd_action) {
        log.debug("Saving EPD...");
        CimSmgs epd = getSmgsDAO().findDocInPackDoc(packDoc.getHid(), CimSmgs.EPD_DOC_TYPE_HID);
        if(epd == null){
            log.debug("EPD entity is not found in PACKDOC with id: {}. Create new EPD entity", packDoc.getHid());
            epd = new CimSmgs();
        }

        log.debug("Copy DOC entity with id: {} to EPD entity with id: {}", smgs.getHid(), epd.getHid());

        switch (epd_action){
            case ADD:
                doc2EpdAddMapper.copy(smgs, epd);
                break;
            case UPDATE:
                doc2EpdUpdateMapper.copy(smgs, epd);
                break;
        }

        if(epd.getHid() == null){
            packDoc.addCimSmgsItem(epd);
            epd.prepare4save();
            getSmgsDAO().makePersistent(epd);
            log.debug("Added a EPD entry with hid: {}", epd.getHid());
        } else {
            log.debug("Updated the information of a EPD entry with hid: {}", epd.getHid());
        }
        return epd;
    }

    public String copySelectedDocs() throws IOException {
        log.info("copySelectedDocs");
        PackDoc packDoc = getPackDocDAO().findById(getSearch().getPackId(), false);

        List<Long> docHids = defaultDeserializer.read(new ArrayList<Long>(){}.getClass().getGenericSuperclass(), jsonRequest);
        PackDoc newPackDoc = null;
        for(CimSmgs cimSmgs: packDoc.getCimSmgses()){
            for(Long docHid: docHids){
                if(cimSmgs.getDocType1().longValue() == docHid) {
                    //copy and save smgs
                    smgs = doc2docAllMapper.copy(cimSmgs, CimSmgs.class);
                    if(newPackDoc != null){
                        smgs.setPackDoc(newPackDoc);
                    }
                    smgs.setRoute(cimSmgs.getRoute());
                    smgs.setType(cimSmgs.getType());
                    smgs.setDocType1(cimSmgs.getDocType1());
                    smgs.prepare4save();
                    add();
                    if(newPackDoc == null){
                        newPackDoc = smgs.getPackDoc();
                    }
                    docHids.remove(docHid);
                    break;
                }
            }
            if(docHids.size() == 0){
                break;
            }
        }

        if(docHids.size() > 0){
            for(CimSmgsInvoice inv: packDoc.getCsInvoices()){
                for(Long docHid: docHids){
                    if(inv.getDocType1().longValue() == docHid) {
                        //copy and save invoice
                        invoice = invice2InvoiceMapper.copy(inv, CimSmgsInvoice.class);

                        if(newPackDoc != null){
                            invoice.setPackDoc(newPackDoc);
                        }
                        invoice.setRoute(inv.getRoute());
                        invoice.setDocType1(inv.getDocType1());
                        invoice.prepare4save();

                        Invoice_A invoice_a = new Invoice_A();
                        invoice_a.setInvoice(invoice);
                        invoice_a.setUser(getUser());
                        invoice_a.setInvoiceDAO(new InvoiceDAOHib());
                        invoice_a.setPackDocDAO(new PackDocDAOHib());
                        invoice_a.add();

                        if(newPackDoc == null){
                            newPackDoc = invoice.getPackDoc();
                        }
                        break;
                    }
                }
            }
        }

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private String jsonRequest;
    private Deserializer defaultDeserializer;
    private Serializer defaultSerializer;
    private Serializer cimSmgsKonListSerializer;
    private CimSmgsInvoice invoice;
    private Mapper invice2InvoiceMapper;
    private Mapper doc2docAllMapper;
    private Mapper mapper;
    private Mapper epd2DocUpdateMapper;
    private Mapper doc2EpdAddMapper;
    private Mapper doc2EpdUpdateMapper;
    private InvoiceDAO invoiceDAO;
    private FileInfDAO fileInfDAO;
    private SmgsDAO smgsDAO;
    private FieldsAccessFobiddenDAO fieldsAccessFobiddenDAO;
    private StatusDAO statusDAO;
    private StatusDirDAO statusDirDAO;
    private CimSmgs smgs;
    private ArrayList<CimSmgs> smgsy;
    private NsiSmgsG1DAO g1DAO;
    private Integer copy1;
    private List<CimSmgs> smgsPack;
    private Print print;
    private UsrDAO usrDAO;
    private DocDirDAO docDirDAO;

    public void setJsonRequest(String jsonRequest) {
        this.jsonRequest = jsonRequest;
    }

    public void setDefaultDeserializer(Deserializer defaultDeserializer) {
        this.defaultDeserializer = defaultDeserializer;
    }

    public void setDefaultSerializer(Serializer defaultSerializer) {
        this.defaultSerializer = defaultSerializer;
    }

    public void setInvice2InvoiceMapper(Mapper invice2InvoiceMapper) {
        this.invice2InvoiceMapper = invice2InvoiceMapper;
    }

    public void setDoc2docAllMapper(Mapper doc2docAllMapper) {
        this.doc2docAllMapper = doc2docAllMapper;
    }

	public void setCimSmgsKonListSerializer(Serializer cimSmgsKonListSerializer) {
		this.cimSmgsKonListSerializer = cimSmgsKonListSerializer;
	}

	enum EPD_ACTION {ADD, UPDATE}

    public void setEpd2DocUpdateMapper(Mapper epd2DocUpdateMapper) {
        this.epd2DocUpdateMapper = epd2DocUpdateMapper;
    }

    public void setDoc2EpdAddMapper(Mapper doc2EpdAddMapper) {
        this.doc2EpdAddMapper = doc2EpdAddMapper;
    }

    public void setDoc2EpdUpdateMapper(Mapper doc2EpdUpdateMapper) {
        this.doc2EpdUpdateMapper = doc2EpdUpdateMapper;
    }

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public Integer getCopy1() {
        return copy1;
    }

    public List<CimSmgs> getSmgsPack() {
        return smgsPack;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }

    public void setCopy1(Integer copy1) {
        this.copy1 = copy1;
    }

    public void setSmgsPack(List<CimSmgs> smgsPack) {
        this.smgsPack = smgsPack;
    }

    public NsiSmgsG1DAO getNsiSmgsG1DAO() {
        return g1DAO;
    }

    public void setNsiSmgsG1DAO(NsiSmgsG1DAO g1DAO) {
        this.g1DAO = g1DAO;
    }

    public Print getPrint() {
        return print;
    }

    public void setPrint(Print print) {
        this.print = print;
    }

    public void setStatusDAO(StatusDAO dao) {
        statusDAO = dao;
    }

    public StatusDAO getStatusDAO() {
        return statusDAO;
    }

    public void setUsrDAO(UsrDAO dao) {
        usrDAO = dao;
    }

    public UsrDAO getUsrDAO() {
        return usrDAO;
    }

    public void setStatusDirDAO(StatusDirDAO dao) {
        statusDirDAO = dao;
    }

    public StatusDirDAO getStatusDirDAO() {
        return statusDirDAO;
    }

    public void setDocDirDAO(DocDirDAO dao) {
        docDirDAO = dao;
    }

    public DocDirDAO getDocDirDAO() {
        return docDirDAO;
    }

    public ArrayList<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public void setSmgsy(ArrayList<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }

    private HttpServletRequest request;

    @Override
    public void setServletRequest(HttpServletRequest httpServletRequest) {
        request = httpServletRequest;
    }

    @Override
    public void setFieldsAccessFobiddenDAO(FieldsAccessFobiddenDAO dao) {
        fieldsAccessFobiddenDAO = dao;
    }

    @Override
    public void setInvoiceDAO(InvoiceDAO dao) {
        this.invoiceDAO = dao;
    }

    public InvoiceDAO getInvoiceDAO() {
        return invoiceDAO;
    }

    @Override
    public void setFileInfDAO(FileInfDAO dao) {
        this.fileInfDAO = dao;
    }

    public FileInfDAO getFileInfDAO() {
        return fileInfDAO;
    }

    public void setMapper(Mapper mapper) {
        this.mapper = mapper;
    }
}
