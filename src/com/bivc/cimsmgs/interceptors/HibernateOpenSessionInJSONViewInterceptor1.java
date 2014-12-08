package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.exceptions.InfrastructureException;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.opensymphony.xwork2.interceptor.PreResultListener;
import org.hibernate.StaleObjectStateException;

public class HibernateOpenSessionInJSONViewInterceptor1 implements Interceptor {

    public void init() {
        try {
            Class.forName("com.bivc.cimsmgs.commons.HibernateUtil");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        }
    }

    public void destroy() {
    }

    public String intercept(ActionInvocation invocation) throws Exception {
        ExceptionHandler handler = new ExceptionHandler(invocation);
        return handler.invoke();
    }

    private class ExceptionHandler implements PreResultListener {
        private ActionInvocation invocation;

        public ExceptionHandler(ActionInvocation invocation) {
            this.invocation = invocation;
            invocation.addPreResultListener(this);
        }

        String invoke() throws Exception {
            try {
                HibernateUtil.beginTransaction();
                return invocation.invoke();
            } catch (Exception e) {
                HibernateUtil.rollbackTransaction();

                throw new Exception(e);
            } finally {
                HibernateUtil.closeSession();
            }


        }

        public void beforeResult(ActionInvocation invocation, String resultCode) {
            try {
                HibernateUtil.commitTransaction();
            } catch (StaleObjectStateException staleEx) {
                throw new InfrastructureException(staleEx);
            } catch (Exception ex) {
                // Rollback only
                HibernateUtil.rollbackTransaction();
                invocation.setResultCode(Action.ERROR);
                throw new InfrastructureException(ex);
            }
        }
    }

//    protected void publishException(ActionInvocation invocation, ExceptionHolder exceptionHolder) {
//        invocation.getStack().push(exceptionHolder);
//    }

}
