package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.*;
import com.bivc.cimsmgs.dao.*;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.ky.Gruz;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontGruzHistory;
import com.opensymphony.xwork2.ActionSupport;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.Map;
//import com.bivc.isgp.db.User;
//import com.bivc.isgp.dao.UserAware;

public class CimSmgsSupport_A extends ActionSupport implements JSONAware, UserAware, PackDocDAOAware, RouteDAOAware, UsrGroupsDirDAOAware //implements /*SessionAware,*/// UserAware //, ServletRequestAware
{

    public static final String IFTMIN = "iftmin";
    public static final String UPDATE = "update";
    public static final String LIST = "list";
    public static final String VIEW = "view";
    public static final String DOC = "doc";
    public static final String PDF = "pdf";
    public static final String PDF_BACK = "pdf_back";
    public static final String DOC_BLANKOFF = "doc_blankoff";
    public static final String PDF_BLANKOFF = "pdf_blankoff";
    public static final String DOC_BACK = "doc_back";
    public static final String DOC_BACK_BLANKOFF = "doc_back_blankoff";
    public static final String PDF_BACK_BLANKOFF = "pdf_back_blankoff";
    public static final String DOC_DOP = "doc_dop";
    public static final String DOC_DOP_BLANKOFF = "doc_dop_blankoff";
    public static final String DOC_KON = "doc_kon";
    public static final String DOC_VAG = "doc_vag";
    public static final String STATUS = "status";
    public static final String ERROR1 = "error1";
    public static final String BLANK = "blank";

    private BigDecimal docId;
    private Byte status;

    private UsrGroupsDirDAO usrGroupsDirDAO;

    public void setUsrGroupsDirDAO(UsrGroupsDirDAO dao) {
        usrGroupsDirDAO = dao;
    }

    public UsrGroupsDirDAO getUsrGroupsDirDAO() {
        return usrGroupsDirDAO;
    }

    private PackDocDAO packDocDAO;

    public void setPackDocDAO(PackDocDAO dao) {
        packDocDAO = dao;
    }

    public PackDocDAO getPackDocDAO() {
        return packDocDAO;
    }

    private RouteDAO routeDAO;

    public void setRouteDAO(RouteDAO dao) {
        routeDAO = dao;
    }

    public RouteDAO getRouteDAO() {
        return routeDAO;
    }

    private String jsonData;

    public String getJSONData() {
        return jsonData;
    }

    public void setJSONData(String jsonData) {
        this.jsonData = jsonData;
    }

    private myUser user;

    public void setUser(myUser user) {
        this.user = user;
    }

    public myUser getUser() {
        return user;
    }


    public String cancel() {
        return Constants.CANCEL;
    }

    public String back() {
        return Constants.BACK;
    }

//  // ---- SessionAware ----
//
//    /**
//     * <p>Field to store session context, or its proxy.</p>
//     */
//    private Map session;
//
//    /**
//     * <p>Store a new session context.</p>
//     *
//     * @param value A Map representing session state
//     */
//    public void setSession(Map value) {
//        session = value;
//    }
//
//    /**
//     * <p>Provide session context.</p>
//     *
//     * @return session context
//     */
//    public Map getSession() {
//        return session;
//    }

    // ---- Token property (utilized by UI) ----

    /**
     * <p>Field to store double-submit guard.</p>
     */
    private String token = null;


    /**
     * <p>Provide Token.</p>
     *
     * @return Returns the token.
     */
    public String getToken() {
        return token;
    }

    /**
     * <p>Store new Token.</p>
     *
     * @param value The token to set.
     */
    public void setToken(String value) {
        token = value;
    }

    // ---- Task property (utilized by UI) ----

    /**
     * <p>Field to store workflow task.</p>
     * <p/>
     * <p>The Task is used to track the state of the CRUD workflows. It can be
     * set to Constant.CREATE, Constant.EDIT, or Constant.DELETE as
     * needed.</p>
     */
    private String task = null;
    private Integer limit;
    private Integer start;
    private Integer type;
    private Search search;
    //    private Filter filter;
    private String query;
    private String query1;
    private Long hid_cs;
    private Long hid;
    private String name;

    /**
     * <p>Provide worklow task.</p>
     *
     * @return Returns the task.
     */
    public String getTask() {
        return task;
    }

    public Integer getLimit() {
        return limit;
    }

    public Integer getStart() {
        return start;
    }

    public Integer getType() {
        return type;
    }

    public Search getSearch() {
        return search;
    }

    public String getQuery() {
        return query;
    }

    public String getQuery1() {
        return query1;
    }

//    public Filter getFilter() {
//        return filter;
//    }

    public Long getHid() {
        return hid;
    }

    public Long getHid_cs() {
        return hid_cs;
    }

