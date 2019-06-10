package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.ky.NsiAvto;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiAvtoDAO extends GenericDAO<NsiAvto, Long> {
    List<NsiAvto> findAll(Integer limit, Integer start,/*, String query*/List<Filter> filters);

    Long countAll(/*String query*/List<Filter> filters);

    NsiAvto findBy(String navto);
}
