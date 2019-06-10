package com.bivc.cimsmgs.db.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiAvto {
    private Long hid;
    private String typeAvto;
    private String noAvto;
    private String noTrail;
    private String ownCargo;
    private String trans;
    private Date dattr;
    private String un;
    private Date altered;
    private NsiKyOwners owner;

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }

    public enum FilterFields{
        NOAVTO("noAvto")
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

    public String getTypeAvto() {
        return typeAvto;
    }

    public void setTypeAvto(String typeAvto) {
        this.typeAvto = typeAvto;
    }

    public String getNoAvto() {
        return noAvto;
    }

    public void setNoAvto(String noAvto) {
        this.noAvto = noAvto;
    }

    public String getNoTrail() {
        return noTrail;
    }

    public void setNoTrail(String noTrail) {
        this.noTrail = noTrail;
    }

    public String getOwnCargo() {
        return ownCargo;
    }

    public void setOwnCargo(String ownCargo) {
        this.ownCargo = ownCargo;
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

        NsiAvto nsiAvto = (NsiAvto) o;

        if (hid != null ? !hid.equals(nsiAvto.hid) : nsiAvto.hid != null) return false;
        if (noAvto != null ? !noAvto.equals(nsiAvto.noAvto) : nsiAvto.noAvto != null) return false;
        if (noTrail != null ? !noTrail.equals(nsiAvto.noTrail) : nsiAvto.noTrail != null) return false;
        if (ownCargo != null ? !ownCargo.equals(nsiAvto.ownCargo) : nsiAvto.ownCargo != null) return false;
        if (typeAvto != null ? !typeAvto.equals(nsiAvto.typeAvto) : nsiAvto.typeAvto != null) return false;
        if (altered != null ? !altered.equals(nsiAvto.altered) : nsiAvto.altered != null) return false;
        if (dattr != null ? !dattr.equals(nsiAvto.dattr) : nsiAvto.dattr != null) return false;
        if (trans != null ? !trans.equals(nsiAvto.trans) : nsiAvto.trans != null) return false;
        if (un != null ? !un.equals(nsiAvto.un) : nsiAvto.un != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hid != null ? hid.hashCode() : 0;
        result = 31 * result + (typeAvto != null ? typeAvto.hashCode() : 0);
        result = 31 * result + (noAvto != null ? noAvto.hashCode() : 0);
        result = 31 * result + (noTrail != null ? noTrail.hashCode() : 0);
        result = 31 * result + (ownCargo != null ? ownCargo.hashCode() : 0);
        result = 31 * result + (trans != null ? trans.hashCode() : 0);
        result = 31 * result + (dattr != null ? dattr.hashCode() : 0);
        result = 31 * result + (un != null ? un.hashCode() : 0);
        result = 31 * result + (altered != null ? altered.hashCode() : 0);
        return result;
    }
}
