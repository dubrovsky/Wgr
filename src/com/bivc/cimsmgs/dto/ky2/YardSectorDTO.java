package com.bivc.cimsmgs.dto.ky2;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by peter on 27.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardSectorDTO {
    private Integer hid;
    private String name;
    private String descr;

    public Integer getHid() {
        return hid;
    }

    public void setHid(Integer hid) {
        this.hid = hid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }
}
