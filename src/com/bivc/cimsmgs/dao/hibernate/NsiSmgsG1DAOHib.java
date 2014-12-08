package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiSmgsG1DAO;
import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.NsiCsG1;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.type.StandardBasicTypes;

import java.util.List;

public class NsiSmgsG1DAOHib extends GenericHibernateDAO<NsiCsG1, Long> implements NsiSmgsG1DAO {
    @SuppressWarnings("unchecked")
    public List<NsiCsG1> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        crit.addOrder(Order.desc("altered"));
        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("g1r", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g2", query.trim(), MatchMode.ANYWHERE)));
        }

//        List<NsiCsG1> list = crit.list();
//        getSession().clear();
        return listAndCast(crit);
    }

    public Long countAll(String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.add(Restrictions.in("trans", usr.getTrans()));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("g1r", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("g2", query.trim(), MatchMode.ANYWHERE)));
        }

        return (Long) crit.uniqueResult();
    }

    public boolean isNewEntry(CimSmgs smgs, String who) {
        String g = who.equals("g1") ?
                (smgs.getG1() != null ? smgs.getG1().trim() : "") :
                (smgs.getG4() != null ? smgs.getG4().trim() : "");
        String gr = who.equals("g1") ?
                (smgs.getG1r() != null ? smgs.getG1r().trim() : "") :
                (smgs.getG4r() != null ? smgs.getG4r().trim() : "");

        if (g.length() > 0 || gr.length() > 0) {
            Criteria crit = getSession().createCriteria(getPersistentClass());
            if (g.length() > 0) {
                crit.add(Restrictions.sqlRestriction("lower(trim({alias}.G_1)) like lower(?)", g, StandardBasicTypes.STRING));
                if (crit.list().size() == 0)
                    return true;
            }

            if (gr.length() > 0) {
                crit.add(Restrictions.sqlRestriction("lower(trim({alias}.G_1R)) like lower(?)", gr, StandardBasicTypes.STRING));
                if (crit.list().size() == 0)
                    return true;
            }
        }
        return false;
    }

    @Override
    public List<NsiCsG1> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

}
