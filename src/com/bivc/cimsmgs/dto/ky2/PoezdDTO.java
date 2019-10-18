package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdDTO {

    private Long hid;
    private Long clientHid;
    private Long routeHid;
    private Byte direction;
    private String nppr;
    private String gruzotpr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpTime;

    private TreeSet<VagonDTO> vagons = new TreeSet<>();

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

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<VagonDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonDTO> vagons) {
        this.vagons = vagons;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public Date getDotp() {
        return dotp;
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

    public Long getRouteHid() {
        return routeHid;
    }

    public void setRouteHid(Long routeHid) {
        this.routeHid = routeHid;
    }
}
