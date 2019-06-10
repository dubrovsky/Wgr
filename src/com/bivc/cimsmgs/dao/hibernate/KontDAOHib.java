package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.KontDAO;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontStatus;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Disjunction;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;
import java.util.Locale;

//import org.hibernate.sql.JoinType;

/**
 * Created by peter on 15.05.2014.
 */
public class KontDAOHib extends GenericHibernateDAO<Kont, Long> implements KontDAO {
    @Override
    public List<Kont> findAll(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale, KontStatus status) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.add(Restrictions.and(Restrictions.isNull("vagonInto"), Restrictions.isNull("poezdInto")));

        crit.addOrder(Order.desc("dattr"));

        crit.add(Restrictions.eq("status", status));// pribytie

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countAll(List<Filter> filters, Usr usr, Locale locale, KontStatus status) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.and(Restrictions.isNull("vagonInto"), Restrictions.isNull("poezdInto")));
        crit.setProjection(Projections.countDistinct("hid"));

        crit.add(Restrictions.eq("status", status));// pribytie

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Kont> findAll(String nkon) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nkon", nkon));
        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

    @Override
    public List<Kont> findKontDir(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale, KontStatus[] kontStatuses) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        // crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        /*
        Criterion transCrit = Restrictions.in("trans", usr.getTrans());
        switch (status){
            case POEZD_INTO:
                crit.add(
                        Restrictions.and(
                                Restrictions.and(
                                        Restrictions.isNotNull("vagonInto"),
                                        Restrictions.isNotNull("poezdInto")
                                ), // poezd for kont
                                transCrit
                        )
                );
                break;
            case NO_TRANSP:
                crit.add(
                        Restrictions.and(
                                Restrictions.and(
                                        Restrictions.isNull("vagonInto"),
                                        Restrictions.isNull("poezdInto")
                                ), // no poezd for kont
                                transCrit
                        )
                );
                break;
        }
        */

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

/*
        if(state != null){
            Disjunction or = Restrictions.disjunction();
            for(KontStatus.Status status: statusy){
                switch (status){
                    case PRIBYTIE:
                        or.add(Restrictions.eq("status.hid", (byte) 1));
                        break;
                    case YARD:
                        or.add(Restrictions.eq("status.hid", (byte) 2));
                        break;
                }
            }
            crit.add(or);
        }
*/

        Disjunction or = Restrictions.disjunction();
        for(KontStatus status: kontStatuses){
            or.add(Restrictions.eq("status", status));
//            or.add(Restrictions.in("status", KontStatus.get(kontLocation)));
        }
        crit.add(or);

        applyFilter(filters, crit, locale);

        return listAndCast(crit);
    }

    @Override
    public Long countKontDir(List<Filter> filters, Usr usr, Locale locale, KontStatus[] kontStatuses) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        /*Criterion transCrit = Restrictions.in("trans", usr.getTrans());
        switch (location){
            case POEZD_INTO:
                crit.add(
                        Restrictions.and(
                                Restrictions.and(Restrictions.isNotNull("vagonInto"),
                                        Restrictions.isNotNull("poezdInto")), // no poezd for kont
                                transCrit
                        )
                );
                break;
            case NO_TRANSP:
                crit.add(
                        Restrictions.and(
                                Restrictions.and(Restrictions.isNull("vagonInto"),
                                        Restrictions.isNull("poezdInto")), // no poezd for kont
                                transCrit
                        )
                );
                break;
        }*/

        crit.add(
                Restrictions.in("trans", usr.getTrans())
        );

        Disjunction or = Restrictions.disjunction();
        for(KontStatus status: kontStatuses){
            or.add(Restrictions.eq("status", status));
//            or.add(Restrictions.in("status", KontStatus.get(kontLocation)));
        }
        crit.add(or);

