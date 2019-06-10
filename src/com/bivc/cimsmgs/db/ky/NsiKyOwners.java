package com.bivc.cimsmgs.db.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiKyOwners {
    private Long hid;
    private String nameown;
    private Boolean ownkont;
    private String adress;
    private String prim;
    private Date dattr;
    private String trans;
    private String un;
    private Boolean ownvag;
    private Boolean ownauto;
    private Date altered;

    public enum FilterFields{
        NAMEOWN("nameown")
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

    public String getNameown() {
        return nameown;
    }

    public void setNameown(String nameown) {
        this.nameown = nameown;
    }

    public Boolean getOwnkont() {
        return ownkont;
    }

    public void setOwnkont(Boolean ownkont) {
        this.ownkont = ownkont;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
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

    public Boolean getOwnvag() {
        return ownvag;
    }

    public void setOwnvag(Boolean ownvag) {
        this.ownvag = ownvag;
    }

    public Boolean getOwnauto() {
        return ownauto;
    }

    public void setOwnauto(Boolean ownauto) {
        this.ownauto = ownauto;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NsiKyOwners that = (NsiKyOwners) o;

        if (adress != null ? !adress.equals(that.adress) : that.adress != null) return false;
        if (altered != null ? !altered.equals(that.altered) : that.altered != null) return false;
        if (dattr != null ? !dattr.equals(that.dattr) : that.dattr != null) return false;
        if (hid != null ? !hid.equals(that.hid) : that.hid != null) return false;
        if (nameown != null ? !nameown.equals(that.nameown) : that.nameown != null) return false;
        if (ownauto != null ? !ownauto.equals(that.ownauto) : that.ownauto != null) return false;
        if (ownkont != null ? !ownkont.equals(that.ownkont) : that.ownkont != null) return false;
        if (ownvag != null ? !ownvag.equals(that.ownvag) : that.ownvag != null) return false;
        if (prim != null ? !prim.equals(that.prim) : that.prim != null) return false;
        if (trans != null ? !trans.equals(that.trans) : that.trans != null) return false;
        if (un != null ? !un.equals(that.un) : that.un != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hid != null ? hid.hashCode() : 0;
        result = 31 * result + (nameown != null ? nameown.hashCode() : 0);
        result = 31 * result + (ownkont != null ? ownkont.hashCode() : 0);
        result = 31 * result + (adress != null ? adress.hashCode() : 0);
        result = 31 * result + (prim != null ? prim.hashCode() : 0);
        result = 31 * result + (dattr != null ? dattr.hashCode() : 0);
        result = 31 * result + (trans != null ? trans.hashCode() : 0);
        result = 31 * result + (un != null ? un.hashCode() : 0);
        result = 31 * result + (altered != null ? altered.hashCode() : 0);
        result = 31 * result + (ownvag != null ? ownvag.hashCode() : 0);
        result = 31 * result + (ownauto != null ? ownauto.hashCode() : 0);
        return result;
    }
}
