package com.bivc.cimsmgs.db.nsi;

import java.io.Serializable;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * @author p.dzeviarylin
 */
public class Carrier implements Serializable {
    private Long carrUn;
    private Long carrId;
    private String countryNo;
    private String carrNo;
    private String carrNameShort;
    private String carrName;
    private Date carrBgn;
    private Date carrEnd;

    public Date getCarrEnd() {
        return carrEnd;
    }

    public void setCarrEnd(Date carrEnd) {
        this.carrEnd = carrEnd;
    }

    public Date getCarrBgn() {
        return carrBgn;
    }

    public void setCarrBgn(Date carrBgn) {
        this.carrBgn = carrBgn;
    }

    public String getCarrName() {
        return carrName;
    }

    public void setCarrName(String carrName) {
        this.carrName = carrName;
    }

    public String getCarrNameShort() {
        return carrNameShort;
    }

    public void setCarrNameShort(String carrNameShort) {
        this.carrNameShort = carrNameShort;
    }

    public String getCarrNo() {
        return carrNo;
    }

    public void setCarrNo(String carrNo) {
        this.carrNo = carrNo;
    }

    public String getCountryNo() {
        return countryNo;
    }

    public void setCountryNo(String countryNo) {
        this.countryNo = countryNo;
    }

    public Long getCarrId() {
        return carrId;
    }

    public void setCarrId(Long carrId) {
        this.carrId = carrId;
    }

    public Long getCarrUn() {
        return carrUn;
    }

    public void setCarrUn(Long carrUn) {
        this.carrUn = carrUn;
    }

    public void prepare4save() {
        setCarrBgn(new Date(System.currentTimeMillis() - 1000*60*60*24));
        setCarrEnd(new GregorianCalendar(3000,1,1).getTime());
    }
}
