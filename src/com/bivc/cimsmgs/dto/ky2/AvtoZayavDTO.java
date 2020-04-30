package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

public class AvtoZayavDTO {

    private Long hid;
    private Byte direction;
    private Long clientHid;
    private Long routeHid;
    private String client;

    private TreeSet<KontDTO> konts = new TreeSet<>();
    private TreeSet<GruzDTO> gruzs = new TreeSet<>();

    public Long getRouteHid() {
        return routeHid;
    }

    public void setRouteHid(Long routeHid) {
        this.routeHid = routeHid;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<KontDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontDTO> konts) {
        this.konts = konts;
    }

    public TreeSet<GruzDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

}
