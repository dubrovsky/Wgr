package com.bivc.cimsmgs.doc2doc.orika.customize;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsDocs;
import com.bivc.cimsmgs.db.CimSmgsPlatel;
import com.bivc.cimsmgs.db.CimSmgsPlomb;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

import java.util.TreeMap;

/**
 * Created by peter on 07.04.2014.
 */
public class CimSmgsAllCopyCustomMapper extends CustomMapper<CimSmgs, CimSmgs> {
    @Override
    public void mapAtoB(CimSmgs cimSmgsSource, CimSmgs cimSmgsDestination, MappingContext context) {
        ///
//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsPlatels())) {
            cimSmgsDestination.setCimSmgsPlatels(new TreeMap<Byte, CimSmgsPlatel>(cimSmgsDestination.getCimSmgsPlatels()));
//        }
//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsDocses13())) {
            cimSmgsDestination.setCimSmgsDocses13(new TreeMap<Byte, CimSmgsDocs>(cimSmgsDestination.getCimSmgsDocses13()));
//        }

//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsDocses136())) {
            cimSmgsDestination.setCimSmgsDocses136(new TreeMap<Byte, CimSmgsDocs>(cimSmgsDestination.getCimSmgsDocses136()));
//        }
//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsDocses7())) {
            cimSmgsDestination.setCimSmgsDocses7(new TreeMap<Byte, CimSmgsDocs>(cimSmgsDestination.getCimSmgsDocses7()));
//        }
//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsDocses9())) {
            cimSmgsDestination.setCimSmgsDocses9(new TreeMap<Byte, CimSmgsDocs>(cimSmgsDestination.getCimSmgsDocses9()));
//        }
//        if (MapUtils.isNotEmpty(cimSmgsDestination.getCimSmgsPlombs())) {
            cimSmgsDestination.setCimSmgsPlombs(new TreeMap<Byte, CimSmgsPlomb>(cimSmgsDestination.getCimSmgsPlombs()));
//        }

        /*if (MapUtils.isNotEmpty(cimSmgsSource.getCimSmgsCarLists())){
            Map<Byte, CimSmgsCarList> carListMapSrc = cimSmgsSource.getCimSmgsCarLists();
            Map<Byte, CimSmgsCarList> carListMapDest = mapperFacade.mapAsMap(carListMapSrc, new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsCarList>>(){}.build());
            cimSmgsDestination.setCimSmgsCarLists(carListMapDest);
            for (Map.Entry<Byte, CimSmgsCarList> carListSrc : carListMapSrc.entrySet()) {
                Map<Byte, CimSmgsKonList> konListMapSrc = carListSrc.getValue().getCimSmgsKonLists();
                if(MapUtils.isNotEmpty(konListMapSrc)){
                    Map<Byte, CimSmgsKonList> konListMapDest = mapperFacade.mapAsMap(konListMapSrc, new TypeBuilder<Map<Byte, CimSmgsKonList>>(){}.build(), new TypeBuilder<Map<Byte, CimSmgsKonList>>(){}.build());
                    carListMapDest.get(carListSrc.getKey()).setCimSmgsKonLists(konListMapDest);

                    for (Map.Entry<Byte, CimSmgsKonList> konListSrc : konListMapSrc.entrySet()) {
                        Map<Integer, CimSmgsGruz> gruzListMapSrc = konListSrc.getValue().getCimSmgsGruzs();
                        if(MapUtils.isNotEmpty(gruzListMapSrc)){
                            Map<Integer, CimSmgsGruz> gruzListMapDest = mapperFacade.mapAsMap(gruzListMapSrc, new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build(), new TypeBuilder<Map<Integer, CimSmgsGruz>>(){}.build());
                            konListMapDest.get(konListSrc.getKey()).setCimSmgsGruzs(gruzListMapDest);
                        }
                    }
                }
            }
        }*/

        /*if (MapUtils.isNotEmpty(destination.getCimSmgsCarLists())) {
            Map<Byte, CimSmgsCarList> carListMap = new TreeMap<Byte, CimSmgsCarList>(destination.getCimSmgsCarLists());
            destination.setCimSmgsCarLists(carListMap);
            for(CimSmgsCarList cimSmgsCarList : carListMap.values()){
                if (MapUtils.isNotEmpty(cimSmgsCarList.getCimSmgsKonLists())) {
                    Map<Byte, CimSmgsKonList> konListMap = new TreeMap<Byte, CimSmgsKonList>(cimSmgsCarList.getCimSmgsKonLists());
                    cimSmgsCarList.setCimSmgsKonLists(konListMap);
                    for(CimSmgsKonList cimSmgsKonList : konListMap.values()){
                        if (MapUtils.isNotEmpty(cimSmgsKonList.getCimSmgsGruzs())) {
                            Map<Integer, CimSmgsGruz> cimSmgsGruzMap = new TreeMap<Integer, CimSmgsGruz>(cimSmgsKonList.getCimSmgsGruzs());
                            cimSmgsKonList.setCimSmgsGruzs(cimSmgsGruzMap);
                        }
                    }
                }
            }
        }*/

    }
}