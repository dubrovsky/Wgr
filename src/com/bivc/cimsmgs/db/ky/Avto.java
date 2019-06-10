package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class Avto {

    private Byte direction;
    private Route route;
    private PackDoc packDoc;
    private NsiKyOwners owner;
    private String naim_sob;
    private String client;
    private Long hid;
    private String type_avto;
    private String no_avto;
    private String no_trail;
    private String otp_cargo;
    private String pol_cargo;
    private String departure;
    private String destination;
    private String driver_nm;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;
    private String prim_avto;
    private String un;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    private String trans;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private Set<Kont> kontsOut = new TreeSet<>();
    private Set<Kont> kontsInto = new TreeSet<>();



    public enum FilterFields {
        NO_AVTO("no_avto");
        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }
    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
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


    public Set<Kont> getKontsInto() {
        return kontsInto;
    }

    public void setKontsInto(Set<Kont> kontsInto) {
        this.kontsInto = kontsInto;
    }

    public Set<Kont> getKontsOut() {
        return kontsOut;
    }

    public void setKontsOut(Set<Kont> kontsOut) {
        this.kontsOut = kontsOut;
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

    public String getPrim_avto() {
        return prim_avto;
    }

    public void setPrim_avto(String prim_avto) {
        this.prim_avto = prim_avto;
    }

    public Date getDotp() {
        return dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public String getDriver_nm() {
        return driver_nm;
    }

    public void setDriver_nm(String driver_nm) {
        this.driver_nm = driver_nm;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getPol_cargo() {
        return pol_cargo;
    }

    public void setPol_cargo(String pol_cargo) {
        this.pol_cargo = pol_cargo;
    }

    public String getOtp_cargo() {
        return otp_cargo;
    }

    public void setOtp_cargo(String otp_cargo) {
        this.otp_cargo = otp_cargo;
    }

    public String getNo_trail() {
        return no_trail;
    }

    public void setNo_trail(String no_trail) {
        this.no_trail = no_trail;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }

    public String getType_avto() {
        return type_avto;
    }

    public void setType_avto(String type_avto) {
        this.type_avto = type_avto;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
