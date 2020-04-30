package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiTnved4;
import com.bivc.cimsmgs.db.Usr;

import java.math.BigDecimal;
import java.util.List;

public interface NsiTnvedDAO extends GenericDAO<NsiTnved4, BigDecimal>{
    List<NsiTnved4> findAll(Integer limit, Integer start, String query, Usr usr);

    Long countAll(String query);

    List<NsiTnved4> findAll();
    List<NsiTnved4>findTnvedsByCodeList(List<String> tnveds);
    List<NsiTnved4>findTnvedsByCodeListLike(List<String> tnveds);
}
