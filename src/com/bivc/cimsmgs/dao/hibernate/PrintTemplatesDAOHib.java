package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.PrintTemplatesDAO;
import com.bivc.cimsmgs.db.*;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Property;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class PrintTemplatesDAOHib extends GenericHibernateDAO<PrintTemplates, Long> implements PrintTemplatesDAO {
    @Override
    public List<PrintTemplates> findAll(Integer limit, Integer start, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit);
        crit.addOrder(Order.desc("dattr"));
        crit.createAlias("docDir", "docDir").add(Restrictions.eq("docDir.hid", new BigDecimal(search.getDocType())));
//        crit.createAlias("routePrintTemplateses", "routePrn").add(Restrictions.eq("routePrn.route.hid", new Long(search.getDocType())));
//        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return crit.list();
    }

    @Override
    public Long countAll(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.createAlias("docDir", "docDir").add(Restrictions.eq("docDir.hid", new BigDecimal(search.getDocType())));
//        crit.createAlias("routePrintTemplateses", "routePrn").add(Restrictions.eq("routePrn.route.hid", new Long(search.getDocType())));
        return (Long) crit.uniqueResult();
    }

    @Override
    public List<PrintTemplates> findAllNotDeafault(Integer limit, Integer start, Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit);
        crit.addOrder(Order.desc("dattr"));
        crit.createAlias("docDir", "docDir").add(Restrictions.eq("docDir.hid", new BigDecimal(search.getDocType())));
        crit.add(Restrictions.eq("defaults", false));
        return crit.list();
    }

    @Override
    public Long countAllNotDeafault(Search search, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        crit.createAlias("docDir", "docDir").add(Restrictions.eq("docDir.hid", new BigDecimal(search.getDocType())));
        crit.add(Restrictions.eq("defaults", false));
        return (Long) crit.uniqueResult();
    }

    @Override
    public ArrayList<RouteUnPrintTemplates> findPrnTempls4UnRoute(DocDir doc, Route route, String username) {
        Criteria crit = getSession().
                createCriteria(RouteUnPrintTemplates.class).
                add(Restrictions.eq("route", route)).
                add(Restrictions.eq("id.hidUn", username)).
                createCriteria("printTemplates").add(Restrictions.eq("docDir", doc));
        return (ArrayList) crit.list();
    }

