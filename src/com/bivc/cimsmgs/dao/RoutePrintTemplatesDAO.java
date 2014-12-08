package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.RoutePrintTemplates;
import com.bivc.cimsmgs.db.RoutePrintTemplatesId;

import java.util.List;

public interface RoutePrintTemplatesDAO extends GenericDAO<RoutePrintTemplates, RoutePrintTemplatesId>{
    List<RoutePrintTemplates> findByPrintTemplId(Long hid);

    int deleteRefs(Long hid);
}
