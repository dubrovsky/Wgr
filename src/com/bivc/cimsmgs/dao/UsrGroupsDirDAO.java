package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.UsrGroupsDir;

import java.util.List;

public interface UsrGroupsDirDAO extends GenericDAO<UsrGroupsDir, String> {
    public List<UsrGroupsDir> findAll();
//   public Integer update(UsrGroups usr);

    public List<UsrGroupsDir> findAll(String query);

    public Long countAll(String query);
}
