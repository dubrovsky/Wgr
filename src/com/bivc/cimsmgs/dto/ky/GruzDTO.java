package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontBaseDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.math.BigDecimal;

/**
 * Created by peter on 21.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GruzDTO implements Comparable<GruzDTO>{

    private Long hid;
    private KontBaseDTO kont;
    private String upak;
    private String kgvn;
    private String nzgr;
    private Integer places;
    private Byte sort;
    private BigDecimal massa;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "kont");
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public KontBaseDTO getKont() {
        return kont;
    }

    public void setKont(KontBaseDTO kont) {
        this.kont = kont;
    }

    public String getUpak() {
        return upak;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public String getKgvn() {
        return kgvn;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public String getNzgr() {
        return nzgr;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public Integer getPlaces() {
        return places;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public BigDecimal getMassa() {
        return massa;
    }

    public void setMassa(BigDecimal massa) {
        this.massa = massa;
    }

    @Override
    public int compareTo(GruzDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if(thisHid == null) {
            return AFTER;
        } else if(thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }
}
