package com.bivc.cimsmgs.db;

import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class CsComnt  implements Serializable {
  
	private static final long serialVersionUID = -7592820919968979556L;
private Long hid;
  private Date datSend;            // Дата отправки сообщения
  private String refId;            // идентификатор оригинального сообщения
  private Date refDate;            // Дата отправки оригинального сообщения
  private String refType;          // Тип оригинального документа
  private Date dattr;              // Дата занесения сообщения в БД
  private String id;               // идентификатор сообщения
  private String text;             // Текст сообщения
  private Set<CsComntDet> comntDet = new HashSet<CsComntDet>();

  public CsComnt() {
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

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }

  public Date getDattr() {
    return dattr;
  }

  public Set<CsComntDet> getComntDet() {
    return comntDet;
  }

  public Date getDatSend() {
    return datSend;
  }

  public Date getRefDate() {
    return refDate;
  }

  public String getRefId() {
    return refId;
  }

  public String getRefType() {
    return refType;
  }

  public String getText() {
    return text;
  }

  public void setDattr(Date dattr) {
    this.dattr = dattr;
  }

  public void setComntDet(Set<CsComntDet> comntDet) {
    this.comntDet = comntDet;
  }

  public void setDatSend(Date datSend) {
    this.datSend = datSend;
  }

  public void setRefDate(Date refDate) {
    this.refDate = refDate;
  }

  public void setRefId(String refId) {
    this.refId = refId;
  }

  public void setRefType(String refType) {
    this.refType = refType;
  }

  public void setText(String text) {
    this.text = text;
  }

  public void addComntDet(CsComntDet det) {
     this.comntDet.add(det);
     det.setMain(this);
  }

  public boolean hasDetail() {
    return comntDet != null && !comntDet.isEmpty();
  }
}
