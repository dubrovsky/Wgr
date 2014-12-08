package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.actions.Login_A;
import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Result;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.struts2.ServletActionContext;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;

import javax.servlet.http.HttpServletResponse;

public class JsonResultException implements Result {

    public void execute(ActionInvocation invocation) throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();
        Object action = invocation.getAction();
        ActionContext ac = invocation.getInvocationContext();
        Object obj = ac.getValueStack().peek();

        if (action instanceof Login_A) { // SpringSecurityException
            if (obj != null && obj instanceof ExceptionHolder) {
                try {
                    Throwable ex = ((ExceptionHolder) obj).getException().getCause();
                    if (ex instanceof AuthenticationException || ex instanceof AccessDeniedException)
                        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                } catch (Exception ignore) {
                    response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
                }

            } else
                response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
            return;
        }

        response.setStatus(HttpServletResponse.SC_PRECONDITION_FAILED);
        response.setContentType("text/html");
        response.setCharacterEncoding("UTF-8");

        if (obj != null && obj instanceof ExceptionHolder) {
            ExceptionHolder eh = (ExceptionHolder) obj;
            response.getWriter().print("{success:false, exception:'" + StringEscapeUtils.escapeEcmaScript(ExceptionUtils.getRootCauseMessage(eh.getException()))  +"'}");
        } else {
            response.getWriter().print("{success: false, exception: 'Unknown application error'}");
        }
        response.getWriter().flush();
        response.getWriter().close();

    }
}
