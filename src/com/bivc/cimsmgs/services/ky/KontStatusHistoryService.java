package com.bivc.cimsmgs.services.ky;

import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontStatus;
import com.bivc.cimsmgs.db.ky.KontStatusHistory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * @author p.dzeviarylin
 */

@Service
public class KontStatusHistoryService implements IKontStatusHistoryService {

    public List<KontStatusHistory> findKontHistoryStatusesFor(KontStatus status, List<KontStatusHistory> kontStatusHistories) {
        List<KontStatusHistory> statusHistorys = new ArrayList<>();
        boolean found = false;
        for(KontStatusHistory statusHistory: kontStatusHistories){
            if(statusHistory.getStatus() == status && statusHistory.isActive()){
                statusHistorys.add(statusHistory);
                found = true;
            } else if(found) {
                break;
            }
        }

        return statusHistorys;
    }

    public KontStatusHistory findKontPrevPrevStatusInHistory(Kont kont, List<KontStatusHistory> kontStatusHistories) {
//        List<KontStatusHistory> kontStatusHistories = statusHistoryDAO.findAllHistoryBy(kontHid);
        Iterator<KontStatusHistory> historyIterator = kontStatusHistories.iterator();
        KontStatus curStatus = findKontCurrentStatus(kont, historyIterator);
        KontStatusHistory prevStatusHistory = findKontPrevStatus(historyIterator, curStatus);
        return findKontPrevStatus(historyIterator, prevStatusHistory.getStatus());
    }

    public KontStatusHistory findKontPrevStatusInHistory(Kont kont, List<KontStatusHistory> kontStatusHistories) {
//        List<KontStatusHistory> kontStatusHistories = statusHistoryDAO.findAllHistoryBy(kontHid);
        Iterator<KontStatusHistory> historyIterator = kontStatusHistories.iterator();
        KontStatus curStatus = findKontCurrentStatus(kont, historyIterator);
        return findKontPrevStatus(historyIterator, curStatus);
    }

    private KontStatusHistory findKontPrevStatus(Iterator<KontStatusHistory> historyIterator, KontStatus curStatus) {
        KontStatusHistory prevStatusHistory = null;
        while (historyIterator.hasNext()){
            prevStatusHistory = historyIterator.next();
            if(prevStatusHistory.getStatus() != curStatus && prevStatusHistory.isActive()){
                break;
            }
        }
        return prevStatusHistory;
    }

    private KontStatus findKontCurrentStatus(Kont kont, Iterator<KontStatusHistory> historyIterator) {
        KontStatusHistory curStatus;
//        Kont kont = kontDAO.findById(kontHid, false);
        do{
            curStatus = historyIterator.next();
            if(curStatus.getStatus() == kont.getStatus() && curStatus.isActive()){
                break;
            }
        } while(historyIterator.hasNext());
        return curStatus.getStatus();
    }
}
