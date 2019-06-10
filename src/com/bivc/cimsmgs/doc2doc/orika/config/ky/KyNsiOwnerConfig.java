package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * @author p.dzeviarylin
 */
public class KyNsiOwnerConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapOwner(mapperFactory);
    }

    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, AvtoBaseDTO.class)
                .field("nameown", "")
                .field("adress", "")
                .field("prim", "")
                .register();
    }
}
