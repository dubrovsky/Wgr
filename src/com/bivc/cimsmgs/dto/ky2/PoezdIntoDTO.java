package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdIntoDTO extends PoezdDTO {

    private TreeSet<VagonIntoDTO> vagons = new TreeSet<>();

    public TreeSet<VagonIntoDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonIntoDTO> vagons) {
        this.vagons = vagons;
    }
}
