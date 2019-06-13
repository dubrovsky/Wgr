package com.bivc.cimsmgs.dto.ky2;

import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdOutDTO extends PoezdDTO {

    private Set<VagonOutDTO> vagons = new TreeSet<>();


    public Set<VagonOutDTO> getVagons() {
        return vagons;
    }

    public void setVagons(Set<VagonOutDTO> vagons) {
        this.vagons = vagons;
    }
}
