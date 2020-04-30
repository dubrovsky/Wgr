package com.bivc.cimsmgs.dto.ky2;

public class PoezdFilterDTO {

    private Long hid;
    private String npprm;

    public Long getHid() {
        return hid;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public PoezdFilterDTO() {
    }

    public PoezdFilterDTO(Long hid, String npprm) {
        this.hid = hid;
        this.npprm = npprm;
    }

    @Override
    public String toString() {
        return "PoezdFilterDTO{" +
                "hid=" + hid +
                ", npprm='" + npprm + '\'' +
                '}';
    }
}
