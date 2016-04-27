package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.exceptions.BusinessException;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.*;

public class Aviso2SmgsAppend implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(Aviso2SmgsAppend.class);
    private Mapper mapper;
    /*private CimSmgs aviso;
    private List<CimSmgs> smgsy;*/
    private Doc2Doc_A action;
    private final String resultStr1 = "Обработано %s накладных";
    private final String resultStr2 = "Идет пакетная обработка данных. Проверьте состояние отправки через некоторое время, обновив список";
    private String resultMsg;

    public Aviso2SmgsAppend(Mapper mapper) {
        this.mapper = mapper;
    }

    private static synchronized Integer append(Aviso2SmgsAppend _this) throws Exception {
        Integer appended = 0;
        Map<Byte, CimSmgsGruz> grusy = new TreeMap<>();
        String nvag = null;
        try {
            HibernateUtil.beginTransaction();
            Search search = _this.getAction().getSearch();
            CimSmgs aviso = _this.getAction().getSmgsDAO().findById(search.getHid(), false);

            int type = findDocType(search);

            List<CimSmgs> smgsy = _this.getAction().getSmgsDAO().findDocsByNPoezd(search.getNpoezd(), /*search.getType() == 3 ? 2 : aviso.getGu()*/type, search.getRouteId());
            for (CimSmgsCarList car : aviso.getCimSmgsCarLists().values()) {      // find grusy
                nvag = car.getNvag();
                for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                    grusy = kon.getCimSmgsGruzs();
                    break;
                }
                break;
            }

            _this.getAction().setSmgsy(new ArrayList<CimSmgs>()); // 4 status logging
            for (CimSmgs target : smgsy) {
                String nPoezd = target.getNpoezd();
                _this.getMapper().copy(aviso, target);

                target.setNpoezd(nPoezd);

                String utiN;
                boolean foundTarget = false;
                for (CimSmgsCarList car : aviso.getCimSmgsCarLists().values()) {      // find same cont in Aviso and smgs
                    for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                        if ((utiN = StringUtils.defaultString(kon.getUtiN())).length() > 0) {

                            for (CimSmgsCarList targetCar : target.getCimSmgsCarLists().values()) {
                                for (CimSmgsKonList targetKon : targetCar.getCimSmgsKonLists().values()) {
                                    if (utiN.equals(StringUtils.defaultString(targetKon.getUtiN()))) {  // equals konts
                                        _this.getMapper().copy(car, targetCar);
                                        _this.getMapper().copy(kon, targetKon);
//                                        _this.getMapper().copyMap(grusy, targetKon.getCimSmgsGruzs(), CimSmgsGruz.class, Integer.class);
//                                        Map<Integer, CimSmgsGruz> grusyCopy = _this.getMapper().copyMap(grusy, CimSmgsGruz.class);
                                        for(CimSmgsGruz gruz : grusy.values()){  // add gruz to target collection
                                            CimSmgsGruz destination = _this.getMapper().copy(gruz, CimSmgsGruz.class);
                                            int sort = targetKon.getCimSmgsGruzs().size();
                                            destination.setSort(sort);
                                            targetKon.getCimSmgsGruzs().put((byte)sort, destination);
                                        }

//                                        _this.getMapper().copyGruzMap(grusy, targetKon.getCimSmgsGruzs());
                                    /*Map<Byte, CimSmgsGruz> grusyCopy = _this.getMapper().copyGruzMap(grusy);
                                    for(CimSmgsGruz gruz : grusyCopy.values()){
                                        byte sort = (byte) targetKon.getCimSmgsGruzs().size();
                                        gruz.setSort(sort);
                                        targetKon.getCimSmgsGruzs().put(sort, gruz);
                                    }*/
                                        foundTarget = true;
                                    }
                                    break;
                                }
                                break;
                            }
                            if (foundTarget) {
                                break;
                            }
                        }

                    }
                    if (foundTarget) {
                        break;
                    }
                }
                target.prepare4save(/*null*/);
                _this.getAction().getSmgsDAO().makePersistent(target);
                _this.getAction().getSmgsy().add(target); // 4 status logging
                appended++;

                // add inf to invoices
                for (CimSmgsInvoice inv : target.getPackDoc().getCsInvoices()) {
                    if (nvag != null) {
                        inv.setNvag(nvag);
                    }

                    inv.setNotd(StringUtils.defaultString(target.getG1r()).trim());
                    inv.setCountry_o("PL"/*StringUtils.defaultString(cs.getG15_1()).trim()*/);
                    inv.setZip_o(StringUtils.defaultString(target.getG17_1()).trim());
                    inv.setCity_o(StringUtils.defaultString(target.getG18r_1()).trim());
                    inv.setAdres_o(StringUtils.defaultString(target.getG19r()).trim());

                    inv.setNpol(StringUtils.defaultString(target.getG4r()).trim());
                    inv.setCountry_p("RU"/*StringUtils.defaultString(cs.getG45_1()).trim()*/);
                    inv.setZip_p(StringUtils.defaultString(target.getG47_1()).trim());
                    inv.setCity_p(StringUtils.defaultString(target.getG48r()).trim());
                    inv.setAdres_p(StringUtils.defaultString(target.getG49r()).trim());
                    _this.getAction().getInvoiceDAO().makePersistent(inv);
                }
            }

            _this.getAction().setSmgs(aviso); // 4 status logging
            aviso.setReady("3");
            aviso.setStatus(_this.getAction().getStatus());
            _this.getAction().getSmgsDAO().makePersistent(aviso);
            HibernateUtil.commitTransaction();
        } catch (Exception e) {
            HibernateUtil.rollbackTransaction();
            log.error(e.getMessage(), e);
            throw e;
        }


        return appended;
    }

    private static int findDocType(Search search) throws Exception {
        int type;
        if(search.getType() == 3){ // aviso1
            type = 2;   // smgs
        } else if (search.getType() == 10){ //  avisocimsmgs
            type = 1; // smgs
        } else if (search.getType() == 11){   //  aviso2
            type = 12; // smgs2
        } else {
            throw new Exception("Invalid document type - " + search.getType());
        }
        return type;
    }

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");

