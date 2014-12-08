package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiSmgsEtsngcodeDAO;
import com.bivc.cimsmgs.db.NsiOhr;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Cargo;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;

public class NsiSmgsEtsngcodeDAOHib extends GenericHibernateDAO<Cargo, BigDecimal> implements NsiSmgsEtsngcodeDAO {
    @SuppressWarnings("unchecked")
    public List<Cargo> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//        crit.add(Restrictions.eq("recState", "A"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo", query.trim(), MatchMode.ANYWHERE)));
        }
        List<Cargo> list = crit.list();

        for(Cargo etsng: list){
            List ohranas = getSession().createCriteria(NsiOhr.class).add(Restrictions.eq("etsng", etsng.getCargo())).list();
            etsng.setOhranas(new HashSet(ohranas));
        }
//        getSession().clear();
        return list;
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
//        crit.add(Restrictions.eq("recState", "A"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("cargo_fullname", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("cargo", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<Cargo> findAll() throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }


//    public List<Etsngcode> findAll(Integer limit, Integer start, String query) throws InfrastructureException {
//        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
//        crit.add(Restrictions.eq("recState", "A"));
//        if (query != null && query.trim().length() > 0) {
//            crit.add(Restrictions.or(Restrictions.ilike("mlName", query.trim(), MatchMode.ANYWHERE),
//                    Restrictions.ilike("code", query.trim(), MatchMode.ANYWHERE)));
//        }
//        List<Etsngcode> list = crit.list();
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
