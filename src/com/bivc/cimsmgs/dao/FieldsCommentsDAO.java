package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.FieldsComments;

import java.util.List;

public interface FieldsCommentsDAO extends GenericDAO<FieldsComments, Long>{
    List<FieldsComments> findAll(Integer limit, Integer start, Search search);

    Long countAll(Search search);
}
