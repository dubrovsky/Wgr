package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class Zayav implements Serializable {
    private Long hid;
    private Route route;
    private PackDoc packDoc;
    private String noZayav;
    private String transport;
    private Byte direction;
    private String un;
    private Date dattr;
    private String trans;
    private Date altered;
    private Set<Vagon> vagons = new TreeSet<>();

    public Set<Vagon> getVagons() {
        return vagons;
    }

    public void setVagons(Set<Vagon> vagons) {
        this.vagons = vagons;
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

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getNoZayav() {
        return noZayav;
    }

    public void setNoZayav(String noZayav) {
        this.noZayav = noZayav;
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

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
