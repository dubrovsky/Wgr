package com.bivc.cimsmgs.db;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Blob;
import java.util.Date;

public class CimSmgsScan implements Serializable {
    private Long hid;
    private CimSmgs cimSmgs;
    private Blob files;
    private String fileName;
    private String un;
    private Date dattr;
    private String contentType;
    private BigDecimal length;
    private Route route;
    private PackDoc packDoc;

    public PackDoc getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public CimSmgsScan() {
    }

    public CimSmgsScan(Long hid, CimSmgs cimSmgs, Blob files, String fileName, String un, Date dattr, String contentType, BigDecimal length) {
        this.hid = hid;
        this.cimSmgs = cimSmgs;
        this.files = files;
        this.fileName = fileName;
        this.un = un;
        this.dattr = dattr;
        this.contentType = contentType;
        this.length = length;
    }

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public CimSmgs getCimSmgs() {
        return this.cimSmgs;
    }

    public void setCimSmgs(CimSmgs cimSmgs) {
        this.cimSmgs = cimSmgs;
    }

    public Blob getFiles() {
        return this.files;
    }

    public String getFileName() {
        return fileName;
    }

    public String getUn() {
        return un;
    }

    public Date getDattr() {
        return dattr;
    }

    public String getContentType() {
        return contentType;
    }

    public BigDecimal getLength() {
        return length;
    }

    public void setFiles(Blob files) {
        this.files = files;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public void setLength(BigDecimal length) {
        this.length = length;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CimSmgsScan that = (CimSmgsScan) o;

        return new EqualsBuilder()
                .append(hid, that.hid)
                .append(cimSmgs, that.cimSmgs)
                .append(files, that.files)
                .append(fileName, that.fileName)
                .append(un, that.un)
                .append(dattr, that.dattr)
                .append(contentType, that.contentType)
                .append(length, that.length)
                .append(route, that.route)
                .append(packDoc, that.packDoc)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(hid)
                .append(cimSmgs)
                .append(files)
                .append(fileName)
                .append(un)
                .append(dattr)
                .append(contentType)
                .append(length)
                .append(route)
                .append(packDoc)
                .toHashCode();
    }

}
