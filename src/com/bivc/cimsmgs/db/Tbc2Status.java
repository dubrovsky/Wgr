package com.bivc.cimsmgs.db;

import java.util.Date;

public class Tbc2Status {
    private Long hid;
    private Long hid_pack;
    private Date dattr;
    private Date changeDate;
    private String description;
    private String author;
    private String status;
    private String signComment;

    public Tbc2Status() {
    }

    public Tbc2Status(Long hid_pack, Date dattr, Date changeDate, String description, String author, String status, String signComment) {
        this.hid_pack = hid_pack;
//        this.dattr = dattr;
        this.changeDate = changeDate;
        this.description = description;
        this.author = author;
        this.status = status;
        this.signComment = signComment;
    }

    public String getSignComment() {
        return signComment;
    }

    public void setSignComment(String signComment) {
        this.signComment = signComment;
    }

    public Long getHid_pack() {
        return hid_pack;
    }

    public void setHid_pack(Long hid_pack) {
        this.hid_pack = hid_pack;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public Date getChangeDate() {
        return changeDate;
    }

    public void setChangeDate(Date changeDate) {
        this.changeDate = changeDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
