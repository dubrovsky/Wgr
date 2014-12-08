package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.RouteUnPrintTemplatesDAO;
import com.bivc.cimsmgs.db.RouteUnPrintTemplates;
import com.bivc.cimsmgs.db.RouteUnPrintTemplatesId;

public class RouteUnPrintTemplatesDAOHib extends GenericHibernateDAO<RouteUnPrintTemplates, RouteUnPrintTemplatesId> implements RouteUnPrintTemplatesDAO {
    @Override
    public int deleteRefs(byte docId, Long routeId, String un) {
        String hqlDelete = "delete RouteUnPrintTemplates refs where refs.id.hidRoute = :routeId and refs.id.hidUn = :un and " +
                " exists (from PrintTemplates templ where refs.id.hidPrnTmpl = templ.hid and templ.docDir.hid = :docId)";
        int deletedEntities = getSession().createQuery(hqlDelete)
                .setByte("docId", docId)
                .setLong("routeId", routeId)
                .setString("un", un)
                .executeUpdate();

        return deletedEntities;
    }
}
