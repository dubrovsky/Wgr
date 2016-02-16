package com.bivc.cimsmgs.doc2doc.orika;

import com.bivc.cimsmgs.db.*;
import ma.glasnost.orika.Mapper;
import ma.glasnost.orika.MapperFactory;
import ma.glasnost.orika.impl.ConfigurableMapper;
import ma.glasnost.orika.impl.DefaultMapperFactory;
import ma.glasnost.orika.metadata.ClassMapBuilder;

public class CimSmgsConfigMapper extends ConfigurableMapper {
    private Mapper<CimSmgs, CimSmgs> cimSmgsMapper;
    private Mapper<CimSmgsKonList, CimSmgsKonList> cimSmgsKonListMapper;
    private Mapper<CimSmgsCarList, CimSmgsCarList> cimSmgsCarListMapper;
    private Mapper<CimSmgsGruz, CimSmgsGruz> cimSmgsGruzMapper;
    private Mapper<CimSmgsDocs, CimSmgsDocs> cimSmgsDocsMapper;
    private Mapper<CimSmgsPlatel, CimSmgsPlatel> cimSmgsPlatelMapper;
    private Mapper<CimSmgsPlomb, CimSmgsPlomb> cimSmgsPlombMapper;
    private Mapper<CimSmgsPerevoz, CimSmgsPerevoz> cimSmgsPerevozMapper;
    private String[] cimSmgsExcludes;
    private String[] cimSmgsKonListExcludes;
    private String[] cimSmgsCarListExcludes;

    public CimSmgsConfigMapper() {
        super(false);
    }

    @Override
    protected void configure(MapperFactory mapperFactory) {
        mapCimSmgsPlatel(mapperFactory);

        mapCimSmgsDocs(mapperFactory);

        mapCimSmgsPlomb(mapperFactory);

        mapCimSmgsPerevoz(mapperFactory);

        mapCimSmgsCarList(mapperFactory);

        mapCimSmgsKonList(mapperFactory);

        mapCimSmgsGruz(mapperFactory);

        mapCimSmgs(mapperFactory);

    }

    private void addExcludes(ClassMapBuilder classMapBuilder, String[] excludes) {
        if(excludes != null) {
            for (String exclude : excludes) {
                classMapBuilder.exclude(exclude);
            }
        }
    }

    protected void mapCimSmgs(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgs, CimSmgs> classMapBuilder = mapperFactory.classMap(CimSmgs.class, CimSmgs.class)
                .exclude("hid")
                .exclude("type")
                .exclude("docType1")
                .exclude("sort")
                .exclude("ready")
                .exclude("status")
                .exclude("tbcStatus")
                .exclude("ftsStatus")
                .exclude("btlc_status")
                .exclude("tdg_status1")
                .exclude("tdg_status2")

                .exclude("route")
                .exclude("packDoc")
                .exclude("cimSmgs")
                .exclude("cimSmgses")
                .exclude("iftminLogs")
                .exclude("iftminLogsBtlc")
                /*.exclude("cimSmgsPlombs")
                .exclude("cimSmgsDocses7")
                .exclude("cimSmgsCarLists")*/
                .exclude("statuses")
                /*.exclude("cimSmgsDocses9")
                .exclude("cimSmgsDocses136")
                .exclude("cimSmgsDocses13")
                .exclude("cimSmgsPlatels")*/
                .exclude("iftminLogs")
                .exclude("iftminLogsBtlc")
                .exclude("tdgLog")
                .exclude("tbc2Logs")
                .exclude("csComnt")
                .exclude("trans")
                .exclude("un")
                .exclude("dattr")
                .exclude("altered")
                .exclude("iftminId")
                .exclude("iftminOut")
                .exclude("iftminIn");

        addExcludes(classMapBuilder, cimSmgsExcludes);

        /*if(getCimSmgsExcludes() != null){
            for (String exclude : getCimSmgsExcludes()) {
                classMapBuilder.exclude(exclude);
            }
        }*/

        classMapBuilder
                .byDefault()
                .constructorB()
                .customize(cimSmgsMapper)
                .register();


    }

//    protected String[] getCimSmgsExcludes() {
//        return new String[]{"cimSmgsCarLists"};
//    }

    protected void mapCimSmgsGruz(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsGruz.class, CimSmgsGruz.class)
                .exclude("hid")
                .exclude("cimSmgsKonList")
                .exclude("cimSmgsCarList")
                .exclude("dattr")
                .constructorB()
                .byDefault()
                .customize(cimSmgsGruzMapper)
                .register();
    }

    protected void mapCimSmgsKonList(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsKonList, CimSmgsKonList> classMapBuilder = mapperFactory.classMap(CimSmgsKonList.class, CimSmgsKonList.class)
                .exclude("hid")
                .exclude("cimSmgsCarList")
//                .exclude("cimSmgsGruzs")
                .exclude("trans")
                .exclude("un")
                .exclude("dattr");
        addExcludes(classMapBuilder, cimSmgsKonListExcludes);
        /*if(getCimSmgsKonListExcludes() != null){
            for (String exclude : getCimSmgsKonListExcludes()) {
                classMapBuilder.exclude(exclude);
            }
        }*/
        classMapBuilder
                .constructorB()
                .byDefault()
                .customize(cimSmgsKonListMapper)
                .register();
    }

