package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.PrintBlankTemplRefDAO;
import com.bivc.cimsmgs.db.PrintBlankTemplRef;

public class PrintBlankTemplRefDAOHib extends GenericHibernateDAO<PrintBlankTemplRef, Long> implements PrintBlankTemplRefDAO {
    @Override
    public int deleteRefs(Long hid) {
        String hqlDelete = "delete PrintBlankTemplRef pbt where pbt.id.hidTempl = :hid";
        int deletedEntities = getSession().createQuery(hqlDelete)
                .setLong("hid", hid )
                .executeUpdate();

        return deletedEntities;
    }
}
