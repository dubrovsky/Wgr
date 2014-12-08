package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.Doc2DocTemplatesDAO;
import com.bivc.cimsmgs.db.Doc2docTemplates;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteRefs;
import com.bivc.cimsmgs.db.Doc2docTemplsRouteUnRefs;
import org.hibernate.Criteria;
import org.hibernate.criterion.Restrictions;

import java.util.List;

public class Doc2DocTemplatesDAOHib extends GenericHibernateDAO<Doc2docTemplates, Long> implements Doc2DocTemplatesDAO {
    @Override
    public List<Doc2docTemplsRouteUnRefs> findDoc2DocTempls4UnRoute(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom, */Long routeId, String username, String groupBy) {
        Criteria crit = getSession().
                createCriteria(Doc2docTemplsRouteUnRefs.class).
                add(Restrictions.eq("id.hidRoute", routeId)).
                add(Restrictions.eq("id.hidUn", username)).
                createCriteria("doc2docTemplates").
                add(Restrictions.eq("groupBy", groupBy));
       /* if(docIdFrom != null){
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("hid", docIdFrom));
        }
        if(docIdTo != null){
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("hid", docIdTo));
        }
        if(typeFrom != null){
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("type", typeFrom));
        }
        if(typeTo != null){
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("type", typeTo));
        }*/
        return listAndCast(crit);
    }

    @Override
    public List<Doc2docTemplsRouteRefs> findDoc2DocTempls4Route(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom, */Long routeId, String groupBy) {
        Criteria crit = getSession().
                createCriteria(Doc2docTemplsRouteRefs.class).
                add(Restrictions.eq("id.hidRoute", routeId)).
                createCriteria("doc2docTemplates").
                add(Restrictions.eq("groupBy", groupBy));
        /*if(docIdFrom != null){
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("hid", docIdFrom));
        }
        if(docIdTo != null){
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("hid", docIdTo));
        }
        if(typeFrom != null){
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("type", typeFrom));
        }
        if(typeTo != null){
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("type", typeTo));
        }*/
        return listAndCast(crit);
    }

    @Override
    public List<Doc2docTemplates> findDefaultDoc2DocTempls(/*BigDecimal docIdTo, BigDecimal docIdFrom, Byte typeTo, Byte typeFrom*/ String groupBy) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("defaults", true)).
             add(Restrictions.eq("groupBy", groupBy));
        /*if (docIdFrom != null) {
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("hid", docIdFrom));
        }
        if (docIdTo != null) {
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("hid", docIdTo));
        }
        if (typeFrom != null) {
            crit.createCriteria("docDirByHidDocFrom").add(Restrictions.eq("type", typeFrom));
        }
        if (typeTo != null) {
            crit.createCriteria("docDirByHidDocTo").add(Restrictions.eq("type", typeTo));
        }*/

        return listAndCast(crit);
    }
}
