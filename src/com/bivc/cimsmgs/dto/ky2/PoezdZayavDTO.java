package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayavDTO {

    private Long hid;
    private Byte direction;
    private Long clientHid;
    private Long routeHid;
    private String gruzotpr;
    private TreeSet<VagonDTO> vagons = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public TreeSet<VagonDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonDTO> vagons) {
        this.vagons = vagons;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public Long getRouteHid() {
        return routeHid;
    }

    public void setRouteHid(Long routeHid) {
        this.routeHid = routeHid;
    }
}
