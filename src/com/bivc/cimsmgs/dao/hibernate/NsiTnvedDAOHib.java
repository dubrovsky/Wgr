package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiTnvedDAO;
import com.bivc.cimsmgs.db.NsiTnved4;
import com.bivc.cimsmgs.db.Usr;
import org.apache.commons.collections.CollectionUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Date: 10.06.11
 * Time: 11:39
 */
public class NsiTnvedDAOHib extends GenericHibernateDAO<NsiTnved4, BigDecimal> implements NsiTnvedDAO {
    public List<NsiTnved4> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("naim"));
        if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("naim", query.trim(), MatchMode.ANYWHERE)));
		}
        return listAndCast(crit);
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("kod", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("naim", query.trim(), MatchMode.ANYWHERE)));
		}
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<NsiTnved4> findAll() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
//        crit.addOrder(Order.desc("dattr"));
        return listAndCast(crit);
    }

    /**
     *Получем списк ТНВЭД, коды которых совпадают с кодами из списка
     * @param tnveds список кодов ТНВЭД
     * @return список ТНВЭД
     */
    @Override
    public List<NsiTnved4> findTnvedsByCodeList(List<String> tnveds) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.in("kod",tnveds));
        List<NsiTnved4> list=crit.list();
        return list;
    }

    /**
     * ПОлучем списк ТНВЭД, коды которых начинаются с кодов из списка
     * @param tnveds список кодов ТНВЭД
     * @return список ТНВЭД
     */
    @Override
    public List<NsiTnved4> findTnvedsByCodeListLike(List<String> tnveds) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        if(tnveds.size()==0)
            return new ArrayList<>();
        if(tnveds.size()==1)
        {
            crit.add(Restrictions.like("kod",tnveds.get(0),MatchMode.START));
        }
        if(tnveds.size()>1)
        {
            LogicalExpression or=Restrictions.or(Restrictions.ilike("kod", tnveds.get(0), MatchMode.START),
                    Restrictions.ilike("kod", tnveds.get(1), MatchMode.START));


            for(int i=2;i<tnveds.size();i++)
            {
                or=Restrictions.or(or,
                        Restrictions.ilike("kod", tnveds.get(i), MatchMode.START));
            }
            crit.add(or);
        }
        return crit.list();
    }
}
