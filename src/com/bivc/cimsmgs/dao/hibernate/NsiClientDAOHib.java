package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCarrierDAO;
import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Carrier;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.db.nsi.ClientGroups;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;

import java.util.List;

/**
 * @author lan
 */
public class NsiClientDAOHib extends GenericHibernateDAO<Client, Long> implements NsiClientDAO {

    @Override
    public List<Client> findAll(Integer limit, Integer start, String query, Usr usr, Long routeId) throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "cl");
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 10 : limit);

        DetachedCriteria clientGroups =
                DetachedCriteria.forClass(ClientGroups.class, "clng").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.eq("name", usr.getGroup().getName())).
                        add(Property.forName("clng.id.clientId").eqProperty("cl.hid"));
//        crit.add(Subqueries.exists(yardSectorGroups));

//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.add(Restrictions.or(Restrictions.in("trans", usr.getTrans()), Subqueries.exists(clientGroups)));

        if (routeId != null && routeId != 0 ) {
            crit.add(Restrictions.eq("hidRoute", routeId));
        }
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("sname", query.trim(), MatchMode.ANYWHERE));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query, Usr usr, Long routeId) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "cl");
        DetachedCriteria clientGroups =
                DetachedCriteria.forClass(ClientGroups.class, "clng").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.eq("name", usr.getGroup().getName())).
                        add(Property.forName("clng.id.clientId").eqProperty("cl.hid"));

        crit.setProjection(Projections.rowCount());
//        crit.add(Restrictions.in("trans", usr.getTrans()));
        crit.add(Restrictions.or(Restrictions.in("trans", usr.getTrans()), Subqueries.exists(clientGroups)));
        if (routeId != null && routeId != 0 ) {
            crit.add(Restrictions.eq("hidRoute", routeId));
        }
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("sname", query.trim(), MatchMode.ANYWHERE));
        }
        return (Long) crit.uniqueResult();
    }

    @Override
    public Client findById(Long hid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("hid", hid));
        return (Client) crit.uniqueResult();
    }
}
