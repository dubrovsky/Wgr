package com.bivc.cimsmgs.dto.ky.kont;

import com.bivc.cimsmgs.dto.ky.GruzDTO;
import com.bivc.cimsmgs.dto.ky.PlombDTO;

import java.util.TreeSet;

/**
 * Created by dubrovsky on 25.01.2015.
 */
public interface IKontDTO extends IKontOperations {

    TreeSet<GruzDTO> getGruzs();

    void setGruzs(TreeSet<GruzDTO> gruzs);

    TreeSet<PlombDTO> getPlombs();

    void setPlombs(TreeSet<PlombDTO> plombs);

}