package com.bivc.cimsmgs.commons;

import com.isc.utils.dbStore.dbTool;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;
import org.hibernate.connection.ConnectionProvider;
import org.hibernate.engine.SessionFactoryImplementor;
import org.hibernate.impl.SessionFactoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateUtil {
    private static final SessionFactoryImpl sessionFactory;
    private static final Logger logger;
    private static final Configuration config;

    static {
        logger = LoggerFactory.getLogger(HibernateUtil.class);
        try {
            config = new Configuration().configure();

            sessionFactory = (SessionFactoryImpl) config.buildSessionFactory();
        } catch (Throwable ex) {
            logger.error("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() {
        return getSessionFactory().getCurrentSession();
    }

    public static Transaction getTransaction() {
        return getSession().getTransaction();
    }

    public static void closeSession() {

    }

    public static void beginTransaction() {
//        logger.info("beginTransaction");
        getSession().beginTransaction();
    }

    public static void commitTransaction() {
//        logger.info("Try to commitTransaction");
        if (getTransaction().isActive()) {
//            logger.info("commitTransaction");
            getTransaction().commit();
        }
    }

    public static void rollbackTransaction() {
//        logger.info("Try to rollbackTransaction");
        if (getTransaction().isActive()) {
//            logger.info("rollbackTransaction");
            getTransaction().rollback();
        }
    }

    public static Configuration getConfiguration() {
        return config;
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static dbTool initDbTool() throws Exception {
        ConnectionProvider connectionProvider = sessionFactory.getConnectionProvider();
        return new dbTool(connectionProvider.getConnection(), null);
    }

}
