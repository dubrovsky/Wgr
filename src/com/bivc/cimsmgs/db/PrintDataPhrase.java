package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author p.dzeviarylin
 */

@JsonIgnoreProperties({"printData"})
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PrintDataPhrase {
    private Long hid;
    private PrintData printData;
    private Integer sort;
    private String name;
    private String descr;
    private Byte fontSize;
    private Boolean bold;
    private Boolean uppercase;
    private Boolean border;
    private Boolean underline;
    private String fontFamily;
    private Byte leading;
    private Integer rotate;

    public Integer getRotate() {
        return rotate;
    }

    public void setRotate(Integer rotate) {
        this.rotate = rotate;
    }

    public Byte getLeading() {
        return leading;
    }

    public void setLeading(Byte leading) {
        this.leading = leading;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public Boolean getUnderline() {
        return underline;
    }

    public void setUnderline(Boolean underline) {
        this.underline = underline;
    }

    public Boolean getBorder() {
        return border;
    }

    public void setBorder(Boolean border) {
        this.border = border;
    }

    public Boolean getUppercase() {
        return uppercase;
    }

    public void setUppercase(Boolean uppercase) {
        this.uppercase = uppercase;
    }

    public Boolean getBold() {
        return bold;
    }

    public void setBold(Boolean bold) {
        this.bold = bold;
    }

    public Byte getFontSize() {
        return fontSize;
    }

    public void setFontSize(Byte fontSize) {
        this.fontSize = fontSize;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

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
