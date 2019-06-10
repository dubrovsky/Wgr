package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.dto.ky.YardBaseDTO;
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
public class KontInYardDTO  extends KontBaseDTO implements IKontInYardDTO {
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dyard;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dyardDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dyardTime;

    private YardBaseDTO yard;

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

    @Override
    public YardBaseDTO getYard() {
        return yard;
    }

    @Override
    public void setYard(YardBaseDTO yard) {
       this.yard = yard;
    }
}
