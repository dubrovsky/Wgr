package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.RoutePrintTemplatesDAO;
import com.bivc.cimsmgs.db.RoutePrintTemplates;
import com.bivc.cimsmgs.db.RoutePrintTemplatesId;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class RoutePrintTemplatesDAOHib extends GenericHibernateDAO<RoutePrintTemplates, RoutePrintTemplatesId> implements RoutePrintTemplatesDAO {
    @Override
    public List<RoutePrintTemplates> findByPrintTemplId(Long hid) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("id.hidPrnTmpl", hid));
        List<RoutePrintTemplates> list = crit.list();
        getSession().clear();
        return list;
    }

    @Override
    public int deleteRefs(Long hid) {
        String hqlDelete = "delete RoutePrintTemplates pbt where pbt.id.hidPrnTmpl = :hid";
        int deletedEntities = getSession().createQuery(hqlDelete)
                .setLong("hid", hid )
                .executeUpdate();

        return deletedEntities;
    }
}
