package com.bivc.cimsmgs.formats.json.jackson;

import com.bivc.cimsmgs.formats.json.Serializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;

import java.util.Locale;
import java.util.Map;

/**
 * Created by peter on 16.04.2014.
 */
public class SerializerImpl implements Serializer {

    private ObjectWriter writer;

    public SerializerImpl(ObjectMapper mapper) {
        this.writer = mapper.writer();
    }

    @Override
    public String write(Object object) throws Exception {
        return writer.writeValueAsString(object);

    }

    @Override
    public Serializer setLocale(Locale locale) {
        writer = writer.with(locale);
        return this;
    }

    public Serializer setFilters(Map<String, SimpleBeanPropertyFilter> filters) {
        SimpleFilterProvider filterProvider = new SimpleFilterProvider().setFailOnUnknownId(false);
        for (Map.Entry<String, SimpleBeanPropertyFilter> entry : filters.entrySet()) {
            filterProvider.addFilter(entry.getKey(), entry.getValue());
        }
        writer = writer.with(filterProvider);
        return this;
    }

    public Serializer setFilters() {
        writer = writer.with(new SimpleFilterProvider().setFailOnUnknownId(false));
        return this;
    }
}
