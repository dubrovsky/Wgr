package com.bivc.cimsmgs.interceptors;

import com.bivc.cimsmgs.actions.Login4_A;
import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.dao.UserAware;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.Interceptor;
import org.apache.struts2.StrutsStatics;
import org.apache.struts2.util.ServletContextAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

public class AuthenticationInterceptor implements Interceptor, ServletContextAware {
    final static private Logger log = LoggerFactory.getLogger(AuthenticationInterceptor.class);
    private final String USER_KEY = "userName";
    private static ServletContext servletContext;
    public static int periodOfCahgePasswordInDays = 0;

    public void destroy() {
    }

    public void init() {
        try {
            String s = servletContext.getInitParameter("periodOfCahgePasswordInDays");
            if(s != null && s.length() > 0) {
                periodOfCahgePasswordInDays = Integer.parseInt(s);
            }
        }
        catch (Exception ex) {
            log.error("error", ex);
        }
    }

    /*public String intercept(ActionInvocation actionInvocation) throws Exception {

        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            myUser user = (myUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            MDC.put("userName", user.getUsername());
            Action action = (Action) actionInvocation.getAction();

            if (action instanceof UserAware) {
                ((UserAware) action).setUser(user);
            }
        }
        String result = actionInvocation.invoke();
        MDC.remove("userName");
        return result;
    }*/

    public String intercept(ActionInvocation actionInvocation) throws Exception {
        boolean authenticated = false;
        SecurityContext context =SecurityContextHolder.getContext();
        if (context.getAuthentication() != null) {
            myUser user = (myUser) context.getAuthentication().getPrincipal();
            if (user != null) {
                MDC.put(USER_KEY, user.getUsername());
                authenticated = true;
                Action action = (Action) actionInvocation.getAction();

                if (action instanceof UserAware) {
                    ((UserAware) action).setUser(user);
                }
            }
        } else if (context.getAuthentication() == null || !context.getAuthentication().isAuthenticated()) {    // for ajax calls ans session timeout
            HttpServletResponse response = (HttpServletResponse) actionInvocation.getInvocationContext().get(StrutsStatics.HTTP_RESPONSE);
            response.addHeader("REQUIRES_AUTH","1");
        }

        String result;
        try {
            result = actionInvocation.invoke();
        } finally {
            if (authenticated) {
                MDC.remove(USER_KEY);
            }
        }

        return result;
    }

    @Override
    public void setServletContext(ServletContext servletContext) {
        this.servletContext = servletContext;
    }
}
