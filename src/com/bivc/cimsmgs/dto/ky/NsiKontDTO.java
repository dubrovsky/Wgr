package com.bivc.cimsmgs.dto.ky;

/**
 * @author p.dzeviarylin
 */
public class NsiKontDTO {
    private Long hid;
    private String nkont;
    private String yearbuild;
    private String type;
    private Integer massaTar;
    private Integer podSila;
    private Long vol;
    private String sizeFoot;
    private NsiKyOwnersDTO owner;
    private String naim_sob;

    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }

    public String getSizeFoot() {
        return sizeFoot;
    }

    public void setSizeFoot(String sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }


    public enum FilterFields{
        NKON("nkont")
        ;
        private final String name;

        FilterFields(String name){
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNkont() {
        return nkont;
    }

    public void setNkont(String nkont) {
        this.nkont = nkont;
    }

    public String getYearbuild() {
        return yearbuild;
    }

    public void setYearbuild(String yearbuild) {
        this.yearbuild = yearbuild;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getMassaTar() {
        return massaTar;
    }

    public void setMassaTar(Integer massaTar) {
        this.massaTar = massaTar;
    }

    public Integer getPodSila() {
        return podSila;
    }

    public void setPodSila(Integer podSila) {
        this.podSila = podSila;
    }

    public Long getVol() {
        return vol;
    }

    public void setVol(Long vol) {
        this.vol = vol;
    }

}
