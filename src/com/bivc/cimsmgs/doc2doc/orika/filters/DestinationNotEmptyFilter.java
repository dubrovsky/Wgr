package com.bivc.cimsmgs.doc2doc.orika.filters;

import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.NullFilter;
import ma.glasnost.orika.metadata.Property;
import ma.glasnost.orika.metadata.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by peter on 29.09.2014.
 */
public class DestinationNotEmptyFilter extends NullFilter<Object, Object> {
    private final static Logger log = LoggerFactory.getLogger(DestinationNotEmptyFilter.class);

    @Override
    public <S, D> boolean shouldMap(Type<S> sourceType, String sourceName,
                                    S source, Type<D> destType, String destName, D dest,
                                    MappingContext mappingContext) {
        if(log.isDebugEnabled()) {
            if(source != null && dest == null && !destType.isMap()) {
                log.debug("Copy {} with value {} to {}", sourceName, source, destName);
            }
        }
        return (source != null && dest == null) || destType.isMap();
    }

    @Override
    public boolean appliesTo(Property source, Property destination) {
        return destination != null && !destination.isPrimitive();
    }

}
