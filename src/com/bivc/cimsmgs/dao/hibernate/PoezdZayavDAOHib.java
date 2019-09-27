package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.PoezdZayavDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Zayav;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;
import java.util.Locale;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayavDAOHib  extends GenericHibernateDAO<Zayav, Long> implements PoezdZayavDAO {

    @Override
    public List<Zayav> findAll(Integer limit, Integer start, long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.add(Restrictions.eq("direction", direction));
        crit.add(Restrictions.eq("transport", "P"));
        crit.addOrder(Order.desc("dattr"));

        return listAndCast(crit);
    }

    @Override
    public Long countAll(long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("direction", direction));
        crit.add(Restrictions.eq("transport", "P"));

        crit.setProjection(Projections.countDistinct("hid"));
        return (Long) crit.uniqueResult();
    }
}
