package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.RouteUnPrintTemplates;
import com.bivc.cimsmgs.db.RouteUnPrintTemplatesId;

public interface RouteUnPrintTemplatesDAO extends GenericDAO<RouteUnPrintTemplates, RouteUnPrintTemplatesId>{
    int deleteRefs(byte hid, Long routeId, String un);
}
