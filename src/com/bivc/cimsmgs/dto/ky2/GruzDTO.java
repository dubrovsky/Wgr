package com.bivc.cimsmgs.dto.ky2;

import java.math.BigDecimal;

/**
 * @author p.dzeviarylin
 */
public class GruzDTO implements Comparable<GruzDTO> {

    private Long hid;
    private Long clientHid;
    private Long routeHid;
    private String gruzotpr;
    private String kgvn;
    private String nzgr;
    private String upak;
    private Integer places;
    private BigDecimal massa;
    private Integer sort;

    public String getKgvn() {
        return kgvn;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public String getNzgr() {
        return nzgr;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public String getUpak() {
        return upak;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public Integer getPlaces() {
        return places;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    public BigDecimal getMassa() {
        return massa;
    }

    public void setMassa(BigDecimal massa) {
        this.massa = massa;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public Long getRouteHid() {
        return routeHid;
    }

    public void setRouteHid(Long routeHid) {
        this.routeHid = routeHid;
    }

    @Override
    public int compareTo(GruzDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if (thisHid == null) {
            return AFTER;
        } else if (thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }
}
