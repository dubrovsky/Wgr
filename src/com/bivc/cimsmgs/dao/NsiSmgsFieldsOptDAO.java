package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiFieldsOpt;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiSmgsFieldsOptDAO extends GenericDAO<NsiFieldsOpt, Long> {
    public List<NsiFieldsOpt> findAll(Integer limit, Integer start, String search, Integer type) throws InfrastructureException;

    public Long countAll(String search, Integer type);

    List<NsiFieldsOpt> findAll();
}
