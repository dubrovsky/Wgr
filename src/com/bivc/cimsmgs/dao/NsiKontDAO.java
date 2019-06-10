package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.ky.NsiKont;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiKontDAO extends GenericDAO<NsiKont, Long> {
    List<NsiKont> findAll(Integer limit, Integer start,/*, String query*/List<Filter> filters);

    Long countAll(/*String query*/List<Filter> filters);

    NsiKont findBy(String nkon);

    NsiKont findBy(String nkon, Long hid);
}
