package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Base64;

public class PrintDataStampPicture {

    private Long hid;
    @JsonBackReference
    private PrintDataStamp stamp;
    private float rllx;
    private float rlly;
    private float rurx;
    private float rury;
    private byte[] pict;
    private String descr;

    public Long getHid() {
        return hid;
    }

    public PrintDataStamp getStamp() {
        return stamp;
    }

    public float getRllx() {
        return rllx;
    }

    public float getRlly() {
        return rlly;
    }

    public float getRurx() {
        return rurx;
    }

    public float getRury() {
        return rury;
    }

    public byte[] getPict() {

       // return Base64.getEncoder().encode(pict);
        return pict;
    }

    public String getDescr() {
        return descr;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setStamp(PrintDataStamp stamp) {
        this.stamp = stamp;
    }

    public void setRllx(float rllx) {
        this.rllx = rllx;
    }

    public void setRlly(float rlly) {
        this.rlly = rlly;
    }

    public void setRurx(float rurx) {
        this.rurx = rurx;
    }

    public void setRury(float rury) {
        this.rury = rury;
    }

    public void setPict(byte[] pict) {
        this.pict = pict;
    }

    public void setPict(String pict) {

    //    String base64Image = pict.split(",")[1];
        this.pict =  javax.xml.bind.DatatypeConverter.parseBase64Binary(pict);
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public PrintDataStampPicture(Long hid, PrintDataStamp stamp, float rllx, float rlly, float rurx, float rury, byte[] pict, String descr) {
        this.hid = hid;
        this.stamp = stamp;
        this.rllx = rllx;
        this.rlly = rlly;
        this.rurx = rurx;
        this.rury = rury;
        this.pict = pict;
        this.descr = descr;
    }

    public PrintDataStampPicture() {
    }

    @Override
    public String toString() {
        return "PrintDataStampPicture{" +
                "hid=" + hid +
                ", stamp=" + stamp +
                ", rllx=" + rllx +
                ", rlly=" + rlly +
                ", rurx=" + rurx +
                ", rury=" + rury +
                ", pict=" + Arrays.toString(pict) +
                ", descr='" + descr + '\'' +
                '}';
    }
}
