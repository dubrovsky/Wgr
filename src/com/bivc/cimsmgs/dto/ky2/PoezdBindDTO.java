package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdBindDTO {

    private Long hid;
    private Byte direction;
    private TreeSet<VagonBindDTO> vagons = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<VagonBindDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonBindDTO> vagons) {
        this.vagons = vagons;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }
}
