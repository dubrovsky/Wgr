package com.bivc.cimsmgs.db;

// Generated 17.05.2011 15:02:20 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.commons.Constants;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.collections.CollectionUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * PackDoc generated by hbm2java
 */
@JsonIgnoreProperties({"cimSmgses", "cimSmgsScans", "csInvoices", "route", "usrGroupsDir","invoicesBrief","cimSmgsFileInfs","statuses","fieldsCommentses"})
public class PackDoc implements Serializable {

    private Long hid;
    private Route route;
    private Set<CimSmgs> cimSmgses = new HashSet<CimSmgs>(0);
//    private Set<CimSmgsScan> cimSmgsScans = new HashSet<CimSmgsScan>(0);
    private Set<CimSmgsInvoice> csInvoices = new HashSet<CimSmgsInvoice>(0);
    private UsrGroupsDir usrGroupsDir;
//    private Set<CimSmgsInvoiceBrief> invoicesBrief = new HashSet<CimSmgsInvoiceBrief>(0);
    private Set<CimSmgsFileInf> cimSmgsFileInfs = new HashSet<CimSmgsFileInf>(0);
    private String tbc_nomer;
    private String un;
    private Date dattr;
    private String g692;
    private String g162;
    private String g1r;
    private String g19r;
    private String g4r;
    private String g49r;
    private Set<Status> statuses = new HashSet<Status>(0);
    private Set<FieldsComments> fieldsCommentses = new HashSet<FieldsComments>();

    public PackDoc(Route route, UsrGroupsDir group) {
        this.route = route;
        this.usrGroupsDir = group;
    }

    public Set<FieldsComments> getFieldsCommentses() {
        return fieldsCommentses;
    }

    public void setFieldsCommentses(Set<FieldsComments> fieldsCommentses) {
        this.fieldsCommentses = fieldsCommentses;
    }

    public Set<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Set<Status> statuses) {
        this.statuses = statuses;
    }
//    private Map<Byte, CimSmgsCarList> cimSmgsCarLists = new TreeMap<Byte, CimSmgsCarList>();

//    public Map<Byte,CimSmgsCarList> getCimSmgsCarLists() {
//        return cimSmgsCarLists;
//    }
//
//    public void setCimSmgsCarLists(Map<Byte,CimSmgsCarList> cimSmgsCarLists) {
//        this.cimSmgsCarLists = cimSmgsCarLists;
//    }

    public String getG49r() {
        return g49r;
    }

    public void setG49r(String g49r) {
        this.g49r = g49r;
    }

    public String getG4r() {
        return g4r;
    }

    public void setG4r(String g4r) {
        this.g4r = g4r;
    }

    public String getG19r() {
        return g19r;
    }

    public void setG19r(String g19r) {
        this.g19r = g19r;
    }

    public String getG1r() {
        return g1r;
    }

    public void setG1r(String g1r) {
        this.g1r = g1r;
    }

    public String getG162() {
        return g162;
    }

    public void setG162(String g162) {
        this.g162 = g162;
    }

    public String getG692() {
        return g692;
    }

    public void setG692(String g692) {
        this.g692 = g692;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public String getTbc_nomer() {
        return tbc_nomer;
    }

    public void setTbc_nomer(String tbc_nomer) {
        this.tbc_nomer = tbc_nomer;
    }

    public Set<CimSmgsFileInf> getCimSmgsFileInfs() {
        return cimSmgsFileInfs;
    }

    public void setCimSmgsFileInfs(Set<CimSmgsFileInf> cimSmgsFileInfs) {
        this.cimSmgsFileInfs = cimSmgsFileInfs;
    }

//    public Set<CimSmgsInvoiceBrief> getInvoicesBrief() {
//        return invoicesBrief;
//    }

//    public void setInvoicesBrief(Set<CimSmgsInvoiceBrief> invoicesBrief) {
//        this.invoicesBrief = invoicesBrief;
//    }

    public UsrGroupsDir getUsrGroupsDir() {
        return usrGroupsDir;
    }

    public void setUsrGroupsDir(UsrGroupsDir usrGroupsDir) {
        this.usrGroupsDir = usrGroupsDir;
    }

    public PackDoc() {
    }

    public PackDoc(Long hid) {
        this.hid = hid;
    }

    public PackDoc(Long hid, Route route, Set cimSmgses, Set cimSmgsScans, Set csInvoices) {
        this.hid = hid;
        this.route = route;
        this.cimSmgses = cimSmgses;
//        this.cimSmgsScans = cimSmgsScans;
        this.csInvoices = csInvoices;
    }

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Route getRoute() {
        return this.route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Set<CimSmgs> getCimSmgses() {
        return this.cimSmgses;
    }

    public void setCimSmgses(Set<CimSmgs> cimSmgses) {
        this.cimSmgses = cimSmgses;
    }

//    public Set<CimSmgsScan> getCimSmgsScans() {
//        return this.cimSmgsScans;
//    }

//    public void setCimSmgsScans(Set<CimSmgsScan> cimSmgsScans) {
//        this.cimSmgsScans = cimSmgsScans;
//    }

    public Set<CimSmgsInvoice> getCsInvoices() {
        return this.csInvoices;
    }

    public void setCsInvoices(Set<CimSmgsInvoice> csInvoices) {
        this.csInvoices = csInvoices;
    }

    public void addCimSmgsItem(CimSmgs cs) {
        if (cs != null) {
            cs.setPackDoc(this);
            cimSmgses.add(cs);
        }
    }

    public void addInvoiceItem(CimSmgsInvoice invoice) {
        if (invoice != null) {
            invoice.setPackDoc(this);
            csInvoices.add(invoice);
        }
    }

    public void addFileInfItem(CimSmgsFileInf fInf) {
        if (fInf != null) {
            fInf.setPackDoc(this);
            cimSmgsFileInfs.add(fInf);
        }
    }

    public boolean hasEpd() {
        return findDocByFieldValue(CimSmgs.DOC_TYPE_HID_PROP_NAME, CimSmgs.EPD_DOC_TYPE_HID) != null;
    }

    public CimSmgs findDocByFieldValue(String field, Object value){
        return hasDocs() ? (CimSmgs) Constants.findObjectByFieldValue(getCimSmgses(), field, value) : null;
    }

    public boolean hasDocs() {
        return CollectionUtils.isNotEmpty(getCimSmgses());
    }

//    public void prepare4save(myUser user) {
//        setRoute(getRoute());
//        setUsrGroupsDir(user.getUsr().getGroup());
//        addCimSmgsCarLists();
//        setUn(user.getUsername());
//        setDattr(new Date());
//    }

   /* private void addCimSmgsCarLists() {
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            car.setPackDoc(this);
            car.addCimSmgsGruzs();
            car.addCimSmgsKonLists();
        }
    }*/
}
