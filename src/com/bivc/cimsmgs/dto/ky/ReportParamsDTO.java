package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class ReportParamsDTO {

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date startDate;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date endDate;

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
