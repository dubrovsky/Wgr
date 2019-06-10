package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.FileInfDAO;
import com.bivc.cimsmgs.db.CimSmgsFileInf;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class FileInfDAOHib extends GenericHibernateDAO<CimSmgsFileInf, Long> implements FileInfDAO {
    public List<CimSmgsFileInf> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException {
		Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("type", search.getDocType()));
        crit.createAlias("packDoc", "pack").
                createAlias("pack.usrGroupsDir", "gr").
                add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));

        crit.createAlias("route", "route").
                add(Restrictions.eq("route.hid", search.getRouteId()));
		crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
		crit.addOrder(Order.desc("dattr"));
        /*if(search.getPackId() != null){
            crit.add(Restrictions.eq("pack.hid", search.getPackId()));
        }*/

        if (search != null) {
			if (search.getHid() != null && search.getHid() != 0)
				crit.add(Restrictions.eq("hid", search.getHid()));
			if (search.getNkon() != null && search.getNkon().trim().length() > 0)
				crit.add(Restrictions.ilike("nkon", search.getNkon().trim(), MatchMode.ANYWHERE));
            if (search.getDate1() != null && search.getDate2() != null) {
                Date date1 = search.getDate1();
                Date date2 = search.getDate2();
                if (search.getDate11() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date1);
                        date += " " + search.getDate11().trim();
                        date1 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }
                if (search.getDate21() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date2);
                        date += " " + search.getDate21().trim();
                        date2 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                } else {
                    Calendar c = Calendar.getInstance();
                    c.setTime(date2);
                    c.add(Calendar.DATE, 1);
                    date2 = c.getTime();
                }

                crit.add(Restrictions.gt("altered", date1));
                crit.add(Restrictions.le("altered", date2));
            }

		}
		return crit.list();
	}

	public Long countAll(Search search, Usr usr) {
		Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("type", search.getDocType()));
        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans())).
                add(Restrictions.eq("pack.deleted", search.getDeleted() != 0));
        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
        /*if(search.getPackId() != null){
            crit.add(Restrictions.eq("pack.hid", search.getPackId()));
        }*/
		crit.setProjection(Projections.rowCount());
        if (search != null) {
			if (search.getHid() != null && search.getHid() != 0)
				crit.add(Restrictions.eq("hid", search.getHid()));
			if (search.getNkon() != null && search.getNkon().trim().length() > 0)
				crit.add(Restrictions.ilike("nkon", search.getNkon().trim(), MatchMode.ANYWHERE));
            if (search.getDate1() != null && search.getDate2() != null) {
                Date date1 = search.getDate1();
                Date date2 = search.getDate2();
                if (search.getDate11() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date1);
                        date += " " + search.getDate11().trim();
                        date1 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                }
                if (search.getDate21() != null) {
                    try {
                        String date = new SimpleDateFormat("dd.MM.yy").format(date2);
                        date += " " + search.getDate21().trim();
                        date2 = new SimpleDateFormat("dd.MM.yy HH:mm").parse(date);
                    } catch (ParseException ignore) {
                    }
                } else {
                    Calendar c = Calendar.getInstance();
                    c.setTime(date2);
                    c.add(Calendar.DATE, 1);
                    date2 = c.getTime();
                }

                crit.add(Restrictions.gt("altered", date1));
                crit.add(Restrictions.le("altered", date2));
            }

		}
		return (Long) crit.uniqueResult();
	}

    public CimSmgsFileInf findById2(CimSmgsFileInf file) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).
                        createAlias("packDoc", "pack").
              //  add(Restrictions.eq("pack.deleted", false)).
                        createAlias("route", "route");
        if(file.getHid() != null) {
            crit.add(Restrictions.eq("hid", file.getHid()));
        } else if(file.getPackDoc() != null && file.getPackDoc().getHid() != null){
            crit.add(Restrictions.eq("pack.hid", file.getPackDoc().getHid()));
            crit.add(Restrictions.eq("type", file.getType()));
        }
        return (CimSmgsFileInf)crit.uniqueResult();
	}

    @Override
    public Long countAll(PackDoc packDoc) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("packDoc", packDoc)).
                add(Restrictions.eq("packDoc.deleted", false));

        crit.setProjection(Projections.countDistinct("hid"));
        return (Long) crit.uniqueResult();
    }
}
