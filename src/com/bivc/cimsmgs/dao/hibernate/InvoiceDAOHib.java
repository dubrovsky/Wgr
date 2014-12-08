package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.InvoiceDAO;
import com.bivc.cimsmgs.db.CimSmgsInvoice;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Status;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class InvoiceDAOHib extends GenericHibernateDAO<CimSmgsInvoice, Long> implements InvoiceDAO {
    final static private Logger log = LoggerFactory.getLogger(InvoiceDAOHib.class);

    public List<CimSmgsInvoice> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "invoice");
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        if (start >= 0) { // for excell report, start == -1
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.addOrder(Order.desc("dattr"));
        if (search.getPackId() != null) {
            crit.add(Restrictions.eq("pack.hid", search.getPackId()));
        }

        if (StringUtils.isNotEmpty(search.getStatus())) {
            if (search.getStatus().equals("17")) {// printed
                DetachedCriteria statusy =
                        DetachedCriteria.forClass(Status.class, "st").
                                setProjection(Property.forName("hid")).
                                createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                add(Property.forName("st.hidCs").eqProperty("invoice.hid"));
                crit.add(Subqueries.exists(statusy));
            } else {
                crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
            }
        }
//        if (StringUtils.isNotEmpty(search.getNum()))
//            crit.add(Restrictions.eq("invoice", search.getNum()));
        if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
            crit.add(Restrictions.ilike("notd", search.getGrzOtpr(), MatchMode.ANYWHERE));
        }
        if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
            crit.add(Restrictions.ilike("npol", search.getGrzPoluch(), MatchMode.ANYWHERE));
        }
        if (StringUtils.isNotEmpty(search.getNkon())) {
            crit.add(Restrictions.ilike("utiN", search.getNkon(), MatchMode.ANYWHERE));
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

            crit.add(Restrictions.gt("altered", date1));
            crit.add(Restrictions.le("altered", date2));
        }

        return crit.list();
    }

    public Long countAll(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "invoice");
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        if (search.getPackId() != null) {
            crit.add(Restrictions.eq("pack.hid", search.getPackId()));
        }
//        crit.setProjection(Projections.rowCount());
        crit.setProjection(Projections.countDistinct("hid"));

        if (StringUtils.isNotEmpty(search.getStatus())) {
            if (search.getStatus().equals("17")) {// printed
                DetachedCriteria statusy =
                        DetachedCriteria.forClass(Status.class, "st").
                                setProjection(Property.forName("hid")).
                                createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                add(Property.forName("st.hidCs").eqProperty("invoice.hid"));
                crit.add(Subqueries.exists(statusy));
            } else {
                crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
            }
        }
//        if (search.getNum() != null && search.getNum().length() > 0)
//            crit.add(Restrictions.eq("invoice", search.getNum()));
        if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
            crit.add(Restrictions.ilike("notd", search.getGrzOtpr(), MatchMode.ANYWHERE));
        }
        if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
            crit.add(Restrictions.ilike("npol", search.getGrzPoluch(), MatchMode.ANYWHERE));
        }
        if (StringUtils.isNotEmpty(search.getNkon())) {
            crit.add(Restrictions.ilike("utiN", search.getNkon(), MatchMode.ANYWHERE));
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

            crit.add(Restrictions.gt("altered", date1));
            crit.add(Restrictions.le("altered", date2));
        }

        return (Long) crit.uniqueResult();
    }

    public CimSmgsInvoice findById2(CimSmgsInvoice invoice) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).
                createAlias("packDoc", "pack").
                createAlias("route", "route");
        if (invoice.getHid() != null) {
            crit.add(Restrictions.eq("hid", invoice.getHid()));
        } else if (invoice.getPackDoc() != null && invoice.getPackDoc().getHid() != null) {
            crit.add(Restrictions.eq("pack.hid", invoice.getPackDoc().getHid()));
        }


