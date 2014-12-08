package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.NsiCsG4;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.util.List;

public interface NsiSmgsG4DAO extends GenericDAO<NsiCsG4, Long> {
  public List<NsiCsG4> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException;
  public Integer countAll(Search search);
}
