package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.RouteDAO;
import com.bivc.cimsmgs.db.Route;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * Date: 13.01.12
 * Time: 10:28
 */
public class RouteDAOHib extends GenericHibernateDAO<Route, Long> implements RouteDAO {
    public List<Route> findAll(Integer limit, Integer start, String query, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("name"));
        if (query != null && query.trim().length() > 0) {
//            String[] ff = query.split(",");
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        if (search != null && StringUtils.isNotEmpty(search.getProject())) {
            crit.createAlias("project", "project").add(Restrictions.eq("project.name", search.getProject()));
        }
        return crit.list();
    }

    public Long countAll(String query, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        if (search != null && StringUtils.isNotEmpty(search.getProject())) {
            crit.createAlias("project", "project").add(Restrictions.eq("project.name", search.getProject()));
        }
        return (Long) crit.uniqueResult();
    }

  /*  @Override
    public Route findForDeleted() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("forDeleted", true));

        return (Route) crit.uniqueResult();
    }*/
}
