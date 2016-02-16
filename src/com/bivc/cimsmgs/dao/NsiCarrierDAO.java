package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.nsi.Carrier;

import java.util.List;

/**
 * @author p.dzeviarylin
 */
public interface NsiCarrierDAO  extends GenericDAO<Carrier, Long> {
    List<Carrier> findAll(Integer limit, Integer start, String query, Usr usr);
    Long countAll(String query, Usr usr);
}
