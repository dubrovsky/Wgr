package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.NsiDir;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 16.01.12
 * Time: 14:23
 */
public interface NsiDirDAO  extends GenericDAO<NsiDir, BigDecimal>{
    public List<NsiDir> findAll(Integer limit, Integer start, Search search) throws InfrastructureException;

    public Long countAll();
}
