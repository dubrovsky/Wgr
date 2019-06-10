package com.bivc.cimsmgs.formats.json.jackson;

import com.bivc.cimsmgs.db.CimSmgs;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.PropertyWriter;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;

/**
 * @author p.dzeviarylin
 */
public class CimSmgsPropertyFilter extends SimpleBeanPropertyFilter {

	@Override
	public void serializeAsField(Object pojo, JsonGenerator jgen, SerializerProvider provider, PropertyWriter writer) throws Exception {
		if (include(writer)) {
			switch (writer.getName()) {
				case "cimSmgsPlombs":
				case "cimSmgsDocses9":
					CimSmgs smgs = (CimSmgs) pojo;
					if(!smgs.notForDefaultView()) {
						writer.serializeAsField(pojo, jgen, provider);
					}
					break;
				default:
					writer.serializeAsField(pojo, jgen, provider);
			}
		} else if (!jgen.canOmitFields()) { // since 2.3
			writer.serializeAsOmittedField(pojo, jgen, provider);
		}

	}
}
