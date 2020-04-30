package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.VagonDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Vagon;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 05.03.14.
 */

public class VagonDAOHib extends GenericHibernateDAO<Vagon, Long> implements VagonDAO {

    @Override
    public List<Vagon> findPoezdsOut4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

        crit.createCriteria("poezd", "poezd").add(Restrictions.eq("poezd.direction", (byte) 2)).addOrder(Order.desc("dprb"));// otpavlenie

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countPoezdsOut4Kont(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

        crit.createCriteria("poezd", "poezd").add(Restrictions.eq("poezd.direction", (byte) 2));// otpavlenie

        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Vagon> getVagsForPoezdout(Long poezdHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.add(
                Restrictions.eq("poezd.hid", poezdHid)
        );
        return listAndCast(crit);
    }

    private void applyFilter(List<Filter> filters, Criteria crit, Locale locale) {
        if (filters != null && filters.size() > 0) {
            for (Filter filter : filters) {
                if (StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())) {
                    switch (Vagon.FilterFields.valueOf(filter.getProperty().toUpperCase())) {
                        case NVAG:
                            crit.add(Restrictions.ilike(Vagon.FilterFields.NVAG.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case NPPR:
                            crit.add(Restrictions.ilike("poezd." + Vagon.FilterFields.NPPR.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }

                }
            }
        }
    }

    @Override
    public Vagon findByNvag(String nvag) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nvag", nvag));
        crit.addOrder(Order.desc("hid"));
        crit.setMaxResults(1);
        return (Vagon) crit.uniqueResult();
    }

}
