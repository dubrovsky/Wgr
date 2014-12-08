package com.bivc.cimsmgs.db;

import java.math.BigDecimal;
import java.util.Date;

public class _NsiNhm implements java.io.Serializable {

	private BigDecimal hid;
	private String kgvn;
	private String nzgr;
	private String nzgrF;
	private String kgvnDe;
	private String nzgrDeF;
	private String nzgrDe;
	private String etsng;
	private String karantin;
	private String otxod;
	private String ozonRaz;
	private String veterin;
	private String customs;
	private String nzgrPl;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date deleted;
	private Date altered;

	public _NsiNhm() {
	}

	public _NsiNhm(BigDecimal hid, Date altered) {
		this.hid = hid;
		this.altered = altered;
	}

	public _NsiNhm(BigDecimal hid, String kgvn, String nzgr, String nzgrF,
			String kgvnDe, String nzgrDeF, String nzgrDe, String etsng,
			String karantin, String otxod, String ozonRaz, String veterin,
			String customs, String nzgrPl, Date dattr, Date locked,
			String unLock, String trans, String un, Date deleted, Date altered) {
		this.hid = hid;
		this.kgvn = kgvn;
		this.nzgr = nzgr;
		this.nzgrF = nzgrF;
		this.kgvnDe = kgvnDe;
		this.nzgrDeF = nzgrDeF;
		this.nzgrDe = nzgrDe;
		this.etsng = etsng;
		this.karantin = karantin;
		this.otxod = otxod;
		this.ozonRaz = ozonRaz;
		this.veterin = veterin;
		this.customs = customs;
		this.nzgrPl = nzgrPl;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.deleted = deleted;
		this.altered = altered;
	}

	public BigDecimal getHid() {
		return this.hid;
	}

	public void setHid(BigDecimal hid) {
		this.hid = hid;
	}

	public String getKgvn() {
		return this.kgvn;
	}

	public void setKgvn(String kgvn) {
		this.kgvn = kgvn;
	}

	public String getNzgr() {
		return this.nzgr;
	}

	public void setNzgr(String nzgr) {
		this.nzgr = nzgr;
	}

	public String getNzgrF() {
		return this.nzgrF;
	}

	public void setNzgrF(String nzgrF) {
		this.nzgrF = nzgrF;
	}

	public String getKgvnDe() {
		return this.kgvnDe;
	}

	public void setKgvnDe(String kgvnDe) {
		this.kgvnDe = kgvnDe;
	}

	public String getNzgrDeF() {
		return this.nzgrDeF;
	}

	public void setNzgrDeF(String nzgrDeF) {
		this.nzgrDeF = nzgrDeF;
	}

	public String getNzgrDe() {
		return this.nzgrDe;
	}

	public void setNzgrDe(String nzgrDe) {
		this.nzgrDe = nzgrDe;
	}

	public String getEtsng() {
		return this.etsng;
	}

	public void setEtsng(String etsng) {
		this.etsng = etsng;
	}

	public String getKarantin() {
		return this.karantin;
	}

	public void setKarantin(String karantin) {
		this.karantin = karantin;
	}

	public String getOtxod() {
		return this.otxod;
	}

	public void setOtxod(String otxod) {
		this.otxod = otxod;
	}

	public String getOzonRaz() {
		return this.ozonRaz;
	}

	public void setOzonRaz(String ozonRaz) {
		this.ozonRaz = ozonRaz;
	}

	public String getVeterin() {
		return this.veterin;
	}

	public void setVeterin(String veterin) {
		this.veterin = veterin;
	}

	public String getCustoms() {
		return this.customs;
	}

	public void setCustoms(String customs) {
		this.customs = customs;
	}

	public String getNzgrPl() {
		return this.nzgrPl;
	}

	public void setNzgrPl(String nzgrPl) {
		this.nzgrPl = nzgrPl;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public Date getLocked() {
		return this.locked;
	}

	public void setLocked(Date locked) {
		this.locked = locked;
	}

	public String getUnLock() {
		return this.unLock;
	}

	public void setUnLock(String unLock) {
		this.unLock = unLock;
	}

	public String getTrans() {
		return this.trans;
	}

	public void setTrans(String trans) {
		this.trans = trans;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public Date getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Date deleted) {
		this.deleted = deleted;
	}

	public Date getAltered() {
		return this.altered;
	}

	public void setAltered(Date altered) {
		this.altered = altered;
	}

}
