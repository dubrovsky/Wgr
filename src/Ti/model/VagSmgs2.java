/**
 *  класс для модели отображающий строку XLS файла вагонов
 */
package Ti.model;

import java.math.BigDecimal;
import java.util.List;

public class VagSmgs2 {

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
     * Пломбы кол-во
     */
    private int znakKol;

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

    public int getZnak_kol() {
        return znakKol;
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

    public void setznakKol(int znak_kol) {
        this.znakKol = znak_kol;
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

    public VagSmgs2() {
    }

    public VagSmgs2(String nvag, String klientName, BigDecimal grPod, Byte kolOs, BigDecimal taraVag, int znakKol, List<String> znak, int places, BigDecimal netto) {
        this.nvag = nvag;
        this.klientName = klientName;
        this.grPod = grPod;
        this.kolOs = kolOs;
        this.taraVag = taraVag;
        this.znakKol = znakKol;
        this.znak = znak;
        this.places = places;
        this.netto = netto;
    }

    @Override
    public String toString() {
        return "VagSmgs2Excel{" +
                "nvag='" + nvag + '\'' +
                ", klientName='" + klientName + '\'' +
                ", grPod=" + grPod +
                ", kolOs=" + kolOs +
                ", taraVag=" + taraVag +
                ", znak_kol=" + znakKol +
                ", znak=" + znak +
                ", places=" + places +
                ", netto=" + netto.toPlainString() +
                '}';
    }
}