//    @Override
//    public PrintTemplates findDefaultTemplate(DocDir doc) {
//        Criteria crit = getSession().createCriteria(getPersistentClass()).createAlias("docDir", "doc");
//        crit.add(Restrictions.eq("doc.hid", doc.getHid()));
//        crit.add(Restrictions.eq("defaults", true));
//        return (PrintTemplates) crit.uniqueResult();
//    }

    @Override
    public PrintTemplates findById2(PrintTemplates prnTempl) {
        Criteria crit = getSession().createCriteria(getPersistentClass())/*.
                createAlias("printDatas", "printDatas", CriteriaSpecification.LEFT_JOIN).        // init 4 jakcson
                createAlias("routePrintTemplateses", "routePrintTemplateses", CriteriaSpecification.LEFT_JOIN).
                createAlias("routePrintTemplateses.route", "route", CriteriaSpecification.LEFT_JOIN)*/;
        crit.add(Restrictions.eq("hid", prnTempl.getHid()));
        return (PrintTemplates) crit.uniqueResult();
    }

    @Override
    public Long findDefaultDocTemplate(Long hid, DocDir doc) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("defaults", true));
        if (hid != null) { // for edit mode
            crit.add(Restrictions.ne("hid", hid));
        }
        crit.add(Restrictions.eq("docDir", doc));

        crit.setProjection(Projections.rowCount());

        return (Long) crit.uniqueResult();
    }

    /* @Override
public ArrayList<PrintTemplates> findPrnTemplates4Print(PrintTemplates prnTempl, Route route) {
    *//*Criteria crit = getSession().createCriteria(getPersistentClass()).
            createAlias("routePrintTemplateses", "routePrintTemplateses", CriteriaSpecification.LEFT_JOIN).
            createAlias("routePrintTemplateses.route", "route", CriteriaSpecification.LEFT_JOIN);
        crit.add(Restrictions.eq("route", route));
        crit.add(Restrictions.eq("docDir", prnTempl.getDocDir()));
        return (ArrayList)crit.list();*//*
        return null;
    }*/

    @Override
    public ArrayList<RoutePrintTemplates> findPrnTempls4Route(DocDir doc, Route route) {
        Criteria crit = getSession().
                createCriteria(RoutePrintTemplates.class).
                add(Restrictions.eq("route", route)).
                createCriteria("printTemplates").
                add(Restrictions.eq("docDir", doc)).
                addOrder(Order.desc("dattr"));
        return (ArrayList) crit.list();
    }

    @Override
    public ArrayList<PrintTemplates> findDefaultPrnTempls(DocDir doc) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.add(Restrictions.eq("defaults", true));
        crit.add(Restrictions.eq("docDir", doc));
        return (ArrayList) crit.list();
    }

    @Override
    public PrintTemplates findById1(Long hid) {
        PrintTemplates prnTmpl = (PrintTemplates) getSession().get(getPersistentClass(), hid);
        getSession().clear();
        return prnTmpl;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public List<Integer> findPages4BindedPrnTemplate(DocDir doc, Route route) {
        Criteria crit = getSession().
                createCriteria(PrintData.class).setProjection(Projections.distinct(Property.forName("page"))).addOrder(Order.asc("page")).
                createCriteria("printTemplates").add(Restrictions.eq("docDir", doc)).
                createCriteria("routePrintTemplateses").add(Restrictions.eq("route", route));

        return crit.list();
    }

    @Override
    public List<Integer> findPages4BindedUnPrnTemplate(DocDir doc, Route route, String username) {
        Criteria crit = getSession().
                createCriteria(PrintData.class).setProjection(Projections.distinct(Property.forName("page"))).addOrder(Order.asc("page")).
                createCriteria("printTemplates").add(Restrictions.eq("docDir", doc)).
                createCriteria("routeUnPrintTemplateses").add(Restrictions.eq("route", route)).add(Restrictions.eq("id.hidUn", username));

        return crit.list();
    }

    @Override
    public List<Integer> findPages4DefaultPrnTemplate(DocDir doc) {
        Criteria crit = getSession().
                createCriteria(PrintData.class).setProjection(Projections.distinct(Property.forName("page"))).addOrder(Order.asc("page")).
                createCriteria("printTemplates").add(Restrictions.eq("docDir", doc)).add(Restrictions.eq("defaults", true));

        return crit.list();
    }

    @Override
    public List<Integer> findPages4PrnTemplate(DocDir doc, Long tempHid) {
        Criteria crit = getSession().
                createCriteria(PrintData.class).setProjection(Projections.distinct(Property.forName("page"))).addOrder(Order.asc("page")).
                createCriteria("printTemplates").add(Restrictions.eq("docDir", doc)).add(Restrictions.eq("hid", tempHid));

        return crit.list();
    }

    @Override
    public Long countPrnBlankRefs(DocDir doc, Route route) {
        Criteria crit = getSession().
                createCriteria(PrintBlankTemplRef.class, "printBlankTemplRef").setProjection(Projections.count("id.hidBlank")).
                createCriteria("printBlankTemplRef.printTemplates", "printTemplates").add(Restrictions.eq("docDir", doc)).
                createCriteria("printTemplates.routePrintTemplateses").add(Restrictions.eq("route", route)).
                createCriteria("printBlankTemplRef.printBlank").add(Restrictions.eq("preview", false));
        return (Long)crit.uniqueResult();
    }

    @Override
    public Long countUnPrnBlankRefs(DocDir doc, Route route, String username) {
        Criteria crit = getSession().
                createCriteria(PrintBlankTemplRef.class, "printBlankTemplRef").setProjection(Projections.count("id.hidBlank")).
                createCriteria("printBlankTemplRef.printTemplates", "printTemplates").add(Restrictions.eq("docDir", doc)).
                createCriteria("printTemplates.routeUnPrintTemplateses").add(Restrictions.eq("route", route)).add(Restrictions.eq("id.hidUn", username)).
                createCriteria("printBlankTemplRef.printBlank").add(Restrictions.eq("preview", false));
        return (Long)crit.uniqueResult();
    }

    @Override
    public Long countPrnBlankRefs4Default(DocDir doc) {
        Criteria crit = getSession().
                createCriteria(PrintBlankTemplRef.class, "printBlankTemplRef").setProjection(Projections.count("id.hidBlank")).
                createCriteria("printBlankTemplRef.printTemplates").add(Restrictions.eq("docDir", doc)).add(Restrictions.eq("defaults", true)).
                createCriteria("printBlankTemplRef.printBlank").add(Restrictions.eq("preview", false));
        return (Long)crit.uniqueResult();
    }

    @Override
    public Long countPrnBlankRefs(DocDir doc, Long tempHid) {
        Criteria crit = getSession().
                createCriteria(PrintBlankTemplRef.class, "printBlankTemplRef").setProjection(Projections.count("id.hidBlank")).
                createCriteria("printBlankTemplRef.printTemplates").add(Restrictions.eq("docDir", doc)).add(Restrictions.eq("hid", tempHid)).
                createCriteria("printBlankTemplRef.printBlank").add(Restrictions.eq("preview", false));
        return (Long)crit.uniqueResult();
    }
}
