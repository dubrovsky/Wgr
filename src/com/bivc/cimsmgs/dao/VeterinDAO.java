package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Veterin;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:08
 */
public interface VeterinDAO extends GenericDAO<Veterin, Long>{
    List<Veterin> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);

    List<Veterin> findAll();
}
