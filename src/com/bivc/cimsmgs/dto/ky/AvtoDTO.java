package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontIntoDTO;
import com.bivc.cimsmgs.dto.ky.kont.KontOutDTO;

import java.util.TreeSet;

/**
 * Created by dubrovsky on 26.01.2015.
 */
public class AvtoDTO extends AvtoBaseDTO {

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
