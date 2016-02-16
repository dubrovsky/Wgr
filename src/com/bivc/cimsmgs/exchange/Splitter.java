package com.bivc.cimsmgs.exchange;

import java.math.BigDecimal;
import java.util.Arrays;

import static com.bivc.cimsmgs.exchange.Utils.split;
import static com.bivc.cimsmgs.exchange.EDIMessage.ms;

public class Splitter {

  private static final String pl = "\\+";
  private static final String dd = ":";

  private Element[] seg;

  public Splitter(String s) {
    String[] arr = split(s.trim(), pl, ms);
    seg = new Element[arr.length];
    for (int i = 0; i < arr.length; i ++) {
      seg[i] = new Element(arr[i]);
    }
  }

  public Element gs(int idx) {
    if (idx >= seg.length)
      return new Element("");
    else
      return seg[idx];
  }

  public String val(int idx) {
    return gs(idx).ge();
  }

  @Override
  public String toString() {
    return Arrays.toString(seg);
  }


  public class Element {
    private String[] el;

    public Element(String seg) {
      el = split(seg, dd, ms);
    }

    public String ge() {
      switch (el.length) {
        case 0 :
          return "";
        case 1 :
          return el[0];
        default:
          StringBuilder res = new StringBuilder();
          for (String s : el) {
            res.append(s);
          }
          return res.toString();
      }
    }

    public String ge(int idx) {
      return Utils.ge(el, idx);
    }

    public Long geL(int idx) {
      return Utils.geL(el, idx);
    }

    public Long geLD(int idx) {
      return Utils.geLD(el, idx);
    }

    public Integer geI(int idx) {
      return Utils.geI(el, idx);
    }

    public BigDecimal geD(int idx) {
      return Utils.geD(el, idx);
    }

    @Override
    public String toString() {
      return Arrays.toString(el);
    }
  }

}
