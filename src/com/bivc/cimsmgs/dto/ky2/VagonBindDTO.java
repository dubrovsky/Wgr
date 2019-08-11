package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.db.ky.Otpravka;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonBindDTO implements Comparable<VagonBindDTO> {

    private Long hid;
    private String nvag;
    private Otpravka otpravka;
//    private Short sort;
    private TreeSet<GruzBindDTO> gruzs = new TreeSet<>();
    private TreeSet<KontBindDTO> konts = new TreeSet<>();

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

    public TreeSet<GruzBindDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public TreeSet<KontBindDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindDTO> konts) {
        this.konts = konts;
    }

    @Override
    public int compareTo(VagonBindDTO that) {
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

    public Otpravka getOtpravka() {
        return otpravka;
    }

    public void setOtpravka(Otpravka otpravka) {
        this.otpravka = otpravka;
    }

    /*public Short getSort() {
        return sort;
    }

    public void setSort(Short sort) {
        this.sort = sort;
    }*/
}
