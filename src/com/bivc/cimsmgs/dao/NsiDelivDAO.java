package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiDeliv;

import java.util.List;

/**
 * Date: 07.12.11
 * Time: 14:00
 */
public interface NsiDelivDAO {
    List<NsiDeliv> findAll(Integer limit, Integer start, String query);

    Long countAll(String query);

    List<NsiDeliv> findAll();
}
