package com.bivc.cimsmgs.dto;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsGruzDTO {

    private String kgvn;
    private String nzgr;
    private String nzgrEu;
    private String ekgvn;
    private String enzgr;
    private BigDecimal massa;
    private String upakForeign;
    private String upak;
    private Integer places;
    private Boolean ohr;
    private Integer sort;
    private Map<Byte, Aviso2CimSmgsDanGruzDTO> cimSmgsDanGruzs = new TreeMap<>();

    public Aviso2CimSmgsGruzDTO() {
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

    public String getNzgrEu() {
        return nzgrEu;
    }

    public void setNzgrEu(String nzgrEu) {
        this.nzgrEu = nzgrEu;
    }

    public String getEkgvn() {
        return ekgvn;
    }

    public void setEkgvn(String ekgvn) {
        this.ekgvn = ekgvn;
    }

    public String getEnzgr() {
        return enzgr;
    }

    public void setEnzgr(String enzgr) {
        this.enzgr = enzgr;
    }

    public BigDecimal getMassa() {
        return massa;
    }

    public void setMassa(BigDecimal massa) {
        this.massa = massa;
    }

    public String getUpakForeign() {
        return upakForeign;
    }

    public void setUpakForeign(String upakForeign) {
        this.upakForeign = upakForeign;
    }

    public String getUpak() {
        return upak;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public Integer getPlaces() {
        return places;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    public Boolean getOhr() {
        return ohr;
    }

    public void setOhr(Boolean ohr) {
        this.ohr = ohr;
    }

    public Map<Byte, Aviso2CimSmgsDanGruzDTO> getCimSmgsDanGruzs() {
        return cimSmgsDanGruzs;
    }

    public void setCimSmgsDanGruzs(Map<Byte, Aviso2CimSmgsDanGruzDTO> cimSmgsDanGruzs) {
        this.cimSmgsDanGruzs = cimSmgsDanGruzs;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsGruzDTO that = (Aviso2CimSmgsGruzDTO) o;
        return Objects.equals(kgvn, that.kgvn) &&
                Objects.equals(nzgr, that.nzgr) &&
                Objects.equals(nzgrEu, that.nzgrEu) &&
                Objects.equals(ekgvn, that.ekgvn) &&
                Objects.equals(enzgr, that.enzgr) &&
                Objects.equals(massa, that.massa) &&
                Objects.equals(upakForeign, that.upakForeign) &&
                Objects.equals(upak, that.upak) &&
                Objects.equals(places, that.places) &&
                Objects.equals(ohr, that.ohr) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(kgvn, nzgr, nzgrEu, ekgvn, enzgr, massa, upakForeign, upak, places, ohr, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsGruzDTO{" +
                "kgvn='" + kgvn + '\'' +
                ", nzgr='" + nzgr + '\'' +
                ", nzgrEu='" + nzgrEu + '\'' +
                ", ekgvn='" + ekgvn + '\'' +
                ", enzgr='" + enzgr + '\'' +
                ", massa=" + massa +
                ", upakForeign='" + upakForeign + '\'' +
                ", upak='" + upak + '\'' +
                ", places=" + places +
                ", ohr=" + ohr +
                ", sort=" + sort +
                '}';
    }
}
