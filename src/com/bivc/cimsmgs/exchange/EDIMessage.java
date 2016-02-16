package com.bivc.cimsmgs.exchange;

import static com.bivc.cimsmgs.exchange.Utils.split;
import java.util.NoSuchElementException;

public class EDIMessage {

  private static final String delim = "'";
  public static final String ms = "?";

  private String[] segments;
  private int idx = 0;

  public EDIMessage(String msg) {
    if (msg != null) {
      segments = split(msg, delim, ms);
    }
  }

  public Splitter next() {
    if (idx < segments.length) {
      return new Splitter(segments[idx++]);
    }
    else {
      throw new NoSuchElementException("No string with index " + idx);
    }
  }
}
