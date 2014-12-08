package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiSmgsStCisDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Railroadstation;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

public class NsiSmgsStCisDAOHib extends GenericHibernateDAO<Railroadstation, BigDecimal> implements NsiSmgsStCisDAO
{
  @SuppressWarnings("unchecked")
public List<Railroadstation> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
    crit.add(Restrictions.eq("recState", "A"));
//    crit.add(Restrictions.eq("id", new BigDecimal("30694")));
//    crit.addOrder(Order.asc("altered"));
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("mlName", Constants.javascriptString(query.trim()), MatchMode.ANYWHERE));
    }
    List<Railroadstation> list = crit.list();
//    getSession().clear();
    return list;

  }

  public Long countAll(String query) {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setProjection(Projections.rowCount());
    crit.add(Restrictions.eq("recState", "A"));
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("mlName", Constants.javascriptString(query.trim()), MatchMode.ANYWHERE));
    }
    return (Long)crit.uniqueResult();
  }

}
