package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.GridConfigDAO;
import com.bivc.cimsmgs.db.GridConfig;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class GridConfigDAOHib extends GenericHibernateDAO<GridConfig, Long> implements GridConfigDAO {

    public List<GridConfig> findAll( Usr usr)
    {
        Criteria crit = getSession().createCriteria(GridConfig.class, "gridconfig");
        crit.add(Restrictions.eq("un",usr.getUn()));
        crit.addOrder(Order.asc("sort"));
        return crit.list();
    }
    public List<GridConfig> findAll( String un,String itemId)
    {
        Criteria crit = getSession().createCriteria(GridConfig.class, "gridconfig");
        crit.add(Restrictions.eq("un",un));
        crit.add(Restrictions.eq("itemId",itemId));
        return crit.list();
    }

}
