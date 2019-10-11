package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Objects;
import java.util.Set;
import java.util.TreeSet;

public class Gruz implements Serializable, Comparable<Gruz> {

	private Long hid;
	private Kont kont;
	private Vagon vagon;
	private Avto avto;
	private AvtoZayav avtoZayav;
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
	private Set<KontGruzHistory> history = new TreeSet<>();

	public Set<KontGruzHistory> getHistory() {
		return history;
	}

	public void setHistory(Set<KontGruzHistory> history) {
		this.history = history;
	}

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

	public Avto getAvto() {
		return avto;
	}

	public void setAvto(Avto avto) {
		this.avto = avto;
	}

	public AvtoZayav getAvtoZayav() {
		return avtoZayav;
	}

	public void setAvtoZayav(AvtoZayav avtoZayav) {
		this.avtoZayav = avtoZayav;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		Gruz gruz = (Gruz) o;
		return hid.equals(gruz.hid) &&
				upak.equals(gruz.upak) &&
				kgvn.equals(gruz.kgvn) &&
				nzgr.equals(gruz.nzgr) &&
				places.equals(gruz.places) &&
				dattr.equals(gruz.dattr) &&
				sort.equals(gruz.sort) &&
				massa.equals(gruz.massa) &&
				trans.equals(gruz.trans) &&
				un.equals(gruz.un) &&
				altered.equals(gruz.altered);
	}

	@Override
	public int hashCode() {
		return Objects.hash(hid, upak, kgvn, nzgr, places, dattr, sort, massa, trans, un, altered);
	}
}
