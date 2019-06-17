package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdOutDTO extends PoezdDTO {

    private TreeSet<VagonOutDTO> vagons = new TreeSet<>();


    public TreeSet<VagonOutDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonOutDTO> vagons) {
        this.vagons = vagons;
    }
}
