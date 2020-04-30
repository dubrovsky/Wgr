package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Штамп
 */
public class PrintDataStamp implements Serializable {
    private Long hid;
    private Date dattr;
    private String un;
    private String trans;
    private Date altered;
    private String descr;
    private String codePer;
    private float llx;
    private float lly;
    private float urx;
    private float ury;
    @JsonManagedReference
    private Set<PrintDataStampBorder> borders =  new HashSet<>();
    @JsonManagedReference
    private Set<PrintDataStampText> texts =  new HashSet<>();
    @JsonManagedReference
    private Set<PrintDataStampPicture> pics =  new HashSet<>();

    public Long getHid() {
        return hid;
    }

    public Date getDattr() {
        return dattr;
    }

    public String getUn() {
        return un;
    }

    public String getTrans() {
        return trans;
    }

    public Date getAltered() {
        return altered;
    }

    public String getDescr() {
        return descr;
    }

    public String getCodePer() {
        return codePer;
    }

    public float getLlx() {
        return llx;
    }

    public float getLly() {
        return lly;
    }

    public float getUrx() {
        return urx;
    }

    public float getUry() {
        return ury;
    }

    public Set<PrintDataStampBorder> getBorders() {
        return borders;
    }

    public Set<PrintDataStampText> getTexts() {
        return texts;
    }

    public Set<PrintDataStampPicture> getPics() {
        return pics;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public void setCodePer(String codePer) {
        this.codePer = codePer;
    }

    public void setLlx(float llx) {
        this.llx = llx;
    }

    public void setLly(float lly) {
        this.lly = lly;
    }

    public void setUrx(float urx) {
        this.urx = urx;
    }

    public void setUry(float ury) {
        this.ury = ury;
    }

    public void setBorders(Set<PrintDataStampBorder> borders) {
        this.borders = borders;
    }

    public void setTexts(Set<PrintDataStampText> texts) {
        this.texts = texts;
    }

    public void setPics(Set<PrintDataStampPicture> pics) {
        this.pics = pics;
    }

    public PrintDataStamp(Long hid, Date dattr, String un, String trans, Date altered, String descr, String codePer, float llx, float lly, float urx, float ury, Set<PrintDataStampBorder> borders, Set<PrintDataStampText> texts, Set<PrintDataStampPicture> pics) {
        this.hid = hid;
        this.dattr = dattr;
        this.un = un;
        this.trans = trans;
        this.altered = altered;
        this.descr = descr;
        this.codePer = codePer;
        this.llx = llx;
        this.lly = lly;
        this.urx = urx;
        this.ury = ury;
        this.borders = borders;
        this.texts = texts;
        this.pics = pics;
    }

    public PrintDataStamp() {
    }

    @Override
    public String toString() {
        return "PrintDataStamp{" +
                "hid=" + hid +
                ", dattr=" + dattr +
                ", un='" + un + '\'' +
                ", trans='" + trans + '\'' +
                ", altered=" + altered +
                ", descr='" + descr + '\'' +
                ", codePer='" + codePer + '\'' +
                ", llx=" + llx +
                ", lly=" + lly +
                ", urx=" + urx +
                ", ury=" + ury +
                '}';
    }
}
