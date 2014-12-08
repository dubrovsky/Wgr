package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.CimSmgsStatusAllowed;

import java.util.List;

public interface SmgsStatusAllowedDAO extends GenericDAO<CimSmgsStatusAllowed, Long>
{
  public List<CimSmgsStatusAllowed> findByUn(String login);
}
