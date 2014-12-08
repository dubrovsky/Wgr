package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Usr;

import java.util.List;

public interface PackDocDAO  extends GenericDAO<PackDoc, Long>{

    List<PackDoc> findAll(Integer limit, Integer start, Search search, Usr usr);

    Long countAll(Search search, Usr usr);

    PackDoc findById2(PackDoc epd);

    void delete(Long hid);
}
