package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.FieldsDirDAO;
import com.bivc.cimsmgs.db.FieldsDir;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

public class FieldsDirDAOHib extends GenericHibernateDAO<FieldsDir, Long> implements FieldsDirDAO {
    @Override
    public List<FieldsDir> findFieldsByDocId(Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.createCriteria("fieldsDocsRefses").add(Restrictions.eq("docDir.hid", new BigDecimal(search.getDocId())));
        crit.addOrder(Order.desc("name"));

//        getSession().enableFilter("limitDocRefsByDocId").setParameter("docId", new BigDecimal(search.getDocId()));

        return listAndCast(crit);
    }
}
