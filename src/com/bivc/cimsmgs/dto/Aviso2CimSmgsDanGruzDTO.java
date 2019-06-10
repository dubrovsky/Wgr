package com.bivc.cimsmgs.dto;

import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsDanGruzDTO {

    private String carDName;
    private String carDNameDe;
    private String codDanger;
    private String numOon;
    private String clazz;
    private String dangSign;
    private String groupPack;
    private String emergenC;
    private String stampDName;
    private String dopInfo;
    private Byte sort;

    public Aviso2CimSmgsDanGruzDTO() {
    }

    public String getCarDName() {
        return carDName;
    }

    public void setCarDName(String carDName) {
        this.carDName = carDName;
    }

    public String getCarDNameDe() {
        return carDNameDe;
    }

    public void setCarDNameDe(String carDNameDe) {
        this.carDNameDe = carDNameDe;
    }

    public String getCodDanger() {
        return codDanger;
    }

    public void setCodDanger(String codDanger) {
        this.codDanger = codDanger;
    }

    public String getNumOon() {
        return numOon;
    }

    public void setNumOon(String numOon) {
        this.numOon = numOon;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public String getDangSign() {
        return dangSign;
    }

    public void setDangSign(String dangSign) {
        this.dangSign = dangSign;
    }

    public String getGroupPack() {
        return groupPack;
    }

    public void setGroupPack(String groupPack) {
        this.groupPack = groupPack;
    }

    public String getEmergenC() {
        return emergenC;
    }

    public void setEmergenC(String emergenC) {
        this.emergenC = emergenC;
    }

    public String getStampDName() {
        return stampDName;
    }

    public void setStampDName(String stampDName) {
        this.stampDName = stampDName;
    }

    public String getDopInfo() {
        return dopInfo;
    }

    public void setDopInfo(String dopInfo) {
        this.dopInfo = dopInfo;
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
        Aviso2CimSmgsDanGruzDTO that = (Aviso2CimSmgsDanGruzDTO) o;
        return Objects.equals(carDName, that.carDName) &&
                Objects.equals(carDNameDe, that.carDNameDe) &&
                Objects.equals(codDanger, that.codDanger) &&
                Objects.equals(numOon, that.numOon) &&
                Objects.equals(clazz, that.clazz) &&
                Objects.equals(dangSign, that.dangSign) &&
                Objects.equals(groupPack, that.groupPack) &&
                Objects.equals(emergenC, that.emergenC) &&
                Objects.equals(stampDName, that.stampDName) &&
                Objects.equals(dopInfo, that.dopInfo) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(carDName, carDNameDe, codDanger, numOon, clazz, dangSign, groupPack, emergenC, stampDName, dopInfo, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsDanGruzDTO{" +
                "carDName='" + carDName + '\'' +
                ", carDNameDe='" + carDNameDe + '\'' +
                ", codDanger='" + codDanger + '\'' +
                ", numOon='" + numOon + '\'' +
                ", clazz='" + clazz + '\'' +
                ", dangSign='" + dangSign + '\'' +
                ", groupPack='" + groupPack + '\'' +
                ", emergenC='" + emergenC + '\'' +
                ", stampDName='" + stampDName + '\'' +
                ", dopInfo='" + dopInfo + '\'' +
                ", sort=" + sort +
                '}';
    }
}
