package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface InvoiceDAO extends GenericDAO<CimSmgsInvoice, Long> {
//  public List<CimSmgsInvoice> findAll(/*Integer limit, Integer start,*/ Long hid_cs) throws InfrastructureException;
//  public Integer countAll(String query);

    public List<CimSmgsInvoice> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException;

    public Long countAll(Search search, Usr usr);

    public CimSmgsInvoice findById2(CimSmgsInvoice invoice);

    public List<CimSmgsInvoice>  findByIdinList(List<Long> hids);

    List<CimSmgsInvoice> findStat(Integer limit, Integer start, Search search, Usr usr);

    Long countAllStat(Search search, Usr usr);

    Long countAll(PackDoc packDoc);

    void delete(Long hid);
}
