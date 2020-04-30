package com.bivc.cimsmgs.dto;

import java.util.Objects;

public class Aviso2CimSmgsPerevozDTO {
    private Byte sort;
    private String namPer;
    private String stBeg;
    private String stEnd;
    private String codStBeg;
    private String codStEnd;
    private String admStBeg;
    private String admStEnd;
    private String codePer;

    public Byte getSort() {
        return sort;
    }

    public String getNamPer() {
        return namPer;
    }

    public String getStBeg() {
        return stBeg;
    }

    public String getStEnd() {
        return stEnd;
    }

    public String getCodStBeg() {
        return codStBeg;
    }

    public String getCodStEnd() {
        return codStEnd;
    }

    public String getAdmStBeg() {
        return admStBeg;
    }

    public String getAdmStEnd() {
        return admStEnd;
    }

    public String getCodePer() {
        return codePer;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public void setNamPer(String namPer) {
        this.namPer = namPer;
    }

    public void setStBeg(String stBeg) {
        this.stBeg = stBeg;
    }

    public void setStEnd(String stEnd) {
        this.stEnd = stEnd;
    }

    public void setCodStBeg(String codStBeg) {
        this.codStBeg = codStBeg;
    }

    public void setCodStEnd(String codStEnd) {
        this.codStEnd = codStEnd;
    }

    public void setAdmStBeg(String admStBeg) {
        this.admStBeg = admStBeg;
    }

    public void setAdmStEnd(String admStEnd) {
        this.admStEnd = admStEnd;
    }

    public void setCodePer(String codePer) {
        this.codePer = codePer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsPerevozDTO that = (Aviso2CimSmgsPerevozDTO) o;
        return Objects.equals(sort, that.sort) &&
                Objects.equals(namPer, that.namPer) &&
                Objects.equals(stBeg, that.stBeg) &&
                Objects.equals(stEnd, that.stEnd) &&
                Objects.equals(codStBeg, that.codStBeg) &&
                Objects.equals(codStEnd, that.codStEnd) &&
                Objects.equals(admStBeg, that.admStBeg) &&
                Objects.equals(admStEnd, that.admStEnd) &&
                Objects.equals(codePer, that.codePer);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sort, namPer, stBeg, stEnd, codStBeg, codStEnd, admStBeg, admStEnd, codePer);
    }

    public Aviso2CimSmgsPerevozDTO(Byte sort, String namPer, String stBeg, String stEnd, String codStBeg, String codStEnd, String admStBeg, String admStEnd, String codePer) {
        this.sort = sort;
        this.namPer = namPer;
        this.stBeg = stBeg;
        this.stEnd = stEnd;
        this.codStBeg = codStBeg;
        this.codStEnd = codStEnd;
        this.admStBeg = admStBeg;
        this.admStEnd = admStEnd;
        this.codePer = codePer;
    }
}
