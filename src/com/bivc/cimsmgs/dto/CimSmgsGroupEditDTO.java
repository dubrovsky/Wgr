package com.bivc.cimsmgs.dto;

import Ti.DataProcessing.Tools.DataProcessingTools;
import com.bivc.cimsmgs.db.*;

import java.math.BigDecimal;
import java.util.*;

public class CimSmgsGroupEditDTO {
    private Long hid;
    //№ вагона
    private String nvag;
    //Пном. ваг
    private Byte sort;
    //Владелец вагона
    private String klientname;
    //Вагон<br>предоставлен
    private String vagOtm;
    //Груз-ть<br>вагона(Т)
    private BigDecimal grPod;
    //Кол-во осей
    private Byte kolOs;
    //Тара вагона
    private BigDecimal taraVag;
    //№ контейнера
    private String utiN;
    //Типоразмер конт.
    private String utiType;
    //Груз-ть<br>вагона(Т)
    private BigDecimal grPodKont;
    //тара контейнера
    private Short taraKont;
    //Нетто
    private BigDecimal massa;
    //ГНГ груза
    private String kgvn;
    //Кол-во мест
    private Integer places;
    //Упаковка
    private String upak;
    //Погружено
    private String g22;
    //Способ определения массы
    private String gs_48;
    //Номер отправки
    private String g694;
    //Дата отправки
    private Date g281;
    // номер поезда
    private String npoezd;
    // пломбы
    private String plombs;

    public Long getHid() {
        return hid;
    }

    public String getUtiN() {
        return utiN;
    }

    public String getNvag() {
        return nvag;
    }

    public Byte getSort() {
        return sort;
    }

    public String getKlientname() {
        return klientname;
    }

    public String getVagOtm() {
        return vagOtm;
    }

    public BigDecimal getGrPod() {
        return grPod;
    }

    public Byte getKolOs() {
        return kolOs;
    }

    public BigDecimal getTaraVag() {
        return taraVag;
    }

    public String getUtiType() {
        return utiType;
    }

    public BigDecimal getGrPodKont() {
        return grPodKont;
    }

    public Short getTaraKont() {
        return taraKont;
    }

    public BigDecimal getMassa() {
        return massa;
    }

    public String getKgvn() {
        return kgvn;
    }

    public Integer getPlaces() {
        return places;
    }

    public String getUpak() {
        return upak;
    }

    public String getG22() {
        return g22;
    }

    public String getGs_48() {
        return gs_48;
    }

    public String getG694() {
        return g694;
    }

    public Date getG281() {
        return g281;
    }

    public String getNpoezd() {
        return npoezd;
    }

