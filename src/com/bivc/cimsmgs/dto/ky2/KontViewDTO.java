package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontViewDTO extends KontDTO {

    private TreeSet<KontGruzHistoryDTO> history = new TreeSet<>();
    private boolean sameKont = false;

    public TreeSet<KontGruzHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(TreeSet<KontGruzHistoryDTO> history) {
        this.history = history;
    }

    public boolean isSameKont() {
        return sameKont;
    }

    public void setSameKont(boolean sameKont) {
        this.sameKont = sameKont;
    }
}
