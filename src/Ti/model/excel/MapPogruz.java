package Ti.model.excel;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

/**
 * Класс MapPogruz используется для отображения модели 1 записи списка в карте перегзрузки
 */
public class MapPogruz extends XlsDefaultModel implements Serializable {

    /**
     * ID cimsmgs
     */
    private Long cs_hid;
    /**
     * № вагона(платформы)/ Nr.platformy
     */
    private String nvag;
    /**
     * Префикс и контейнера / Nr.Kontenera
     */
    @JsonProperty("utin")
    private String utiN;
    /**
     * Префикс и контейнера / Nr.Kontenera из бд
     */
//    @JsonProperty("utin_db")
    private String utiN_db;
    /**
     * Номер отправки (номер SMGS) / №SMGS
     */
    private String g694;
//    /**
//     * Номер отправки (номер SMGS) / №SMGS из базы данных
//     */
//    @JsonProperty
//    private String g694_db;
    /**
     * Владелец вагона / (arendator)
     */
    @JsonProperty("klientname")
    private String klientName;
    /**
     * Футовость контейнера / TYP KONTENERA
     */
    @JsonProperty("sizefoot")
    private BigDecimal sizeFoot;

    /**
     * Тип контейнера
     */
    private String uti_type;
    /**
     * Пломбы /PLOMBY
     */
//    @JsonFormat(shape = JsonFormat.Shape.STRING)
//    @JsonProperty("znak")
    private List<String> znak;
    /**
     * Вес тары контейнера / tara kg
     */
    @JsonProperty("tarakont")
    private short taraKont;
    /**
     * Грузоподъемность контейнера / MAX kg (идет в кг надо т)
     */
    @JsonProperty("grpodkont")
    private BigDecimal grPodKont;
    /**
     * Вес тары / tara wagonuT.
     */
    @JsonProperty("taravag")
    private BigDecimal taraVag;
    /**
     * Грузоподъемность вагона / max.Ladownosc wagonu
     */
    @JsonProperty("grpod")
    private BigDecimal grPod;
    /**
     * Количество осей/ilosc osi
     */
    @JsonProperty("kolos")
    private Byte kolOs;

    boolean isSelected;


    public MapPogruz() {
    }

    public MapPogruz(String nvag, String utiN, String utiN_db, String g694, String klientName, BigDecimal sizeFoot, String uti_type, List<String> znak, short taraKont, BigDecimal grPodKont, BigDecimal taraVag, BigDecimal grPod, Byte kolOs, boolean isSelected) {
        this.nvag = nvag;
        this.utiN = utiN;
        this.utiN_db = utiN_db;
        this.g694 = g694;
        this.klientName = klientName;
        this.sizeFoot = sizeFoot;
        this.uti_type = uti_type;
        this.znak = znak;
        this.taraKont = taraKont;
        this.grPodKont = grPodKont;
        this.taraVag = taraVag;
        this.grPod = grPod;
        this.kolOs = kolOs;
        this.isSelected = isSelected;
    }

    public Long getCs_hid() {
        return cs_hid;
    }

//    public String getG694_db() {
//        return g694_db;
//    }

    public String getNvag() {
        return nvag;
    }

    public String getUtiN() {
        return utiN;
    }

    public String getUtiN_db() {
        return utiN_db;
    }

    public String getG694() {
        return g694;
    }

    public String getKlientName() {
        return klientName;
    }

    public BigDecimal getSizeFoot() {
        return sizeFoot;
    }

    public String getUti_type() {
        return uti_type;
    }

    public List<String> getZnak() {
        return znak;
    }

    public short getTaraKont() {
        return taraKont;
    }

    public BigDecimal getGrPodKont() {
        return grPodKont;
    }

    public BigDecimal getTaraVag() {
        return taraVag;
    }

    public BigDecimal getGrPod() {
        return grPod;
    }

    public Byte getKolOs() {
        return kolOs;
    }

    public boolean isSelected() {
        return isSelected;
    }

    public void setCs_hid(Long cs_hid) {
        this.cs_hid = cs_hid;
    }

//    public void setG694_db(String g694_db) {
//        this.g694_db = g694_db;
//    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public void setUtiN_db(String utiN_db) {
        this.utiN_db = utiN_db;
    }

    public void setG694(String g694) {
        this.g694 = g694;
    }

    public void setKlientName(String klientName) {
        this.klientName = klientName;
    }

    public void setSizeFoot(BigDecimal sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public void setUti_type(String uti_type) {
        this.uti_type = uti_type;
    }

    public void setZnak(List<String> znak) {
        this.znak = znak;
    }

    public void setTaraKont(short taraKont) {
        this.taraKont = taraKont;
    }

    public void setGrPodKont(BigDecimal grPodKont) {
        this.grPodKont = grPodKont;
    }

    public void setTaraVag(BigDecimal taraVag) {
        this.taraVag = taraVag;
    }

    public void setGrPod(BigDecimal grPod) {
        this.grPod = grPod;
    }

    public void setKolOs(Byte kolOs) {
        this.kolOs = kolOs;
    }

    public void setSelected(boolean selected) {
        isSelected = selected;
    }

    @Override
    public String toString() {
        return "MapPogruz{" +
                "cs_hid=" + cs_hid +
                ", nvag='" + nvag + '\'' +
                ", utiN='" + utiN + '\'' +
                ", g694='" + g694 + '\'' +
//                ", g694_db='" + g694_db + '\'' +
                ", klientName='" + klientName + '\'' +
                ", sizeFoot=" + sizeFoot +
                ", uti_type='" + uti_type + '\'' +
                ", znak=" + znak +
                ", taraKont=" + taraKont +
                ", grPodKont=" + grPodKont +
                ", taraVag=" + taraVag +
                ", grPod=" + grPod +
                ", kolOs=" + kolOs +
                ", isSelected=" + isSelected +
                '}';
    }
}
