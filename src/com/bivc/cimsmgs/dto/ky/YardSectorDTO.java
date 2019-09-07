package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky2.YardSectorGroupsDTO;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by peter on 27.08.2014.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardSectorDTO {
    private Integer hid;
    private String name;
    private String descr;
    private String groups;
    private Set<YardSectorGroupsDTO> yardSectorGroups;

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

    public String getGroups() {
        if(yardSectorGroups != null) {
            return yardSectorGroups.stream().map(yardSectorGroupsDTO -> yardSectorGroupsDTO.getGroup().getName()).collect(Collectors.joining(", "));
        }
        return "";
    }

    public void setGroups(String groups) {
        this.groups = groups;
    }

    public Set<YardSectorGroupsDTO> getYardSectorGroups() {
        return yardSectorGroups;
    }

    public void setYardSectorGroups(Set<YardSectorGroupsDTO> yardSectorGroups) {
        this.yardSectorGroups = yardSectorGroups;
    }
}
