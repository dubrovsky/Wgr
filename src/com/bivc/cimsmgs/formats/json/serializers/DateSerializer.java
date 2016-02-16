package com.bivc.cimsmgs.formats.json.serializers;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;
import java.util.Date;

/**
 * Created by peter on 06.02.14.
 */
public class DateSerializer extends StdSerializer<Date> {
    public DateSerializer() {
        super(Date.class);
    }

    @Override
    public void serialize(Date value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        DateTimeUtils.FormaterDate formater = DateTimeUtils.FormaterDate.valueOf(provider.getLocale().getLanguage());
        jgen.writeString(formater.format(value));
    }
}
