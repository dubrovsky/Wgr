package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Usr;

import java.io.Serializable;
import java.util.List;

/**
 * An interface shared by all business data access objects.
 * <p>
 * All CRUD (create, read, update, delete) basic data access operations are
 * isolated in this interface and shared accross all DAO implementations.
 * The current design is for a state-management oriented persistence layer
 * (for example, there is no UDPATE statement function) that provides
 * automatic transactional dirty checking of business objects in persistent
 * state.
 *
 * @author Christian Bauer
 */
public interface GenericDAO<T, ID extends Serializable> {

    T findById(ID id, boolean lock);

    List<T> findAll(Integer limit, Integer start, String query, Usr usr);

    List<T> findByExample(T exampleInstance, String... excludeProperty);

    T makePersistent(T entity);

    T merge(T entity);

    void makeTransient(T entity);

    /**
     * Affects every managed instance in the current persistence context!
     */
    void flush();

    /**
     * Affects every managed instance in the current persistence context!
     */
    void clear();

    T getById(ID id, boolean lock);

}
