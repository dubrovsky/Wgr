package com.bivc.cimsmgs.dto.ky2;

public class KontGruzHistoryFilterDTO {

    private Long poezdHid;
    private Long avtoHid;
    private String npprm;
    private Long kontHid;

    public KontGruzHistoryFilterDTO(Long poezdHid, Long avtoHid, String npprm, Long kontHid) {
        this.poezdHid = poezdHid;
        this.avtoHid = avtoHid;
        this.npprm = npprm;
        this.kontHid = kontHid;
    }

    public KontGruzHistoryFilterDTO() {
    }

    public Long getKontHid() {
        return kontHid;
    }

    public void setKontHid(Long kontHid) {
        this.kontHid = kontHid;
    }

    public Long getPoezdHid() {
        return poezdHid;
    }

    public Long getAvtoHid() {
        return avtoHid;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setPoezdHid(Long poezdHid) {
        this.poezdHid = poezdHid;
    }

    public void setAvtoHid(Long avtoHid) {
        this.avtoHid = avtoHid;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    @Override
    public String toString() {
        return "KontGruzHistoryFilterDTO{" +
                "poezdHid=" + poezdHid +
                ", avtoHid=" + avtoHid +
                ", npprm='" + npprm + '\'' +
                ", kontHid=" + kontHid +
                '}';
    }
}
