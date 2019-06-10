package com.bivc.cimsmgs.dto;

import java.util.Date;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsDocsDTO {

    private String ncas;
    private String text;
    private String text2;
    private String ndoc;
    private Date dat;
    private Integer ncopy;
    private String code;
    private String fieldNum;
    private Integer sort;

    public Aviso2CimSmgsDocsDTO() {
    }

    public String getNcas() {
        return ncas;
    }

    public void setNcas(String ncas) {
        this.ncas = ncas;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getText2() {
        return text2;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }

    public String getNdoc() {
        return ndoc;
    }

    public void setNdoc(String ndoc) {
        this.ndoc = ndoc;
    }

    public Date getDat() {
        return dat;
    }

    public void setDat(Date dat) {
        this.dat = dat;
    }

    public Integer getNcopy() {
        return ncopy;
    }

    public void setNcopy(Integer ncopy) {
        this.ncopy = ncopy;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getFieldNum() {
        return fieldNum;
    }

    public void setFieldNum(String fieldNum) {
        this.fieldNum = fieldNum;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsDocsDTO that = (Aviso2CimSmgsDocsDTO) o;
        return Objects.equals(ncas, that.ncas) &&
                Objects.equals(text, that.text) &&
                Objects.equals(text2, that.text2) &&
                Objects.equals(ndoc, that.ndoc) &&
                Objects.equals(dat, that.dat) &&
                Objects.equals(ncopy, that.ncopy) &&
                Objects.equals(code, that.code) &&
                Objects.equals(fieldNum, that.fieldNum) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ncas, text, text2, ndoc, dat, ncopy, code, fieldNum, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsDocsDTO{" +
                "ncas='" + ncas + '\'' +
                ", text='" + text + '\'' +
                ", text2='" + text2 + '\'' +
                ", ndoc='" + ndoc + '\'' +
                ", dat=" + dat +
                ", ncopy=" + ncopy +
                ", code='" + code + '\'' +
                ", fieldNum='" + fieldNum + '\'' +
                ", sort=" + sort +
                '}';
    }
}
