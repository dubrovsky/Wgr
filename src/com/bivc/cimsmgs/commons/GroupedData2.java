package com.bivc.cimsmgs.commons;

import java.math.BigDecimal;
import java.util.*;

public class GroupedData2 extends GroupedData {
  private String cux;
  private BigDecimal kolm = BigDecimal.ZERO;
  private TreeMap<String, Date> invNoSet = new TreeMap<>();

  static private final String OTHER_NAME = " И ДРУГИЕ ТОВАРЫ";
  static private final int OTHER_NAME_LENGTH = OTHER_NAME.length();
  static private final String OTHER_EDIZM = "ШТ";
  static private final int OTHER_EDIZM_LENGTH = OTHER_EDIZM.length();
  static private final String TIRE = "-";
  static private final int TIRE_LENGTH = TIRE.length();

  static private final int MAX_NAME_LENGTH = 250;

  public String getCux() {
    return cux;
  }

  public void setCux(String cux) {
    this.cux = cux;
  }

  public void addKolm(BigDecimal val) {
    if (val != null)
      kolm = kolm.add(val);
  }

  public void setKolm(BigDecimal kolm) {
    this.kolm = kolm;
  }

  public BigDecimal getKolm() {
    return kolm;
  }

  public void addNkon(String[] nkon) {
    nkonSet.addAll(Arrays.asList(nkon));
  }

  public void addInvNoDate(String invNo, Date invDate) {
    if (!invNoSet.containsKey(invNo)) {
      invNoSet.put(invNo, invDate);
    }
  }

  public TreeMap<String, Date> getInvNoDateSet() {
    return invNoSet;
  }

  public String getName() {

    class Buf {
      private ArrayList<StringBuilder> bufList;
      private int len = 0;

      private Buf(int initialCapacity) {
        bufList = new ArrayList<>(initialCapacity);
      }

      private void add(StringBuilder sb) {
        bufList.add(sb);
        len += sb.length();
      }

      private void removeLast() {
        StringBuilder sb = bufList.remove(bufList.size() - 1);
        len -= sb.length();
      }

      private ArrayList<StringBuilder> getList() {
        return bufList;
      }

      private int getLen() {
        return len;
      }
    }

    BigDecimal total = BigDecimal.ZERO;
    for (BigDecimal item : nameMap.values()) {
      if (item != null)
        total = total.add(item);
    }

    boolean first = true;
    ArrayList<Map.Entry<Key, BigDecimal>> list = new ArrayList<>(nameMap.entrySet());
    Buf buf = new Buf(list.size());

    int idx = 0;
    for (Map.Entry<Key, BigDecimal> item : list) {
      BigDecimal val = item.getValue();

      StringBuilder sb = new StringBuilder(50);
      if (!first)
        sb.append(",");
      first = false;

      sb.append(item.getKey().name);
      if (val != null) {
        sb.append(TIRE).append(df3bit.format(val)).append(item.getKey().edizm);
      }

      if (buf.getLen() + sb.length() > MAX_NAME_LENGTH) {
        break;
      }

      buf.add(sb);
      if (val != null) {
        total = total.subtract(val);
      }
      idx++;
    }

    if (idx < list.size()) {
      String totalStr = df3bit.format(total);
      while (buf.getLen() + OTHER_NAME_LENGTH + TIRE_LENGTH + totalStr.length() + OTHER_EDIZM_LENGTH > MAX_NAME_LENGTH) {
        idx--;
        buf.removeLast();
        BigDecimal val = list.get(idx).getValue();
        if (val != null) {
          total = total.add(val);
        }
        totalStr = df3bit.format(total);
      }

      StringBuilder sb = new StringBuilder(OTHER_NAME).append(TIRE).append(totalStr).append(OTHER_EDIZM);
      buf.add(sb);
    }

    StringBuilder res = new StringBuilder(buf.getLen());
    for (StringBuilder sb : buf.getList()) {
      res.append(sb);
    }

    return res.toString();
  }
/*
  public String getName() {
    BigDecimal total = BigDecimal.ZERO;
    for (BigDecimal item : nameMap.values()) {
      if (item != null)
        total = total.add(item);
    }

    StringBuilder res = new StringBuilder(MAX_NAME_LENGTH);
    boolean first = true;
    ArrayList<Map.Entry<String, BigDecimal>> list = new ArrayList<>(nameMap.entrySet());
    for (int i = 0; i < list.size(); i++) {
      Map.Entry<String, BigDecimal> item = list.get(i);
      BigDecimal val = item.getValue();

      StringBuilder sb = new StringBuilder(50);
      if (!first)
        sb.append(", ");
      first = false;

      sb.append(item.getKey());
      if (val != null) {
        sb.append(" - ").append(df3bit.format(item.getValue())).append("ШТ");
      }

      String totalStr = df3bit.format(total);
      int limit = MAX_NAME_LENGTH;
      if (i < list.size() - 1)
        limit -= OTHER_NAME_LENGTH + 3 + totalStr.length() + 2;

      if (res.length() + sb.length() > limit) {
        res.append(OTHER_NAME).append(" - ").append(totalStr).append("ШТ");
        break;
      }
      else {
        res.append(sb);
        if (val != null)
          total = total.subtract(val);
      }
    }

    return res.toString();
  }
*/
}
