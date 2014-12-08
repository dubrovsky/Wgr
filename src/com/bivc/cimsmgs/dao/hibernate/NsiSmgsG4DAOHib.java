package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.NsiSmgsG4DAO;
import com.bivc.cimsmgs.db.NsiCsG4;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;

import java.util.List;

public class NsiSmgsG4DAOHib extends GenericHibernateDAO<NsiCsG4, Long> implements NsiSmgsG4DAO
{
  @SuppressWarnings("unchecked")
public List<NsiCsG4> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
    Criteria crit = getSession().createCriteria(getPersistentClass());
//    crit.setFirstResult(start).setMaxResults(limit);
    crit.addOrder(Order.desc("altered"));
    List<NsiCsG4> list = crit.list();
//    getSession().clear();
    return list;

  }

  public Integer countAll(Search search) {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setProjection(Projections.rowCount());
    return (Integer)crit.uniqueResult();
  }

}
