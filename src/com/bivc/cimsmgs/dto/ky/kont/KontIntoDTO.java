package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.GruzDTO;
import com.bivc.cimsmgs.dto.ky.PlombDTO;

import java.util.TreeSet;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public class KontIntoDTO extends KontOperationsIntoDTO implements IKontDTO {

    private TreeSet<GruzDTO> gruzs = new TreeSet<>();
    private TreeSet<PlombDTO> plombs = new TreeSet<>();

    @Override
    public TreeSet<GruzDTO> getGruzs() {
        return gruzs;
    }

    @Override
    public void setGruzs(TreeSet<GruzDTO> gruzs) {
        this.gruzs = gruzs;
    }

    @Override
    public TreeSet<PlombDTO> getPlombs() {
        return plombs;
    }

    @Override
    public void setPlombs(TreeSet<PlombDTO> plombs) {
        this.plombs = plombs;
    }

}
