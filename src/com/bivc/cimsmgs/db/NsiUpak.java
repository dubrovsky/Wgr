package com.bivc.cimsmgs.db;
// Generated 07.12.2011 10:07:37 by Hibernate Tools 3.4.0.CR1


import java.math.BigDecimal;

/**
 * NsiUpak generated by hbm2java
 */
public class NsiUpak  implements java.io.Serializable {


     private BigDecimal hid;
     private String kypk;
     private String kodOon;
     private String nzypRu;
     private String nzypDe;
     private String nzypPl;
     private String nzypEn;

    public NsiUpak() {
    }

	
    public NsiUpak(BigDecimal hid) {
        this.hid = hid;
    }
    public NsiUpak(BigDecimal hid, String kypk, String kodOon, String nzypRu, String nzypDe, String nzypPl, String nzypEn) {
       this.hid = hid;
       this.kypk = kypk;
       this.kodOon = kodOon;
       this.nzypRu = nzypRu;
       this.nzypDe = nzypDe;
       this.nzypPl = nzypPl;
       this.nzypEn = nzypEn;
    }
   
    public BigDecimal getHid() {
        return this.hid;
    }
    
    public void setHid(BigDecimal hid) {
        this.hid = hid;
    }
    public String getKypk() {
        return this.kypk;
    }
    
    public void setKypk(String kypk) {
        this.kypk = kypk;
    }
    public String getKodOon() {
        return this.kodOon;
    }
    
    public void setKodOon(String kodOon) {
        this.kodOon = kodOon;
    }
    public String getNzypRu() {
        return this.nzypRu;
    }
    
    public void setNzypRu(String nzypRu) {
        this.nzypRu = nzypRu;
    }
    public String getNzypDe() {
        return this.nzypDe;
    }
    
    public void setNzypDe(String nzypDe) {
        this.nzypDe = nzypDe;
    }
    public String getNzypPl() {
        return this.nzypPl;
    }
    
    public void setNzypPl(String nzypPl) {
        this.nzypPl = nzypPl;
    }
    public String getNzypEn() {
        return this.nzypEn;
    }
    
    public void setNzypEn(String nzypEn) {
        this.nzypEn = nzypEn;
    }




}


