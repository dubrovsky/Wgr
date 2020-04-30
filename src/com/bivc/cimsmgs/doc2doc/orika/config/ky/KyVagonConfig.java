package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.ky.Vagon;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import com.bivc.cimsmgs.dto.ky.PoezdBaseDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import com.bivc.cimsmgs.dto.ky2.VagonDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 21.08.2014.
 */
public class KyVagonConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapVagon(mapperFactory);
        mapVagon2(mapperFactory);
        mapPoezd(mapperFactory);
        mapOwner(mapperFactory);
    }

    private void mapVagon(MapperFactory mapperFactory) {
        mapperFactory.classMap(Vagon.class, VagonBaseDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Vagon, VagonBaseDTO>() {
                            @Override
                            public void mapBtoA(VagonBaseDTO dto, Vagon vagon, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    vagon.setOwner(null);
                                } else {
                                    vagon.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), vagon.getOwner());
                                }
                            }
                        }
                )
                .byDefault()
                .register();

    }

    private void mapVagon2(MapperFactory mapperFactory) {
        mapperFactory.classMap(Vagon.class, VagonDTO.class)
                .fieldAToB("podSila", "podSila")
                .fieldAToB("kolOs", "kolOs")
                .fieldAToB("masTar", "masTar")
                .fieldAToB("sobstv", "sobstv")
                .register();

    }

    private void mapPoezd(MapperFactory mapperFactory) {
        mapperFactory.classMap(Poezd.class, PoezdBaseDTO.class)
                .field("hid", "hid")
                .fieldAToB("nppr", "nppr")
                .fieldAToB("dotp", "dotp")
                .register();

    }

    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, NsiKyOwnersDTO.class)
                .field("hid", "hid")
                .register();

    }

}
