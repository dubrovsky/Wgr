package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiSmgsG1DAO;
import com.bivc.cimsmgs.dao.NsiSmgsG1DAOAware;
import com.bivc.cimsmgs.db.NsiCsG1;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;

public class NsiG1_A extends CimSmgsSupport_A implements NsiSmgsG1DAOAware {

    private static final long serialVersionUID = -6995396599973103232L;
    final static private Logger log = LoggerFactory.getLogger(NsiG1_A.class);

    public String journal() {
        log.info("");
        return "journal";
    }

    public String list() {
        log.info("");
        List<NsiCsG1> nsiList = getNsiSmgsG1DAO().findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = getNsiSmgsG1DAO().countAll(getQuery(), getUser().getUsr());
        setJSONData(Constants.convert2JSON_NsiSmgsG1(nsiList, total));
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
        getNsiSmgsG1DAO().makePersistent(nsi);
        setJSONData(Constants.convert2JSON_Save_Results());
        return SUCCESS;
    }

    public String delete() {
        log.info("");
        NsiCsG1 orig = getNsiSmgsG1DAO().findById(nsi.getHid(), false);
        getNsiSmgsG1DAO().makeTransient(orig);
        setJSONData(Constants.convert2JSON_Save_Results());
        return SUCCESS;
    }

    private NsiSmgsG1DAO dao;
    private NsiCsG1 nsi;
//	private String jsonData;
//	private myUser user;

//	public void setUser(myUser user) {
//		this.user = user;
//	}
//
//	public myUser getUser() {
//		return user;
//	}

//	public String getJSONData() {
//		return jsonData;
//	}

    public NsiSmgsG1DAO getNsiSmgsG1DAO() {
        return dao;
    }

    public NsiCsG1 getNsi() {
        return nsi;
    }

    public void setNsiSmgsG1DAO(NsiSmgsG1DAO dao) {
        this.dao = dao;
    }

    public void setNsi(NsiCsG1 nsi) {
        this.nsi = nsi;
    }

}
