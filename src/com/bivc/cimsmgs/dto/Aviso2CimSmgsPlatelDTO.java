package com.bivc.cimsmgs.dto;

import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsPlatelDTO {

    private String plat;
    private String platR;
    private String dor;
    private String dorR;
    private String prim;
    private String primR;
    private String kplat;
    private String kplat1;
    private String strana;
    private Byte sort;

    public Aviso2CimSmgsPlatelDTO() {
    }

    public String getPlat() {
        return plat;
    }

    public void setPlat(String plat) {
        this.plat = plat;
    }

    public String getPlatR() {
        return platR;
    }

    public void setPlatR(String platR) {
        this.platR = platR;
    }

    public String getDor() {
        return dor;
    }

    public void setDor(String dor) {
        this.dor = dor;
    }

    public String getDorR() {
        return dorR;
    }

    public void setDorR(String dorR) {
        this.dorR = dorR;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getPrimR() {
        return primR;
    }

    public void setPrimR(String primR) {
        this.primR = primR;
    }

    public String getKplat() {
        return kplat;
    }

    public void setKplat(String kplat) {
        this.kplat = kplat;
    }

    public String getKplat1() {
        return kplat1;
    }

    public void setKplat1(String kplat1) {
        this.kplat1 = kplat1;
    }

    public String getStrana() {
        return strana;
    }

    public void setStrana(String strana) {
        this.strana = strana;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsPlatelDTO that = (Aviso2CimSmgsPlatelDTO) o;
        return Objects.equals(plat, that.plat) &&
                Objects.equals(platR, that.platR) &&
                Objects.equals(dor, that.dor) &&
                Objects.equals(dorR, that.dorR) &&
                Objects.equals(prim, that.prim) &&
                Objects.equals(primR, that.primR) &&
                Objects.equals(kplat, that.kplat) &&
                Objects.equals(kplat1, that.kplat1) &&
                Objects.equals(strana, that.strana) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(plat, platR, dor, dorR, prim, primR, kplat, kplat1, strana, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsPlatelDTO{" +
                "plat='" + plat + '\'' +
                ", platR='" + platR + '\'' +
                ", dor='" + dor + '\'' +
                ", dorR='" + dorR + '\'' +
                ", prim='" + prim + '\'' +
                ", primR='" + primR + '\'' +
                ", kplat='" + kplat + '\'' +
                ", kplat1='" + kplat1 + '\'' +
                ", strana='" + strana + '\'' +
                ", sort=" + sort +
                '}';
    }
}
