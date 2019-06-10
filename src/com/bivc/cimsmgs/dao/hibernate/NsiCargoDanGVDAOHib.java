package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.NsiCargoDanGVDAO;
import com.bivc.cimsmgs.db.nsi.CargoDanGV;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import org.hibernate.Criteria;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public class NsiCargoDanGVDAOHib extends GenericHibernateDAO<CargoDanGV, Long> implements NsiCargoDanGVDAO {

    @Override
    public List<CargoDanGV> findAll() throws InfrastructureException {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        return listAndCast(crit);
    }
}
