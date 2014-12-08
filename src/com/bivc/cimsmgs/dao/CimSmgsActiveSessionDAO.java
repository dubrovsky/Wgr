package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.CimSmgsActiveSession;

import java.math.BigDecimal;

public interface CimSmgsActiveSessionDAO extends GenericDAO<CimSmgsActiveSession, BigDecimal>
{
  public CimSmgsActiveSession findByKey(String key);
}
