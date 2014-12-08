package com.bivc.cimsmgs.db;

import java.io.Serializable;
import java.util.Date;

public class NsiFieldsOpt implements Serializable {

	private Long hid;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date deleted;
	private Date altered;
	private String nsiName;
	private String nsiFName;
	private String nsiFDesc;
	private String nsiFNsi;
	private String nsiFDsc2;
	private Byte nsiFLoc;
	private String nsiFNn;
	private String nsiFF;
	private Byte nsiFType;
    private String nsiFNcas;
    private String nsiFDsc3;
    private Byte sort;

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public String getNsiFDsc3() {
        return nsiFDsc3;
    }

    public void setNsiFDsc3(String nsiFDsc3) {
        this.nsiFDsc3 = nsiFDsc3;
    }

    public String getNsiFNcas() {
        return nsiFNcas;
    }

    public void setNsiFNcas(String nsiFNcas) {
        this.nsiFNcas = nsiFNcas;
    }

    public NsiFieldsOpt() {
	}

	public NsiFieldsOpt(Long hid, Date altered) {
		this.hid = hid;
		this.altered = altered;
	}

	public NsiFieldsOpt(Long hid, Date dattr, Date locked, String unLock,
			String trans, String un, Date deleted, Date altered,
			String nsiName, String nsiFName, String nsiFDesc, String nsiFNsi,
			String nsiFDsc2, Byte nsiFLoc, String nsiFNn, String nsiFF,
			Byte nsiFType) {
		this.hid = hid;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.deleted = deleted;
		this.altered = altered;
		this.nsiName = nsiName;
		this.nsiFName = nsiFName;
		this.nsiFDesc = nsiFDesc;
		this.nsiFNsi = nsiFNsi;
		this.nsiFDsc2 = nsiFDsc2;
		this.nsiFLoc = nsiFLoc;
		this.nsiFNn = nsiFNn;
		this.nsiFF = nsiFF;
		this.nsiFType = nsiFType;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
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

	public String getNsiName() {
		return this.nsiName;
	}

	public void setNsiName(String nsiName) {
		this.nsiName = nsiName;
	}

	public String getNsiFName() {
		return this.nsiFName;
	}

	public void setNsiFName(String nsiFName) {
		this.nsiFName = nsiFName;
	}

	public String getNsiFDesc() {
		return this.nsiFDesc;
	}

	public void setNsiFDesc(String nsiFDesc) {
		this.nsiFDesc = nsiFDesc;
	}

	public String getNsiFNsi() {
		return this.nsiFNsi;
	}

	public void setNsiFNsi(String nsiFNsi) {
		this.nsiFNsi = nsiFNsi;
	}

	public String getNsiFDsc2() {
		return this.nsiFDsc2;
	}

	public void setNsiFDsc2(String nsiFDsc2) {
		this.nsiFDsc2 = nsiFDsc2;
	}

	public Byte getNsiFLoc() {
		return this.nsiFLoc;
	}

	public void setNsiFLoc(Byte nsiFLoc) {
		this.nsiFLoc = nsiFLoc;
	}

	public String getNsiFNn() {
		return this.nsiFNn;
	}

	public void setNsiFNn(String nsiFNn) {
		this.nsiFNn = nsiFNn;
	}

	public String getNsiFF() {
		return this.nsiFF;
	}

	public void setNsiFF(String nsiFF) {
		this.nsiFF = nsiFF;
	}

	public Byte getNsiFType() {
		return this.nsiFType;
	}

	public void setNsiFType(Byte nsiFType) {
		this.nsiFType = nsiFType;
	}

}
