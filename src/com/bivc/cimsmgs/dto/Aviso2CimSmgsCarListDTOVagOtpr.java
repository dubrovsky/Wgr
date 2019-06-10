package com.bivc.cimsmgs.dto;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsCarListDTOVagOtpr extends Aviso2CimSmgsCarListDTO {

    private Map<Integer, Aviso2CimSmgsGruzDTO> cimSmgsGruzs = new TreeMap<>();
    private Map<Integer, Aviso2CimSmgsDocsDTO> cimSmgsDocses9 = new TreeMap<>();
    private Map<Byte, Aviso2CimSmgsPlombDTO> cimSmgsPlombs = new TreeMap<>();

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
}
