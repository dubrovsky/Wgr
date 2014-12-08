package com.bivc.cimsmgs.db.nsi;

import java.util.Date;

/**
 * Created by IntelliJ IDEA.
 * User: vva
 * Date: 31.05.12
 * Time: 16:54
 * To change this template use File | Settings | File Templates.
 */
public class NsiNhm {
  private Long hid;
  private String kgvn;
  private String nzgr;
  private String nzgr_f;
  private String kgvn_de;
  private String nzgr_de_f;
  private String nzgr_de;
  private String etsng;
  private String karantin;
  private String otxod;
  private String ozon_raz;
  private String veterin;
  private String customs;
  private String nzgr_pl;
  private Date dattr;
  private Date locked;
  private String un_lock;
  private String trans;
  private String un;
  private Date deleted;
  private Date altered;

  public Date getAltered() {
    return altered;
  }

  public void setAltered(Date altered) {
    this.altered = altered;
  }

  public Date getDeleted() {
    return deleted;
  }

  public void setDeleted(Date deleted) {
    this.deleted = deleted;
  }

  public String getUn() {
    return un;
  }

  public void setUn(String un) {
    this.un = un;
  }

  public String getTrans() {
    return trans;
  }

  public void setTrans(String trans) {
    this.trans = trans;
  }

  public String getUn_lock() {
    return un_lock;
  }

  public void setUn_lock(String un_lock) {
    this.un_lock = un_lock;
  }

  public Date getLocked() {
    return locked;
  }

  public void setLocked(Date locked) {
    this.locked = locked;
  }

  public Date getDattr() {
    return dattr;
  }

  public void setDattr(Date dattr) {
    this.dattr = dattr;
  }

  public String getNzgr_pl() {
    return nzgr_pl;
  }

  public void setNzgr_pl(String nzgr_pl) {
    this.nzgr_pl = nzgr_pl;
  }

  public String getCustoms() {
    return customs;
  }

  public void setCustoms(String customs) {
    this.customs = customs;
  }

  public String getVeterin() {
    return veterin;
  }

  public void setVeterin(String veterin) {
    this.veterin = veterin;
  }

  public String getOzon_raz() {
    return ozon_raz;
  }

  public void setOzon_raz(String ozon_raz) {
    this.ozon_raz = ozon_raz;
  }

  public String getOtxod() {
    return otxod;
  }

  public void setOtxod(String otxod) {
    this.otxod = otxod;
  }

  public String getKarantin() {
    return karantin;
  }

  public void setKarantin(String karantin) {
    this.karantin = karantin;
  }

  public String getEtsng() {
    return etsng;
  }

  public void setEtsng(String etsng) {
    this.etsng = etsng;
  }

  public String getNzgr_de() {
    return nzgr_de;
  }

  public void setNzgr_de(String nzgr_de) {
    this.nzgr_de = nzgr_de;
  }

  public String getNzgr_de_f() {
    return nzgr_de_f;
  }

  public void setNzgr_de_f(String nzgr_de_f) {
    this.nzgr_de_f = nzgr_de_f;
  }

  public String getKgvn_de() {
    return kgvn_de;
  }

  public void setKgvn_de(String kgvn_de) {
    this.kgvn_de = kgvn_de;
  }

  public String getNzgr_f() {
    return nzgr_f;
  }

  public void setNzgr_f(String nzgr_f) {
    this.nzgr_f = nzgr_f;
  }

  public String getNzgr() {
    return nzgr;
  }

  public void setNzgr(String nzgr) {
    this.nzgr = nzgr;
  }

  public String getKgvn() {
    return kgvn;
  }

  public void setKgvn(String kgvn) {
    this.kgvn = kgvn;
  }

  public Long getHid() {
    return hid;
  }

  public void setHid(Long hid) {
    this.hid = hid;
  }
}
