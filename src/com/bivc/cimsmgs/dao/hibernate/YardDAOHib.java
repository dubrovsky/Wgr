package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Yard;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.Date;
import java.util.List;
import java.util.Locale;

//import com.bivc.cimsmgs.db.KontYard;
//import com.bivc.cimsmgs.db.KontYard_StorageType;

/**
 * Created by peter on 22.01.14.
 */
public class YardDAOHib extends GenericHibernateDAO<Yard, Long> implements YardDAO {
    @Override
    public List<Yard> findAll(Integer limit, Integer start, List<Filter> filters, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));

        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.addOrder(Order.desc("dattr"));

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countAll(List<Filter> filters, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Yard> findPlaces4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));

        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        crit.add(Restrictions.eq("empty", true));

//        crit.createCriteria("sector").addOrder(Order.desc("name"));

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long counPlaces4Kont(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.setProjection(Projections.countDistinct("hid"));

        crit.add(Restrictions.eq("empty", true));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public Yard getYardBy(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.setFetchMode("sector", FetchMode.JOIN).createCriteria("kont").add(Restrictions.eq("hid", kontId));

        return (Yard) crit.uniqueResult();
    }

    @Override
    public List<Yard> findAll4Report2(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        applyFilter(filters, crit, locale);

        if(Constants.findObjectByFieldValue(filters, "property", "sector") != null){
            crit.addOrder(Order.asc("sector.hid"));
        } else {
            crit.createCriteria("sector").addOrder(Order.asc("hid"));
        }
        return listAndCast(crit);
    }


    /*@Override
    public void delete(Long hid) {
        Yard yard = (Yard) getSession().get(Yard.class, hid);
        if(yard.findKont() != null) {
            yard.findKont().unbindYard();
        }
        getSession().delete(yard);
    }*/

    private void applyFilter(List<Filter> filters, Criteria crit, Locale locale) {
        if(filters != null && filters.size() > 0){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (Yard.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NKON:
                            crit.createCriteria("kont").add(Restrictions.ilike(Yard.FilterFields.NKON.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case SECTOR:
                            crit.createCriteria("sector", "sector").add(Restrictions.eq(Yard.FilterFields.SECTOR.getName(), Integer.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case X:
                            crit.add(Restrictions.eq(Yard.FilterFields.X.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case Y:
                            crit.add(Restrictions.eq(Yard.FilterFields.Y.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case Z:
                            crit.add(Restrictions.eq(Yard.FilterFields.Z.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case PLACE:
                            switch (Integer.valueOf(filter.getValue())){
                                case 0:
                                    crit.add(Restrictions.eq("empty", true));
                                    break;
                                case 1:
                                    crit.add(Restrictions.eq("empty", false));
                                    break;

                            }
                            break;
                        /*case LOADED:
                            crit.add(Restrictions.eq(Yard.FilterFields.LOADED.getName(), Boolean.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case NOTLOADED:
                            crit.add(Restrictions.eq(Yard.FilterFields.NOTLOADED.getName(), !Boolean.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                       *//* case STORAGETYPE:
                            crit.add(Restrictions.eq(Yard.FilterFields.STORAGETYPE.getName(), KontYard_StorageType.valueOf(StringUtils.trim(filter.getValue()))));
                            break;*//*
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
