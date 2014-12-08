package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiStaDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Sta;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiStaDAOHib extends GenericHibernateDAO<Sta, Long> implements NsiStaDAO {
	public List<Sta> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
		Criteria crit = getSession().createCriteria(getPersistentClass());
		crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//        crit.add(Restrictions.in("trans", usr.getTrans()));
		if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("staName", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("staNo", query.trim(), MatchMode.ANYWHERE)));
		}
        return listAndCast(crit);
	}

	public Long countAll(String query, Usr usr) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
		crit.setProjection(Projections.rowCount());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
		if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("staName", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("staNo", query.trim(), MatchMode.ANYWHERE)));
		}
		return (Long) crit.uniqueResult();
	}

    public List<Sta> findAll() throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

    public List<Sta> findAll(String query) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if ((query != null) && (query.trim().length() > 0)) {
            crit.add(Restrictions.ilike("staNo", query.trim(), MatchMode.START));
        }
        return listAndCast(crit);
    }
}
