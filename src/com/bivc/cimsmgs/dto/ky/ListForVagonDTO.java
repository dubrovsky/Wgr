package com.bivc.cimsmgs.dto.ky;

/**
 * Created by p.dzeviarylin on 09.11.2014 16:45.
 */
public class ListForVagonDTO {
    private String nvag;
    private String nkon;
    private Integer numpp;
    private Boolean poruz;

    private String npprInto;
    private String npprOut;
    private String nvagInto;
    private String nvagOut;

    private String avtoInto;
    private String avtoOut;

    private String kySector;
    private Long kyX;
    private Long kyY;
    private Long kyZ;


    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Boolean getPoruz() {
        return poruz;
    }

    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    public Integer getNumpp() {
        return numpp;
    }

    public void setNumpp(Integer numpp) {
        this.numpp = numpp;
    }

    public String getNpprInto() {
        return npprInto;
    }

    public void setNpprInto(String npprInto) {
        this.npprInto = npprInto;
    }

    public String getNpprOut() {
        return npprOut;
    }

    public void setNpprOut(String npprOut) {
        this.npprOut = npprOut;
    }

    public String getNvagInto() {
        return nvagInto;
    }

    public void setNvagInto(String nvagInto) {
        this.nvagInto = nvagInto;
    }

    public String getNvagOut() {
        return nvagOut;
    }

    public void setNvagOut(String nvagOut) {
        this.nvagOut = nvagOut;
    }

    public String getAvtoInto() {
        return avtoInto;
    }

    public void setAvtoInto(String avtoInto) {
        this.avtoInto = avtoInto;
    }

    public String getAvtoOut() {
        return avtoOut;
    }

    public void setAvtoOut(String avtoOut) {
        this.avtoOut = avtoOut;
    }

    public String getKySector() {
        return kySector;
    }

    public void setKySector(String kySector) {
        this.kySector = kySector;
    }

    public Long getKyX() {
        return kyX;
    }

    public void setKyX(Long kyX) {
        this.kyX = kyX;
    }

    public Long getKyY() {
        return kyY;
    }

    public void setKyY(Long kyY) {
        this.kyY = kyY;
    }

    public Long getKyZ() {
        return kyZ;
    }

    public void setKyZ(Long kyZ) {
        this.kyZ = kyZ;
    }
}
