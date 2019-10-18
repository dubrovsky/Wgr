package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.dao.GenericDAO;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.AvtoZayav;

import java.util.List;
import java.util.Locale;

/**
 * Created by peter on 21.02.14.
 */
public interface AvtoZayavDAO extends GenericDAO<AvtoZayav, Long> {
    List<AvtoZayav> findAll(Integer limit, Integer start, Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

    List<AvtoZayav> findAllActual(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

    Long countAll(Long routeId, Byte direction, List<Filter> filters, Usr usr, Locale locale);

//    List<Avto> findByNo_avto(String no_avto);
//
//    List<Avto> findAvtosOut4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale);
//
//    Long countAvtosOut4Kont(List<Filter> filters, Usr usr, Locale locale);
//
//    List<Avto> findAvtosDir(Integer limit, Integer start, List<Filter> filters, Usr usr, Long routeId, Byte direction);
//
//    Long countAvtosDir(List<Filter> filters, Usr usr, Long routeId, Byte direction);
//
//    List<Avto> findAllPresentAvtos(Usr usr, long routeId, Byte direction);

    List<AvtoZayav> findByIds(List<Long> ids);

    List<AvtoZayav> findByNkons(Long routeId, Usr usr, List<String> nkons);

}
