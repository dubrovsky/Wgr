package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.NsiDirDAO;
import com.bivc.cimsmgs.db.NsiDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 16.01.12
 * Time: 14:28
 */
public class NsiDirDAOHib extends GenericHibernateDAO<NsiDir, BigDecimal> implements NsiDirDAO {
    public List<NsiDir> findAll(Integer limit, Integer start, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.addOrder(Order.asc("hid"));
        return crit.list();
    }

    public Long countAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());

        return (Long) crit.uniqueResult();
    }
}
