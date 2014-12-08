package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.FieldsAccessFobidden;
import com.bivc.cimsmgs.db.FieldsAccessFobiddenId;

import java.util.List;

public interface FieldsAccessFobiddenDAO extends GenericDAO<FieldsAccessFobidden, FieldsAccessFobiddenId>{
    List<FieldsAccessFobidden> findAll(Long docHid, String groupName);
}
