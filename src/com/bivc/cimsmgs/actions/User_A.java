package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.DocDir;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.UsrGroupsDir;
import com.bivc.cimsmgs.db.UsrPrivilegsDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class User_A extends CimSmgsSupport_A implements UsrDAOAware, UsrGroupsDirDAOAware, UsrPrivilegsDirDAOAware {
    final static private Logger log = LoggerFactory.getLogger(User_A.class);

     public String userProvfile() {
        List<DocDir> docs = getUsrDAO().findDocs4User(getUser().getUsr());
        setJSONData(Constants.convert2JSON_UserProfile(docs, getUser()));
        return SUCCESS;
    }

    public String list() {
		log.info("list");
		List<Usr> usrlist = getUsrDAO().findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = getUsrDAO().countAll(getQuery());
		setJSONData(Constants.convert2JSON_UsrList(usrlist, total));
		return SUCCESS;
	}

	public String save() {
		log.info("save");
		if (usr.getPs() == null) {
      Usr u = getUsrDAO().findPs(usr.getUn());
      usr.setPs(u.getPs());
      usr.setDatpw(u.getDatpw());
    }
		usr.saving(getUser().getUsr());
		getUsrDAO().merge(usr);
//		if (usr.getHid() != null) { // обновить
//			getUsrDAO().merge(usr);
//			log.info("Usr Update");
//		} else {
//			getUsrDAO().makePersistent(usr);
//			log.info("Usr Insert");
//		}
		setJSONData(Constants.convert2JSON_Usr_Save_Results(usr));
		return SUCCESS;
	}

	public String delete() {
		log.info("delete");
		usr = getUsrDAO().findById(getName(), false);
		getUsrDAO().makeTransient(usr);
		setJSONData(Constants.convert2JSON_Usr_Save_Results(usr));
		return SUCCESS;
	}

	public String listGr() {
		log.info("listGr");
		List<UsrGroupsDir> usrGrList = getUsrGroupsDirDAO().findAll();
		setJSONData(Constants.convert2JSON_UsrGrList(usrGrList));
		return SUCCESS;
	}

	public String saveGr() {
		log.info("saveGr");
		usrGr.saving(getUser().getUsr());
		getUsrGroupsDirDAO().makePersistent(usrGr);
		setJSONData(Constants.convert2JSON_UsrGr_Save_Results(usrGr));
		return SUCCESS;
	}

	public String deleteGr() {
		log.info("deleteGr");
		List<String> hids = new ArrayList<String>();
		for (UsrGroupsDir elem : usrGrPack) {
			 usrGr = getUsrGroupsDirDAO().findById(elem.getName(), false);
			 getUsrGroupsDirDAO().makeTransient(usrGr);
			 hids.add(elem.getName());
		}
		log.info("delete " + hids.size());
		setJSONData(Constants.convert2JSON_Smgs_Save_Results());
		return SUCCESS;
	}
	
	public String listPriv() {
		log.info("listPriv");
		List<UsrPrivilegsDir> usrPrivList = getUsrPrivilegsDirDAO().findAll();
		setJSONData(Constants.convert2JSON_UsrPrivList(usrPrivList));
		return SUCCESS;
	}

    public String unText() {
        log.info("unText");
        setJSONData(Constants.convert2JSON_UsrText(getUsrDAO().findById(getSearch().getUn(), false)));
        return SUCCESS;
    }

	private UsrDAO dao;

	public void setUsrDAO(UsrDAO dao) {
		this.dao = dao;
	}

	public UsrDAO getUsrDAO() {
		return dao;
	}

	private Usr usr;

	public Usr getUsr() {
		return usr;
	}

	public void setUsr(Usr usr) {
		this.usr = usr;
	}

	private UsrGroupsDirDAO daoUsGrDir;

	public void setUsrGroupsDirDAO(UsrGroupsDirDAO dao) {
		this.daoUsGrDir = dao;
	}

	public UsrGroupsDirDAO getUsrGroupsDirDAO() {
		return daoUsGrDir;
	}

	private UsrGroupsDir usrGr;

	public void setUsrGr(UsrGroupsDir usrGr) {
		this.usrGr = usrGr;
	}

	public UsrGroupsDir getUsrGr() {
		return usrGr;
	}

	private List<UsrGroupsDir> usrGrPack;

	public List<UsrGroupsDir> getUsrGrPack() {
		return usrGrPack;
	}

	public void setUsrGrPack(List<UsrGroupsDir> usrGrPack) {
		this.usrGrPack = usrGrPack;
	}
	
	private UsrPrivilegsDir usrPriv;
	
	public void setUsrPriv(UsrPrivilegsDir usrPriv) {
		this.usrPriv = usrPriv;
	}

	public UsrPrivilegsDir getUsrPriv() {
		return usrPriv;
	}

	private UsrPrivilegsDirDAO daoUsPrivDir;
	public void setUsrPrivilegsDirDAO(UsrPrivilegsDirDAO dao) {
		this.daoUsPrivDir = dao;
	}
	public UsrPrivilegsDirDAO getUsrPrivilegsDirDAO() {
		return daoUsPrivDir;
	}
}