//    protected String[] getCimSmgsKonListExcludes() {
//        return new String[]{"cimSmgsGruzs"};
//    }

    protected void mapCimSmgsCarList(MapperFactory mapperFactory) {
        ClassMapBuilder<CimSmgsCarList, CimSmgsCarList> classMapBuilder = mapperFactory.classMap(CimSmgsCarList.class, CimSmgsCarList.class)
                .exclude("hid")
                .exclude("cimSmgs")
                .exclude("cimSmgsGruzs")
               /* .exclude("cimSmgsKonLists")*/
                .exclude("trans")
                .exclude("un")
                .exclude("dattr");
        addExcludes(classMapBuilder, cimSmgsCarListExcludes);
        /*if(getCimSmgsCarListExcludes() != null){
            for (String exclude : getCimSmgsCarListExcludes()) {
                classMapBuilder.exclude(exclude);
            }
        }*/
        classMapBuilder
                .constructorB()
                .byDefault()
                .customize(cimSmgsCarListMapper)
                .register();
    }

//    protected String[] getCimSmgsCarListExcludes() {
//        return new String[]{"cimSmgsGruzs", "cimSmgsKonLists"};
//    }

    protected void mapCimSmgsDocs(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsDocs.class, CimSmgsDocs.class)
                .exclude("hid")
                .exclude("cimSmgs")
                .exclude("dattr")
                .constructorB()
                .byDefault()
                .customize(cimSmgsDocsMapper)
                .register();
    }

    protected void mapCimSmgsPlatel(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsPlatel.class, CimSmgsPlatel.class)
                .exclude("hid")
                .exclude("cimSmgs")
                .exclude("dattr")
                .constructorB()
                .byDefault()
                .customize(cimSmgsPlatelMapper)
                .register();
    }

    protected void mapCimSmgsPlomb(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsPlomb.class, CimSmgsPlomb.class)
                .exclude("hid")
                .exclude("cimSmgs")
                .exclude("dattr")
                .constructorB()
                .byDefault()
                .customize(cimSmgsPlombMapper)
                .register();
    }

    protected void mapCimSmgsPerevoz(MapperFactory mapperFactory) {
        mapperFactory.classMap(CimSmgsPerevoz.class, CimSmgsPerevoz.class)
                .exclude("hid")
                .exclude("cimSmgs")
                .exclude("dattr")
                .constructorB()
                .byDefault()
                .customize(cimSmgsPerevozMapper)
                .register();
    }

    @Override
    protected void configureFactoryBuilder(DefaultMapperFactory.Builder factoryBuilder) {
        factoryBuilder.mapNulls(false);
    }


    public Mapper<CimSmgs, CimSmgs> getCimSmgsMapper() {
        return cimSmgsMapper;
    }

    public void setCimSmgsMapper(Mapper<CimSmgs, CimSmgs> cimSmgsMapper) {
        this.cimSmgsMapper = cimSmgsMapper;
    }

    public Mapper<CimSmgsGruz, CimSmgsGruz> getCimSmgsGruzMapper() {
        return cimSmgsGruzMapper;
    }

    public void setCimSmgsGruzMapper(Mapper<CimSmgsGruz, CimSmgsGruz> cimSmgsGruzMapper) {
        this.cimSmgsGruzMapper = cimSmgsGruzMapper;
    }

    public Mapper<CimSmgsKonList, CimSmgsKonList> getCimSmgsKonListMapper() {
        return cimSmgsKonListMapper;
    }

    public void setCimSmgsKonListMapper(Mapper<CimSmgsKonList, CimSmgsKonList> cimSmgsKonListMapper) {
        this.cimSmgsKonListMapper = cimSmgsKonListMapper;
    }

    public Mapper<CimSmgsCarList, CimSmgsCarList> getCimSmgsCarListMapper() {
        return cimSmgsCarListMapper;
    }

    public void setCimSmgsCarListMapper(Mapper<CimSmgsCarList, CimSmgsCarList> cimSmgsCarListMapper) {
        this.cimSmgsCarListMapper = cimSmgsCarListMapper;
    }

    public Mapper<CimSmgsDocs, CimSmgsDocs> getCimSmgsDocsMapper() {
        return cimSmgsDocsMapper;
    }

    public void setCimSmgsDocsMapper(Mapper<CimSmgsDocs, CimSmgsDocs> cimSmgsDocsMapper) {
        this.cimSmgsDocsMapper = cimSmgsDocsMapper;
    }

    public Mapper<CimSmgsPlatel, CimSmgsPlatel> getCimSmgsPlatelMapper() {
        return cimSmgsPlatelMapper;
    }

    public void setCimSmgsPlatelMapper(Mapper<CimSmgsPlatel, CimSmgsPlatel> cimSmgsPlatelMapper) {
        this.cimSmgsPlatelMapper = cimSmgsPlatelMapper;
    }

    public Mapper<CimSmgsPlomb, CimSmgsPlomb> getCimSmgsPlombMapper() {
        return cimSmgsPlombMapper;
    }

    public void setCimSmgsPlombMapper(Mapper<CimSmgsPlomb, CimSmgsPlomb> cimSmgsPlombMapper) {
        this.cimSmgsPlombMapper = cimSmgsPlombMapper;
    }

    public void setCimSmgsExcludes(String[] cimSmgsExcludes) {
        this.cimSmgsExcludes = cimSmgsExcludes;
    }

    public void setCimSmgsKonListExcludes(String[] cimSmgsKonListExcludes) {
        this.cimSmgsKonListExcludes = cimSmgsKonListExcludes;
    }

    public void setCimSmgsCarListExcludes(String[] cimSmgsCarListExcludes) {
        this.cimSmgsCarListExcludes = cimSmgsCarListExcludes;
    }

    public Mapper<CimSmgsPerevoz, CimSmgsPerevoz> getCimSmgsPerevozMapper() {
        return cimSmgsPerevozMapper;
    }

    public void setCimSmgsPerevozMapper(Mapper<CimSmgsPerevoz, CimSmgsPerevoz> cimSmgsPerevozMapper) {
        this.cimSmgsPerevozMapper = cimSmgsPerevozMapper;
    }
}
