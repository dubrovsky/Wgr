package com.bivc.cimsmgs.db;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.Map;
import java.util.TreeMap;

public class PackList implements java.io.Serializable
{
  private Long hid;
  private Long hid_cs;
  private Long hid_kon;
  private String notd;
  private String adres_o;
  private String npol;
  private String adres_p;
  private String kod_pol;
  private String nomer_pl;
  private String un;
  private String un_lock;
  private Date dat_pl;
  private String trans;
  private Date dattr;
  private Date locked;
  private Date altered;
  private Map<Byte, PackListGruz> PackListGruz = new TreeMap<Byte, PackListGruz>();

    final static private Logger log = LoggerFactory.getLogger(PackList.class);

  public Long getHid()
  {
    return hid;
  }

  public Long getHid_cs()
  {
    return hid_cs;
  }

  public Long getHid_kon()
  {
    return hid_kon;
  }

  public String getNotd()
  {
    return notd;
  }

  public String getAdres_o()
  {
    return adres_o;
  }

  public String getNpol()
  {
    return npol;
  }

  public String getAdres_p()
  {
    return adres_p;
  }

  public String getKod_pol()
  {
    return kod_pol;
  }

  public String getNomer_pl()
  {
    return nomer_pl;
  }

  public String getUn()
  {
    return un;
  }

  public String getUn_lock()
  {
    return un_lock;
  }

  public Date getDat_pl()
  {
    return dat_pl;
  }

  public String getTrans()
  {
    return trans;
  }

  public Date getDattr()
  {
    return dattr;
  }

  public Date getLocked()
  {
    return locked;
  }

  public Date getAltered()
  {
    return altered;
  }

  public Map<Byte, PackListGruz> getPackListGruz()
  {
    return PackListGruz;
  }

  public void setHid(Long hid)
  {
    this.hid = hid;
  }

  public void setHid_cs(Long hid_cs)
  {
    this.hid_cs = hid_cs;
  }

  public void setHid_kon(Long hid_kon)
  {
    this.hid_kon = hid_kon;
  }

  public void setNotd(String notd)
  {
    this.notd = notd;
  }

  public void setAdres_o(String adres_o)
  {
    this.adres_o = adres_o;
  }

  public void setNpol(String npol)
  {
    this.npol = npol;
  }

  public void setAdres_p(String adres_p)
  {
    this.adres_p = adres_p;
  }

  public void setKod_pol(String kod_pol)
  {
    this.kod_pol = kod_pol;
  }

  public void setNomer_pl(String nomer_pl)
  {
    this.nomer_pl = nomer_pl;
  }

  public void setUn(String un)
  {
    this.un = un;
  }

  public void setUn_lock(String un_lock)
  {
    this.un_lock = un_lock;
  }

  public void setDat_pl(Date dat_pl)
  {
    this.dat_pl = dat_pl;
  }

  public void setTrans(String trans)
  {
    this.trans = trans;
  }

  public void setDattr(Date dattr)
  {
    this.dattr = dattr;
  }

  public void setLocked(Date locked)
  {
    this.locked = locked;
  }

  public void setAltered(Date altered)
  {
    this.altered = altered;
  }

  public void setPackListGruz(Map<Byte, PackListGruz> packListGruz)
  {
    this.PackListGruz = packListGruz;
  }

  public void addPackListGruz()
{
  for(PackListGruz elem : PackListGruz.values()) {
    elem.setPackList(this);
  }
}
public String toString()
{
  return new ToStringBuilder(this)
             .append("hid", getHid())
             .append("invoicegruz", getPackListGruz())
             .toString();
}

public void correct4js()
{
//  for(PackListGruz elem : PackListGruz.values()) {
////    String nz = elem.getNzgr();
////    if (nz != null) {
////      log.debug(nz);
////      log.debug(nz.replaceAll("'", "\\\\'"));
////      elem.setNzgr(nz.replaceAll("'", "\\\\'"));
////      elem.setNzgr(elem.getNzgr().replaceAll("&quot;", "\""));
////      log.debug(elem.getNzgr());
//
////    }
//  }
}

}
