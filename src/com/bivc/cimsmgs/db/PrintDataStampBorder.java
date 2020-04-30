package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.io.Serializable;

/**
 * Границы штампа
 */
public class PrintDataStampBorder implements Serializable {
    private Long hid;
    @JsonBackReference
    private PrintDataStamp stamp;
    private byte border;
    private float rllx;
    private float rlly;
    private float rurx;
    private float rury;
    private String color;
    private Integer radius;

    public Long getHid() {
        return hid;
    }

    public PrintDataStamp getStamp() {
        return stamp;
    }

    public byte getBorder() {
        return border;
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

    public String getColor() {
        return color;
    }

    public Integer getRadius() {
        return radius;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setStamp(PrintDataStamp stamp) {
        this.stamp = stamp;
    }

    public void setBorder(byte border) {
        this.border = border;
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

    public void setColor(String color) {
        this.color = color;
    }

    public void setRadius(Integer radius) {
        this.radius = radius;
    }

    public PrintDataStampBorder(Long hid, PrintDataStamp stamp, byte border, float rllx, float rlly, float rurx, float rury, String color, Integer radius) {
        this.hid = hid;
        this.stamp = stamp;
        this.border = border;
        this.rllx = rllx;
        this.rlly = rlly;
        this.rurx = rurx;
        this.rury = rury;
        this.color = color;
        this.radius = radius;
    }

    public PrintDataStampBorder() {
    }

    @Override
    public String toString() {
        return "PrintDataStampBorder{" +
                "hid=" + hid +
                ", stamp=" + stamp +
                ", border=" + border +
                ", rllx=" + rllx +
                ", rlly=" + rlly +
                ", rurx=" + rurx +
                ", rury=" + rury +
                ", color='" + color + '\'' +
                ", radius=" + radius +
                '}';
    }
}
