package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.DocDir;

import java.util.List;

/**
 * Created by IntelliJ IDEA.
 * User: 1
 * Date: 24.12.11
 * Time: 16:06
 * To change this template use File | Settings | File Templates.
 */
public interface RouteDocsDAO extends GenericDAO<DocDir, Long>{
    List<DocDir> findAll(Integer limit, Integer start, Search search);
}
