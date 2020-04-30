package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.dto.ky.*;
import com.bivc.cimsmgs.dto.ky.kont.*;
import com.bivc.cimsmgs.dto.ky2.KontDTO;
import com.bivc.cimsmgs.dto.ky2.KontSearchDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 22.08.2014.
 */
public class KyKontConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapPoezd(mapperFactory);
        mapVagon(mapperFactory);
        mapAvto(mapperFactory);
//        mapStatus(mapperFactory);
        mapYard(mapperFactory);
        mapOwner(mapperFactory);
        mapKontInPoezdInto(mapperFactory);
        mapKontInPoezdOut(mapperFactory);
        mapKontInAvtoInto(mapperFactory);
        mapKontInAvtoOut(mapperFactory);
        mapKontInYard(mapperFactory);
        mapKont(mapperFactory);
    }

    private void mapKont(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontSearchDTO.class)
                .fieldAToB("pod_sila", "pod_sila")
                .fieldAToB("type", "type")
                .fieldAToB("vid", "vid")
                .fieldAToB("massa_tar", "massa_tar")
                .fieldAToB("client", "client")
                .fieldAToB("yard", "yard")
                .register();
    }

    private void mapPoezd(MapperFactory mapperFactory) {
        mapperFactory.classMap(Poezd.class, PoezdBaseDTO.class)
                .field("hid", "hid")
                .fieldAToB("nppr", "nppr")
                .register();
    }

    private void mapVagon(MapperFactory mapperFactory) {
        mapperFactory.classMap(Vagon.class, VagonBaseDTO.class)
                .field("hid", "hid")
                .fieldAToB("nvag", "nvag")
                .register();
    }

    private void mapAvto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Avto.class, AvtoBaseDTO.class)
                .field("hid", "hid")
                .fieldAToB("no_avto", "no_avto")
                .register();
    }

    /*private void mapStatus(MapperFactory mapperFactory) {
        mapperFactory.classMap(KontStatus.class, KontStatus.class)
                .field("hid", "hid")
                .register();
    }*/

    private void mapYard(MapperFactory mapperFactory) {
        mapperFactory.classMap(Yard.class, YardBaseDTO.class)
                .field("hid", "hid")
                .register();
    }

    private void mapOwner(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiKyOwners.class, NsiKyOwnersDTO.class)
                .field("hid", "hid")
                .register();

    }

    private void mapKontInPoezdInto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInPoezdIntoDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Kont, KontInPoezdIntoDTO>() {
                            @Override
                            public void mapBtoA(KontInPoezdIntoDTO dto, Kont kont, MappingContext context) {
                                copyOwner(dto, kont, mapperFacade);
                            }
                        }
                )
                .byDefault()
                .register();
    }

    private void mapKontInPoezdOut(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInPoezdOutDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Kont, KontInPoezdOutDTO>() {
                            @Override
                            public void mapBtoA(KontInPoezdOutDTO dto, Kont kont, MappingContext context) {
                                copyOwner(dto, kont, mapperFacade);
                            }
                        }
                )
                .byDefault()
                .register();
    }

    private void mapKontInAvtoInto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInAvtoIntoDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Kont, KontInAvtoIntoDTO>() {
                            @Override
                            public void mapBtoA(KontInAvtoIntoDTO dto, Kont kont, MappingContext context) {
                                copyOwner(dto, kont, mapperFacade);
                            }
                        }
                )
                .byDefault()
                .register();
    }

    private void mapKontInAvtoOut(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInAvtoOutDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Kont, KontInAvtoOutDTO>() {
                            @Override
                            public void mapBtoA(KontInAvtoOutDTO dto, Kont kont, MappingContext context) {
                                copyOwner(dto, kont, mapperFacade);
                            }
                        }
                )
                .byDefault()
                .register();
    }

    private void mapKontInYard(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInYardDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<Kont, KontInYardDTO>() {
                            @Override
                            public void mapBtoA(KontInYardDTO dto, Kont kont, MappingContext context) {
                                copyOwner(dto, kont, mapperFacade);
                            }
                        }
                )
                .byDefault()
                .register();
    }

    private void copyOwner(KontBaseDTO dto, Kont kont, MapperFacade mapperFacade) {
        /*if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
            kont.setOwner(null);
        } else {
            kont.setOwner(new NsiKyOwners());
            mapperFacade.map(dto.getOwner(), kont.getOwner());
        }*/
    }
}
