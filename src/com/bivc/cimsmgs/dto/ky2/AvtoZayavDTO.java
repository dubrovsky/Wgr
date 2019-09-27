package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

public class AvtoZayavDTO {

    private Long hid;
    private Byte direction;
    private TreeSet<KontDTO> konts = new TreeSet<>();
    private TreeSet<GruzDTO> gruzs = new TreeSet<>();

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
