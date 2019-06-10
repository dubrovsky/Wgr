package com.bivc.cimsmgs.doc2doc.orika.config.ky;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import com.bivc.cimsmgs.db.CimSmgsKonList;
import com.bivc.cimsmgs.db.CimSmgsPlomb;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.Plomb;
import com.bivc.cimsmgs.db.ky.Vagon;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.MappingContext;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.metadata.ClassMapBuilder;
import org.apache.commons.collections4.CollectionUtils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * @author p.dzeviarylin
 */
public class Ky2DocBaseConfig extends ConfigurableMapper {

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapKont(mapperFactory);
        mapVag(mapperFactory);
        mapPlomb(mapperFactory);
    }

    private void addFields(ClassMapBuilder classMapBuilder, Map<String, String> fields) {
        for (Map.Entry<String, String> field : fields.entrySet()) {
            classMapBuilder.field(field.getKey(), field.getValue());
        }
    }

    protected Map<String, String> getKontFields(){
        return new HashMap<String, String>(){{
            put("type", "sizeFoot");
            put("vid", "vid");
            put("vagonOut", "cimSmgsCarList");
            put("massa_tar", "cimSmgsCarList.cimSmgs.g24T");
        }};
    }

    protected void mapKont(final MapperFactory mapperFactory) {
        ClassMapBuilder<Kont, CimSmgsKonList> classMapBuilder = mapperFactory.classMap(Kont.class, CimSmgsKonList.class);
        addFields(classMapBuilder, getKontFields());

        classMapBuilder
                .customize(
                        new CustomMapper<Kont, CimSmgsKonList>() {
                            @Override
                            public void mapAtoB(Kont kont, CimSmgsKonList cimSmgsKonList, MappingContext context) {
                                CimSmgs cimSmgs = cimSmgsKonList.getCimSmgsCarList().getCimSmgs();
                                if(CollectionUtils.isNotEmpty(kont.getPlombs())){
                                    cimSmgs.getCimSmgsPlombs().clear();
                                    Map<Byte, CimSmgsPlomb> cimSmgsPlombs = cimSmgs.getCimSmgsPlombs();
                                    Iterator<Plomb> plombIterator = kont.getPlombs().iterator();
                                    byte sort = 0;
                                    do {
                                        CimSmgsPlomb cimSmgsPlomb = mapperFacade.map(plombIterator.next(), CimSmgsPlomb.class);
                                        cimSmgsPlomb.setSort(sort);
                                        cimSmgsPlombs.put(sort++, cimSmgsPlomb);
                                    } while (plombIterator.hasNext());

                                }
                            }
                            /*@Override
                            public void mapBtoA(CimSmgsKonList cimSmgsKonList, Kont kont, MappingContext context) {
                                super.mapBtoA(cimSmgsKonList, kont, context);
                            }*/
                        }
                )/*.customize(new EpdDocCustomMapper())*/
                .register();
    }

    protected Map<String, String> getVagonFields(){
        return new HashMap<String, String>(){{
            put("nvag", "nvag");
            put("podSila", "grPod");
            put("masTar", "taraVag");
            put("kolOs", "kolOs");
//            put("massa_tar","g_24_t");
        }};
    }

    protected void mapVag(MapperFactory mapperFactory) {
        ClassMapBuilder<Vagon, CimSmgsCarList> classMapBuilder = mapperFactory.classMap(Vagon.class, CimSmgsCarList.class);
        addFields(classMapBuilder, getVagonFields());

        classMapBuilder/*.customize(new EpdDocCustomMapper())*/.register();
    }

    protected Map<String, String> getPlombFields(){
        return new HashMap<String, String>(){{
            put("kpl", "kpl");
            put("znak", "znak");
        }};
    }

    protected void mapPlomb(MapperFactory mapperFactory) {
        ClassMapBuilder<Plomb, CimSmgsPlomb> classMapBuilder = mapperFactory.classMap(Plomb.class, CimSmgsPlomb.class);
        addFields(classMapBuilder, getPlombFields());

        classMapBuilder/*.customize(new EpdDocCustomMapper())*/.register();
    }
}
