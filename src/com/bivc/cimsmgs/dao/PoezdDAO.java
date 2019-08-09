package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Poezd;
import com.bivc.cimsmgs.services.ky.PoezdService;

import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 21.02.14.
 */
public interface PoezdDAO extends GenericDAO<Poezd, Long> {
    List<Poezd> findAll(Integer limit, Integer start, Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale, Byte koleya);

    Long countAll(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale, Byte koleya);

    List<Poezd> findByNppr(String nppr);

    Integer findMaxNppr(PoezdService.PoezdPrefix sp, String dateProp, int year);

    List<Poezd> findPoezdsDir(Integer limit, Integer start, List<Filter> filters, Usr usr, Long routeId, Byte direction);

    Long countPoezdsDir(List<Filter> filters, Usr usr, Long routeId, Byte direction);
}
