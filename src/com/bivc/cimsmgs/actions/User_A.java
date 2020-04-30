package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class User_A extends CimSmgsSupport_A implements ServletRequestAware, UsrDAOAware, UsrGroupsDirDAOAware, UsrPrivilegsDirDAOAware {
    final static private Logger log = LoggerFactory.getLogger(User_A.class);

	private ObjectMapper objectMapper;
	private GridConfigDAO gridConfigDAO;
	private UsrDAO dao;

     public String userProvfile() {
        List<DocDir> docs = getUsrDAO().findDocs4User(getUser().getUsr());
        List<GridConfig> gridConfigs=getGridConfigDAO().findAll(getUser().getUsr());
        setJSONData(Constants.convert2JSON_UserProfile(gridConfigs,docs, getUser(),dao));
        return SUCCESS;
    }

    public String list() {
		log.info("list");
		List<Usr> usrlist;
		Long total;
		if(getQuery1()!=null) {
			 usrlist = getUsrDAO().findAll(getLimit(), getStart(), getQuery(),getQuery1(), getUser().getUsr());
			 total = getUsrDAO().countAll(getQuery(),getQuery1());
		}
		else {
			usrlist = getUsrDAO().findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
			total = getUsrDAO().countAll(getQuery());
		}
		setJSONData(Constants.convert2JSON_UsrList(usrlist, total));
		return SUCCESS;
	}

	/**
	 * Сохраняем настройки таблиц для данного пользователя
	 * @return Данные ответа
	 * @throws IOException
	 */
	public String saveGridConfig() throws IOException {
		log.info("saveGridConfig");
		List<GridConfig> gridConfigs;
//		objectMapper= new ObjectMapper();
		gridConfigs=objectMapper.readValue(getServletRequest().getParameter("jsonData"), objectMapper.getTypeFactory().constructCollectionType(List.class, GridConfig.class));

		if(gridConfigs.size()>0)
		{
			List<GridConfig>config2remove=gridConfigDAO.findAll(gridConfigs.get(0).getUn(),gridConfigs.get(0).getItemId());
			for (GridConfig config:config2remove) {
				gridConfigDAO.makeTransient(config);
			}
		}

		for (GridConfig config:gridConfigs) {
			gridConfigDAO.makePersistent(config);
		}
		setJSONData(Constants.convert2JSON_True( (objectMapper==null?"NULL":"NOTNULL")+"|"+(gridConfigDAO==null?"NULL":"NOTNULL")+"|"+getServletRequest().getParameter("jsonData")));
		return SUCCESS;
	}
	public String clearGridConfig()
	{
		String un=getServletRequest().getParameter("un");
		String gridId=getServletRequest().getParameter("gridId");
		List<GridConfig> gridConfigs= gridConfigDAO.findAll(un,gridId);
		for (GridConfig config:gridConfigs) {
			gridConfigDAO.makeTransient(config);
		}

		setJSONData(Constants.convert2JSON_True(un+"|"+gridId+"|"));
		return SUCCESS;
	}

	public String saveLang() {
		log.info("save");
		Usr u = getUsrDAO().findByName(getQuery1());
		u.setLng(getQuery());
		getUsrDAO().merge(u);
		HibernateUtil.commitTransaction();
//		setJSONData(getQuery()+"-"+getQuery1());
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
		List<UsrGroupsDir> usrGrList = getUsrGroupsDirDAO().findAll(getQuery());
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
		List<UsrPrivilegsDir> usrPrivList = getUsrPrivilegsDirDAO().findAll(getQuery());
		setJSONData(Constants.convert2JSON_UsrPrivList(usrPrivList));
		return SUCCESS;
	}

    public String unText() {
        log.info("unText");
        setJSONData(Constants.convert2JSON_UsrText(getUsrDAO().findById(getSearch().getUn(), false)));
        return SUCCESS;
    }


	private HttpServletRequest request;

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
	public void setServletRequest(HttpServletRequest request) {
		this.request = request;
	}

	public HttpServletRequest getServletRequest() {
		return request;
	}

	private UsrPrivilegsDirDAO daoUsPrivDir;
	public void setUsrPrivilegsDirDAO(UsrPrivilegsDirDAO dao) {
		this.daoUsPrivDir = dao;
	}
	public UsrPrivilegsDirDAO getUsrPrivilegsDirDAO() {
		return daoUsPrivDir;
	}

//	public void setObjectMapper(ObjectMapper objectMapper) {
//		this.objectMapper = objectMapper;
//	}
//	public ObjectMapper getObjectMapper() {
//		return objectMapper;
//	}


	public User_A(ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
	}

	public User_A() {
	}

	public void setGridConfigDAO(GridConfigDAO gridConfigDAO) {
		this.gridConfigDAO = gridConfigDAO;
	}



	public GridConfigDAO getGridConfigDAO() {
		return gridConfigDAO;
	}

	//
//	public GridConfig[] getGridConfigs() {
//		return gridConfigs;
//	}
//
//	public void setGridConfigs(GridConfig[] gridConfigs) {
//		this.gridConfigs = gridConfigs;
//	}
}
