package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.DateTimeUtils;
import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.YardDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.dto.ky2.YardFilerDirDTO;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.*;
import org.hibernate.transform.Transformers;

import java.util.Date;
import java.util.List;
import java.util.Locale;

import static com.bivc.cimsmgs.db.ky.Yard.FilterFields.*;

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

        applyFilter(filters, crit, null, locale);

        return listAndCast(crit);
    }

    @Override
    public List<Yard> findAll(Integer limit, Integer start, List<Filter> filters, Locale locale, Usr usr) {
        final Criteria crit = getSession().createCriteria(getPersistentClass(), "yard1");
        final Criteria sectorCrit = crit.createAlias("sector", "sector");

        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("sector.hid"));
        crit.add(Subqueries.exists(yardSectorGroups));

        crit.createAlias("konts", "konts");   // select only with konts

        /*DetachedCriteria kontsCrit =          // select only with konts by default
                DetachedCriteria.forClass(Kont.class, "kont1").
                        setProjection(Property.forName("hid")).
                        add(Property.forName("kont1.yard.hid").eqProperty("yard1.hid"));
        crit.add(Subqueries.exists(kontsCrit));*/

        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 200 : limit);
        }
        crit.addOrder(Order.desc("dattr"));

        applyFilter(filters, crit, sectorCrit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countAll(List<Filter> filters, Locale locale, Usr usr) {
        final Criteria crit = getSession().createCriteria(getPersistentClass(), "yard1");
        final Criteria sectorCrit = crit.createAlias("sector", "sector");
        crit.setProjection(Projections.countDistinct("hid"));

        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("sector.hid"));
        crit.add(Subqueries.exists(yardSectorGroups));

        crit.createAlias("konts", "konts");   // select only with konts

        applyFilter(filters, crit, sectorCrit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public Long countAll(List<Filter> filters, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, null, locale);

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

        applyFilter(filters, crit, null, locale);

        return listAndCast(crit);
    }

    @Override
    public Long counPlaces4Kont(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.setProjection(Projections.countDistinct("hid"));

        crit.add(Restrictions.eq("empty", true));

        applyFilter(filters, crit, null, locale);

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
        applyFilter(filters, crit, null, locale);

        if (Constants.findObjectByFieldValue(filters, "property", "sector") != null) {
            crit.addOrder(Order.asc("sector.hid"));
        } else {
            crit.createCriteria("sector").addOrder(Order.asc("hid"));
        }
        return listAndCast(crit);
    }

    @Override
    public List<YardFilerDirDTO> getPoezdsForFilter(Usr usr) {
        Criteria crit = getSession().createCriteria(Poezd.class, "poezd1");
        crit.add(Restrictions.conjunction()
                .add(Restrictions.isNotNull("npprm"))
                .add(Restrictions.ne("npprm", ""))

        );
        crit.setProjection(
                Projections.distinct(
                        Projections.projectionList().add(Projections.property("npprm"), "npprm")
                )
        );

        DetachedCriteria historyCrit = DetachedCriteria.forClass(KontGruzHistory.class, "history")
                .createAlias("history.kont", "kont")
                .createAlias("kont.yard", "yard")
                .createAlias("yard.sector", "sector")
                .setProjection(Property.forName("hid"))
                .add(Property.forName("history.poezd.hid").eqProperty("poezd1.hid"))
                .add(Subqueries.exists(
                        DetachedCriteria.forClass(YardSectorGroups.class, "ysg")
                                .setProjection(Property.forName("hid"))
                                .createCriteria("group")
                                .add(Restrictions.in("name", usr.getTrans()))
                                .add(Property.forName("ysg.id.yardSectorId").eqProperty("sector.hid")))
                );
        crit.add(Subqueries.exists(historyCrit));

        crit.setResultTransformer(Transformers.aliasToBean(YardFilerDirDTO.class));
        return listAndCast(crit);
    }

    @Override
    public List<YardFilerDirDTO> getGruzotprsForFilter(Usr usr) {
        Criteria crit = getSession().createCriteria(Kont.class);
        final Criteria sectorCrit = crit.createAlias("yard", "yard").createAlias("yard.sector", "sector");
        crit.add(Restrictions.conjunction()
//                .add(Restrictions.isNotNull("yard"))
                        .add(Restrictions.isNotNull("gruzotpr"))
                        .add(Restrictions.ne("gruzotpr", ""))

        );

        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("sector.hid"));
        sectorCrit.add(Subqueries.exists(yardSectorGroups));

        crit.setProjection(
                Projections.distinct(
                        Projections.projectionList().add(Projections.property("gruzotpr"), "gruzotpr")
                )
        );
        crit.setResultTransformer(Transformers.aliasToBean(YardFilerDirDTO.class));

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

    private void applyFilter(List<Filter> filters, Criteria crit, Criteria sectorCrit, Locale locale) {

        if (filters != null && filters.size() > 0) {

            DetachedCriteria historyCrit = null;

            if (filters.stream().anyMatch(
                    filter -> StringUtils.isNotBlank(filter.getValue()) && StringUtils.isNotBlank(filter.getProperty()) && (
                            Yard.FilterFields.valueOf(filter.getProperty().toUpperCase()) == NPPRM
                                    /*|| Yard.FilterFields.valueOf(filter.getProperty().toUpperCase()) == GRUZOTPR
                                    || Yard.FilterFields.valueOf(filter.getProperty().toUpperCase()) == STARTDATE
                                    || Yard.FilterFields.valueOf(filter.getProperty().toUpperCase()) == ENDDATE*/
                    )
            )) {
                historyCrit =
                        DetachedCriteria.forClass(KontGruzHistory.class, "history")
                                .createAlias("poezd", "poezd")
                                .setProjection(Property.forName("hid"))
                                .add(Property.forName("history.kont.hid").eqProperty("konts.hid"));

                crit.add(Subqueries.exists(historyCrit));
            }

            for (Filter filter : filters) {
                if (StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())) {
                    Date date;
                    switch (Yard.FilterFields.valueOf(filter.getProperty().toUpperCase())) {
                        case SECTOR:
                            if (sectorCrit != null) {
                                sectorCrit.add(Restrictions.eq("sector.hid", Integer.valueOf(StringUtils.trim(filter.getValue()))));
                                break;
                            }
                        case NKON:
//                            assert kontsCrit != null;
                            crit.add(Restrictions.ilike("konts.nkon", StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case NPPRM:
                            assert historyCrit != null;
                            historyCrit.add(Restrictions.eq("poezd.npprm", StringUtils.trim(filter.getValue())));
                            break;
                        case GRUZOTPR:
                            crit.add(Restrictions.eq("konts.gruzotpr", StringUtils.trim(filter.getValue())));
                            break;
                        case STARTDATE:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            crit.add(Restrictions.gt("konts.dprb", date));
                            break;
                        case ENDDATE:
                            date = DateTimeUtils.Parser.valueOf(locale.getLanguage()).parse(StringUtils.trim(filter.getValue()));
                            crit.add(Restrictions.lt("konts.dprb", date));
                            break;
                            /* case NKON:
                            kontsCrit.add(Restrictions.ilike(Yard.FilterFields.NKON.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            boolean found = false;
                            for (Filter filter1 : filters) {
                                if (Yard.FilterFields.valueOf(filter1.getProperty().toUpperCase()) == PLACE && Integer.parseInt(filter1.getValue()) != -1) {
                                    found = true;
                                    break;
                                }
                            }
                            if(!found){
                                crit.add(Subqueries.exists(kontsCrit));
                            }
                            break;*/
                        /*case X:
                            crit.add(Restrictions.eq(Yard.FilterFields.X.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case Y:
                            crit.add(Restrictions.eq(Yard.FilterFields.Y.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                        case Z:
                            crit.add(Restrictions.eq(Yard.FilterFields.Z.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;*/
                        /*case NKON:
                            crit.createCriteria("kont").add(Restrictions.ilike(Yard.FilterFields.NKON.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;*/

                        /*case PLACE:
                            switch (Integer.parseInt(filter.getValue())) {
                                case 0:
                                    crit.add(Subqueries.notExists(kontsCrit));
                                    break;
                                case 1:
                                    crit.add(Subqueries.exists(kontsCrit));
                                    break;

                            }
                            break;*/
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
