package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiSmgsCompanyDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Company;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

public class NsiSmgsCompanyDAOHib extends GenericHibernateDAO<Company, BigDecimal> implements NsiSmgsCompanyDAO
{
  @SuppressWarnings("unchecked")
public List<Company> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
//    Criteria crit = getSession().createCriteria(getPersistentClass());
    Criteria crit = getSession().
      createCriteria(getPersistentClass()).
      createAlias("country", "country", CriteriaSpecification.INNER_JOIN).
      createAlias("addresses", "addres", CriteriaSpecification.LEFT_JOIN);

    crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
    crit.add(Restrictions.eq("isActive", "Y"));
//    crit.add(Restrictions.eq("id", new BigDecimal("100605")));
//    crit.addOrder(Order.asc("altered"));
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("name", Constants.javascriptString(query.trim()), MatchMode.ANYWHERE));
    }
    List<Company> list = crit.list();
//    getSession().clear();
    return list;
  }

  public Long countAll(String query) {
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.setProjection(Projections.rowCount());
    crit.add(Restrictions.eq("isActive", "Y"));
    if(query != null && query.trim().length() > 0)
    {
       crit.add(Restrictions.ilike("name", Constants.javascriptString(query.trim()), MatchMode.ANYWHERE));
    }
    return (Long)crit.uniqueResult();
  }

}
