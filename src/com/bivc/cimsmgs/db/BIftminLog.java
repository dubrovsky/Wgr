package com.bivc.cimsmgs.db;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class BIftminLog implements Serializable {

  private Long hid;
  private String text;
  private String mes_name;
  private String src;
  private Long hid_src;
  private CimSmgs cimSmgs;
  private Date dattr;
  private Set<Contrl> BContrls = new HashSet<Contrl>(0);
  private Set<Aperak> BAperak = new HashSet<Aperak>(0);
  private String cod_dir;
  private String dir;
  private String id;

  public BIftminLog()   {
  }

  public BIftminLog(String out_text)   {
    this.text =out_text;
  }

  public String getMes_name() {
    return mes_name;
  }

  public String getText() {
    return text;
  }

  public String getSrc() {
    return src;
  }

  public Long getHid() {
    return hid;
  }

  public Long getHid_src() {
    return hid_src;
  }

  public void setMes_name(String mes_name) {
    this.mes_name = mes_name;
  }

  public void setText(String out_text) {
    this.text = out_text;
  }

  public void setSrc(String src) {
    this.src = src;
  }

  public void setHid(Long hid) {
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

  public Set<Aperak> getBAperak()
  {
    return this.BAperak;
  }

  public void setBAperak(Set<Aperak> BAperakDets)
  {
    this.BAperak = BAperakDets;
  }

  public void setHid_src(Long hid_src) {
    this.hid_src = hid_src;
  }

  public void setDattr(Date dattr)
  {
    this.dattr = dattr;
  }

  public String getCod_dir() {
    return cod_dir;
  }

  public void setCod_dir(String dir) {
    this.cod_dir = dir;
  }

  public String getDir() {
    return dir;
  }

  public void setDir(String dir) {
    this.dir = dir;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public Set<AperakDet> getBAperakDetSet() {
    if (BAperak.size() > 0) {
      Set<AperakDet> detSet = BAperak.iterator().next().getAperakDet();
      if (detSet.size() > 0) {
        return detSet;
      }
      else {
        return new HashSet<>(0);
      }
    }
    else {
      return new HashSet<>(0);
    }
  }
}
