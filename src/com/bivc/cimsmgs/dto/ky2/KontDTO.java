package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.Date;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontDTO implements Comparable<KontDTO>{

    private Long hid;
    private Long clientHid;
    private Long routeHid;
    private String nkon;
    private String notp;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;

    private Boolean poruz;
    private BigDecimal massa_tar;
    private BigDecimal massa_brutto;
    private BigDecimal massa_brutto_all;
    private BigDecimal pod_sila;
    private String type;
    private String vid;
    private String prizn_sob;
    private String naim_sob;
    private String gruzotpr;
    private String zayav_in;
    private String zayav_out;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonSerialize(using = DateSerializer.class)
    private Date teh_obsl;
    private String prim;
    private Integer sort;
    private Byte isZayav = 0;
    private Byte isUnloading = 0;
    private Byte isLoading = 0;

    public Byte getIsUnloading() {
        return isUnloading;
    }

    public void setIsUnloading(Byte isUnloading) {
        this.isUnloading = isUnloading;
    }

    public Byte getIsLoading() {
        return isLoading;
    }

    public void setIsLoading(Byte isLoading) {
        this.isLoading = isLoading;
    }

    private TreeSet<GruzDTO> gruzs = new TreeSet<>();
    private TreeSet<PlombDTO> plombs = new TreeSet<>();

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public String getNotp() {
        return notp;
    }

    public void setNotp(String notp) {
        this.notp = notp;
    }

    public Date getDprbDate() {
        return this.dprbDate != null ? this.dprbDate : this.dprb;
    }

    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    public Date getDprbTime() {
        return this.dprbTime != null ? this.dprbTime : this.dprb;
    }

    public void setDprbTime(Date dprbTime) {
        this.dprbTime = dprbTime;
    }

    public Date getDprb() {
        if(this.dprbDate != null){
            this.dprb = this.dprbDate;
            if(this.dprbTime != null){
                this.dprb = DateTimeUtils.addTimeToDate(this.dprbDate, this.dprbTime);
            }
        }
        return this.dprb;
    }

    public Date getDotpDate() {
        return this.dotpDate != null ? this.dotpDate : this.dotp;
    }

    public void setDotpDate(Date dotpDate) {
        this.dotpDate = dotpDate;
    }

    public Date getDotpTime() {
        return this.dotpTime != null ? this.dotpTime : this.dotp;
    }

    public void setDotpTime(Date dotpTime) {
        this.dotpTime = dotpTime;
    }

    public Date getDotp() {
        if(this.dotpDate != null){
            this.dotp = this.dotpDate;
            if(this.dotpTime != null){
                this.dotp = DateTimeUtils.addTimeToDate(this.dotpDate, this.dotpTime);
            }
        }
        return this.dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public BigDecimal getMassa_brutto() {
        return massa_brutto;
    }

    public void setMassa_brutto(BigDecimal massa_brutto) {
        this.massa_brutto = massa_brutto;
    }

    public BigDecimal getMassa_brutto_all() {
        return massa_brutto_all;
    }

    public void setMassa_brutto_all(BigDecimal massa_brutto_all) {
        this.massa_brutto_all = massa_brutto_all;
    }

    public Boolean getPoruz() {
        return poruz;
    }

    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    public BigDecimal getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(BigDecimal massa_tar) {
        this.massa_tar = massa_tar;
    }

    public BigDecimal getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(BigDecimal pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getPrizn_sob() {
        return prizn_sob;
    }

    public void setPrizn_sob(String prizn_sob) {
        this.prizn_sob = prizn_sob;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getZayav_in() {
        return zayav_in;
    }

    public void setZayav_in(String zayav_in) {
        this.zayav_in = zayav_in;
    }

    public String getZayav_out() {
        return zayav_out;
    }

    public void setZayav_out(String zayav_out) {
        this.zayav_out = zayav_out;
    }

    public Date getTeh_obsl() {
        return teh_obsl;
    }

    public void setTeh_obsl(Date teh_obsl) {
        this.teh_obsl = teh_obsl;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(KontDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if (thisHid == null) {
            return AFTER;
        } else if (thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<GruzDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public TreeSet<PlombDTO> getPlombs() {
        return plombs;
    }

    public void setPlombs(TreeSet<PlombDTO> plombs) {
        this.plombs = plombs;
    }

    public Byte getIsZayav() {
        return isZayav;
    }

    public void setIsZayav(Byte isZayav) {
        this.isZayav = isZayav;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public Long getRouteHid() {
        return routeHid;
    }

    public void setRouteHid(Long routeHid) {
        this.routeHid = routeHid;
    }
}
