package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.ky.NsiVagUzky;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiVagUzkyDAO extends GenericDAO<NsiVagUzky, Long> {
    List<NsiVagUzky> findAll(Integer limit, Integer start, List<Filter> filters);

    Long countAll(List<Filter> filters);

    NsiVagUzky findBy(String nvag);

    NsiVagUzky findBy(String nvag, Long hid);
}
