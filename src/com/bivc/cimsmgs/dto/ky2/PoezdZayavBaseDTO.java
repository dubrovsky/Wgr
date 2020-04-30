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

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PoezdZayavBaseDTO {

    private Long hid;
    private RouteDTO route;
    private PackDocDTO packDoc;
    private ClientDTO client;
    private String noZayav;
    private String transport;
    private Byte direction;
    private Byte isZayav;
    private Integer vagCount;
    private Integer kontCount;
    private Integer kontCountDone;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dateZayav;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date zayavDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date zayavTime;

    private String nppr;
    private String npprm;
    private String gruzotpr;
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

    public Integer getVagCount() {
        return vagCount;
    }

    public void setVagCount(Integer vagCount) {
        this.vagCount = vagCount;
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

    public String getNoZayav() {
        return noZayav;
    }

    public void setNoZayav(String noZayav) {
        this.noZayav = noZayav;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
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

    public Byte getIsZayav() {
        return isZayav;
    }

    public void setIsZayav(Byte isZayav) {
        this.isZayav = isZayav;
    }

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
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

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }
}
