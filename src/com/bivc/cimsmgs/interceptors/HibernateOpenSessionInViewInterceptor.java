package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateOpenSessionInViewInterceptor extends AbstractInterceptor {
    final static private Logger log = LoggerFactory.getLogger(HibernateOpenSessionInViewInterceptor.class);

    @Override
    public String intercept(ActionInvocation invocation) throws Exception {
        HibernateUtil.beginTransaction();
        String result = invocation.invoke();
        try {
            HibernateUtil.commitTransaction();
        } catch (Throwable ex) {
            log.error("Could not commit transaction", ex);
            try {
                HibernateUtil.rollbackTransaction();
            } catch (Throwable rbEx) {
                log.error("Could not rollback transaction after exception", rbEx);
            }
        }
        return result;
    }
}
