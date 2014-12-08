package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.*;
import org.apache.commons.collections.MapUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

public class Aviso2SmgsGu implements Doc2Doc {
    final static private Logger log = LoggerFactory.getLogger(Aviso2SmgsGu.class);

    private Mapper mapper;

    private final String resultStr = "Обработано %s накладных";
    private String resultMsg;

    public Aviso2SmgsGu(Mapper mapper) {
        this.mapper = mapper;
    }

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        log.info("convert");
        action.setSmgs(action.getSmgsDAO().findById(action.getSearch().getHid(), false));  // 4 status logging

        CimSmgsCarList[] srcVag = new CimSmgsCarList[0];
        Map<Integer, CimSmgsGruz> srcGruzs = null;

        if (action.getSmgs().getCimSmgsCarLists().size() > 0) {
            srcVag = action.getSmgs().getCimSmgsCarLists().values().toArray(srcVag);
            if (srcVag[0].getCimSmgsKonLists().size() > 0) {
                srcGruzs = srcVag[0].getCimSmgsKonLists().values().iterator().next().getCimSmgsGruzs();
            }
        }

        CimSmgs toSmgs;
        CimSmgsCarList toVag;
        action.setSmgsy(new ArrayList<CimSmgs>()); // 4 status logging
        for (int i = 0; i < action.getSmgs().getAmount(); i++) {
//            toSmgs = mapper.copy(action.getSmgs());
            toSmgs = mapper.copy(action.getSmgs(), CimSmgs.class);
            if (srcVag.length > i) {
//                toVag = mapper.copy(srcVag[i]);
                toVag = mapper.copy(srcVag[i], CimSmgsCarList.class);
                if (srcVag[i].getCimSmgsKonLists().size() > 0) {
//                    toVag.getCimSmgsKonLists().put((byte) 0, mapper.copy(srcVag[i].getCimSmgsKonLists().values().iterator().next()));
                    toVag.getCimSmgsKonLists().put((byte) 0, mapper.copy(srcVag[i].getCimSmgsKonLists().values().iterator().next(), CimSmgsKonList.class));
                } else {
                    toVag.getCimSmgsKonLists().put((byte) 0, new CimSmgsKonList(null, toVag, (byte) 0));
                }
            } else {
                toVag = new CimSmgsCarList(null, toSmgs, (byte) 0);
                toVag.getCimSmgsKonLists().put((byte) 0, new CimSmgsKonList(null, toVag, (byte) 0));
            }

            if (MapUtils.isNotEmpty(srcGruzs)) {
                toVag.getCimSmgsKonLists().values().iterator().next().setCimSmgsGruzs(mapper.copyMap(srcGruzs, CimSmgsGruz.class));
            }

            toSmgs.getCimSmgsCarLists().put((byte) 0, toVag);

            toSmgs.setCimSmgs(action.getSmgs());

            toSmgs.prepare4save();
            if (action.getSearch().getType() == 6) { // avisogu29k
                toSmgs.setType(toSmgs.getGu());
                toSmgs.setDocType1(new BigDecimal(toSmgs.getGu() == 4 ? 10 : 25)); //  gu29 or gu27
                toSmgs.prepareGU4copy();
            } else if(action.getSearch().getType() == 3){  // aviso type=3
                toSmgs.setType((byte) 2);
                toSmgs.setDocType1(new BigDecimal(1));
            } else if(action.getSearch().getType() == 10){ // avisocimsmgs
                toSmgs.setType((byte) 1);
                toSmgs.setDocType1(new BigDecimal(4));
            } else {
                throw new Exception("Invalid document type - " + action.getSearch().getType());
            }

            toSmgs.setReady("");
            toSmgs.setStatus(null);

            Route route = action.getRouteDAO().findById(action.getSmgs().getRoute().getHid(), false);
            toSmgs.setRoute(route);

            PackDoc pack = new PackDoc();
            pack.setRoute(route);
            pack.setUsrGroupsDir(action.getUsrGroupsDirDAO().findById(action.getUser().getUsr().getGroup().getName(), false));
            pack.addCimSmgsItem(toSmgs);
            action.getSmgsy().add(toSmgs); // 4 status logging
            pack.setDattr(new Date());

            action.getPackDocDAO().makePersistent(pack);
        }

//        action.getSmgs().prepare4save();
        action.getSmgs().setReady("3");
        action.getSmgs().setStatus(action.getStatus());
        action.getSmgsDAO().makePersistent(action.getSmgs());

