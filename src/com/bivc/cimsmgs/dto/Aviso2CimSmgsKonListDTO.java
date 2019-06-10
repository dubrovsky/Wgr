package com.bivc.cimsmgs.dto;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsKonListDTO {

    private String notes;
    private String utiN;
    private BigDecimal sizeFoot;
    private BigDecimal sizeMm;
    private Short taraKont;
    private String utiType;
    private BigDecimal grpod;
    private Byte sort;
    private Map<Integer, Aviso2CimSmgsGruzDTO> cimSmgsGruzs = new TreeMap<>();
    private Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses9 = new TreeMap<>();
    private Map<Byte, Aviso2CimSmgsPlombDTO> cimSmgsPlombs = new TreeMap<>();

    public Aviso2CimSmgsKonListDTO() {
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getUtiN() {
        return utiN;
    }

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public BigDecimal getSizeFoot() {
        return sizeFoot;
    }

    public void setSizeFoot(BigDecimal sizeFoot) {
        this.sizeFoot = sizeFoot;
    }

    public BigDecimal getSizeMm() {
        return sizeMm;
    }

    public void setSizeMm(BigDecimal sizeMm) {
        this.sizeMm = sizeMm;
    }

    public Short getTaraKont() {
        return taraKont;
    }

    public void setTaraKont(Short taraKont) {
        this.taraKont = taraKont;
    }

    public String getUtiType() {
        return utiType;
    }

    public void setUtiType(String utiType) {
        this.utiType = utiType;
    }

    public BigDecimal getGrpod() {
        return grpod;
    }

    public void setGrpod(BigDecimal grpod) {
        this.grpod = grpod;
    }

    public Map<Integer, Aviso2CimSmgsGruzDTO> getCimSmgsGruzs() {
        return cimSmgsGruzs;
    }

    public void setCimSmgsGruzs(Map<Integer, Aviso2CimSmgsGruzDTO> cimSmgsGruzs) {
        this.cimSmgsGruzs = cimSmgsGruzs;
    }

    public Map<Integer, Aviso2CimSmgsDocsDTO> getCimSmgsDocses9() {
        return cimSmgsDocses9;
    }

    public void setCimSmgsDocses9(Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses9) {
        this.cimSmgsDocses9 = cimSmgsDocses9;
    }

    public Map<Byte, Aviso2CimSmgsPlombDTO> getCimSmgsPlombs() {
        return cimSmgsPlombs;
    }

    public void setCimSmgsPlombs(Map<Byte, Aviso2CimSmgsPlombDTO> cimSmgsPlombs) {
        this.cimSmgsPlombs = cimSmgsPlombs;
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
        Aviso2CimSmgsKonListDTO that = (Aviso2CimSmgsKonListDTO) o;
        return Objects.equals(notes, that.notes) &&
                Objects.equals(utiN, that.utiN) &&
                Objects.equals(sizeFoot, that.sizeFoot) &&
                Objects.equals(sizeMm, that.sizeMm) &&
                Objects.equals(taraKont, that.taraKont) &&
                Objects.equals(utiType, that.utiType) &&
                Objects.equals(grpod, that.grpod) &&
                Objects.equals(sort, that.sort);
    }

    @Override
    public int hashCode() {
        return Objects.hash(notes, utiN, sizeFoot, sizeMm, taraKont, utiType, grpod, sort);
    }

    @Override
    public String toString() {
        return "Aviso2CimSmgsKonListDTO{" +
                "notes='" + notes + '\'' +
                ", utiN='" + utiN + '\'' +
                ", sizeFoot=" + sizeFoot +
                ", sizeMm=" + sizeMm +
                ", taraKont=" + taraKont +
                ", utiType='" + utiType + '\'' +
                ", grpod=" + grpod +
                ", sort=" + sort +
                '}';
    }
}
