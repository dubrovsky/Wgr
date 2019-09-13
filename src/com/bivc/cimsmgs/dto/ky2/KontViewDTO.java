package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontViewDTO extends KontDTO {
    private TreeSet<KontGruzHistoryDTO> history = new TreeSet<>();

    public TreeSet<KontGruzHistoryDTO> getHistory() {
        return history;
    }

    public void setHistory(TreeSet<KontGruzHistoryDTO> history) {
        this.history = history;
    }
}
