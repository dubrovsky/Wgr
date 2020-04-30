package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.TimeSerializer;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.math.BigDecimal;
import java.util.Date;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontSearchDTO implements Comparable<KontSearchDTO>{

    private Long hid;
    private BigDecimal massa_tar;
    private BigDecimal pod_sila;
    private String type;
    private String vid;
    private YardDTO yard;
    private ClientDTO client;

    @Override
    public int compareTo(KontSearchDTO that) {
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

    public BigDecimal getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(BigDecimal massa_tar) {
        this.massa_tar = massa_tar;
    }

    public BigDecimal getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(BigDecimal pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public YardDTO getYard() {
        return yard;
    }

    public void setYard(YardDTO yard) {
        this.yard = yard;
    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
