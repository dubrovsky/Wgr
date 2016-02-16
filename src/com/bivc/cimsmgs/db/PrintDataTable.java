package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.io.Serializable;

/**
 * @author p.dzeviarylin
 */

@JsonIgnoreProperties({"printData"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PrintDataTable implements Serializable {
    private Long hid;
    private PrintData printData;
//    private String name;
    private Float width;
    private Integer sort;
    private String descr;

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Float getWidth() {
        return width;
    }

    public void setWidth(Float width) {
        this.width = width;
    }

    /*public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }*/

    public PrintData getPrintData() {
        return printData;
    }

    public void setPrintData(PrintData printData) {
        this.printData = printData;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
