package com.bivc.cimsmgs.db;

// Generated 02.03.2009 10:02:24 by Hibernate Tools 3.2.4.CR1

import com.bivc.cimsmgs.commons.money2str;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * CimSmgsGruz generated by hbm2java
 */
@JsonIgnoreProperties({"cimSmgsCarList","cimSmgsKonList"})
public class CimSmgsGruz implements Serializable {

	private Long hid;
	private CimSmgsCarList cimSmgsCarList;
	// private CimSmgs cimSmgs;
	private CimSmgsKonList cimSmgsKonList;
	private String upak;
	private String len;
	private String kgvn;
	private String nzgr;
	private String nzgrEu;
	private String ekgvn;
	private String enzgr;
	private BigDecimal massa;
	private Integer places;
	private Date dattr;
	private Date locked;
	private String unLock;
	private Byte lang;
	private Byte seq;
	private Integer sort;
    private String nzgrRid;
    private String nzgrRidEu;
    private Boolean ohr;
    private String upakForeign;

    public String getUpakForeign() {
        return upakForeign;
    }

    public void setUpakForeign(String upakForeign) {
        this.upakForeign = upakForeign;
    }

    public Boolean isOhr() {
        return ohr;
    }

    public void setOhr(Boolean ohr) {
        this.ohr = ohr;
    }

    public String getNzgrRidEu() {
        return nzgrRidEu;
    }

    public void setNzgrRidEu(String nzgrRidEu) {
        this.nzgrRidEu = nzgrRidEu;
    }

    public String getNzgrRid() {
        return nzgrRid;
    }

    public void setNzgrRid(String nzgrRid) {
        this.nzgrRid = nzgrRid;
    }

    public CimSmgsGruz() {
	}

	public CimSmgsGruz(Long hid, Byte seq) {
		this.hid = hid;
		this.seq = seq;
	}

	public CimSmgsGruz(Long hid, CimSmgsCarList cimSmgsCarList,
	/* CimSmgs cimSmgs, */CimSmgsKonList cimSmgsKonList, String upak, String len, String kgvn, String nzgr, String nzgrEu, String ekgvn,
			String enzgr, BigDecimal massa, Integer places, Date dattr, Date locked, String unLock, Byte lang, Byte seq, Integer sort) {
		this.hid = hid;
		this.cimSmgsCarList = cimSmgsCarList;
		// this.cimSmgs = cimSmgs;
		this.cimSmgsKonList = cimSmgsKonList;
		this.upak = upak;
		this.len = len;
		this.kgvn = kgvn;
		this.nzgr = nzgr;
		this.nzgrEu = nzgrEu;
		this.ekgvn = ekgvn;
		this.enzgr = enzgr;
		this.places = places;
		this.massa = massa;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.lang = lang;
		this.seq = seq;
		this.sort = sort;
	}

	public CimSmgsCarList getCimSmgsCarList() {
		return this.cimSmgsCarList;
	}

	public void setCimSmgsCarList(CimSmgsCarList cimSmgsCarList) {
		this.cimSmgsCarList = cimSmgsCarList;
	}

	// public CimSmgs getCimSmgs() {
	// return this.cimSmgs;
	// }
	//
	// public void setCimSmgs(CimSmgs cimSmgs) {
	// this.cimSmgs = cimSmgs;
	// }
	public CimSmgsKonList getCimSmgsKonList() {
		return this.cimSmgsKonList;
	}

	public void setCimSmgsKonList(CimSmgsKonList cimSmgsKonList) {
		this.cimSmgsKonList = cimSmgsKonList;
	}

	public String getUpak() {
		return this.upak;
	}

	public void setUpak(String upak) {
		this.upak = upak;
	}

	public String getLen() {
		return this.len;
	}

