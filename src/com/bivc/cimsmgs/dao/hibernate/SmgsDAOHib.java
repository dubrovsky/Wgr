package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.SmgsDAO;
import com.bivc.cimsmgs.db.*;
import com.bivc.cimsmgs.dto.CimSmgsTrainDateDTO;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.criterion.*;
import org.hibernate.type.StandardBasicTypes;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

public class SmgsDAOHib extends GenericHibernateDAO<CimSmgs, Long> implements SmgsDAO {
    final static private Logger log = LoggerFactory.getLogger(SmgsDAOHib.class);
    public static Integer DUPLICATE_PERIOD = 14;
    public final static long DAY_IN_MS = 1000 * 60 * 60 * 24;
    /////////   !!!!!!!!!!!!!!!!!!!!!!!!!
//    DISTINCT_ROOT_ENTITY can be used only when NOT using pagination (setFirstResult() and setMaxResults())

    public List<CimSmgs> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException {
//        log.info("findAll");
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");


        if (search.getWagonContainerDublicatePeriod() != null) {
            DUPLICATE_PERIOD = search.getWagonContainerDublicatePeriod();
        }

        if (search.getNpoezd() != null)
            crit.add(Restrictions.eq("npoezd", search.getNpoezd()));

        crit.createAlias("packDoc", "pack").
                createAlias("pack.usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
        if (search.getRouteId() != null)
            crit.createAlias("route", "route").
                    add(Restrictions.eq("route.hid", search.getRouteId()));


        // добавлено для выбора документов по нескольком маршрутам для передаточной ведомости
        if (!search.getRouteIds().isEmpty()) {
            DetachedCriteria vedVagCriteria = DetachedCriteria.forClass(VedVag.class, "vedvag");
            vedVagCriteria.add(Property.forName("vedvag.hidCs").eqProperty("smgs.hid"));
            crit.createAlias("route", "route").
                    add(Restrictions.in("route.hid", search.getRouteIds())).
                    add(Subqueries.notExists(vedVagCriteria.setProjection(Projections.property("hid"))));
        }

        if (search.getType() == 112)
            crit.add(Restrictions.in("type", new Byte[]{1, 12}));
        else
            crit.add(Restrictions.eq("type", search.getType()));

        if (start >= 0) { // for local stat excell report, start == -1
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }

        crit.addOrder(Order.desc("dattr"));

        if (StringUtils.isNotEmpty(search.getStatus())) {
            if (search.getStatus().equals("17")) {// printed
                DetachedCriteria statusy =
                        DetachedCriteria.forClass(Status.class, "st").
                                setProjection(Property.forName("hid")).
                                createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                add(Property.forName("st.hidCs").eqProperty("smgs.hid"));
                crit.add(Subqueries.exists(statusy));
            } else {
                crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
            }
        }

        if (search.getHid() != null)
            crit.add(Restrictions.eq("hid", search.getHid()));
        if (StringUtils.isNotEmpty(search.getNum()))
            crit.add(Restrictions.ilike("g694", search.getNum(), MatchMode.ANYWHERE));
        if (StringUtils.isNotEmpty(search.getZakazNo()))
            crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
        if (StringUtils.isNotEmpty(search.getUn()))
            crit.add(Restrictions.eq("un", search.getUn()));
        if (StringUtils.isNotEmpty(search.getStrnOtprGr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g_1_5k", search.getStrnOtprGr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g16r", search.getStrnOtprGr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStrnNaznGr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g_4_5k", search.getStrnNaznGr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g46r", search.getStrnNaznGr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getPogrStn())) {
            DetachedCriteria plats =
                    DetachedCriteria.forClass(CimSmgsDocs.class, "docs13").
                            setProjection(Property.forName("hid")).
                            add(Property.forName("docs13.cimSmgs.hid").eqProperty("smgs.hid")).
                            add(Restrictions.eq("fieldNum", "13")).
                            add(Restrictions.or(Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE),
                                    Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));

            crit.add(Subqueries.exists(plats));

//            crit.createCriteria("cimSmgsDocses13").add(Restrictions.or(
//                    Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE), Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStnOtpr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g162", search.getStnOtpr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g162r", search.getStnOtpr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStnNazn())) {
            crit.add(Restrictions.or(Restrictions.ilike("g101", search.getStnNazn(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g101r", search.getStnNazn(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g1", search.getGrzOtpr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g1r", search.getGrzOtpr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
            crit.add(Restrictions.or(Restrictions.ilike("g4", search.getGrzPoluch(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g4r", search.getGrzPoluch(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getNaimGrz()) || StringUtils.isNotEmpty(search.getTipRazmKont()) || StringUtils.isNotEmpty(search.getNkon())) {

            DetachedCriteria cars =
                    DetachedCriteria.forClass(CimSmgsCarList.class, "cars").
                            setProjection(Property.forName("hid")).
                            add(Property.forName("cars.cimSmgs.hid").eqProperty("smgs.hid")).
                            createCriteria("cimSmgsKonLists", "kon")/*.add(Restrictions.eq("hid", new BigDecimal(17)))*/;

            if (StringUtils.isNotEmpty(search.getNaimGrz())) {
//                cars.createCriteria("cimSmgsGruzs").add(Restrictions.ilike("nzgr", search.getNaimGrz(), MatchMode.ANYWHERE));
                cars.createCriteria("cimSmgsGruzs", "gruz").
                        add(Restrictions.disjunction().
                                add(Restrictions.ilike("gruz.nzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                add(Restrictions.ilike("gruz.nzgrEu", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                add(Restrictions.ilike("gruz.enzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getTipRazmKont())) {
                cars.add(Restrictions.eq("kon.sizeFoot", new BigDecimal(search.getTipRazmKont())));
            }
            if (StringUtils.isNotEmpty(search.getNkon())) {
                cars.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
            }
            crit.add(Subqueries.exists(cars));
        }
        if (StringUtils.isNotEmpty(search.getPlat())) {
            DetachedCriteria plats =
                    DetachedCriteria.forClass(CimSmgsPlatel.class, "plat").
                            setProjection(Property.forName("hid")).
                            add(Property.forName("plat.cimSmgs.hid").eqProperty("smgs.hid")).
                            add(Restrictions.or(Restrictions.ilike("plat", search.getPlat(), MatchMode.ANYWHERE),
                                    Restrictions.ilike("platR", search.getPlat(), MatchMode.ANYWHERE)));

            crit.add(Subqueries.exists(plats));
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
//        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        if (search.getDocId() != 0) { // for aviso filter comments
            getSession().enableFilter("limitFieldCommentsByDocId").setParameter("docId", new BigDecimal(search.getDocId()));
        }

        List<CimSmgs> smgses = listAndCast(crit);

        // ище дубликаты вагонов за введенный интервал дней или 14дней (по умолчанию)
        if (search.getType() == 12 || search.getType() == 1 || search.getType() == 7) {
            DetachedCriteria hids = getSmgsListDeatachedCriteriaByDuplicatePeriod(search);
            findDuplicatesCar(smgses, hids);
            if (search.getType() != 7)
                findDuplicatesKon(smgses, hids);
        }
        return smgses;
    }

    public Long countAll(Search search, Usr usr) {
//        log.info("countAll");
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");

        if (search.getNpoezd() != null)
            crit.add(Restrictions.eq("npoezd", search.getNpoezd()));
        crit.createAlias("packDoc", "pack").
                createAlias("pack.usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
        crit.createAlias("route", "route").
                add(Restrictions.eq("route.hid", search.getRouteId()));
        crit.add(Restrictions.eq("type", search.getType()));

        crit.setProjection(Projections.countDistinct("hid"));

        if (StringUtils.isNotEmpty(search.getStatus())) {
            if (search.getStatus().equals("17")) {// printed
                DetachedCriteria statusy =
                        DetachedCriteria.forClass(Status.class, "st").
                                setProjection(Property.forName("hid")).
                                createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                add(Property.forName("st.hidCs").eqProperty("smgs.hid"));
                crit.add(Subqueries.exists(statusy));
            } else {
                crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
            }
        }
        if (StringUtils.isNotEmpty(search.getZakazNo()))
            crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
        if (StringUtils.isNotEmpty(search.getUn()))
            crit.add(Restrictions.eq("un", search.getUn()));
        if (StringUtils.isNotEmpty(search.getStrnOtprGr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g_1_5k", search.getStrnOtprGr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g16r", search.getStrnOtprGr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStrnNaznGr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g_4_5k", search.getStrnNaznGr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g46r", search.getStrnNaznGr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getPogrStn())) {
            crit.createCriteria("cimSmgsDocses13").add(Restrictions.or(
                    Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE), Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStnOtpr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g162", search.getStnOtpr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g162r", search.getStnOtpr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getStnNazn())) {
            crit.add(Restrictions.or(Restrictions.ilike("g101", search.getStnNazn(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g101r", search.getStnNazn(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
            crit.add(Restrictions.or(Restrictions.ilike("g1", search.getGrzOtpr(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g1r", search.getGrzOtpr(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
            crit.add(Restrictions.or(Restrictions.ilike("g4", search.getGrzPoluch(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g4r", search.getGrzPoluch(), MatchMode.ANYWHERE)));
        }
        if (StringUtils.isNotEmpty(search.getNaimGrz()) || StringUtils.isNotEmpty(search.getTipRazmKont()) || StringUtils.isNotEmpty(search.getNkon())) {
            Criteria tempCrit = crit.createCriteria("cimSmgsCarLists").createCriteria("cimSmgsKonLists", "kon");
            if (StringUtils.isNotEmpty(search.getNaimGrz())) {
//                tempCrit.createCriteria("cimSmgsGruzs").add(Restrictions.ilike("nzgr", search.getNaimGrz(), MatchMode.ANYWHERE));
                tempCrit.createCriteria("cimSmgsGruzs", "gruz").
                        add(Restrictions.disjunction().
                                add(Restrictions.ilike("gruz.nzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                add(Restrictions.ilike("gruz.nzgrEu", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                add(Restrictions.ilike("gruz.enzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getTipRazmKont())) {
                tempCrit.add(Restrictions.eq("kon.sizeFoot", new BigDecimal(search.getTipRazmKont())));
            }
            if (StringUtils.isNotEmpty(search.getNkon())) {
                tempCrit.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
            }
        }
        if (StringUtils.isNotEmpty(search.getPlat())) {
            crit.createCriteria("cimSmgsPlatels").add(Restrictions.or(Restrictions.ilike("plat", search.getPlat(), MatchMode.ANYWHERE),
                    Restrictions.ilike("platR", search.getPlat(), MatchMode.ANYWHERE)));
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

        Long result = (Long) crit.uniqueResult();
//        log.info(result.toString());
        return result;
    }

    @Override
    public Long countAll(PackDoc packDoc) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("packDoc", packDoc)).
                add(Restrictions.eq("pack.deleted", false));

        crit.setProjection(Projections.countDistinct("hid"));
        return (Long) crit.uniqueResult();
    }

    @Override
    public void delete(Long hid) {
        String hqlDelete = "DELETE CimSmgs cs where cs.hid = :hid";
        getSession().createQuery(hqlDelete)
                .setLong("hid", hid)
                .executeUpdate();
    }

    public List<CimSmgs> findAllRep(Search search, Usr usr) throws InfrastructureException {
//        log.info("findAllRep");
        Criteria crit = getSession().createCriteria(getPersistentClass());

        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        crit.add(Restrictions.eq("type", search.getType()));
        crit.addOrder(Order.desc("dattr"));

        if (search.getHid() != null && search.getHid() != 0)
            crit.add(Restrictions.eq("hid", search.getHid()));
        if (search.getNpoezd() != null && search.getNpoezd().trim().length() > 0)
            crit.add(Restrictions.ilike("npoezd", search.getNpoezd().trim(), MatchMode.EXACT));
        if (search.getNkon() != null && search.getNkon().trim().length() > 0) {
            DetachedCriteria cars =
                    DetachedCriteria.forClass(CimSmgsCarList.class, "cars").
                            setProjection(Property.forName("hid")).
                            add(Property.forName("cars.cimSmgs.hid").eqProperty("smgs.hid")).
                            createCriteria("cimSmgsKonLists").
                            add(Restrictions.ilike("utiN", search.getNkon().trim(), MatchMode.ANYWHERE));

            crit.add(Subqueries.exists(cars));
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
            } else {// no time -> to seach data successfully we need to set next day
                Calendar c = Calendar.getInstance();
                c.setTime(date2);
                c.add(Calendar.DATE, 1);
                date2 = c.getTime();
            }

            crit.add(Restrictions.gt("altered", date1));
            crit.add(Restrictions.le("altered", date2));
        }

        return listAndCast(crit);
    }

    public void changeStatus(BigDecimal status, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.status = :status WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setBigDecimal("status", status);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    public void changeTbcStatus(Byte status, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.tbcStatus = :status WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setByte("status", status);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    public void changeUserFlag(String userFlag, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.userFlag = :user_flag WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setString("user_flag", userFlag);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    public List<CimSmgs> findStat(Integer limit, Integer start, Search search, Usr usr) {
//        log.info("findStat");
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");
        if (start >= 0) { // for local stat excell report, start == '-1'
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        }
        crit.addOrder(Order.desc("dattr"));

        crit.createAlias("packDoc", "pack").
                add(Restrictions.eq("pack.deleted", !(search == null || search.getDeleted() == 0)));

        if (search != null) {
            if (StringUtils.isNotEmpty(search.getProject()) || StringUtils.isNotEmpty(search.getRoute())) {
                Criteria tempCrit = crit.createAlias("route", "route");
                if (StringUtils.isNotEmpty(search.getProject())) {
                    tempCrit.createAlias("route.project", "project").add(Restrictions.ilike("project.name", search.getProject(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getRoute())) {
                    tempCrit.add(Restrictions.ilike("route.name", search.getRoute(), MatchMode.ANYWHERE));
                }
            }

            if (search.getType() != null) {
                crit.add(Restrictions.eq("type", search.getType()));
            }
            if (StringUtils.isNotEmpty(search.getStatus())) {
                if (search.getStatus().equals("17")) {// printed
                    DetachedCriteria statusy =
                            DetachedCriteria.forClass(Status.class, "st").
                                    setProjection(Property.forName("hid")).
                                    createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                    add(Property.forName("st.hidCs").eqProperty("smgs.hid"));
                    crit.add(Subqueries.exists(statusy));
                } else {
                    crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
                }
            }
            if (StringUtils.isNotEmpty(search.getZakazNo()))
                crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
            if (StringUtils.isNotEmpty(search.getUn()))
                crit.add(Restrictions.eq("un", search.getUn()));
            if (StringUtils.isNotEmpty(search.getStrnOtprGr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g_1_5k", search.getStrnOtprGr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g16r", search.getStrnOtprGr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStrnNaznGr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g_4_5k", search.getStrnNaznGr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g46r", search.getStrnNaznGr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getPogrStn())) {
                DetachedCriteria plats =
                        DetachedCriteria.forClass(CimSmgsDocs.class, "docs13").
                                setProjection(Property.forName("hid")).
                                add(Property.forName("docs13.cimSmgs.hid").eqProperty("smgs.hid")).
                                add(Restrictions.eq("fieldNum", "13")).
                                add(Restrictions.or(Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE),
                                        Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));

                crit.add(Subqueries.exists(plats));
//                crit.createCriteria("cimSmgsDocses13").add(Restrictions.or(
//                        Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE), Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStnOtpr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g162", search.getStnOtpr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g162r", search.getStnOtpr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStnNazn())) {
                crit.add(Restrictions.or(Restrictions.ilike("g101", search.getStnNazn(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g101r", search.getStnNazn(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g1", search.getGrzOtpr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g1r", search.getGrzOtpr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
                crit.add(Restrictions.or(Restrictions.ilike("g4", search.getGrzPoluch(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g4r", search.getGrzPoluch(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getNaimGrz()) || StringUtils.isNotEmpty(search.getTipRazmKont()) || StringUtils.isNotEmpty(search.getNkon())) {
                DetachedCriteria cars =
                        DetachedCriteria.forClass(CimSmgsCarList.class, "cars").
                                setProjection(Property.forName("hid")).
                                add(Property.forName("cars.cimSmgs.hid").eqProperty("smgs.hid")).
                                createCriteria("cimSmgsKonLists", "kon")/*.add(Restrictions.eq("hid", new BigDecimal(17)))*/;

                if (StringUtils.isNotEmpty(search.getNaimGrz())) {
                    cars.createCriteria("cimSmgsGruzs", "gruz").
                            add(Restrictions.disjunction().
                                    add(Restrictions.ilike("gruz.nzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                    add(Restrictions.ilike("gruz.nzgrEu", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                    add(Restrictions.ilike("gruz.enzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)));
//                    cars.createCriteria("cimSmgsGruzs").add(Restrictions.ilike("nzgr", search.getNaimGrz(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getTipRazmKont())) {
                    cars.add(Restrictions.eq("kon.sizeFoot", new BigDecimal(search.getTipRazmKont())));
                }
                if (StringUtils.isNotEmpty(search.getNkon())) {
                    cars.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
                }
                crit.add(Subqueries.exists(cars));
                /*Criteria tempCrit = crit.createCriteria("cimSmgsCarLists").createCriteria("cimSmgsKonLists");
                if (StringUtils.isNotEmpty(search.getNaimGrz())) {
                    tempCrit.createCriteria("cimSmgsGruzs").add(Restrictions.ilike("nzgr", search.getNaimGrz(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getTipRazmKont())) {
                    tempCrit.add(Restrictions.eq("sizeFoot", new BigDecimal(search.getTipRazmKont())));
                }*/
            }
            if (StringUtils.isNotEmpty(search.getPlat())) {
                DetachedCriteria plats =
                        DetachedCriteria.forClass(CimSmgsPlatel.class, "plat").
                                setProjection(Property.forName("hid")).
                                add(Property.forName("plat.cimSmgs.hid").eqProperty("smgs.hid")).
                                add(Restrictions.or(Restrictions.ilike("plat", search.getPlat(), MatchMode.ANYWHERE),
                                        Restrictions.ilike("platR", search.getPlat(), MatchMode.ANYWHERE)));

                crit.add(Subqueries.exists(plats));
//                crit.createCriteria("cimSmgsPlatels").add(Restrictions.or(Restrictions.ilike("plat", search.getPlat(), MatchMode.ANYWHERE),
//                        Restrictions.ilike("platR", search.getPlat(), MatchMode.ANYWHERE)));
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

        return listAndCast(crit);
    }

    public Long countAllStat(Search search, Usr usr) {
//        log.info("countAllStat");
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");
//        crit.setProjection(Projections.rowCount());
        crit.setProjection(Projections.countDistinct("hid"));
        crit.createAlias("packDoc", "pack").
                add(Restrictions.eq("pack.deleted", !(search == null || search.getDeleted() == 0)));


        if (search != null) {
            if (StringUtils.isNotEmpty(search.getProject()) || StringUtils.isNotEmpty(search.getRoute())) {
                Criteria tempCrit = crit.createAlias("route", "route");
                if (StringUtils.isNotEmpty(search.getProject())) {
                    tempCrit.createAlias("route.project", "project").add(Restrictions.ilike("project.name", search.getProject(), MatchMode.ANYWHERE));
                }
                if (StringUtils.isNotEmpty(search.getRoute())) {
                    tempCrit.add(Restrictions.ilike("route.name", search.getRoute(), MatchMode.ANYWHERE));
                }
            }
            if (search.getType() != null) {
                crit.add(Restrictions.eq("type", search.getType()));
            }
            if (StringUtils.isNotEmpty(search.getStatus())) {
                if (search.getStatus().equals("17")) {// printed
                    DetachedCriteria statusy =
                            DetachedCriteria.forClass(Status.class, "st").
                                    setProjection(Property.forName("hid")).
                                    createCriteria("statusDir").add(Restrictions.eq("hid", new BigDecimal(17))).
                                    add(Property.forName("st.hidCs").eqProperty("smgs.hid"));
                    crit.add(Subqueries.exists(statusy));
                } else {
                    crit.add(Restrictions.eq("status", new Byte(search.getStatus())));
                }
            }
            if (StringUtils.isNotEmpty(search.getZakazNo()))
                crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
            if (StringUtils.isNotEmpty(search.getUn()))
                crit.add(Restrictions.eq("un", search.getUn()));
            if (StringUtils.isNotEmpty(search.getStrnOtprGr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g_1_5k", search.getStrnOtprGr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g16r", search.getStrnOtprGr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStrnNaznGr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g_4_5k", search.getStrnNaznGr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g46r", search.getStrnNaznGr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getPogrStn())) {
                crit.createCriteria("cimSmgsDocses13").add(Restrictions.or(
                        Restrictions.ilike("text", search.getPogrStn(), MatchMode.ANYWHERE), Restrictions.ilike("text2", search.getPogrStn(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStnOtpr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g162", search.getStnOtpr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g162r", search.getStnOtpr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getStnNazn())) {
                crit.add(Restrictions.or(Restrictions.ilike("g101", search.getStnNazn(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g101r", search.getStnNazn(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getGrzOtpr())) {
                crit.add(Restrictions.or(Restrictions.ilike("g1", search.getGrzOtpr(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g1r", search.getGrzOtpr(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getGrzPoluch())) {
                crit.add(Restrictions.or(Restrictions.ilike("g4", search.getGrzPoluch(), MatchMode.ANYWHERE),
                        Restrictions.ilike("g4r", search.getGrzPoluch(), MatchMode.ANYWHERE)));
            }
            if (StringUtils.isNotEmpty(search.getNaimGrz()) || StringUtils.isNotEmpty(search.getTipRazmKont()) || StringUtils.isNotEmpty(search.getNkon())) {
                Criteria tempCrit = crit.createCriteria("cimSmgsCarLists").createCriteria("cimSmgsKonLists", "kon");
                if (StringUtils.isNotEmpty(search.getNaimGrz())) {
//                    tempCrit.createCriteria("cimSmgsGruzs").add(Restrictions.ilike("nzgr", search.getNaimGrz(), MatchMode.ANYWHERE));

                    tempCrit.createCriteria("cimSmgsGruzs", "gruz").
                            add(Restrictions.disjunction().
                                    add(Restrictions.ilike("gruz.nzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                    add(Restrictions.ilike("gruz.nzgrEu", search.getNaimGrz().trim(), MatchMode.ANYWHERE)).
                                    add(Restrictions.ilike("gruz.enzgr", search.getNaimGrz().trim(), MatchMode.ANYWHERE)));
                }
                if (StringUtils.isNotEmpty(search.getTipRazmKont())) {
                    tempCrit.add(Restrictions.eq("kon.sizeFoot", new BigDecimal(search.getTipRazmKont())));
                }
                if (StringUtils.isNotEmpty(search.getNkon())) {
                    tempCrit.add(Restrictions.ilike("kon.utiN", search.getNkon().trim(), MatchMode.ANYWHERE));
                }
            }
            if (StringUtils.isNotEmpty(search.getPlat())) {
                crit.createCriteria("cimSmgsPlatels").add(Restrictions.or(Restrictions.ilike("plat", search.getPlat(), MatchMode.ANYWHERE),
                        Restrictions.ilike("platR", search.getPlat(), MatchMode.ANYWHERE)));
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

    /**
     * findTrainDate finds trains and smgs quantity by date period
     *
     * @param limit
     * @param start
     * @param search search parameters
     * @param usr    user
     * @return list of CimSmgsTrainDateDTO objects
     */
    public List<CimSmgsTrainDateDTO> findTrainDate(Integer limit, Integer start, Search search, Usr usr) {
        log.info("findTrainDate");
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");

        crit.createAlias("packDoc", "pack").
                createAlias("pack.usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.isNotNull("npoezd"));


        if (start >= 0) { // for local stat excell report, start == '-1'
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 1000 : limit);
        }
        crit.addOrder(Order.asc("npoezd"));

        if (search != null) {

            if (search.getDeleted() != null)
                crit.add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
            if (search.getRouteId() != null)
                crit.createAlias("route", "route").
                        add(Restrictions.eq("route.hid", search.getRouteId()));
            if (search.getType() != null) {
                crit.add(Restrictions.eq("type", search.getType()));
            }
            Date date1 = search.getDate1();
            Date date2 = search.getDate2();
            if (search.getDate1() != null) {
                crit.add(Restrictions.gt("altered", date1));
            }
            if (search.getDate2() != null) {
                crit.add(Restrictions.le("altered", date2));
            }
        }
        ProjectionList projectionList = Projections.projectionList();
        projectionList
                .add(Projections.groupProperty("npoezd"))
                .add(Projections.countDistinct("hid"));
        crit.setProjection(projectionList);

        List<Object[]> res = crit.list();
        Iterator<Object[]> resIt = res.iterator();
        List<CimSmgsTrainDateDTO> resDTO = new ArrayList<>();
        while (resIt.hasNext()) {
            Object[] rO = resIt.next();
            resDTO.add(new CimSmgsTrainDateDTO((String) rO[0], (Long) rO[1]));
        }
        return resDTO;
    }

    /**
     * findSmgsTrainDate finds list of SMGSs by date period and train number
     *
     * @param limit
     * @param start
     * @param search search parameters
     * @param usr    user
     * @return CimSmgs LList
     */
    public List<CimSmgs> findSmgsTrainDate(Integer limit, Integer start, Search search, Usr usr) {

        String[] poezdNes = search.getNpoezd().split(",");
        for (int i = 0; i < poezdNes.length; i++) {
            poezdNes[i] = poezdNes[i].trim();
        }
        List<CimSmgs> cimSmgs = new ArrayList<>();

//        for (String poezdN:poezdNes) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");

        crit.createAlias("packDoc", "pack").
                createAlias("pack.usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.isNotNull("npoezd"));
        if (start >= 0) { // for local stat excell report, start == '-1'
            crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 1000 : limit);
        }

        if (search.getDeleted() != null)
            crit.add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
        if (search.getRouteId() != null)
            crit.createAlias("route", "route").
                    add(Restrictions.eq("route.hid", search.getRouteId()));
        if (search.getType() != null) {
            crit.add(Restrictions.eq("type", search.getType()));
        }
        Date date1 = search.getDate1();
        Date date2 = search.getDate2();
        if (search.getDate1() != null) {
            crit.add(Restrictions.gt("altered", date1));
        }
        if (search.getDate2() != null) {
            crit.add(Restrictions.le("altered", date2));
        }

//                crit.add(Restrictions .eq("npoezd", poezdN.trim()));
        crit.add(Restrictions.in("npoezd", poezdNes));
        cimSmgs.addAll(crit.list());
//            }

        return cimSmgs;
    }

    @Override
    public void changeFtsStatus(Byte ftsStatus, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.ftsStatus = :status WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setByte("status", ftsStatus);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    @Override
    public void changeBtlcStatus(Byte btlcStatus, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.btlc_status = :status WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setByte("status", btlcStatus);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    public List<CimSmgs> findDocsByNPoezd(String npoezd, int type, long routeId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        String[] npoezds = npoezd.trim().split("\\s*[,;]\\s*");
        String[] npoezds = npoezd.split("[,;]");
        Disjunction disjunction = Restrictions.disjunction();
        for (String poezd : npoezds) {
//            disjunction.add(Restrictions.sqlRestriction("',' || lower(replace({alias}.n_poezd, ' ', '')) || ',' LIKE '%,' || lower(?) || ',%'", poezd, StandardBasicTypes.STRING));
            disjunction.add(Restrictions.sqlRestriction("CONCAT(',' , lower({alias}.n_poezd) , ',') LIKE CONCAT('%,' , lower(?) , ',%')", poezd, StandardBasicTypes.STRING));
        }
        crit.add(disjunction);

        crit.add(Restrictions.or(Restrictions.ne("kind", 1), Restrictions.isNull("kind")));
        crit.add(Restrictions.eq("type", (byte) type));
//        crit.add(Restrictions.ne("kind", 1));
        crit.addOrder(Order.asc("sort"));
        return listAndCast(crit);
    }

    /**
     * findDocsByNPoezdAndDateInterval getes list of CimSmgs by train numbers, date interval, user, route and document type
     *
     * @param npoezds array of train numbers
     * @param search  search object with search paramentrs
     * @param usr     user
     * @return
     */
    public List<CimSmgs> findDocsByNPoezdAndDateInterval(String[] npoezds, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if (search != null) {

            if (search.getDeleted() != null)
                crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                        add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
            if (search.getRouteId() != null)
                crit.createAlias("route", "route").
                        add(Restrictions.eq("route.hid", search.getRouteId()));
            if (search.getType() != null) {
                crit.add(Restrictions.eq("type", search.getType()));
            }
            Date date1 = search.getDate1();
            Date date2 = search.getDate2();
            if (search.getDate1() != null) {
                crit.add(Restrictions.gt("altered", date1));
            }
            if (search.getDate2() != null) {
                crit.add(Restrictions.le("altered", date2));
            }
            Disjunction disjunction = Restrictions.disjunction();
            for (String poezd : npoezds) {
                disjunction.add(Restrictions.sqlRestriction("CONCAT(',' , lower({alias}.n_poezd) , ',') LIKE CONCAT('%,' , lower(?) , ',%')", poezd, StandardBasicTypes.STRING));
            }
            crit.add(disjunction);

        }
        List<CimSmgs> cimSmgs = crit.list();
        return cimSmgs;

    }

    /*@Override
    public List<CimSmgs> findDocsByNPoezd(String npoezd, int type) {
        final String query = "FROM CimSmgs s WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        return listAndCast(crit);
    }*/

    public List<CimSmgs> findDocByNPoezd(String npoezd, Byte type, long routeId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        String[] npoezds = npoezd.trim().split("\\s*[,;]\\s*");
        String[] npoezds = npoezd.split("[,;]");
        Disjunction disjunction = Restrictions.disjunction();
        for (String poezd : npoezds) {
//            disjunction.add(Restrictions.sqlRestriction("',' || lower(replace({alias}.n_poezd, ' ', '')) || ',' LIKE '%,' || lower(?) || ',%'", poezd, StandardBasicTypes.STRING));
            disjunction.add(Restrictions.sqlRestriction("CONCAT(',' , lower({alias}.n_poezd) , ',') LIKE CONCAT('%,' , lower(?) , ',%')", poezd, StandardBasicTypes.STRING));
        }
        crit.add(disjunction);
        crit.add(Restrictions.eq("type", type));

        crit.add(Restrictions.or(Restrictions.ne("kind", 1), Restrictions.isNull("kind")));

//        crit.add(Restrictions.ne("kind", 1));
        crit.addOrder(Order.desc("dattr"));
//        crit.setFirstResult(0).setMaxResults(1);
        return listAndCast(crit);
    }

    @Override
    public List<CimSmgs> findKontVedByNPoezd(String npoezd, Byte type, long routeId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
//        String[] npoezds = npoezd.trim().split("\\s*[,;]\\s*");
        String[] npoezds = npoezd.split("[,;]");
        Disjunction disjunction = Restrictions.disjunction();
        for (String poezd : npoezds) {
//            disjunction.add(Restrictions.sqlRestriction("',' || lower(replace({alias}.n_poezd, ' ', '')) || ',' LIKE '%,' || lower(?) || ',%'", poezd, StandardBasicTypes.STRING));
            disjunction.add(Restrictions.sqlRestriction("CONCAT(',' , lower({alias}.n_poezd) , ',') LIKE CONCAT('%,' , lower(?) , ',%')", poezd, StandardBasicTypes.STRING));
        }
        crit.add(disjunction);
        crit.add(Restrictions.eq("type", type));

        crit.add(Restrictions.or(Restrictions.ne("kind", 1), Restrictions.isNull("kind")));
//        crit.add(Restrictions.eq("kind", 1));
        crit.addOrder(Order.asc("dattr"));
        crit.setFirstResult(0).setMaxResults(1);
        return listAndCast(crit);
    }

    @Override
    public List<Map> findData4SummaryDoc(String npoezd, Byte type, long routeId) {
//        String[] npoezds = npoezd.trim().split("\\s*[,;]\\s*");
        String[] npoezds = npoezd.split("[,;]");
        StringBuilder npoezdBuilder = new StringBuilder();
        String prefix = "";
        npoezdBuilder.append("(");
        for (int i = 0; i < npoezds.length; i++) {
            npoezdBuilder.append(prefix);
            prefix = " OR ";
//            npoezdBuilder.append("',' || lower(replace(cs.npoezd, ' ', '')) || ',' LIKE '%,' || lower(" + ":npoezd" + i + ") || ',%'");
            npoezdBuilder.append("CONCAT(',' , lower({prefix}.npoezd) , ',') LIKE CONCAT('%,' , lower(" + ":npoezd" + i + ") , ',%')");
        }
        npoezdBuilder.append(")");

        final String query =
                "   SELECT new map(" +
                        "         sum (cs.g24N) as netto," +
                        "         sum (cs.g24T) as tara," +
                        "         sum (cs.g24B) as brutto," +
                        "         count (*) as sumDocs, " +
                        "         (SELECT sum(gruz.places)" +
                        "            FROM CimSmgs cs1" +
                        "               INNER JOIN cs1.route route" +
                        "               INNER JOIN cs1.cimSmgsCarLists car" +
                        "               INNER JOIN car.cimSmgsKonLists kon" +
                        "               INNER JOIN kon.cimSmgsGruzs gruz" +
                        "           WHERE route.hid = :routeId AND cs1.type = :type AND (cs1.kind != 1 or cs1.kind is NULL) AND " +
                        npoezdBuilder.toString().replace("{prefix}", "cs1") +
                        "           ) as places" +
                        "       )" +
                        "   FROM CimSmgs cs" +
                        "   INNER JOIN cs.route route" +
                        "   WHERE  route.hid = :routeId AND cs.type = :type AND (cs.kind != 1 or cs.kind is NULL) AND " +
                        npoezdBuilder.toString().replace("{prefix}", "cs");
//                        +
//                        "   GROUP BY 4";
        Query q = getSession().createQuery(query);
        q.setByte("type", type);
        q.setLong("routeId", routeId);

        for (int i = 0; i < npoezds.length; i++) {
            q.setString("npoezd" + i, npoezds[i]);
        }

        return listAndCast(q);
    }


    public Long countDocsByNPoezd(String npoezd, int type, long routeId) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.setProjection(Projections.count("hid"));
//        String[] npoezds = npoezd.trim().split("\\s*[,;]\\s*");
        String[] npoezds = npoezd.split("[,;]");
        Disjunction disjunction = Restrictions.disjunction();
        for (String poezd : npoezds) {
//            disjunction.add(Restrictions.sqlRestriction("',' || lower(replace({alias}.n_poezd, ' ', '')) || ',' LIKE '%,' || lower(?) || ',%'", poezd, StandardBasicTypes.STRING));
            disjunction.add(Restrictions.sqlRestriction("CONCAT(',', lower({alias}.n_poezd), ',') LIKE CONCAT('%,' , lower(?) , ',%')", poezd, StandardBasicTypes.STRING));
        }
        crit.add(disjunction);
        crit.add(Restrictions.eq("type", (byte) type));

        crit.add(Restrictions.or(Restrictions.ne("kind", 1), Restrictions.isNull("kind")));
//        crit.add(Restrictions.ne("kind", 1));
        return (Long) crit.uniqueResult();
    }

    public CimSmgs findById3(Long id) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("hid", id));
        return (CimSmgs) crit.uniqueResult();
    }

    public CimSmgs findById1(Long id) {
        String query = "SELECT new CimSmgs(smgs.un) FROM CimSmgs smgs WHERE smgs.hid = :id";
        Query q = getSession().createQuery(query);
        q.setParameter("id", id);
        CimSmgs smgs = (CimSmgs) q.uniqueResult();
        return smgs;
    }

    public CimSmgs findById2(CimSmgs smgs) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).
                createAlias("packDoc", "pack").
                createAlias("route", "route");
        if (smgs.getHid() != null) {
            crit.add(Restrictions.eq("hid", smgs.getHid()));
        } else if (smgs.getPackDoc() != null && smgs.getPackDoc().getHid() != null) {
            crit.add(Restrictions.eq("pack.hid", smgs.getPackDoc().getHid()));
            crit.add(Restrictions.eq("type", smgs.getType()));
        }
//        final String query = "FROM CimSmgs smgs " +
//        "INNER JOIN FETCH smgs.packDoc pack " +
//        "INNER JOIN FETCH smgs.route route " +
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
//				"WHERE smgs.hid = :id ";// AND smgs.trans IN (:trans) ";
//
//		Query q = getSession().createQuery(query);
//		q.setParameter("id", id);
////		q.setParameterList("trans", usr.getTrans());
//		return (CimSmgs) q.uniqueResult();
        return (CimSmgs) crit.uniqueResult();
    }

    public List<CimSmgs> findAll4FTS(Byte type, Long routeId, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("type", /*(byte)2*/type));
        crit.add(Restrictions.eq("ftsStatus", (byte) 25)); //
//        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return listAndCast(crit);
    }

    public List<CimSmgs> findByIds(List<Long> ids) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.in("hid", ids));
//        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return listAndCast(crit);
    }


    @SuppressWarnings("unchecked")
    public List<Long> findAll4Iftmins1(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Property.forName("hid"));
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("status", docReadyStatus)); //

        return listAndCast(crit);
    }

    public Long countAll4Iftmins1(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.setProjection(Projections.countDistinct("hid"));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("status", docReadyStatus)); //

        return (Long) crit.uniqueResult();
    }

    @Override
    public Long countAll4Btlc(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.setProjection(Projections.countDistinct("hid"));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("btlc_status", docReadyStatus)); //

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Long> findAll4Btlc(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Property.forName("hid"));
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("btlc_status", docReadyStatus)); //

        return listAndCast(crit);
    }

    @Override
    public Long countAll4Tdg(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.setProjection(Projections.countDistinct("hid"));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("tdg_status1", docReadyStatus)); //

        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Long> findAll4Tdg(Byte type, Long routeId, Usr usr, byte docReadyStatus) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Property.forName("hid"));
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", false));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", routeId));
        crit.add(Restrictions.eq("type", type));
        crit.add(Restrictions.eq("tdg_status1", docReadyStatus)); //

        return listAndCast(crit);
    }

    @Override
    public void changeTdgStatus(Byte tdg_status, Long hid) {
        final String query = "UPDATE CimSmgs s SET s.tdg_status1 = :status WHERE s.hid = :hid";
        Query q = getSession().createQuery(query);
        q.setByte("status", tdg_status);
        q.setLong("hid", hid);
        q.executeUpdate();
    }

    @Override
    public CimSmgs findDocInPackDoc(Long packDocHid, BigDecimal docTypeHid) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "smgs");
        crit.add(Restrictions.eq("docType1", docTypeHid));
        crit.createCriteria("packDoc", "pack").add(Restrictions.idEq(packDocHid)).
                add(Restrictions.eq("pack.deleted", false));

        return (CimSmgs) crit.uniqueResult();
    }

    /* for Updatable */
    public Long countAll4Iftmins1(/* Search search, */Usr usr, Long id) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.add(Restrictions.in("trans", usr.getTrans())); // un
        // cimsmgs
        crit.add(Restrictions.isNotNull("ready")); //
        crit.add(Restrictions.eq("hid", id)); // hid

        return (Long) crit.uniqueResult();
    }

    public void update4FTS(String npoezd, String index_p, String n_ppv, Date dprb, Long hid, Usr user, Byte type) {
        String query = "UPDATE CimSmgs cs SET cs.npoezd = :npoezd, cs.index_p = :index_p, cs.n_ppv = :n_ppv, cs.dprb = :dprb  " +
                "WHERE cs.ftsStatus = 25 and cs.trans in (:trans) and cs.route.hid = :route and cs.type = :type";
        Query q = getSession().createQuery(query);
        q.setString("npoezd", npoezd);
        q.setString("index_p", index_p);
        q.setString("n_ppv", n_ppv);
        q.setDate("dprb", dprb);
        q.setParameterList("trans", user.getTrans());
        q.setLong("route", hid);
        q.setByte("type", type);
        q.executeUpdate();
    }


    public void updateByReady(String ready, Long id, Usr usr) {
        String query = "UPDATE CimSmgs cs SET cs.ready = :ready WHERE cs.hid = :id AND cs.trans IN (:trans) ";
        Query q = getSession().createQuery(query);
        q.setString("ready", ready);
        q.setParameterList("trans", usr.getTrans());
        q.setLong("id", id);
        q.executeUpdate();
    }

    @SuppressWarnings("unchecked")
    public List<BIftminLog> findIftminText(Long id, String mes_name, String dir) {
        final String query = "SELECT new BIftminLog(ift.out_text) FROM BIftminLog ift "
                + "WHERE ift.hid_src = :id AND ift.mes_name=:mes_name AND lower(ift.dir)=lower(:dir) ORDER BY ift.dattr DESC";

        Query q = getSession().createQuery(query);
        q.setParameter("id", id);
        q.setParameter("mes_name", mes_name);
        q.setParameter("dir", dir);
        return q.list();
    }

    public List<TbcLog> findTbcText(Long id) {
        final String query = "FROM TbcLog tbc "
                + "WHERE tbc.hid_src = :id ORDER BY tbc.dattr DESC";

        Query q = getSession().createQuery(query);
        q.setParameter("id", id);
        return listAndCast(q);
    }

    @SuppressWarnings("unchecked")
    public List<BIftminLog> findAperakText(Long id, String mes_name, String dir) {
        final String query = "FROM BIftminLog ift LEFT JOIN FETCH ift.BAperak aperak LEFT JOIN FETCH aperak.aperakDet aperakDet "
                + "WHERE ift.hid_src = :id AND ift.mes_name=:mes_name AND lower(ift.dir)=lower(:dir) ORDER BY ift.dattr DESC";

        Query q = getSession().createQuery(query);
        q.setParameter("id", id);
        q.setParameter("mes_name", mes_name);
        q.setParameter("dir", dir);
        q.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return q.list();
    }

    @SuppressWarnings("unchecked")
    public List<CsComnt> findComntText(Long id) {
        final String query = "select cs.csComnt FROM CimSmgs cs  WHERE cs.hid = :id";

        Query q = getSession().createQuery(query);
        q.setParameter("id", id);
        // q.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

        return q.list();
    }

    /**
     * Ищет вагоны, которые повторяются в документе за DUPLICATE_PERIOD и устанавливает сarDuplicates флаг в классе CimSmgsCarList
     *
     * @param smgses список документов
     * @param hids   подзапрос списка идентификаторов документов за DUPLICATE_PERIOD
     */
    public void findDuplicatesCar(List<CimSmgs> smgses, DetachedCriteria hids) {
        Set<String> duplicates = new HashSet<>();
        Set<String> nvags = new HashSet<>();

        for (CimSmgs smgs : smgses)
            if ((new Date().getTime() - smgs.getDattr().getTime()) < 14 * DAY_IN_MS)
                for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values())
                    if (carList.getNvag() != null)
                        nvags.add(carList.getNvag().trim());

        if (nvags.size() > 0) {
            Criteria crit = getSession().createCriteria(CimSmgsCarList.class);

            crit
                    .add(Restrictions.in("nvag", nvags))
                    .add(Subqueries.propertyIn("cimSmgs.hid", hids));

            ProjectionList projectionList = Projections.projectionList();
            projectionList
                    .add(Projections.groupProperty("nvag"))
                    .add(Projections.countDistinct("hid"));
            crit.setProjection(projectionList);

            List<Object[]> res = crit.list();
            for (Object[] o : res) {
                if ((Long) o[1] > 1)
                    duplicates.add((String) o[0]);
            }

            for (CimSmgs smgs : smgses) {
                if ((new Date().getTime() - smgs.getDattr().getTime()) < DUPLICATE_PERIOD * DAY_IN_MS) {
                    for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values()) {
                        if (carList.getNvag() != null) {
                            if (duplicates.contains(carList.getNvag().trim())) {
                                carList.setCarDuplicates(true);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Ищет контейнеры, которые повторяются в документе за DUPLICATE_PERIOD и устанавливает konDuplicates флаг в классе CimSmgsKonList
     *
     * @param smgses список документов
     * @param hids   подзапрос списка идентификаторов документов за DUPLICATE_PERIOD
     */
    public void findDuplicatesKon(List<CimSmgs> smgses, DetachedCriteria hids) {
        Set<String> duplicates = new HashSet<>();
        Set<String> utines = new HashSet<>();

        for (CimSmgs smgs : smgses)

            if ((new Date().getTime() - smgs.getDattr().getTime()) < DUPLICATE_PERIOD * DAY_IN_MS && smgs.isContOtpr())
                for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList konList : carList.getCimSmgsKonLists().values()) {
                        if (konList.getUtiN() != null && !konList.getUtiN().trim().isEmpty()) {
                            utines.add(konList.getUtiN().trim().toUpperCase());
                        }
                    }
                }

        if (utines.size() > 0) {
            Criteria crit = getSession().createCriteria(CimSmgsKonList.class, "kon");

            crit
                    .add(Restrictions.in("utiN", utines))
                    .createAlias("cimSmgsCarList", "cars")
                    .createAlias("cars.cimSmgs", "smgs")
                    .add(Subqueries.propertyIn("smgs.hid", hids));

            ProjectionList projectionList = Projections.projectionList();
            projectionList
                    .add(Projections.groupProperty("utiN"))
                    .add(Projections.countDistinct("hid"));
            crit.setProjection(projectionList);

            List<Object[]> res = crit.list();
            for (Object[] o : res) {
                if ((Long) o[1] > 1)
                    duplicates.add((String) o[0]);
            }

            for (CimSmgs smgs : smgses) {
                if ((new Date().getTime() - smgs.getDattr().getTime()) < 14 * 1000 * DAY_IN_MS && smgs.isContOtpr()) {
                    for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values()) {
                        for (CimSmgsKonList konList : carList.getCimSmgsKonLists().values()) {
                            if (konList.getUtiN() != null && duplicates.contains(konList.getUtiN().trim().toUpperCase())) {
                                konList.setKonDuplicates(true);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Создает подзапрос списка идентификаторов документов за DUPLICATE_PERIOD
     *
     * @param search параметры поиска
     * @return Возвращает подзапрос
     */
    public DetachedCriteria getSmgsListDeatachedCriteriaByDuplicatePeriod(Search search) {
        DetachedCriteria hids = DetachedCriteria.forClass(CimSmgs.class);
        hids
                .setProjection(Property.forName("hid"))
                .add(Restrictions.ge("dattr", new Date(new Date().getTime() - (DUPLICATE_PERIOD * DAY_IN_MS))))
                .add(Restrictions.le("dattr", new Date()))
                .add(Restrictions.eq("type", search.getType()))
                .add(Restrictions.eq("route.hid", search.getRouteId()));
        return hids;
    }

    /* ! IFTMIN */
}
