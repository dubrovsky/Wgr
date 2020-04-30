package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonBackReference;

import java.io.Serializable;

/**
 * Текст в штампе
 */
public class PrintDataStampText implements Serializable {
    private Long hid;
    @JsonBackReference
    private PrintDataStamp stamp;
    private float rllx;
    private float rlly;
    private float rurx;
    private float rury;
    private String color;
    private String fontFamily;
    private Float fontSize;
    private Float leading;
    private Boolean bold;
    private Boolean italic;
    private boolean underline;
    private Boolean uppercase;
    private Integer rotate;
    private boolean tabular;
    private String name;
    private String mask;
    private String txt;

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

    public String getColor() {
        return color;
    }

    public String getFontFamily() {
        return fontFamily;
    }

    public Float getFontSize() {
        return fontSize;
    }

    public Float getLeading() {
        return leading;
    }

    public Boolean getBold() {
        return bold;
    }

    public Boolean getItalic() {
        return italic;
    }

    public boolean isUnderline() {
        return underline;
    }

    public Boolean getUppercase() {
        return uppercase;
    }

    public Integer getRotate() {
        return rotate;
    }

    public boolean isTabular() {
        return tabular;
    }

    public String getName() {
        return name;
    }

    public String getMask() {
        return mask;
    }

    public String getTxt() {
        return txt;
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

    public void setColor(String color) {
        this.color = color;
    }

    public void setFontFamily(String fontFamily) {
        this.fontFamily = fontFamily;
    }

    public void setFontSize(Float fontSize) {
        this.fontSize = fontSize;
    }

    public void setLeading(Float leading) {
        this.leading = leading;
    }

    public void setBold(Boolean bold) {
        this.bold = bold;
    }

    public void setItalic(Boolean italic) {
        this.italic = italic;
    }

    public void setUnderline(boolean underline) {
        this.underline = underline;
    }

    public void setUppercase(Boolean uppercase) {
        this.uppercase = uppercase;
    }

    public void setRotate(Integer rotate) {
        this.rotate = rotate;
    }

    public void setTabular(boolean tabular) {
        this.tabular = tabular;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public void setTxt(String txt) {
        this.txt = txt;
    }

    public PrintDataStampText(Long hid, PrintDataStamp stamp, float rllx, float rlly, float rurx, float rury, String color, String fontFamily, Float fontSize, Float leading, Boolean bold, Boolean italic, boolean underline, Boolean uppercase, Integer rotate, boolean tabular, String name, String mask, String txt) {
        this.hid = hid;
        this.stamp = stamp;
        this.rllx = rllx;
        this.rlly = rlly;
        this.rurx = rurx;
        this.rury = rury;
        this.color = color;
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.leading = leading;
        this.bold = bold;
        this.italic = italic;
        this.underline = underline;
        this.uppercase = uppercase;
        this.rotate = rotate;
        this.tabular = tabular;
        this.name = name;
        this.mask = mask;
        this.txt = txt;
    }

    public PrintDataStampText() {
    }

    @Override
    public String toString() {
        return "PrintDataStampText{" +
                "hid=" + hid +
                ", stamp=" + stamp +
                ", rllx=" + rllx +
                ", rlly=" + rlly +
                ", rurx=" + rurx +
                ", rury=" + rury +
                ", color='" + color + '\'' +
                ", fontFamily='" + fontFamily + '\'' +
                ", fontSize=" + fontSize +
                ", leading=" + leading +
                ", bold=" + bold +
                ", italic=" + italic +
                ", underline=" + underline +
                ", uppercase=" + uppercase +
                ", rotate=" + rotate +
                ", tabular=" + tabular +
                ", name='" + name + '\'' +
                ", mask='" + mask + '\'' +
                ", txt='" + txt + '\'' +
                '}';
    }
}
