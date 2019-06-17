package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class VagonOutDTO  extends VagonDTO  {

    private TreeSet<KontDTO> kontsOut = new TreeSet<>();

    public TreeSet<KontDTO> getKontsOut() {
        return kontsOut;
    }

    public void setKontsOut(TreeSet<KontDTO> kontsOut) {
        this.kontsOut = kontsOut;
    }
}
