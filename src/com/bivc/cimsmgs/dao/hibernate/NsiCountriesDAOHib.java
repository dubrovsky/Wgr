package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCountriesDAO;
import com.bivc.cimsmgs.db.NsiCountries;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiCountriesDAOHib extends GenericHibernateDAO<NsiCountries, String> implements NsiCountriesDAO {
    @SuppressWarnings("unchecked")
    public List<NsiCountries> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        crit.addOrder(Order.asc("naim"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(
                    Restrictions.or(Restrictions.ilike("krnaim", query.trim(), MatchMode.ANYWHERE),
                            Restrictions.ilike("abc2", query.trim(), MatchMode.ANYWHERE)),
                    Restrictions.ilike("anaim", query.trim(), MatchMode.ANYWHERE)));
        }
        List<NsiCountries> list = crit.list();
//    getSession().clear();
        return list;

    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
//            crit.add(Restrictions.or(Restrictions.ilike("naim", query.trim(), MatchMode.ANYWHERE),
//                    Restrictions.ilike("abc2", query.trim(), MatchMode.ANYWHERE)));
            crit.add(Restrictions.or(
                    Restrictions.or(Restrictions.ilike("krnaim", query.trim(), MatchMode.ANYWHERE),
                            Restrictions.ilike("abc2", query.trim(), MatchMode.ANYWHERE)),
                    Restrictions.ilike("anaim", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiCountries> findAll() throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

}
