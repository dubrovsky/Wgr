package com.bivc.cimsmgs.db;

import java.io.Serializable;
import java.util.*;

public class UsrPwLog implements Serializable {

  private Long hid;
  private String un;
  private String ps;
  private Date datpw;
  private UsrCahgePw usr;

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public UsrCahgePw getUsr() {
    return usr;
  }

  public void setUsr(UsrCahgePw usr) {
    this.usr = usr;
  }

  public UsrPwLog() {
  }

  public UsrPwLog(UsrCahgePw usr) {
    this.hid = null;
    this.un = usr.getUn();
    this.ps = usr.getPs();
    this.datpw = usr.getDatpw();
    this.usr = usr;
  }

  public String getUn() {
    return this.un;
  }

  public void setUn(String un) {
    this.un = un;
  }

  public String getPs() {
    return this.ps;
  }

  public void setPs(String ps) {
    this.ps = ps;
  }

  public Date getDatpw() {
    return this.datpw;
  }

  public void setDatpw(Date datpw) {
    this.datpw = datpw;
  }

}
