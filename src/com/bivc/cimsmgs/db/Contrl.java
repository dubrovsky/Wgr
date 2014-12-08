package com.bivc.cimsmgs.db;

import org.apache.commons.lang.builder.ToStringBuilder;

import java.io.Serializable;
import java.util.Date;

public class Contrl  implements Serializable {
  private String id;                  // идентификатор сообщения
  private String text = "";           // текст сообщения CONTRL
  private String otpOri;              // отправитель оригинального сообщения, на которое формируется CONTRL
  private String polOri;              // получатель оригинального сообщения, на которое формируется CONTRL
  private String idUnbOri;
  //private String idUnhOri;            // ID оригинального сообщения из сегмента UNH, на которое формируется CONTRL
  private boolean hasError = false;   // признак ошибки в оригинальном сообщении
  private Long hid;
  private String msg;                 // тип разбираемого сообщения
  private Date dattr;                 // Дата занесения сообщения в БД
  private Date datUnb;                // Дата отправки сообщения
  private String idUnb;               // идентификатор сообщения из UNB
  private BIftminLog BIftminLog;  // ID оригинального сообщения из сегмента UNB, на которое формируется CONTRL

  public Contrl() {
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String toString() {
    return new ToStringBuilder(this).append(getId()).toString();
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public String getOtpOri() {
    return otpOri;
  }

  public void setOtpOri(String otpOri) {
    this.otpOri = otpOri;
  }

  public String getPolOri() {
    return polOri;
  }

  public void setPolOri(String polOri) {
    this.polOri = polOri;
  }

  public String getIdUnbOri() {
    return idUnbOri;
  }

  public void setIdUnbOri(String idUnbOri) {
    this.idUnbOri = idUnbOri;
  }

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public String getMsg() {
    return msg;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public String getError() {
    return hasError ? "2" : "1" ;
  }

  public void setError(String error) {
    hasError = ! "1".equals(error);
  }

  public Date getDattr() {
    return dattr;
  }

  public void setDattr(Date dattr) {
    this.dattr = dattr;
  }

  public java.util.Date getDatUnb() {
    return datUnb;
  }

  public String getIdUnb() {
    return idUnb;
  }

  public BIftminLog getBIftminLog()
  {
    return BIftminLog;
  }

  public void setDatUnb(java.util.Date datUnb) {
    this.datUnb = datUnb;
  }

  public void setIdUnb(String idUnb) {
    this.idUnb = idUnb;
  }

  public void setBIftminLog(BIftminLog BIftminLog)
  {
    this.BIftminLog = BIftminLog;
  }
  /*
  public String getIdUnhOri() {
    return idUnhOri;
  }

  public void setIdUnhOri(String idUnhOri) {
    this.idUnhOri = idUnhOri;
  }
*/
}
