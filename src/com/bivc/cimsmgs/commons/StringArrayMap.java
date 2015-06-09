package com.bivc.cimsmgs.commons;

import java.util.ArrayList;
import java.util.TreeMap;

public class StringArrayMap {
  private TreeMap<String, ArrayList<String>> map;

  public StringArrayMap() {
    map = new TreeMap<>();
  }

  public void add(String key, String value) {
    ArrayList<String> list = map.get(key);
    if (list == null) {
      list = new ArrayList<>();
      map.put(key, list);
    }
    list.add(value);
  }

  public TreeMap<String, ArrayList<String>> getMap() {
    return map;
  }
}
