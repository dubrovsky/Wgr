package com.bivc.cimsmgs.db;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Tbc2Pack {
    private Long hid;
    private String packId;
    private Date dattr;
    private Date chdate;
    private Set<Tbc2Status> tbc2Status = new HashSet<>();

    public Set<Tbc2Status> getTbc2Status() {
        return tbc2Status;
    }

    public void setTbc2Status(Set<Tbc2Status> tbc2Status) {
        this.tbc2Status = tbc2Status;
    }

    public Tbc2Pack() {
    }

    public Tbc2Pack(String packId, Date dattr) {
        this.packId = packId;
//        this.dattr = dattr;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getPackId() {
        return packId;
    }

    public void setPackId(String packId) {
        this.packId = packId;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }
}
