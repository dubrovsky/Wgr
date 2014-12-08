package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiPlatelDAO;
import com.bivc.cimsmgs.db.NsiPlatel;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiPlatelDAOHib extends GenericHibernateDAO<NsiPlatel, Long> implements NsiPlatelDAO {
    @SuppressWarnings("unchecked")
    public List<NsiPlatel> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        crit.addOrder(Order.desc("altered"));
        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("platR", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("dorR", query.trim(), MatchMode.ANYWHERE)));
        }

//        List<NsiPlatel> list = crit.list();
        return listAndCast(crit);
    }

    public Long countAll(String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("platR", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("dorR", query.trim(), MatchMode.ANYWHERE)));
        }

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiPlatel> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

}
