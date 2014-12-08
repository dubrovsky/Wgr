package com.bivc.cimsmgs.db;

import java.util.Date;

public class TdgLog implements Comparable<TdgLog> {
  private Long hid;
  private Date dattr;
  private Long hid_cs;
  private String dir;
  private String pid;
  private Integer status;
  private String status_txt;
  private String result_txt;

  public TdgLog() {
  }

  public TdgLog(Long hid) {
    this.hid = hid;
  }

  public Date getDattr() {
    return dattr;
  }

  public void setDattr(Date dattr) {
      this.dattr = dattr;
  }

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public Long getHid_cs() {
    return hid_cs;
  }

  public void setHid_cs(Long hid_pack) {
    this.hid_cs = hid_pack;
  }

  public String getDir() {
    return dir;
  }

  public void setDir(String dir) {
    this.dir = dir;
  }

  public String getPid() {
    return pid;
  }

  public void setPid(String pid) {
    this.pid = pid;
  }

  public String getStatus_txt() {
    return status_txt;
  }

  public void setStatus_txt(String status_txt) {
    this.status_txt = status_txt;
  }

  public String getResult_txt() {
    return result_txt;
  }

  public void setResult_txt(String result_txt) {
    this.result_txt = result_txt;
  }

  @Override
  public int compareTo(TdgLog o) {
    final int BEFORE = -1;
    final int EQUAL = 0;
    final int AFTER = 1;

    if (this == o) return EQUAL;
    if (this.getHid() == null) return AFTER;
    if (o.getHid() == null) return BEFORE;
    if (this.getHid() < o.getHid()) return AFTER;
    if (this.getHid() > o.getHid()) return BEFORE;
    return EQUAL;
  }

  @Override
  public String toString() {
    return hid != null ? String.valueOf(hid) : "null";
  }
}
