package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoDanDe;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiCargoDanDeDAO extends GenericDAO<CargoDanDe, Long>{

    List<CargoDanDe> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    Long countAll(String search);
}