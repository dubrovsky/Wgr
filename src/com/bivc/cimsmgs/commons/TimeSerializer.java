package com.bivc.cimsmgs.commons;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.Date;

/**
 * Created by peter on 06.02.14.
 */
public class TimeSerializer extends StdSerializer<Date> {
    public TimeSerializer() {
        super(Date.class);
    }

    @Override
    public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        DateTimeUtils.FormaterTime formater = DateTimeUtils.FormaterTime.valueOf(provider.getLocale().getLanguage());
        jgen.writeString(formater.format(value));
    }
}
