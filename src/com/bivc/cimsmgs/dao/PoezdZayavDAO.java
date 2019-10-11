package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.PoezdZayav;

import java.util.List;
import java.util.Locale;

/**
 * @author p.dzeviarylin
 */
public interface PoezdZayavDAO extends GenericDAO<PoezdZayav, Long> {
    List<PoezdZayav> findAll(Integer limit, Integer start, long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

    Long countAll(long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

    List<PoezdZayav> findByIds(List<Long> ids);
}