//        crit.add(Restrictions.eq("status.hid", (byte) 1));// pribytie

        crit.setProjection(Projections.countDistinct("hid"));

        applyFilter(filters, crit, locale);

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Kont> findAll4TrainOut(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if (start >= 0) {
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.add(Restrictions.eq("status.hid", (byte) 2));
//        crit.add(Restrictions.or(Restrictions.eq("status.hid", (byte) 1), Restrictions.eq("status.hid", (byte) 2)));

        applyFilter(filters, crit, locale);
        return listAndCast(crit);
    }

    @Override
    public Long countAll4TrainOut(List<Filter> filters, Usr usr, Locale locale) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.add(Restrictions.eq("status.hid", (byte) 2));
//        crit.add(Restrictions.or(Restrictions.eq("status.hid", (byte) 1), Restrictions.eq("status.hid", (byte) 2)));

        crit.setProjection(Projections.countDistinct("hid"));
        applyFilter(filters, crit, locale);
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Kont> findAll4Vagon(Long vagHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createCriteria("vagonOut").add(Restrictions.eq("hid", vagHid));
        return listAndCast(crit);
    }

    @Override
    public Kont getByIdWithPoezdIntoAndVagonIntoAndAvtoInto(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit
                .setFetchMode("poezdInto", FetchMode.JOIN)
                .setFetchMode("vagonInto", FetchMode.JOIN)
                .setFetchMode("avtoInto", FetchMode.JOIN);

        crit.add(Restrictions.eq("hid", kontId));
        return (Kont) crit.uniqueResult();
    }

    @Override
    public Kont getByIdWithPoezdOutAndVagonOutAndAvtoOut(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit
                .setFetchMode("poezdOut", FetchMode.JOIN)
                .setFetchMode("vagonOut", FetchMode.JOIN)
                .setFetchMode("avtoOut", FetchMode.JOIN);

        crit.add(Restrictions.eq("hid", kontId));
        return (Kont) crit.uniqueResult();
    }

    @Override
    public Kont getByIdWithAllParents(Long kontId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit
                .setFetchMode("poezdInto", FetchMode.JOIN)
                .setFetchMode("vagonInto", FetchMode.JOIN)
                .setFetchMode("avtoInto", FetchMode.JOIN)
                .setFetchMode("poezdOut", FetchMode.JOIN)
                .setFetchMode("vagonOut", FetchMode.JOIN)
                .setFetchMode("avtoOut", FetchMode.JOIN);

        crit.add(Restrictions.eq("hid", kontId));
        return (Kont) crit.uniqueResult();
    }

    @Override
    public List<Kont> findAll4Avto(Long avtoHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createCriteria("avtoOut").add(Restrictions.eq("hid", avtoHid));
        return listAndCast(crit);
    }

    @Override
    public List<Kont> findKyKontsForDocsKont(String utiN, Route route, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("poezdOut", "poezd");
        crit.createAlias("poezd.packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("poezd.route", "route").add(Restrictions.eq("route.hid", route.getHid()));

        crit.add(Restrictions.eq("nkon", utiN.trim()).ignoreCase());
        crit.addOrder(Order.desc("dotp"));

        return listAndCast(crit);
    }

    private void applyFilter(List<Filter> filters, Criteria crit, Locale locale) {
        if(filters != null && filters.size() > 0){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    switch (Kont.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NKON:
                            crit.add(Restrictions.ilike(Kont.FilterFields.NKON.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case NPPR:
                            crit.createCriteria("poezdInto", CriteriaSpecification.INNER_JOIN ).add(Restrictions.ilike(Kont.FilterFields.NPPR.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case NO_AVTO:
                            crit.createCriteria("avtoInto", CriteriaSpecification.INNER_JOIN).add(Restrictions.ilike(Kont.FilterFields.NO_AVTO.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case KY_SECTOR:
                            crit.add(Restrictions.ilike(Kont.FilterFields.KY_SECTOR.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                        case KY_Y:
                            crit.add(Restrictions.eq(Kont.FilterFields.KY_Y.getName(), Long.valueOf(StringUtils.trim(filter.getValue()))));
                            break;
                    }

                }
            }
        }
    }
}
