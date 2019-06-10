package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontIntoDTO;
import com.bivc.cimsmgs.dto.ky.kont.KontOutDTO;

import java.util.TreeSet;

/**
 * Created by peter on 20.08.2014.
 */
public class VagonDTO extends VagonBaseDTO {

    private TreeSet<KontOutDTO> kontsOut = new TreeSet<>();
    private TreeSet<KontIntoDTO> kontsInto = new TreeSet<>();

    public TreeSet<KontOutDTO> getKontsOut() {
        return kontsOut;
    }

    public void setKontsOut(TreeSet<KontOutDTO> kontsOut) {
        this.kontsOut = kontsOut;
    }

    public TreeSet<KontIntoDTO> getKontsInto() {
        return kontsInto;
    }

    public void setKontsInto(TreeSet<KontIntoDTO> kontsInto) {
        this.kontsInto = kontsInto;
    }
}
