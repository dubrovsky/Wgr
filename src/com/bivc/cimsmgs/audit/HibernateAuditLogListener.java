package com.bivc.cimsmgs.audit;

import com.bivc.cimsmgs.commons.myUser;
import org.apache.commons.lang3.ArrayUtils;
import org.hibernate.event.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Date;

/**
 * Date: 27.04.12
 * Time: 15:15
 */
public class HibernateAuditLogListener implements PreInsertEventListener, PreUpdateEventListener, PreDeleteEventListener/*, FlushEntityEventListener, MergeEventListener*/ {

    final static private Logger log = LoggerFactory.getLogger(HibernateAuditLogListener.class);

    @Override
    public boolean onPreInsert(PreInsertEvent event) {
        log.info("onPreInsert - " + event.getEntity().toString());
        /* StatelessSession session = event.getPersister().getFactory().openStatelessSession();
        session.beginTransaction();
        session.insert();
        session.getTransaction().commit();
        session.close();*/

        Object entity = event.getEntity();
        Object[] state = event.getState();
        String[] propertyNames = event.getPersister().getEntityMetamodel().getPropertyNames();
        if(SecurityContextHolder.getContext().getAuthentication() != null){
            myUser user = (myUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            setValue(state, propertyNames, "un", user.getUsername(), entity);
            setValue(state, propertyNames, "trans", user.getUsr().getGroup().getName(), entity);
        }
        Date currentTime = new Date();
        setValue(state, propertyNames, "altered", currentTime, entity);
        setValue(state, propertyNames, "dattr", currentTime, entity);

        return false;
    }

    @Override
    public boolean onPreUpdate(PreUpdateEvent event) {
        log.info("onPreUpdate - " + event.getEntity().toString());
        Object entity = event.getEntity();
        Object[] state = event.getState();
        String[] propertyNames = event.getPersister().getEntityMetamodel().getPropertyNames();
        setValue(state, propertyNames, "dattr", new Date(), entity);
        return false;
    }

    void setValue(Object[] currentState, String[] propertyNames, String propertyToSet, Object value, Object entity) {
        int index = ArrayUtils.indexOf(propertyNames, propertyToSet);
        if (index >= 0) {
            currentState[index] = value;
        } else {
//                   Log.error("Field '" + propertyToSet + "' not found on entity '" + entity.getClass().getName() + "'.");
        }
    }

    @Override
    public boolean onPreDelete(PreDeleteEvent event) {
//        log.info("onPreDelete - " + event.getEntity().toString());
        return false;
    }

   /* @Override
    public void onFlushEntity(FlushEntityEvent event) throws HibernateException {
//        if(event.getDirtyProperties() != null){
            log.info("onFlushEntity - Dirty properties " + event.getEntity().toString() + " " + event.getDirtyProperties());
//        }
    }
*/
    /*@Override
    public void onMerge(MergeEvent event) throws HibernateException {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void onMerge(MergeEvent event, Map copiedAlready) throws HibernateException {
        //To change body of implemented methods use File | Settings | File Templates.
    }*/
}
