package com.bivc.cimsmgs.dto.ky2;

import java.math.BigDecimal;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontBindViewDTO implements Comparable<KontBindViewDTO>{

    private Long hid;
    private String nkon;
    private Byte sort;
    private Long massa_tar;
    private BigDecimal massa_brutto;
    private BigDecimal massa_brutto_all;
    private BigDecimal pod_sila;
    private String vid;

    private TreeSet<GruzBindViewDTO> gruzs = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public TreeSet<GruzBindViewDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindViewDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public Long getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(Long massa_tar) {
        this.massa_tar = massa_tar;
    }

    public BigDecimal getMassa_brutto() {
        return massa_brutto;
    }

    public void setMassa_brutto(BigDecimal massa_brutto) {
        this.massa_brutto = massa_brutto;
    }

    public BigDecimal getMassa_brutto_all() {
        return massa_brutto_all;
    }

    public void setMassa_brutto_all(BigDecimal massa_brutto_all) {
        this.massa_brutto_all = massa_brutto_all;
    }

    public BigDecimal getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(BigDecimal pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    @Override
    public int compareTo(KontBindViewDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisSort = this.getSort();
        Comparable thatSort = that.getSort();

        if (thisSort == null) {
            return AFTER;
        } else if (thatSort == null) {
            return BEFORE;
        } else {
            return thisSort.compareTo(thatSort);
        }
    }
}
