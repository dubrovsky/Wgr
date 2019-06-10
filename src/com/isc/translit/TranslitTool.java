package com.isc.translit;

import com.isc.blank;

import java.util.List;
import java.util.TreeMap;

/**
 * Created by volkva on 12.04.2017.
 */
public class TranslitTool {
  /**
   String result1 = "№1234567890 съешь ещё этих мягких французских булок, да выпей же чаю СЪЕШЬ ЕЩЁ ЭТИХ МЯГКИХ ФРАНЦУЗСКИХ БУЛОК, ДА ВЫПЕЙ ЖЕ ЧАЮ";
   TranslitTool tlt = new TranslitTool("/Translit-ru.xml");
   result1 = tlt.getForward("de", result1);
   System.out.println("= " + result1);
   result1 = tlt.getBackward("de", result1);
   System.out.println("= " + result1);
   */

  private TreeMap<String, Translit> translits = new TreeMap();
  public TranslitTool(String fileConfig) throws Exception {
    org.dom4j.io.SAXReader rdr = new org.dom4j.io.SAXReader();
    org.dom4j.Node nd4j = rdr.read(new blank().getClass().getResource(fileConfig)).getRootElement();
    List lst = nd4j.selectNodes("*");
    for (int i = 0; i < lst.size(); i++) {
      org.dom4j.Node nd1 = (org.dom4j.Node) lst.get(i);
      Translit tl = new Translit(nd1.selectSingleNode("forward").getText().trim(), nd1.selectSingleNode("backward").getText().trim());
      translits.put(nd1.getName(), tl);
    }
  }

  public Translit get(String way) {
    return translits.get(way);
  }

  public String getForward(String way, String value) throws Exception {
    return translits.get(way).getForward(value);
  }

  public String getBackward(String way, String value) throws Exception {
    return translits.get(way).getBackward(value);
  }

}
