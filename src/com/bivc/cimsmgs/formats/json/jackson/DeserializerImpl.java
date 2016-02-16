package com.bivc.cimsmgs.formats.json.jackson;

import com.bivc.cimsmgs.formats.json.Deserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Locale;

/**
 * Created by peter on 18.04.2014.
 */
public class DeserializerImpl implements Deserializer {
    private ObjectReader reader;

    public DeserializerImpl(ObjectMapper mapper) {
        this.reader = mapper.reader();
    }

    @Override
    public <T> T read(Class toClass, String json) throws IOException {
        return reader.forType(toClass).readValue(json);
    }

    /*@Override
    public <T> T read(Type type, String json) throws IOException {
        return reader.withType(type).readValue(json);
    }*/

    public Deserializer setLocale(Locale locale) {
        reader = reader.with(locale);
        return this;
    }

    @Override
    public <T> T read(Type type, String json) throws IOException {
        return reader.forType(reader.getTypeFactory().constructType(/*subClassObj.getClass().getGenericSuperclass()*/type)).readValue(json);
    }
}
