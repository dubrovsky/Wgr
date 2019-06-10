package com.bivc.cimsmgs.formats.json.jackson;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;

import java.util.HashMap;
import java.util.Map;

/**
 * @author p.dzeviarylin
 */
public class YardSectorToListSerializer extends SerializerImpl{

	public YardSectorToListSerializer(ObjectMapper mapper) {
		super(mapper);
		Map<String, SimpleBeanPropertyFilter> filters = new HashMap<>();
		filters.put("yardSectorFilter", SimpleBeanPropertyFilter.filterOutAllExcept("hid", "name", "descr"));
		setFilters(filters);
	}
}
