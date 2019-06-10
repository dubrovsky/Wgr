package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontBaseDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

/**
 * Created by peter on 21.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlombDTO implements Comparable<PlombDTO>{

    private Long hid;
    private KontBaseDTO kont;
    private Short kpl;
    private String znak;
    private Byte sort;

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

    public Short getKpl() {
        return kpl;
    }

    public void setKpl(Short kpl) {
        this.kpl = kpl;
    }

    public String getZnak() {
        return znak;
    }

    public void setZnak(String znak) {
        this.znak = znak;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(PlombDTO that) {
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
