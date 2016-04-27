package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgsDocs;
import com.bivc.cimsmgs.db.CimSmgsGruz;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import com.bivc.cimsmgs.db.CimSmgsPlomb;
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
            Map<Byte, CimSmgsGruz> gruzListMapSrc = source.getCimSmgsGruzs();
            Map<Byte, CimSmgsGruz> gruzListMapDest = mapperFacade.mapAsMap(gruzListMapSrc, new TypeBuilder<Map<Byte, CimSmgsGruz>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsGruz>>(){}.build());
            destination.setCimSmgsGruzs(new TreeMap<>(gruzListMapDest));
        }
        if (MapUtils.isNotEmpty(source.getCimSmgsDocses9())){
            Map<Byte, CimSmgsDocs> docs9MapSrc = source.getCimSmgsDocses9();
            Map<Byte, CimSmgsDocs> docs9MapDest = mapperFacade.mapAsMap(docs9MapSrc, new TypeBuilder<Map<Byte, CimSmgsDocs>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsDocs>>(){}.build());
            destination.setCimSmgsDocses9(new TreeMap<>(docs9MapDest));
        }
        if (MapUtils.isNotEmpty(source.getCimSmgsPlombs())){
            Map<Byte, CimSmgsPlomb> plombsMapSrc = source.getCimSmgsPlombs();
            Map<Byte, CimSmgsPlomb> plombsMapDest = mapperFacade.mapAsMap(plombsMapSrc, new TypeBuilder<Map<Byte, CimSmgsPlomb>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsPlomb>>(){}.build());
            destination.setCimSmgsPlombs(new TreeMap<>(plombsMapDest));
        }
    }
}
