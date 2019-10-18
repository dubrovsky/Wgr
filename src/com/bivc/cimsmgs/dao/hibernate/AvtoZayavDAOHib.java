package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.AvtoZayavDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.AvtoZayav;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 21.02.14.
 */
public class AvtoZayavDAOHib extends GenericHibernateDAO<AvtoZayav, Long> implements AvtoZayavDAO {
    private static final Logger log = LoggerFactory.getLogger(AvtoZayavDAOHib.class);

    @Override
    public List<AvtoZayav> findAll(Integer limit, Integer start, Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        log.debug("Finding all Zayav entries.");

        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
//        crit.add(Restrictions.eq("direction", direction));
//        crit.add(Restrictions.eq("transport", "A"));
        crit.addOrder(Order.desc("dattr"));

//        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }


    @Override
    public List<AvtoZayav> findAllActual(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        log.debug("Finding all actual Zayav entries.");

        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));

        crit.add(Restrictions.eq("direction", direction));
//        crit.add(Restrictions.eq("transport", "A"));
        crit.addOrder(Order.desc("dattr"));

//        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public List<AvtoZayav> findByNkons(Long routeId, Usr usr, List<String> nkons) {
        log.debug("Finding all actual Zayav entries.");

        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        crit.add(Restrictions.eq("direction", direction));
        crit.createAlias("konts", "konts").add(Restrictions.in("konts.nkon", nkons));
        crit.addOrder(Order.desc("dattr"));

//        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }



    @Override
    public Long countAll(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("direction", direction));
//        crit.add(Restrictions.eq("transport", "A"));

        crit.setProjection(Projections.countDistinct("hid"));

//        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<AvtoZayav> findByIds(List<Long> ids) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.in("hid", ids));
        return listAndCast(crit);
    }

}
