package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.KontStatusHistoryDAO;
import com.bivc.cimsmgs.db.ky.KontStatusHistory;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class KontStatusHistoryDAOHib extends GenericHibernateDAO<KontStatusHistory, Long> implements KontStatusHistoryDAO {
    @Override
    public List<KontStatusHistory> findAllHistoryBy(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("kont.hid", kontId));
//        crit.createCriteria("kont", "kont").add(Restrictions.eq("kont.hid", kontId));
        crit.addOrder(Order.desc("hid"));

        return listAndCast(crit);
    }
}
