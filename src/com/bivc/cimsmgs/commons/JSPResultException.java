package com.bivc.cimsmgs.commons;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Result;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletResponse;

public class JSPResultException implements Result {
    private static String ERROR_MSG_DEFAULT = "Unknown application error";

    public void execute(ActionInvocation invocation) throws Exception {
        HttpServletResponse response = ServletActionContext.getResponse();
        ActionContext ac = invocation.getInvocationContext();
        Object obj = ac.getValueStack().peek();

//        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
//        response.setContentType("text/html");
//        response.setCharacterEncoding("UTF-8");

        String errorMsg = ERROR_MSG_DEFAULT;
        if (obj != null && obj instanceof ExceptionHolder) {
            ExceptionHolder eh = (ExceptionHolder) obj;
            errorMsg = StringEscapeUtils.escapeEcmaScript(ExceptionUtils.getRootCauseMessage(eh.getException()));
        }
        response.sendRedirect(String.format("/jsp/Exception.jsp?errorMgs=%s", errorMsg));
//        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, StringEscapeUtils.escapeEcmaScript(ExceptionUtils.getRootCauseMessage(eh.getException())));    // to server default error page

    }
}
