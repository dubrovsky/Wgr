package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.PoezdDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.services.ky.PoezdService;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.IntegerType;
import org.hibernate.type.Type;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 21.02.14.
 */
public class PoezdDAOHib extends GenericHibernateDAO<Poezd, Long> implements PoezdDAO {
    private static final Logger log = LoggerFactory.getLogger(PoezdDAOHib.class);

    @Override
    public List<Poezd> findAll(Integer limit, Integer start, Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale) {
        log.debug("Finding all Poezd entries.");

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
    public List<Poezd> findByNppr(String nppr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nppr", nppr));
        return listAndCast(crit);
    }

    @Override
    public Integer findMaxNppr(PoezdService.PoezdPrefix poezdPrefix, String dateProp, int year) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.like("nppr", poezdPrefix.name(), MatchMode.START).ignoreCase());
        crit.add(Restrictions.conjunction()
                        .add(Restrictions.ge(dateProp, new GregorianCalendar(year, 0, 1).getTime()))
                        .add(Restrictions.lt(dateProp, new GregorianCalendar(year, 11, 31).getTime()))
        );
        crit.setProjection(Projections.sqlProjection("MAX(TO_NUMBER(SUBSTR({alias}.NPPR,3))) as nppr", new String[]{"nppr"}, new Type[]{new IntegerType()}));            //max(to_number(substr(nppr,3)))
        try{
            return (Integer)crit.uniqueResult();
        } catch (Exception ex){
            return -1;
        }

    }

    private void applyFilter(List<Filter> filters, Criteria crit, Locale locale) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (Poezd.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NPPR:
                            crit.add(Restrictions.ilike(Poezd.FilterFields.NPPR.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        /*case SECTOR:
                            crit.add(Restrictions.eq(Yard.FilterFields.SECTOR.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))) );
                            break;
                        case LOADED:
                            crit.add(Restrictions.eq(Yard.FilterFields.LOADED.getName(), Boolean.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case NOTLOADED:
                            crit.add(Restrictions.eq(Yard.FilterFields.NOTLOADED.getName(), !Boolean.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case STORAGETYPE:
                            crit.add(Restrictions.eq(Yard.FilterFields.STORAGETYPE.getName(), KontYard_StorageType.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case DATEINDATE1:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            if(date != null){
                                Filter filter_time = (Filter) CollectionUtils.find(filters, new BeanPredicate("property", PredicateUtils.equalPredicate(Yard.FilterFields.DATEINTIME1.getName())));
                                if(filter_time != null && StringUtils.isNotBlank(filter_time.getValue())){
                                    Date time = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter_time.getValue()));
                                    date = DateTimeUtils.addTimeToDate(date, time);
                                }
                                crit.add(Restrictions.gt(Yard.FilterFields.DATEIN.getName(), date));
                            }
                            break;
                        case DATEINDATE2:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            if(date != null){
                                Filter filter_time = (Filter) CollectionUtils.find(filters, new BeanPredicate("property", PredicateUtils.equalPredicate(Yard.FilterFields.DATEINTIME2.getName())));
                                if(filter_time != null && StringUtils.isNotBlank(filter_time.getValue())){
                                    Date time = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter_time.getValue()));
                                    date = DateTimeUtils.addTimeToDate(date, time);
                                }
                                crit.add(Restrictions.le(Yard.FilterFields.DATEIN.getName(), date));
                            }
                            break;
                        case DATEOUTDATE1:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            if(date != null){
                                Filter filter_time = (Filter) CollectionUtils.find(filters, new BeanPredicate("property", PredicateUtils.equalPredicate(Yard.FilterFields.DATEOUTTIME1.getName())));
                                if(filter_time != null && StringUtils.isNotBlank(filter_time.getValue())){
                                    Date time = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter_time.getValue()));
                                    date = DateTimeUtils.addTimeToDate(date, time);
                                }
                                crit.add(Restrictions.gt(Yard.FilterFields.DATEOUT.getName(), date));
                            }
                            break;
                        case DATEOUTDATE2:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            if(date != null){
                                Filter filter_time = (Filter) CollectionUtils.find(filters, new BeanPredicate("property", PredicateUtils.equalPredicate(Yard.FilterFields.DATEOUTTIME2.getName())));
                                if(filter_time != null && StringUtils.isNotBlank(filter_time.getValue())){
                                    Date time = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter_time.getValue()));
                                    date = DateTimeUtils.addTimeToDate(date, time);
                                }
                                crit.add(Restrictions.le(Yard.FilterFields.DATEOUT.getName(), date));
                            }
                            break;*/
                    }
                }

            }
        }
    }
}
