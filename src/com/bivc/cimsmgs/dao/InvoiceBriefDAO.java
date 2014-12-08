package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.CimSmgsInvoiceBrief;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

public interface InvoiceBriefDAO extends GenericDAO<CimSmgsInvoiceBrief, Long>{
    public List<CimSmgsInvoiceBrief> findAll(Integer limit, Integer start, Search search, Usr usr);
    public Long countAll(Search search, Usr usr);
    public List<CimSmgsInvoiceBrief> findAll1(Integer limit, Integer start, String query);
    public Long countAll1(String query);
}
