package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class AvtoBindDTO {

    private Long hid;
    private Byte direction;
	private String no_avto;
    private TreeSet<KontBindDTO> konts = new TreeSet<>();
    private TreeSet<GruzBindDTO> gruzs = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<KontBindDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindDTO> konts) {
        this.konts = konts;
    }

    public TreeSet<GruzBindDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindDTO> gruzs) {
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
