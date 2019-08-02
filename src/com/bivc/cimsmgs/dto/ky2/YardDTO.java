package com.bivc.cimsmgs.dto.ky2;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardDTO {
    private Long hid;
    private YardSectorDTO sector;
    private Long x;
    private Long y;
    private Long z;
    private String notes;
    private boolean empty;
    private TreeSet<KontDTO> konts = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public YardSectorDTO getSector() {
        return sector;
    }

    public void setSector(YardSectorDTO sector) {
        this.sector = sector;
    }

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public Long getZ() {
        return z;
    }

    public void setZ(Long z) {
        this.z = z;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public boolean isEmpty() {
        return empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }

    public TreeSet<KontDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontDTO> konts) {
        this.konts = konts;
    }
}
