package com.bivc.cimsmgs.dto;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsDTOKontOtpr extends Aviso2CimSmgsDTO {

    private Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr> cimSmgsCarLists = new TreeMap<>();

    public Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr> getCimSmgsCarLists() {
        return cimSmgsCarLists;
    }

    public void setCimSmgsCarLists(Map<Byte, Aviso2CimSmgsCarListDTOKontOtpr> cimSmgsCarLists) {
        this.cimSmgsCarLists = cimSmgsCarLists;
    }
}