    public String getPlombs() {
        return plombs;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public void setKlientname(String klientname) {
        this.klientname = klientname;
    }

    public void setVagOtm(String vagOtm) {
        this.vagOtm = vagOtm;
    }

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public void setGrPod(BigDecimal grPod) {
        this.grPod = grPod;
    }

    public void setKolOs(Byte kolOs) {
        this.kolOs = kolOs;
    }

    public void setTaraVag(BigDecimal taraVag) {
        this.taraVag = taraVag;
    }

    public void setUtiType(String utiType) {
        this.utiType = utiType;
    }

    public void setGrPodKont(BigDecimal grPodKont) {
        this.grPodKont = grPodKont;
    }

    public void setTaraKont(Short taraKont) {
        this.taraKont = taraKont;
    }

    public void setMassa(BigDecimal massa) {
        this.massa = massa;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public void setG22(String g22) {
        this.g22 = g22;
    }

    public void setGs_48(String gs_48) {
        this.gs_48 = gs_48;
    }

    public void setG694(String g694) {
        this.g694 = g694;
    }

    public void setG281(Date g281) {
        this.g281 = g281;
    }

    public void setNpoezd(String npoezd) {
        this.npoezd = npoezd;
    }

    public void setPlombs(String plombs) {
        this.plombs = plombs;
    }

    public CimSmgsGroupEditDTO() {
    }

    public CimSmgsGroupEditDTO(Long hid, String nvag, Byte sort, String klientname, String vagOtm, BigDecimal grPod, Byte kolOs, BigDecimal taraVag, String utiN, String utiType, BigDecimal grPodKont, Short taraKont, BigDecimal massa, String kgvn, Integer places, String upak, String g22, String gs_48, String g694, Date g281, String npoezd, String plombs) {
        this.hid = hid;
        this.nvag = nvag;
        this.sort = sort;
        this.klientname = klientname;
        this.vagOtm = vagOtm;
        this.grPod = grPod;
        this.kolOs = kolOs;
        this.taraVag = taraVag;
        this.utiN = utiN;
        this.utiType = utiType;
        this.grPodKont = grPodKont;
        this.taraKont = taraKont;
        this.massa = massa;
        this.kgvn = kgvn;
        this.places = places;
        this.upak = upak;
        this.g22 = g22;
        this.gs_48 = gs_48;
        this.g694 = g694;
        this.g281 = g281;
        this.npoezd = npoezd;
        this.plombs = plombs;
    }

    @Override
    public String toString() {
        return "CimSmgsGroupEditDTO{" +
                "hid=" + hid +
                ", nvag='" + nvag + '\'' +
                ", sort=" + sort +
                ", klientname='" + klientname + '\'' +
                ", vagOtm='" + vagOtm + '\'' +
                ", grPod=" + grPod +
                ", kolOs=" + kolOs +
                ", taraVag=" + taraVag +
                ", utiN='" + utiN + '\'' +
                ", utiType='" + utiType + '\'' +
                ", grPodKont=" + grPodKont +
                ", taraKont=" + taraKont +
                ", massa=" + massa +
                ", kgvn='" + kgvn + '\'' +
                ", places=" + places +
                ", upak='" + upak + '\'' +
                ", g22='" + g22 + '\'' +
                ", gs_48='" + gs_48 + '\'' +
                ", g694='" + g694 + '\'' +
                ", g281=" + g281 +
                ", npoezd='" + npoezd + '\'' +
                ", plombs='" + plombs + '\'' +
                '}';
    }
    public static void beautifyCimSmgsGroupEditDTO(CimSmgsGroupEditDTO dto)
    {
        String multivalSeparator="-1";
        String contVagSeparator="-2";

        if(dto.getNvag()!=null&&dto.getNvag().equals(multivalSeparator))
            dto.setNvag(null);

        if(dto.getSort()!=null&&dto.getSort().equals(Byte.valueOf(multivalSeparator)))
            dto.setSort(null);

        if(dto.getKlientname()!=null&&dto.getKlientname().equals(multivalSeparator))
            dto.setKlientname(null);

        if(dto.getVagOtm()!=null&&dto.getVagOtm().equals(multivalSeparator))
            dto.setVagOtm(null);

        if(dto.getGrPodKont()!=null&&dto.getGrPodKont().equals(new BigDecimal(multivalSeparator)))
            dto.setGrPod(null);

        if(dto.getKolOs()!=null&&dto.getKolOs().equals(Byte.valueOf(multivalSeparator)))
            dto.setKolOs(null);

        if(dto.getTaraVag()!=null&&dto.getTaraVag().equals(new BigDecimal(multivalSeparator)))
            dto.setTaraVag(null);

        if(dto.getUtiN()!=null&&(dto.getUtiN().equals(multivalSeparator)||dto.getUtiN().equals(contVagSeparator)))
            dto.setUtiN(null);

        if(dto.getUtiType()!=null&&(dto.getUtiType().equals(multivalSeparator)||dto.getUtiType().equals(contVagSeparator)))
        dto.setUtiType(null);

        if(dto.getGrPodKont()!=null&&(dto.getGrPodKont().equals(new BigDecimal(multivalSeparator))||(dto.getGrPodKont().equals(new BigDecimal(contVagSeparator)))))
            dto.setGrPodKont(null);

        if(dto.getTaraKont()!=null&&(dto.getTaraKont().equals(Short.valueOf(multivalSeparator))||dto.getTaraKont().equals(Short.valueOf(contVagSeparator))))
            dto.setTaraKont(null);

        if(dto.getMassa()!=null&&dto.getMassa().equals(new BigDecimal(multivalSeparator)))
            dto.setMassa(null);

        if(dto.getKgvn()!=null&&dto.getKgvn().equals(multivalSeparator))
            dto.setKgvn(null);

        if(dto.getPlaces()!=null&&dto.getPlaces().equals(Integer.valueOf(multivalSeparator)))
            dto.setPlaces(null);

        if(dto.getUpak()!=null&&dto.getUpak().equals(multivalSeparator))
            dto.setUpak(null);

        if(dto.getPlombs()!=null&&dto.getPlombs().equals(multivalSeparator))
            dto.setPlombs(null);
    }

    public static void combineWithCimSmgs(CimSmgs smgs, CimSmgsGroupEditDTO dto)
    {
        CimSmgsGroupEditDTO.beautifyCimSmgsGroupEditDTO(dto);
        List<CimSmgsPlomb> plombs= new ArrayList<>(DataProcessingTools.plombsFromString(dto.getPlombs()));

        CimSmgsCarList carList=null;
        CimSmgsKonList konList=null;
        CimSmgsGruz smgsGruz=null;

        if(smgs.getCimSmgsCarLists().values().size()>0) {
            if(smgs.getCimSmgsCarLists().values().size()==1)
                carList = smgs.getCimSmgsCarLists().values().iterator().next();
        }
        else
        {
            if(dto.getNvag()!=null||dto.getSort()!=null||dto.getKlientname()!=null||dto.vagOtm!=null||dto.getGrPod()!=null||dto.getKolOs()!=null
                    ||dto.getTaraVag()!=null||dto.getUtiN()!=null||dto.getUtiType()!=null||dto.getGrPodKont()!=null
                    ||dto.getTaraKont()!=null||dto.getMassa()!=null||dto.getKgvn()!=null||dto.getPlaces()!=null||dto.getUpak()!=null)
            {
                carList= new CimSmgsCarList();
                carList.setSort((byte) 0);
                carList.setCimSmgs(smgs);
                smgs.getCimSmgsCarLists().put((byte) 0,carList);
            }
        }

        if(carList!=null)
        {
//            if(dto.getNvag()!=null)
                carList.setNvag(dto.getNvag());
            if(dto.getSort()!=null)
                carList.setSort(dto.getSort());
//            if(dto.getKlientname()!=null)
                carList.setKlientName(dto.getKlientname());
//            if(dto.getVagOtm()!=null)
                carList.setVagOtm(dto.getVagOtm());
//            if(dto.getGrPod()!=null)
                carList.setGrPod(dto.getGrPod());
//            if(dto.getKolOs()!=null)
                carList.setKolOs(dto.getKolOs());
//            if(dto.getTaraVag()!=null)
                carList.setTaraVag(dto.getTaraVag());
//            if(dto.getTaraVag()!=null)
                carList.setTaraVag(dto.getTaraVag());

            if(smgs.isContOtpr())
            {
                if(carList.getCimSmgsKonLists().size()>0)
                {
                    if(carList.getCimSmgsKonLists().size()==1)
                        konList=carList.getCimSmgsKonLists().values().iterator().next();
                }
                else
                {
                    if(dto.getUtiN()!=null||dto.getUtiType()!=null||dto.getGrPodKont()!=null
                            ||dto.getTaraKont()!=null||dto.getMassa()!=null||dto.getKgvn()!=null||dto.getPlaces()!=null||dto.getUpak()!=null)
                    {
                        konList= new CimSmgsKonList();
                        konList.setSort((byte) 0);
                        konList.setCimSmgsCarList(carList);
                        carList.getCimSmgsKonLists().put((byte) 0,konList);
                    }
                }
                if(konList!=null)
                {
//                    if(dto.getUtiN()!=null)
                        konList.setUtiN(dto.getUtiN());
//                    if(dto.getUtiType()!=null)
                        konList.setUtiType(dto.getUtiType());
//                    if(dto.getGrPodKont()!=null)
                        konList.setGrpod(dto.getGrPodKont());
//                    if(dto.getTaraKont()!=null)
                        konList.setTaraKont(dto.getTaraKont());

                    if(konList.getCimSmgsGruzs().size()>0)
                    {
                        if(konList.getCimSmgsGruzs().size()==1)
                            smgsGruz=konList.getCimSmgsGruzs().values().iterator().next();
                    }
                    else
                    {
                        if(dto.getMassa()!=null||dto.getKgvn()!=null||dto.getPlaces()!=null||dto.getUpak()!=null)
                        {
                            smgsGruz= new CimSmgsGruz();
                            smgsGruz.setSort(1);
                            smgsGruz.setCimSmgsKonList(konList);
                            smgsGruz.setCimSmgsCarList(carList);
                            konList.getCimSmgsGruzs().put(0,smgsGruz);
                            carList.getCimSmgsGruzs().put(0,smgsGruz);
                        }
                    }
                    Map<Byte,CimSmgsPlomb> plombsMap=konList.getCimSmgsPlombs();
                    Map<Byte,CimSmgsPlomb> smgsPlombsMap=smgs.getCimSmgsPlombs();
                    if(plombs.size()>0) {
                        plombsMap.clear();
                        smgsPlombsMap.clear();
                    }
                    for (int i=0;i<plombs.size();i++){
                        CimSmgsPlomb plomb = plombs.get(i);
                        plomb.setCimSmgsKonList(konList);
                        smgs.addPlomb(plomb);
                    }
                }
            }
            else
            {
                if(carList.getCimSmgsGruzs().size()>0)
                {
                    if(carList.getCimSmgsGruzs().size()==1)
                        smgsGruz=carList.getCimSmgsGruzs().values().iterator().next();
                }
                else
                {
                    if(!dto.getMassa().equals(new BigDecimal("0"))||dto.getKgvn()!=null||dto.getPlaces()!=0||dto.getUpak()!=null)
                    {
                        smgsGruz= new CimSmgsGruz();
                        smgsGruz.setCimSmgsCarList(carList);
                        carList.getCimSmgsGruzs().put(0,smgsGruz);
                    }
                }
                Map<Byte,CimSmgsPlomb> plombsMap=carList.getCimSmgsPlombs();
                Map<Byte,CimSmgsPlomb> smgsPlombsMap=smgs.getCimSmgsPlombs();
                if(plombs.size()>0) {
                    plombsMap.clear();
                    smgsPlombsMap.clear();
                }
                for (int i=0;i<plombs.size();i++){
                    CimSmgsPlomb plomb = plombs.get(i);
                    plomb.setCimSmgsKonList(konList);
                    smgs.addPlomb(plomb);
                }
            }

        }
        if(smgsGruz!=null)
        {
//            if(dto.getMassa()!=null)
                smgsGruz.setMassa(dto.getMassa());
//            if(dto.getKgvn()!=null)
                smgsGruz.setKgvn(dto.getKgvn());
//            if(dto.getPlaces()!=null)
                smgsGruz.setPlaces(dto.getPlaces());
//            if(dto.getUpak()!=null)
                smgsGruz.setUpak(dto.getUpak());
        }
//        if(dto.getG22()!=null)
            smgs.setG22((byte) (dto.getG22().equals("Отправитель")?1:0));
//        if(dto.getGs_48()!=null)
            smgs.setGs_48(dto.getGs_48());
//        if(dto.getG694()!=null)
            smgs.setG694(dto.getG694());
//        if(dto.getG281()!=null)
            smgs.setG281(dto.getG281());
        if(dto.getNpoezd()!=null&&!dto.getNpoezd().isEmpty())
            smgs.setNpoezd(dto.getNpoezd());
    }
}
