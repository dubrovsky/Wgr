package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.db.ky.KontStatus;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import com.bivc.cimsmgs.dto.ky.YardBaseDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class KontOperationsDTO extends KontBaseDTO implements IKontOperations {
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;

    @JsonSerialize(using = DateSerializer.class)
    private Date dprbDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dprbTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;

    @JsonSerialize(using = DateSerializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dotpTime;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dyard;

    @JsonSerialize(using = DateSerializer.class)
    private Date dyardDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dyardTime;

    private VagonBaseDTO vagonInto;
    private PoezdBaseDTO poezdInto;
    private VagonBaseDTO vagonOut;
    private PoezdBaseDTO poezdOut;
    private AvtoBaseDTO avtoInto;
    private AvtoBaseDTO avtoOut;
    private YardBaseDTO yard;

    private KontStatus status;
    private KontStatus prevStatus;
    private Long ky_x;
    private Long ky_y;
    private Long ky_z;
    private String ky_sector;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date datKyInto;

    @Override
    public AvtoBaseDTO getAvtoOut() {
        return avtoOut;
    }

    @Override
    public void setAvtoOut(AvtoBaseDTO avtoOut) {
        this.avtoOut = avtoOut;
    }

    @Override
    public AvtoBaseDTO getAvtoInto() {
        return avtoInto;
    }

    @Override
    public void setAvtoInto(AvtoBaseDTO avtoInto) {
        this.avtoInto = avtoInto;
    }

    @Override
    public VagonBaseDTO getVagonOut() {
        return vagonOut;
    }

    @Override
    public void setVagonOut(VagonBaseDTO vagonOut) {
        this.vagonOut = vagonOut;
    }

    @Override
    public PoezdBaseDTO getPoezdOut() {
        return poezdOut;
    }

    @Override
    public void setPoezdOut(PoezdBaseDTO poezdOut) {
        this.poezdOut = poezdOut;
    }

    @Override
    public VagonBaseDTO getVagonInto() {
        return vagonInto;
    }

    @Override
    public void setVagonInto(VagonBaseDTO vagonInto) {
        this.vagonInto = vagonInto;
    }

    @Override
    public PoezdBaseDTO getPoezdInto() {
        return poezdInto;
    }

    @Override
    public void setPoezdInto(PoezdBaseDTO poezdInto) {
        this.poezdInto = poezdInto;
    }

    @Override
    public Date getDotpDate() {
        return this.dotpDate != null ? this.dotpDate : this.dotp;
    }

    @Override
    public void setDotpDate(Date dotpDate) {
        this.dotpDate = dotpDate;
    }

    @Override
    public Date getDotpTime() {
        return this.dotpTime != null ? this.dotpTime : this.dotp;
    }

    @Override
    public void setDotpTime(Date dotpTime) {
        this.dotpTime = dotpTime;
    }

    @Override
    public Date getDotp() {

        if (this.dotpDate != null) {
            this.dotp = this.dotpDate;
            if (this.dotpTime != null) {
                this.dotp = DateTimeUtils.addTimeToDate(this.dotpDate, this.dotpTime);
            }
        }
        return this.dotp;
    }

    @Override
    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    @Override
    public Date getDprbDate() {
        return this.dprbDate != null ? this.dprbDate : this.dprb;
    }

    @Override
    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    @Override
    public Date getDprbTime() {
        return this.dprbTime != null ? this.dprbTime : this.dprb;
    }

    @Override
    public void setDprbTime(Date dprbTime) {
        this.dprbTime = dprbTime;
    }

    @Override
    public Date getDprb() {
        if(this.dprbDate != null){
            this.dprb = this.dprbDate;
            if(this.dprbTime != null){
                this.dprb = DateTimeUtils.addTimeToDate(this.dprbDate, this.dprbTime);
            }
        }
        return this.dprb;
    }

    @Override
    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    @Override
    public KontStatus getStatus() {
        return status;
    }

    @Override
    public void setStatus(KontStatus status) {
        this.status = status;
    }

    @Override
    public KontStatus getPrevStatus() {
        return prevStatus;
    }

    @Override
    public void setPrevStatus(KontStatus status) {
       this.prevStatus = status;
    }

    @Override
    public Long getKy_x() {
        return ky_x;
    }

    @Override
    public void setKy_x(Long ky_x) {
        this.ky_x = ky_x;
    }

    @Override
    public Long getKy_y() {
        return ky_y;
    }

    @Override
    public void setKy_y(Long ky_y) {
        this.ky_y = ky_y;
    }

    @Override
    public Long getKy_z() {
        return ky_z;
    }

    @Override
    public void setKy_z(Long ky_z) {
        this.ky_z = ky_z;
    }

    @Override
    public String getKy_sector() {
        return ky_sector;
    }

    @Override
    public void setKy_sector(String ky_sector) {
        this.ky_sector = ky_sector;
    }

    @Override
    public Date getDatKyInto() {
        return datKyInto;
    }

    @Override
    public void setDatKyInto(Date datKyInto) {
        this.datKyInto = datKyInto;
    }

    @Override
    public YardBaseDTO getYard() {
        return yard;
    }

    @Override
    public void setYard(YardBaseDTO yardDTO) {
        this.yard = yardDTO;
    }

    @Override
    public Date getDyardDate() {
        return this.dyardDate != null ? this.dyardDate : this.dyard;
    }

    @Override
    public void setDyardDate(Date dyardDate) {
        this.dyardDate = dyardDate;
    }

    @Override
    public Date getDyardTime() {
        return this.dyardTime != null ? this.dyardTime : this.dyard;
    }

    @Override
    public void setDyardTime(Date dyardTime) {
        this.dyardTime = dyardTime;
    }

    @Override
    public Date getDyard() {
        if(this.dyardDate != null){
            this.dyard = this.dyardDate;
            if(this.dyardTime != null){
                this.dyard = DateTimeUtils.addTimeToDate(this.dyardDate, this.dyardTime);
            }
        }
        return this.dyard;
    }

    @Override
    public void setDyard(Date dyard) {
        this.dyard = dyard;
    }

}
