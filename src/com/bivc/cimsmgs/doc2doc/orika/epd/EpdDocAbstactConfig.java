package com.bivc.cimsmgs.doc2doc.orika.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.ClassMapBuilder;

/**
 * Created by peter on 03.10.2014.
 */
public class EpdDocAbstactConfig extends ConfigurableMapper {
    private Mapper<CimSmgs, CimSmgs> cimSmgsMapper;
    private Mapper<CimSmgsCarList, CimSmgsCarList> carListMapper;

    public EpdDocAbstactConfig(Mapper<CimSmgs, CimSmgs> cimSmgsMapper, Mapper<CimSmgsCarList, CimSmgsCarList> carListMapper) {
        super(false);
        this.cimSmgsMapper = cimSmgsMapper;
        this.carListMapper = carListMapper;
    }

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapCarList(mapperFactory);

        mapKonList(mapperFactory);

        mapCimSmgs(mapperFactory);

    }

    private void mapCimSmgs(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgs, CimSmgs> classMapBuilder =
                mapperFactory.classMap(CimSmgs.class, CimSmgs.class)
                        .field("g1r", "g1r")
                        .field("g19r", "g19r")
                        .field("g4r", "g4r")
                        .field("g49r", "g49r")
                        .field("g162r", "g162r")
                        .field("g692", "g692")
                ;

        classMapBuilder
                .customize(cimSmgsMapper)
                .register();
    }

    private void mapCarList(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsCarList, CimSmgsCarList> classMapBuilder =
                mapperFactory.classMap(CimSmgsCarList.class, CimSmgsCarList.class)
                        .field("sort", "sort")
                ;

        classMapBuilder
                .customize(carListMapper)
                .register();
    }

    private void mapKonList(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsKonList, CimSmgsKonList> classMapBuilder =
                mapperFactory.classMap(CimSmgsKonList.class, CimSmgsKonList.class)
                        .field("sort", "sort")
                        .field("utiN", "utiN")
                        .field("vid", "vid");

        classMapBuilder
                .register();
    }
}
