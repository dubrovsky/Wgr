package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiCurrency;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

/**
 * Date: 02.06.11
 * Time: 14:05
 */
public interface NsiCurrencyDAO  extends GenericDAO<NsiCurrency, Integer>{
    List<NsiCurrency> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);

    List<NsiCurrency> findAll();
}
