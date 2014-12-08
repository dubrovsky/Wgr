package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExceptionMappingInterceptor extends com.opensymphony.xwork2.interceptor.ExceptionMappingInterceptor {
    private final static Logger log = LoggerFactory.getLogger(ExceptionMappingInterceptor.class);

    public String intercept(ActionInvocation invocation) throws Exception {
        String result;
        try{
            result = super.intercept(invocation);
        } catch (Exception ex){
            rollbackTransaction();
            throw ex;
        }
        return result;
    }


    @Override
    protected void publishException(ActionInvocation invocation, ExceptionHolder exceptionHolder) {
        super.publishException(invocation, exceptionHolder);
        rollbackTransaction();
    }

    private void rollbackTransaction() {  // rollbackTransaction from both hibernate filters - for json and jsp
        try {
            HibernateUtil.rollbackTransaction();
        } catch (Throwable rbEx) {
            log.error("Could not rollback transaction after exception", rbEx);
        }
    }
}
