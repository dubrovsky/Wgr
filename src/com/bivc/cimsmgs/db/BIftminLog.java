package com.bivc.cimsmgs.db;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class BIftminLog implements Serializable {

  private String hid;
  private String out_text;
  private String in_text;
  private String mes_name;
  private String src;
  private Long hid_src;
  private CimSmgs cimSmgs;
  private Date dattr;
  private Set<Contrl> BContrls = new HashSet<Contrl>(0);
  private Set<AperakDet> BAperakDets = new HashSet<AperakDet>(0);
  private String dir;

  public BIftminLog()   {
  }

  public BIftminLog(String out_text)   {
    this.out_text=out_text;
  }

  public String getIn_text() {
    return in_text;
  }

  public String getMes_name() {
    return mes_name;
  }

  public String getOut_text() {
    return out_text;
  }

  public String getSrc() {
    return src;
  }

  public String getHid() {
    return hid;
  }

  public Long getHid_src() {
    return hid_src;
  }

  public void setIn_text(String in_text) {
    this.in_text = in_text;
  }

  public void setMes_name(String mes_name) {
    this.mes_name = mes_name;
  }

  public void setOut_text(String out_text) {
    this.out_text = out_text;
  }

  public void setSrc(String src) {
    this.src = src;
  }

  public void setHid(String hid) {
    this.hid = hid;
  }

  public CimSmgs getCimSmgs()
  {
    return this.cimSmgs;
  }

  public Date getDattr()
  {
    return dattr;
  }

  public void setCimSmgs(CimSmgs cimSmgs)
  {
    this.cimSmgs = cimSmgs;
  }

  public Set<Contrl> getBContrls()
  {
    return this.BContrls;
  }

  public void setBContrls(Set<Contrl> BContrls)
  {
    this.BContrls = BContrls;
  }

  public Set<AperakDet> getBAperakDets()
  {
    return this.BAperakDets;
  }

  public void setBAperakDets(Set<AperakDet> BAperakDets)
  {
    this.BAperakDets = BAperakDets;
  }



  public void setHid_src(Long hid_src) {
    this.hid_src = hid_src;
  }

  public void setDattr(Date dattr)
  {
    this.dattr = dattr;
  }

  public String getDir() {
    return dir;
  }

  public void setDir(String dir) {
    this.dir = dir;
  }
}
