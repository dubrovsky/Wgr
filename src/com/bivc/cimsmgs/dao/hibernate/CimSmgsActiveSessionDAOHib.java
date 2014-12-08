package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.CimSmgsActiveSessionDAO;
import com.bivc.cimsmgs.db.CimSmgsActiveSession;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;

public class CimSmgsActiveSessionDAOHib extends GenericHibernateDAO<CimSmgsActiveSession, BigDecimal> implements CimSmgsActiveSessionDAO
{
    final static private Logger log = LoggerFactory.getLogger(CimSmgsActiveSessionDAOHib.class);
  public CimSmgsActiveSession findByKey(String key)
  {
    log.info("CimSmgsActiveSessionDAOHib works...");
    Criteria crit = getSession().createCriteria(getPersistentClass());
    crit.add(Restrictions.eq("key",  key));
    return (CimSmgsActiveSession)crit.uniqueResult();

  }
}
