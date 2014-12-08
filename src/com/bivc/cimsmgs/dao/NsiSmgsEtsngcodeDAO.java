package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Cargo;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.math.BigDecimal;
import java.util.List;

public interface NsiSmgsEtsngcodeDAO extends GenericDAO<Cargo, BigDecimal> {
    public List<Cargo> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    public Long countAll(String search);

    public List<Cargo> findAll() throws InfrastructureException;
}
