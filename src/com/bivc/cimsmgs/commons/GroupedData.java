package com.bivc.cimsmgs.commons;

import org.apache.commons.lang3.builder.CompareToBuilder;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.util.Map;
import java.util.TreeMap;
import java.util.TreeSet;

public class GroupedData {
//  protected class Amount {
//    protected BigDecimal amount = BigDecimal.ZERO;
//    protected String edizm;
//
//    private void add(BigDecimal a, String e) {
//      if (a != null)
//        amount = amount.add(a);
//      edizm = e;
//    }
//  }

  protected class Key implements Comparable<Key> {
    public String name;
    public String edizm;

    @SuppressWarnings("WeakerAccess")
    protected Key(String name, String edizm) {
      this.name = name;
      this.edizm = edizm;
    }

    @Override
    public String toString() {
      return "Key{" + "name='" + name + "\', edizm='" + edizm + "\'}";
    }

    @Override
    public int compareTo(Key o) {
      if (this == o) return 0;
      if (o == null) return 1;

      @SuppressWarnings("UnnecessaryLocalVariable")
      int res = new CompareToBuilder()
              .append(this.name, o.name)
              .append(this.edizm, o.edizm)
              .toComparison();
      return res;
    }
  }

  @SuppressWarnings("WeakerAccess")
  protected TreeSet<String> nkonSet = new TreeSet<>();
  private TreeSet<String> invNoSet = new TreeSet<>();
  private String nameDe;
  private BigDecimal amount = BigDecimal.ZERO;
  private BigDecimal netto = BigDecimal.ZERO;
  private BigDecimal brutto = BigDecimal.ZERO;
  private BigDecimal sum = BigDecimal.ZERO;
  @SuppressWarnings("WeakerAccess")
  protected TreeMap<Key, BigDecimal> nameMap = new TreeMap<>();

  static protected DecimalFormat df3bit = new DecimalFormat("#0.###");

  public void setNameDe(String nameDe) {
    this.nameDe = nameDe;
  }

  public String getNameDe() {
    return nameDe;
  }

  public TreeSet<String> getNkonSet() {
    return nkonSet;
  }

  public TreeSet<String> getInvNoSet() {
    return invNoSet;
  }

  public BigDecimal getAmount() {
    return amount;
  }

  public BigDecimal getNetto() {
    return netto;
  }

  public BigDecimal getBrutto() {
    return brutto;
  }

  public BigDecimal getSum() {
    return sum;
  }

  public void addNkon(String nkon) {
    nkonSet.add(nkon);
  }

  public void addInvNo(String invNo) {
    invNoSet.add(invNo);
  }

  public void addAmount(BigDecimal val) {
    if (val != null)
      amount = amount.add(val);
  }

  public void addNetto(BigDecimal val) {
    if (val != null)
      netto = netto.add(val);
  }

  public void addBrutto(BigDecimal val) {
    if (val != null)
      brutto = brutto.add(val);
  }

  public void addSum(BigDecimal val) {
    if (val != null)
      sum = sum.add(val);
  }

  public void addName(String name, BigDecimal amount, String edizm) {
    Key key = new Key(name, edizm);
    BigDecimal val;
    if (nameMap.containsKey(key)) {
      val = nameMap.get(key);
      if (val == null) {
        val = amount;
      }
      else {
        if (amount != null) {
          val = val.add(amount);
        }
      }
    }
    else {
      val = amount;
    }
    nameMap.put(key, val);
  }

  public String getName() {
    StringBuilder res = new StringBuilder();
    for (Map.Entry<Key, BigDecimal> item : nameMap.entrySet()) {
      if (item.getValue() != null)
        res.append(item.getKey().name).append(" - ").append(df3bit.format(item.getValue())).append(" ").append(item.getKey().edizm).append("., ");
    }

    int len = res.length();
    if (len > 2)
      res.delete(len - 2, len);

    return res.toString();
  }
}

