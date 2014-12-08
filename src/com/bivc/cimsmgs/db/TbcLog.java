package com.bivc.cimsmgs.db;

import java.util.Date;

public class TbcLog {
  private Long hid;
  private Long hid_src;
  private Byte in_out;
  private String xml;
  private Integer status;
  private Integer type;
  private String text;
  private String tbc_nomer;
  private Byte tbc_status;
    private Date dattr;

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

  public Long getHid_src() {
    return hid_src;
  }

  public void setHid_src(Long hid_src) {
    this.hid_src = hid_src;
  }

  public Byte getIn_out() {
    return in_out;
  }

  public void setIn_out(Byte in_out) {
    this.in_out = in_out;
  }

  public String getXml() {
    return xml;
  }

  public void setXml(String xml) {
    this.xml = xml;
  }

  public Integer getStatus() {
    return status;
  }

  public void setStatus(Integer status) {
    this.status = status;
  }

  public Integer getType() {
    return type;
  }

  public void setType(Integer type) {
    this.type = type;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getTbc_nomer() {
    return tbc_nomer;
  }

  public void setTbc_nomer(String tbc_nomer) {
    this.tbc_nomer = tbc_nomer;
  }

  public Byte getTbc_status() {
    return tbc_status;
  }

  public void setTbc_status(Byte tbc_status) {
    this.tbc_status = tbc_status;
  }
}
