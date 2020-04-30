package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.ky.KontGruzHistory;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface KontGruzHistoryDAO extends GenericDAO<KontGruzHistory, Long>{
    public KontGruzHistory findEarliestHistoryByArrival(Long kontId);
    public List<KontGruzHistory> findEarliestHistoryByArrivalList(List<Long> ids);
}
