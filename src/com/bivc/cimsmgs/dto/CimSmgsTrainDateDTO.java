package com.bivc.cimsmgs.dto;

import java.util.Objects;

public class CimSmgsTrainDateDTO {

    private String npoezd;
    private Long count;

    public CimSmgsTrainDateDTO(String npoezd, Long count) {
        this.npoezd = npoezd;
        this.count = count;
    }

    public CimSmgsTrainDateDTO() {
    }

    public String getNpoezd() {
        return npoezd;
    }

    public Long getCount() {
        return count;
    }

    public void setNpoezd(String npoezd) {
        this.npoezd = npoezd;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgsTrainDateDTO that = (CimSmgsTrainDateDTO) o;
        return count == that.count &&
                Objects.equals(npoezd, that.npoezd);
    }

    @Override
    public String toString() {
        return "CimSmgsTrainDateDTO{" +
                "npoezd='" + npoezd + '\'' +
                ", count=" + count +
                '}';
    }
}
