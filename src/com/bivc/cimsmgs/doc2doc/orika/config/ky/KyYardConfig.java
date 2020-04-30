package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.dto.ky.YardSectorDTO;
import com.bivc.cimsmgs.dto.ky2.KontDTO;
import com.bivc.cimsmgs.dto.ky2.KontViewDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 27.08.2014.
 */
public class KyYardConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapYardSector(mapperFactory);
        mapKont(mapperFactory);
//        mapYard(mapperFactory);
    }

    private void mapYardSector(MapperFactory mapperFactory) {
        mapperFactory.classMap(YardSector.class, YardSectorDTO.class)
                .field("hid", "hid")
                .fieldAToB("name", "name")
                .register();
    }


    private void mapKont(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontViewDTO.class)
                .fieldAToB("client.hid", "clientHid")
                .fieldAToB("client.sname", "gruzotpr")
                .byDefault()
                .register();
    }


    /*private void mapYard(MapperFactory mapperFactory) {
        mapperFactory.classMap(Yard.class, YardDTO.class)
                .fieldAToB("messCount", "messCount")
                .byDefault()
                .register();
    }*/
}
