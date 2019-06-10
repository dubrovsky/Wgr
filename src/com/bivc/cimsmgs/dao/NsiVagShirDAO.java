package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.ky.NsiVagShir;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiVagShirDAO extends GenericDAO<NsiVagShir, Long> {
    List<NsiVagShir> findAll(Integer limit, Integer start,/*, String query*/List<Filter> filters);

    Long countAll(/*String query*/List<Filter> filters);

    NsiVagShir findBy(String nvag);

    NsiVagShir findBy(String nvag, Long hid);
}
