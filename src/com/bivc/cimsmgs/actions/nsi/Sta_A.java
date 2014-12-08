package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.StaE;
import com.bivc.cimsmgs.db.nsi.Sta;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * Date: 06.02.12
 * Time: 15:16
 */
public class Sta_A extends CimSmgsSupport_A implements NsiStaDAOAware, RoadDAOAware, ManagementDAOAware, StaEDAOAware{
    final static private Logger log = LoggerFactory.getLogger(Sta_A.class);

    public String list() {
        log.info("");
        List<Sta> sta = dao.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = dao.countAll(getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_NsiSta(sta, total));
        return SUCCESS;
    }

    public String save() throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        log.info("");
        if(staE.getRoad() != null && staE.getRoad().getRoadUn() != null){
            staE.setRoad(getRoadDAO().findById(staE.getRoad().getRoadUn(), false));
        }
        staE.setManagement(getManagementDAO().findById(staE.getManagement().getManagUn(), false));
        staE.prepare4save(getUser());
        getStaEDAO().makePersistent(staE);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String delete() {
        log.info("");
        StaE origin = getStaEDAO().findById(staE.getStUn(), false);
        getStaEDAO().makeTransient(origin);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private Sta sta;
    private StaE staE;
    private NsiStaDAO dao;
    private StaEDAO staEDAO;
    private RoadDAO roadDAO;
    private ManagementDAO managementDAO;
    
    public void setNsiStaDAO(NsiStaDAO dao) {
        this.dao = dao;
    }
    public NsiStaDAO getNsiStaDAO() {
        return dao;
    }

    public Sta getSta() {
        return sta;
    }

    public void setSta(Sta sta) {
        this.sta = sta;
    }

    public StaE getStaE() {
        return staE;
    }

    public void setStaE(StaE staE) {
        this.staE = staE;
    }

    public RoadDAO getRoadDAO() {
        return roadDAO;
    }

    public ManagementDAO getManagementDAO() {
        return managementDAO;
    }

    public void setRoadDAO(RoadDAO roadDAO) {
        this.roadDAO = roadDAO;
    }

    public void setManagementDAO(ManagementDAO managementDAO) {
        this.managementDAO = managementDAO;
    }

    public StaEDAO getStaEDAO() {
        return staEDAO;
    }

    public void setStaEDAO(StaEDAO staeDAO) {
        this.staEDAO = staeDAO;
    }
}
