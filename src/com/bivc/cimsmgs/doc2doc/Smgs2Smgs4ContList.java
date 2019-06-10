package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class Smgs2Smgs4ContList implements Doc2Doc{
    final static private Logger log = LoggerFactory.getLogger(Smgs2Smgs4ContList.class);
    final private String PRILOZHENIE_13 =   "Приложение 13.3";
    final private String G23_TEXT =         "Данные смотри на дополнительном листе ";

    public Mapper mapper;

    public Smgs2Smgs4ContList(Mapper mapper) {
        this.mapper = mapper;
    }
    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        Search search = action.getSearch();
        List<CimSmgs> smgsy = action.getSmgsDAO().findDocByNPoezd(search.getNpoezd(), search.getType(), search.getRouteId());
        if (smgsy.size() == 0) {
            throw new BusinessException("Ничего не найдено для поезда - " + search.getNpoezd());
        }

        CimSmgs source = smgsy.iterator().next();
        log.info("Create copy from doc with hid - " + source.getHid());


        CimSmgs dest = mapper.copy(source, CimSmgs.class);
        Map summary = action.getSmgsDAO().findData4SummaryDoc(search.getNpoezd(), search.getType(), search.getRouteId()).iterator().next();
        setParams(source, dest, search, summary, smgsy);
        dest.prepare4save();

        Route route = action.getRouteDAO().findById(search.getRouteId(), false);
        dest.setRoute(route);
        PackDoc pack = new PackDoc();
        pack.setRoute(route);
        pack.setUsrGroupsDir(action.getUsrGroupsDirDAO().findById(action.getUser().getUsr().getGroup().getName(), false));
        pack.addCimSmgsItem(dest);

        action.getPackDocDAO().makePersistent(pack);

        action.setSmgs(dest); // 4 status logging
    }

    @Override
    public String getResultMsg() {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    protected void setParams(CimSmgs source, CimSmgs dest, Search search, Map params,  List<CimSmgs> smgsy){
//        dest.setNpoezd("");
        dest.setType(search.getType());
        dest.setDocType1(BigDecimal.valueOf(search.getDocId()));
        dest.setKontKol(params.get("sumDocs").toString());
        dest.setKind(1); // svodnaya smgs

        dest.setStatus(null);
        dest.setTbcStatus((byte) 0);
        dest.setFtsStatus((byte) 0);
        dest.setBtlc_status(null);
        dest.setTdg_status1(null);
        dest.setTdg_status2(null);
//        dest.setVagPrim(PRILOZHENIE_13);

        Map <Integer, CimSmgsGruz> gruzy = new TreeMap<>();
        for (CimSmgsCarList car : source.getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
//                gruzy = mapper.copyGruzMap(kon.getCimSmgsGruzs());
                gruzy = mapper.copyMap(kon.getCimSmgsGruzs(), CimSmgsGruz.class);
                break;
            }
            break;
        }

        Map <Byte, CimSmgsCarList> cars  = new TreeMap<Byte, CimSmgsCarList>();
        dest.setCimSmgsCarLists(cars);
        CimSmgsCarList car = new CimSmgsCarList();
        car.setSort((byte)0);
        car.setNvag(PRILOZHENIE_13);
        cars.put((byte)0, car);

        Map <Byte, CimSmgsKonList> kons  = new TreeMap<Byte, CimSmgsKonList>();
        car.setCimSmgsKonLists(kons);
        CimSmgsKonList kon = new CimSmgsKonList();
        kon.setSort((byte)0);
        kon.setUtiN(PRILOZHENIE_13);
        kons.put((byte)0, kon);

        kon.setCimSmgsGruzs(gruzy);
        CimSmgsGruz gruz;
        if(gruzy.size() == 0) {
            gruz = new CimSmgsGruz();
            gruz.setCimSmgsKonList(kon);
            gruz.setSort(0);
            gruzy.put(0, gruz);
        } else {
            gruz = gruzy.values().iterator().next();
        }

        if(params.get("places") != null){
            gruz.setPlaces(Integer.valueOf(params.get("places").toString()));
        }

        if(params.get("netto") != null){
            dest.setG24N(new BigDecimal(params.get("netto").toString()));
        }
        if(params.get("tara") != null){
            dest.setG24T(new BigDecimal(params.get("tara").toString()));
        }
        if(params.get("brutto") != null){
            dest.setG24B(new BigDecimal(params.get("brutto").toString()));
        }

        CimSmgsDocs doc = new CimSmgsDocs();
        doc.setSort(0);
        doc.setFieldNum("9");
        doc.setText(G23_TEXT);
        dest.setCimSmgsDocses9(new TreeMap<Integer, CimSmgsDocs>());
        dest.getCimSmgsDocses9().put(0, doc);

        CimSmgsPlomb plomb = new CimSmgsPlomb();
        plomb.setSort((byte)0);
        plomb.setZnak(PRILOZHENIE_13);
        dest.setCimSmgsPlombs(new TreeMap<Byte, CimSmgsPlomb>());
        dest.getCimSmgsPlombs().put((byte)0, plomb);
    }
}
