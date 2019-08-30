package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PoezdBaseDTO {
    private Long hid;
    private RouteDTO route;
    private PackDocDTO packDoc;
    private String nppr;
    private String npprm;
    private Byte koleya;
    private Byte direction;
    private String gruzotpr;
    private Integer vagCount;
    private Integer kontCount;
    private String ksto_f;
    private String nsto_f;
    private String admon_f;
    private String kstn;
    private String nstn;
    private String admnn;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dprbTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dotpTime;

    public PoezdBaseDTO() {}

    public String getKsto_f() {
        return ksto_f;
    }

    public void setKsto_f(String ksto_f) {
        this.ksto_f = ksto_f;
    }

    public String getNsto_f() {
        return nsto_f;
    }

    public void setNsto_f(String nsto_f) {
        this.nsto_f = nsto_f;
    }

    public String getAdmon_f() {
        return admon_f;
    }

    public void setAdmon_f(String admon_f) {
        this.admon_f = admon_f;
    }

    public String getKstn() {
        return kstn;
    }

    public void setKstn(String kstn) {
        this.kstn = kstn;
    }

    public String getNstn() {
        return nstn;
    }

    public void setNstn(String nstn) {
        this.nstn = nstn;
    }

    public String getAdmnn() {
        return admnn;
    }

    public void setAdmnn(String admnn) {
        this.admnn = admnn;
    }

    public PoezdBaseDTO(Long hid) {
        this.hid = hid;
    }

    public void setVagCount(Integer vagCount) {
        this.vagCount = vagCount;
    }

    public void setKontCount(Integer kontCount) {
        this.kontCount = kontCount;
    }

    public Integer getVagCount() {
        return vagCount;
    }

    public Integer getKontCount() {
        return kontCount;
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

    public Date getDprb() {
        if(this.dprbDate != null){
            this.dprb = this.dprbDate;
            if(this.dprbTime != null){
                this.dprb = DateTimeUtils.addTimeToDate(this.dprbDate, this.dprbTime);
            }
        }
        return this.dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "route", "packDoc");
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

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public RouteDTO getRoute() {
        return route;
    }

    public void setRoute(RouteDTO route) {
        this.route = route;
    }

    public PackDocDTO getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDocDTO packDoc) {
        this.packDoc = packDoc;
    }

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

}
