package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.NsiCsG1;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiSmgsG1DAO extends GenericDAO<NsiCsG1, Long> {
    public List<NsiCsG1> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    public Long countAll(String query, Usr usr);

    public boolean isNewEntry(CimSmgs smgs, String who);

    List<NsiCsG1> findAll();
}
