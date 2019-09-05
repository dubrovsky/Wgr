package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCarrierDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Carrier;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiClientDAOHib extends GenericHibernateDAO<Client, Long> implements NsiClientDAO {

    @Override
    public List<Client> findAll(Integer limit, Integer start, String query, Usr usr) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("cl_name", query.trim(), MatchMode.ANYWHERE));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("cl_name", query.trim(), MatchMode.ANYWHERE));
        }
        return (Long) crit.uniqueResult();
    }
}
