package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Avto;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.AvtoDTO;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 19.08.2014.
 */
public class KyAvtoConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapRoute(mapperFactory);
        mapPackDoc(mapperFactory);
        mapOwner(mapperFactory);
        mapAvto(mapperFactory);
        mapBaseAvto(mapperFactory);
    }

    private void mapRoute(MapperFactory mapperFactory) {
        mapperFactory.classMap(Route.class, RouteDTO.class)
                .field("hid", "hid")
                .register();
    }

    private void mapPackDoc(MapperFactory mapperFactory) {
        mapperFactory.classMap(PackDoc.class, PackDocDTO.class)
                .field("hid", "hid")
                .register();
    }


    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, NsiKyOwnersDTO.class)
                .field("hid", "hid")
                .register();

    }

    private void mapBaseAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Avto.class, AvtoBaseDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Avto, AvtoBaseDTO>() {
                            @Override
                            public void mapBtoA(AvtoBaseDTO dto, Avto avto, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    avto.setOwner(null);
                                } else {
                                    avto.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), avto.getOwner());
                                }
                            }
                        }
                )
                .byDefault()
                .register();

    }

    private void mapAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Avto.class, AvtoDTO.class)
                .fieldAToB("owner", "owner")
                .byDefault()
                .register();

    }
}
