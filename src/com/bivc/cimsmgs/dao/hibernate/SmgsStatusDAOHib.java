package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.SmgsStatusDAO;
import com.bivc.cimsmgs.db.CimSmgsStatus;
import org.hibernate.Query;

import java.math.BigDecimal;
import java.util.List;

public class SmgsStatusDAOHib extends GenericHibernateDAO<CimSmgsStatus, Long> implements SmgsStatusDAO
{
  @SuppressWarnings("unchecked")
public List<CimSmgsStatus> findByUnNotArh(Long hidCs, String un)
  {
//    Criteria crit = getSession().createCriteria(getPersistentClass());
//    crit.add(Restrictions.eq("loginName", un));
//    crit.add(Restrictions.isNull("arch"));
//    crit.createCriteria("cimSmgs").add(Restrictions.eq("hid", hidCs));

//    String query = "SELECT new CimSmgsStatus(status.status) " +
//      "FROM CimSmgsStatus status INNER JOIN status.cimSmgs smgs " +
//      "WHERE smgs.hid = :hidCs AND status.loginName = :un AND status.arch IS NULL ";

    final String query =
      "FROM CimSmgsStatus st " +
      "INNER JOIN FETCH st.cimSmgs smgs " +
//      "INNER JOIN FETCH st.company comp " +
      "WHERE smgs.hid = :hidCs AND st.loginName = :un AND st.arch IS NULL ";

    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);
    q.setParameter("un", un);

    return q.list();
  }

  @SuppressWarnings("unchecked")
public List<CimSmgsStatus> findByCompNotArh(Long hidCs, BigDecimal hidComp)
  {
    final String query =
      "FROM CimSmgsStatus st " +
//      "INNER JOIN st.cimSmgs smgs " +
//      "INNER JOIN st.company comp " +
      "WHERE st.cimSmgs.hid = :hidCs AND st.company.id = :hidComp AND st.arch IS NULL ";

    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);
    q.setParameter("hidComp", hidComp);

    return q.list();
  }

  @SuppressWarnings("unchecked")
public List<CimSmgsStatus> findAll(Long hidCs)
  {
    final String query =
      "FROM CimSmgsStatus s " +
      "WHERE s.cimSmgs.hid = :hidCs ORDER BY s.company.id, s.arch DESC ";
    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);

    return q.list();
  }

  public Long countAll(Long hidCs)
  {
    final String query =
      "SELECT COUNT(*) FROM CimSmgsStatus s " +
      "WHERE s.cimSmgs.hid = :hidCs";
    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);

    return (Long)q.uniqueResult();
  }


}
