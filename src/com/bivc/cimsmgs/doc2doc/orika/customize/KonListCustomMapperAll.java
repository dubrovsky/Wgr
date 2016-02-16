package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsGruz;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.metadata.TypeBuilder;
import org.apache.commons.collections4.MapUtils;

import java.util.Map;
import java.util.TreeMap;

/**
 * Created by p.dzeviarylin on 14.12.2014 14:21.
 */
public class KonListCustomMapperAll extends CustomMapper<CimSmgsKonList, CimSmgsKonList> {
    @Override
    public void mapAtoB(CimSmgsKonList source, CimSmgsKonList destination, MappingContext context) {
        if (MapUtils.isNotEmpty(source.getCimSmgsGruzs())){
            Map<Integer, CimSmgsGruz> gruzListMapSrc = source.getCimSmgsGruzs();
            Map<Integer, CimSmgsGruz> gruzListMapDest = mapperFacade.mapAsMap(gruzListMapSrc, new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build(), new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build());
            destination.setCimSmgsGruzs(new TreeMap<Integer, CimSmgsGruz>(gruzListMapDest));
        }
    }
}
