package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import net.sf.beanlib.hibernate.HibernateBeanReplicator;
import net.sf.beanlib.hibernate3.Hibernate3BeanReplicator;
import net.sf.beanlib.spi.PropertyFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import static com.bivc.cimsmgs.commons.Constants.*;

public class Invoice_A extends CimSmgsSupport_A implements InvoiceDAOAware, SmgsDAOAware, FileInfDAOAware/*, PackDocDAOAware*/ {

    private static final long serialVersionUID = -1977115763537716668L;

    final static private Logger log = LoggerFactory.getLogger(Invoice_A.class);
    private FileInfDAO fileInfDAO;

    public String create() {
        log.info("create");
        invoice = new CimSmgsInvoice();
        return SUCCESS;
    }

    /*public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        log.info("save");
        Route route = getRouteDAO().findById(invoice.getRoute().getHid(), false);
        if(invoice.hasPack()){
            invoice.setPackDoc(getPackDocDAO().findById(invoice.getPackDoc().getHid(), false));
            invoice.getPackDoc().setDattr(new Date());
        } else {
            PackDoc pack = new PackDoc();
            pack.setRoute(route);
            pack.setUsrGroupsDir(getUsrGroupsDirDAO().findById(getUser().getUsr().getGroup().getName(), false));
            pack.addInvoiceItem(invoice);
            pack.setDattr(new Date());
        }
        invoice.setRoute(route);

        invoice.prepare4save(getUser());

        if (invoice.getHid() != null) { // обновить
            invoice = getInvoiceDAO().merge(invoice);
        } else {
            if(invoice.hasPack()) { // пришли с др закладки, смгс еще нет
                getInvoiceDAO().makePersistent(invoice);
            } else {
                getPackDocDAO().makePersistent(invoice.getPackDoc());
            }
            invoice.setStatus((byte)1);
        }

        setJSONData(Constants.convert2JSON_Smgs_Save_Results(invoice, "invoice"));
        return SUCCESS;
    }*/

    public String save() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        if(invoice.getRoute() == null){
            log.error("Route object is not initialized for invoice table object with hid - {}", invoice.getHid());
            throw new InfrastructureException("Error. Please contact support team.");
        }

        invoice.prepare4save();
        if (invoice.getHid() != null) { // update
            update();
        } else { // insert
            add();
        }

        saveEpd(invoice.getPackDoc(), EPD_ACTION.ADD);

