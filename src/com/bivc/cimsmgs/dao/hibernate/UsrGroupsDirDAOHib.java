package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.UsrGroupsDirDAO;
import com.bivc.cimsmgs.db.UsrGroupsDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class UsrGroupsDirDAOHib extends GenericHibernateDAO<UsrGroupsDir, String> implements UsrGroupsDirDAO {
    @SuppressWarnings("unchecked")
    public List<UsrGroupsDir> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.addOrder(Order.desc("dattr"));
        return crit.list();
    }

    public List<UsrGroupsDir> findAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("name"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("descr", query.trim(), MatchMode.ANYWHERE)));
        }
        return crit.list();
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("descr", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

//  public Integer update(UsrGroups usrGr)
//  {
//    final String query =
//      "UPDATE Usr u " +
//      "SET u.deptrans = :deptrans, u.descr = :descr, u.locked = :locked, u.dattr = :dattr, u.un = :un " +
//      "WHERE u.hid = :hid";
//    Query q = getSession().createQuery(query);
//    q.setLong("hid", usrGr.getHid());
//    q.setString("deptrans",usrGr.getDeptrans());
//    q.setString("descr",usrGr.getDescr());
//    q.setString("",usrGr.getLocked());
//    q.setTimestamp("dattr",usrGr.getDattr());
//
//    return q.executeUpdate();
//  }
}
