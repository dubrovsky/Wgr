package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontStatus;
import com.bivc.cimsmgs.db.ky.KontStatusHistory;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface IKontStatusHistoryService {
    KontStatusHistory findKontPrevStatusInHistory(Kont kont, List<KontStatusHistory> kontStatusHistories);

    KontStatusHistory findKontPrevPrevStatusInHistory(Kont kont, List<KontStatusHistory> kontStatusHistories);

    List<KontStatusHistory> findKontHistoryStatusesFor(KontStatus curStatus, List<KontStatusHistory> historyList);
}
