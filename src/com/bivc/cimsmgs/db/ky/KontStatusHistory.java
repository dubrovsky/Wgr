package com.bivc.cimsmgs.db.ky;

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;
import java.util.Date;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("kontStatusHistoryFilter")
public class KontStatusHistory implements Serializable, Comparable<KontStatusHistory> {
    private Long hid;
    private Kont kont;
    private KontStatus status;

    private Poezd poezd;
    private Vagon vagon;
    private Avto avto;
    private Yard yard;

    private String trans;
    private Date dattr;
    private String un;
    private boolean active;
    private boolean visible;

    public boolean isVisible() {
        return visible;
    }

    public void setVisible(boolean visible) {
        this.visible = visible;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public KontStatusHistory(KontStatus status, Kont kont, Poezd poezd, Vagon vagon){
        this.kont = kont;
        this.status = status;
        this.poezd = poezd;
        this.vagon = vagon;
        this.active = true;
        this.visible = true;
    }

    public KontStatusHistory(KontStatus status, Kont kont, Avto avto){
        this.kont = kont;
        this.status = status;
        this.avto = avto;
        this.active = true;
        this.visible = true;
    }

    public KontStatusHistory(KontStatus status, Kont kont, Yard yard){
        this.kont = kont;
        this.status = status;
        this.yard = yard;
        this.active = true;
        this.visible = true;
    }

    public KontStatusHistory(KontStatus status, Kont kont){
        this.kont = kont;
        this.status = status;
        this.active = false;
        this.visible = true;
    }

    public Yard getYard() {
        return yard;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public Avto getAvto() {
        return avto;
    }

    public void setAvto(Avto avto) {
        this.avto = avto;
    }

    public Vagon getVagon() {
        return vagon;
    }

    public void setVagon(Vagon vagon) {
        this.vagon = vagon;
    }

    public Poezd getPoezd() {
        return poezd;
    }

    public void setPoezd(Poezd poezd) {
        this.poezd = poezd;
    }

    public KontStatusHistory() {
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    /*public KontStatus getKontStatus() {
        return kontStatus;
    }

    public void setKontStatus(KontStatus kontStatus) {
        this.kontStatus = kontStatus;
    }*/

    public Kont getKont() {
        return kont;
    }

    public void setKont(Kont kont) {
        this.kont = kont;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }


    public KontStatus getStatus() {
        return status;
    }

    public void setStatus(KontStatus status) {
        this.status = status;
    }

    @Override
    public int compareTo(KontStatusHistory that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if (thisHid == null) {
            return AFTER;
        } else if (thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }


}
