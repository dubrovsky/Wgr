package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Sta;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiStaDAO extends GenericDAO<Sta, Long> {
    public List<Sta> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    public Long countAll(String search, Usr usr);

    public List<Sta> findAll() throws InfrastructureException;

    public List<Sta> findAll(String query) throws InfrastructureException;
}
