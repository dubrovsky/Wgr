package com.bivc.cimsmgs.commons;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Search implements Serializable {
    private String gruz;
    private String nomzajav;
    private String code;
    private String kod_gr;
    private String kstn;
    private String kod;
    private String kod_strn;
    private String sta_no;
    private String nvag;
    private String nom_pam;
    private String dpod;
    private String stationnazn;
    private String nstnnzn;
    private String gruzpolName;
    private String hid_cs;
    private String strananazn;
    private String date21;
    private Date date2;
    private Date date1;
    private String date11;
    private String nkon;
    private Long hid;
    private Byte type;
    private String nstnotpr;
    private String form;
    private String params[];
    private String statusBr;
    private String docType;
    private String project;
    private Long projId;
    private String route;
    private Long routeId;
    private Long packId;
    private String groupAlias;
    private Byte excel;
    private String source;
    private String status;
    private String un;
    private String strnOtprGr;
    private String strnNaznGr;
    private String pogrStn;
    private String stnOtpr;
    private String stnNazn;
    private String grzOtpr;
    private String grzPoluch;
    private String naimGrz;
    private String tipRazmKont;
    private String plat;
    private boolean flag;
    private String scope;
    private byte docId = 0;
    private Byte deleted = 0;
    private List<Long> ids = new ArrayList<>();
    private List<Long> routeIds = new ArrayList<>();

    public List<Long> getRouteIds() {
        return routeIds;
    }

    public void setRouteIds(List<Long> routeIds) {
        this.routeIds = routeIds;
    }

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }

    public String getTipRazmKont() {
        return tipRazmKont;
    }

    public void setTipRazmKont(String tipRazmKont) {
        this.tipRazmKont = tipRazmKont;
    }



    public String getNaimGrz() {
        return naimGrz;
    }

    public void setNaimGrz(String naimGrz) {
        this.naimGrz = naimGrz;
    }



    public String getZakazNo() {
        return zakazNo;
    }

    public void setZakazNo(String zakazNo) {
        this.zakazNo = zakazNo;
    }

    private String zakazNo;

    public String getNpoezd() {
        return npoezd;
    }

    public void setNpoezd(String npoezd) {
        this.npoezd = npoezd;
    }

    private String npoezd;

    public Long getSmgsId() {
        return smgsId;
    }

    public void setSmgsId(Long smgsId) {
        this.smgsId = smgsId;
    }

    private Long smgsId;
    private String groupId;
    private String num;

    public String getNum(){
        return num;
    }

    public void setNum(String num){
        this.num = num;
    }

    public String getGruz() {
        return gruz;
    }

    public String getForm() {
        return form;
    }

    public String getNomzajav() {
        return nomzajav;
    }

    public String getCode() {
        return code;
    }

    public String getDpod() {
        return dpod;
    }

    public String getKod() {
        return kod;
    }

    public String getKod_gr() {
        return kod_gr;
    }

    public String getKod_strn() {
        return kod_strn;
    }

    public String getKstn() {
        return kstn;
    }

    public String getNom_pam() {
        return nom_pam;
    }

    public String getNvag() {
        return nvag;
    }

    public String getSta_no() {
        return sta_no;
    }

    public String getStationnazn() {
        return stationnazn;
    }

    public String getGruzpolName() {
        return gruzpolName;
    }

    public String getNstnnzn() {
        return nstnnzn;
    }

    public String getHid_cs() {
        return hid_cs;
    }

    public String getStrananazn() {
        return strananazn;
    }

    public String getDate21() {
        return date21;
    }

    public Date getDate2() {
        return date2;
    }

    public Date getDate1() {
        return date1;
    }

    public String getDate11() {
        return date11;
    }

    public String getNkon() {
        return nkon;
    }

    public Long getHid() {
        return hid;
    }

    public Byte getType() {
        return type;
    }

    public String getNstnotpr() {
        return nstnotpr;
    }

    public String[] getParams() {
        return params;
    }

    public String getStatusBr() {
        return statusBr;
    }

    public void setGruz(String gruz) {
        this.gruz = gruz;
    }

    public void setNomzajav(String nomzajav) {
        this.nomzajav = nomzajav;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setDpod(String dpod) {
        this.dpod = dpod;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public void setKod_gr(String kod_gr) {
        this.kod_gr = kod_gr;
    }

    public void setKod_strn(String kod_strn) {
        this.kod_strn = kod_strn;
    }

    public void setKstn(String kstn) {
        this.kstn = kstn;
    }

    public void setNom_pam(String nom_pam) {
        this.nom_pam = nom_pam;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public void setSta_no(String sta_no) {
        this.sta_no = sta_no;
    }

    public void setStationnazn(String stationnazn) {
        this.stationnazn = stationnazn;
    }

    public void setGruzpolName(String gruzpolName) {
        this.gruzpolName = gruzpolName;
    }

    public void setNstnnzn(String nstnnzn) {
        this.nstnnzn = nstnnzn;
    }

    public void setHid_cs(String hid_cs) {
        this.hid_cs = hid_cs;
    }

    public void setStrananazn(String strananazn) {
        this.strananazn = strananazn;
    }

    public void setDate21(String date21) {
        this.date21 = date21;
    }

    public void setDate2(Date date2) {
        this.date2 = date2;
    }

    public void setDate1(Date date1) {
        this.date1 = date1;
    }

    public void setDate11(String date11) {
        this.date11 = date11;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setType(Byte type) {
        this.type = type;
    }

    public void setNstnotpr(String nstnotpr) {
        this.nstnotpr = nstnotpr;
    }

    public void setForm(String form) {
        this.form = form;
    }

    public void setParams(String[] params) {
        this.params = params;
    }

    public void setStatusBr(String statusBr) {
        this.statusBr = statusBr;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public String getDocType() {
        return docType;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

    public Long getPackId() {
        return packId;
    }

    public void setPackId(Long packId) {
        this.packId = packId;
    }

    public String getGroupId() {
        return groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getGroupAlias() {
        return groupAlias;
    }

    public void setGroupAlias(String groupAlias) {
        this.groupAlias = groupAlias;
    }

    public Byte getExcel() {
        return excel;
    }

    public void setExcel(Byte excel) {
        this.excel = excel;
    }


    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public String getStrnOtprGr() {
        return strnOtprGr;
    }

    public void setStrnOtprGr(String strnOtprGr) {
        this.strnOtprGr = strnOtprGr;
    }

    public String getStrnNaznGr() {
        return strnNaznGr;
    }

    public void setStrnNaznGr(String strnNaznGr) {
        this.strnNaznGr = strnNaznGr;
    }

    public String getPogrStn() {
        return pogrStn;
    }

    public void setPogrStn(String pogrStn) {
        this.pogrStn = pogrStn;
    }

    public String getStnOtpr() {
        return stnOtpr;
    }

    public void setStnOtpr(String stnOtpr) {
        this.stnOtpr = stnOtpr;
    }

    public String getStnNazn() {
        return stnNazn;
    }

    public void setStnNazn(String stnNazn) {
        this.stnNazn = stnNazn;
    }

    public String getGrzOtpr() {
        return grzOtpr;
    }

    public void setGrzOtpr(String grzOtpr) {
        this.grzOtpr = grzOtpr;
    }

    public String getGrzPoluch() {
        return grzPoluch;
    }

    public void setGrzPoluch(String grzPoluch) {
        this.grzPoluch = grzPoluch;
    }

    public String getPlat() {
        return plat;
    }

    public void setPlat(String plat) {
        this.plat = plat;
    }

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public Long getProjId() {
        return projId;
    }

    public void setProjId(Long projId) {
        this.projId = projId;
    }

    public String getProject() {
        return project;
    }

    public void setProject(String project) {
        this.project = project;
    }

    public String getRoute() {
        return route;
    }

    public void setRoute(String route) {
        this.route = route;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public byte getDocId() {
        return docId;
    }

    public void setDocId(byte docId) {
        this.docId = docId;
    }


    public Byte getDeleted() {
        return deleted;
    }

    public void setDeleted(Byte deleted) {
        this.deleted = deleted;
    }
}
