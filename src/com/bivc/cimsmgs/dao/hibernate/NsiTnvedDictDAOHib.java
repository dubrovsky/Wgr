package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiTnvedDictDAO;
import com.bivc.cimsmgs.db.NsiTnvedDict;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

public class NsiTnvedDictDAOHib extends GenericHibernateDAO<NsiTnvedDict, BigDecimal> implements NsiTnvedDictDAO {

    @Override
    public NsiTnvedDict findByNaimEn(String nzgrEn) {
        Criteria crit= getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("naimEn",nzgrEn));
        crit.setMaxResults(1);
        return (NsiTnvedDict) crit.uniqueResult();
    }
}
