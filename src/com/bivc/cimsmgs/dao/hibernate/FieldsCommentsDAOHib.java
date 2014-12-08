package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.dao.FieldsCommentsDAO;
import com.bivc.cimsmgs.db.FieldsComments;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;

import java.math.BigDecimal;
import java.util.List;

public class FieldsCommentsDAOHib extends GenericHibernateDAO<FieldsComments, Long> implements FieldsCommentsDAO {
    @Override
    public List<FieldsComments> findAll(Integer limit, Integer start, Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));

        crit.createAlias("packDoc", "pack").add(Restrictions.eq("pack.hid", search.getPackId()));/*.createCriteria("cimSmgses").add(Restrictions.eq("docType1", new BigDecimal(search.getDocId())))*/
        if(search.getDocId() != 2){ // smgs table
            crit.createCriteria("pack.cimSmgses").add(Restrictions.eq("hid", search.getHid()));
        } else { // invoice
            crit.createCriteria("pack.csInvoices").add(Restrictions.eq("hid", search.getHid()));
        }

//        crit.createCriteria("fieldsDir").createCriteria("fieldsDocsRefses").createCriteria("docDir").add(Restrictions.eq("hid", new BigDecimal(search.getDocId())));
        /*if (StringUtils.isNotEmpty(search.getZakazNo())){
            crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
        }*/

        getSession().enableFilter("limitDocRefsByDocId").setParameter("docId", new BigDecimal(search.getDocId()));

        return listAndCast(crit);
    }

    @Override
    public Long countAll(Search search) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.countDistinct("hid"));
        crit.createAlias("packDoc", "pack").add(Restrictions.eq("pack.hid", search.getPackId()));/*.createCriteria("cimSmgses").add(Restrictions.eq("docType1", new BigDecimal(search.getDocId())))*/
        if(search.getDocId() != 2){ // smgs table
            crit.createCriteria("pack.cimSmgses").add(Restrictions.eq("hid", search.getHid()));
        } else { // invoice
            crit.createCriteria("pack.csInvoices").add(Restrictions.eq("hid", search.getHid()));
        }
//        crit.createAlias("packDoc", "pack").createAlias("pack.usrGroupsDir", "gr").add(Restrictions.in("gr.name", usr.getTrans()));
//        crit.createAlias("route", "route").add(Restrictions.eq("route.hid", search.getRouteId()));
//        crit.add(Restrictions.eq("type", search.getType()));
        /*if (StringUtils.isNotEmpty(search.getZakazNo())){
            crit.add(Restrictions.eq("zakazNo", search.getZakazNo()));
        }*/

        return (Long) crit.uniqueResult();
    }
}
