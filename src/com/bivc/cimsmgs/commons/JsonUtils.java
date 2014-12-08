package com.bivc.cimsmgs.commons;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;


public class JsonUtils {
    protected final static ObjectMapper mapper = new ObjectMapper();


    /*static { // if you need to change default configuration:
//        mapper.configure(SerializationConfig.Feature.USE_STATIC_TYPING, true); // faster this way, not default
        mapper.setSerializationInclusion(JsonInclude.Include.NON_EMPTY);
    }*/


    public static String doJson(Object dataObject) throws IOException {
//        mapper.getSerializationConfig().setSerializationInclusion(JsonSerialize.Inclusion.NON_NULL);
        return mapper.writeValueAsString(dataObject);
    }

    public static ObjectMapper getMapper() {
        return mapper;
    }

}
