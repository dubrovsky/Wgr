package com.bivc.cimsmgs.doc2doc;

import java.util.Map;

public interface Mapper {

//    public CimSmgs copy(CimSmgs src);

    public <S,D> D copy(S sourceObject, Class<D> destinationClass);

    public <S,D> void copy(S sourceObject, D destinationObject);

    public <K, V> Map<K, V> copyMap(Map<K, V> sourceMap, Class<V> destinationClass);

//    public <K extends Number, V extends Sortable<K>> void copyMap(Map<K, V> sourceMap, Map<K, V> destinationMap, Class<V> valueClass, Class<K> keyClass);
}
