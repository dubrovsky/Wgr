package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Management;

import java.util.List;

/**
 * Date: 07.02.12
 * Time: 16:08
 */
public interface ManagementDAO extends GenericDAO<Management, Long>{

    Long countAll(String query);

    List<Management> findAll(Integer limit, Integer start, String query, Usr usr);

    List<Management> findAll();
}
