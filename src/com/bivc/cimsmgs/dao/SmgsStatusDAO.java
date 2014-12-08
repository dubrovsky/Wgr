package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.CimSmgsStatus;

import java.math.BigDecimal;
import java.util.List;

public interface SmgsStatusDAO extends GenericDAO<CimSmgsStatus, Long> {
  public List<CimSmgsStatus> findByUnNotArh(Long hidCs, String un);
  public List<CimSmgsStatus> findByCompNotArh(Long hidCs, BigDecimal hidComp);
  public List<CimSmgsStatus> findAll(Long hidCs);
  public Long countAll(Long hidCs);
}
