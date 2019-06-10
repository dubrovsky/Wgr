package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.nsi.CargoDanGV;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiCargoDanGVDAO extends GenericDAO<CargoDanGV, Long>{

    List<CargoDanGV> findAll() throws InfrastructureException;

}
