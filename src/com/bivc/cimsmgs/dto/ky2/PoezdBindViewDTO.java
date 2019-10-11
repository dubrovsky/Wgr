package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.dto.RouteDTO;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdBindViewDTO {

    private Long hid;
    private Byte direction;
    private String nppr;
    private String npprm;
    private RouteDTO route;

    private TreeSet<VagonBindViewDTO> vagons = new TreeSet<>();

    public RouteDTO getRoute() {
        return route;
    }

    public void setRoute(RouteDTO route) {
        this.route = route;
    }

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

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public TreeSet<VagonBindViewDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonBindViewDTO> vagons) {
        this.vagons = vagons;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }
}
