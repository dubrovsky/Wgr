package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoDanV;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiCargoDanVDAO extends GenericDAO<CargoDanV, Long>{

    List<CargoDanV> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;

    Long countAll(String search);
}
