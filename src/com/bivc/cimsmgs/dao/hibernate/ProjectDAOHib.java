package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.ProjectDAO;
import com.bivc.cimsmgs.db.Project;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.Filter;
import org.hibernate.criterion.*;

import java.util.List;

public class ProjectDAOHib extends GenericHibernateDAO<Project, Long> implements ProjectDAO {
    public List<Project> findAll(Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).addOrder(Order.asc("name"));
        if (!usr.isSu()) {
            crit.createAlias("projectGroupses", "grp").
                    add(Restrictions.in("grp.usrGroupsDir.name", usr.getTrans()));
            Filter filter = getSession().enableFilter("limitRoutesByUserGroup");
            filter.setParameterList("userGroup", usr.getTrans());
            filter = getSession().enableFilter("limitDocsByFobiddenUserGroup");
            filter.setParameterList("userGroup", usr.getTrans());
        }
        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        return (List<Project>) crit.list();
    }

    public List<Project> findAll4aviso(Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).addOrder(Order.asc("name"));
        crit.createAlias("routes", "r", CriteriaSpecification.LEFT_JOIN);
        crit.createAlias("r.routeDocs", "rd", CriteriaSpecification.LEFT_JOIN);
        crit.createAlias("rd.docDir", "doc").add(Restrictions.eq("doc.name", "aviso"));
        crit.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
//        Filter filter = getSession().enableFilter("limitRoutesByDocType");
//        filter.setParameter("doc", "avisoform");
        return (List<Project>) crit.list();
    }

    public List<Project> findAllProjects(Integer limit, Integer start) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.desc("dattr"));
        return crit.list();
    }

    public Long countAllProjects() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        return (Long) crit.uniqueResult();
    }

    public Project findById2(Project project) {
        Criteria crit = getSession().createCriteria(getPersistentClass()).
                createAlias("projectGroupses", "projGroups", CriteriaSpecification.LEFT_JOIN).        // init 4 jakcson
                createAlias("projGroups.usrGroupsDir", "usrGroup", CriteriaSpecification.LEFT_JOIN).
                createAlias("routes", "routes", CriteriaSpecification.LEFT_JOIN).
                createAlias("routes.routeGroupses", "routeGroupses", CriteriaSpecification.LEFT_JOIN).
                createAlias("routeGroupses.usrGroupsDir", "usrGroup1", CriteriaSpecification.LEFT_JOIN).
                createAlias("routes.routeDocs", "routeDocs", CriteriaSpecification.LEFT_JOIN).
                createAlias("routeDocs.docDir", "docDir", CriteriaSpecification.LEFT_JOIN);
        crit.add(Restrictions.eq("hid", project.getHid()));
        return (Project) crit.uniqueResult();
    }

    public List<Project> findAll(Integer limit, Integer start, String query, Usr usr) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setFirstResult(start).setMaxResults(limit == null || limit == 0 ? 20 : limit);
        crit.addOrder(Order.asc("name"));
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        return crit.list();
    }

    public Long countAll(String query) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.setProjection(Projections.rowCount());
        if (query != null && query.trim().length() > 0) {
            crit.add(Restrictions.ilike("name", query.trim(), MatchMode.ANYWHERE));
        }
        return (Long) crit.uniqueResult();
    }

    /*public List<Project> findAllProjects() {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        crit.addOrder(Order.desc("dattr"));
        return crit.list();
    }*/

    /*public List<DocDir> findDocs4User(Usr usr) {
        final String query =
            "SELECT DISTINCT d " +
            "FROM Project p " +
            "LEFT JOIN FETCH p.projectGroupses p_g " +
            "LEFT JOIN FETCH p.routes r " +
            "LEFT JOIN FETCH r.routeGroupses r_g " +
            "LEFT JOIN FETCH r.routeDocs r_d " +
            "INNER JOIN FETCH r_d.docDir d " +
            "WHERE p_g.usrGroupsDir.name = 'test' and r_g.usrGroupsDir.name = 'test' ";

        Query q = getSession().createQuery(query);
//        q.setParameter("id", id);
//		q.setParameterList("trans", usr.getTrans());
         return (List<DocDir>) q.list();
    }*/
}
