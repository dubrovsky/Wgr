package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.metadata.TypeBuilder;
import org.apache.commons.collections4.MapUtils;

import java.util.Map;
import java.util.TreeMap;

/**
 * Created by p.dzeviarylin on 14.12.2014 14:16.
 */
public class CarListCustomMapperAll extends CustomMapper<CimSmgsCarList, CimSmgsCarList> {
    @Override
    public void mapAtoB(CimSmgsCarList source, CimSmgsCarList destination, MappingContext context) {
        if (MapUtils.isNotEmpty(source.getCimSmgsKonLists())){
            Map<Byte, CimSmgsKonList> konListMapSrc = source.getCimSmgsKonLists();
            Map<Byte, CimSmgsKonList> konListMapDest = mapperFacade.mapAsMap(konListMapSrc, new TypeBuilder<TreeMap<Byte, CimSmgsKonList>>(){}.build(), new TypeBuilder<TreeMap<Byte, CimSmgsKonList>>(){}.build());
            destination.setCimSmgsKonLists(new TreeMap<>(konListMapDest));
        }
    }
}
