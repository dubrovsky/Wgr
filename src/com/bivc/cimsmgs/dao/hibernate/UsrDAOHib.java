package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.UsrDAO;
import com.bivc.cimsmgs.db.DocDir;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Query;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class UsrDAOHib extends GenericHibernateDAO<Usr, String> implements UsrDAO {
	@SuppressWarnings("unchecked")
	public List<Usr> findAll(Integer limit, Integer start, String query, Usr usr) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("un", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("namKlient", query.trim(), MatchMode.ANYWHERE)));
        }
		crit.addOrder(Order.desc("dattr"));
		return crit.list();
	}

	@Override
	public List<Usr> findAll(Integer limit, Integer start, String query, String query1, Usr usr) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
		crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
		if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.and(
					Restrictions.or(Restrictions.ilike("un", query.trim(), MatchMode.ANYWHERE),
							Restrictions.ilike("namKlient", query.trim(), MatchMode.ANYWHERE)),
					Restrictions.eq("group.name", query1.trim())
			) );
		}
		else
			crit.add(Restrictions.eq("group.name", query1.trim()));
		crit.addOrder(Order.desc("dattr"));
		return crit.list();
	}

	@Override
    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.or(Restrictions.ilike("un", query.trim(), MatchMode.ANYWHERE),
                    Restrictions.ilike("namKlient", query.trim(), MatchMode.ANYWHERE)));
        }
        return (Long) crit.uniqueResult();
    }

	@Override
	public Long countAll(String query, String query1) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
		crit.setProjection(Projections.rowCount());
		if (query != null && query.trim().length() > 0) {
			crit.add(Restrictions.or(Restrictions.ilike("un", query.trim(), MatchMode.ANYWHERE),
					Restrictions.ilike("namKlient", query.trim(), MatchMode.ANYWHERE)));
		}

		crit.add(Restrictions.eq("group.name", query1.trim()));

		return (Long) crit.uniqueResult();
	}

//	public Integer update(Usr usr) {
//		boolean isPs = (usr.getPs() != null && usr.getPs().trim().length() > 0);
//		final String query = "UPDATE Usr u "
//				+ "SET u.trans = :trans, u.namKlient = :namKlient, u.email = :email, u.strans = :strans, u.locked = :locked, u.su = :su, u.func = :func, u.dattr = :dattr, u.un1 = :un1 "
//				+ (isPs ? ", u.ps = :ps " : "") + "WHERE u.hid = :hid";
//		Query q = getSession().createQuery(query);
//		q.setLong("hid", usr.getHid());
//		// q.setString("trans",usr.getTrans());
//		q.setString("namKlient", usr.getNamKlient());
//		q.setString("email", usr.getEmail());
//		// q.setString("strans",usr.getStrans());
//		// q.setString("locked",usr.getLocked());
//		// q.setString("su",usr.getSu());
//		// q.setString("func",usr.getFunc());
//		q.setString("un1", usr.getUn1());
//		q.setTimestamp("dattr", usr.getDattr());
//		if (isPs)
//			q.setString("ps", usr.getPs());
//		return q.executeUpdate();
//	}

	public Usr findByName(String username) {
		Criteria crit = getSession().createCriteria(getPersistentClass()).
			setFetchMode("group", FetchMode.JOIN);
		crit.add(Restrictions.eq("un", username));
		return (Usr) crit.uniqueResult();
	}

	public Usr findPs(String id) {
		String query = "SELECT new Usr(ps,datpw) FROM Usr WHERE un = :id";
	    Query q = getSession().createQuery(query);
	    q.setString("id", id);
	    return (Usr)q.uniqueResult();
	}

    public List<DocDir> findDocs4User(Usr usr) {
        final String query =
            "SELECT DISTINCT d " +
            "FROM Project p " +
            "INNER JOIN p.projectGroupses p_g " +
            "INNER JOIN p.routes r " +
            "INNER JOIN r.routeGroupses r_g " +
            "INNER JOIN r.routeDocs r_d " +
            "INNER JOIN r_d.docDir d " +
            "WHERE p_g.usrGroupsDir.name IN (:trans) and r_g.usrGroupsDir.name IN (:trans) ";

        Query q = getSession().createQuery(query);
//        q.setParameter("id", id);
		q.setParameterList("trans", usr.getTrans());
         return (List<DocDir>) q.list();
    }

}
