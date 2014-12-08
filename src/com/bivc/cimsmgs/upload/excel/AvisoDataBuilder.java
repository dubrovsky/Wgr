package com.bivc.cimsmgs.upload.excel;

import com.bivc.cimsmgs.dao.NsiStaDAO;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.db.nsi.Road;
import com.bivc.cimsmgs.db.nsi.Sta;
import org.apache.commons.lang3.StringUtils;

import java.text.SimpleDateFormat;
import java.util.List;

public class AvisoDataBuilder {
    private CimSmgs smgs;
    private StringBuilder sb;

    public AvisoDataBuilder(CimSmgs smgs){
        this.smgs = smgs;
    }

    public String build2Row() {
        final String num = "№ ";
        final String date = "Дата: ";
        final String space = "  ";
        sb = new StringBuilder();
        if(StringUtils.isNotBlank(smgs.getAviso_num())){
            sb.append(num).append(smgs.getAviso_num()).append(space);
        }
        if(smgs.getAviso_dat() != null){
            sb.append(date).append(new SimpleDateFormat("dd.MM.yyyy").format(smgs.getAviso_dat()));
        }
        return sb.toString();
    }

    public String build3Row() {
        final String where = "Куда: ";
        sb = new StringBuilder(where);
        sb.append(smgs.getRoute().getProject().getName());
        return sb.toString();
    }

    public String build4Row(NsiStaDAO staDao) {
        sb = new StringBuilder("Сообщаем Вам инструкцию по внесению в перевозочные документы отметок об оплате на перевозку ");

        if(StringUtils.isNotBlank(smgs.getG162r())){
            sb.append(smgs.getG162r().toUpperCase()).append(" ");
        }
        if(StringUtils.isNotBlank(smgs.getG692())){
            sb.append(smgs.getG692().substring(0,5)).append(" ");
            List<Sta> stas = staDao.findAll(smgs.getG692().trim());
            if(stas.size() > 0){
//                Management manag = stas.get(0).getManagement();
                Road road = stas.get(0).getRoad();
                if(road != null){
                    sb.append(" (").append(road.getRoadSname().toUpperCase()).append(")");
                }
            }
        }

        sb.append(" - ");
        if(StringUtils.isNotBlank(smgs.getG101r())){
            sb.append(smgs.getG101r().toUpperCase()).append(" ");
        }
        if(StringUtils.isNotBlank(smgs.getG121())){
            sb.append(smgs.getG121().substring(0,5)).append(" ");
            List<Sta> stas = staDao.findAll(smgs.getG121().trim());
            if(stas.size() > 0){
//                Management manag = stas.get(0).getManagement();
                Road road = stas.get(0).getRoad();
                if(road != null){
                    sb.append(" (").append(road.getRoadSname().toUpperCase()).append(")");
                }
            }
        }
        if(smgs.getAviso_dat() != null){
            sb.append(" в ").append(new SimpleDateFormat("MM.yyyy").format(smgs.getAviso_dat())).append(" г.");
        }

        int num = 0;
        for(CimSmgsCarList car: smgs.getCimSmgsCarLists().values()){
            for(CimSmgsKonList kon: car.getCimSmgsKonLists().values()){
                for(CimSmgsGruz gruz: kon.getCimSmgsGruzs().values()){
                    if(num++ == 0){
                        sb.append(" груза: ");
                    }
                    sb.append("\n");
                    if(StringUtils.isNotBlank(gruz.getEnzgr())){
                        sb.append(gruz.getEnzgr().toUpperCase());
                    }
                    if(StringUtils.isNotBlank(gruz.getEkgvn())){
                        sb.append(" ").append(gruz.getEkgvn().substring(0,5));
                    }
                    if(StringUtils.isNotBlank(gruz.getKgvn())){
                        sb.append(",").append(" ГНГ ").append(gruz.getKgvn());
                    }
                }
                break;
            }
            break;
        }
        return sb.toString();
    }

    public String build5Row() {
        sb = new StringBuilder();
        for(CimSmgsCarList car: smgs.getCimSmgsCarLists().values()){
            for(CimSmgsKonList kon: car.getCimSmgsKonLists().values()){
                if(kon.getSizeFoot() != null){
                    sb.append("Крупнотоннажный контейнер ").append(kon.getSizeFoot()).append(" футов - 30т");
                }
                if(smgs.getAmount() != null){
                    sb.append(" в количестве ").append(smgs.getAmount()).append(" собственного парка ваг. собственного парка");
                }
                break;
            }
            break;
        }
        return sb.toString();
    }

