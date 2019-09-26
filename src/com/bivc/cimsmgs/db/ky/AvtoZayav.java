package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class AvtoZayav {
    private static final Logger log = LoggerFactory.getLogger(AvtoZayav.class);

    private Byte direction;
    private Route route;
    private PackDoc packDoc;
    private Long hid;
    private String no_zayav;
    private String transport;
//    @JsonSerialize(using = DateTimeSerializer.class)
//    private Date dprb;
    private String un;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    private String trans;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private Set<Kont> konts = new TreeSet<>();
    private Set<Gruz> gruzs = new TreeSet<>();
    private Integer kontCount;

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }


    public Set<Kont> getKonts() {
        return konts;
    }

    public void setKonts(Set<Kont> konts) {
        this.konts = konts;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
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

    public String getNo_zayav() {
        return no_zayav;
    }

    public void setNo_zayav(String no_zayav) {
        this.no_zayav = no_zayav;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Set<Gruz> getGruzs() {
        return gruzs;
    }

    public void setGruzs(Set<Gruz> gruzs) {
        this.gruzs = gruzs;
    }

    public Integer getKontCount() {
        return this.getKonts().size();
    }

    public void setKontCount(Integer kontCount) {
        this.kontCount = kontCount;
    }
}
