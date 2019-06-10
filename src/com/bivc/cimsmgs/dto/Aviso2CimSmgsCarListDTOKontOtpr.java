package com.bivc.cimsmgs.dto;

import java.util.Map;
import java.util.TreeMap;

/**
 * @author p.dzeviarylin
 */
public class Aviso2CimSmgsCarListDTOKontOtpr extends Aviso2CimSmgsCarListDTO{

    private Map<Byte, Aviso2CimSmgsKonListDTO> cimSmgsKonLists = new TreeMap<>();

    public Map<Byte, Aviso2CimSmgsKonListDTO> getCimSmgsKonLists() {
        return cimSmgsKonLists;
    }

    public void setCimSmgsKonLists(Map<Byte, Aviso2CimSmgsKonListDTO> cimSmgsKonLists) {
        this.cimSmgsKonLists = cimSmgsKonLists;
    }
}
