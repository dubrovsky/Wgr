package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiUpak;

import java.util.List;

/**
 * Date: 07.12.11
 * Time: 14:01
 */
public interface NsiUpakDAO {
    List<NsiUpak> findAll(Integer limit, Integer start, String query);

    Long countAll(String query);

    List<NsiUpak> findAll();
}
