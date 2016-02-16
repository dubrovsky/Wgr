package com.bivc.cimsmgs.db;

// Generated 02.03.2009 10:02:24 by Hibernate Tools 3.2.4.CR1

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;
import java.util.Date;
import java.util.StringTokenizer;

/**
 * CimSmgsDocs generated by hbm2java
 */
@JsonIgnoreProperties({"cimSmgs"})
public class CimSmgsDocs implements Serializable {

    private Long hid;
    private CimSmgs cimSmgs;
    private String code;
    private String text;
    private Date dattr;
    private Date locked;
    private String unLock;
    private String text2;
    private String fieldNum;
    private Byte sort;
    private String ncas;
    private String ndoc;
    private Date dat;
    private Integer ncopy;
    private String text3;
    private String road_s_name_r;

    public String getRoad_s_name_r() {
        return road_s_name_r;
    }

    public void setRoad_s_name_r(String road_s_name_r) {
        this.road_s_name_r = road_s_name_r;
    }

    public String getText3() {
        return text3;
    }

    public void setText3(String text3) {
        this.text3 = text3;
    }

    public Integer getNcopy() {
        return ncopy;
    }

    public void setNcopy(Integer ncopy) {
        this.ncopy = ncopy;
    }

    public Date getDat() {
        return dat;
    }

    public void setDat(Date dat) {
        this.dat = dat;
    }

    public String getNdoc() {
        return ndoc;
    }

    public void setNdoc(String ndoc) {
        this.ndoc = ndoc;
    }

    public String getNcas() {
        return ncas;
    }

    public void setNcas(String ncas) {
        this.ncas = ncas;
    }

    public CimSmgsDocs() {
    }

    public CimSmgsDocs(Long hid, Byte sort, String fieldNum) {
        this.hid = hid;
        this.sort = sort;
        this.fieldNum = fieldNum;
    }

    public CimSmgsDocs(Long hid, CimSmgs cimSmgs, String code,
                       String text, Date dattr, Date locked, String unLock, String text2,
                       String fieldNum, Byte sort) {
        this.hid = hid;
        this.cimSmgs = cimSmgs;
        this.code = code;
        this.text = text;
        this.dattr = dattr;
        this.locked = locked;
        this.unLock = unLock;
        this.text2 = text2;
        this.fieldNum = fieldNum;
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

    public String getCode() {
        return this.code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getText() {
        return this.text;
    }

    public void setText(String text) {
        this.text = text;
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

    public String getText2() {
        return this.text2;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }

    public String getFieldNum() {
        return this.fieldNum;
    }

    public Byte getSort() {
        return sort;
    }

    public void setFieldNum(String fieldNum) {
        this.fieldNum = fieldNum;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public int hashCode() {
        // you pick a hard-coded, randomly chosen, non-zero, odd number
        // ideally different for each class
        return new HashCodeBuilder(17, 37).
                append(hid).
                toHashCode();
    }

    public boolean equals(Object obj) {
        if (obj instanceof CimSmgsCarList == false) {
            return false;
        }
        if (this == obj) {
            return true;
        }
        CimSmgsCarList rhs = (CimSmgsCarList) obj;
        return new EqualsBuilder()
                .appendSuper(super.equals(obj))
                .append(hid, rhs.getHid())
                .isEquals();
    }

    public String toString() {
        return new ToStringBuilder(this).
                append("hid", hid).
                append("name", code).
                toString();
    }

    public String marshroot() {
        if (this.text == null) {
            return this.text;
        } else {
            StringBuffer buf = new StringBuffer();
            StringTokenizer st = new StringTokenizer(this.text);
            String token;
            while (st.hasMoreTokens()) {
                token = st.nextToken();
                if (!token.matches("[0-9]+")) {
                    buf.append(" " + token);
                }
            }
            return buf.toString();
        }
    }


}
