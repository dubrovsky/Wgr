package com.bivc.cimsmgs.doc2doc;

import Ti.model.excel.SmgsFromXLS;
import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.dao.ManagementDAO;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Management;
import com.bivc.cimsmgs.doc2doc.orika.DefaultMapper;
import com.bivc.cimsmgs.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
@Service
public class Aviso2CimSmgs implements Doc2Doc {

    @Autowired
    private DefaultMapper defaultMapper;

    @Autowired
    private ManagementDAO managementDAO;

    private String resultMsg;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        CimSmgs cimSmgsSrc = action.getSmgsDAO().findById(action.getSearch().getHid(), false);
        action.setSmgs(cimSmgsSrc);  // 4 status logging
        List<CimSmgs> cimSmgsList;
        ArrayList<SmgsFromXLS>smgsFromXLS = (ArrayList<SmgsFromXLS>) action.getXlsList();
        Long amountBack=null;

        // формируем документы из XLS файла
        if(smgsFromXLS!=null)
        {
            amountBack=cimSmgsSrc.getAmount();
            cimSmgsSrc.setAmount((long) smgsFromXLS.size());

        }

        if(cimSmgsSrc.getAmount() == null || cimSmgsSrc.getAmount() == 0){
            cimSmgsList = new ArrayList<>(cimSmgsSrc.getCimSmgsCarLists().size());
            for(CimSmgsCarList vag: cimSmgsSrc.getCimSmgsCarLists().values()){
                Aviso2CimSmgsDTO cimSmgsDTO = defaultMapper.map(cimSmgsSrc, Aviso2CimSmgsDTO.class);
                CimSmgs cimSmgs = defaultMapper.map(cimSmgsDTO, CimSmgs.class);

                CimSmgsCarList cimSmgsCarList;
                if(cimSmgsSrc.isContOtpr()) {
                    Aviso2CimSmgsCarListDTOKontOtpr cimSmgsCarListDTO = defaultMapper.map(vag, Aviso2CimSmgsCarListDTOKontOtpr.class);
                    cimSmgsCarList = defaultMapper.map(cimSmgsCarListDTO, CimSmgsCarList.class);
                } else {
                    Aviso2CimSmgsCarListDTOVagOtpr cimSmgsCarListDTO = defaultMapper.map(vag, Aviso2CimSmgsCarListDTOVagOtpr.class);
                    cimSmgsCarList = defaultMapper.map(cimSmgsCarListDTO, CimSmgsCarList.class);
                }

                cimSmgsCarList.setSort((byte) 0);
                cimSmgs.getCimSmgsCarLists().put((byte) 0, cimSmgsCarList);
                cimSmgsList.add(cimSmgs);
            }
        } else {
            cimSmgsList = new ArrayList<>(cimSmgsSrc.getAmount().intValue());
            for(int i = 0; i < cimSmgsSrc.getAmount(); i++){
                if(cimSmgsSrc.isContOtpr()) {
                    Aviso2CimSmgsDTOKontOtpr cimSmgsDTO = defaultMapper.map(cimSmgsSrc, Aviso2CimSmgsDTOKontOtpr.class);
                    cimSmgsList.add(defaultMapper.map(cimSmgsDTO, CimSmgs.class));
                } else {
                    Aviso2CimSmgsDTOVagOtpr cimSmgsDTO = defaultMapper.map(cimSmgsSrc, Aviso2CimSmgsDTOVagOtpr.class);
                    cimSmgsList.add(defaultMapper.map(cimSmgsDTO, CimSmgs.class));
                }
            }
        }

        Route route = cimSmgsSrc.getRoute();
        UsrGroupsDir usrGroupsDir = action.getUsrGroupsDirDAO().findById(action.getUser().getUsr().getGroup().getName(), false);

        List<PackDoc> packDocList = new ArrayList<>(cimSmgsList.size());
        action.setSmgsy(new ArrayList<CimSmgs>(cimSmgsList.size())); // 4 status logging
        for(CimSmgs cimSmgs: cimSmgsList){
            switch (action.getSearch().getType()){
                case 10:
                    cimSmgs.setType((byte) 1); // cimsmgs
                    cimSmgs.setDocType1(new BigDecimal(4));
                    break;
                case 11:
                    cimSmgs.setType((byte) 12); // smgs2
                    cimSmgs.setDocType1(new BigDecimal(7));
                    break;
                case 14:
                    cimSmgs.setType((byte) 7); // cim
                    cimSmgs.setDocType1(new BigDecimal(29));
            }

            cimSmgs.prepare4save();
            cimSmgs.setRoute(route);
            PackDoc packDoc = new PackDoc();
            packDoc.setRoute(route);
            packDoc.setUsrGroupsDir(usrGroupsDir);
            packDoc.addCimSmgsItem(cimSmgs);
            packDocList.add(packDoc);
            action.getSmgsy().add(cimSmgs);// 4 status logging
        }