    public String build15Row() {
        sb = new StringBuilder();
        for(CimSmgsCarList car: smgs.getCimSmgsCarLists().values()){
            for(CimSmgsKonList kon: car.getCimSmgsKonLists().values()){
                for(CimSmgsGruz gruz: kon.getCimSmgsGruzs().values()){
//                    sb.append("-  ");
                    if(StringUtils.isNotBlank(gruz.getEnzgr())){
                        sb.append(gruz.getEnzgr().toUpperCase());
                    }
                    if(StringUtils.isNotBlank(gruz.getEkgvn())){
                        sb.append(" ЕТСНГ ").append(gruz.getEkgvn().substring(0,5));
                    }
                    if(StringUtils.isNotBlank(gruz.getKgvn())){
                        sb.append(",").append(" ГНГ ").append(gruz.getKgvn());
                    }
                    sb.append("\n");
                }
                break;
            }
            break;
        }
        return sb.toString();
    }

    public String build7Row() {
        sb = new StringBuilder(smgs.buildG1Print());
        return sb.toString().toUpperCase();
    }

    public String build9Row() {
        sb = new StringBuilder(smgs.buildG4Print());
        return sb.toString().toUpperCase();
    }

    public String build11Row(NsiStaDAO staDao) {
        sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsDocs stn : smgs.getCimSmgsDocses13().values()) {
            sb.append(prefix);
            prefix = " ,";
            String roadName = null;
            if(StringUtils.isNotBlank(stn.getText())){
                sb.append(stn.getText().substring(0, 5));
                List<Sta> stas = staDao.findAll(stn.getText().trim());
                if(stas.size() > 0){
                    Road road = stas.get(0).getRoad();
                    if(road != null){
                        roadName = road.getRoadSname();
                    }
                }
            }
            if(StringUtils.isNotBlank(stn.getText2())){
                sb.append(" ").append(stn.getText2());
            }
            if(roadName != null){
                sb.append(" (").append(roadName).append(")");
            }
        }
        return sb.toString().toUpperCase();
    }

    public String build13Row(NsiStaDAO staDao) {
        sb = new StringBuilder();
        if(StringUtils.isNotBlank(smgs.getG101r())){
            sb.append(smgs.getG101r().toUpperCase()).append(" ");
        }
        if(StringUtils.isNotBlank(smgs.getG121())){
//            sb.append(smgs.getG121().substring(0,5)).append(" ");
            List<Sta> stas = staDao.findAll(smgs.getG121().trim());
            if(stas.size() > 0){
                Road road = stas.get(0).getRoad();
                if(road != null){
                    sb.append(" (").append(road.getRoadSname().toUpperCase()).append(")");
                }
            }
        }
        return sb.toString();
    }

    public String build17Row() {
        sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsPlatel plat : smgs.getCimSmgsPlatels().values()) {
            sb.append(prefix);
            prefix = " ;";
            if(StringUtils.isNotBlank(plat.getDorR())){
                sb.append("Оплата по ").append(plat.getDorR());
            }
            if(StringUtils.isNotBlank(plat.getPlatR())){
                sb.append(" производится через ").append(plat.getPlatR());
            }
            if(StringUtils.isNotBlank(plat.getPrimR())){
                sb.append(" через ").append(plat.getPrimR());
            }
            if(StringUtils.isNotBlank(plat.getKplat())){
                sb.append(" ,код плательщика ").append(plat.getKplat());
            }
            if(StringUtils.isNotBlank(plat.getKplat1())){
                sb.append(" ,п/к плательщика ").append(plat.getKplat1());
            }
        }
        return sb.toString();
    }

    public String build19Row() {
        sb = new StringBuilder();
        if(StringUtils.isNotBlank(smgs.getG15())){
            sb.append("п/к  ").append(smgs.getG15());
        }
        return sb.toString();
    }

    public String build20Row() {
        sb = new StringBuilder();
        sb.append("Подкод перевозки и код контрагента ОАО «ТрансКонтейнер» проставляется в перевозочных документах,\nоформленных на перевозку груза в прямом железнодорожном,").
                append("прямом смешанном и\nнепрямом международном сообщении  в графе «Плательщик» через дробь с сетевым кодом ");
        return sb.toString();
    }

    public String build21Row() {
        sb = new StringBuilder();
        if(smgs.getAviso_cod_dat() != null){
            sb.append("Коды действительны до ").append(new SimpleDateFormat("dd.MM.yyyy").format(smgs.getAviso_cod_dat())).append(" г.");
        }
        return sb.toString();
    }
}
