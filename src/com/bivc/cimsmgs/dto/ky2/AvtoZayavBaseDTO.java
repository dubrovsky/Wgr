package com.bivc.cimsmgs.dto.ky2;

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
import java.util.TreeSet;

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
    private String driver_pasp;
    private String prim;
    private String client_sname;
    private String kont_s;
    private Integer repeatNkon;
    private Integer isZayavDone;

    private ClientDTO client;
    private TreeSet<KontDTO> konts = new TreeSet<>();


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
    private Long packId;
    private Long routeId;

    public Long getPackId() {
        return packId;
    }

    public void setPackId(Long packId) {
        this.packId = packId;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }
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

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getDriver_pasp() {
        return driver_pasp;
    }

    public void setDriver_pasp(String driver_pasp) {
        this.driver_pasp = driver_pasp;
    }

    public String getClient_sname() {
        return client_sname;
    }

    public void setClient_sname(String client_sname) {
        this.client_sname = client_sname;
    }

    public String getKont_s() {
        return kont_s;
    }

    public void setKont_s(String kont_s) {
        this.kont_s = kont_s;
    }

    public Integer getRepeatNkon() {
        return repeatNkon;
    }

    public void setRepeatNkon(Integer repeatNkon) {
        this.repeatNkon = repeatNkon;
    }

    public Integer getIsZayavDone() {
        return isZayavDone;
    }

    public void setIsZayavDone(Integer isZayavDone) {
        this.isZayavDone = isZayavDone;
    }

    public TreeSet<KontDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontDTO> konts) {
        this.konts = konts;
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

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
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