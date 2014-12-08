package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.PackList;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface PackListDAO extends GenericDAO<PackList, Long> {
  public List<PackList> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;
  public Integer countAll(String query);
}
