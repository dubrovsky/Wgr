package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.LoggingEvent;
import com.bivc.cimsmgs.db.Status;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.bivc.cimsmgs.commons.Constants.convert2JSON_True;
/**
 * Date: 17.04.12
 * Time: 13:39
 */
public class Status_A extends CimSmgsSupport_A implements StatusDAOAware, UsrDAOAware, SmgsDAOAware, LoggingEventDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Status_A.class);

    public String history(){
        log.info("history");
        List<Status> list = new ArrayList<Status>();
        if(getSearch().getDocType() != null){
            list = dao.history(getSearch().getHid(), getSearch().getDocType());
        }
        setJSONData(Constants.convert2JSON_History(list));
        return SUCCESS;
    }

    public String agreed() {
        log.info("agreed");
        status1.setDatBegin(new Date());
        status1.setUsr(usrDAO.findById(getUser().getUsername(), false));
        getStatusDAO().makePersistent(status1);
        switch (status1.getStatusDir().getHid().intValue()) {
            case 3:
                getStatusDAO().disableStatus1(status1.getHidCs(), status1.getDocDir().getHid());
                break;
            case 6:
                getStatusDAO().disableStatus2(status1.getHidCs(), status1.getDocDir().getHid());
                break;
        }
        smgsDAO.changeStatus(status1.getStatusDir().getHid(), status1.getHidCs());

        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String changeTbcStatus(){
        log.info("changeTbcStatus");
        smgsDAO.changeTbcStatus(smgs.getTbcStatus(), smgs.getHid());
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String changeFtsStatus(){
        log.info("changeFtsStatus");
        smgsDAO.changeFtsStatus(smgs.getFtsStatus(), smgs.getHid());
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String changeIftminStatus(){
        log.info("changeIftminStatus");
        smgsDAO.changeStatus(new BigDecimal(getStatus()), new Long(smgs.getHid()));
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String changeBtlcStatus(){
        log.info("changeBtlcStatus");
        smgsDAO.changeBtlcStatus(smgs.getBtlc_status(), new Long(smgs.getHid()));
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String changeTdgStatus(){
        log.info("changeTdgStatus");
        smgsDAO.changeTdgStatus(smgs.getTdg_status1(), new Long(smgs.getHid()));
        setJSONData(convert2JSON_True());
        return SUCCESS;
    }

    public String logs(){
        log.info("logs");
        List<LoggingEvent> logs = getLoggingEventDAO().findAll1(getLimit(), getStart(), getSearch());
        Long total = getLoggingEventDAO().countAll(getSearch());
        setJSONData(Constants.convert2JSON_Logs(logs, total));
        return SUCCESS;
    }

    private Status status1;
    private CimSmgs smgs;
    private StatusDAO dao;
    private UsrDAO usrDAO;
    private SmgsDAO smgsDAO;
    private LoggingEventDAO loggingEventDAO;

    public void setStatusDAO(StatusDAO dao) {
        this.dao = dao;
    }

    public StatusDAO getStatusDAO() {
        return dao;
    }

    public Status getStatus1() {
        return status1;
    }

    public void setStatus1(Status status) {
        this.status1 = status;
    }

    public void setUsrDAO(UsrDAO dao) {
        usrDAO = dao;
    }

    public void setSmgsDAO(SmgsDAO dao) {
        smgsDAO = dao;
    }

    public void setLoggingEventDAO(LoggingEventDAO dao) {
        this.loggingEventDAO = dao;
    }

    public LoggingEventDAO getLoggingEventDAO(){
        return this.loggingEventDAO;
    }

    public CimSmgs getSmgs() {
        return smgs;
    }

    public void setSmgs(CimSmgs smgs) {
        this.smgs = smgs;
    }
}
