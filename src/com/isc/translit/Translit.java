package com.isc.translit;

import com.ibm.icu.text.Transliterator;

/**
 * Created by volkva on 12.04.2017.
 */
public class Translit {
  private Transliterator forward;
  private Transliterator backward;

  public Translit(String forwardRules, String backwardRules) throws Exception {
    this.forward = Transliterator.createFromRules("forward", forwardRules, Transliterator.FORWARD);
    this.backward = Transliterator.createFromRules("backward", backwardRules, Transliterator.FORWARD);
  }

  public String getForward(String value) throws Exception {
    return forward.transliterate(value);
  }

  public String getBackward(String value) throws Exception {
    return backward.transliterate(value);
  }
}
