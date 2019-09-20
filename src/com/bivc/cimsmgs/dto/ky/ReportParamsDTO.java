package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * @author p.dzeviarylin
 */
public class ReportParamsDTO {
//    private static final Logger log = LoggerFactory.getLogger(ReportParamsDTO.class);

    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date startDate;
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date endDate;
    @JsonFormat(with = JsonFormat.Feature.ACCEPT_SINGLE_VALUE_AS_ARRAY)
    private String[] npprm;
    private String gruzotpr;
    private String tr_arrival = "-";
    private String tr_departure = "-";

    public ReportParamsDTO() {
        GregorianCalendar gc = new GregorianCalendar();
//        log.debug(gc.getTime().toString());
        gc.set(Calendar.HOUR_OF_DAY, 0);
        gc.set(Calendar.MINUTE, 0);
        gc.set(Calendar.SECOND, 0);
        gc.set(Calendar.MILLISECOND, 0);
        endDate = gc.getTime();
//        log.debug(endDate.toString());
        gc.set(Calendar.DATE, 1);
        startDate = gc.getTime();
//        log.debug(startDate.toString());
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

    public String[] getNpprm() {
        if(npprm != null && npprm.length == 1 && (npprm[0] == null || npprm[0].length() == 0)) return null;
        return npprm;
    }

    public void setNpprm(String[] npprm) {
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
