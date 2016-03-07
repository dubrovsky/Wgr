package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class CimSmgs2CimSmgs4ContList extends Smgs2Smgs4ContList {
    final private String TEXT = "Смотри прилагаемую ведомость ";
    final private String PLOMB = "SEALED";
    final private String CONTAINER = "CONTAINER";

    public CimSmgs2CimSmgs4ContList(Mapper mapper) {
        super(mapper);
    }

    @Override
    protected void setParams(CimSmgs source, CimSmgs dest, Search search, Map params,  List<CimSmgs> smgsy){
        dest.setType(search.getType());
        dest.setDocType1(BigDecimal.valueOf(search.getDocId()));
        dest.setKind(1);

        Map <Integer, CimSmgsGruz> gruzy = new TreeMap<>();
        Map <String, CimSmgsGruz> gruzTempMap = new HashMap<>();

        for(CimSmgs cimSmgs: smgsy){
            for (CimSmgsCarList car : cimSmgs.getCimSmgsCarLists().values()) {
                for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                    for(CimSmgsGruz gruz: kon.getCimSmgsGruzs().values() ){
                        CimSmgsGruz gruzTemp = gruzTempMap.get(gruz.getKgvn());
                        if(gruzTemp == null){
                            gruzTemp = mapper.copy(gruz, CimSmgsGruz.class);
                            gruzTemp.setPlaces(0);
                            gruzTemp.setMassa(BigDecimal.ZERO );
                            gruzTempMap.put(gruz.getKgvn(), gruzTemp);
                        }
                        gruzTemp.setPlaces(
                                (gruzTemp.getPlaces() == null ? 0 : gruzTemp.getPlaces()) +
                                        (gruz.getPlaces()== null ? 0 : gruz.getPlaces())
                        );
                        gruzTemp.setMassa(
                                (gruzTemp.getMassa() == null ? BigDecimal.ZERO : gruzTemp.getMassa())
                                        .add(
                                                gruz.getMassa() == null ? BigDecimal.ZERO : gruz.getMassa()
                                        )
                        );

                    }
                    break;
                }
                break;
            }
        }

        int index = 0;
        for(CimSmgsGruz gruz: gruzTempMap.values()){
            gruz.setSort(index);
            gruzy.put(index++, gruz);
        }

        Map <Byte, CimSmgsCarList> cars  = new TreeMap<Byte, CimSmgsCarList>();
        dest.setCimSmgsCarLists(cars);
        CimSmgsCarList car = new CimSmgsCarList();
        car.setSort((byte)0);
        car.setNvag(TEXT);
        cars.put((byte)0, car);

        Map <Byte, CimSmgsKonList> kons  = new TreeMap<Byte, CimSmgsKonList>();
        car.setCimSmgsKonLists(kons);
        CimSmgsKonList kon = new CimSmgsKonList();
        kon.setSort((byte) 0);
        kons.put((byte)0, kon);

        kon.setCimSmgsGruzs(gruzy);
        /*CimSmgsGruz gruz;
        if(gruzy.size() == 0) {
            gruz = new CimSmgsGruz();
            gruz.setCimSmgsKonList(kon);
            gruz.setSort(0);
            gruzy.put(0, gruz);
        } else {
            gruz = gruzy.values().iterator().next();
        }*/

        /*if(params.get("places") != null){
            gruz.setPlaces(Integer.valueOf(params.get("places").toString()));
        }*/

        if(params.get("sumDocs") != null){
            dest.setG2012(params.get("sumDocs") + " x " + PLOMB);
            kon.setNotes(params.get("sumDocs") + " x " + CONTAINER);
        }

        if(params.get("netto") != null){
//            gruz.setMassa(new BigDecimal(params.get("netto").toString()));
            dest.setG24N(new BigDecimal(params.get("netto").toString()));
        }
        if(params.get("tara") != null){
            dest.setG24T(new BigDecimal(params.get("tara").toString()));
        }
        if(params.get("brutto") != null){
            dest.setG24B(new BigDecimal(params.get("brutto").toString()));
        }

        CimSmgsDocs doc = new CimSmgsDocs();
        doc.setSort((byte)0);
        doc.setFieldNum("9");
        doc.setText(TEXT);
        dest.setCimSmgsDocses9(new TreeMap<Byte, CimSmgsDocs>());
        dest.getCimSmgsDocses9().put((byte)0, doc);
    }
}
