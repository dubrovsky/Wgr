package com.bivc.cimsmgs.dto.ky.kont;

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
 * @author p.dzevia rylin
 */
public class KontBaseOutDTO extends KontBaseDTO implements IKontBaseOutDTO {

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dotpDate;

    @JsonSerialize(using = TimeSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    @JsonInclude(JsonInclude.Include.ALWAYS)
    private Date dotpTime;

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
}
