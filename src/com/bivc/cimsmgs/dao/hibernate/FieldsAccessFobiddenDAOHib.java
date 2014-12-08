package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.FieldsAccessFobiddenDAO;
import com.bivc.cimsmgs.db.FieldsAccessFobidden;
import com.bivc.cimsmgs.db.FieldsAccessFobiddenId;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class FieldsAccessFobiddenDAOHib extends GenericHibernateDAO<FieldsAccessFobidden, FieldsAccessFobiddenId> implements FieldsAccessFobiddenDAO {
    @Override
    public List<FieldsAccessFobidden> findAll(Long docHid, String groupName) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("id.docHid", docHid));
        crit.add(Restrictions.eq("id.groupName", groupName));
        crit.createCriteria("fieldsDir");
        return crit.list();
    }
}
