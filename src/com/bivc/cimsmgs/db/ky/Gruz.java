package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class Gruz implements Serializable, Comparable<Gruz> {

	private Long hid;
	private Kont kont;
	private Vagon vagon;
	private String upak;
	private String kgvn;
	private String nzgr;
	private Integer places;
	private Date dattr;
	private Byte sort;
	private BigDecimal massa;
    private String trans;
    private String un;
    private Date altered;

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "kont");
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Gruz() {
	}

	public Gruz(Long hid, Kont kont, String upak, String kgvn, String nzgr, Integer places, Date dattr, Byte sort, BigDecimal massa, String trans, String un, Date altered) {
		this.hid = hid;
		this.kont = kont;
		this.upak = upak;
		this.kgvn = kgvn;
		this.nzgr = nzgr;
		this.places = places;
		this.dattr = dattr;
		this.sort = sort;
		this.massa = massa;
        this.trans = trans;
        this.un = un;
        this.altered = altered;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public Kont getKont() {
		return this.kont;
	}

	public void setKont(Kont kont) {
		this.kont = kont;
	}

	public String getUpak() {
		return this.upak;
	}

	public void setUpak(String upak) {
		this.upak = upak;
	}

	public String getKgvn() {
		return this.kgvn;
	}

	public void setKgvn(String kgvn) {
		this.kgvn = kgvn;
	}

	public String getNzgr() {
		return this.nzgr;
	}

	public void setNzgr(String nzgr) {
		this.nzgr = nzgr;
	}

	public Integer getPlaces() {
		return this.places;
	}

	public void setPlaces(Integer places) {
		this.places = places;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public Byte getSort() {
		return this.sort;
	}

	public void setSort(Byte sort) {
		this.sort = sort;
	}

	public BigDecimal getMassa() {
		return this.massa;
	}

	public void setMassa(BigDecimal massa) {
		this.massa = massa;
	}

	@Override
	public int compareTo(Gruz that) {
		final int BEFORE = -1;
		final int AFTER = 1;

		if (that == null) {
			return BEFORE;
		}

		Comparable thisHid = this.getHid();
		Comparable thatHid = that.getHid();

		if(thisHid == null) {
			return AFTER;
		} else if(thatHid == null) {
			return BEFORE;
		} else {
			return thisHid.compareTo(thatHid);
		}
	}

	public Vagon getVagon() {
		return vagon;
	}

	public void setVagon(Vagon vagon) {
		this.vagon = vagon;
	}
}