	public void setLen(String len) {
		this.len = len;
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

	public Byte getLang() {
		return this.lang;
	}

	public Long getHid() {
		return hid;
	}

	public Byte getSeq() {
		return seq;
	}

	public Integer getSort() {
		return sort;
	}

	public String getEkgvn() {
		return ekgvn;
	}

	public BigDecimal getMassa() {
		return massa;
	}

	public String getEnzgr() {
		return enzgr;
	}

	public String getNzgrEu() {
		return nzgrEu;
	}

	public void setLang(Byte lang) {
		this.lang = lang;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public void setSeq(Byte seq) {
		this.seq = seq;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public void setEnzgr(String enzgr) {
		this.enzgr = enzgr;
	}

	public void setMassa(BigDecimal massa) {
		this.massa = massa;
	}

	public void setEkgvn(String ekgvn) {
		this.ekgvn = ekgvn;
	}

	public void setNzgrEu(String nzgrEu) {
		this.nzgrEu = nzgrEu;
	}

	public String placesDisp4Print() {
		return (places != null) ? (new money2str(places.doubleValue(), "NONE").getMoney2str().toString().trim()) : "";
	}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CimSmgsGruz that = (CimSmgsGruz) o;

        return new EqualsBuilder()
                .append(hid, that.hid)
                .append(cimSmgsCarList, that.cimSmgsCarList)
                .append(cimSmgsKonList, that.cimSmgsKonList)
                .append(upak, that.upak)
                .append(len, that.len)
                .append(kgvn, that.kgvn)
                .append(nzgr, that.nzgr)
                .append(nzgrEu, that.nzgrEu)
                .append(ekgvn, that.ekgvn)
                .append(enzgr, that.enzgr)
                .append(massa, that.massa)
                .append(places, that.places)
                .append(dattr, that.dattr)
                .append(lang, that.lang)
                .append(seq, that.seq)
                .append(sort, that.sort)
                .append(nzgrRid, that.nzgrRid)
                .append(nzgrRidEu, that.nzgrRidEu)
                .append(ohr, that.ohr)
                .append(upakForeign, that.upakForeign)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(hid)
                .append(cimSmgsCarList)
                .append(cimSmgsKonList)
                .append(upak)
                .append(len)
                .append(kgvn)
                .append(nzgr)
                .append(nzgrEu)
                .append(ekgvn)
                .append(enzgr)
                .append(massa)
                .append(places)
                .append(dattr)
                .append(lang)
                .append(seq)
                .append(sort)
                .append(nzgrRid)
                .append(nzgrRidEu)
                .append(ohr)
                .append(upakForeign)
                .toHashCode();
    }

	public String toString() {
		return new ToStringBuilder(this).append("hid", hid).append("name", nzgr).toString();
	}

	public String gruz4CimSmgs() {
		StringBuffer result = new StringBuffer("");
		if (nzgr != null && nzgr.length() > 0) {
			result.append(nzgr);
			result.append("&nbsp;&nbsp;&nbsp;&nbsp;");
		}
		if (nzgrEu != null && nzgrEu.length() > 0) {
			result.append(nzgrEu);
		}
		if (kgvn != null && kgvn.length() > 0) {
			result.append("<br/>ГНГ-");
			result.append(kgvn);
		}
		if (ekgvn != null && ekgvn.length() > 0) {
			result.append("<br/>ЕТ СНГ-");
			result.append(ekgvn);
		}
		return result.toString();
	}

    public String gruz4CimSmgs1() {
        StringBuffer result = new StringBuffer("");
        if (nzgr != null && nzgr.length() > 0) {
            result.append(nzgr);
            result.append("    ");
        }
        if (nzgrEu != null && nzgrEu.length() > 0) {
            result.append(nzgrEu);
        }
        if (kgvn != null && kgvn.length() > 0) {
            result.append("\nГНГ-");
            result.append(kgvn);
        }
        if (ekgvn != null && ekgvn.length() > 0) {
            result.append("\nЕТ СНГ-");
            result.append(ekgvn);
        }
        return result.toString();
    }

    public String gruz4CimSmgsEu(int index) {
        StringBuilder result = new StringBuilder("");

        ///// DE
        result.append("Inhalt ");
        result.append(index + 1);
        result.append(StringUtils.isNotBlank(kgvn) ? " : NHM: " + kgvn : "");
        result.append(StringUtils.isNotBlank(nzgrEu) ? " - " + nzgrEu + ";" : "");
        if(massa != null){
            result.append(" Gewicht:" + massa + " kg;");
        }
        result.append(StringUtils.isNotBlank(ekgvn) ? " ET SNG: " + ekgvn + ";" : "");
        if(places != null){
            result.append(" " + places);
        }
        result.append(StringUtils.isNotBlank(upakForeign) ? " - " + upakForeign : "");
        ////////// END DE
        result.append("\n");

        //// RU
        result.append("Содержимое ");
        result.append(index + 1);
        result.append(StringUtils.isNotBlank(kgvn) ? " : ГНГ: " + kgvn : "");
        result.append(StringUtils.isNotBlank(nzgr) ? " - " + nzgr + ";" : "");
        if(massa != null){
            result.append(" Масса:" + massa + " kg;");
        }
        result.append(StringUtils.isNotBlank(ekgvn) ? " ЕТ СНГ: " + ekgvn + ";" : "");
        if(places != null){
            result.append(" " + places);
        }
        result.append(StringUtils.isNotBlank(upak) ? " - " + upak : "");

        /// END RU
        return result.toString();
    }
	
	public String mesta4CimSmgs() {
		StringBuffer result = new StringBuffer("");
		if (places != null) {
			result.append(places);
			result.append("&nbsp;");
			result.append("(");
			result.append(placesDisp4Print());
			result.append(")");
		}
		if (massa != null) {
			result.append("&nbsp;");
			result.append(massa);
			result.append("кг");
		}
		return result.toString();
	}

    public String mesta4CimSmgs1() {
        StringBuffer result = new StringBuffer("");
        if (places != null) {
          result.append("1 (");
          result.append(places);
          result.append(")\n");
          result.append(placesDisp4Print());
        }
/*
        if (massa != null) {
            result.append("\n");
            result.append(massa);
            result.append("кг");
        }
*/
        return result.toString();
    }

    public String upak4CimSmgs1() {
        StringBuilder result = new StringBuilder("");
        result.append(StringUtils.defaultString(upak));
        if(StringUtils.isNotBlank(upak) && StringUtils.isNotBlank(upakForeign)){
            result.append("/");
        }
        result.append(StringUtils.defaultString(upakForeign));
        return result.toString();
    }
    
    public String kgvn4GuDisp() {
        StringBuffer sb = new StringBuffer("");
        if(kgvn != null && kgvn.length() > 0){
            String prefix = "";
            for (int i = 0;i < kgvn.length(); i++){
                sb.append(prefix);
                prefix = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                sb.append(kgvn.charAt(i));
            }
        }
        return sb.toString();
    }


    public String kgvn4GuDisp1() {
        StringBuffer sb = new StringBuffer("");
        if(kgvn != null && kgvn.length() > 0){
            String prefix = "";
            for (int i = 0;i < kgvn.length(); i++){
                sb.append(prefix);
                prefix = "        ";
                sb.append(kgvn.charAt(i));
            }
        }
        return sb.toString();
    }

    public String g11CmrDisp() {
            String result = "";
            if(massa != null){
                result = massa.toString() + " kg";
            }

            return result;
        }
}
