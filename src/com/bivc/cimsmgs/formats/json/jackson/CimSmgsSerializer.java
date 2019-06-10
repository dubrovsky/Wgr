package com.bivc.cimsmgs.formats.json.jackson;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;

import java.util.HashMap;
import java.util.Map;

/**
 * @author p.dzeviarylin
 */
public class CimSmgsSerializer extends SerializerImpl{

	public CimSmgsSerializer(ObjectMapper mapper) {
		
		super(mapper);
		Map<String, SimpleBeanPropertyFilter> filters = new HashMap<>(2);
		filters.put("cimSmgsPropertyFilter", new CimSmgsPropertyFilter());
		filters.put("vagPropertyFilter", new VagPropertyFilter());
		filters.put("contPropertyFilter", new ContPropertyFilter());
		setFilters(filters);
	}
}
