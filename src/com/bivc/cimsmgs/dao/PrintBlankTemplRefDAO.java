package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.PrintBlankTemplRef;

public interface PrintBlankTemplRefDAO extends GenericDAO<PrintBlankTemplRef, Long>{
    int deleteRefs(Long hid);
}