        setJSONData(convert2JSON_Smgs_Save_Results(invoice, "invoice"));
        return SUCCESS;
    }

    private void add() {
        if (invoice.hasPack()) { // пришли с др закладки, смгс еще нет, но пакет уже есть
            invoice = getInvoiceDAO().makePersistent(invoice);
        } else { // new smgs and new packDoc
            PackDoc pack = new PackDoc(invoice.getRoute(), getUser().getUsr().getGroup());
            pack.addInvoiceItem(invoice);
            getPackDocDAO().makePersistent(invoice.getPackDoc());
            log.debug("Added a PackDoc entry with information: {}", pack);
        }

        log.debug("Added a INVOICE entry with hid: {}", invoice.getHid());
    }

    private void update() {
        invoice = getInvoiceDAO().merge(invoice);
        log.debug("Updated the information of a INVOICE entry with hid: {}", invoice.getHid());
    }

    public String delete() {
        log.info("delete");

        if (invoice.getHid() != null) {
            getInvoiceDAO().makeTransient(getInvoiceDAO().getById(invoice.getHid(), true));

            // check pack_doc in smgs and invoice
            Long count = getSmgsDAO().countAll(invoice.getPackDoc()) + getInvoiceDAO().countAll(invoice.getPackDoc()) + getFileInfDAO().countAll(invoice.getPackDoc());
            log.info("Pack_Doc has - " + count + " docs in CimSmgs and CimSmgsInvoice table and CimSmgsFileInf table");
            if(count == 0){
                log.info("No more docs with PackDoc hid " + invoice.getPackDoc().getHid() + ". Delete PackDoc");
                getPackDocDAO().makeTransient(getPackDocDAO().getById(invoice.getPackDoc().getHid(), true));
            }
        } else if (invoice.getPackDoc().getHid() != null) {
            log.info("Delete PackDoc");
            getPackDocDAO().makeTransient(getPackDocDAO().getById(invoice.getPackDoc().getHid(), true));
        }

        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<CimSmgsInvoice> invlist = getInvoiceDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getInvoiceDAO().countAll(getSearch(), getUser().getUsr());
//        setJSONData(Constants.convert2JSON_SmgsList(smgslist, total, /*getUser().getUsername(),*/ getSearch()));


//		log.info("");
//		List<CimSmgsInvoice> invlist = getInvoiceDAO().findAll(getHid_cs());
        // Integer total = getInvoiceDAO().countAll(getQuery());
        setJSONData(Constants.convert2JSON_InvoiceList(invlist, total, getUser()));
        return SUCCESS;
    }

    public String view() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("view");
        invoice = getInvoiceDAO().getById(invoice.getHid(), false);
        return "invoice";
    }

    public String view1() throws Exception {
        log.info("view1");
        invoice = getInvoiceDAO().findById2(invoice);
        setJSONData(doc2form().toString());
        return SUCCESS;
    }

    private StringBuilder doc2form() throws Exception {
        StringBuilder result = new StringBuilder();
        if(invoice != null){
            result.append("{");
            result.append("success:true,");
            result.append("doc:");
            if ("copy".equals(getTask())) {
                HibernateBeanReplicator r = new Hibernate3BeanReplicator(null, null,
                        new PropertyFilter() {
                            public boolean propagate(String propertyName, Method readerMethod) {
                                return
                                        !"route".equals(propertyName) &&
                                                !"packDoc".equals(propertyName) &&
                                                !"iftminLogs".equals(propertyName) &&
                                                !"iftminLogsBtlc".equals(propertyName) &&
                                                !"statuses".equals(propertyName);
                            }
                        });

                CimSmgsInvoice invoiceCopy = r.copy(invoice);
                invoiceCopy.setStatus(null);
                delHids(invoiceCopy);
                result.append(JsonUtils.doJson(invoiceCopy));
//                setJSONData("{doc:" + JsonUtils.doJson(invoiceCopy) + "}");
            } else {
                result.append(JsonUtils.doJson(invoice));
//                setJSONData(invoice != null ? "{doc:" + JsonUtils.doJson(invoice) + "}" : "");
            }
            result.append("}");
        }
        return result;
    }

    public String doc2EpdRewrite() throws IllegalAccessException, NoSuchMethodException, InvocationTargetException {
        PackDoc pack;
        if(!invoice.hasPackDoc()){
            log.info("DOC entity has empty PackDoc. Create new PackDoc.");
            if(!invoice.hasRoute()){
                throw new RuntimeException(String.format("Invoice entity has empty ROUTE"));
            }
            pack = new PackDoc(invoice.getRoute(), getUser().getUsr().getGroup());
            getPackDocDAO().makePersistent(pack);
        } else {
            pack = invoice.getPackDoc();
        }

        log.debug("Copying DOC entity with id: {} to EPD", invoice.getHid());

        CimSmgs epd = saveEpd(pack, EPD_ACTION.UPDATE);

        setJSONData(convert2JSON_Smgs_Save_Results(epd, "smgs"));
        return SUCCESS;
    }

    public String epd2DocRewrite() throws Exception {
        if(!invoice.hasPackDoc()){
            throw new RuntimeException(String.format("DOC entity has empty PackDoc. Nothing to copy. Please, save DOC at first."));
        }

        CimSmgs epd = getSmgsDAO().findDocInPackDoc(invoice.getPackDoc().getHid(), CimSmgs.EPD_DOC_TYPE_HID);
        if(epd == null){
            throw new RuntimeException(String.format("EPD entity is not found in PACKDOC with id: %s. Nothing to copy. Please, save DOC at first.", invoice.getPackDoc().getHid()));
        }

        log.debug("Copying EPD entity with id: {} to DOC entity with id: {}", epd.getHid(), invoice.getHid());
        epdUpdateMapper.copy(epd, invoice);

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

        log.debug("Copy DOC entity with id: {} to EPD entity", invoice.getHid());
        switch (epd_action){
            case ADD:
                epdAddMapper.copy(invoice, epd);
                break;
            case UPDATE:
                epdUpdateMapper.copy(invoice, epd);
                break;
        }

        if(epd.getHid() == null){
            packDoc.addCimSmgsItem(epd);
            getSmgsDAO().makePersistent(epd);
            log.debug("Added a EPD entry with hid: {}", epd.getHid());
        } else {
            log.debug("Updated the information of a EPD entry with hid: {}", epd.getHid());
        }
        return epd;
    }

    // /////////// request params, objects data store

    private InvoiceDAO invoiceDAO;
    private CimSmgsInvoice invoice;
    private SmgsDAO smgsDAO;
    private Mapper epdAddMapper;
    private Mapper epdUpdateMapper;

    public void setEpdAddMapper(Mapper epdAddMapper) {
        this.epdAddMapper = epdAddMapper;
    }

    public void setEpdUpdateMapper(Mapper epdUpdateMapper) {
        this.epdUpdateMapper = epdUpdateMapper;
    }

    enum EPD_ACTION {ADD, UPDATE}
    /* private PackDocDAO packDocDAO;*/

    public InvoiceDAO getInvoiceDAO() {
        // log.debug(invoiceDAO);
        return invoiceDAO;
    }

    public CimSmgsInvoice getInvoice() {
        return invoice;
    }

//	public myUser getUser() {
//		return user;
//	}

    public void setInvoice(CimSmgsInvoice invoice) {
        this.invoice = invoice;
    }

//	private String jsonData;
//	private myUser user;

//	public String getJSONData() {
//		return jsonData;
//	}

    public void setInvoiceDAO(InvoiceDAO dao) {
        invoiceDAO = dao;
    }

//	public void setUser(myUser user) {
//		this.user = user;
//	}

    public SmgsDAO getSmgsDAO() {
        return smgsDAO;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    @Override
    public void setFileInfDAO(FileInfDAO dao) {
        this.fileInfDAO = dao;
    }

    public FileInfDAO getFileInfDAO() {
        return fileInfDAO;
    }

    /*public void setPackDocDAO(PackDocDAO dao) {
        packDocDAO = dao;
    }

    public PackDocDAO getPackDocDAO() {
        return packDocDAO;
    }*/
}
