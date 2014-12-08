package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.LoggingEvent;

import java.util.List;

/**
 * Created with IntelliJ IDEA.
 * User: peter
 * Date: 05.05.12
 * Time: 16:01
 * To change this template use File | Settings | File Templates.
 */
public interface LoggingEventDAO extends GenericDAO<LoggingEvent, Long>{
    List<LoggingEvent> findAll1(Integer limit, Integer start, Search query);

    Long countAll(Search query);
}
