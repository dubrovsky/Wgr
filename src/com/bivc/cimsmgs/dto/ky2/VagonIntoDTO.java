package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonIntoDTO extends VagonDTO {

    private TreeSet<KontDTO> kontsInto = new TreeSet<>();

    public TreeSet<KontDTO> getKontsInto() {
        return kontsInto;
    }

    public void setKontsInto(TreeSet<KontDTO> kontsInto) {
        this.kontsInto = kontsInto;
    }
}
