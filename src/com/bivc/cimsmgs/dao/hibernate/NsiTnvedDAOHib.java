package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiTnvedDAO;
import com.bivc.cimsmgs.db.NsiTnved4;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 10.06.11
 * Time: 11:39
 */
public class NsiTnvedDAOHib extends GenericHibernateDAO<NsiTnved4, BigDecimal> implements NsiTnvedDAO {
    public List<NsiTnved4> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("naim"));
        if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("naim", query.trim(), MatchMode.ANYWHERE)));
		}
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("naim", query.trim(), MatchMode.ANYWHERE)));
		}
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiTnved4> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }
}
