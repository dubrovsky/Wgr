package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Zayav;

import java.util.List;
import java.util.Locale;

/**
 * @author p.dzeviarylin
 */
public interface PoezdZayavDAO extends GenericDAO<Zayav, Long> {
    List<Zayav> findAll(Integer limit, Integer start, long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

    Long countAll(long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);
}
