package com.bivc.cimsmgs.db.nsi;

// Generated 22.04.2009 13:49:34 by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * Measure generated by hbm2java
 */
public class Measure implements java.io.Serializable {

	private BigDecimal id;
	private Company company;
	private Measure measure;
	private String code;
	private String name;
	private String nameLatin1;
	private BigDecimal recalcFactor;
	private Set<Measure> measures = new HashSet<Measure>(0);

	public Measure() {
	}

	public Measure(BigDecimal id, Company company, String code, String name,
			String nameLatin1, BigDecimal recalcFactor) {
		this.id = id;
		this.company = company;
		this.code = code;
		this.name = name;
		this.nameLatin1 = nameLatin1;
		this.recalcFactor = recalcFactor;
	}

	public Measure(BigDecimal id, Company company, Measure measure,
			String code, String name, String nameLatin1,
			BigDecimal recalcFactor, Set<Measure> measures) {
		this.id = id;
		this.company = company;
		this.measure = measure;
		this.code = code;
		this.name = name;
		this.nameLatin1 = nameLatin1;
		this.recalcFactor = recalcFactor;
		this.measures = measures;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public Company getCompany() {
		return this.company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public Measure getMeasure() {
		return this.measure;
	}

	public void setMeasure(Measure measure) {
		this.measure = measure;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNameLatin1() {
		return this.nameLatin1;
	}

	public void setNameLatin1(String nameLatin1) {
		this.nameLatin1 = nameLatin1;
	}

	public BigDecimal getRecalcFactor() {
		return this.recalcFactor;
	}

	public void setRecalcFactor(BigDecimal recalcFactor) {
		this.recalcFactor = recalcFactor;
	}

	public Set<Measure> getMeasures() {
		return this.measures;
	}

	public void setMeasures(Set<Measure> measures) {
		this.measures = measures;
	}

}
