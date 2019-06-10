package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.NsiVagShirDAO;
import com.bivc.cimsmgs.db.ky.NsiVagShir;
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
public class NsiVagShirDAOHib extends GenericHibernateDAO<NsiVagShir, Long> implements NsiVagShirDAO {

    @Override
    public List<NsiVagShir> findAll(Integer limit, Integer start/*, String query*/, List<Filter> filters){
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if(limit != 0) {
            crit.setFirstResult(start).setMaxResults(limit);
        }
        crit.addOrder(Order.asc("nvag"));
        /*if (StringUtils.isNotBlank(query)) {

            crit.add(Restrictions.ilike("nvag", query.trim(), MatchMode.ANYWHERE));
        }*/
        applyFilter(filters, crit);
        return listAndCast(crit);
    }

    @Override
    public Long countAll(/*String query*/List<Filter> filters) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.countDistinct("hid"));
        /*if (StringUtils.isNotBlank(query)) {
            crit.add(Restrictions.ilike("nvag", query.trim(), MatchMode.ANYWHERE));
        }*/

        applyFilter(filters, crit);
        return (Long) crit.uniqueResult();
    }

    @Override
    public NsiVagShir findBy(String nvag) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nvag", StringUtils.trim(nvag)));
        return (NsiVagShir) crit.uniqueResult();
    }

    @Override
    public NsiVagShir findBy(String nvag, Long hid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("nvag", StringUtils.trim(nvag)));
        if(hid != null){
            crit.add(Restrictions.ne("hid", hid));
        }
        return (NsiVagShir) crit.uniqueResult();
    }

    private void applyFilter(List<Filter> filters, Criteria crit) {
        if(CollectionUtils.isNotEmpty(filters)){
            for(Filter filter: filters){
                if(StringUtils.isNotBlank(filter.getProperty()) && StringUtils.isNotBlank(filter.getValue())){
                    Date date;
                    switch (NsiVagShir.FilterFields.valueOf(filter.getProperty().toUpperCase())){
                        case NVAG:
                            crit.add(Restrictions.ilike(NsiVagShir.FilterFields.NVAG.getName(), StringUtils.trim(filter.getValue()), MatchMode.ANYWHERE));
                            break;
                    }
                }

            }
        }
    }
}
