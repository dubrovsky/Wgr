package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.NsiKontDAO;
import com.bivc.cimsmgs.db.ky.NsiKont;
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
public class NsiKontDAOHib extends GenericHibernateDAO<NsiKont, Long> implements NsiKontDAO {

    @Override
    public List<NsiKont> findAll(Integer limit, Integer start, List<Filter> filters){
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if(limit != 0) {
            crit.setFirstResult(start).setMaxResults(limit);
        }
        crit.addOrder(Order.asc("nkont"));

        applyFilter(filters, crit);
        return listAndCast(crit);
    }

    @Override
    public Long countAll(/*String query*/List<Filter> filters) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.setProjection(Projections.countDistinct("nkont"));
        crit.setProjection(Projections.countDistinct("hid"));
//        crit.setProjection(Projections.rowCount());
        applyFilter(filters, crit);
        return (Long) crit.uniqueResult();
    }

    @Override
    public NsiKont findBy(String nkon) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nkont", StringUtils.trim(nkon)));
        return (NsiKont) crit.uniqueResult();
    }

    @Override
    public NsiKont findBy(String nkon, Long hid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nkont", StringUtils.trim(nkon)));
        if(hid != null){
            crit.add(Restrictions.ne("hid", hid));
        }
        return (NsiKont) crit.uniqueResult();
    }

    private void applyFilter(List<Filter> filters, Criteria crit) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (NsiKont.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NKON:
                            crit.add(Restrictions.ilike(NsiKont.FilterFields.NKON.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }
                }

            }
        }
    }
}

