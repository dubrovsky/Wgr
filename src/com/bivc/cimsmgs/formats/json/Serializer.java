package com.bivc.cimsmgs.formats.json;

import java.util.Locale;

/**
 * Created by peter on 16.04.2014.
 */
public interface Serializer {
    public String write(Object object) throws Exception;

    Serializer setLocale(Locale locale);
//    public T deserialize(String json);
}
