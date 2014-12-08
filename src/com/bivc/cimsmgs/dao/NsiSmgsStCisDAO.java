package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Railroadstation;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.math.BigDecimal;
import java.util.List;

public interface NsiSmgsStCisDAO extends GenericDAO<Railroadstation, BigDecimal> {
  public List<Railroadstation> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;
  public Long countAll(String search);
}
