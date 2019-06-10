package com.bivc.cimsmgs.db.nsi;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class CargoDanGV {
    private Long carDUn;
    private Long carDId;
    private String carDCode;
    private String carDName;
    private Date carDBgn;
    private Date carDEnd;

    public Date getCarDEnd() {
        return carDEnd;
    }

    public void setCarDEnd(Date carDEnd) {
        this.carDEnd = carDEnd;
    }

    public Date getCarDBgn() {
        return carDBgn;
    }

    public void setCarDBgn(Date carDBgn) {
        this.carDBgn = carDBgn;
    }

    public String getCarDName() {
        return carDName;
    }

    public void setCarDName(String carDName) {
        this.carDName = carDName;
    }

    public String getCarDCode() {
        return carDCode;
    }

    public void setCarDCode(String carDCode) {
        this.carDCode = carDCode;
    }

    public Long getCarDId() {
        return carDId;
    }

    public void setCarDId(Long carDId) {
        this.carDId = carDId;
    }

    public Long getCarDUn() {
        return carDUn;
    }

    public void setCarDUn(Long carDUn) {
        this.carDUn = carDUn;
    }
}
