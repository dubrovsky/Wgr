package com.bivc.cimsmgs.dto.ky2;

import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonIntoDTO extends VagonDTO {

    private Set<KontDTO> kontsInto = new TreeSet<>();

    public Set<KontDTO> getKontsInto() {
        return kontsInto;
    }

    public void setKontsInto(Set<KontDTO> kontsInto) {
        this.kontsInto = kontsInto;
    }
}
