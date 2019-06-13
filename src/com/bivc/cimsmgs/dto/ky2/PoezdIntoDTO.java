package com.bivc.cimsmgs.dto.ky2;

import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdIntoDTO extends PoezdDTO {

    private Set<VagonIntoDTO> vagons = new TreeSet<>();

    public Set<VagonIntoDTO> getVagons() {
        return vagons;
    }

    public void setVagons(Set<VagonIntoDTO> vagons) {
        this.vagons = vagons;
    }
}
