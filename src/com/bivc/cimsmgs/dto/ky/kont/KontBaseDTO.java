package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

/**
 * Created by peter on 21.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class KontBaseDTO implements IKontBaseDTO, Comparable<KontBaseDTO> {

    private Long hid;
    private String nkon;
    private Boolean poruz;

    private Long massa_tar;
    private Float pod_sila;
    private String type;
    private String vid;
    private String prizn_sob;
    private String naim_sob;
    private String gruzotpr;
    private String prim;
    private String punkt_otpr;
    private String punkt_nazn;
    private NsiKyOwnersDTO owner;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonSerialize(using = DateSerializer.class)
    private Date teh_obsl;

    private Byte sort;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private String un;

    public KontBaseDTO() {
    }

    @Override
    public Long getHid() {
        return hid;
    }

    @Override
    public void setHid(Long hid) {
        this.hid = hid;
    }

    @Override
    public String getNkon() {
        return nkon;
    }

    @Override
    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    @Override
    public Boolean getPoruz() {
        return poruz;
    }

    @Override
    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    @Override
    public Byte getSort() {
        return sort;
    }

    @Override
    public void setSort(Byte sort) {
        this.sort = sort;
    }

    @Override
    public Long getMassa_tar() {
        return massa_tar;
    }

    @Override
    public void setMassa_tar(Long massa_tar) {
        this.massa_tar = massa_tar;
    }

    @Override
    public Float getPod_sila() {
        return pod_sila;
    }

    @Override
    public void setPod_sila(Float pod_sila) {
        this.pod_sila = pod_sila;
    }

    @Override
    public String getType() {
        return type;
    }

    @Override
    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String getVid() {
        return vid;
    }

    @Override
    public void setVid(String vid) {
        this.vid = vid;
    }

    @Override
    public String getPrizn_sob() {
        return prizn_sob;
    }

    @Override
    public void setPrizn_sob(String prizn_sob) {
        this.prizn_sob = prizn_sob;
    }

    @Override
    public String getNaim_sob() {
        return naim_sob;
    }

    @Override
    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    @Override
    public String getGruzotpr() {
        return gruzotpr;
    }

    @Override
    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    @Override
    public Date getTeh_obsl() {
        return teh_obsl;
    }

    @Override
    public void setTeh_obsl(Date teh_obsl) {
        this.teh_obsl = teh_obsl;
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
    public int compareTo(KontBaseDTO that) {
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

    @Override
    public String getPrim() {
        return prim;
    }

    @Override
    public void setPrim(String prim) {
        this.prim = prim;
    }

    @Override
    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    @Override
    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }

    @Override
    public String getPunkt_otpr() {
        return punkt_otpr;
    }

    @Override
    public void setPunkt_otpr(String punkt_otpr) {
        this.punkt_otpr = punkt_otpr;
    }

    @Override
    public String getPunkt_nazn() {
        return punkt_nazn;
    }

    @Override
    public void setPunkt_nazn(String punkt_nazn) {
        this.punkt_nazn = punkt_nazn;
    }
}
