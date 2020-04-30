package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VagonBaseDTO implements Comparable<VagonBaseDTO> {

    private Long hid;
    private PoezdBaseDTO poezd;
    private NsiKyOwnersDTO owner;
    private String nvag;
    private Byte koleya;
    private Byte direction;
    private Short sort;
    private String line;

    private String kpv;
    private Integer kolOs;
    private Float masTar;
    private String sobstv;
    private String foot;

	@JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date bortDate;
    private String prim;
    private Long probeg;
    private Float podSila;

	@JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date plan_rem;
	@JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date reviz;
    private Long type_no;
    private Float dlina;
    private String model;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dprbTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dotpTime;

    private Boolean poruz;
    private Boolean defective;

    public VagonBaseDTO(Long hid) {
        this.hid = hid;
    }

    public VagonBaseDTO() {
    }

    public Date getDotp() {
        if(this.dotpDate != null){
            this.dotp = this.dotpDate;
            if(this.dotpTime != null){
                this.dotp = DateTimeUtils.addTimeToDate(this.dotpDate, this.dotpTime);
            }
        }
        return this.dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public Date getDotpDate() {
        return this.dotpDate != null ? this.dotpDate : this.dotp;
    }

    public Date getDprbDate() {
        return this.dprbDate != null ? this.dprbDate : this.dprb;
    }

    public void setDotpDate(Date dotpDate) {
        this.dotpDate = dotpDate;
    }

    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    public Date getDotpTime() {
        return this.dotpTime != null ? this.dotpTime : this.dotp;
    }

    public Date getDprbTime() {
        return this.dprbTime != null ? this.dprbTime : this.dprb;
    }

    public void setDotpTime(Date dotpTime) {
        this.dotpTime = dotpTime;
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
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
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

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public PoezdBaseDTO getPoezd() {
        return poezd;
    }

    public void setPoezd(PoezdBaseDTO poezd) {
        this.poezd = poezd;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public Short getSort() {
        return sort;
    }

    public void setSort(Short sort) {
        this.sort = sort;
    }

    public String getKpv() {
        return kpv;
    }

    public void setKpv(String kpv) {
        this.kpv = kpv;
    }

    public Integer getKolOs() {
        return kolOs;
    }

    public void setKolOs(Integer kolOs) {
        this.kolOs = kolOs;
    }

    public Float getMasTar() {
        return masTar;
    }

    public void setMasTar(Float masTar) {
        this.masTar = masTar;
    }

    public String getSobstv() {
        return sobstv;
    }

    public void setSobstv(String sobstv) {
        this.sobstv = sobstv;
    }

    public Date getBortDate() {
        return bortDate;
    }

    public void setBortDate(Date bortDate) {
        this.bortDate = bortDate;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Long getProbeg() {
        return probeg;
    }

    public void setProbeg(Long probeg) {
        this.probeg = probeg;
    }

    public Float getPodSila() {
        return podSila;
    }

    public void setPodSila(Float podSila) {
        this.podSila = podSila;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
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

    @Override
    public int compareTo(VagonBaseDTO that) {
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

    public String getLine() {
        return line;
    }

    public void setLine(String line) {
        this.line = line;
    }

    public String getFoot() {
        return foot;
    }

    public void setFoot(String foot) {
        this.foot = foot;
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

    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }
}
