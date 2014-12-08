package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.nsi.Users;

import java.math.BigDecimal;

public interface UsersDAO extends GenericDAO<Users, BigDecimal>
{
  public Users findByName(String username);
}
