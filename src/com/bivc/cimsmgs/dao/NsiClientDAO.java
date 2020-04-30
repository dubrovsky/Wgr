package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Client;

import java.util.List;

public interface NsiClientDAO extends GenericDAO<Client, Long> {
    List<Client> findAll(Integer limit, Integer start, String query, Usr usr, Long routeId);
    Client findById(Long hid);
    Long countAll(String query, Usr usr, Long routeId);
}
