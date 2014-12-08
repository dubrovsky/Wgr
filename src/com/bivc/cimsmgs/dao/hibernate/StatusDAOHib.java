package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.StatusDAO;
import com.bivc.cimsmgs.db.Status;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

/**
 * Date: 17.04.12
 * Time: 11:32
 */
public class StatusDAOHib extends GenericHibernateDAO<Status, Long> implements StatusDAO {
    public void disableStatus1(Long hidCs, BigDecimal hid) {
        final String query = "UPDATE Status s SET s.datEnd = :datEnd " + " " +
                " WHERE s.hidCs = :hidCs AND s.docDir.hid =:hid AND s.statusDir.hid = :status AND s.datEnd IS NULL ";
        Query q = getSession().createQuery(query);
        q.setLong("hidCs", hidCs);
        q.setBigDecimal("hid", hid);
        q.setTimestamp("datEnd", new Date());
        q.setBigDecimal("status", new BigDecimal(6));

        q.executeUpdate();
    }

    public void disableStatus2(Long hidCs, BigDecimal hid) {
        final String query = "UPDATE Status s SET s.datEnd = :datEnd " +
                " WHERE s.hidCs = :hidCs AND s.docDir.hid =:hid AND s.statusDir.hid IN (:statuses) AND s.datEnd IS NULL ";
        Query q = getSession().createQuery(query);
        q.setLong("hidCs", hidCs);
        q.setBigDecimal("hid", hid);
        q.setTimestamp("datEnd", new Date());
        q.setParameterList("statuses", new BigDecimal[]{new BigDecimal(3), new BigDecimal(4)});

        q.executeUpdate();
    }

    public List<Status> history(Long hid, String docType) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.createAlias("cimSmgs", "cimSmgs").add(Restrictions.eq("cimSmgs.hid", hid));
        crit.createAlias("docDir", "docDir").add(Restrictions.eq("docDir.hid", new BigDecimal(docType)));
        crit.add(Restrictions.eq("hidCs", new Long(hid)));
        crit.addOrder(Order.desc("datBegin"));
        return crit.list();
    }
}
