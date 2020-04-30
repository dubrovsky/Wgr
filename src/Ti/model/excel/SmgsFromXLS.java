package Ti.model.excel;

import com.bivc.cimsmgs.db.CimSmgsPlomb;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class SmgsFromXLS extends XlsDefaultModel {
    //№ вагона
    private String nvag;
    //Владелец вагона
    private String klientName;
    //Грузоподъемность вагона
    private BigDecimal grPodVag;
    //Кол-во осей
    private Byte kolOs;
    //Тара вагона
    private BigDecimal taraVag;

    //№ контейнера
    private String utiN;
    //Фут. Конт
    private BigDecimal sizeFoot;
    //Типоразмер конт.
    private String utiType;
    //Грузоподъемность конт.
    private BigDecimal grpodCont;
    //тара контейнера
    private Short taraKont;

    //Пломбы,  знаки
    private CimSmgsPlomb[] plombs;

    //ГНГ груза
    private String kgvn;
    //ЕТСНГ груза
    private String ekgvn;
    //Наименование груза
    private String nzgr;
    //Упаковка
    private String upak;
    //Кол-во мест
    private Integer places;
    //Нетто
    private BigDecimal massa;

    //Гр. 15 доп.инфо
    private String g11_prim;
    //Отправитель РУ
    private String g1r;
    //Адрес отправителя ру
    private String g19r;
    //Получатель доп инфо
    private String g1_dop_info;
    //Получатель
    private String g4r;
    //Адрес получателя
    private String g49r;
    //Получатель доп инфо
    private String g4_dop_info;
    //Код ст. назначения
    private String g121;
    //Наименование ст. назначения ру
    private String g101r;
    //Номер отправки
    private String g694;
    //Дата отправки
    private Date g281;

    public String getNvag() {
        return nvag;
    }

    public String getKlientName() {
        return klientName;
    }

    public BigDecimal getGrPodVag() {
        return grPodVag;
    }

    public Byte getKolOs() {
        return kolOs;
    }

    public BigDecimal getTaraVag() {
        return taraVag;
    }

    public String getUtiN() {
        return utiN;
    }

    public BigDecimal getSizeFoot() {
        return sizeFoot;
    }

    public String getUtiType() {
        return utiType;
    }

    public BigDecimal getGrpodCont() {
        return grpodCont;
    }

    public Short getTaraKont() {
        return taraKont;
    }

    public CimSmgsPlomb[] getPlombs() {
        return plombs;
    }

    public String getKgvn() {
        return kgvn;
    }

    public String getEkgvn() {
        return ekgvn;
    }

    public String getNzgr() {
        return nzgr;
    }

    public String getUpak() {
        return upak;
    }

    public Integer getPlaces() {
        return places;
    }

    public BigDecimal getMassa() {
        return massa;
    }

    public String getG11_prim() {
        return g11_prim;
    }

    public String getG1r() {
        return g1r;
    }

    public String getG19r() {
        return g19r;
    }

    public String getG1_dop_info() {
        return g1_dop_info;
    }

    public String getG4r() {
        return g4r;
    }

    public String getG49r() {
        return g49r;
    }

    public String getG4_dop_info() {
        return g4_dop_info;
    }

    public String getG121() {
        return g121;
    }

    public String getG101r() {
        return g101r;
    }

    public String getG694() {
        return g694;
    }

    public Date getG281() {
        return g281;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public void setKlientName(String klientName) {
        this.klientName = klientName;
    }

    public void setGrPodVag(BigDecimal grPodVag) {
        this.grPodVag = grPodVag;
    }

    public void setKolOs(Byte kolOs) {
        this.kolOs = kolOs;
    }

    public void setTaraVag(BigDecimal taraVag) {
        this.taraVag = taraVag;
    }

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public void setSizeFoot(BigDecimal sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public void setUtiType(String utiType) {
        this.utiType = utiType;
    }

    public void setGrpodCont(BigDecimal grpodCont) {
        this.grpodCont = grpodCont;
    }

    public void setTaraKont(Short taraKont) {
        this.taraKont = taraKont;
    }

    public void setPlombs(CimSmgsPlomb[] plombs) {
        this.plombs = plombs;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public void setEkgvn(String ekgvn) {
        this.ekgvn = ekgvn;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public void setUpak(String upak) {
        this.upak = upak;
    }

    public void setPlaces(Integer places) {
        this.places = places;
    }

    public void setMassa(BigDecimal massa) {
        this.massa = massa;
    }

    public void setG11_prim(String g11_prim) {
        this.g11_prim = g11_prim;
    }

    public void setG1r(String g1r) {
        this.g1r = g1r;
    }

    public void setG19r(String g19r) {
        this.g19r = g19r;
    }

    public void setG1_dop_info(String g1_dop_info) {
        this.g1_dop_info = g1_dop_info;
    }

    public void setG4r(String g4r) {
        this.g4r = g4r;
    }

    public void setG49r(String g49r) {
        this.g49r = g49r;
    }

    public void setG4_dop_info(String g4_dop_info) {
        this.g4_dop_info = g4_dop_info;
    }

    public void setG121(String g121) {
        this.g121 = g121;
    }

    public void setG101r(String g101r) {
        this.g101r = g101r;
    }

    public void setG694(String g694) {
        this.g694 = g694;
    }

    public void setG281(Date g281) {
        this.g281 = g281;
    }

    public SmgsFromXLS(String nvag, String klientName, BigDecimal grPodVag, Byte kolOs, BigDecimal taraVag, String utiN, BigDecimal sizeFoot, String utiType, BigDecimal grpodCont, Short taraKont, CimSmgsPlomb[] plombs, String kgvn, String ekgvn, String nzgr, String upak, Integer places, BigDecimal massa, String g11_prim, String g1r, String g19r, String g1_dop_info, String g4r, String g49r, String g4_dop_info, String g121, String g101r, String g694, Date g281) {
        this.nvag = nvag;
        this.klientName = klientName;
        this.grPodVag = grPodVag;
        this.kolOs = kolOs;
        this.taraVag = taraVag;
        this.utiN = utiN;
        this.sizeFoot = sizeFoot;
        this.utiType = utiType;
        this.grpodCont = grpodCont;
        this.taraKont = taraKont;
        this.plombs = plombs;
        this.kgvn = kgvn;
        this.ekgvn = ekgvn;
        this.nzgr = nzgr;
        this.upak = upak;
        this.places = places;
        this.massa = massa;
        this.g11_prim = g11_prim;
        this.g1r = g1r;
        this.g19r = g19r;
        this.g1_dop_info = g1_dop_info;
        this.g4r = g4r;
        this.g49r = g49r;
        this.g4_dop_info = g4_dop_info;
        this.g121 = g121;
        this.g101r = g101r;
        this.g694 = g694;
        this.g281 = g281;
    }

    public SmgsFromXLS() {
    }

    @Override
    public String toString() {
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("dd.MM.yyyy");
        return "SmgsFromXLS{" +
                "nvag='" + nvag + '\'' +
                ", klientName='" + klientName + '\'' +
                ", grPodVag=" + grPodVag +
                ", kolOs=" + kolOs +
                ", taraVag=" + taraVag +
                ", utiN='" + utiN + '\'' +
                ", sizeFoot=" + sizeFoot +
                ", utiType='" + utiType + '\'' +
                ", grpodCont=" + grpodCont +
                ", taraKont=" + taraKont +
                ", ekgvn='" + ekgvn + '\'' +
                ", plombs=" + plombs2Tring() +
                ", kgvn='" + kgvn + '\'' +
                ", nzgr='" + nzgr + '\'' +
                ", upak='" + upak + '\'' +
                ", places=" + places +
                ", massa=" + massa +
                ", g11_prim='" + g11_prim + '\'' +
                ", g1r='" + g1r + '\'' +
                ", g19r='" + g19r + '\'' +
                ", g1_dop_info='" + g1_dop_info + '\'' +
                ", g4r='" + g4r + '\'' +
                ", g49r='" + g49r + '\'' +
                ", g4_dop_info='" + g4_dop_info + '\'' +
                ", g121='" + g121 + '\'' +
                ", g101r='" + g101r + '\'' +
                ", g694='" + g694 + '\'' +
                ", g281=" + (g281!=null?simpleDateFormat.format(g281):g281) +
                '}';
    }
    private String plombs2Tring()
    {
        StringBuilder res=new StringBuilder();

        for (CimSmgsPlomb plomb:plombs) {
            if(res.length()>0)
                res.append(",");
            res.append(plomb.getZnak());
        }
        return res.toString();
    }
}
