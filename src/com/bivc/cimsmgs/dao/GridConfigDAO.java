package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.GridConfig;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

public interface GridConfigDAO extends GenericDAO<GridConfig, Long> {
    public List<GridConfig> findAll(Usr usr);
    public List<GridConfig> findAll(String un,String itemId);
}