    /**
     * <p>Store new workflow task.</p>
     *
     * @param value The task to set.
     */
    public void setTask(String value) {
        task = value;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public void setSearch(Search search) {
        this.search = search;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public void setQuery1(String query1) {
        this.query1 = query1;
    }

//    public void setFilter(Filter filter) {
//        this.filter = filter;
//    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setHid_cs(Long hid_cs) {
        this.hid_cs = hid_cs;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    //    public String getDatDisplay(Date date)
//    {
//      return getDatDisplay(date, null);
//    }
//
//    public String getDatDisplay(Date date, String formats)
//    {
//      if(date == null)
//        return null;
//      String format;
//      if(formats == null || formats.equals(Constants.DATE_FORMAT_FULL))
//        format = "dd.MM.yyyy HH:mm:ss";
//      else if(formats.equals(Constants.DATE_FORMAT_NARROW))
//        format = "dd.MM.yyyy";
//      else
//        format = formats;
//
//      return new SimpleDateFormat(format).format(date);
//    }
///////////////////
//    private User user;
//
//
//    public User getUser()
//    {
//      return user;
//    }
//
//
//    public void setUser(User user)
//    {
//      this.user = user;
//    }
///////////////////
//    private HttpServletRequest servletRequest;
//
//    public HttpServletRequest getServletRequest()
//    {
//      return servletRequest;
//    }
//
//    public void setServletRequest(HttpServletRequest httpServletRequest)
//    {
//      servletRequest = httpServletRequest;
//    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public BigDecimal getDocId() {
        return docId;
    }

    public void setDocId(BigDecimal docId) {
        this.docId = docId;
    }

    void afterDocDestoroy(PackDoc packDoc) {
        // check and delete packDoc
        if (packDoc.getCimSmgsFileInfs().size() == 0 && packDoc.getCsInvoices().size() == 0) {
            if (packDoc.getCimSmgses().size() == 0) {
                getPackDocDAO().makeTransient(packDoc);
            } else if (packDoc.getCimSmgses().size() == 1) {
                CimSmgs cimSmgs = packDoc.getCimSmgses().iterator().next();
                if (cimSmgs.isEpd()) {
                    getPackDocDAO().makeTransient(packDoc);
                }
            }
        }
    }

    public void saveContGruzHistory(Map<String, List<?>> contGruz4History, KontGruzHistoryDAO kontGruzHistoryDAO, KontGruzHistoryType historyType) {
        for (Map.Entry<String, List<?>> entries : contGruz4History.entrySet()) {
            if (entries.getKey().equals("konts")) {
                for (int i = 0; i < entries.getValue().size(); i++) {
                    Kont kont = (Kont) entries.getValue().get(i);
                    KontGruzHistory kontGruzHistory;
                    switch (historyType) {
                        case POEZD:
                            kontGruzHistory = new KontGruzHistory(
                                    kont.getVagon().getPoezd(), kont.getVagon(), kont, kont.getVagon().getPoezd().getKoleya(), kont.getVagon().getPoezd().getDirection(), new Date(), getUser().getUsr().getUn()
                            );
                            break;
                        case YARD: {
                            kontGruzHistory = new KontGruzHistory(
                                    kont.getYard().getSector(), kont.getYard(), kont, new Date(), getUser().getUsr().getUn()
                            );
                            break;
                        }
                        default:
                            throw new RuntimeException("Invalid KontGruzHistoryType");
                    }

                    kontGruzHistoryDAO.makePersistent(kontGruzHistory);
                    if (i % 20 == 0) { //20, same as the JDBC batch size
                        //flush a batch of inserts and release memory:
                        kontGruzHistoryDAO.flush();
                        kontGruzHistoryDAO.clear();
                    }
                }
            } else { // gruz
                for (int i = 0; i < entries.getValue().size(); i++) {
                    Gruz gruz = (Gruz) entries.getValue().get(i);
                    KontGruzHistory kontGruzHistory;
                    switch (historyType) {
                        case POEZD:
                            kontGruzHistory = new KontGruzHistory(
                                    gruz.getVagon().getPoezd(), gruz.getVagon(), gruz, gruz.getVagon().getPoezd().getKoleya(), gruz.getVagon().getPoezd().getDirection(), new Date(), getUser().getUsr().getUn()
                            );
                            break;
                        default:
                            throw new RuntimeException("Invalid KontGruzHistoryType");
                    }

                    kontGruzHistoryDAO.makePersistent(kontGruzHistory);
                    if (i % 20 == 0) { //20, same as the JDBC batch size
                        //flush a batch of inserts and release memory:
                        kontGruzHistoryDAO.flush();
                        kontGruzHistoryDAO.clear();
                    }
                }
            }
        }
    }

    public enum KontGruzHistoryType {
        POEZD,
        YARD,
        GRUZ,
        AVTO
    }
}
