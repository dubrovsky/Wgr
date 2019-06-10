package com.bivc.cimsmgs.doc2doc;

import com.bivc.cimsmgs.actions.Doc2Doc_A;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.doc2doc.orika.DefaultMapper;
import com.bivc.cimsmgs.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
@Service
public class Aviso2CimSmgs implements Doc2Doc {

    @Autowired
    private DefaultMapper defaultMapper;

    private final String resultStr = "Обработано %s накладных";
    private String resultMsg;

    @Override
    public void convert(Doc2Doc_A action) throws Exception {
        CimSmgs cimSmgsSrc = action.getSmgsDAO().findById(action.getSearch().getHid(), false);
        action.setSmgs(cimSmgsSrc);  // 4 status logging
        List<CimSmgs> cimSmgsList;

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
                    cimSmgs.setType((byte) 12); // cimsmgs
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

        //Batch inserts
        for(int i = 0; i < packDocList.size(); i++){
            action.getPackDocDAO().makePersistent(packDocList.get(i));
            if ((i + 1)  % 20 == 0 ){
                action.getPackDocDAO().flush();
                action.getPackDocDAO().clear();
            }
        }
        resultMsg = String.format(resultStr, action.getSmgsy().size());
    }

    @Override
    public String getResultMsg() {
        return resultMsg;
    }
}


