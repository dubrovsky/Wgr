package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.SmgsStatusAllowedDAO;
import com.bivc.cimsmgs.db.CimSmgsStatusAllowed;
import org.hibernate.Query;

import java.util.List;

public class SmgsStatusAllowedDAOHib extends GenericHibernateDAO<CimSmgsStatusAllowed, Long> implements SmgsStatusAllowedDAO
{
  @SuppressWarnings("unchecked")
public List<CimSmgsStatusAllowed> findByUn(String login)
  {
    final String query =
      "FROM CimSmgsStatusAllowed st " +
//      "INNER JOIN FETCH st.company comp " +
      "INNER JOIN FETCH st.company.userses user " +
      "WHERE user.loginName = :un ";

    Query q = getSession().createQuery(query);
    q.setParameter("un", login);

    return q.list();

  }
}
