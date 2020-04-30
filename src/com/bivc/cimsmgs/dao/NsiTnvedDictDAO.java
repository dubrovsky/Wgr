package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.NsiTnvedDict;

import java.math.BigDecimal;

public interface NsiTnvedDictDAO extends GenericDAO<NsiTnvedDict, BigDecimal> {
    NsiTnvedDict findByNaimEn(String nzgrEn);
}
