package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * @author p.dzeviarylin
 */
public class ReportParamsDTO {

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date startDate;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date endDate;

    private String npprm;
    private String gruzotpr;
    private String tr_arrival = "-";
    private String tr_departure = "-";

    public ReportParamsDTO() {
        GregorianCalendar gc = new GregorianCalendar();
        gc.set(Calendar.HOUR_OF_DAY, 0);
        gc.set(Calendar.MINUTE, 0);
        gc.set(Calendar.SECOND, 0);
        gc.set(Calendar.MILLISECOND, 0);
        endDate = gc.getTime();
        gc.set(Calendar.DATE, 1);
        startDate = gc.getTime();
    }

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

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getTr_arrival() {
        return tr_arrival;
    }

    public void setTr_arrival(String tr_arrival) {
        this.tr_arrival = tr_arrival;
    }

    public String getTr_departure() {
        return tr_departure;
    }

    public void setTr_departure(String tr_departure) {
        this.tr_departure = tr_departure;
    }
}
