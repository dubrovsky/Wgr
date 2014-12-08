package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.ManagementDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Management;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:17
 */
public class ManagementDAOHib extends GenericHibernateDAO<Management, Long> implements ManagementDAO {
    public List<Management> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("managName"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("managName", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("managNo", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

    @Override
    public List<Management> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("managName", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("managNo", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }
}
