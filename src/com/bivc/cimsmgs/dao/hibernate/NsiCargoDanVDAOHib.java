package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCargoDanVDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoDanV;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiCargoDanVDAOHib extends GenericHibernateDAO<CargoDanV, Long> implements NsiCargoDanVDAO {

    @Override
    public List<CargoDanV> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("numOon", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("carDName", query.trim(), MatchMode.ANYWHERE)));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("numOon", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("carDName", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }
}
