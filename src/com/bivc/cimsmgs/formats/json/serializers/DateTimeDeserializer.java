package com.bivc.cimsmgs.formats.json.serializers;

import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.Date;

/**
 * Created by peter on 04.02.14.
 */
public class DateTimeDeserializer extends StdDeserializer<Date> {
    final static private Logger log = LoggerFactory.getLogger(DateTimeDeserializer.class);


    public DateTimeDeserializer() {
        super(Date.class);
    }

    @Override
    public Date deserialize(JsonParser jp, DeserializationContext context) {
        String date;
        try {
            date = jp.getText();
        } catch (IOException ex) {
            log.error(ex.getMessage());
            return null;
        }

        if (StringUtils.isBlank(date)) {
            return null;
        } else {
            DateTimeUtils.Parser parser = DateTimeUtils.Parser.valueOf(context.getLocale().getLanguage());
            return parser.parse(StringUtils.trim(date));
        }

    }
}
