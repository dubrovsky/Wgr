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
    private String text3;
    private String text4;
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

    public String getText3() {
        return text3;
    }

    public String getText4() {
        return text4;
    }

    public void setText3(String text3) {
        this.text3 = text3;
    }

    public void setText4(String text4) {
        this.text4 = text4;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsDocsDTO that = (Aviso2CimSmgsDocsDTO) o;
        return Objects.equals(ncas, that.ncas) &&
                Objects.equals(text, that.text) &&
                Objects.equals(text2, that.text2) &&
                Objects.equals(text3, that.text3) &&
                Objects.equals(text4, that.text4) &&
                Objects.equals(ndoc, that.ndoc) &&
                Objects.equals(dat, that.dat) &&
                Objects.equals(ncopy, that.ncopy) &&
                Objects.equals(code, that.code) &&
                Objects.equals(fieldNum, that.fieldNum) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ncas, text, text2, text3, text4, ndoc, dat, ncopy, code, fieldNum, sort);
    }

    public Aviso2CimSmgsDocsDTO(String ncas, String text, String text2, String text3, String text4, String ndoc, Date dat, Integer ncopy, String code, String fieldNum, Integer sort) {
        this.ncas = ncas;
        this.text = text;
        this.text2 = text2;
        this.text3 = text3;
        this.text4 = text4;
        this.ndoc = ndoc;
        this.dat = dat;
        this.ncopy = ncopy;
        this.code = code;
        this.fieldNum = fieldNum;
        this.sort = sort;
    }
}
