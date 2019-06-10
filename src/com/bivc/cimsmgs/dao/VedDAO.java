package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.Ved;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface VedDAO extends GenericDAO<Ved, Long> {
//  public List<CimSmgsInvoice> findAll(/*Integer limit, Integer start,*/ Long hid_cs) throws InfrastructureException;
//  public Integer countAll(String query);

    public List<Ved> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException;

    public Long countAll(Search search, Usr usr);

    public Ved findById2(Ved invoice);

    List<Ved> findStat(Integer limit, Integer start, Search search, Usr usr);

    Long countAllStat(Search search, Usr usr);

//    Long countAll(PackDoc packDoc);

    void delete(Long hid);
}
