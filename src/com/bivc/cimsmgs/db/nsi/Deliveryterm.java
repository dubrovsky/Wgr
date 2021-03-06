package com.bivc.cimsmgs.db.nsi;

// Generated 22.04.2009 13:49:34 by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;
import java.util.Date;

/**
 * Deliveryterm generated by hbm2java
 */
public class Deliveryterm implements java.io.Serializable {

	private BigDecimal id;
	private String code;
	private String mlName;
	private String nameLatin1;
	private String impCode;
	private String impName;
	private String recState;
	private Date workFrom;
	private Date workTill;
	private String digest;
	private String impCodeRu;

	public Deliveryterm() {
	}

	public Deliveryterm(BigDecimal id, String code, String mlName,
			String nameLatin1, String recState, Date workFrom) {
		this.id = id;
		this.code = code;
		this.mlName = mlName;
		this.nameLatin1 = nameLatin1;
		this.recState = recState;
		this.workFrom = workFrom;
	}

	public Deliveryterm(BigDecimal id, String code, String mlName,
			String nameLatin1, String impCode, String impName, String recState,
			Date workFrom, Date workTill, String digest, String impCodeRu) {
		this.id = id;
		this.code = code;
		this.mlName = mlName;
		this.nameLatin1 = nameLatin1;
		this.impCode = impCode;
		this.impName = impName;
		this.recState = recState;
		this.workFrom = workFrom;
		this.workTill = workTill;
		this.digest = digest;
		this.impCodeRu = impCodeRu;
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

	public String getImpCode() {
		return this.impCode;
	}

	public void setImpCode(String impCode) {
		this.impCode = impCode;
	}

	public String getImpName() {
		return this.impName;
	}

	public void setImpName(String impName) {
		this.impName = impName;
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

	public String getImpCodeRu() {
		return this.impCodeRu;
	}

	public void setImpCodeRu(String impCodeRu) {
		this.impCodeRu = impCodeRu;
	}

}
