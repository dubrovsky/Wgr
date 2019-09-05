package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class AvtoBindViewDTO {

    private Long hid;
    private Byte direction;
    private String no_avto;
    private TreeSet<KontBindViewDTO> konts = new TreeSet<>();
    private TreeSet<GruzBindViewDTO> gruzs = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<KontBindViewDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindViewDTO> konts) {
        this.konts = konts;
    }

    public TreeSet<GruzBindViewDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindViewDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }
}
