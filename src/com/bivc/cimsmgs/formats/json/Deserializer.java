package com.bivc.cimsmgs.formats.json;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Locale;

/**
 * Created by peter on 18.04.2014.
 */
public interface Deserializer {
    public <T> T read(Class toClass, String json) throws IOException;
//    public <T> T read(Type type, String json) throws IOException;

    public Deserializer setLocale(Locale locale);

    public <T> T read(Type type, String json) throws IOException;
}
