package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.CimSmgsFileInf;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface FileInfDAO extends GenericDAO<CimSmgsFileInf, Long> {
    public List<CimSmgsFileInf> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException;

    public Long countAll(Search search, Usr usr);

    public CimSmgsFileInf findById2(CimSmgsFileInf file);

    Long countAll(PackDoc packDoc);
}
