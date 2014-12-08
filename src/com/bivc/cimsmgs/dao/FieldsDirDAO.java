package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.FieldsDir;

import java.util.List;

public interface FieldsDirDAO extends GenericDAO<FieldsDir, Long>{
    List<FieldsDir> findFieldsByDocId(Search search);
}
