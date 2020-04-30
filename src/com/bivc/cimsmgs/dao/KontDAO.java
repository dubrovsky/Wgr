package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Filter;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.Kont;
import com.bivc.cimsmgs.db.ky.KontStatus;

import java.util.List;
import java.util.Locale;

//import com.bivc.cimsmgs.db.ky.KontStatus;

/**
 * Created by peter on 15.05.2014.
 */
public interface KontDAO extends GenericDAO<Kont, Long> {
    List<Kont> findAll(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale, KontStatus status);

    Long countAll(List<Filter> filters, Usr usr, Locale locale, KontStatus status);

    List<Kont> findKontDir(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale, KontStatus[] kontStatuses);

    Long countKontDir(List<Filter> filters, Usr usr, Locale locale, KontStatus[] kontStatuses);

    List<Kont> findAll4TrainOut(Integer limit, Integer start, List<Filter> filters, Usr usr, Locale locale);

    Long countAll4TrainOut(List<Filter> filters, Usr usr, Locale locale);

    List<Kont> findAll4Vagon(Long vagHid);

    Kont getByIdWithPoezdIntoAndVagonIntoAndAvtoInto(Long kontId);

    Kont getByIdWithPoezdOutAndVagonOutAndAvtoOut(Long kontId);

    Kont getByIdWithAllParents(Long kontId);

    List<Kont> findAll4Avto(Long hid);

    List<Kont> findKyKontsForDocsKont(String utiN, Route route, Usr usr);

    List<Kont> findAll(String nkon);

    Kont findByNkon(String nkon);
}
