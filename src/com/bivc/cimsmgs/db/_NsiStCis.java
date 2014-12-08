package com.bivc.cimsmgs.db;

import java.util.Date;

public class _NsiStCis implements java.io.Serializable {

	private long hid;
	private NsiDor nsiDor;
	private String dorn;
	private String doroga;
	private String operGr;
	private String nstn;
	private String kstn;
	private Byte kodOt;
	private Date altered;
	private Date deleted;

	public _NsiStCis() {
	}

	public _NsiStCis(long hid) {
		this.hid = hid;
	}

	public _NsiStCis(long hid, NsiDor nsiDor, String dorn, String doroga,
			String operGr, String nstn, String kstn, Byte kodOt, Date altered,
			Date deleted) {
		this.hid = hid;
		this.nsiDor = nsiDor;
		this.dorn = dorn;
		this.doroga = doroga;
		this.operGr = operGr;
		this.nstn = nstn;
		this.kstn = kstn;
		this.kodOt = kodOt;
		this.altered = altered;
		this.deleted = deleted;
	}

	public long getHid() {
		return this.hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public NsiDor getNsiDor() {
		return this.nsiDor;
	}

	public void setNsiDor(NsiDor nsiDor) {
		this.nsiDor = nsiDor;
	}

	public String getDorn() {
		return this.dorn;
	}

	public void setDorn(String dorn) {
		this.dorn = dorn;
	}

	public String getDoroga() {
		return this.doroga;
	}

	public void setDoroga(String doroga) {
		this.doroga = doroga;
	}

	public String getOperGr() {
		return this.operGr;
	}

	public void setOperGr(String operGr) {
		this.operGr = operGr;
	}

	public String getNstn() {
		return this.nstn;
	}

	public void setNstn(String nstn) {
		this.nstn = nstn;
	}

	public String getKstn() {
		return this.kstn;
	}

	public void setKstn(String kstn) {
		this.kstn = kstn;
	}

	public Byte getKodOt() {
		return this.kodOt;
	}

	public void setKodOt(Byte kodOt) {
		this.kodOt = kodOt;
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

}
