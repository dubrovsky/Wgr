package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.PackDocDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Date: 21.05.11
 * Time: 14:11
 */
public class PackDocDAOHib extends GenericHibernateDAO<PackDoc, Long> implements PackDocDAO {
    /*public List<PackDoc> findAll2(Integer limit, Integer start, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.createAlias("usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").
                add(Restrictions.eq("route.hid", search.getRouteId())).
                createAlias("route.routeDocs", "routeDocs").
                createAlias("routeDocs.docDir", "docDir", CriteriaSpecification.INNER_JOIN, Restrictions.eq("docDir.groupAlias", search.getGroupAlias()))
                *//*add(Restrictions.eq("docDir.groupAlias", search.getGroupAlias()))*//*;
        *//*crit.createAlias("cimSmgses", "smgs", CriteriaSpecification.LEFT_JOIN).
                add(Restrictions.eq("smgs.type", (byte) 0))*//*

        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));

        if (search != null) {
            if (search.getHid() != null && search.getHid() != 0)
                crit.add(Restrictions.eq("hid", search.getHid()));
            if (search.getNkon() != null && search.getNkon().trim().length() > 0) {
                crit.createAlias("cimSmgses", "smgs", CriteriaSpecification.LEFT_JOIN);
                crit.createCriteria("smgs.cimSmgsCarLists").
                        createCriteria("cimSmgsKonLists").
                        add(Restrictions.ilike("utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
            }
            // crit.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(),
            // MatchMode.ANYWHERE));
            if (search.getDate1() != null && search.getDate2() != null) {
                Date date1 = search.getDate1();
                Date date2 = search.getDate2();
                if (search.getDate11() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date1);
                        date += " " + search.getDate11().trim();
                        date1 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }
                if (search.getDate21() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date2);
                        date += " " + search.getDate21().trim();
                        date2 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }

                crit.add(Restrictions.gt("dattr", date1));
                crit.add(Restrictions.le("dattr", date2));
            }

        }
//        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<PackDoc> list = crit.list();
        return list;
    }*/

    public List<PackDoc> findAll(Integer limit, Integer start, Search search, Usr usr) {
        DetachedCriteria crit = DetachedCriteria.forClass(getPersistentClass());
        crit.createAlias("usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").
                add(Restrictions.eq("route.hid", search.getRouteId())).
                createAlias("route.routeDocs", "routeDocs").
                createAlias("routeDocs.docDir", "docDir").
                add(Restrictions.eq("docDir.groupAlias", search.getGroupAlias()));
        if (search != null) {
            if (search.getHid() != null && search.getHid() != 0)
                crit.add(Restrictions.eq("hid", search.getHid()));
            if (search.getNkon() != null && search.getNkon().trim().length() > 0) {
                crit.createAlias("cimSmgses", "smgs", CriteriaSpecification.LEFT_JOIN, Restrictions.eq("smgs.type", (byte)0));
                crit.createCriteria("smgs.cimSmgsCarLists").
                        createCriteria("cimSmgsKonLists").
                        add(Restrictions.ilike("utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
            }
            // crit.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(),
            // MatchMode.ANYWHERE));
            if (search.getDate1() != null && search.getDate2() != null) {
                Date date1 = search.getDate1();
                Date date2 = search.getDate2();
                if (search.getDate11() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date1);
                        date += " " + search.getDate11().trim();
                        date1 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }
                if (search.getDate21() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date2);
                        date += " " + search.getDate21().trim();
                        date2 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                } else {
                    Calendar c = Calendar.getInstance();
                    c.setTime(date2);
                    c.add(Calendar.DATE, 1);
                    date2 = c.getTime();
                }

                crit.add(Restrictions.gt("dattr", date1));
                crit.add(Restrictions.le("dattr", date2));
            }

        }
//        crit.setProjection(Projections.id());
        crit.setProjection(Projections.distinct(Projections.id()));

        Criteria outer = getSession().createCriteria(getPersistentClass());
//        outer.add(Subqueries.exists(crit));
        outer.add(Subqueries.propertyIn("hid", crit));
        outer.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        outer.addOrder(Order.desc("dattr"));

        return outer.list();
    }

    public Long countAll(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").
                add(Restrictions.eq("route.hid", search.getRouteId())).
                createAlias("route.routeDocs", "routeDocs").
                createAlias("routeDocs.docDir", "docDir").
                add(Restrictions.eq("docDir.groupAlias", search.getGroupAlias()));
        /*crit.createAlias("cimSmgses", "smgs", CriteriaSpecification.LEFT_JOIN).
                        add(Restrictions.eq("smgs.type", (byte) 0))*/
        crit.setProjection(Projections.countDistinct("hid"));
        if (search != null) {
            if (search.getHid() != null && search.getHid() != 0)
                crit.add(Restrictions.eq("hid", search.getHid()));
            if (search.getNkon() != null && search.getNkon().trim().length() > 0) {
                crit.createAlias("cimSmgses", "smgs", CriteriaSpecification.LEFT_JOIN, Restrictions.eq("smgs.type", (byte)0));
                crit.createCriteria("smgs.cimSmgsCarLists").
                        createCriteria("cimSmgsKonLists").
                        add(Restrictions.ilike("utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
            }
            if (search.getDate1() != null && search.getDate2() != null) {
                Date date1 = search.getDate1();
                Date date2 = search.getDate2();
                if (search.getDate11() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date1);
                        date += " " + search.getDate11().trim();
                        date1 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }
                if (search.getDate21() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date2);
                        date += " " + search.getDate21().trim();
                        date2 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                } else {
                    Calendar c = Calendar.getInstance();
                    c.setTime(date2);
                    c.add(Calendar.DATE, 1);
                    date2 = c.getTime();
                }

                crit.add(Restrictions.gt("dattr", date1));
                crit.add(Restrictions.le("dattr", date2));
            }

        }

        return (Long) crit.uniqueResult();
    }

    public PackDoc findById2(PackDoc epd) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).
                createAlias("route", "route");
        crit.add(Restrictions.eq("hid", epd.getHid()));
        return (PackDoc) crit.uniqueResult();
    }

    @Override
    public void delete(Long hid) {
        String hqlDelete = "DELETE PackDoc p where p.hid = :hid";
        getSession().createQuery(hqlDelete)
                .setLong("hid", hid )
                .executeUpdate();
    }
}
