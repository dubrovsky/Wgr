package com.bivc.cimsmgs.db;

// Generated 02.06.2011 10:05:03 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * CimSmgsPlomb generated by hbm2java
 */
@JsonIgnoreProperties({ "cimSmgs"})
public class CimSmgsPlomb implements Serializable {

	private Long hid;
	private CimSmgs cimSmgs;
	private Short kpl;
	private String znak;
	private Date dattr;
	private Date locked;
	private String unLock;
	private BigDecimal hidCar;
	private BigDecimal hidKon;
	private Byte sort;
    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public CimSmgsPlomb() {
	}

	public CimSmgsPlomb(Long hid, Byte sort) {
		this.hid = hid;
		this.sort = sort;
	}

	public CimSmgsPlomb(Long hid, CimSmgs cimSmgs, Short kpl, String znak, Date dattr, Date locked, String unLock, BigDecimal hidCar,
			BigDecimal hidKon, Byte sort) {
		this.hid = hid;
		this.cimSmgs = cimSmgs;
		this.kpl = kpl;
		this.znak = znak;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.hidCar = hidCar;
		this.hidKon = hidKon;
		this.sort = sort;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}
    @JsonBackReference
	public CimSmgs getCimSmgs() {
		return this.cimSmgs;
	}
    @JsonBackReference
	public void setCimSmgs(CimSmgs cimSmgs) {
		this.cimSmgs = cimSmgs;
	}

	public Short getKpl() {
		return this.kpl;
	}

	public void setKpl(Short kpl) {
		this.kpl = kpl;
	}

	public String getZnak() {
		return this.znak;
	}

	public void setZnak(String znak) {
		this.znak = znak;
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

	public BigDecimal getHidCar() {
		return this.hidCar;
	}

	public void setHidCar(BigDecimal hidCar) {
		this.hidCar = hidCar;
	}

	public BigDecimal getHidKon() {
		return this.hidKon;
	}

	public void setHidKon(BigDecimal hidKon) {
		this.hidKon = hidKon;
	}

	public Byte getSort() {
		return this.sort;
	}

	public void setSort(Byte sort) {
		this.sort = sort;
	}

}
