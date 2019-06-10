package com.bivc.cimsmgs.formats.json;

import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;

import java.util.Locale;
import java.util.Map;

/**
 * Created by peter on 16.04.2014.
 */
public interface Serializer {
    String write(Object object) throws Exception;

    Serializer setLocale(Locale locale);

    Serializer setView(Class<?> view);

	Serializer setFilters(Map<String, SimpleBeanPropertyFilter> filters);
//    public T deserialize(String json);
}
