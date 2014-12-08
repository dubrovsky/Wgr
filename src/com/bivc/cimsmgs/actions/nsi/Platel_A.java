package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiPlatelDAO;
import com.bivc.cimsmgs.dao.NsiPlatelDAOAware;
import com.bivc.cimsmgs.db.NsiPlatel;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;

public class Platel_A extends CimSmgsSupport_A implements NsiPlatelDAOAware {

    private static final long serialVersionUID = 8351737173848450330L;
    final static private Logger log = LoggerFactory.getLogger(Platel_A.class);

    public String list() {
        log.info("");
        List<NsiPlatel> nsiList = getNsiPlatelDAO().findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = getNsiPlatelDAO().countAll(getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_NsiPlatel(nsiList, total));
        return SUCCESS;
    }

    private void prepare4save() {
        nsi.setDattr(new Date());
        nsi.setAltered(new Date());
        nsi.setUn(getUser().getUsername());
        nsi.setTrans(getUser().getUsr().getGroup().getName());
    }

    public String save() {
        log.info("");
        if (nsi == null)
            throw new BusinessException("Пустой набор данных");
        prepare4save();
        getNsiPlatelDAO().makePersistent(nsi);
        setJSONData(Constants.convert2JSON_Save_Results());
        return SUCCESS;
    }

    public String delete() {
        log.info("");
        NsiPlatel orig = getNsiPlatelDAO().findById(nsi.getHid(), false);
        getNsiPlatelDAO().makeTransient(orig);
        setJSONData(Constants.convert2JSON_Save_Results());
        return SUCCESS;

    }

    private NsiPlatelDAO dao;
    private NsiPlatel nsi;
//    private String jsonData;
//    private myUser user;

//    public void setUser(myUser user) {
//        this.user = user;
//    }

    public void setNsi(NsiPlatel nsi) {
        this.nsi = nsi;
    }

//    public myUser getUser() {
//        return user;
//    }


    public void setNsiPlatelDAO(NsiPlatelDAO dao) {
        this.dao = dao;
    }

    public NsiPlatelDAO getNsiPlatelDAO() {
        return dao;
    }

//    public String getJSONData() {
//        return jsonData;
//    }

    public NsiPlatel getNsi() {
        return nsi;
    }

}
