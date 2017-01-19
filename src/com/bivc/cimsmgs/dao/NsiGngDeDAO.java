package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.nsi.NsiGngDe;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiGngDeDAO extends GenericDAO<NsiGngDe, Long>{
    List<NsiGngDe> findAll(Integer limit, Integer start, String query);

    Long countAll(String query);

    List<NsiGngDe> findAll(String kgvn);
}
