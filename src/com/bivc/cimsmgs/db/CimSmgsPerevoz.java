package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;

@JsonIgnoreProperties({ "cimSmgs"})
public class CimSmgsPerevoz implements Serializable {
    private Long hid;
    private CimSmgs cimSmgs;
    private Byte sort;
    private String namPer;
    private String stBeg;
    private String stEnd;
    private String codStBeg;
    private String codStEnd;
    private String admStBeg;
    private String admStEnd;
    private String codePer;

    public String getCodStEnd() {
        return codStEnd;
    }

    public void setCodStEnd(String codStEnd) {
        this.codStEnd = codStEnd;
    }

    public String getCodStBeg() {
        return codStBeg;
    }

    public void setCodStBeg(String codStBeg) {
        this.codStBeg = codStBeg;
    }

    public String getStEnd() {
        return stEnd;
    }

    public void setStEnd(String stEnd) {
        this.stEnd = stEnd;
    }

    public String getStBeg() {
        return stBeg;
    }

    public void setStBeg(String stBeg) {
        this.stBeg = stBeg;
    }

    public String getNamPer() {
        return namPer;
    }

    public void setNamPer(String namPer) {
        this.namPer = namPer;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public CimSmgs getCimSmgs() {
        return cimSmgs;
    }

    public void setCimSmgs(CimSmgs cimSmgs) {
        this.cimSmgs = cimSmgs;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getAdmStBeg() {
        return admStBeg;
    }

    public void setAdmStBeg(String admStBeg) {
        this.admStBeg = admStBeg;
    }

    public String getAdmStEnd() {
        return admStEnd;
    }

    public void setAdmStEnd(String admStEnd) {
        this.admStEnd = admStEnd;
    }

    public String getCodePer() {
        return codePer;
    }

    public void setCodePer(String codePer) {
        this.codePer = codePer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CimSmgsPerevoz that = (CimSmgsPerevoz) o;

        return new EqualsBuilder()
                .append(hid, that.hid)
                .append(cimSmgs, that.cimSmgs)
                .append(sort, that.sort)
                .append(namPer, that.namPer)
                .append(stBeg, that.stBeg)
                .append(stEnd, that.stEnd)
                .append(codStBeg, that.codStBeg)
                .append(codStEnd, that.codStEnd)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(hid)
                .append(cimSmgs)
                .append(sort)
                .append(namPer)
                .append(stBeg)
                .append(stEnd)
                .append(codStBeg)
                .append(codStEnd)
                .toHashCode();
    }
}
