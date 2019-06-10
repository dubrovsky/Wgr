package com.bivc.cimsmgs.actions;

import com.opensymphony.xwork2.ActionContext;
import com.opensymphony.xwork2.interceptor.I18nInterceptor;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.dispatcher.SessionMap;
import org.apache.struts2.interceptor.SessionAware;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Locale;
import java.util.Map;

/**
 * Created with IntelliJ IDEA.
 * User: peter
 * Date: 09.05.12
 * Time: 11:57
 * To change this template use File | Settings | File Templates.
 */
public class Locale_A extends CimSmgsSupport_A implements SessionAware {
  private SessionMap<String, String> sessionmap;

  public String execute() {
    if(ServletActionContext.getRequest().getParameter("logout") != null) {
      Locale locale = ActionContext.getContext().getLocale();
      HttpSession session = ServletActionContext.getRequest().getSession();
      Locale locale_i = (Locale) session.getAttribute(I18nInterceptor.DEFAULT_SESSION_ATTRIBUTE);
      sessionmap.invalidate();

      ActionContext.getContext().setLocale(locale);
      session = ServletActionContext.getRequest().getSession();
      session.setAttribute(I18nInterceptor.DEFAULT_SESSION_ATTRIBUTE, locale_i);
    }
    return "SUCCESS";
  }

  @Override
  public void setSession(Map<String, Object> map) {
    sessionmap = (SessionMap) map;
  }
}
