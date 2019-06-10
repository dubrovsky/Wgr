package com.bivc.cimsmgs.db.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiKont {
    private Long hid;
    private String nkont;
    private String yearbuild;
    private String type;
    private Integer massaTar;
    private Integer podSila;
    private Long vol;
    private String trans;
    private Date dattr;
    private String un;
    private Date altered;
    private NsiKyOwners owner;
    private String sizeFoot;
    private String naim_sob;

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public String getSizeFoot() {
        return sizeFoot;
    }

    public void setSizeFoot(String sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }

    public enum FilterFields{
        NKON("nkont")
        ;
        private final String name;

        FilterFields(String name){
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNkont() {
        return nkont;
    }

    public void setNkont(String nkont) {
        this.nkont = nkont;
    }

    public String getYearbuild() {
        return yearbuild;
    }

    public void setYearbuild(String yearbuild) {
        this.yearbuild = yearbuild;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getMassaTar() {
        return massaTar;
    }

    public void setMassaTar(Integer massaTar) {
        this.massaTar = massaTar;
    }

    public Integer getPodSila() {
        return podSila;
    }

    public void setPodSila(Integer podSila) {
        this.podSila = podSila;
    }

    public Long getVol() {
        return vol;
    }

    public void setVol(Long vol) {
        this.vol = vol;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NsiKont nsiKont = (NsiKont) o;

        if (altered != null ? !altered.equals(nsiKont.altered) : nsiKont.altered != null) return false;
        if (dattr != null ? !dattr.equals(nsiKont.dattr) : nsiKont.dattr != null) return false;
        if (hid != null ? !hid.equals(nsiKont.hid) : nsiKont.hid != null) return false;
        if (massaTar != null ? !massaTar.equals(nsiKont.massaTar) : nsiKont.massaTar != null) return false;
        if (nkont != null ? !nkont.equals(nsiKont.nkont) : nsiKont.nkont != null) return false;
        if (podSila != null ? !podSila.equals(nsiKont.podSila) : nsiKont.podSila != null) return false;
        if (trans != null ? !trans.equals(nsiKont.trans) : nsiKont.trans != null) return false;
        if (type != null ? !type.equals(nsiKont.type) : nsiKont.type != null) return false;
        if (un != null ? !un.equals(nsiKont.un) : nsiKont.un != null) return false;
        if (vol != null ? !vol.equals(nsiKont.vol) : nsiKont.vol != null) return false;
        if (yearbuild != null ? !yearbuild.equals(nsiKont.yearbuild) : nsiKont.yearbuild != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hid != null ? hid.hashCode() : 0;
        result = 31 * result + (nkont != null ? nkont.hashCode() : 0);
        result = 31 * result + (yearbuild != null ? yearbuild.hashCode() : 0);
        result = 31 * result + (type != null ? type.hashCode() : 0);
        result = 31 * result + (massaTar != null ? massaTar.hashCode() : 0);
        result = 31 * result + (podSila != null ? podSila.hashCode() : 0);
        result = 31 * result + (vol != null ? vol.hashCode() : 0);
        result = 31 * result + (trans != null ? trans.hashCode() : 0);
        result = 31 * result + (dattr != null ? dattr.hashCode() : 0);
        result = 31 * result + (un != null ? un.hashCode() : 0);
        result = 31 * result + (altered != null ? altered.hashCode() : 0);
        return result;
    }
}
