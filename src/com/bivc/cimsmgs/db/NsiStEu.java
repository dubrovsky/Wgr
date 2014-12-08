package com.bivc.cimsmgs.db;

import java.util.Date;

public class NsiStEu implements java.io.Serializable {

	private Long hid;
	private NsiDor nsiDor;
	private String kst;
	private String nst;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date deleted;
	private Date altered;

	public NsiStEu() {
	}

	public NsiStEu(Long hid, Date altered) {
		this.hid = hid;
		this.altered = altered;
	}

	public NsiStEu(Long hid, NsiDor nsiDor, String kst, String nst,
			Date dattr, Date locked, String unLock, String trans, String un,
			Date deleted, Date altered) {
		this.hid = hid;
		this.nsiDor = nsiDor;
		this.kst = kst;
		this.nst = nst;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.deleted = deleted;
		this.altered = altered;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public NsiDor getNsiDor() {
		return this.nsiDor;
	}

	public void setNsiDor(NsiDor nsiDor) {
		this.nsiDor = nsiDor;
	}

	public String getKst() {
		return this.kst;
	}

	public void setKst(String kst) {
		this.kst = kst;
	}

	public String getNst() {
		return this.nst;
	}

	public void setNst(String nst) {
		this.nst = nst;
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
