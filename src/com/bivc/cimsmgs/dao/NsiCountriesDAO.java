package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiCountries;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiCountriesDAO extends GenericDAO<NsiCountries, String> {
    public List<NsiCountries> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    public Long countAll(String search);

    public List<NsiCountries> findAll() throws InfrastructureException;
}
