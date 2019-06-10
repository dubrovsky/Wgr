package com.bivc.cimsmgs.dto.ky;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by p.dzeviarylin on 09.11.2014 14:48.
 */
public class ListForPoezdDTO {
    private int vagSum = 0;
    private int kontSum = 0;

    private List<ListForVagonDTO> vags = new ArrayList<ListForVagonDTO>();

    public int getVagSum() {
        return vagSum;
    }

    public void setVagSum(int vagSum) {
        this.vagSum = vagSum;
    }

    public int getKontSum() {
        return kontSum;
    }

    public void setKontSum(int kontSum) {
        this.kontSum = kontSum;
    }


    public List<ListForVagonDTO> getVags() {
        return vags;
    }

    public void setVags(List<ListForVagonDTO> vags) {
        this.vags = vags;
    }
}
