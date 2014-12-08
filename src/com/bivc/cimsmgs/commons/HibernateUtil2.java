package com.bivc.cimsmgs.commons;

public class HibernateUtil2 {
    /*private static final SessionFactoryImpl sessionFactory;
    private static final ThreadLocal<Session> threadSession = new ThreadLocal<Session>();
    private static final ThreadLocal<Transaction> threadTransaction = new ThreadLocal<Transaction>();
    private static final Logger logger;
    private static final Configuration config;

    static {
        logger = LoggerFactory.getLogger(HibernateUtil.class);
        try {
            config = new Configuration().configure();

            sessionFactory = (SessionFactoryImpl)config.buildSessionFactory();
        } catch (Throwable ex) {
            logger.error("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static Session getSession() {
        logger.info("getSession");
        Session s = threadSession.get();
        try {
            if (s == null) {
                s = sessionFactory.openSession(*//*interceptor*//*);
                threadSession.set(s);
            }
        } catch (HibernateException ex) {
            logger.error("Could not get session - " + ex);
            throw new HibernateException(ex);
        }
        return s;
    }

    public static void closeSession() {
        logger.info("closeSession");
        try {
            Session s = threadSession.get();
            threadSession.set(null);
            if (s != null && s.isOpen())
                s.close();
        } catch (HibernateException ex) {
            logger.error("Could not close session - " + ex);
            throw new HibernateException(ex);
        }
    }

    public static void beginTransaction() {
        logger.info("beginTransaction");
        Transaction tx = threadTransaction.get();
        try {
            if (tx == null) {
                tx = getSession().beginTransaction();
                threadTransaction.set(tx);
            }
        } catch (HibernateException ex) {
            logger.error("Could not begin transaction -" + ex);
            throw new HibernateException(ex);
        }
    }

    public static void commitTransaction() {
        logger.info("commitTransaction");
        Transaction tx = threadTransaction.get();
        try {
            if (tx != null && !tx.wasCommitted() && !tx.wasRolledBack())
                tx.commit();
            threadTransaction.set(null);
        } catch (HibernateException ex) {
            rollbackTransaction();
            logger.error("Could not commit transaction - " + ex);
            throw new HibernateException(ex);
        }
    }

    public static void rollbackTransaction() {
        logger.info("rollbackTransaction");
        Transaction tx = threadTransaction.get();
        try {
            threadTransaction.set(null);
            if (tx != null && !tx.wasCommitted() && !tx.wasRolledBack()) {
                tx.rollback();
            }
        } catch (HibernateException ex) {
            logger.error("Could not rollback transaction after exception! - " + ex);
            throw new HibernateException(ex);
        } finally {
            closeSession();
        }
    }

    public static Configuration getConfiguration() {
        return config;
    }

    public static SessionFactory getSessionFactory() {
        logger.info("getSessionFactory");
        return sessionFactory;
    }*/


}
