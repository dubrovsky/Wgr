package com.bivc.cimsmgs.db;

import java.io.Serializable;

public class CsComntDet  implements Serializable {
  private Long hid;
  private CsComnt main;
  private String seg;            // Код типа ошибки
  private String text;            // Код класса ошибки

  public CsComntDet() {
  }

  public Long getHid() {
    return hid;
  }

  public CsComnt getMain() {
    return main;
  }

  public String getSeg() {
    return seg;
  }

  public String getText() {
    return text;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public void setMain(CsComnt main) {
    this.main = main;
  }

  public void setSeg(String seg) {
    this.seg = seg;
  }

  public void setText(String text) {
    this.text = text;
  }

}
