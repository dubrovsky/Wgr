package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.ky.KontStatusHistory;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface KontStatusHistoryDAO extends GenericDAO<KontStatusHistory, Long> {
    List<KontStatusHistory> findAllHistoryBy(Long kontId);
}
