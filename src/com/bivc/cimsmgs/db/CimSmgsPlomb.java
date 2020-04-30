package com.bivc.cimsmgs.db;

// Generated 02.06.2011 10:05:03 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.StringUtils;

import java.io.Serializable;
import java.util.Objects;

/**
 * CimSmgsPlomb generated by hbm2java
 */
@JsonIgnoreProperties({ "cimSmgs", "cimSmgsKonList", "cimSmgsCarList"})
public class CimSmgsPlomb implements Serializable {

	private Long hid;
	private CimSmgs cimSmgs;
	private Short kpl;
	private String znak;
	/*private Date dattr;
	private Date locked;
	private String unLock;
	private BigDecimal hidCar;
	private BigDecimal hidKon;*/
	private Byte sort;
    private String type;
    private CimSmgsKonList cimSmgsKonList;
    private CimSmgsCarList cimSmgsCarList;

    public CimSmgsCarList getCimSmgsCarList() {
        return cimSmgsCarList;
    }

    public void setCimSmgsCarList(CimSmgsCarList cimSmgsCarList) {
        this.cimSmgsCarList = cimSmgsCarList;
    }

    public CimSmgsKonList getCimSmgsKonList() {
        return cimSmgsKonList;
    }

    public void setCimSmgsKonList(CimSmgsKonList cimSmgsKonList) {
        this.cimSmgsKonList = cimSmgsKonList;
    }

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

	public CimSmgsPlomb(Long hid, CimSmgs cimSmgs, Short kpl, String znak, /*Date dattr, Date locked, String unLock,*/ CimSmgsCarList hidCar,
                        CimSmgsKonList hidKon, Byte sort) {
		this.hid = hid;
		this.cimSmgs = cimSmgs;
		this.kpl = kpl;
		this.znak = znak;
		/*this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.hidCar = hidCar;
		this.hidKon = hidKon;*/
        this.cimSmgsCarList = hidCar;
        this.cimSmgsKonList = hidKon;
		this.sort = sort;
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

	/*public Date getDattr() {
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
	}*/

	public Byte getSort() {
		return this.sort;
	}

	public void setSort(Byte sort) {
		this.sort = sort;
	}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgsPlomb that = (CimSmgsPlomb) o;
        return Objects.equals(hid, that.hid) &&
                Objects.equals(cimSmgs != null ? cimSmgs.getHid() : "", that.cimSmgs != null ? that.cimSmgs.getHid() : "") &&
                Objects.equals(kpl, that.kpl) &&
                Objects.equals(znak, that.znak) &&
                Objects.equals(sort, that.sort) &&
                Objects.equals(type, that.type) &&
                Objects.equals(cimSmgsKonList != null ? cimSmgsKonList.getHid() : "", that.cimSmgsKonList != null ? that.cimSmgsKonList.getHid() : "") &&
                Objects.equals(cimSmgsCarList != null ? cimSmgsCarList.getHid() : "", that.cimSmgsCarList != null ? that.cimSmgsCarList.getHid() : "");
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, cimSmgs != null ? cimSmgs.getHid() : "", kpl, znak, sort, type, cimSmgsKonList != null ? cimSmgsKonList.getHid() : "", cimSmgsCarList != null ? cimSmgsCarList.getHid() : "");
    }

    public String plomb4CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(getKpl() != null ? getKpl() + "x " : "");
        sb.append(StringUtils.defaultString(getZnak()));
        return sb.toString();
    }
    public CimSmgsPlomb makeCopy()
	{
		CimSmgsPlomb plombCopy= new CimSmgsPlomb();
		plombCopy.setKpl(getKpl());
		plombCopy.setZnak(getZnak());
		return plombCopy;
	}

}
