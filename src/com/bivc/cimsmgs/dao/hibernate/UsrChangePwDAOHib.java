package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.actions.CangePw_A;
import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.db.UsrCahgePw;
import com.bivc.cimsmgs.db.UsrPwLog;
import org.apache.struts2.ServletActionContext;
import org.hibernate.*;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

public class UsrChangePwDAOHib  {
	final static private Logger log = LoggerFactory.getLogger(UsrChangePwDAOHib.class);

	public UsrCahgePw findByName(String username) {
		Session session;
		Transaction tx = null;

			try {
				session = HibernateUtil.getSession();
//				tx = session.beginTransaction();

				Criteria crit = session.createCriteria(UsrCahgePw.class);
				crit.add(Restrictions.eq("un", username));
//				tx.commit();

				return (UsrCahgePw) crit.uniqueResult();
			}
			catch (Exception ex) {
				log.error(ex.getMessage(), ex);
//				if (tx != null) tx.rollback();
			}

			return null;
	}

	public void change(UsrCahgePw usrchpw, String new_pw) throws Exception {
		Session session;
		Transaction tx = null;

		try {
			session = HibernateUtil.getSession();
			tx = session.beginTransaction();

			Set<UsrPwLog> pw_log = usrchpw.getUsr_pw_log();

			usrchpw.setPs(new_pw);
			usrchpw.setDatpw(new Date());

			Iterator<UsrPwLog> it = pw_log.iterator();
			int i = 0;
			Set<UsrPwLog> r = new HashSet<>(0);
			while (it.hasNext()) {
				UsrPwLog u = it.next();
				if(i >= 6) {
					r.add(u);
				}
				i++;
			}

			// Стираем пароли глубже 6-ти
			it = r.iterator();
			while (it.hasNext()) {
				UsrPwLog u = it.next();
				pw_log.remove(u);
			}

			pw_log.add( new UsrPwLog(usrchpw) );

//			tx.commit();
		}
		catch (Exception ex) {
//			log.error(ex.getMessage(), ex);
			if (tx != null) tx.rollback();
			throw ex;
		}
	}
}
