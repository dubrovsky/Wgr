package com.bivc.cimsmgs.db;

import java.math.BigDecimal;
import java.util.Date;

public class PackListGruz implements java.io.Serializable
{
  private Long hid;
  private Long hid_cspl;
  private String pak_nomer;
  private String pak_type;
  private String dim;
  private BigDecimal mbrt;
  private BigDecimal mnet;
  private Date dattr;
  private Date altered;
  private PackList packList;
  public Long getHid()
  {
    return hid;
  }

  public Long getHid_cspl()
  {
    return hid_cspl;
  }

  public String getPak_nomer()
  {
    return pak_nomer;
  }

  public String getPak_type()
  {
    return pak_type;
  }

  public String getDim()
  {
    return dim;
  }

  public BigDecimal getMbrt()
  {
    return mbrt;
  }

  public BigDecimal getMnet()
  {
    return mnet;
  }

  public Date getDattr()
  {
    return dattr;
  }

  public Date getAltered()
  {
    return altered;
  }

  public PackList getPackList()
  {

    return packList;
  }

  public void setHid(Long hid)
  {
    this.hid = hid;
  }

  public void setHid_cspl(Long hid_cspl)
  {
    this.hid_cspl = hid_cspl;
  }

  public void setPak_nomer(String pak_nomer)
  {
    this.pak_nomer = pak_nomer;
  }

  public void setPak_type(String pak_type)
  {
    this.pak_type = pak_type;
  }

  public void setDim(String dim)
  {
    this.dim = dim;
  }

  public void setMbrt(BigDecimal mbrt)
  {
    this.mbrt = mbrt;
  }

  public void setMnet(BigDecimal mnet)
  {
    this.mnet = mnet;
  }

  public void setDattr(Date dattr)
  {
    this.dattr = dattr;
  }

  public void setAltered(Date altered)
  {
    this.altered = altered;
  }

  public void setPackList(PackList packList)
  {

    this.packList = packList;
  }

}
