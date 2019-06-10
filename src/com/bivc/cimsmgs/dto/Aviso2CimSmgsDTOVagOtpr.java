package com.bivc.cimsmgs.dto;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsDTOVagOtpr extends Aviso2CimSmgsDTO{

    private Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr> cimSmgsCarLists = new TreeMap<>();

    public Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr> getCimSmgsCarLists() {
        return cimSmgsCarLists;
    }

    public void setCimSmgsCarLists(Map<Byte, Aviso2CimSmgsCarListDTOVagOtpr> cimSmgsCarLists) {
        this.cimSmgsCarLists = cimSmgsCarLists;
    }
}
