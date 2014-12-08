package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.UsersDAO;
import com.bivc.cimsmgs.db.nsi.Users;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;

public class UsersDAOHib extends GenericHibernateDAO<Users, BigDecimal> implements UsersDAO
{
  public Users findByName(String username)
  {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.add(Restrictions.eq("loginName",  username.toLowerCase()));
    return (Users)crit.uniqueResult();

  }
}
