package com.bivc.cimsmgs.db;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class VedVag implements Serializable {

	private Long hid;
	private Long hidVed;
	private Long hidCs;
	private String un;
	private Date dattr;
	private Date altered;

	private String indexNum;
	private String nvag;
	private String owner;
	private String kind;
	private BigDecimal gp;
	private Byte axes;
	private BigDecimal tara;
	private Byte kpl;
	private String znak;
	private String numClaim;
	private Date g281;
	private String ksto;
	private String nsto;
	private String kstn;
	private String nstn;
	private String kont;
	private String kontKind;
	private BigDecimal kontGp;
	private BigDecimal kontTara;
    private BigDecimal places;
    private String upak;
    private String gng;
    private String gngn;
    private BigDecimal mbrt;
    private String prim;
    private String perVed;

    public Long getHidCs() {
        return hidCs;
    }

    public void setHidCs(Long hidCs) {
        this.hidCs = hidCs;
    }

    public Byte getKpl() {
        return kpl;
    }

    public void setKpl(Byte kpl) {
        this.kpl = kpl;
    }

    public String getZnak() {
        return znak;
    }

    public void setZnak(String znak) {
        this.znak = znak;
    }

    public BigDecimal getPlaces() {
        return places;
    }

    public void setPlaces(BigDecimal places) {
        this.places = places;
    }

    public String getUpak() {
        return upak;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public String getGng() {
        return gng;
    }

    public void setGng(String gng) {
        this.gng = gng;
    }

    public String getGngn() {
        return gngn;
    }

    public void setGngn(String gngn) {
        this.gngn = gngn;
    }

    public BigDecimal getMbrt() {
        return mbrt;
    }

    public void setMbrt(BigDecimal mbrt) {
        this.mbrt = mbrt;
    }

    public String getNumClaim() {
        return numClaim;
    }

    public void setNumClaim(String numClaim) {
        this.numClaim = numClaim;
    }

    public Date getG281() {
        return g281;
    }

    public void setG281(Date g281) {
        this.g281 = g281;
    }

    public String getKsto() {
        return ksto;
    }

    public void setKsto(String ksto) {
        this.ksto = ksto;
    }

    public String getNsto() {
        return nsto;
    }

    public void setNsto(String nsto) {
        this.nsto = nsto;
    }

    public String getKstn() {
        return kstn;
    }

    public void setKstn(String kstn) {
        this.kstn = kstn;
    }

    public String getNstn() {
        return nstn;
    }

    public void setNstn(String nstn) {
        this.nstn = nstn;
    }

    public String getKont() {
        return kont;
    }

    public void setKont(String kont) {
        this.kont = kont;
    }

    public String getKontKind() {
        return kontKind;
    }

    public void setKontKind(String kontKind) {
        this.kontKind = kontKind;
    }

    public BigDecimal getKontGp() {
        return kontGp;
    }

    public void setKontGp(BigDecimal kontGp) {
        this.kontGp = kontGp;
    }

    public BigDecimal getKontTara() {
        return kontTara;
    }

    public void setKontTara(BigDecimal kontTara) {
        this.kontTara = kontTara;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getPerVed() {
        return perVed;
    }

    public void setPerVed(String perVed) {
        this.perVed = perVed;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Long getHidVed() {
        return hidVed;
    }

    public void setHidVed(Long hidVed) {
        this.hidVed = hidVed;
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

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getIndexNum() {
        return indexNum;
    }

    public void setIndexNum(String indexNum) {
        this.indexNum = indexNum;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public BigDecimal getGp() {
        return gp;
    }

    public void setGp(BigDecimal gp) {
        this.gp = gp;
    }

    public Byte getAxes() {
        return axes;
    }

    public void setAxes(Byte axes) {
        this.axes = axes;
    }

    public BigDecimal getTara() {
        return tara;
    }

    public void setTara(BigDecimal tara) {
        this.tara = tara;
    }
}
