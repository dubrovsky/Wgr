package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.StringUtils;

import java.util.Date;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
@JsonIgnoreProperties({"cimSmgsGruz"})
public class CimSmgsDanGruz {
    private long hid;
    private CimSmgsGruz cimSmgsGruz;
    private String carDName;
    private String carDNameDe;
    private String codDanger;
    private String numOon;
//    private String numOonDe;
    private String dangSign;
    private String groupPack;
    private String emergenC;
    private String stampDName;
    private String dopInfo;
    private String clazz;
    private Date dattr;
    private Byte sort;

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public CimSmgsDanGruz() {
    }

    public CimSmgsDanGruz(long hid, CimSmgsGruz cimSmgsGruz, String carDName, String carDNameDe, String codDanger, String numOon, String numOonDe, String dangSign, String groupPack, String emergenC, String stampDName, String dopInfo, String clazz, Date dattr, Byte sort) {
        this.hid = hid;
        this.cimSmgsGruz = cimSmgsGruz;
        this.carDName = carDName;
        this.carDNameDe = carDNameDe;
        this.codDanger = codDanger;
        this.numOon = numOon;
//        this.numOonDe = numOonDe;
        this.dangSign = dangSign;
        this.groupPack = groupPack;
        this.emergenC = emergenC;
        this.stampDName = stampDName;
        this.dopInfo = dopInfo;
        this.clazz = clazz;
        this.dattr = dattr;
        this.sort = sort;
    }

    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }

    public String getDopInfo() {
        return dopInfo;
    }

    public void setDopInfo(String dopInfo) {
        this.dopInfo = dopInfo;
    }

    public String getStampDName() {
        return stampDName;
    }

    public void setStampDName(String stampDName) {
        this.stampDName = stampDName;
    }

    public String getEmergenC() {
        return emergenC;
    }

    public void setEmergenC(String emergenC) {
        this.emergenC = emergenC;
    }

    public String getGroupPack() {
        return groupPack;
    }

    public void setGroupPack(String groupPack) {
        this.groupPack = groupPack;
    }

    public String getDangSign() {
        return dangSign;
    }

    public void setDangSign(String dangSign) {
        this.dangSign = dangSign;
    }

    /*public String getNumOonDe() {
        return numOonDe;
    }

    public void setNumOonDe(String numOonDe) {
        this.numOonDe = numOonDe;
    }*/

    public String getNumOon() {
        return numOon;
    }

    public void setNumOon(String numOon) {
        this.numOon = numOon;
    }

    public String getCodDanger() {
        return codDanger;
    }

    public void setCodDanger(String codDanger) {
        this.codDanger = codDanger;
    }

    public String getCarDNameDe() {
        return carDNameDe;
    }

    public void setCarDNameDe(String carDNameDe) {
        this.carDNameDe = carDNameDe;
    }

    public String getCarDName() {
        return carDName;
    }

    public void setCarDName(String carDName) {
        this.carDName = carDName;
    }

    public CimSmgsGruz getCimSmgsGruz() {
        return cimSmgsGruz;
    }

    public void setCimSmgsGruz(CimSmgsGruz cimSmgsGruz) {
        this.cimSmgsGruz = cimSmgsGruz;
    }

    public long getHid() {
        return hid;
    }

    public void setHid(long hid) {
        this.hid = hid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgsDanGruz that = (CimSmgsDanGruz) o;
        return hid == that.hid &&
                Objects.equals(cimSmgsGruz != null ? cimSmgsGruz.getHid() : null, that.cimSmgsGruz != null ? that.cimSmgsGruz.getHid() : null) &&
                Objects.equals(carDName, that.carDName) &&
                Objects.equals(carDNameDe, that.carDNameDe) &&
                Objects.equals(codDanger, that.codDanger) &&
                Objects.equals(numOon, that.numOon) &&
//                Objects.equals(numOonDe, that.numOonDe) &&
                Objects.equals(dangSign, that.dangSign) &&
                Objects.equals(groupPack, that.groupPack) &&
                Objects.equals(emergenC, that.emergenC) &&
                Objects.equals(stampDName, that.stampDName) &&
                Objects.equals(dopInfo, that.dopInfo) &&
                Objects.equals(clazz, that.clazz) &&
                Objects.equals(dattr, that.dattr) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, cimSmgsGruz != null ? cimSmgsGruz.getHid() : "", carDName, carDNameDe, codDanger, numOon, dangSign, groupPack, emergenC, stampDName, dopInfo, clazz, dattr, sort);
    }

    public StringBuilder danGruzRu4CimSmgsEu() {
        StringBuilder result = new StringBuilder();
        result.append(StringUtils.isNotBlank(codDanger) ? codDanger : "");
        result.append(StringUtils.isNotBlank(numOon) ? "/UN" + numOon : "");
        result.append(StringUtils.isNotBlank(carDName) ? " " + carDName : "");
        result.append(StringUtils.isNotBlank(clazz) ? " " + clazz : "");
        result.append(StringUtils.isNotBlank(dangSign) ? " (" + dangSign + ")" : "");
        result.append(StringUtils.isNotBlank(groupPack) ? ", " + groupPack : "");
        result.append(StringUtils.isNotBlank(emergenC) ? ", AK-" + emergenC : "");
        result.append(StringUtils.isNotBlank(stampDName) ? ", " + stampDName : "");
        result.append(StringUtils.isNotBlank(dopInfo) ? " - " + dopInfo : "");

        return result;
    }

    public StringBuilder danGruzDe4CimSmgsEu() {
        StringBuilder result = new StringBuilder();
        result.append(StringUtils.isNotBlank(codDanger) ? codDanger : "");
        result.append(StringUtils.isNotBlank(numOon) ? "/UN" + numOon : "");
        result.append(StringUtils.isNotBlank(carDNameDe) ? " " + carDNameDe : "");
        result.append(StringUtils.isNotBlank(clazz) ? " " + clazz : "");
        result.append(StringUtils.isNotBlank(dangSign) ? " (" + dangSign + ")" : "");
        result.append(StringUtils.isNotBlank(groupPack) ? ", " + groupPack : "");
        result.append(StringUtils.isNotBlank(dopInfo) ? " - " + dopInfo : "");

        return result;
    }
}
