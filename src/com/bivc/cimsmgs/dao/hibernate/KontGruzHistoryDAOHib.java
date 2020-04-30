package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.KontGruzHistoryDAO;
import com.bivc.cimsmgs.db.ky.KontGruzHistory;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.Collections;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class KontGruzHistoryDAOHib extends GenericHibernateDAO<KontGruzHistory, Long> implements KontGruzHistoryDAO {

    public KontGruzHistory findEarliestHistoryByArrival(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("kont.hid", kontId));
        crit.add(Restrictions.eq("direction", (byte)1));
        crit.addOrder(Order.desc("dateOperation"));
        crit.setMaxResults(1);

        return (KontGruzHistory) crit.uniqueResult();
    }
    public List<KontGruzHistory> findEarliestHistoryByArrivalList(List<Long> kontId) {
        if (kontId.isEmpty()) return Collections.emptyList();
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.in("kont.hid", kontId));
        crit.add(Restrictions.eq("direction", (byte)1));
        crit.addOrder(Order.desc("dateOperation"));
        return listAndCast(crit);
    }
}
