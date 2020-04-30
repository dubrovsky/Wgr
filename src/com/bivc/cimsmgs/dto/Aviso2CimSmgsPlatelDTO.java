package com.bivc.cimsmgs.dto;

import java.util.Date;
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
    private String primR1;
    private String kplat;
    private String kplat1;
    private String kplat2;
    private String kplat3;
    private String strana;
    private Byte sort;

    private String codDir;
    private String namePer;
    private String codPer;
    private String nDog;
    private Date datDog;

    public String getPlat() {
        return plat;
    }

    public String getPlatR() {
        return platR;
    }

    public String getDor() {
        return dor;
    }

    public String getDorR() {
        return dorR;
    }

    public String getPrim() {
        return prim;
    }

    public String getPrimR() {
        return primR;
    }

    public String getPrimR1() {
        return primR1;
    }

    public String getKplat() {
        return kplat;
    }

    public String getKplat1() {
        return kplat1;
    }

    public String getKplat2() {
        return kplat2;
    }

    public String getKplat3() {
        return kplat3;
    }

    public String getStrana() {
        return strana;
    }

    public Byte getSort() {
        return sort;
    }

    public String getCodDir() {
        return codDir;
    }

    public String getNamePer() {
        return namePer;
    }

    public String getCodPer() {
        return codPer;
    }

    public String getnDog() {
        return nDog;
    }

    public Date getDatDog() {
        return datDog;
    }

    public Aviso2CimSmgsPlatelDTO() {
    }

    public void setPlat(String plat) {
        this.plat = plat;
    }

    public void setPlatR(String platR) {
        this.platR = platR;
    }

    public void setDor(String dor) {
        this.dor = dor;
    }

    public void setDorR(String dorR) {
        this.dorR = dorR;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public void setPrimR(String primR) {
        this.primR = primR;
    }

    public void setPrimR1(String primR1) {
        this.primR1 = primR1;
    }

    public void setKplat(String kplat) {
        this.kplat = kplat;
    }

    public void setKplat1(String kplat1) {
        this.kplat1 = kplat1;
    }

    public void setKplat2(String kplat2) {
        this.kplat2 = kplat2;
    }

    public void setKplat3(String kplat3) {
        this.kplat3 = kplat3;
    }

    public void setStrana(String strana) {
        this.strana = strana;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public void setCodDir(String codDir) {
        this.codDir = codDir;
    }

    public void setNamePer(String namePer) {
        this.namePer = namePer;
    }

    public void setCodPer(String codPer) {
        this.codPer = codPer;
    }

    public void setnDog(String nDog) {
        this.nDog = nDog;
    }

    public void setDatDog(Date datDog) {
        this.datDog = datDog;
    }

    public Aviso2CimSmgsPlatelDTO(String plat, String platR, String dor, String dorR, String prim, String primR, String primR1, String kplat, String kplat1, String kplat2, String kplat3, String strana, Byte sort, String codDir, String namePer, String codPer, String nDog, Date datDog) {
        this.plat = plat;
        this.platR = platR;
        this.dor = dor;
        this.dorR = dorR;
        this.prim = prim;
        this.primR = primR;
        this.primR1 = primR1;
        this.kplat = kplat;
        this.kplat1 = kplat1;
        this.kplat2 = kplat2;
        this.kplat3 = kplat3;
        this.strana = strana;
        this.sort = sort;
        this.codDir = codDir;
        this.namePer = namePer;
        this.codPer = codPer;
        this.nDog = nDog;
        this.datDog = datDog;
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
                Objects.equals(primR1, that.primR1) &&
                Objects.equals(kplat, that.kplat) &&
                Objects.equals(kplat1, that.kplat1) &&
                Objects.equals(kplat2, that.kplat2) &&
                Objects.equals(kplat3, that.kplat3) &&
                Objects.equals(strana, that.strana) &&
                Objects.equals(sort, that.sort) &&
                Objects.equals(codDir, that.codDir) &&
                Objects.equals(namePer, that.namePer) &&
                Objects.equals(codPer, that.codPer) &&
                Objects.equals(nDog, that.nDog) &&
                Objects.equals(datDog, that.datDog);
    }

    @Override
    public int hashCode() {
        return Objects.hash(plat, platR, dor, dorR, prim, primR, primR1, kplat, kplat1, kplat2, kplat3, strana, sort, codDir, namePer, codPer, nDog, datDog);
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
                ", primR1='" + primR1 + '\'' +
                ", kplat='" + kplat + '\'' +
                ", kplat1='" + kplat1 + '\'' +
                ", kplat2='" + kplat2 + '\'' +
                ", kplat3='" + kplat3 + '\'' +
                ", strana='" + strana + '\'' +
                ", sort=" + sort +
                ", codDir='" + codDir + '\'' +
                ", namePer='" + namePer + '\'' +
                ", codPer='" + codPer + '\'' +
                ", nDog='" + nDog + '\'' +
                ", datDog=" + datDog +
                '}';
    }
}
