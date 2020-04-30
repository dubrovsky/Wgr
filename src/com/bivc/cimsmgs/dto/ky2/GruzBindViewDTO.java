package com.bivc.cimsmgs.dto.ky2;

/**
 * @author p.dzeviarylin
 */
public class GruzBindViewDTO implements Comparable<GruzBindViewDTO> {

    private Long hid;
    private String kgvn;
    private Integer sort;

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getKgvn() {
        return kgvn;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(GruzBindViewDTO that) {
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
