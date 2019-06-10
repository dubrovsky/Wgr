package com.bivc.cimsmgs.dto.ky;

import com.bivc.cimsmgs.dto.ky.kont.KontIntoDTO;
import com.bivc.cimsmgs.dto.ky.kont.KontOutDTO;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class PoezdDTO extends PoezdBaseDTO{

    private TreeSet<KontIntoDTO> kontsOut = new TreeSet<>();
    private TreeSet<KontOutDTO> kontsInto = new TreeSet<>();
    private TreeSet<VagonDTO> vagons = new TreeSet<>();

    public TreeSet<KontIntoDTO> getKontsOut() {
        return kontsOut;
    }

    public void setKontsOut(TreeSet<KontIntoDTO> kontsOut) {
        this.kontsOut = kontsOut;
    }

    public TreeSet<KontOutDTO> getKontsInto() {
        return kontsInto;
    }

    public void setKontsInto(TreeSet<KontOutDTO> kontsInto) {
        this.kontsInto = kontsInto;
    }

    public TreeSet<VagonDTO> getVagons() {
        return vagons;
    }

    public void setVagons(TreeSet<VagonDTO> vagons) {
        this.vagons = vagons;
    }
}
