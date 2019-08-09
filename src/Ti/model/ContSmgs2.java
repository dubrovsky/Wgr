/**
 *  класс для модели отображающий строку XLS файла контейнеров
 */
package Ti.model;

import java.math.BigDecimal;
import java.util.List;

public class ContSmgs2 {
    /**
     * № вагона(платформы)/ Nr.platformy
     */
    private String nvag;

    /**
     * Владелец вагона / (arendator)
     */
    private String klientName;

    /**
     * Грузоподъемность вагона / max.Ladownosc wagonu
     */
    private BigDecimal grPod;

    /**
     * Количество осей/ilosc osi
     */
    private Byte kolOs;

    /**
     * Вес тары / tara wagonuT.
     */
    private BigDecimal taraVag;

    /**
     * № контейнера
     */
    private String utiN;

    /**
     * Футовость контейнера
     */
    private BigDecimal sizeFoot;

    /**
     * Типоразмер конт.
     */
    private String utiType;

    /**
     * Грузоподъемность вагона / max.Ladownosc wagonu
     */
    private BigDecimal grPodCont;

    /**
     * Пломбы кол-во
     */
    private int znak_kol;

    /**
     * Пломбы /PLOMBY
     */
    private List<String> znak;

    /**
     * Количество мест
     */
    private int places;

    /**
     * Вес нетто
     */
    private BigDecimal netto;
    /**
     * Вес тары
     */
    private BigDecimal taraKont;
    /**
     * Вес брутто
     */
    private BigDecimal brutto;

    public ContSmgs2() {
    }

    public ContSmgs2(String nvag, String klientName, BigDecimal grPod, Byte kolOs, BigDecimal taraVag, String utiN, BigDecimal sizeFoot, String utiType, BigDecimal grPodCont,
                     int znak_kol, List<String> znak, int places, BigDecimal netto, BigDecimal taraKont, BigDecimal brutto) {
        this.nvag = nvag;
        this.klientName = klientName;
        this.grPod = grPod;
        this.kolOs = kolOs;
        this.taraVag = taraVag;
        this.utiN = utiN;
        this.sizeFoot = sizeFoot;
        this.utiType = utiType;
        this.grPodCont = grPodCont;
        this.znak_kol = znak_kol;
        this.znak = znak;
        this.places = places;
        this.netto = netto;
        this.taraKont = taraKont;
        this.brutto = brutto;
    }

    public String getNvag() {
        return nvag;
    }

    public String getKlientName() {
        return klientName;
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

    public String getUtiN() {
        return utiN;
    }

    public BigDecimal getSizeFoot() {
        return sizeFoot;
    }

    public String getUtiType() {
        return utiType;
    }

    public BigDecimal getGrPodCont() {
        return grPodCont;
    }

    public int getZnak_kol() {
        return znak_kol;
    }

    public List<String> getZnak() {
        return znak;
    }

    public int getPlaces() {
        return places;
    }

    public BigDecimal getNetto() {
        return netto;
    }

    public BigDecimal getTaraKont() {
        return taraKont;
    }

    public BigDecimal getBrutto() {
        return brutto;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public void setKlientName(String klientName) {
        this.klientName = klientName;
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

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public void setSizeFoot(BigDecimal sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public void setUtiType(String utiType) {
        this.utiType = utiType;
    }

    public void setGrPodCont(BigDecimal grPodCont) {
        this.grPodCont = grPodCont;
    }

    public void setZnak_kol(int znak_kol) {
        this.znak_kol = znak_kol;
    }

    public void setZnak(List<String> znak) {
        this.znak = znak;
    }

    public void setPlaces(int places) {
        this.places = places;
    }

    public void setNetto(BigDecimal netto) {
        this.netto = netto;
    }

    public void setTaraKont(BigDecimal taraKont) {
        this.taraKont = taraKont;
    }

    public void setBrutto(BigDecimal brutto) {
        this.brutto = brutto;
    }

    @Override
    public String toString() {
        return "ContSmgs2{" +
                "nvag='" + nvag + '\'' +
                ", klientName='" + klientName + '\'' +
                ", grPod=" + grPod +
                ", kolOs=" + kolOs +
                ", taraVag=" + taraVag +
                ", utiN='" + utiN + '\'' +
                ", sizeFoot=" + sizeFoot +
                ", utiType='" + utiType + '\'' +
                ", grPodCont=" + grPodCont +
                ", znak_kol=" + znak_kol +
                ", znak=" + znak +
                ", places=" + places +
                ", netto=" + netto.toPlainString() +
                ", taraKont=" + taraKont.toPlainString() +
                ", brutto=" + brutto.toPlainString() +
                '}';
    }
}
