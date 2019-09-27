package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
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
    private String noZayav;
    private String transport;
    private Byte direction;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

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
}
