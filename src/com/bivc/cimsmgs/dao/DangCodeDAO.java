package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.DangCode;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:08
 */
public interface DangCodeDAO extends GenericDAO<DangCode, Long>{
    List<DangCode> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);

    List<DangCode> findAll();
}
