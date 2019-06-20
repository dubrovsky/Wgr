package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdDTO {

    private Long hid;
    private TreeSet<VagonDTO> vagons = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<VagonDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonDTO> vagons) {
        this.vagons = vagons;
    }
}
