package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiStEu;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiSmgsStEuDAO extends GenericDAO<NsiStEu, Long> {
  public List<NsiStEu> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;
  public Long countAll(String search);
}
