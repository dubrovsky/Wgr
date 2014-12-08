package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiSmgsFieldsOptDAO;
import com.bivc.cimsmgs.db.NsiFieldsOpt;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class NsiSmgsFieldsOptDAOHib extends GenericHibernateDAO<NsiFieldsOpt, Long> implements NsiSmgsFieldsOptDAO {
    @SuppressWarnings("unchecked")
    public List<NsiFieldsOpt> findAll(Integer limit, Integer start, String query, Integer type) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        crit.add(Restrictions.eq("nsiFName", type.toString()));
        crit.addOrder(Order.asc("sort"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("nsiFNn", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("nsiFDesc", query.trim(), MatchMode.ANYWHERE)));
        }
//        List<NsiFieldsOpt> list = crit.list();
//        getSession().clear();
        return listAndCast(crit);

    }

    public Long countAll(String query, Integer type) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.add(Restrictions.eq("nsiFName", type.toString()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("nsiFNn", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("nsiFDesc", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiFieldsOpt> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

}
