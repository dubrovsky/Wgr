package com.bivc.cimsmgs.db.nsi;

// Generated 08.04.2011 10:06:32 by Hibernate Tools 3.4.0.CR1

import java.util.Date;

/**
 * Management generated by hbm2java
 */
public class Management implements java.io.Serializable {

	private Long managUn;
	private Long managId;
	private String managNo;
//	private String countryNo;
	private String managName;
	private String MNameRus;
	private String MNameLat;
	private Date managBgn;
	private Date managEnd;
	private Countrys countrys;

	public Management() {
	}

	public Management(Long managUn) {
		this.managUn = managUn;
	}

	public Management(Long managUn, Long managId, String managNo, /*String countryNo,*/ String managName, String MNameRus, String MNameLat,
			Date managBgn, Date managEnd) {
		this.managUn = managUn;
		this.managId = managId;
		this.managNo = managNo;
//		this.countryNo = countryNo;
		this.managName = managName;
		this.MNameRus = MNameRus;
		this.MNameLat = MNameLat;
		this.managBgn = managBgn;
		this.managEnd = managEnd;
	}

	public Long getManagUn() {
		return this.managUn;
	}

	public void setManagUn(Long managUn) {
		this.managUn = managUn;
	}

	public Long getManagId() {
		return this.managId;
	}

	public void setManagId(Long managId) {
		this.managId = managId;
	}

	public String getManagNo() {
		return this.managNo;
	}

	public void setManagNo(String managNo) {
		this.managNo = managNo;
	}

	/*public String getCountryNo() {
		return this.countryNo;
	}

	public void setCountryNo(String countryNo) {
		this.countryNo = countryNo;
	}*/

	public String getManagName() {
		return this.managName;
	}

	public void setManagName(String managName) {
		this.managName = managName;
	}

	public String getMNameRus() {
		return this.MNameRus;
	}

	public void setMNameRus(String MNameRus) {
		this.MNameRus = MNameRus;
	}

	public String getMNameLat() {
		return this.MNameLat;
	}

	public void setMNameLat(String MNameLat) {
		this.MNameLat = MNameLat;
	}

	public Date getManagBgn() {
		return this.managBgn;
	}

	public void setManagBgn(Date managBgn) {
		this.managBgn = managBgn;
	}

	public Date getManagEnd() {
		return this.managEnd;
	}

	public void setManagEnd(Date managEnd) {
		this.managEnd = managEnd;
	}

	public void setCountrys(Countrys countrys) {
		this.countrys = countrys;
	}

	public Countrys getCountrys() {
		return countrys;
	}

}
