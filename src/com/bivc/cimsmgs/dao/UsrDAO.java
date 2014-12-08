package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.DocDir;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

public interface UsrDAO extends GenericDAO<Usr, String> {
    public List<Usr> findAll(Integer limit, Integer start, String query, Usr usr);

    //  public Integer update(Usr usr);
    public Usr findByName(String username);

    public Usr findPs(String id);

    public List<DocDir> findDocs4User(Usr usr);

    Long countAll(String search);
}
