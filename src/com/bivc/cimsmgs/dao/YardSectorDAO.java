package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.YardSector;

import java.util.List;

/**
 * Created by peter on 10.02.14.
 */
public interface YardSectorDAO extends GenericDAO<YardSector, Integer> {
    public List<YardSector> findAll(Integer limit, Integer start, String query);

    public Long countAll(String query);

    public List<YardSector> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query, Usr usr);

//    public void delete(Integer hid);
}
