package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.InvoiceBriefDAO;
import com.bivc.cimsmgs.db.CimSmgsInvoiceBrief;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

public class InvoiceBriefDAOHib extends GenericHibernateDAO<CimSmgsInvoiceBrief, Long> implements InvoiceBriefDAO {
    final static private Logger log = LoggerFactory.getLogger(InvoiceBriefDAOHib.class);

    public List<CimSmgsInvoiceBrief> findAll(Integer limit, Integer start, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));
        crit.add(Restrictions.eq("pack.hid", search.getPackId()));

        return crit.list();
    }

    public Long countAll(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        crit.add(Restrictions.eq("pack.hid", search.getPackId()));
        crit.setProjection(Projections.rowCount());
        return (Long) crit.uniqueResult();
    }

    public List<CimSmgsInvoiceBrief> findAll1(Integer limit, Integer start, String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("utiN", query.trim(), MatchMode.ANYWHERE));
        }

        return crit.list();
    }

    public Long countAll1(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("utiN", query.trim(), MatchMode.ANYWHERE));
        }
        return (Long) crit.uniqueResult();
    }

}
