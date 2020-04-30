package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.PrintDataStampDAO;
import com.bivc.cimsmgs.db.PrintDataStamp;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class PrintDataStampDAOHib extends GenericHibernateDAO<PrintDataStamp,Long> implements PrintDataStampDAO {
    @Override
    public List<PrintDataStamp> findAll(Integer limit, Integer start, String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        return (Long) crit.uniqueResult();
    }

    @Override
    public PrintDataStamp findByCodePer(String codePer) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("codePer",codePer));
        crit.setMaxResults(1);

        return (PrintDataStamp) crit.uniqueResult();
    }
}