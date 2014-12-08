package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.LoggingEventDAO;
import com.bivc.cimsmgs.db.LoggingEvent;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class LoggingEventDAOHib extends GenericHibernateDAO<LoggingEvent, Long> implements LoggingEventDAO {
    public List<LoggingEvent> findAll1(Integer limit, Integer start, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("timestmp"));
        if (search != null) {
            if (StringUtils.isNotEmpty(search.getUn())) {
                crit.createCriteria("loggingEventProperties").add(Restrictions.eq("mappedValue", search.getUn()));
            }
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

                crit.add(Restrictions.gt("timestmp", BigDecimal.valueOf(date1.getTime()) ));
                crit.add(Restrictions.le("timestmp", BigDecimal.valueOf(date2.getTime())));
            }
        }
        return crit.list();
    }

    public Long countAll(Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (search != null) {
            if (StringUtils.isNotEmpty(search.getUn())) {
                crit.createCriteria("loggingEventProperties").add(Restrictions.eq("mappedValue", search.getUn()));
            }
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

                crit.add(Restrictions.gt("timestmp", BigDecimal.valueOf(date1.getTime())));
                crit.add(Restrictions.le("timestmp", BigDecimal.valueOf(date2.getTime())));
            }
        }
        return (Long) crit.uniqueResult();
    }
}
