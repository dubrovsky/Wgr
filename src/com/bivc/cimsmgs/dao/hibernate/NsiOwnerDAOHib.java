package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.NsiOwnerDAO;
import com.bivc.cimsmgs.db.ky.NsiKyOwners;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.Date;
import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiOwnerDAOHib extends GenericHibernateDAO<NsiKyOwners, Long> implements NsiOwnerDAO {

    @Override
    public List<NsiKyOwners> findAll(Integer limit, Integer start, List<Filter> filters){
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if(limit != 0) {
            crit.setFirstResult(start).setMaxResults(limit);
        }
        crit.addOrder(Order.desc("dattr"));

        applyFilter(filters, crit);
        return listAndCast(crit);
    }

    @Override
    public Long countAll(/*String query*/List<Filter> filters) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setProjection(Projections.countDistinct("noAvto"));
        crit.setProjection(Projections.countDistinct("hid"));
//        crit.setProjection(Projections.rowCount());
        applyFilter(filters, crit);
        return (Long) crit.uniqueResult();
    }

    private void applyFilter(List<Filter> filters, Criteria crit) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (NsiKyOwners.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NAMEOWN:
                            crit.add(Restrictions.ilike(NsiKyOwners.FilterFields.NAMEOWN.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }
                }

            }
        }
    }
}



