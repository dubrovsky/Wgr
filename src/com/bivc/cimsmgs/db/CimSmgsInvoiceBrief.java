package com.bivc.cimsmgs.db;

// Generated 09.09.2011 13:31:27 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.commons.myUser;
import com.fasterxml.jackson.annotation.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@JsonIgnoreProperties({"packDoc","route"})
public class CimSmgsInvoiceBrief implements Serializable {

	private Long hid;
	private CimSmgs cimSmgs;
	private String utiN;
	private String num;
	private Date dat;
	private Integer places;
	private BigDecimal g24N;
	private String un;
	private String trans;
	private Date dattr;
    private Route route;
    private PackDoc packDoc;

    public PackDoc getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public CimSmgsInvoiceBrief() {
	}

	public CimSmgsInvoiceBrief(Long hid, String un, String trans, Date dattr) {
		this.hid = hid;
		this.un = un;
		this.trans = trans;
		this.dattr = dattr;
	}

	public CimSmgsInvoiceBrief(Long hid, CimSmgs cimSmgs, String utiN, String num, Date dat, Integer places, BigDecimal g24N, String un,
			String trans, Date dattr) {
		this.hid = hid;
		this.cimSmgs = cimSmgs;
		this.utiN = utiN;
		this.num = num;
		this.dat = dat;
		this.places = places;
		this.g24N = g24N;
		this.un = un;
		this.trans = trans;
		this.dattr = dattr;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public CimSmgs getCimSmgs() {
		return this.cimSmgs;
	}

	public void setCimSmgs(CimSmgs cimSmgs) {
		this.cimSmgs = cimSmgs;
	}

	public String getUtiN() {
		return this.utiN;
	}

	public void setUtiN(String utiN) {
		this.utiN = utiN;
	}

	public String getNum() {
		return this.num;
	}

	public void setNum(String num) {
		this.num = num;
	}

	public Date getDat() {
		return this.dat;
	}

	public void setDat(Date dat) {
		this.dat = dat;
	}

	public Integer getPlaces() {
		return this.places;
	}

	public void setPlaces(Integer places) {
		this.places = places;
	}

	public BigDecimal getG24N() {
		return this.g24N;
	}

	public void setG24N(BigDecimal g24N) {
		this.g24N = g24N;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public String getTrans() {
		return this.trans;
	}

	public void setTrans(String trans) {
		this.trans = trans;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

    public void prepare4save(myUser user) {
        setUn(user.getUsername());
        setTrans(user.getUsr().getGroup().getName());
        setDattr(new Date());
    }

}
