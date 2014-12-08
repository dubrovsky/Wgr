package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Doc2docTemplates;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteRefs;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteUnRefs;

import java.util.List;

public interface Doc2DocTemplatesDAO extends GenericDAO<Doc2docTemplates, Long>{
    List<Doc2docTemplsRouteUnRefs> findDoc2DocTempls4UnRoute(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom, */Long routeId, String username, String groupBy);
    List<Doc2docTemplsRouteRefs> findDoc2DocTempls4Route(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom, */Long routeId, String groupBy);
//    List<Doc2docTemplsUnRefs> findDoc2DocTempls4Un(BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom, String username);

    List<Doc2docTemplates> findDefaultDoc2DocTempls(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom*/ String groupBy);
}
