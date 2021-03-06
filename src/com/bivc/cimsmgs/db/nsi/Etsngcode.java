package com.bivc.cimsmgs.db.nsi;

// Generated 22.04.2009 13:49:34 by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;
import java.util.Date;

/**
 * Etsngcode generated by hbm2java
 */
public class Etsngcode implements java.io.Serializable {

	private BigDecimal id;
	private String code;
	private String mlName;
	private String nameLatin1;
	private String impKod;
	private String impName;
	private String impClassn;
	private String impMinnew;
	private String impClass;
	private String impMin;
	private String recState;
	private Date workFrom;
	private Date workTill;
	private String digest;

	public Etsngcode() {
	}

	public Etsngcode(BigDecimal id, String code, String mlName,
			String nameLatin1, String recState, Date workFrom) {
		this.id = id;
		this.code = code;
		this.mlName = mlName;
		this.nameLatin1 = nameLatin1;
		this.recState = recState;
		this.workFrom = workFrom;
	}

	public Etsngcode(BigDecimal id, String code, String mlName,
			String nameLatin1, String impKod, String impName, String impClassn,
			String impMinnew, String impClass, String impMin, String recState,
			Date workFrom, Date workTill, String digest) {
		this.id = id;
		this.code = code;
		this.mlName = mlName;
		this.nameLatin1 = nameLatin1;
		this.impKod = impKod;
		this.impName = impName;
		this.impClassn = impClassn;
		this.impMinnew = impMinnew;
		this.impClass = impClass;
		this.impMin = impMin;
		this.recState = recState;
		this.workFrom = workFrom;
		this.workTill = workTill;
		this.digest = digest;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getMlName() {
		return this.mlName;
	}

	public void setMlName(String mlName) {
		this.mlName = mlName;
	}

	public String getNameLatin1() {
		return this.nameLatin1;
	}

	public void setNameLatin1(String nameLatin1) {
		this.nameLatin1 = nameLatin1;
	}

	public String getImpKod() {
		return this.impKod;
	}

	public void setImpKod(String impKod) {
		this.impKod = impKod;
	}

	public String getImpName() {
		return this.impName;
	}

	public void setImpName(String impName) {
		this.impName = impName;
	}

	public String getImpClassn() {
		return this.impClassn;
	}

	public void setImpClassn(String impClassn) {
		this.impClassn = impClassn;
	}

	public String getImpMinnew() {
		return this.impMinnew;
	}

	public void setImpMinnew(String impMinnew) {
		this.impMinnew = impMinnew;
	}

	public String getImpClass() {
		return this.impClass;
	}

	public void setImpClass(String impClass) {
		this.impClass = impClass;
	}

	public String getImpMin() {
		return this.impMin;
	}

	public void setImpMin(String impMin) {
		this.impMin = impMin;
	}

	public String getRecState() {
		return this.recState;
	}

	public void setRecState(String recState) {
		this.recState = recState;
	}

	public Date getWorkFrom() {
		return this.workFrom;
	}

	public void setWorkFrom(Date workFrom) {
		this.workFrom = workFrom;
	}

	public Date getWorkTill() {
		return this.workTill;
	}

	public void setWorkTill(Date workTill) {
		this.workTill = workTill;
	}

	public String getDigest() {
		return this.digest;
	}

	public void setDigest(String digest) {
		this.digest = digest;
	}

}
