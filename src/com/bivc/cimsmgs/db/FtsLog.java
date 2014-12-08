package com.bivc.cimsmgs.db;

import java.util.Date;

public class FtsLog {
  private Long hid;
  private Date doc_date;
  private Long hid_src;
  private Byte in_out;
  private String xml;
  private String res_code;
  private String res_descr;
  private String reg_id;
  private String reg_status;
  private String message_type;
  private String doc_id;
  private String ref_doc_id;
  private Byte ecp_res;

  public FtsLog() {
  }

  public String getDoc_id() {
    return doc_id;
  }

  public void setDoc_id(String doc_id) {
    this.doc_id = doc_id;
  }

  public String getRef_doc_id() {
    return ref_doc_id;
  }

  public void setRef_doc_id(String ref_doc_id) {
    this.ref_doc_id = ref_doc_id;
  }

  public String getMessage_type() {
    return message_type;
  }

  public void setMessage_type(String message_type) {
    this.message_type = message_type;
  }

  public String getRes_code() {
    return res_code;
  }

  public void setRes_code(String res_code) {
    this.res_code = res_code;
  }

  public String getRes_descr() {
    return res_descr;
  }

  public void setRes_descr(String res_descr) {
    this.res_descr = res_descr;
  }

  public String getReg_id() {
    return reg_id;
  }

  public void setReg_id(String reg_id) {
    this.reg_id = reg_id;
  }

  public String getReg_status() {
    return reg_status;
  }

  public void setReg_status(String reg_status) {
    this.reg_status = reg_status;
  }

  public Date getDoc_date() {
    return doc_date;
  }

  public void setDoc_date(Date doc_date) {
    this.doc_date = doc_date;
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

  public Byte getEcp_res() {
    return ecp_res;
  }

  public void setEcp_res(Byte ecp_res) {
    this.ecp_res = ecp_res;
  }
}
