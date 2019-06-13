package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontDTO implements Comparable<KontDTO>{

    private Long hid;
    private String nkon;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbTime;
    private Boolean poruz;
    private Long massa_tar;
    private Float pod_sila;
    private String type;
    private String vid;
    private String prizn_sob;
    private String naim_sob;
    private String gruzotpr;
    private String punkt_otpr;
    private String punkt_nazn;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonSerialize(using = DateSerializer.class)
    private Date teh_obsl;
    private String prim;
    private Byte sort;

    private Set<GruzDTO> gruzs = new TreeSet<>();

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Date getDprbDate() {
        return dprbDate;
    }

    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    public Date getDprbTime() {
        return dprbTime;
    }

    public void setDprbTime(Date dprbTime) {
        this.dprbTime = dprbTime;
    }

    public Boolean getPoruz() {
        return poruz;
    }

    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    public Long getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(Long massa_tar) {
        this.massa_tar = massa_tar;
    }

    public Float getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(Float pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getPrizn_sob() {
        return prizn_sob;
    }

    public void setPrizn_sob(String prizn_sob) {
        this.prizn_sob = prizn_sob;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getPunkt_otpr() {
        return punkt_otpr;
    }

    public void setPunkt_otpr(String punkt_otpr) {
        this.punkt_otpr = punkt_otpr;
    }

    public String getPunkt_nazn() {
        return punkt_nazn;
    }

    public void setPunkt_nazn(String punkt_nazn) {
        this.punkt_nazn = punkt_nazn;
    }

    public Date getTeh_obsl() {
        return teh_obsl;
    }

    public void setTeh_obsl(Date teh_obsl) {
        this.teh_obsl = teh_obsl;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(KontDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if (thisHid == null) {
            return AFTER;
        } else if (thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Set<GruzDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(Set<GruzDTO> gruzs) {
        this.gruzs = gruzs;
    }
}