        resultMsg = String.format(resultStr, action.getSmgs().getAmount());
//        resultMsg.append("Создано накладных в кол-ве ").append(action.getSmgsy().size()).append(" экз.");
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }




   /* public void aviso2smgsAppend() {
        Search search = action.getSearch();

        CimSmgs aviso = action.getSmgsDAO().findById(search.getHid(), false);
        List<CimSmgs> smgsy = action.getSmgsDAO().findDocsByNPoezd(search.getNpoezd(), search.getType() == 3 ? 2 : aviso.getGu());
        if (smgsy.size() == 0) {
            throw new BusinessException("Не найдено накладных на поезд - " + search.getNpoezd());
        }

        action.setSmgsy(new ArrayList<CimSmgs>());
        String utiN;
        boolean foundTarget;
        //////


        MapperFacade mapper = new Mapper();
        //////
        for (CimSmgs targetSmgs : smgsy) {
            mapper.map(aviso, targetSmgs);

            targetSmgs.setCimSmgs(aviso);
            action.getSmgsy().add(targetSmgs); // 4 status logging
            action.getSmgsDAO().makePersistent(targetSmgs);
        }
        aviso.prepare4save();
        aviso.setReady("3");
        aviso.setStatus(action.getStatus());
        action.getSmgsDAO().makePersistent(aviso);
        action.setSmgs(aviso); // 4 logging
        *//*for (CimSmgsCarList car : aviso.getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                if ((utiN = StringUtils.defaultString(kon.getUtiN())).length() > 0) {
                    foundTarget = false;
                    for (CimSmgs targetSmgs : smgsy) {
                        for (CimSmgsCarList targetCar : targetSmgs.getCimSmgsCarLists().values()) {
                            for (CimSmgsKonList targetKon : targetCar.getCimSmgsKonLists().values()) {
                                if (utiN.equals(StringUtils.defaultString(targetKon.getUtiN()))) {
                                    mapper.map(aviso, targetSmgs);
                                    *//**//*targetSmgs.setNpoezd(aviso.getNpoezd());

                                    // g1
                                    targetSmgs.setG2_(StringUtils.isNotBlank(aviso.getG2_()) ? aviso.getG2_() : targetSmgs.getG2_());
                                    targetSmgs.setG1r(StringUtils.isNotBlank(aviso.getG1r()) ? aviso.getG1r() : targetSmgs.getG1r());
                                    targetSmgs.setG15_1(StringUtils.isNotBlank(aviso.getG15_1()) ? aviso.getG15_1() : targetSmgs.getG15_1());
                                    targetSmgs.setG16r(StringUtils.isNotBlank(aviso.getG16r()) ? aviso.getG16r() : targetSmgs.getG16r());
                                    targetSmgs.setG18r_1(StringUtils.isNotBlank(aviso.getG18r_1()) ? aviso.getG18r_1() : targetSmgs.getG18r_1());
                                    targetSmgs.setG19r(StringUtils.isNotBlank(aviso.getG19r()) ? aviso.getG19r() : targetSmgs.getG19r());
                                    targetSmgs.setG2_1(StringUtils.isNotBlank(aviso.getG2_1()) ? aviso.getG2_1() : targetSmgs.getG2_1());
                                    targetSmgs.setG2(StringUtils.isNotBlank(aviso.getG2()) ? aviso.getG2() : targetSmgs.getG2());
                                    targetSmgs.setG_2inn(StringUtils.isNotBlank(aviso.getG_2inn()) ? aviso.getG_2inn() : targetSmgs.getG_2inn());

                                    // g5
                                    targetSmgs.setG5_(StringUtils.isNotBlank(aviso.getG5_()) ? aviso.getG5_() : targetSmgs.getG5_());
                                    targetSmgs.setG4r(StringUtils.isNotBlank(aviso.getG4r()) ? aviso.getG4r() : targetSmgs.getG4r());
                                    targetSmgs.setG45_1(StringUtils.isNotBlank(aviso.getG45_1()) ? aviso.getG45_1() : targetSmgs.getG45_1());
                                    targetSmgs.setG46r(StringUtils.isNotBlank(aviso.getG46r()) ? aviso.getG46r() : targetSmgs.getG46r());
                                    targetSmgs.setG48r(StringUtils.isNotBlank(aviso.getG48r()) ? aviso.getG48r() : targetSmgs.getG48r());
                                    targetSmgs.setG49r(StringUtils.isNotBlank(aviso.getG49r()) ? aviso.getG49r() : targetSmgs.getG49r());
                                    targetSmgs.setG5_1(StringUtils.isNotBlank(aviso.getG5_1()) ? aviso.getG5_1() : targetSmgs.getG5_1());
                                    targetSmgs.setG5(StringUtils.isNotBlank(aviso.getG5()) ? aviso.getG5() : targetSmgs.getG5());
                                    targetSmgs.setG_5inn(StringUtils.isNotBlank(aviso.getG_5inn()) ? aviso.getG_5inn() : targetSmgs.getG_5inn());

                                    targetSmgs.setG15(StringUtils.isNotBlank(aviso.getG15()) ? aviso.getG15() : targetSmgs.getG15());
                                    targetSmgs.setG15r(StringUtils.isNotBlank(aviso.getG15r()) ? aviso.getG15r() : targetSmgs.getG15r());

                                    // g7
                                    if(aviso.getCimSmgsDocses13() != null && aviso.getCimSmgsDocses13().size() > 0){

                                    }*//**//*

                                    targetSmgs.setCimSmgs(aviso);
                                    action.getSmgsy().add(targetSmgs); // 4 status logging
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
                break;
            }
        }
*//*



    }

    */



   /* public StringBuilder getResultMsg() {
        return resultMsg;
    }*/
}
