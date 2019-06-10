package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.AvtoDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Avto;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 21.02.14.
 */
public class AvtoDAOHib extends GenericHibernateDAO<Avto, Long> implements AvtoDAO {
    private static final Logger log = LoggerFactory.getLogger(AvtoDAOHib.class);

    @Override
    public List<Avto> findAll(Integer limit, Integer start, Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        log.debug("Finding all Avto entries.");

        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.add(Restrictions.eq("direction", direction));
        crit.addOrder(Order.desc("dattr"));

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }



    @Override
    public Long countAll(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("direction", direction));

        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Avto> findByNo_avto(String no_avto) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("no_avto", no_avto));
        return listAndCast(crit);
    }

    @Override
    public List<Avto> findAvtosOut4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

        crit.add(Restrictions.eq("direction", (byte) 2)).addOrder(Order.desc("dprb"));// otpavlenie

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countAvtosOut4Kont(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

        crit.add(Restrictions.eq("direction", (byte) 2));// otpavlenie

        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    private void applyFilter(List<Filter> filters, Criteria crit, Locale locale) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (Avto.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NO_AVTO:
                            crit.add(Restrictions.ilike(Avto.FilterFields.NO_AVTO.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }
                }

            }
        }
    }
}
