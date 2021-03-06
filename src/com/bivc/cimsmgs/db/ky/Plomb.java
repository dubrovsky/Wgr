package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import java.io.Serializable;
import java.util.Date;
import java.util.Objects;

public class Plomb implements Serializable, Comparable<Plomb> {

	private Long hid;
	private Kont kont;
	private Short kpl;
	private String znak;
	private String station;
	private Date dattr;
	private Integer sort;
    private String trans;
    private String un;
    private Date altered;

    /*@Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "kont");
    }*/

	public String getStation() {
		return station;
	}

	public void setStation(String station) {
		this.station = station;
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

	public Plomb() {
	}

	public Plomb(Long hid) {
		this.hid = hid;
	}

	public Plomb(Long hid, Kont kont, Short kpl, String znak, Date dattr, Integer sort, String trans, String un, Date altered) {
		this.hid = hid;
		this.kont = kont;
		this.kpl = kpl;
		this.znak = znak;
		this.dattr = dattr;
		this.sort = sort;
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

	public Integer getSort() {
		return this.sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	@Override
	public int compareTo(Plomb that) {
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

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Plomb plomb = (Plomb) o;
		return hid.equals(plomb.hid) &&
				kpl.equals(plomb.kpl) &&
				znak.equals(plomb.znak) &&
				station.equals(plomb.station) &&
				dattr.equals(plomb.dattr) &&
				sort.equals(plomb.sort) &&
				trans.equals(plomb.trans) &&
				un.equals(plomb.un) &&
				Objects.equals(altered, plomb.altered);
	}

	@Override
	public int hashCode() {
		return Objects.hash(hid, kpl, znak, station, dattr, sort, trans, un, altered);
	}
}
