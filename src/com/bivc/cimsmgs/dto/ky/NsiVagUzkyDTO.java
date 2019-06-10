package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class NsiVagUzkyDTO {
    private Long hid;
    private String nvaguf;
    private String nvagu;
    private NsiKyOwnersDTO owner;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dexpB;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dexpEnd;
    private String podtv;
    private String koddor;
    private String kodadm;
    private String sobs;
    private String vidkod;
    private String aktnvagu;
    private String kodownvag;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dparkIn;
    private Long osi;
    private Integer razvor;
    private Long mnetvag;
    private Long grpodvag;
    private Long dlvag;
    private String typevag;
    private Integer hidOwn;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dLastrem;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dPlanrem;

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNvaguf() {
        return nvaguf;
    }

    public void setNvaguf(String nvaguf) {
        this.nvaguf = nvaguf;
    }

    public String getNvagu() {
        return nvagu;
    }

    public void setNvagu(String nvagu) {
        this.nvagu = nvagu;
    }

    public Date getDexpB() {
        return dexpB;
    }

    public void setDexpB(Date dexpB) {
        this.dexpB = dexpB;
    }

    public Date getDexpEnd() {
        return dexpEnd;
    }

    public void setDexpEnd(Date dexpEnd) {
        this.dexpEnd = dexpEnd;
    }

    public String getPodtv() {
        return podtv;
    }

    public void setPodtv(String podtv) {
        this.podtv = podtv;
    }

    public String getKoddor() {
        return koddor;
    }

    public void setKoddor(String koddor) {
        this.koddor = koddor;
    }

    public String getKodadm() {
        return kodadm;
    }

    public void setKodadm(String kodadm) {
        this.kodadm = kodadm;
    }

    public String getSobs() {
        return sobs;
    }

    public void setSobs(String sobs) {
        this.sobs = sobs;
    }

    public String getVidkod() {
        return vidkod;
    }

    public void setVidkod(String vidkod) {
        this.vidkod = vidkod;
    }

    public String getAktnvagu() {
        return aktnvagu;
    }

    public void setAktnvagu(String aktnvagu) {
        this.aktnvagu = aktnvagu;
    }

    public String getKodownvag() {
        return kodownvag;
    }

    public void setKodownvag(String kodownvag) {
        this.kodownvag = kodownvag;
    }

    public Date getDparkIn() {
        return dparkIn;
    }

    public void setDparkIn(Date dparkIn) {
        this.dparkIn = dparkIn;
    }

    public Long getOsi() {
        return osi;
    }

    public void setOsi(Long osi) {
        this.osi = osi;
    }

    public Integer getRazvor() {
        return razvor;
    }

    public void setRazvor(Integer razvor) {
        this.razvor = razvor;
    }

    public Long getMnetvag() {
        return mnetvag;
    }

    public void setMnetvag(Long mnetvag) {
        this.mnetvag = mnetvag;
    }

    public Long getGrpodvag() {
        return grpodvag;
    }

    public void setGrpodvag(Long grpodvag) {
        this.grpodvag = grpodvag;
    }

    public Long getDlvag() {
        return dlvag;
    }

    public void setDlvag(Long dlvag) {
        this.dlvag = dlvag;
    }

    public String getTypevag() {
        return typevag;
    }

    public void setTypevag(String typevag) {
        this.typevag = typevag;
    }

    public Integer getHidOwn() {
        return hidOwn;
    }

    public void setHidOwn(Integer hidOwn) {
        this.hidOwn = hidOwn;
    }

    public Date getdLastrem() {
        return dLastrem;
    }

    public void setdLastrem(Date dLastrem) {
        this.dLastrem = dLastrem;
    }

    public Date getdPlanrem() {
        return dPlanrem;
    }

    public void setdPlanrem(Date dPlanrem) {
        this.dPlanrem = dPlanrem;
    }

    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }
}
