package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoGng;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:08
 */
public interface CargoGngDAO extends GenericDAO<CargoGng, Long>{
    List<CargoGng> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);

    List<CargoGng> findAll();
}
