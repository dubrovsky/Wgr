package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.YardSectorDAO;
import com.bivc.cimsmgs.db.ky.YardSector;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

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

    /*@Override
    public void delete(Integer hid) {
        YardSector sector = (YardSector) getSession().get(YardSector.class, hid);
        for(Yard yard : sector.getYards()){
            if(yard.findKont() != null) {
                yard.findKont().unbindYard();
            }
            getSession().delete(yard);
        }
        getSession().delete(sector);
    }*/
}
