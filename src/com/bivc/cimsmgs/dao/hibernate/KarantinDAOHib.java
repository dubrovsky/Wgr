package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.KarantinDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Karantin;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:15
 */
public class KarantinDAOHib extends GenericHibernateDAO<Karantin, Long> implements KarantinDAO {
    public List<Karantin> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("nzgr"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("kgvn", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("nzgr", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

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
    public List<Karantin> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }
}
