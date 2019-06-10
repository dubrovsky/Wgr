package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.NsiKont;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.dto.ky.NsiKontDTO;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import com.bivc.cimsmgs.dto.ky.kont.KontBaseDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * @author p.dzeviarylin
 */
public class KyNsiKontConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapKont(mapperFactory);
        mapNsiKont(mapperFactory);
        mapOwner(mapperFactory);
    }

    private void mapKont(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKont.class, KontBaseDTO.class)
                .field("nkont", "nkon")
//                .field("yearbuild", "")
//                .field("type", "")
                .field("massaTar", "massa_tar")
                .field("podSila", "pod_sila")
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiKont, KontBaseDTO>() {
                            @Override
                            public void mapBtoA(KontBaseDTO dto, NsiKont nsiKont, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    nsiKont.setOwner(null);
                                } else {
                                    nsiKont.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), nsiKont.getOwner());
                                }
                            }
                        }
                )
//                .field("vol", "")
                .register();
    }

    private void mapNsiKont(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKont.class, NsiKontDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiKont, NsiKontDTO>() {
                            @Override
                            public void mapBtoA(NsiKontDTO dto, NsiKont kont, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    kont.setOwner(null);
                                } else {
                                    kont.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), kont.getOwner());
                                }
                            }
                        }
                )
                .byDefault()
                .register();

    }

    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, NsiKyOwnersDTO.class)
                .field("hid", "hid")
                .register();

    }
}
