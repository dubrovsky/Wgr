package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Cargo;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:08
 */
public interface CargoDAO extends GenericDAO<Cargo, Long>{
    List<Cargo> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);
}
