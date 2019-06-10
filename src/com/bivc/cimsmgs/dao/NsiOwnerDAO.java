package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiOwnerDAO extends GenericDAO<NsiKyOwners, Long> {
    List<NsiKyOwners> findAll(Integer limit, Integer start,/*, String query*/List<Filter> filters);

    Long countAll(/*String query*/List<Filter> filters);

}
