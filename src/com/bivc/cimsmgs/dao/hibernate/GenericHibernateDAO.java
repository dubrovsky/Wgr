package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.dao.GenericDAO;
import com.bivc.cimsmgs.db.Usr;
import org.hibernate.Criteria;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Example;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

public abstract class GenericHibernateDAO<T, ID extends Serializable> implements GenericDAO<T, ID> {

    private Class<T> persistentClass;
//    private Session session;

    @SuppressWarnings("unchecked")
    public GenericHibernateDAO() {
        this.persistentClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass()).getActualTypeArguments()[0];
    }

    /*public void setSession(Session s) {
        this.session = s;
    }*/

    protected Session getSession() {
       /* if (session == null || !session.isOpen())
            session = HibernateUtil.getSession();
        return session;*/
        return HibernateUtil.getSession();
    }

    public Class<T> getPersistentClass() {
        return persistentClass;
    }

    @SuppressWarnings("unchecked")
    public T findById(ID id, boolean lock) {
        T entity;
        if (lock)
            entity = (T) getSession().load(getPersistentClass(), id, LockOptions.UPGRADE);
        else
            entity = (T) getSession().load(getPersistentClass(), id);

        return entity;
    }

    @SuppressWarnings("unchecked")
    public T getById(ID id, boolean lock) {
        T entity;
        if (lock)
            entity = (T) getSession().get(getPersistentClass(), id, LockOptions.UPGRADE);
        else
            entity = (T) getSession().get(getPersistentClass(), id);

        return entity;
    }


    public List<T> findAll(Integer limit, Integer start, String query, Usr usr) {
        return findByCriteria();
    }

    @SuppressWarnings("unchecked")
    public List<T> findByExample(T exampleInstance, String... excludeProperty) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        Example example = Example.create(exampleInstance);
        for (String exclude : excludeProperty) {
            example.excludeProperty(exclude);
        }
        crit.add(example);
        return crit.list();
    }

    public T makePersistent(T entity) {
        getSession().saveOrUpdate(entity);
        return entity;
    }

    public T merge(T entity) {
        getSession().merge(entity);
        return entity;
    }


    public void makeTransient(T entity) {
        getSession().delete(entity);
    }

    public void flush() {
        getSession().flush();
    }

    public void clear() {
        getSession().clear();
    }

    /**
     * Use this inside subclasses as a convenience method.
     */
    @SuppressWarnings("unchecked")
    protected <T> List<T> findByCriteria(Criterion... criterion) {
        Criteria crit = getSession().createCriteria(getPersistentClass());
        for (Criterion c : criterion) {
            crit.add(c);
        }
        return crit.list();
    }

    @SuppressWarnings("unchecked")
    public <T> List<T> listAndCast(Criteria crit) {
        return crit.list();
    }

    @SuppressWarnings("unchecked")
    public <T> List<T> listAndCast(Query query) {
        return query.list();
    }
}

