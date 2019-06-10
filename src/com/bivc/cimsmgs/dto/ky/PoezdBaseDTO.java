package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.Date;

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
    private String punkt_otpr;
    private String punkt_nazn;

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

    public PoezdBaseDTO(Long hid) {
        this.hid = hid;
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

    public String getPunkt_otpr() {
        return punkt_otpr;
    }

    public void setPunkt_otpr(String punkt_otpr) {
        this.punkt_otpr = punkt_otpr;
    }

    public String getPunkt_nazn() {
        return punkt_nazn;
    }

    public void setPunkt_nazn(String punkt_nazn) {
        this.punkt_nazn = punkt_nazn;
    }
}
