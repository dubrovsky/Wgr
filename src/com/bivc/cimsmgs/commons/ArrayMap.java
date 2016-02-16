package com.bivc.cimsmgs.commons;

import java.util.ArrayList;
import java.util.TreeMap;

public class ArrayMap<K, V> {
  private TreeMap<K, ArrayList<V>> map;

  public ArrayMap() {
    map = new TreeMap<>();
  }

  public void add(K key, V value) {
    ArrayList<V> list = map.get(key);
    if (list == null) {
      list = new ArrayList<>();
      map.put(key, list);
    }
    list.add(value);
  }

  public TreeMap<K, ArrayList<V>> getMap() {
    return map;
  }
}
