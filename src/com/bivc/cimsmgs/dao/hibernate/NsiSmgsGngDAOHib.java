package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiSmgsGngDAO;
import com.bivc.cimsmgs.db.NsiOhr;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.CargoGng;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.HashSet;
import java.util.List;


public class NsiSmgsGngDAOHib extends GenericHibernateDAO<CargoGng, Long> implements NsiSmgsGngDAO {
    @SuppressWarnings("unchecked")
    public List<CargoGng> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//        crit.add(Restrictions.ge("c_gn_bgn", new Date())).add(Restrictions.le("c_gn_end", new Date()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo_group", query.trim(), MatchMode.ANYWHERE)));
        }
        crit.addOrder(Order.asc("cargo_group"));
//        crit.setFetchMode("ohranas", FetchMode.JOIN);
        List<CargoGng> list = crit.list();

        for(CargoGng gng: list){
            List ohranas = getSession().createCriteria(NsiOhr.class).add(Restrictions.eq("cargoPl", gng.getCargo_group())).list();
            gng.setOhranas(new HashSet(ohranas));
        }
//        getSession().clear();
        return list;
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
//        crit.add(Restrictions.ge("c_gn_bgn", new Date())).add(Restrictions.le("c_gn_end", new Date()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo_group", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<CargoGng> findAll() throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

//public class NsiSmgsGngDAOHib extends GenericHibernateDAO<Gngcode, BigDecimal> implements NsiSmgsGngDAO {
//    @SuppressWarnings("unchecked")
//    public List<Gngcode> findAll(Integer limit, Integer start, String query) throws InfrastructureException {
//        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//        crit.add(Restrictions.eq("recState", "A"));
//        if (query != null && query.trim().length() > 0) {
//            crit.add(Restrictions.or(Restrictions.ilike("mlName", query.trim(), MatchMode.ANYWHERE),
//                    Restrictions.ilike("code", query.trim(), MatchMode.ANYWHERE)));
//        }
//        List<Gngcode> list = crit.list();
//        getSession().clear();
//        return list;
//    }
//
//    public Long countAll(String query) {
//        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setProjection(Projections.rowCount());
//        crit.add(Restrictions.eq("recState", "A"));
//        if (query != null && query.trim().length() > 0) {
//            crit.add(Restrictions.or(Restrictions.ilike("mlName", query.trim(), MatchMode.ANYWHERE),
//                    Restrictions.ilike("code", query.trim(), MatchMode.ANYWHERE)));
//        }
//        return (Long) crit.uniqueResult();
//    }

}
