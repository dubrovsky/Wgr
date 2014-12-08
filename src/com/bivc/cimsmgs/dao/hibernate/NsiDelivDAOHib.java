package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiDelivDAO;
import com.bivc.cimsmgs.db.NsiDeliv;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 07.12.11
 * Time: 14:15
 */
public class NsiDelivDAOHib extends GenericHibernateDAO<NsiDeliv, BigDecimal> implements NsiDelivDAO {
    public List<NsiDeliv> findAll(Integer limit, Integer start, String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("dnameR"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("dnameR", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("dnameR", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiDeliv> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }
}
