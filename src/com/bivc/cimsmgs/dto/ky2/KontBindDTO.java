package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontBindDTO implements Comparable<KontBindDTO> {

    private Long hid;
    private String nkon;
    private Byte sort;
    private TreeSet<GruzBindDTO> gruzs = new TreeSet<>();

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

    public TreeSet<GruzBindDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindDTO> gruzs) {
        this.gruzs = gruzs;
    }

    @Override
    public int compareTo(KontBindDTO that) {
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
