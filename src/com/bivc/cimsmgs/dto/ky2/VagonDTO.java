package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.db.ky.Otpravka;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonDTO implements Comparable<VagonDTO> {

    private Long hid;

    /*@JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbTime;*/

    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprb;

    private String line;
    private String nvag;
    private String kpv;
    private Float podSila;
    private Integer kolOs;
    private Long masTar;
    private String foot;
    private String sobstv;
    private Boolean poruz;
    private Boolean defective;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date bortDate;
    private Long probeg;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date plan_rem;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date reviz;

    private Long type_no;
    private Float dlina;
    private String model;
    private String prim;
    private Short sort;
    private Otpravka otpravka;

    private TreeSet<GruzDTO> gruzs = new TreeSet<>();
    private TreeSet<KontDTO> konts = new TreeSet<>();

    /*public Date getDprbDate() {
        return this.dprbDate != null ? this.dprbDate : this.dprb;
    }

    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    public Date getDprbTime() {
        return this.dprbTime != null ? this.dprbTime : this.dprb;
    }

    public void setDprbTime(Date dprbTime) {
        this.dprbTime = dprbTime;
    }

    public Date getDprb() {
        if(this.dprbDate != null){
            this.dprb = this.dprbDate;
            if(this.dprbTime != null){
                this.dprb = DateTimeUtils.addTimeToDate(this.dprbDate, this.dprbTime);
            }
        }
        return this.dprb;
    }*/

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getKpv() {
        return kpv;
    }

    public void setKpv(String kpv) {
        this.kpv = kpv;
    }

    public Float getPodSila() {
        return podSila;
    }

    public void setPodSila(Float podSila) {
        this.podSila = podSila;
    }

    public Integer getKolOs() {
        return kolOs;
    }

    public void setKolOs(Integer kolOs) {
        this.kolOs = kolOs;
    }

    public Long getMasTar() {
        return masTar;
    }

    public void setMasTar(Long masTar) {
        this.masTar = masTar;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
    }

    public String getSobstv() {
        return sobstv;
    }

    public void setSobstv(String sobstv) {
        this.sobstv = sobstv;
    }

    public Boolean getPoruz() {
        return poruz;
    }

    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    public Boolean getDefective() {
        return defective;
    }

    public void setDefective(Boolean defective) {
        this.defective = defective;
    }

    public Date getBortDate() {
        return bortDate;
    }

    public void setBortDate(Date bortDate) {
        this.bortDate = bortDate;
    }

    public Long getProbeg() {
        return probeg;
    }

    public void setProbeg(Long probeg) {
        this.probeg = probeg;
    }

    public Date getPlan_rem() {
        return plan_rem;
    }

    public void setPlan_rem(Date plan_rem) {
        this.plan_rem = plan_rem;
    }

    public Date getReviz() {
        return reviz;
    }

    public void setReviz(Date reviz) {
        this.reviz = reviz;
    }

    public Long getType_no() {
        return type_no;
    }

    public void setType_no(Long type_no) {
        this.type_no = type_no;
    }

    public Float getDlina() {
        return dlina;
    }

    public void setDlina(Float dlina) {
        this.dlina = dlina;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Short getSort() {
        return sort;
    }

    public void setSort(Short sort) {
        this.sort = sort;
    }

    @Override
    public int compareTo(VagonDTO that) {
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

    public TreeSet<GruzDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public Otpravka getOtpravka() {
        return otpravka;
    }

    public void setOtpravka(Otpravka otpravka) {
        this.otpravka = otpravka;
    }

    public TreeSet<KontDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontDTO> konts) {
        this.konts = konts;
    }


    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }
}