//		final String query = "FROM CimSmgsInvoice inv " +
//        "INNER JOIN FETCH inv.packDoc pack " +
//        "INNER JOIN FETCH inv.route route " +
//		// "LEFT JOIN FETCH smgs.cimSmgsDocses7 doc7 " +
//		// "LEFT JOIN FETCH smgs.cimSmgsDocses9 doc9 " +
//		// "LEFT JOIN FETCH smgs.cimSmgsDocses13 doc13 " +
//		// "LEFT JOIN FETCH smgs.cimSmgsCarLists car " +
//		// "LEFT JOIN FETCH smgs.cimSmgsPlatels plat " +
//		// "LEFT JOIN FETCH smgs.cimSmgsStatusAlloweds statAllow " +
//		// "LEFT JOIN FETCH statAllow.company company " +
//		// "LEFT JOIN FETCH car.cimSmgsGruzs car_gruz " +
//		// "LEFT JOIN FETCH car.cimSmgsKonLists kon " +
//		// "LEFT JOIN FETCH kon.cimSmgsGruzs kon_gruz " +
//		// // "LEFT JOIN FETCH smgs.cimSmgsStatusAlloweds stat_allow " +
//		// // "LEFT JOIN FETCH stat_allow.company stat_allow_comp " +
//		// // "LEFT JOIN FETCH stat_allow_comp.userses stat_allow_comp_users " +
//		// // "LEFT JOIN FETCH smgs.cimSmgsStatuses stat " +
//				"WHERE inv.hid = :id AND inv.trans IN (:trans) ";
//
//		Query q = getSession().createQuery(query);
//		q.setParameter("id", id);
//		q.setParameterList("trans", usr.getTrans());
//		return (CimSmgsInvoice) q.uniqueResult();
        return (CimSmgsInvoice) crit.uniqueResult();
    }

    public List<CimSmgsInvoice> findStat(Integer limit, Integer start, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "invoice");
        if (start >= 0) { // for excell report, start == -1
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.addOrder(Order.desc("dattr"));
        if (search != null) {
            if (StringUtils.isNotEmpty(search.getStatus())) {
                if (search.getStatus().equals("17")) {// printed
                    DetachedCriteria statusy =
                            DetachedCriteria.forClass(Status.class, "st").
                                    setProjection(Property.forName("hid")).
                                    createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                    add(Property.forName("st.hidCs").eqProperty("invoice.hid"));
                    crit.add(Subqueries.exists(statusy));
                } else {
                    crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
                }
            }
            if (StringUtils.isNotEmpty(search.getProject()) || StringUtils.isNotEmpty(search.getRoute())) {
                Criteria tempCrit = crit.createAlias("route", "route");
                if (StringUtils.isNotEmpty(search.getProject())) {
                    tempCrit.createAlias("route.project", "project").add(Restrictions.ilike("project.name", search.getProject(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getRoute())) {
                    tempCrit.add(Restrictions.ilike("route.name", search.getRoute(), MatchMode.ANYWHERE));
                }
            }
            if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
                crit.add(Restrictions.ilike("notd", search.getGrzOtpr(), MatchMode.ANYWHERE));
            }
            if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
                crit.add(Restrictions.ilike("npol", search.getGrzPoluch(), MatchMode.ANYWHERE));
            }
            if (StringUtils.isNotEmpty(search.getNkon())) {
                crit.add(Restrictions.ilike("utiN", search.getNkon(), MatchMode.ANYWHERE));
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

                crit.add(Restrictions.gt("altered", date1));
                crit.add(Restrictions.le("altered", date2));
            }
        }
        return crit.list();
    }

    public Long countAllStat(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "invoice");

//        crit.setProjection(Projections.rowCount());
        crit.setProjection(Projections.countDistinct("hid"));
        if (search != null) {
            if (StringUtils.isNotEmpty(search.getStatus())) {
                if (search.getStatus().equals("17")) {// printed
                    DetachedCriteria statusy =
                            DetachedCriteria.forClass(Status.class, "st").
                                    setProjection(Property.forName("hid")).
                                    createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                    add(Property.forName("st.hidCs").eqProperty("invoice.hid"));
                    crit.add(Subqueries.exists(statusy));
                } else {
                    crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
                }
            }
            if (StringUtils.isNotEmpty(search.getProject()) || StringUtils.isNotEmpty(search.getRoute())) {
                Criteria tempCrit = crit.createAlias("route", "route");
                if (StringUtils.isNotEmpty(search.getProject())) {
                    tempCrit.createAlias("route.project", "project").add(Restrictions.ilike("project.name", search.getProject(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getRoute())) {
                    tempCrit.add(Restrictions.ilike("route.name", search.getRoute(), MatchMode.ANYWHERE));
                }
            }
            if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
                crit.add(Restrictions.ilike("notd", search.getGrzOtpr(), MatchMode.ANYWHERE));
            }
            if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
                crit.add(Restrictions.ilike("npol", search.getGrzPoluch(), MatchMode.ANYWHERE));
            }
            if (StringUtils.isNotEmpty(search.getNkon())) {
                crit.add(Restrictions.ilike("utiN", search.getNkon(), MatchMode.ANYWHERE));
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

                crit.add(Restrictions.gt("altered", date1));
                crit.add(Restrictions.le("altered", date2));
            }
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public Long countAll(PackDoc packDoc) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("packDoc", packDoc));

        crit.setProjection(Projections.countDistinct("hid"));
        return (Long) crit.uniqueResult();
    }

    @Override
    public void delete(Long hid) {
        String hqlDelete = "DELETE CimSmgsInvoice cs where cs.hid = :hid";
        getSession().createQuery(hqlDelete)
                .setLong("hid", hid )
                .executeUpdate();
    }
}
