package com.bivc.cimsmgs.dto.ky2;

import java.util.Set;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonOutDTO  extends VagonDTO  {

    private Set<KontDTO> kontsOut = new TreeSet<>();

    public Set<KontDTO> getKontsOut() {
        return kontsOut;
    }

    public void setKontsOut(Set<KontDTO> kontsOut) {
        this.kontsOut = kontsOut;
    }
}
