package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.RouteDocsDAO;
import com.bivc.cimsmgs.db.DocDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: 1
 * Date: 24.12.11
 * Time: 16:23
 * To change this template use File | Settings | File Templates.
 */
public class RouteDocsDAOHib extends GenericHibernateDAO<DocDir, Long> implements RouteDocsDAO {
    public List<DocDir> findAll(Integer limit, Integer start, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.addOrder(Order.asc("name"));
        return crit.list();
    }
}
