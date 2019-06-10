package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.NsiAvto;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.dto.ky.AvtoBaseDTO;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * @author p.dzeviarylin
 */
public class KyNsiAvtoConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapAvto(mapperFactory);
        mapOwner(mapperFactory);
    }

    private void mapAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiAvto.class, AvtoBaseDTO.class)
                .field("typeAvto", "type_avto")
                .field("noAvto", "no_avto")
                .field("noTrail", "no_trail")
                .field("ownCargo", "otp_cargo")
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiAvto, AvtoBaseDTO>() {
                            @Override
                            public void mapBtoA(AvtoBaseDTO dto, NsiAvto nsiAvto, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    nsiAvto.setOwner(null);
                                } else {
                                    nsiAvto.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), nsiAvto.getOwner());
                                }
                            }
                        }
                )
                .register();
    }

    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, NsiKyOwnersDTO.class)
                .field("hid", "hid")
                .register();

    }
}

