package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiSmgsStEuDAO;
import com.bivc.cimsmgs.db.NsiStEu;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiSmgsStEuDAOHib extends GenericHibernateDAO<NsiStEu, Long> implements NsiSmgsStEuDAO
{
  @SuppressWarnings("unchecked")
public List<NsiStEu> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//    crit.addOrder(Order.asc("altered"));
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("nst", query.trim(), MatchMode.ANYWHERE));
    }
    List<NsiStEu> list = crit.list();
//    getSession().clear();
    return list;

  }

  public Long countAll(String query) {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setProjection(Projections.rowCount());
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("nst", query.trim(), MatchMode.ANYWHERE));
    }
    return (Long)crit.uniqueResult();
  }

}
