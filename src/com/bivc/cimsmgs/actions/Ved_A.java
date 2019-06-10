package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JsonUtils;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Ved;
import com.bivc.cimsmgs.doc2doc.Mapper;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import com.bivc.cimsmgs.formats.json.Serializer;
import net.sf.beanlib.hibernate.HibernateBeanReplicator;
import net.sf.beanlib.hibernate3.Hibernate3BeanReplicator;
import net.sf.beanlib.spi.PropertyFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Date;
import java.util.List;

import static com.bivc.cimsmgs.commons.Constants.*;

public class Ved_A extends CimSmgsSupport_A implements VedDAOAware/*, PackDocDAOAware*/ {

    private static final long serialVersionUID = -1977115763537716668L;

    final static private Logger log = LoggerFactory.getLogger(Ved_A.class);
    private FileInfDAO fileInfDAO;

    public String create() {
        log.info("create");
        ved = new Ved();
        return SUCCESS;
    }

    public String list() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        log.info("list");
        List<Ved> vedlist = getVedDAO().findAll(getLimit(), getStart(), getSearch(), getUser().getUsr());
        Long total = getVedDAO().countAll(getSearch(), getUser().getUsr());
//        setJSONData(Constants.convert2JSON_SmgsList(smgslist, total, /*getUser().getUsername(),*/ getSearch()));


//		log.info("");
//		List<CimSmgsInvoice> invlist = getInvoiceDAO().findAll(getHid_cs());
        // Integer total = getInvoiceDAO().countAll(getQuery());
        setJSONData(Constants.convert2JSON_VedList(vedlist, total, getUser()));
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
//        if(invoice.getRoute() == null){
//            log.error("Route object is not initialized for invoice table object with hid - {}", invoice.getHid());
//            throw new InfrastructureException("Error. Please contact support team.");
//        }

//        invoice.prepare4save();
        ved.prepare4save(getUser());
        getVedDAO().merge(ved);
        ved.prepareVags4Save();
        getVedDAO().merge(ved);

//        if (ved.getHid() != null) { // update
//            update();
//        } else { // insert
//            add();
//        }

//        saveEpd(invoice.getPackDoc(), EPD_ACTION.ADD);

        setJSONData(convert2JSON_Ved_Save_Results(ved));
        return SUCCESS;
    }

    public void add() {
//        if (invoice.hasPack()) { // пришли с др закладки, смгс еще нет, но пакет уже есть
        ved = getVedDAO().makePersistent(ved);
//        } else { // new smgs and new packDoc
//            PackDoc pack = new PackDoc(invoice.getRoute(), getUser().getUsr().getGroup());
//            pack.addInvoiceItem(invoice);
//            getPackDocDAO().makePersistent(invoice.getPackDoc());
//            log.debug("Added a PackDoc entry with information: {}", pack);
//        }

        log.debug("Added a INVOICE entry with hid: {}", ved.getHid());
    }

    private void update() {
        ved = getVedDAO().merge(ved);
        log.debug("Updated the information of a INVOICE entry with hid: {}", ved.getHid());
    }

//    public String deleteInvoice() {
//        log.info("deleteInvoice");
//
//        invoice = getInvoiceDAO().getById(invoice.getHid(), false);
//        if(invoice != null){
//            invoice.setDeleted(true);
//            getInvoiceDAO().makePersistent(invoice);
//        }
//        setJSONData(Constants.convert2JSON_True());
//        return SUCCESS;
//    }
//
    public String delete() {
        log.info("delete hid " + ved.getHid());
        Ved origin = getVedDAO().findById(ved.getHid(), false);
        getVedDAO().makeTransient(origin);

        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }



    public String view() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException {
        log.info("view");
        ved = getVedDAO().getById(ved.getHid(), false);
        return "invoice";
    }

    public String view1() throws IllegalAccessException, InvocationTargetException, NoSuchMethodException, IOException {
        log.info("view1");
        ved = vedDAO.findById2(ved);
        setJSONData(ved != null ? "{ved:" + JsonUtils.doJson(ved, "dd.MM.yyyy") + "}" : "");
        return SUCCESS;
    }

    // /////////// request params, objects data store

    private VedDAO vedDAO;
    private Ved ved;
//    private SmgsDAO smgsDAO;
    private Mapper epdAddMapper;
    private Mapper epdUpdateMapper;

    public void setEpdAddMapper(Mapper epdAddMapper) {
        this.epdAddMapper = epdAddMapper;
    }


    enum EPD_ACTION {ADD, UPDATE}
    /* private PackDocDAO packDocDAO;*/

    public VedDAO getVedDAO() {
        return vedDAO;
    }

    public Ved getVed() {
        return ved;
    }

    public void setVed(Ved ved) {
        this.ved = ved;
    }

//	public myUser getUser() {
//		return user;
//	}


//	private String jsonData;
//	private myUser user;

//	public String getJSONData() {
//		return jsonData;
//	}

    public void setVedDAO(VedDAO vedDAO) {
        this.vedDAO = vedDAO;
    }


//	public void setUser(myUser user) {
//		this.user = user;
//	}

    /*public void setPackDocDAO(PackDocDAO dao) {
        packDocDAO = dao;
    }

    public PackDocDAO getPackDocDAO() {
        return packDocDAO;
    }*/
}
