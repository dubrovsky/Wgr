package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.dto.ky.kont.KontBaseDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 27.08.2014.
 */
public class KyPlombConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapKont(mapperFactory);
    }

    private void mapKont(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontBaseDTO.class)
                .field("hid", "hid")
                .register();
    }
}
