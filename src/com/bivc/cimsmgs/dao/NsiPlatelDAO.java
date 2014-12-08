package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiPlatel;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiPlatelDAO extends GenericDAO<NsiPlatel, Long> {
    public List<NsiPlatel> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    public Long countAll(String query, Usr usr);

    List<NsiPlatel> findAll();
}
