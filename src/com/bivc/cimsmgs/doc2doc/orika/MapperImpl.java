package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.doc2doc.Mapper;
import ma.glasnost.orika.impl.ConfigurableMapper;

import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

public class MapperImpl implements Mapper {
    private ConfigurableMapper mapper;

    @Override
    public <S,D> D copy(S sourceObject, Class<D> destinationClass) {
        return mapper.map(sourceObject, destinationClass);
    }

    @Override
    public <S,D> void copy(S sourceObject, D destinationObject) {
        mapper.map(sourceObject, destinationObject);
    }

    @Override
    public <K, V> Map<K, V> copyMap(Map<K, V> sourceMap, Class<V> destinationClass) {
        Map<K, V> destinationMap = new TreeMap<K, V>();
        Set<Map.Entry<K, V>> sourceEntries = sourceMap.entrySet();
        for (Map.Entry<K, V> sourceEntry : sourceEntries) {
            V destination = copy(sourceEntry.getValue(), destinationClass);
            destinationMap.put(sourceEntry.getKey(), destination);
        }

        return destinationMap;
    }

    /*@Override
    public <K extends Number, V extends Sortable<K>> void copyMap(Map<K, V> sourceMap, Map<K, V> destinationMap, Class<V> valueClass, Class<K> keyClass) {
        Number index = null;
        for(V source : sourceMap.values()){
            V destination = copy(source, valueClass);
            if(keyClass.isAssignableFrom(Byte.class)){
                index = (byte)destinationMap.size();
            } else if(keyClass.isAssignableFrom(Integer.class)){
                index = destinationMap.size();
            }
            destination.setSort((K)index);
            destinationMap.put(destination.getSort(), destination);
        }

    }*/



    public void setMapper(ConfigurableMapper mapper) {
        this.mapper = mapper;
    }
}
