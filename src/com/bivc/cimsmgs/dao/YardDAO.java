package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Yard;
import com.bivc.cimsmgs.dto.ky2.YardFilerDirDTO;

import java.util.List;
import java.util.Locale;

//import com.bivc.cimsmgs.db.KontYard;

/**
 * Created by peter on 21.01.14.
 */
public interface YardDAO extends GenericDAO<Yard, Long> {
    Long countAll(List<Filter> filters, Locale locale);

    List<Yard> findAll(Integer limit, Integer start, List<Filter> filters, Locale locale);

    Long countAll(List<Filter> filters, Locale locale, Usr usr, Long routeId, List<String> nkons);

    List<Yard> findAll(Integer limit, Integer start, List<Filter> filters, Locale locale, Usr usr, Long routeId, List<String> nkons);

    Yard findPlace4Kont(Integer sectorHid);

    List<Yard> findPlaces4Kont(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale);

    Long counPlaces4Kont(List<Filter> filters, Usr usr, Locale locale);

    Yard getYardBy(Long kontId);

    List<Yard> findAll4Report2(List<Filter> filters, Usr usr, Locale locale);

    List<YardFilerDirDTO> getPoezdsForFilter(Usr usr);

    List<YardFilerDirDTO> getGruzotprsForFilter(Usr usr, Long routeId);


//    public void delete(Long hid);
}
