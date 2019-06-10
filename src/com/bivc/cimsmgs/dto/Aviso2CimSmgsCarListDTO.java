package com.bivc.cimsmgs.dto;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsCarListDTO {

    private String nvag;
    private String vagOtm;
    private BigDecimal grPod;
    private BigDecimal taraVag;
    private Byte kolOs;
    private String klientName;
    private String rod;
    private Byte sort;

    public Aviso2CimSmgsCarListDTO() {
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getVagOtm() {
        return vagOtm;
    }

    public void setVagOtm(String vagOtm) {
        this.vagOtm = vagOtm;
    }

    public BigDecimal getGrPod() {
        return grPod;
    }

    public void setGrPod(BigDecimal grPod) {
        this.grPod = grPod;
    }

    public BigDecimal getTaraVag() {
        return taraVag;
    }

    public void setTaraVag(BigDecimal taraVag) {
        this.taraVag = taraVag;
    }

    public Byte getKolOs() {
        return kolOs;
    }

    public void setKolOs(Byte kolOs) {
        this.kolOs = kolOs;
    }

    public String getKlientName() {
        return klientName;
    }

    public void setKlientName(String klientName) {
        this.klientName = klientName;
    }

    public String getRod() {
        return rod;
    }

    public void setRod(String rod) {
        this.rod = rod;
    }

    public Byte getSort() {
        return sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Aviso2CimSmgsCarListDTO that = (Aviso2CimSmgsCarListDTO) o;
        return Objects.equals(nvag, that.nvag) &&
                Objects.equals(vagOtm, that.vagOtm) &&
                Objects.equals(grPod, that.grPod) &&
                Objects.equals(taraVag, that.taraVag) &&
                Objects.equals(kolOs, that.kolOs) &&
                Objects.equals(klientName, that.klientName) &&
                Objects.equals(rod, that.rod) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nvag, vagOtm, grPod, taraVag, kolOs, klientName, rod, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsCarListDTO{" +
                "nvag='" + nvag + '\'' +
                ", vagOtm='" + vagOtm + '\'' +
                ", grPod=" + grPod +
                ", taraVag=" + taraVag +
                ", kolOs=" + kolOs +
                ", klientName='" + klientName + '\'' +
                ", rod='" + rod + '\'' +
                ", sort=" + sort +
                '}';
    }
}
