package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCarrierDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Carrier;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiCarrierDAOHib extends GenericHibernateDAO<Carrier, Long> implements NsiCarrierDAO {

    @Override
    public List<Carrier> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.disjunction()
                    .add(Restrictions.ilike("carrName", query.trim(), MatchMode.ANYWHERE))
                    .add(Restrictions.ilike("carrNameShort", query.trim(), MatchMode.ANYWHERE))
                    .add(Restrictions.ilike("carrNo", query.trim(), MatchMode.ANYWHERE))
            );
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.disjunction()
                    .add(Restrictions.ilike("carrName", query.trim(), MatchMode.ANYWHERE))
                    .add(Restrictions.ilike("carrNameShort", query.trim(), MatchMode.ANYWHERE))
                    .add(Restrictions.ilike("carrNo", query.trim(), MatchMode.ANYWHERE))
            );
        }
        return (Long) crit.uniqueResult();
    }
}
