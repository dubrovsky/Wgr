package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.NsiAvtoDAO;
import com.bivc.cimsmgs.db.ky.NsiAvto;
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
public class NsiAvtoDAOHib extends GenericHibernateDAO<NsiAvto, Long> implements NsiAvtoDAO {

    @Override
    public List<NsiAvto> findAll(Integer limit, Integer start, List<Filter> filters){
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if(limit != 0) {
            crit.setFirstResult(start).setMaxResults(limit);
        }
        crit.addOrder(Order.asc("noAvto"));

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

    @Override
    public NsiAvto findBy(String navto) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("noAvto", StringUtils.trim(navto)));
        return (NsiAvto) crit.uniqueResult();
    }

    private void applyFilter(List<Filter> filters, Criteria crit) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (NsiAvto.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NOAVTO:
                            crit.add(Restrictions.ilike(NsiAvto.FilterFields.NOAVTO.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }
                }

            }
        }
    }
}


