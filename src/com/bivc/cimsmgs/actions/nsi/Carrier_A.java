package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiCarrierDAO;
import com.bivc.cimsmgs.dao.NsiCarrierDAOAware;
import com.bivc.cimsmgs.db.nsi.Carrier;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class Carrier_A extends CimSmgsSupport_A implements NsiCarrierDAOAware {
    final static private Logger log = LoggerFactory.getLogger(Carrier_A.class);

    public String list() {
        log.info("list");
        List<Carrier> carriers = dao.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = dao.countAll(getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_NsiCarrier(carriers, total));
        return SUCCESS;
    }

    public String save() throws InvocationTargetException, NoSuchMethodException, IllegalAccessException {
        log.info("save");
        carrier.prepare4save();
        dao.makePersistent(carrier);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    public String delete() {
        log.info("delete");
        Carrier origin = dao.findById(carrier.getCarrUn(), false);
        dao.makeTransient(origin);
        setJSONData(Constants.convert2JSON_True());
        return SUCCESS;
    }

    private NsiCarrierDAO dao;
    private Carrier carrier;

    public Carrier getCarrier() {
        return carrier;
    }

    public void setCarrier(Carrier carrier) {
        this.carrier = carrier;
    }


    @Override
    public void setNsiCarrierDAO(NsiCarrierDAO dao) {
        this.dao = dao;
    }
}
