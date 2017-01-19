package com.bivc.cimsmgs.actions.nsi;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.JSONAware;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Locale;

public class Nsi_A extends CimSmgsSupport_A implements JSONAware, NsiSmgsGngDAOAware, NsiGngDeDAOAware, NsiSmgsStEuDAOAware, NsiSmgsStCisDAOAware,
        NsiSmgsFieldsOptDAOAware, NsiSmgsCompanyDAOAware, NsiSmgsEtsngcodeDAOAware, NsiCountriesDAOAware, /*NsiStaDAOAware,*/ NsiCurrencyDAOAware,
        NsiTnvedDAOAware, NsiDelivDAOAware, NsiUpakDAOAware, UsrGroupsDirDAOAware, RouteDocsDAOAware, NsiDirDAOAware, RoadDAOAware,
        ManagementDAOAware, KarantinDAOAware, VeterinDAOAware, DangCodeDAOAware, CargoGngDAOAware, RouteDAOAware, ProjectDAOAware {

    private static final long serialVersionUID = 5694050199844701896L;
    final static private Logger log = LoggerFactory.getLogger(Nsi_A.class);


    /*public String buttons() {
        log.info("");
        String params[] = new String[2];
        if ("g1".equals(getSearch().getForm())) {
            params[0] = "NsiG1_save.do";
            params[1] = "NsiG1_delete.do";
        } else if ("plat".equals(getSearch().getForm())) {
            params[0] = "Platel_save.do";
            params[1] = "Platel_delete.do";
        }
        getSearch().setParams(params);
        return "btns";
    }*/
    public String listDir() {
        log.info("listDir");
        List<NsiDir> list = getNsiDirDAO().findAll(getLimit(), getStart(), getSearch());
        Long total = getNsiDirDAO().countAll();
        setJSONData(Constants.convert2JSON_NsiDirList(list, total));
        return SUCCESS;
    }

    public String gng() {
        log.info("gng");
        List<CargoGng> gng = gngDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = gngDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiSmgsGng(gng, total);
        return SUCCESS;
    }

    public String gngDe() {
        log.info("gng DE");
        List<NsiGngDe> gng = gngDeDAO.findAll(getLimit(), getStart(), getQuery());
        Long total = gngDeDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiGngDe(gng, total);
        return SUCCESS;
    }

    public String gngWithCode() {
        log.info("gng with code " + getQuery());
        if(StringUtils.isBlank(getQuery())){
            throw new IllegalArgumentException("Empty code gng");
        }

        if(getLocale().equals(Locale.GERMAN)){
            List<CargoGng> gng = gngDAO.findAll(getQuery());
            jsonData = Constants.convert2JSON_NsiGng(gng);
        } else {
            List<NsiGngDe> gng = gngDeDAO.findAll(getQuery());
            jsonData = Constants.convert2JSON_NsiGngDe(gng);
        }

        return SUCCESS;
    }

    public String etsng() {
        log.info("etsng");
        List<Cargo> gng = etsngDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = etsngDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiSmgsEtsng(gng, total);
        return SUCCESS;
    }

    public String company() {
        log.info("company");
        List<Company> company = companyDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = companyDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiCompany(company, total);
        return SUCCESS;
    }

    public String stEu() {
        log.info("stEu");
        List<NsiStEu> stEu = stEuDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = stEuDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiStEu(stEu, total);
        return SUCCESS;
    }

    public String stCis() {
        log.info("stCis");
        List<Railroadstation> stCis = stCisDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = stCisDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiStCis(stCis, total);
        return SUCCESS;
    }

    /*public String sta() {
         log.info("");
         List<Sta> sta = staDAO.findAll(getLimit(), getStart(), getQuery());
         Long total = staDAO.countAll(getQuery());
         jsonData = Constants.convert2JSON_NsiSta(sta, total);
         return SUCCESS;
     }*/

    public String fieldsOpt() {
        log.info("fieldsOpt");
        List<NsiFieldsOpt> fieldsOpt = fieldsOptDAO.findAll(getLimit(), getStart(), getQuery(), getType());
        Long total = fieldsOptDAO.countAll(getQuery(), getType());
        jsonData = Constants.convert2JSON_NsiFieldsOpt(fieldsOpt, total);
        return SUCCESS;
    }

    public String countries() {
        log.info("countries");
        List<NsiCountries> company = countryDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = countryDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiCountries(company, total);
        return SUCCESS;
    }

    public String countriesGd() {
        log.info("countriesGd");
        List<Road> company = roadDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = roadDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiCountriesGd(company, total);
        return SUCCESS;
    }

    public String dangCode() {
        log.info("dangCode");
        List<DangCode> company = dangCodeDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = dangCodeDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiDangCode(company, total);
        return SUCCESS;
    }

    public String cargoGng() {
        log.info("cargoGng");
        List<CargoGng> list = cargoGngDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = cargoGngDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_CargoGng(list, total);
        return SUCCESS;
    }

    public String karantin() {
        log.info("karantin");
        List<Karantin> company = karantinDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = karantinDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiKarantin(company, total);
        return SUCCESS;
    }

    public String veterin() {
        log.info("veterin");
        List<Veterin> company = veterinDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = veterinDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiVeterin(company, total);
        return SUCCESS;
    }

    public String currency() {
        log.info("currency");
        List<NsiCurrency> currency = currencyDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = currencyDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiCurrency(currency, total);
        return SUCCESS;
    }

    public String tnved() {
        log.info("tnved");
        List<NsiTnved4> currency = tnvedDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = tnvedDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiTnved(currency, total);
        return SUCCESS;
    }

    public String deliv() {
        log.info("deliv");
        List<NsiDeliv> deliv = delivDAO.findAll(getLimit(), getStart(), getQuery());
        Long total = delivDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiDeliv(deliv, total);
        return SUCCESS;
    }

    public String upak() {
        log.info("upak");
        List<NsiUpak> upak = upakDAO.findAll(getLimit(), getStart(), getQuery());
        Long total = upakDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiUpak(upak, total);
        return SUCCESS;
    }

    public String groups() {
        log.info("groups");
        List<UsrGroupsDir> groups = groupsDAO.findAll(getQuery());
        Long total = groupsDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiGroups(groups, total);
        return SUCCESS;
    }

    public String routeDocs() {
        log.info("routeDocs");
        List<DocDir> docs = routeDocsDAO.findAll(getLimit(), getStart(), getSearch());
        jsonData = Constants.convert2JSON_NsiRouteDocs(docs);
        return SUCCESS;
    }

    public String road() {
        log.info("road");
        List<Road> road = roadDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = roadDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiRoad(road, total);
        return SUCCESS;
    }

    public String management() {
        log.info("management");
        List<Management> management = managementDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = managementDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiManagement(management, total);
        return SUCCESS;
    }

    public String route() {
        log.info("route");
        List<Route> route = routeDAO.findAll(getLimit(), getStart(), getQuery(), getSearch());
        Long total = routeDAO.countAll(getQuery(), getSearch());
        jsonData = Constants.convert2JSON_NsiRoute(route, total);
        return SUCCESS;
    }

    public String project() {
        log.info("project");
        List<Project> project = projectDAO.findAll(getLimit(), getStart(), getQuery(), getUser().getUsr());
        Long total = projectDAO.countAll(getQuery());
        jsonData = Constants.convert2JSON_NsiProject(project, total);
        return SUCCESS;
    }

    private String jsonData;
    private RoadDAO roadDAO;
    private ManagementDAO managementDAO;
    private RouteDAO routeDAO;
    private ProjectDAO projectDAO;
    private NsiSmgsGngDAO gngDAO;
    private NsiGngDeDAO gngDeDAO;
    private NsiSmgsStEuDAO stEuDAO;
    private NsiSmgsStCisDAO stCisDAO;
    private NsiSmgsFieldsOptDAO fieldsOptDAO;
    private NsiSmgsCompanyDAO companyDAO;
    private NsiSmgsEtsngcodeDAO etsngDAO;
    private NsiCountriesDAO countryDAO;
    //	private NsiStaDAO staDAO;
    private NsiCurrencyDAO currencyDAO;
    private NsiTnvedDAO tnvedDAO;
    private NsiDelivDAO delivDAO;
    private NsiUpakDAO upakDAO;
    private UsrGroupsDirDAO groupsDAO;
    private RouteDocsDAO routeDocsDAO;
    private NsiDirDAO nsiDirDAO;

    public String getJSONData() {
        return jsonData;
    }

    public String getJsonData() {
        return jsonData;
    }

    public void setNsiCountriesDAO(NsiCountriesDAO countryDAO) {
        this.countryDAO = countryDAO;
    }

    public NsiCountriesDAO getNsiCountriesDAO() {
        return countryDAO;
    }

    public NsiSmgsGngDAO getNsiSmgsGngDAO() {
        return gngDAO;
    }

    public void setNsiSmgsGngDAO(NsiSmgsGngDAO gngDAO) {
        this.gngDAO = gngDAO;
    }

    public NsiSmgsStEuDAO getNsiSmgsStEuDAO() {
        return stEuDAO;
    }

    public void setNsiSmgsStEuDAO(NsiSmgsStEuDAO stEuDAO) {
        this.stEuDAO = stEuDAO;
    }

    public NsiSmgsStCisDAO getNsiSmgsStCisDAO() {
        return stCisDAO;
    }

    public void setNsiSmgsStCisDAO(NsiSmgsStCisDAO stCisDAO) {
        this.stCisDAO = stCisDAO;
    }

    public NsiSmgsFieldsOptDAO getNsiSmgsFieldsOptDAO() {
        return fieldsOptDAO;
    }

    public void setNsiSmgsFieldsOptDAO(NsiSmgsFieldsOptDAO fieldsOptDAO) {
        this.fieldsOptDAO = fieldsOptDAO;
    }

    public void setNsiSmgsCompanyDAO(NsiSmgsCompanyDAO dao) {
        companyDAO = dao;
    }

    public NsiSmgsCompanyDAO getNsiSmgsCompanyDAO() {
        return companyDAO;
    }

    public void setNsiSmgsEtsngcodeDAO(NsiSmgsEtsngcodeDAO dao) {
        etsngDAO = dao;
    }

    public NsiSmgsEtsngcodeDAO getNsiSmgsEtsngcodeDAO() {
        return etsngDAO;
    }

//	public void setNsiStaDAO(NsiStaDAO dao) {
//		this.staDAO = dao;
//	}
//
//	public NsiStaDAO getNsiStaDAO() {
//		return staDAO;
//	}

    public void setCurrencyDAO(NsiCurrencyDAO currencyDAO) {
        this.currencyDAO = currencyDAO;
    }

    public void setTnvedDAO(NsiTnvedDAO tnvedDAO) {
        this.tnvedDAO = tnvedDAO;
    }

    public void setDelivDAO(NsiDelivDAO delivDAO) {
        this.delivDAO = delivDAO;
    }

    public void setUpakDAO(NsiUpakDAO upakDAO) {
        this.upakDAO = upakDAO;
    }

    public void setUsrGroupsDirDAO(UsrGroupsDirDAO dao) {
        this.groupsDAO = dao;
    }

    public void setRouteDocsDAO(RouteDocsDAO dao) {
        this.routeDocsDAO = dao;
    }

    public void setNsiDirDAO(NsiDirDAO dao) {
        nsiDirDAO = dao;
    }

    public NsiDirDAO getNsiDirDAO() {
        return nsiDirDAO;
    }

    public RoadDAO getRoadDAO() {
        return roadDAO;
    }

    public void setRoadDAO(RoadDAO roadDAO) {
        this.roadDAO = roadDAO;
    }

    public ManagementDAO getManagementDAO() {
        return managementDAO;
    }

    public void setManagementDAO(ManagementDAO managementDAO) {
        this.managementDAO = managementDAO;
    }

    private DangCodeDAO dangCodeDAO;
    private KarantinDAO karantinDAO;
    private VeterinDAO veterinDAO;


    public void setDangCodeDAO(DangCodeDAO dangCodeDAO) {
        this.dangCodeDAO = dangCodeDAO;
    }

    public void setKarantinDAO(KarantinDAO karantinDAO) {
        this.karantinDAO = karantinDAO;
    }

    public void setVeterinDAO(VeterinDAO veterinDAO) {
        this.veterinDAO = veterinDAO;
    }

    CargoGngDAO cargoGngDAO;

    public void setCargoGngDAO(CargoGngDAO dao) {
        this.cargoGngDAO = dao;
    }

    public RouteDAO getRouteDAO() {
        return routeDAO;
    }

    public void setRouteDAO(RouteDAO routeDAO) {
        this.routeDAO = routeDAO;
    }

    public ProjectDAO getProjectDAO() {
        return projectDAO;
    }

    public void setProjectDAO(ProjectDAO projectDAO) {
        this.projectDAO = projectDAO;
    }

    @Override
    public void setNsiGngDeDAO(NsiGngDeDAO dao) {
        this.gngDeDAO = dao;
    }
}
