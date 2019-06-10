package com.bivc.cimsmgs.db.ky;

import java.sql.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiVagShir {
    private Long hid;
    private String nvag;
    private String typeNo;
    private String yearB;
    private String factoryB;
    private String modelvag;
    private Integer dlvag;
    private Long tara;
    private Long gp;
    private String okpoOwn;
    private String nown;
    private String okpoArend;
    private String narend;
    private Date datePlanrem;
    private String prim;
    private String groupvag;
    private String owntypen;
    private Date dparkIn;
    private Date dparkOut;
    private Date dattr;
    private String trans;
    private String un;
    private Date dateBVag;
    private Date dProbegV;
    private Integer ostProbeg;
    private Date altered;
    private NsiKyOwners owner;

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }

    public enum FilterFields{
        NVAG("nvag")
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

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getTypeNo() {
        return typeNo;
    }

    public void setTypeNo(String typeNo) {
        this.typeNo = typeNo;
    }

    public String getYearB() {
        return yearB;
    }

    public void setYearB(String yearB) {
        this.yearB = yearB;
    }

    public String getFactoryB() {
        return factoryB;
    }

    public void setFactoryB(String factoryB) {
        this.factoryB = factoryB;
    }

    public String getModelvag() {
        return modelvag;
    }

    public void setModelvag(String modelvag) {
        this.modelvag = modelvag;
    }

    public Integer getDlvag() {
        return dlvag;
    }

    public void setDlvag(Integer dlvag) {
        this.dlvag = dlvag;
    }

    public Long getTara() {
        return tara;
    }

    public void setTara(Long tara) {
        this.tara = tara;
    }

    public Long getGp() {
        return gp;
    }

    public void setGp(Long gp) {
        this.gp = gp;
    }

    public String getOkpoOwn() {
        return okpoOwn;
    }

    public void setOkpoOwn(String okpoOwn) {
        this.okpoOwn = okpoOwn;
    }

    public String getNown() {
        return nown;
    }

    public void setNown(String nown) {
        this.nown = nown;
    }

    public String getOkpoArend() {
        return okpoArend;
    }

    public void setOkpoArend(String okpoArend) {
        this.okpoArend = okpoArend;
    }

    public String getNarend() {
        return narend;
    }

    public void setNarend(String narend) {
        this.narend = narend;
    }

    public Date getDatePlanrem() {
        return datePlanrem;
    }

    public void setDatePlanrem(Date datePlanrem) {
        this.datePlanrem = datePlanrem;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getGroupvag() {
        return groupvag;
    }

    public void setGroupvag(String groupvag) {
        this.groupvag = groupvag;
    }

    public String getOwntypen() {
        return owntypen;
    }

    public void setOwntypen(String owntypen) {
        this.owntypen = owntypen;
    }

    public Date getDparkIn() {
        return dparkIn;
    }

    public void setDparkIn(Date dparkIn) {
        this.dparkIn = dparkIn;
    }

    public Date getDparkOut() {
        return dparkOut;
    }

    public void setDparkOut(Date dparkOut) {
        this.dparkOut = dparkOut;
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

    public Date getDateBVag() {
        return dateBVag;
    }

    public void setDateBVag(Date dateBVag) {
        this.dateBVag = dateBVag;
    }

    public Date getdProbegV() {
        return dProbegV;
    }

    public void setdProbegV(Date dProbegV) {
        this.dProbegV = dProbegV;
    }

    public Integer getOstProbeg() {
        return ostProbeg;
    }

    public void setOstProbeg(Integer ostProbeg) {
        this.ostProbeg = ostProbeg;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        NsiVagShir that = (NsiVagShir) o;

        if (altered != null ? !altered.equals(that.altered) : that.altered != null) return false;
        if (dProbegV != null ? !dProbegV.equals(that.dProbegV) : that.dProbegV != null) return false;
        if (dateBVag != null ? !dateBVag.equals(that.dateBVag) : that.dateBVag != null) return false;
        if (datePlanrem != null ? !datePlanrem.equals(that.datePlanrem) : that.datePlanrem != null) return false;
        if (dattr != null ? !dattr.equals(that.dattr) : that.dattr != null) return false;
        if (dlvag != null ? !dlvag.equals(that.dlvag) : that.dlvag != null) return false;
        if (dparkIn != null ? !dparkIn.equals(that.dparkIn) : that.dparkIn != null) return false;
        if (dparkOut != null ? !dparkOut.equals(that.dparkOut) : that.dparkOut != null) return false;
        if (factoryB != null ? !factoryB.equals(that.factoryB) : that.factoryB != null) return false;
        if (gp != null ? !gp.equals(that.gp) : that.gp != null) return false;
        if (groupvag != null ? !groupvag.equals(that.groupvag) : that.groupvag != null) return false;
        if (hid != null ? !hid.equals(that.hid) : that.hid != null) return false;
        if (modelvag != null ? !modelvag.equals(that.modelvag) : that.modelvag != null) return false;
        if (narend != null ? !narend.equals(that.narend) : that.narend != null) return false;
        if (nown != null ? !nown.equals(that.nown) : that.nown != null) return false;
        if (nvag != null ? !nvag.equals(that.nvag) : that.nvag != null) return false;
        if (okpoArend != null ? !okpoArend.equals(that.okpoArend) : that.okpoArend != null) return false;
        if (okpoOwn != null ? !okpoOwn.equals(that.okpoOwn) : that.okpoOwn != null) return false;
        if (ostProbeg != null ? !ostProbeg.equals(that.ostProbeg) : that.ostProbeg != null) return false;
        if (owntypen != null ? !owntypen.equals(that.owntypen) : that.owntypen != null) return false;
        if (prim != null ? !prim.equals(that.prim) : that.prim != null) return false;
        if (tara != null ? !tara.equals(that.tara) : that.tara != null) return false;
        if (trans != null ? !trans.equals(that.trans) : that.trans != null) return false;
        if (typeNo != null ? !typeNo.equals(that.typeNo) : that.typeNo != null) return false;
        if (un != null ? !un.equals(that.un) : that.un != null) return false;
        if (yearB != null ? !yearB.equals(that.yearB) : that.yearB != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = hid != null ? hid.hashCode() : 0;
        result = 31 * result + (nvag != null ? nvag.hashCode() : 0);
        result = 31 * result + (typeNo != null ? typeNo.hashCode() : 0);
        result = 31 * result + (yearB != null ? yearB.hashCode() : 0);
        result = 31 * result + (factoryB != null ? factoryB.hashCode() : 0);
        result = 31 * result + (modelvag != null ? modelvag.hashCode() : 0);
        result = 31 * result + (dlvag != null ? dlvag.hashCode() : 0);
        result = 31 * result + (tara != null ? tara.hashCode() : 0);
        result = 31 * result + (gp != null ? gp.hashCode() : 0);
        result = 31 * result + (okpoOwn != null ? okpoOwn.hashCode() : 0);
        result = 31 * result + (nown != null ? nown.hashCode() : 0);
        result = 31 * result + (okpoArend != null ? okpoArend.hashCode() : 0);
        result = 31 * result + (narend != null ? narend.hashCode() : 0);
        result = 31 * result + (datePlanrem != null ? datePlanrem.hashCode() : 0);
        result = 31 * result + (prim != null ? prim.hashCode() : 0);
        result = 31 * result + (groupvag != null ? groupvag.hashCode() : 0);
        result = 31 * result + (owntypen != null ? owntypen.hashCode() : 0);
        result = 31 * result + (dparkIn != null ? dparkIn.hashCode() : 0);
        result = 31 * result + (dparkOut != null ? dparkOut.hashCode() : 0);
        result = 31 * result + (dattr != null ? dattr.hashCode() : 0);
        result = 31 * result + (trans != null ? trans.hashCode() : 0);
        result = 31 * result + (un != null ? un.hashCode() : 0);
        result = 31 * result + (altered != null ? altered.hashCode() : 0);
        result = 31 * result + (dateBVag != null ? dateBVag.hashCode() : 0);
        result = 31 * result + (dProbegV != null ? dProbegV.hashCode() : 0);
        result = 31 * result + (ostProbeg != null ? ostProbeg.hashCode() : 0);
        return result;
    }
}
