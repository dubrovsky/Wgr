package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.UsrPrivilegsDirDAO;
import com.bivc.cimsmgs.db.UsrPrivilegsDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
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

	/**
	 * Получает список пользовательских привелегий с именем и/или описанием похожим на заданный апраметр
	 * @param query параметр поиска
	 * @return список привелегий
	 */
	public List<UsrPrivilegsDir> findAll(String query) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
		crit.add(Restrictions.eq("hidden", false));
		crit.addOrder(Order.desc("dattr"));
		if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.disjunction()
					.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE))
					.add(Restrictions.ilike("descr", query.trim(), MatchMode.ANYWHERE)));
		}
		return crit.list();
	}
}
