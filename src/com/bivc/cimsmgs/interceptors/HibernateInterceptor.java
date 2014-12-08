package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.opensymphony.xwork2.interceptor.PreResultListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class HibernateInterceptor implements Interceptor {
    final static private Logger log = LoggerFactory.getLogger(HibernateInterceptor.class);
    @Override
    public void destroy() {
        //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public void init() {
        try {
            Class.forName("com.bivc.cimsmgs.commons.HibernateUtil");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    @Override
    public String intercept(ActionInvocation invocation) throws Exception {
        HibernateUtil.beginTransaction();

        invocation.addPreResultListener(new PreResultListener() {
            public void beforeResult(ActionInvocation invocation, String resultCode) {
                try {
                    if(!ifActionThrowsException(invocation)){
                        commitTransaction(); // can throw exception
                    }
                    // if exception is thrown from action - transaction is rollbacked in Exception Interceptor - NEDD to be done so for 2 hiberenate inteceptors to works properly
                    /*// here again rollback if something goes wrong in Exception Interceptor
                    else {
                        rollbackTransaction();  // catch exception from Action -
                    }*/
                }  catch (Exception ex) {
//                    log.error("Could not commit transaction", ex);
                    rollbackTransaction();
//                    prepareDataForErrorResultHandler(invocation, ex);

                    throw new RuntimeException(ex);
                }
            }
        });

        String result = invocation.invoke();

        return result;
    }

    private boolean ifActionThrowsException(ActionInvocation invocation) {
        return (invocation.getStack().peek() instanceof ExceptionHolder);  // if Action throw Exception it will be catched by Exception Interceptor.
        // Then the workflow comes here as this is PreResultListener Interceptor.
        // if Exception has been thrown - rollbackTransaction
    }

    private void commitTransaction() {
        HibernateUtil.commitTransaction();
    }

    private void rollbackTransaction() {
        try {
            HibernateUtil.rollbackTransaction();
        } catch (Throwable rbEx) {
            log.error("Could not rollback transaction after exception", rbEx);
        }
    }

    /*private void prepareDataForErrorResultHandler(ActionInvocation invocation, Exception ex) {
        invocation.setResultCode(Action.ERROR);    // go to error Result
        publishException(invocation, new ExceptionHolder(ex)); // prepare Exception for error Result, ExceptionHolder throws Struts exception Interceptor, so we use it also
    }

    private void publishException(ActionInvocation invocation, ExceptionHolder exceptionHolder) {
        invocation.getStack().push(exceptionHolder);
    }*/
}
