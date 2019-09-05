package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class YardSectorBindViewDTO {

    private Integer hid;
    private String name;
    private TreeSet<YardBindViewDTO> yards = new TreeSet<>();

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

    public TreeSet<YardBindViewDTO> getYards() {
        return yards;
    }

    public void setYards(TreeSet<YardBindViewDTO> yards) {
        this.yards = yards;
    }
}
