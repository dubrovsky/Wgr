package com.bivc.cimsmgs.db;

import com.bivc.cimsmgs.exchange.Utils;
import org.apache.log4j.Logger;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

public class VagPerVed  implements Serializable {

  static private Logger log = Logger.getLogger(VagPerVed.class);

  private Long hid;
  private Date dattr;
  private String por_vag;
  private String nvag;
  private BigDecimal tara_vag;
  private BigDecimal kol_osi;
  private String nsto_f;
  private String nsto;
  private String dotp;
  private String ksto;
  private String smgs;
  private Date date_pr;
  private String prin;
  private String nkon;
  private BigDecimal mnet;
  private BigDecimal mbrt;
  private String tip_razm;
  private String kstn;
  private String kgvn;
  private String nzgr;
  private String kolm;
  private String znak;
  private String kpl;
  private String tara;
  private String notd;
  private String npol;
  private String adres_o;
  private String adres_p;
  private BigDecimal ved_nomer;
  private BigDecimal n_poezd;
  private String n_packet;
  private Date recvdt;
  private Date dto;
  private Date dtn;
  private String ownern;
  private BigDecimal grpod;

  public VagPerVed() {
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

  public void setDattr(Date dattr) {
    this.dattr = dattr;
  }

  public String getZnak() {
    return znak;
  }

  public String getTip_razm() {
    return tip_razm;
  }

  public BigDecimal getTara_vag() {
    return tara_vag;
  }

  public String getTara() {
    return tara;
  }

  public String getSmgs() {
    return smgs;
  }

  public String getPrin() {
    return prin;
  }

  public String getPor_vag() {
    return por_vag;
  }

  public String getNzgr() {
    return nzgr;
  }

  public String getNvag() {
    return nvag;
  }

  public String getNsto_f() {
    return nsto_f;
  }

  public String getNsto() {
    return nsto;
  }

  public String getNpol() {
    return npol;
  }

  public String getNotd() {
    return notd;
  }

  public String getNkon() {
    return nkon;
  }

  public BigDecimal getMbrt() {
    return mbrt;
  }

  public String getKsto() {
    return ksto;
  }

  public String getKstn() {
    return kstn;
  }

  public String getKpl() {
    return kpl;
  }

  public String getKolm() {
    return kolm;
  }

  public BigDecimal getKol_osi() {
    return kol_osi;
  }

  public String getKgvn() {
    return kgvn;
  }

  public String getDotp() {
    return dotp;
  }

  public void setDate_pr(Date date_pr) {
    this.date_pr = date_pr;
  }

  public void setDate_pr(String date_pr) {
    this.date_pr = Utils.makeDate(date_pr);
  }

  public void setZnak(String znak) {
    this.znak = znak;
  }

  public void setTip_razm(String tip_razm) {
    this.tip_razm = tip_razm;
  }

  public void setTara_vag(BigDecimal tara_vag) {
    this.tara_vag = tara_vag;
  }

  public void setTara_vag(String tara_vag) {
    this.tara_vag = Utils.makeBigDecimal(tara_vag);
  }

  public void setTara(String tara) {
    this.tara = tara;
  }

  public void setSmgs(String smgs) {
    this.smgs = smgs;
  }

  public void setPrin(String prin) {
    this.prin = prin;
  }

  public void setPor_vag(String por_vag) {
    this.por_vag = por_vag;
  }

  public void setNzgr(String nzgr) {
    this.nzgr = nzgr;
  }

  public void setNvag(String nvag) {
    this.nvag = nvag;
  }

  public void setNsto_f(String nsto_f) {
    this.nsto_f = nsto_f;
  }

  public void setNsto(String nsto) {
    this.nsto = nsto;
  }

  public void setNpol(String npol) {
    this.npol = npol;
  }

  public void setNotd(String notd) {
    this.notd = notd;
  }

  public void setNkon(String nkon) {
    this.nkon = nkon;
  }

  public void setMbrt(BigDecimal mbrt) {
    this.mbrt = mbrt;
  }

  public void setMbrt(String mbrt) {
    this.mbrt = Utils.makeBigDecimal(mbrt);
  }

  public void setKsto(String ksto) {
    this.ksto = ksto;
  }

  public void setKstn(String kstn) {
    this.kstn = kstn;
  }

  public void setKpl(String kpl) {
    this.kpl = kpl;
  }

  public void setKolm(String kolm) {
    this.kolm = kolm;
  }

  public void setKol_osi(BigDecimal kol_osi) {
    this.kol_osi = kol_osi;
  }

  public void setKol_osi(String kol_osi) {
    this.kol_osi = Utils.makeBigDecimal(kol_osi);
  }

  public void setKgvn(String kgvn) {
    this.kgvn = kgvn;
  }

  public void setDotp(String dotp) {
    this.dotp = dotp;
  }

  public void setVed_nomer(BigDecimal ved_nomer) {
    this.ved_nomer = ved_nomer;
  }

  public void setVed_nomer(String ved_nomer) {
    this.ved_nomer = Utils.makeBigDecimal(ved_nomer);
  }

  public void setN_packet(String n_packet) {
    this.n_packet = n_packet;
  }

  public Date getDate_pr() {
    return date_pr;
  }

  public BigDecimal getVed_nomer() {
    return ved_nomer;
  }

  public String getN_packet() {
    return n_packet;
  }

  public Date getRecvdt() {
    return recvdt;
  }

  public void setRecvdt(Date recvdt) {
    this.recvdt = recvdt;
  }

  public Date getDto() {
    return dto;
  }

  public void setDto(Date dto) {
    this.dto = dto;
  }

  public Date getDtn() {
    return dtn;
  }

  public void setDtn(Date dtn) {
    this.dtn = dtn;
  }

  public BigDecimal getN_poezd() {
    return n_poezd;
  }

  public void setN_poezd(BigDecimal n_poezd) {
    this.n_poezd = n_poezd;
  }

  public void setN_poezd(String n_poezd) {
    this.n_poezd = Utils.makeBigDecimal(n_poezd);
  }

  public BigDecimal getMnet() {
    return mnet;
  }

  public void setMnet(String mnet) {
    this.mnet = Utils.makeBigDecimal(mnet);
  }

  public void setMnet(BigDecimal mnet) {
    this.mnet = mnet;
  }

  public String getAdres_o() {
    return adres_o;
  }

  public void setAdres_o(String adres_o) {
    this.adres_o = adres_o;
  }

  public String getAdres_p() {
    return adres_p;
  }

  public void setAdres_p(String adres_p) {
    this.adres_p = adres_p;
  }

  public String getOwnern() {
    return ownern;
  }

  public void setOwnern(String ownern) {
    this.ownern = ownern;
  }

  public BigDecimal getGrpod() {
    return grpod;
  }

  public void setGrpod(BigDecimal grpod) {
    this.grpod = grpod;
  }

  public void setGrpod(String grpod) {
    this.grpod = Utils.makeBigDecimal(grpod);
  }

}
