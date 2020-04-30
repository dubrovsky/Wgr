package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;
import java.util.List;

/**
 * @author lan
 */
public class YardChangeClientDTO {
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private List<Long> hid;
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date changeDate;
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date changeTime;
    private Date change;
    private Long clientHid;
    private String gruzotpr;

    public Date getChange() {
        if(this.changeDate != null){
            this.change = this.changeDate;
            if(this.changeTime != null){
                this.change = DateTimeUtils.addTimeToDate(this.changeDate, this.changeTime);
            }
        }
        return change;
    }


    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public List<Long> getHid() {
        return hid;
    }

    public void setHid(List<Long> hid) {
        this.hid = hid;
    }

    public Date getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(Date changeDate) {
        this.changeDate = changeDate;
    }

    public Date getChangeTime() {
        return changeTime;
    }

    public void setChangeTime(Date changeTime) {
        this.changeTime = changeTime;
    }

    public Long getClientHid() {
        return clientHid;
    }

    public void setClientHid(Long clientHid) {
        this.clientHid = clientHid;
    }
}
