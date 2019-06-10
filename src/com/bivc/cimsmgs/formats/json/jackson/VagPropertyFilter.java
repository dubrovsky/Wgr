package com.bivc.cimsmgs.formats.json.jackson;

import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.PropertyWriter;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import org.apache.commons.collections4.MapUtils;

/**
 * @author p.dzeviarylin
 */
public class VagPropertyFilter extends SimpleBeanPropertyFilter {

	@Override
	public void serializeAsField(Object pojo, JsonGenerator jgen, SerializerProvider provider, PropertyWriter writer) throws Exception {
		if (include(writer)) {
			CimSmgsCarList cimSmgsCarList = (CimSmgsCarList) pojo;
			switch (writer.getName()) {
				case "cimSmgsKonLists":
					if (MapUtils.isNotEmpty(cimSmgsCarList.getCimSmgsKonLists())) {
						writer.serializeAsField(pojo, jgen, provider);
					}
					break;
				case "cimSmgsGruzs":
				case "cimSmgsPlombs":
				case "cimSmgsDocses9":
					if (MapUtils.isEmpty(cimSmgsCarList.getCimSmgsKonLists())) {
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
