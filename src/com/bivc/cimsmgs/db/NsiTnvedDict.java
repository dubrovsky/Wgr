package com.bivc.cimsmgs.db;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class NsiTnvedDict {

    private BigDecimal hid;
    private Date dattr;
    private String trans;
    private String un;
    private String kod;
    private String vendorCode;
    private String naim;
    private String naimEn;

    public BigDecimal getHid() {
        return hid;
    }

    public Date getDattr() {
        return dattr;
    }

    public String getTrans() {
        return trans;
    }

    public String getUn() {
        return un;
    }

    public String getKod() {
        return kod;
    }

    public String getVendorCode() {
        return vendorCode;
    }

    public String getNaim() {
        return naim;
    }

    public String getNaimEn() {
        return naimEn;
    }

    public void setHid(BigDecimal hid) {
        this.hid = hid;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public void setKod(String kod) {
        this.kod = kod;
    }

    public void setVendorCode(String vendorCode) {
        this.vendorCode = vendorCode;
    }

    public void setNaim(String naim) {
        this.naim = naim;
    }

    public void setNaimEn(String naimEn) {
        this.naimEn = naimEn;
    }

    public NsiTnvedDict(BigDecimal hid, Date dattr, String trans, String un, String kod, String vendorCode, String naim, String naimEn) {
        this.hid = hid;
        this.dattr = dattr;
        this.trans = trans;
        this.un = un;
        this.kod = kod;
        this.vendorCode = vendorCode;
        this.naim = naim;
        this.naimEn = naimEn;
    }

    public NsiTnvedDict() {
    }

    @Override
    public String toString() {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ssZ");
        return "NsiTnvedDict{" +
                "hid=" + hid +
                ", dattr=" + (dattr!=null?simpleDateFormat.format(dattr):"") +
                ", trans='" + trans + '\'' +
                ", un='" + un + '\'' +
                ", kod='" + kod + '\'' +
                ", vendorCode='" + vendorCode + '\'' +
                ", naim='" + naim + '\'' +
                ", naimEn='" + naimEn + '\'' +
                '}';
    }
}
