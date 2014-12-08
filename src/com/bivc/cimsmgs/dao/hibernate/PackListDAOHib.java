package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.PackListDAO;
import com.bivc.cimsmgs.db.PackList;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class PackListDAOHib extends GenericHibernateDAO<PackList, Long> implements PackListDAO {
    final static private Logger log = LoggerFactory.getLogger(PackListDAOHib.class);

    @SuppressWarnings("unchecked")
    public List<PackList> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit);
        crit.addOrder(Order.asc("dattr"));

        if (query != null && !query.equals("null") && query.trim().length() > 0) {
            crit.add(Restrictions.eq("hid_cs", new Long(query.trim())));
        } else {
            crit.add(Restrictions.eq("hid_cs", new Long("0")));
        }
        List<PackList> list = crit.list();
        getSession().clear();
        return list;
    }

    public Integer countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
//    crit.add(Restrictions.isNull("deleted"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.eq("hid_cs", new Long(query.trim())));
            return (Integer) crit.uniqueResult();
        } else {
            crit.add(Restrictions.eq("hid_cs", new Long("0")));
            return 0;
        }
    }

}