//        Search search = action.getSearch();
        this.action = action;
//        CimSmgs aviso = action.getSmgsDAO().findById(search.getHid(), false);
//        List<CimSmgs> smgsy = action.getSmgsDAO().findDocsByNPoezd(search.getNpoezd(), search.getType() == 3 ? 2 : aviso.getGu());  // type 3 - aviso, type 2 - smgs

        int type = findDocType(action.getSearch());

        Long count = action.getSmgsDAO().countDocsByNPoezd(action.getSearch().getNpoezd(), type, action.getSearch().getRouteId());
        if (count == 0) {
            throw new BusinessException("Ничего не найдено для поезда - " + action.getSearch().getNpoezd());
        }

        class MyCallable implements Callable<Integer> {
            private Aviso2SmgsAppend this_;

            public MyCallable(Aviso2SmgsAppend var) {
                this_ = var;
            }

            @Override
            public Integer call() throws Exception {
                return append(this_);
            }
//            @Override
//            public List<Long> call() throws Exception {
//                return sendIftmins(this_);
//            }
        }
        ExecutorService executor = null;
        try {
            executor = Executors.newSingleThreadExecutor();
            Future<Integer> result = executor.submit(new MyCallable(this));
            int appended = result.get(25000, TimeUnit.MILLISECONDS);
            resultMsg = String.format(resultStr1, appended);
        } catch (TimeoutException e) {
            resultMsg = resultStr2;
            log.warn(e.toString());
        } finally {
            if (executor != null) {
                executor.shutdown();
            }
        }
    }

    @Override
    public String getResultMsg() {
        return resultMsg;  //To change body of implemented methods use File | Settings | File Templates.
    }

    public Mapper getMapper() {
        return mapper;
    }

    public void setMapper(Mapper mapper) {
        this.mapper = mapper;
    }

    /*public CimSmgs getAviso() {
        return aviso;
    }

    public void setAviso(CimSmgs aviso) {
        this.aviso = aviso;
    }

    public List<CimSmgs> getSmgsy() {
        return smgsy;
    }

    public void setSmgsy(List<CimSmgs> smgsy) {
        this.smgsy = smgsy;
    }*/

    public Doc2Doc_A getAction() {
        return action;
    }

    public void setAction(Doc2Doc_A action) {
        this.action = action;
    }
}
