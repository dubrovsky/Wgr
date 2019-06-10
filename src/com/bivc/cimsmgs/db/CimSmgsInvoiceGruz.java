package com.bivc.cimsmgs.db;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

@JsonIgnoreProperties({"invoice"})
public class CimSmgsInvoiceGruz implements Serializable {
    private Long hid;
    private Long hid_csinv;
    private String znak;
    private BigDecimal kolm;
    private BigDecimal mbrt;
    private BigDecimal mnet;
    private BigDecimal klms;
    private BigDecimal cus_kolm;
    private String tnved;
    private String cus_edizm;
    private String nzgr;
    private String cost;
    private String itogo;
    private CimSmgsInvoice invoice;
    private String nzyp;
    private String type;
    private BigDecimal kole;
    private String eizm;

//    Logger log = LoggerFactory.getLogger(CimSmgsInvoiceGruz.class);
    private String kypk;

    public String getKypk() {
        return kypk;
    }

    public void setKypk(String kypk) {
        this.kypk = kypk;
    }

    public String getEizm() {
        return eizm;
    }

    public void setEizm(String eizm) {
        this.eizm = eizm;
    }

    public BigDecimal getKole() {
        return kole;
    }

    public void setKole(BigDecimal kole) {
        this.kole = kole;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public CimSmgsInvoiceGruz() {
    }

    public CimSmgsInvoiceGruz(Long hid) {
        this.hid = hid;
    }


    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setHid_csinv(Long hid_csinv) {
        this.hid_csinv = hid_csinv;
    }

    public void setZnak(String znak) {
        this.znak = znak;
    }

    public void setKolm(BigDecimal kolm) {
        this.kolm = kolm;
    }

    public void setMbrt(BigDecimal mbrt) {
        this.mbrt = mbrt;
    }

    public void setMnet(BigDecimal mnet) {
        this.mnet = mnet;
    }

    public void setKlms(BigDecimal klms) {
        this.klms = klms;
    }

    public void setCus_kolm(BigDecimal cus_kolm) {
        this.cus_kolm = cus_kolm;
    }

    public void setTnved(String tnved) {
        this.tnved = tnved;
    }

    public void setCus_edizm(String cus_edizm) {
        this.cus_edizm = cus_edizm;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public void setNzgr2(String nzgr) {
        this.nzgr = nzgr;
    }


    public void setCost(String cost) {
        this.cost = cost;
    }

    public void setItogo(String itogo) {
        this.itogo = itogo;
    }

    @JsonBackReference
    public void setInvoice(CimSmgsInvoice invoice) {
        this.invoice = invoice;
    }

    public void setNzyp(String nzyp) {
        this.nzyp = nzyp;
    }

    public Long getHid() {
        return hid;
    }

    public Long getHid_csinv() {
        return hid_csinv;
    }

    public String getZnak() {
        return znak;
    }

    public BigDecimal getKolm() {
        return kolm;
    }

    public String makeKolmString() {
        String res = "";
        if (kolm != null)
            res = kolm.toString();
        return res;
    }

    public BigDecimal getMbrt() {
        return mbrt;
    }

    public String makeMbrtString() {
        String res = "";
        if (mbrt != null)
            res = mbrt.toString();
        return res;
    }

    public BigDecimal getMnet() {
        return mnet;
    }

    public String makeMnetString() {
        String res = "";
        if (mnet != null)
            res = mnet.toString();
        return res;
    }

    public BigDecimal getKlms() {
        return klms;
    }

    public BigDecimal getCus_kolm() {
        return cus_kolm;
    }

    public String getTnved() {
        return tnved;
    }

    public String getCus_edizm() {
        return cus_edizm;
    }

    public String getNzgr() {
        return nzgr;
    }

    public String getNzgr2() {
        if (nzgr != null) {
            return nzgr.replaceAll("'", "\\\\'").replaceAll("&quot;", "\"");
        }
        return nzgr;
    }


    public String getCost() {
        return cost;
    }

    public String getItogo() {
        return itogo;
    }

    public BigDecimal makeItogoDecimal() {
        BigDecimal res = new BigDecimal(0);
        try {
            res = new BigDecimal(itogo);
        }
        catch (Exception nfex) {
//            log.warn(nfex.getMessage());
        }
        return res;
    }

    @JsonBackReference
    public CimSmgsInvoice getInvoice() {
        return invoice;
    }

    public String getNzyp() {
        return nzyp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgsInvoiceGruz that = (CimSmgsInvoiceGruz) o;
        return Objects.equals(hid, that.hid) &&
                Objects.equals(hid_csinv, that.hid_csinv) &&
                Objects.equals(znak, that.znak) &&
                Objects.equals(kolm, that.kolm) &&
                Objects.equals(mbrt, that.mbrt) &&
                Objects.equals(mnet, that.mnet) &&
                Objects.equals(klms, that.klms) &&
                Objects.equals(cus_kolm, that.cus_kolm) &&
                Objects.equals(tnved, that.tnved) &&
                Objects.equals(cus_edizm, that.cus_edizm) &&
                Objects.equals(nzgr, that.nzgr) &&
                Objects.equals(cost, that.cost) &&
                Objects.equals(itogo, that.itogo) &&
                Objects.equals(invoice != null ? invoice.getHid() : "", that.invoice != null ? that.invoice.getHid() : "") &&
                Objects.equals(nzyp, that.nzyp) &&
                Objects.equals(type, that.type) &&
                Objects.equals(kole, that.kole) &&
                Objects.equals(eizm, that.eizm) &&
                Objects.equals(kypk, that.kypk);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, hid_csinv, znak, kolm, mbrt, mnet, klms, cus_kolm, tnved, cus_edizm, nzgr, cost, itogo, invoice != null ? invoice.getHid() : "", nzyp, type, kole, eizm, kypk);
    }
}
