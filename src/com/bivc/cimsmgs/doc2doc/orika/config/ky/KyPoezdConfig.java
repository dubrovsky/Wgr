package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.dto.PackDocDTO;
import com.bivc.cimsmgs.dto.RouteDTO;
import com.bivc.cimsmgs.dto.ky2.ClientDTO;
import com.bivc.cimsmgs.dto.ky2.PoezdDTO;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;

/**
 * Created by peter on 19.08.2014.
 */
public class KyPoezdConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapRoute(mapperFactory);
        mapPackDoc(mapperFactory);
        mapClient(mapperFactory);
        mapPoezd(mapperFactory);
//        mapKontInto(mapperFactory);
//        mapVagon(mapperFactory);
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

    private void mapClient(MapperFactory mapperFactory) {
        mapperFactory.classMap(Client.class, ClientDTO.class)
                .fieldAToB("hid", "hid")
                .fieldAToB("sname", "sname")
                .register();
    }

    private void mapPoezd(MapperFactory mapperFactory) {
        mapperFactory.classMap(Poezd.class, PoezdDTO.class)
                .fieldAToB("client.sname", "gruzotpr")
                .byDefault()
                .register();
    }

 /*
    private void mapVagon(MapperFactory mapperFactory) {
        mapperFactory.classMap(Vagon.class, VagonDTO.class)
                .exclude("poezd")
                .byDefault()
                .customize(
                        new CustomMapper<Vagon, VagonDTO>() {
                            @Override
                            public void mapAtoB(Vagon vagon, VagonDTO vagonDTO, MappingContext context) {
                                vagonDTO.setPoezd(new PoezdBaseDTO(vagon.getPoezd().getHid()));
                            }
                        }
                )
                .register();
    }*/


    /*private void mapKontInto(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInPoezdIntoDTO.class)
                .exclude("vagonInto")
                .exclude("poezdInto")
                .byDefault()
                .customize(
                        new CustomMapper<Kont, KontInPoezdIntoDTO>() {
                            @Override
                            public void mapAtoB(Kont kont, KontInPoezdIntoDTO dto, MappingContext context) {
                                dto.setVagonInto(new VagonBaseDTO(kont.getVagonInto().getHid()));
                                dto.setPoezdInto(new PoezdBaseDTO(kont.getPoezdInto().getHid()));
                            }

                            *//*@Override
                            public void mapBtoA(KontInPoezdIntoDTO dto, Kont kont, MappingContext context) {
                            }*//*
                        }
                )
                .register();
    }

    private void mapKontOut(MapperFactory mapperFactory) {
        mapperFactory.classMap(Kont.class, KontInPoezdOutDTO.class)
                .exclude("vagonOut")
                .exclude("poezdOut")
                .byDefault()
                .customize(
                        new CustomMapper<Kont, KontInPoezdOutDTO>() {
                            @Override
                            public void mapAtoB(Kont kont, KontInPoezdOutDTO dto, MappingContext context) {
                                dto.setVagonOut(new VagonBaseDTO(kont.getVagonOut().getHid()));
                                dto.setPoezdOut(new PoezdBaseDTO(kont.getPoezdOut().getHid()));
                            }

                            *//*@Override
                            public void mapBtoA(KontInPoezdOutDTO dto, Kont kont, MappingContext context) {
                            }*//*
                        }
                )
                .register();
    }*/
    /*private void mapPoezd(MapperFactory mapperFactory) {
        mapperFactory.classMap(Poezd.class, PoezdDTO.class)
                .exclude("kontsOut")
                .exclude("kontsInto")
                .exclude("vagons")
                .byDefault()
                .customize(
                        new CustomMapper<Poezd, PoezdDTO>() {
                            @Override
                            public void mapAtoB(Poezd poezd, PoezdDTO poezdDTO, MappingContext context) {
                                poezdDTO.setKontsInto(mapAsSet(poezd.getKontsInto(), KontInPoezdIntoDTO.class));
                                poezdDTO.setKontsOut(mapAsSet(poezd.getKontsOut(), KontInPoezdOutDTO.class));
                                poezdDTO.setVagons(mapAsSet(poezd.getVagons(), VagonDTO.class));
                            }
                        }
                )
                .register();
    }*/


    /*private void mapVagon(MapperFactory mapperFactory){
        mapperFactory.classMap(Vagon.class, VagonDTO.class)
                .exclude("kontsOut")
                .exclude("kontsInto")
                .exclude("vagons")
                .byDefault()
                .register();
    }*/

}
