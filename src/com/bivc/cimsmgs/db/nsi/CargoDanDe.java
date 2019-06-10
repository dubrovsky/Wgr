package com.bivc.cimsmgs.db.nsi;

/**
 * @author p.dzeviarylin
 */
public class CargoDanDe {
    private Long hid;
    private String carDNameDe;
    private String numOonDe;
    private String ridNhmCode;
    private String bem;

    public String getBem() {
        return bem;
    }

    public void setBem(String bem) {
        this.bem = bem;
    }

    public String getRidNhmCode() {
        return ridNhmCode;
    }

    public void setRidNhmCode(String ridNhmCode) {
        this.ridNhmCode = ridNhmCode;
    }

    public String getNumOonDe() {
        return numOonDe;
    }

    public void setNumOonDe(String numOonDe) {
        this.numOonDe = numOonDe;
    }

    public String getCarDNameDe() {
        return carDNameDe;
    }

    public void setCarDNameDe(String carDNameDe) {
        this.carDNameDe = carDNameDe;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
