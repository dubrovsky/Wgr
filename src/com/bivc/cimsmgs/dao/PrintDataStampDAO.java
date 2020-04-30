package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.PrintDataStamp;

import java.util.List;

public interface PrintDataStampDAO extends GenericDAO<PrintDataStamp,Long> {
    List<PrintDataStamp> findAll(Integer limit, Integer start, String query);
    Long countAll(String search);
    PrintDataStamp findByCodePer(String codePer);
}
