package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.CargoDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Cargo;
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
public class CargoDAOHib extends GenericHibernateDAO<Cargo, Long> implements CargoDAO {
    public List<Cargo> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("cargo"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE)));
        }
        return crit.list();
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }
}
