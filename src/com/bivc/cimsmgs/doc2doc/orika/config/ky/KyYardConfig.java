package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.dto.ky.YardSectorDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 27.08.2014.
 */
public class KyYardConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapYardSector(mapperFactory);
    }

    private void mapYardSector(MapperFactory mapperFactory) {
        mapperFactory.classMap(YardSector.class, YardSectorDTO.class)
                .field("hid", "hid")
                .fieldAToB("name", "name")
                .register();
    }
}
