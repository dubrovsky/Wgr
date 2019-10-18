package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class ClientBaseDTO {

    private Long sectorHid;
    private String sectorName;
    private String location; // poezd, avto
    private Long kontHid;
    private String nkon;
    private Long massa_tar;
    private BigDecimal massa_brutto;
    private BigDecimal massa_brutto_all;
    private BigDecimal pod_sila;
    private String vid;
    private Long poezdHid;
    private Long avtoHid;
    private String npprm;
    private String nppr;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;
    private Long clientHid;
    private String clientName;
    private Integer kyDays; // dney na KY

    public Long getSectorHid() {
        return sectorHid;
    }

    public void setSectorHid(Long sectorHid) {
        this.sectorHid = sectorHid;
    }

    public String getSectorName() {
        return sectorName;
    }

    public void setSectorName(String sectorName) {
        this.sectorName = sectorName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Long getKontHid() {
        return kontHid;
    }

    public void setKontHid(Long kontHid) {
        this.kontHid = kontHid;
    }

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Long getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(Long massa_tar) {
        this.massa_tar = massa_tar;
    }

    public BigDecimal getMassa_brutto() {
        return massa_brutto;
    }

    public void setMassa_brutto(BigDecimal massa_brutto) {
        this.massa_brutto = massa_brutto;
    }

    public BigDecimal getMassa_brutto_all() {
        return massa_brutto_all;
    }

    public void setMassa_brutto_all(BigDecimal massa_brutto_all) {
        this.massa_brutto_all = massa_brutto_all;
    }

    public BigDecimal getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(BigDecimal pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public Long getPoezdHid() {
        return poezdHid;
    }

    public void setPoezdHid(Long poezdHid) {
        this.poezdHid = poezdHid;
    }

    public Long getAvtoHid() {
        return avtoHid;
    }

    public void setAvtoHid(Long avtoHid) {
        this.avtoHid = avtoHid;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public Integer getKyDays() {
        return kyDays;
    }

    public void setKyDays(Integer kyDays) {
        this.kyDays = kyDays;
    }
}
