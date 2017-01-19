package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiUpakDAO;
import com.bivc.cimsmgs.db.NsiUpak;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 07.12.11
 * Time: 14:16
 */
public class NsiUpakDAOHib extends GenericHibernateDAO<NsiUpak, BigDecimal> implements NsiUpakDAO {
    public List<NsiUpak> findAll(Integer limit, Integer start, String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("nzypRu"));
        if (query != null && query.trim().length() > 0) {
            crit.add(
                Restrictions.disjunction()
                        .add(Restrictions.ilike("nzypRu", query.trim(), MatchMode.ANYWHERE))
                        .add(Restrictions.ilike("nzypDe", query.trim(), MatchMode.ANYWHERE))
                        .add(Restrictions.ilike("kodOon", query.trim(), MatchMode.ANYWHERE))
            );
        }
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(
                    Restrictions.disjunction()
                            .add(Restrictions.ilike("nzypRu", query.trim(), MatchMode.ANYWHERE))
                            .add(Restrictions.ilike("nzypDe", query.trim(), MatchMode.ANYWHERE))
                            .add(Restrictions.ilike("kodOon", query.trim(), MatchMode.ANYWHERE))
            );
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiUpak> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }
}
