package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.DocDirDAO;
import com.bivc.cimsmgs.db.DocDir;

import java.math.BigDecimal;

public class DocDirDAOHib extends GenericHibernateDAO<DocDir, BigDecimal> implements DocDirDAO {
//    public DocDir findById(String id, boolean lock) {
//        DocDir entity;
//        if (lock)
//            entity = (DocDir) getSession().load(getPersistentClass(), id, LockOptions.UPGRADE);
//        else
//            entity = (DocDir) getSession().load(getPersistentClass(), id);
//
//        return entity;
//    }
}
