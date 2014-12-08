package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.actions.CimSmgsSupport_A;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import com.opensymphony.xwork2.interceptor.Interceptor;
import com.opensymphony.xwork2.interceptor.PreResultListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ExceptionInterceptor implements Interceptor {

final static private Logger log = LoggerFactory.getLogger(ExceptionInterceptor.class);

    public void destroy() {
    }

    public void init() {
    }

    public String intercept(ActionInvocation invocation) throws Exception {
        ExceptionHandler handler = new ExceptionHandler(invocation);
        return handler.invoke();
    }

    private class ExceptionHandler implements PreResultListener {
        private ActionInvocation invocation;
        private String result = CimSmgsSupport_A.ERROR1;

        public ExceptionHandler(ActionInvocation invocation) {
            this.invocation = invocation;
            invocation.addPreResultListener(this);
        }

        String invoke() {
            try {
                result = invocation.invoke();
            } catch (Exception e) {
                log.info("ExceptionHandler catch error - ", e);
                result = CimSmgsSupport_A.ERROR1;
                invocation.getStack().push(new ExceptionHolder(e));
            }
            return result;
        }

        public void beforeResult(ActionInvocation invocation, String resultCode) {
            result = resultCode;
        }

    }
}
