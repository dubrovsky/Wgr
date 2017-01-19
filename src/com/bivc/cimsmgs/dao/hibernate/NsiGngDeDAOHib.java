package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiGngDeDAO;
import com.bivc.cimsmgs.db.nsi.NsiGngDe;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiGngDeDAOHib extends GenericHibernateDAO<NsiGngDe, Long> implements NsiGngDeDAO{

    @Override
    public List<NsiGngDe> findAll(Integer limit, Integer start, String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("kgvn"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("kgvn", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("nzgr", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("kgvn", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("nzgr", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiGngDe> findAll(String kgvn) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("kgvn", kgvn.trim()));
        return listAndCast(crit);
    }
}
