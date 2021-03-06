package com.bivc.cimsmgs.db;

// Generated 10.02.2010 14:28:43 by Hibernate Tools 3.2.5.Beta

import java.util.Date;

/**
 * NsiPlatel generated by hbm2java
 */
public class NsiPlatel implements java.io.Serializable {

	private Long hid;
	private String dor;
	private String plat;
	private String prim;
	private Date dattr;
	private Date locked;
	private String unLock;
	private byte sort;
	private String kplat;
	private String kplat1;
	private String kplat2;
	private String kplat3;
	private String trans;
	private String un;
	private Date altered;
	private Date deleted;
	private String dorR;
	private String platR;
	private String primR;
	private String strana;

	public NsiPlatel() {
	}

	public NsiPlatel(Long hid) {
		this.hid = hid;
	}

	public NsiPlatel(Long hid, String dor, String plat, String prim,
			Date dattr, Date locked, String unLock, byte sort, String kplat,
			String kplat1, String kplat2, String kplat3, String trans,
			String un, Date altered, Date deleted, String dorR, String platR,
			String primR, String strana) {
		this.hid = hid;
		this.dor = dor;
		this.plat = plat;
		this.prim = prim;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.sort = sort;
		this.kplat = kplat;
		this.kplat1 = kplat1;
		this.kplat2 = kplat2;
		this.kplat3 = kplat3;
		this.trans = trans;
		this.un = un;
		this.altered = altered;
		this.deleted = deleted;
		this.dorR = dorR;
		this.platR = platR;
		this.primR = primR;
		this.strana = strana;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public String getDor() {
		return this.dor;
	}

	public void setDor(String dor) {
		this.dor = dor;
	}

	public String getPlat() {
		return this.plat;
	}

	public void setPlat(String plat) {
		this.plat = plat;
	}

	public String getPrim() {
		return this.prim;
	}

	public void setPrim(String prim) {
		this.prim = prim;
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

	public byte getSort() {
		return this.sort;
	}

	public void setSort(byte sort) {
		this.sort = sort;
	}

	public String getKplat() {
		return this.kplat;
	}

	public void setKplat(String kplat) {
		this.kplat = kplat;
	}

	public String getKplat1() {
		return this.kplat1;
	}

	public void setKplat1(String kplat1) {
		this.kplat1 = kplat1;
	}

	public String getKplat2() {
		return this.kplat2;
	}

	public void setKplat2(String kplat2) {
		this.kplat2 = kplat2;
	}

	public String getKplat3() {
		return this.kplat3;
	}

	public void setKplat3(String kplat3) {
		this.kplat3 = kplat3;
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

	public Date getAltered() {
		return this.altered;
	}

	public void setAltered(Date altered) {
		this.altered = altered;
	}

	public Date getDeleted() {
		return this.deleted;
	}

	public void setDeleted(Date deleted) {
		this.deleted = deleted;
	}

	public String getDorR() {
		return this.dorR;
	}

	public void setDorR(String dorR) {
		this.dorR = dorR;
	}

	public String getPlatR() {
		return this.platR;
	}

	public void setPlatR(String platR) {
		this.platR = platR;
	}

	public String getPrimR() {
		return this.primR;
	}

	public void setPrimR(String primR) {
		this.primR = primR;
	}

	public String getStrana() {
		return this.strana;
	}

	public void setStrana(String strana) {
		this.strana = strana;
	}

}
