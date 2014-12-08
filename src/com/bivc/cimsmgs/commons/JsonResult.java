package com.bivc.cimsmgs.commons;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.Result;
import org.apache.struts2.ServletActionContext;

import javax.servlet.http.HttpServletResponse;

public class JsonResult implements Result {
  
	private static final long serialVersionUID = -4492608374953192744L;

/**
   * Represents a generic interface for all action execution results.
   *
   * @param invocation the invocation context.
   * @throws Exception can be thrown.
   * @todo Implement this com.opensymphony.xwork2.Result method
   */
  public void execute(ActionInvocation invocation) throws Exception {
    HttpServletResponse response = ServletActionContext.getResponse();
    if(!(invocation.getAction() instanceof JSONAware))
      throw new Exception("Action should implement JSONAware interface");

    JSONAware action = (JSONAware)invocation.getAction();
    response.setContentType("text/html");
    response.setCharacterEncoding("UTF-8");
    response.getWriter().print(action.getJSONData());
    response.getWriter().flush();
    response.getWriter().close();

  }
}
