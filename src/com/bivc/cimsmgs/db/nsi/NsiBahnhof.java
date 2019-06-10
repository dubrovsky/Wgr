package com.bivc.cimsmgs.db.nsi;

/**
 * Created by volkva on 13.06.2017.
 */
public class NsiBahnhof {
  private String nr;

  /**
   land:   51 Польша
           53 Румыния
           54 Чехия
           55 Венгрия
           56 Словакия
           80 Германия
           81 Австрия
           84 Нидерланды
           87 Франция
           88 Бельгия
   */
  private Long land;
  private String name;
  private String vz;
  private String tag;
  private String name_cyrillic;

  public String getName_cyrillic() {
    return name_cyrillic;
  }

  public void setName_cyrillic(String name_cyrillic) {
    this.name_cyrillic = name_cyrillic;
  }

  public String getTag() {
    return tag;
  }

  public void setTag(String tag) {
    this.tag = tag;
  }

  public String getVz() {
    return vz;
  }

  public void setVz(String vz) {
    this.vz = vz;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Long getLand() {
    return land;
  }

  public void setLand(Long land) {
    this.land = land;
  }

  public String getNr() {
    return nr;
  }

  public void setNr(String nr) {
    this.nr = nr;
  }
}
