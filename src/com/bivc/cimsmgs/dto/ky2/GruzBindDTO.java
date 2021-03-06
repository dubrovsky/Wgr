package com.bivc.cimsmgs.dto.ky2;

/**
 * @author p.dzeviarylin
 */
public class GruzBindDTO implements Comparable<GruzBindDTO> {

    private Long hid;
    private String kgvn;
//    private String nzgr;
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

   /* public String getNzgr() {
        return nzgr;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }*/

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(GruzBindDTO that) {
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
