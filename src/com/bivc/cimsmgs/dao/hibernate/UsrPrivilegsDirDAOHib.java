package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.UsrPrivilegsDirDAO;
import com.bivc.cimsmgs.db.UsrPrivilegsDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class UsrPrivilegsDirDAOHib extends GenericHibernateDAO<UsrPrivilegsDir, String> implements UsrPrivilegsDirDAO {
	@SuppressWarnings("unchecked")
	public List<UsrPrivilegsDir> findAll() {
	    Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("hidden", false));
	    crit.addOrder(Order.desc("dattr"));
	    return crit.list();
	  }
}
