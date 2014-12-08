package com.bivc.cimsmgs.db;

import java.io.Serializable;

public class AperakDet  implements Serializable {
  private Long hid;
  private Aperak main;
  private String kod1;            // Код типа ошибки
  private String kod2;            // Код класса ошибки
  private String errText;         // Описание ошибки
  private String idUnhOri;
  private String errText2;        // Дополнительное описание ошибки
  private BIftminLog BIftminLog;// Идентификатор из UNH оригинального сообщения

  public AperakDet() {
  }

  public AperakDet(String errText2, String errText) {
    this.errText2 = errText2;
    this.errText = errText;
  }

  public Long getHid() {
    return hid;
  }

  public String getErrText() {
    return errText;
  }

  public String getErrText2() {
    return errText2;
  }

  public String getKod1() {
    return kod1;
  }

  public String getKod2() {
    return kod2;
  }

  public Aperak getMain() {
    return main;
  }

  public BIftminLog getBIftminLog()
  {
    return BIftminLog;
  }

    public String getIdUnhOri() {
    return idUnhOri;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public void setErrText(String errText) {
    this.errText = errText;
  }

  public void setErrText2(String errText2) {
    this.errText2 = errText2;
  }

  public void setKod1(String kod1) {
    this.kod1 = kod1;
  }

  public void setKod2(String kod2) {
    this.kod2 = kod2;
  }

  public void setMain(Aperak main) {
    this.main = main;
  }

  public void setBIftminLog(BIftminLog BIftminLog)
  {
    this.BIftminLog = BIftminLog;
  }

    public void setIdUnhOri(String idUnhOri) {
    this.idUnhOri = idUnhOri;
  }

}
