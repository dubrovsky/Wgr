package com.bivc.cimsmgs.dto;

import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsPlombDTO {

    private String znak;
    private Short kpl;
    private String type;
    private Byte sort;

    public Aviso2CimSmgsPlombDTO() {
    }

    public String getZnak() {
        return znak;
    }

    public void setZnak(String znak) {
        this.znak = znak;
    }

    public Short getKpl() {
        return kpl;
    }

    public void setKpl(Short kpl) {
        this.kpl = kpl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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
        Aviso2CimSmgsPlombDTO that = (Aviso2CimSmgsPlombDTO) o;
        return Objects.equals(znak, that.znak) &&
                Objects.equals(kpl, that.kpl) &&
                Objects.equals(type, that.type) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(znak, kpl, type, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsPlombDTO{" +
                "znak='" + znak + '\'' +
                ", kpl=" + kpl +
                ", type='" + type + '\'' +
                ", sort=" + sort +
                '}';
    }
}
