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
    private String h;
    private String notes;
    private boolean empty;
    private String trans;
    private Long messCount;
    private Long newMessCount;
    private TreeSet<KontViewDTO> konts = new TreeSet<>();
    private Long packId;
    private Long routeId;

    public void setPackId(Long packId) {
        this.packId = packId;
    }

    public Long getRouteId() {
        return routeId;
    }

    public void setRouteId(Long routeId) {
        this.routeId = routeId;
    }

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

    public TreeSet<KontViewDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontViewDTO> konts) {
        this.konts = konts;
    }

    public String getH() {
        return h;
    }

    public void setH(String h) {
        this.h = h;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Long getPackId() {
        return -1000L; // for messenger
    }

    public Long getMessCount() {
        return messCount;
    }

    public void setMessCount(Long messCount) {
        this.messCount = messCount;
    }

    public Long getNewMessCount() {
        return newMessCount;
    }

    public void setNewMessCount(Long newMessCount) {
        this.newMessCount = newMessCount;
    }
}
