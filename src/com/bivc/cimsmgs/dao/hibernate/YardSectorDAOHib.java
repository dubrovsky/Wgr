package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.db.ky.YardSectorGroups;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;

import java.util.List;

/**
 * Created by peter on 10.02.14.
 */
public class YardSectorDAOHib extends GenericHibernateDAO<YardSector, Integer> implements YardSectorDAO {

    @Override
    public List<YardSector> findAll(Integer limit, Integer start, String query){
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("name"));
        if (StringUtils.isNotBlank(query)) {
           /* crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("descr", query.trim(), MatchMode.ANYWHERE)));*/

            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.countDistinct("hid"));
        if (StringUtils.isNotBlank(query)) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
            /*crit.add(Restrictions.or(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("descr", query.trim(), MatchMode.ANYWHERE)));*/
        }
        return (Long) crit.uniqueResult();
    }


    @Override
    public List<YardSector> findAll(Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "ys");

        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("ys.hid"));
        crit.add(Subqueries.exists(yardSectorGroups));

        crit.addOrder(Order.asc("name"));
        return listAndCast(crit);
    }


    @Override
    public List<YardSector> findAll(Integer limit, Integer start, String query, Usr usr){
        Criteria crit = getSession().createCriteria(getPersistentClass(), "ys");

        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("ys.hid"));
        crit.add(Subqueries.exists(yardSectorGroups));

        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("name"));
        if (StringUtils.isNotBlank(query)) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        return listAndCast(crit);
    }

    @Override
    public Long countAll(String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass(), "ys");
        crit.setProjection(Projections.countDistinct("hid"));
        DetachedCriteria yardSectorGroups =
                DetachedCriteria.forClass(YardSectorGroups.class, "ysg").
                        setProjection(Property.forName("hid")).
                        createCriteria("group").
                        add(Restrictions.in("name", usr.getTrans())).
                        add(Property.forName("ysg.id.yardSectorId").eqProperty("ys.hid"));
        crit.add(Subqueries.exists(yardSectorGroups));

        if (StringUtils.isNotBlank(query)) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        return (Long) crit.uniqueResult();
    }

}
