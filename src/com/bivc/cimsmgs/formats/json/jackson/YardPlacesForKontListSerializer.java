package com.bivc.cimsmgs.formats.json.jackson;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;

import java.util.HashMap;
import java.util.Map;

/**
 * @author p.dzeviarylin
 */
public class YardPlacesForKontListSerializer extends SerializerImpl {

	public YardPlacesForKontListSerializer(ObjectMapper mapper) {
		super(mapper);
		Map<String, SimpleBeanPropertyFilter> filters = new HashMap<String, SimpleBeanPropertyFilter>();
		filters.put("yardSectorFilter", SimpleBeanPropertyFilter.filterOutAllExcept("hid", "name"));
		filters.put("yardFilter", SimpleBeanPropertyFilter.filterOutAllExcept("hid", "x", "y", "z", "sector", "empty"));
		setFilters(filters);
	}
}
