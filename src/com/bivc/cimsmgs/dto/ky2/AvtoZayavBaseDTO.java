package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.Date;

/**
 * Created by lan on 25.09.2019.
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AvtoZayavBaseDTO {
    private Long hid;
    private String no_zayav;
//    private String transport;
    private Byte direction;
    private RouteDTO route;
    private PackDocDTO packDoc;
    private Integer kontCount;
    private Integer kontCountDone;
    private String no_avto;
    private String no_trail;
    private String driver_fio;
    private String client;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dateZayav;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date zayavDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date zayavTime;


    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

//    @JsonSerialize(using = DateTimeSerializer.class)
//    private Date dprb;

    public Date getDateZayav() {
        if(this.zayavDate != null){
            this.dateZayav = this.zayavDate;
            if(this.zayavTime != null){
                this.dateZayav = DateTimeUtils.addTimeToDate(this.zayavDate, this.zayavTime);
            }
        }
        return this.dateZayav;
    }

    public void setDateZayav(Date dateZayav) {
        this.dateZayav = dateZayav;
    }

    public Date getZayavDate() {
        return this.zayavDate != null ? this.zayavDate : this.dateZayav;
    }

    public void setZayavDate(Date zayavDate) {
        this.zayavDate = zayavDate;
    }

    public Date getZayavTime() {
        return this.zayavTime != null ? this.zayavTime : this.dateZayav;
    }

    public void setZayavTime(Date zayavTime) {
        this.zayavTime = zayavTime;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }

    public String getNo_trail() {
        return no_trail;
    }

    public void setNo_trail(String no_trail) {
        this.no_trail = no_trail;
    }

    public String getDriver_fio() {
        return driver_fio;
    }

    public void setDriver_fio(String driver_fio) {
        this.driver_fio = driver_fio;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

//    public String getTransport() {
//        return transport;
//    }
//
//    public void setTransport(String transport) {
//        this.transport = transport;
//    }

    public String getNo_zayav() {
        return no_zayav;
    }

    public void setNo_zayav(String no_zayav) {
        this.no_zayav = no_zayav;
    }

    public Integer getKontCount() {
        return kontCount;
    }

    public void setKontCount(Integer kontCount) {
        this.kontCount = kontCount;
    }

    public Integer getKontCountDone() {
        return kontCountDone;
    }

    public void setKontCountDone(Integer kontCountDone) {
        this.kontCountDone = kontCountDone;
    }

    //    public Date getDprb() {
//        if(this.dprbDate != null){
//            this.dprb = this.dprbDate;
//            if(this.dprbTime != null){
//                this.dprb = DateTimeUtils.addTimeToDate(this.dprbDate, this.dprbTime);
//            }
//        }
//        return this.dprb;
//    }


    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "route", "packDoc");
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
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

}