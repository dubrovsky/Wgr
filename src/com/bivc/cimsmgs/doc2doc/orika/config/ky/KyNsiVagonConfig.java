package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import com.bivc.cimsmgs.db.ky.NsiVagShir;
import com.bivc.cimsmgs.db.ky.NsiVagUzky;
import com.bivc.cimsmgs.dto.ky.NsiKyOwnersDTO;
import com.bivc.cimsmgs.dto.ky.NsiVagShirDTO;
import com.bivc.cimsmgs.dto.ky.NsiVagUzkyDTO;
import com.bivc.cimsmgs.dto.ky.VagonBaseDTO;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.apache.commons.lang3.StringUtils;

/**
 * @author p.dzeviarylin
 */
public class KyNsiVagonConfig extends ConfigurableMapper {
    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapVagShir(mapperFactory);
        mapVagUzky(mapperFactory);

        mapNsiVagShir(mapperFactory);
        mapNsiVagUzky(mapperFactory);

        mapOwner(mapperFactory);
    }

    private void mapVagShir(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiVagShir.class, VagonBaseDTO.class)
                .field("nvag", "nvag")
                .field("owntypen", "kpv")
                .field("gp", "podSila")
                .field("tara", "masTar")
                .field("datePlanrem", "plan_rem")
                .field("typeNo", "type_no")
                .field("modelvag", "model")
                .field("dlvag", "dlina")
                .field("nown", "sobstv")
                .field("ostProbeg", "probeg")
                .field("dProbegV", "reviz")
//                .field("owner", "owner")
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiVagShir, VagonBaseDTO>() {
                            @Override
                            public void mapAtoB(NsiVagShir nsiVagShir, VagonBaseDTO dto, MappingContext context) {
                                dto.setSobstv(
                                        (
                                                StringUtils.defaultString(nsiVagShir.getOkpoOwn())
                                                        + " "
                                                        + StringUtils.defaultString(nsiVagShir.getNown())
                                        ).trim()
                                );

                            }

                            @Override
                            public void mapBtoA(VagonBaseDTO dto, NsiVagShir nsiVagShir, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    nsiVagShir.setOwner(null);
                                } else {
                                    nsiVagShir.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), nsiVagShir.getOwner());
                                }
                            }

                        }
                )
                .register();
    }



    private void mapVagUzky(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiVagUzky.class, VagonBaseDTO.class)
                .field("nvaguf", "nvag")
                .field("kodownvag", "kpv")
                .field("grpodvag", "podSila")
                .field("mnetvag", "masTar")
                .field("dPlanrem", "plan_rem")
                .field("typevag", "type_no")
                .field("dlvag", "dlina")
                .field("osi", "kolOs")
                .field("sobs", "sobstv")
//                .field("owner", "owner")
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiVagUzky, VagonBaseDTO>() {
                            @Override
                            public void mapBtoA(VagonBaseDTO dto, NsiVagUzky nsiVagUzky, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    nsiVagUzky.setOwner(null);
                                } else {
                                    nsiVagUzky.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), nsiVagUzky.getOwner());
                                }
                            }
                        }
                )
                .register();
    }

    private void mapNsiVagShir(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiVagShir.class, NsiVagShirDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiVagShir, NsiVagShirDTO>() {
                            @Override
                            public void mapBtoA(NsiVagShirDTO dto, NsiVagShir vag, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    vag.setOwner(null);
                                } else {
                                    vag.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), vag.getOwner());
                                }
                            }
                        }
                )
                .byDefault()
                .register();

    }

    private void mapNsiVagUzky(MapperFactory mapperFactory) {
        mapperFactory.classMap(NsiVagUzky.class, NsiVagUzkyDTO.class)
                .fieldAToB("owner", "owner")
                .customize(
                        new CustomMapper<NsiVagUzky, NsiVagUzkyDTO>() {
                            @Override
                            public void mapBtoA(NsiVagUzkyDTO dto, NsiVagUzky vag, MappingContext context) {
                                if (dto.getOwner() == null || dto.getOwner().getHid() == null) {
                                    vag.setOwner(null);
                                } else {
                                    vag.setOwner(new NsiKyOwners());
                                    mapperFacade.map(dto.getOwner(), vag.getOwner());
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
