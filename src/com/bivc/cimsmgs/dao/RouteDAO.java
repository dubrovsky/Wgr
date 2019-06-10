package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.Route;

import java.util.List;

/**
 * Date: 13.01.12
 * Time: 10:19
 */
public interface RouteDAO extends GenericDAO<Route, Long>{
    List<Route> findAll(Integer limit, Integer start, String query, Search search);

    Long countAll(String query, Search search);

//    Route findForDeleted();
}
