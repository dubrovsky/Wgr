package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoGng;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiSmgsGngDAO extends GenericDAO<CargoGng, Long> {
    List<CargoGng> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    Long countAll(String search);

    List<CargoGng> findAll() throws InfrastructureException;

    List<CargoGng> findAll(String kgvn);
}
