package com.bivc.cimsmgs.db.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiVagUzky {
    private Long hid;
    private String nvaguf;
    private String nvagu;
    private Date dexpB;
    private Date dexpEnd;
    private String podtv;
    private String koddor;
    private String kodadm;
    private String sobs;
    private String vidkod;
    private String aktnvagu;
    private String kodownvag;
    private Date dparkIn;
    private Integer osi;
    private Integer razvor;
    private Long mnetvag;
    private Long grpodvag;
    private Long dlvag;
    private String typevag;
    private Date dattr;
    private String trans;
    private String un;
    private Integer hidOwn;
    private Date dLastrem;
    private Date dPlanrem;
    private Date altered;
    private NsiKyOwners owner;

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }

    public enum FilterFields{
        NVAG("nvagu")
        ;
        private final String name;

        FilterFields(String name){
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNvaguf() {
        return nvaguf;
    }

    public void setNvaguf(String nvaguf) {
        this.nvaguf = nvaguf;
    }

    public String getNvagu() {
        return nvagu;
    }

    public void setNvagu(String nvagu) {
        this.nvagu = nvagu;
    }

    public Date getDexpB() {
        return dexpB;
    }

    public void setDexpB(Date dexpB) {
        this.dexpB = dexpB;
    }

    public Date getDexpEnd() {
        return dexpEnd;
    }

    public void setDexpEnd(Date dexpEnd) {
        this.dexpEnd = dexpEnd;
    }

    public String getPodtv() {
        return podtv;
    }

    public void setPodtv(String podtv) {
        this.podtv = podtv;
    }

    public String getKoddor() {
        return koddor;
    }

    public void setKoddor(String koddor) {
        this.koddor = koddor;
    }

    public String getKodadm() {
        return kodadm;
    }

    public void setKodadm(String kodadm) {
        this.kodadm = kodadm;
    }

    public String getSobs() {
        return sobs;
    }

    public void setSobs(String sobs) {
        this.sobs = sobs;
    }

    public String getVidkod() {
        return vidkod;
    }

    public void setVidkod(String vidkod) {
        this.vidkod = vidkod;
    }

    public String getAktnvagu() {
        return aktnvagu;
    }

    public void setAktnvagu(String aktnvagu) {
        this.aktnvagu = aktnvagu;
    }

    public String getKodownvag() {
        return kodownvag;
    }

    public void setKodownvag(String kodownvag) {
        this.kodownvag = kodownvag;
    }

    public Date getDparkIn() {
        return dparkIn;
    }

    public void setDparkIn(Date dparkIn) {
        this.dparkIn = dparkIn;
    }

    public Integer getOsi() {
        return osi;
    }

    public void setOsi(Integer osi) {
        this.osi = osi;
    }

    public Integer getRazvor() {
        return razvor;
    }

    public void setRazvor(Integer razvor) {
        this.razvor = razvor;
    }

    public Long getMnetvag() {
        return mnetvag;
    }

    public void setMnetvag(Long mnetvag) {
        this.mnetvag = mnetvag;
    }

    public Long getGrpodvag() {
        return grpodvag;
    }

    public void setGrpodvag(Long grpodvag) {
        this.grpodvag = grpodvag;
    }

    public Long getDlvag() {
        return dlvag;
    }

    public void setDlvag(Long dlvag) {
        this.dlvag = dlvag;
    }

    public String getTypevag() {
        return typevag;
    }

    public void setTypevag(String typevag) {
        this.typevag = typevag;
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

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Integer getHidOwn() {
        return hidOwn;
    }

    public void setHidOwn(Integer hidOwn) {
        this.hidOwn = hidOwn;
    }

    public Date getdLastrem() {
        return dLastrem;
    }

    public void setdLastrem(Date dLastrem) {
        this.dLastrem = dLastrem;
    }

    public Date getdPlanrem() {
        return dPlanrem;
    }

    public void setdPlanrem(Date dPlanrem) {
        this.dPlanrem = dPlanrem;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NsiVagUzky that = (NsiVagUzky) o;

        if (aktnvagu != null ? !aktnvagu.equals(that.aktnvagu) : that.aktnvagu != null) return false;
        if (altered != null ? !altered.equals(that.altered) : that.altered != null) return false;
        if (dLastrem != null ? !dLastrem.equals(that.dLastrem) : that.dLastrem != null) return false;
        if (dPlanrem != null ? !dPlanrem.equals(that.dPlanrem) : that.dPlanrem != null) return false;
        if (dattr != null ? !dattr.equals(that.dattr) : that.dattr != null) return false;
        if (dexpB != null ? !dexpB.equals(that.dexpB) : that.dexpB != null) return false;
        if (dexpEnd != null ? !dexpEnd.equals(that.dexpEnd) : that.dexpEnd != null) return false;
        if (dlvag != null ? !dlvag.equals(that.dlvag) : that.dlvag != null) return false;
        if (dparkIn != null ? !dparkIn.equals(that.dparkIn) : that.dparkIn != null) return false;
        if (grpodvag != null ? !grpodvag.equals(that.grpodvag) : that.grpodvag != null) return false;
        if (hid != null ? !hid.equals(that.hid) : that.hid != null) return false;
        if (hidOwn != null ? !hidOwn.equals(that.hidOwn) : that.hidOwn != null) return false;
        if (kodadm != null ? !kodadm.equals(that.kodadm) : that.kodadm != null) return false;
        if (koddor != null ? !koddor.equals(that.koddor) : that.koddor != null) return false;
        if (kodownvag != null ? !kodownvag.equals(that.kodownvag) : that.kodownvag != null) return false;
        if (mnetvag != null ? !mnetvag.equals(that.mnetvag) : that.mnetvag != null) return false;
        if (nvagu != null ? !nvagu.equals(that.nvagu) : that.nvagu != null) return false;
        if (nvaguf != null ? !nvaguf.equals(that.nvaguf) : that.nvaguf != null) return false;
        if (osi != null ? !osi.equals(that.osi) : that.osi != null) return false;
        if (podtv != null ? !podtv.equals(that.podtv) : that.podtv != null) return false;
        if (razvor != null ? !razvor.equals(that.razvor) : that.razvor != null) return false;
        if (sobs != null ? !sobs.equals(that.sobs) : that.sobs != null) return false;
        if (trans != null ? !trans.equals(that.trans) : that.trans != null) return false;
        if (typevag != null ? !typevag.equals(that.typevag) : that.typevag != null) return false;
        if (un != null ? !un.equals(that.un) : that.un != null) return false;
        if (vidkod != null ? !vidkod.equals(that.vidkod) : that.vidkod != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hid != null ? hid.hashCode() : 0;
        result = 31 * result + (nvaguf != null ? nvaguf.hashCode() : 0);
        result = 31 * result + (nvagu != null ? nvagu.hashCode() : 0);
        result = 31 * result + (dexpB != null ? dexpB.hashCode() : 0);
        result = 31 * result + (dexpEnd != null ? dexpEnd.hashCode() : 0);
        result = 31 * result + (podtv != null ? podtv.hashCode() : 0);
        result = 31 * result + (koddor != null ? koddor.hashCode() : 0);
        result = 31 * result + (kodadm != null ? kodadm.hashCode() : 0);
        result = 31 * result + (sobs != null ? sobs.hashCode() : 0);
        result = 31 * result + (vidkod != null ? vidkod.hashCode() : 0);
        result = 31 * result + (aktnvagu != null ? aktnvagu.hashCode() : 0);
        result = 31 * result + (kodownvag != null ? kodownvag.hashCode() : 0);
        result = 31 * result + (dparkIn != null ? dparkIn.hashCode() : 0);
        result = 31 * result + (osi != null ? osi.hashCode() : 0);
        result = 31 * result + (razvor != null ? razvor.hashCode() : 0);
        result = 31 * result + (mnetvag != null ? mnetvag.hashCode() : 0);
        result = 31 * result + (grpodvag != null ? grpodvag.hashCode() : 0);
        result = 31 * result + (dlvag != null ? dlvag.hashCode() : 0);
        result = 31 * result + (typevag != null ? typevag.hashCode() : 0);
        result = 31 * result + (dattr != null ? dattr.hashCode() : 0);
        result = 31 * result + (trans != null ? trans.hashCode() : 0);
        result = 31 * result + (un != null ? un.hashCode() : 0);
        result = 31 * result + (altered != null ? altered.hashCode() : 0);
        result = 31 * result + (hidOwn != null ? hidOwn.hashCode() : 0);
        result = 31 * result + (dLastrem != null ? dLastrem.hashCode() : 0);
        result = 31 * result + (dPlanrem != null ? dPlanrem.hashCode() : 0);
        return result;
    }
}