        // создаем СМГС на основании XLS файла и возвращаем значение количества копий
        if(smgsFromXLS!=null)
        {
            for(int i=0;i<smgsFromXLS.size();i++)
            {
               CimSmgs smgs=  cimSmgsList.get(i);
               SmgsFromXLS smgsImport =smgsFromXLS.get(i);
               combineSmgsXlsRec(smgs,smgsImport);
            }

            cimSmgsSrc.setAmount(amountBack);
        }

        //Batch inserts
        for(int i = 0; i < packDocList.size(); i++){
            action.getPackDocDAO().makePersistent(packDocList.get(i));
            if ((i + 1)  % 20 == 0 ){
                action.getPackDocDAO().flush();
                action.getPackDocDAO().clear();
            }
        }
        resultMsg= String.valueOf(action.getSmgsy().size());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }

    /**
     * Метод добавляем в запись СМГС данные прочитание их XLS файла
     * @param smgs СМГС
     * @param recXLS запись из XLS
     */
    private void combineSmgsXlsRec(CimSmgs smgs, SmgsFromXLS recXLS)
    {
        CimSmgsCarList carList;
        CimSmgsKonList konList=null;
        if(smgs.getCimSmgsCarLists()!=null&&smgs.getCimSmgsCarLists().values().size()>0)
        {
            carList=smgs.getCimSmgsCarLists().values().iterator().next();
        }
        else
        {
            carList=new CimSmgsCarList();
            carList.setSort((byte) 0);
            carList.setCimSmgs(smgs);
        }

        // заполняем информацию о вагоне
        if(!recXLS.getNvag().isEmpty())
            carList.setNvag(recXLS.getNvag());
        if(!recXLS.getKlientName().isEmpty())
            carList.setKlientName(recXLS.getKlientName());
        if(!recXLS.getGrPodVag().equals(new BigDecimal(0)))
            carList.setGrPod(recXLS.getGrPodVag());
        if(recXLS.getKolOs()!=0)
            carList.setKolOs(recXLS.getKolOs());
        if(!recXLS.getTaraVag().equals(new BigDecimal(0)))
            carList.setTaraVag(recXLS.getTaraVag());

        Map<Byte, CimSmgsCarList> cimSmgsCarLists = new TreeMap();
        cimSmgsCarLists.put((byte) 0,carList);
        smgs.setCimSmgsCarLists(cimSmgsCarLists);

        Map<Integer, CimSmgsGruz> cimSmgsGruzs=new TreeMap<>();
        Map<Byte, CimSmgsPlomb> plombMap = new TreeMap<>();
        CimSmgsGruz gruzRec;

        if(smgs.isContOtpr()) //контейнерная перевозка
        {
            if(carList.getCimSmgsKonLists()!=null&&carList.getCimSmgsKonLists().values().size()>0)
            {
                konList=carList.getCimSmgsKonLists().values().iterator().next();
            }
            else
            {
                konList= new CimSmgsKonList();
                konList.setSort((byte) 0);
                konList.setCimSmgsCarList(carList);
            }
            // заполняем информацию о контейнере
            if (!recXLS.getUtiN().isEmpty())
                konList.setUtiN(recXLS.getUtiN());
            if(!recXLS.getSizeFoot().equals(new BigDecimal(0)))
                konList.setSizeFoot(recXLS.getSizeFoot());
            if (!recXLS.getUtiType().isEmpty())
                konList.setUtiType(recXLS.getUtiType());
            if(!recXLS.getGrpodCont().equals(new BigDecimal(0)))
                konList.setGrpod(recXLS.getGrpodCont());
            if(recXLS.getTaraKont()!=0)
                konList.setTaraKont(recXLS.getTaraKont());
            if(konList.getTaraKont()!=null)
                smgs.setG24T(new BigDecimal(konList.getTaraKont()));

            TreeMap<Byte,CimSmgsKonList> cimSmgsKonListTreeMap= new TreeMap<>();
            cimSmgsKonListTreeMap.put((byte)0,konList);
            carList.setCimSmgsKonLists(cimSmgsKonListTreeMap);

            if(konList.getCimSmgsGruzs()!=null&&konList.getCimSmgsGruzs().values().size()>0) {
                gruzRec = konList.getCimSmgsGruzs().values().iterator().next();
            }
            else
            {
                gruzRec = new CimSmgsGruz();
                gruzRec.setSort(0);
            }

            cimSmgsGruzs.put(0,gruzRec);

            konList.setCimSmgsGruzs(cimSmgsGruzs);
            konList.addCimSmgsGruzItem(gruzRec);
            konList.addCimSmgsGruzs();

            // заполняем информацию о пломбах
            konList.setCimSmgsPlombs(plombMap);
            for (CimSmgsPlomb plomb:recXLS.getPlombs()) {
                konList.addCimSmgsPlombItem(plomb);
                smgs.addCimSmgsPlombItem(plomb);
            }
        }
        else//повагонная перевозка
        {
            if(carList.getCimSmgsGruzs()!=null&&carList.getCimSmgsGruzs().values().size()>0) {
                gruzRec = carList.getCimSmgsGruzs().values().iterator().next();
            }
            else
            {
                gruzRec = new CimSmgsGruz();
                gruzRec.setSort(0);
                gruzRec.setCimSmgsCarList(carList);
            }
            cimSmgsGruzs.put(0,gruzRec);
            carList.addCimSmgsGruzItem(gruzRec);
            carList.addCimSmgsGruzs();

            // заполняем информацию о пломбах
            carList.setCimSmgsPlombs(plombMap);
            for (CimSmgsPlomb plomb:recXLS.getPlombs()) {
                carList.addCimSmgsPlombItem(plomb);
                smgs.addCimSmgsPlombItem(plomb);
            }
        }
        smgs.setCimSmgsPlombs(plombMap);

// заполняем информацию о грузе
        if(!recXLS.getKgvn().isEmpty())
            gruzRec.setKgvn(recXLS.getKgvn());
        if(!recXLS.getEkgvn().isEmpty())
            gruzRec.setEkgvn(recXLS.getEkgvn());
        if(!recXLS.getNzgr().isEmpty())
            gruzRec.setNzgr(recXLS.getNzgr());
        if(!recXLS.getUpak().isEmpty())
            gruzRec.setUpak(recXLS.getUpak());
        if(!recXLS.getPlaces().equals(0))
            gruzRec.setPlaces(recXLS.getPlaces());
        if(!recXLS.getMassa().equals(new BigDecimal(0))) {
            gruzRec.setMassa(recXLS.getMassa());

            // масса брутто
            if(gruzRec.getMassa()!=null)
                smgs.setG24B(gruzRec.getMassa().add((smgs.isContOtpr()&&konList!=null)?(konList.getTaraKont()!=null?BigDecimal.valueOf(konList.getTaraKont()):BigDecimal.valueOf(0)):BigDecimal.valueOf(0)));
        }


        if (!recXLS.getG11_prim().isEmpty())
            smgs.setG11_prim(recXLS.getG11_prim());
        if (!recXLS.getG1r().isEmpty())
            smgs.setG1r(recXLS.getG1r());
        if (!recXLS.getG19r().isEmpty())
            smgs.setG19r(recXLS.getG19r());
        if(!recXLS.getG1_dop_info().isEmpty())
            smgs.setG1_dop_info(recXLS.getG1_dop_info());
        if (!recXLS.getG4r().isEmpty())
            smgs.setG4r(recXLS.getG4r());
        if (!recXLS.getG49r().isEmpty())
            smgs.setG49r(recXLS.getG49r());
        if(!recXLS.getG4_dop_info().isEmpty())
            smgs.setG4_dop_info(recXLS.getG4_dop_info());
        if(!recXLS.getG101r().isEmpty())
            smgs.setG101r(recXLS.getG101r());
        if(!recXLS.getG694().isEmpty())
            smgs.setG694(recXLS.getG694());
        if(recXLS.getG281()!=null)
            smgs.setG281(recXLS.getG281());

        // заполняем код станции назначения
        if(!recXLS.getG121().isEmpty())
        {
            String g121="",adm_code="";
            if(recXLS.getG121().length()==8)
            {
                g121=recXLS.getG121().substring(2);
                adm_code=recXLS.getG121().substring(0,2);
                smgs.setG12(adm_code);

                // читаем из базы обозначение жедезной дороги
                Management management = new Management();
                management.setManagNo(adm_code);
                List<Management>managements= managementDAO.findByExample(management);
                if(managements.size()>0)
                    smgs.setG102r(managements.get(0).getMNameRus());
            }

            if(recXLS.getG121().length()<=6)
            {
                g121=recXLS.getG121();
            }

            if(!g121.isEmpty())
                smgs.setG121(g121);
        }
    }
}


