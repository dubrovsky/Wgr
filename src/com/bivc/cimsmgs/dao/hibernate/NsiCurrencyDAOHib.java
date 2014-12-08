package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCurrencyDAO;
import com.bivc.cimsmgs.db.NsiCurrency;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiCurrencyDAOHib extends GenericHibernateDAO<NsiCurrency, Integer> implements NsiCurrencyDAO {
    public List<NsiCurrency> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("name"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("abv3", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("abv3", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiCurrency> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        return listAndCast(crit);
    }
}
