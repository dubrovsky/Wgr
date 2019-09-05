package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.db.ky.Otpravka;

import java.math.BigDecimal;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonBindViewDTO implements Comparable<VagonBindViewDTO> {

    private Long hid;
    private String nvag;
    private Otpravka otpravka;
    private BigDecimal podSila;
    private Long masTar;
    private Integer kolOs;
    private String sobstv;
    private TreeSet<GruzBindViewDTO> gruzs = new TreeSet<>();
    private TreeSet<KontBindViewDTO> konts = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public Otpravka getOtpravka() {
        return otpravka;
    }

    public void setOtpravka(Otpravka otpravka) {
        this.otpravka = otpravka;
    }

    public TreeSet<GruzBindViewDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindViewDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public TreeSet<KontBindViewDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindViewDTO> konts) {
        this.konts = konts;
    }

    public BigDecimal getPodSila() {
        return podSila;
    }

    public void setPodSila(BigDecimal podSila) {
        this.podSila = podSila;
    }

    public Long getMasTar() {
        return masTar;
    }

    public void setMasTar(Long masTar) {
        this.masTar = masTar;
    }

    public Integer getKolOs() {
        return kolOs;
    }

    public void setKolOs(Integer kolOs) {
        this.kolOs = kolOs;
    }

    public String getSobstv() {
        return sobstv;
    }

    public void setSobstv(String sobstv) {
        this.sobstv = sobstv;
    }

    @Override
    public int compareTo(VagonBindViewDTO that) {
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
}
