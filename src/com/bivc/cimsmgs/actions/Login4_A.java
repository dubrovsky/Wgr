package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.dao.hibernate.UsrChangePwDAOHib;
import com.bivc.cimsmgs.db.UsrCahgePw;
import com.bivc.cimsmgs.interceptors.AuthenticationInterceptor;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.util.ServletContextAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;
import java.util.GregorianCalendar;

public class Login4_A extends CimSmgsSupport_A {

    final static private Logger log = LoggerFactory.getLogger(Login4_A.class);

    public String execute() {
        log.info("");
        // Confirm message resources loaded
        String message = getText(Constants.ERROR_DATABASE_MISSING);
        if (Constants.ERROR_DATABASE_MISSING.equals(message)) {
            addActionError(Constants.ERROR_MESSAGES_NOT_LOADED);
        }

        if (hasErrors())
            return ERROR;
        else {

            SecurityContext context = SecurityContextHolder.getContext();
            myUser user = (myUser) context.getAuthentication().getPrincipal();
            HttpServletRequest req = ServletActionContext.getRequest();

            log.debug("periodOfCahgePasswordInDays: " + AuthenticationInterceptor.periodOfCahgePasswordInDays +
              ", skip: " + req.getSession().getAttribute("skip") + ", user: " + (user == null ? null : user.getUsername()));
            if (AuthenticationInterceptor.periodOfCahgePasswordInDays > 0 && req.getSession().getAttribute("skip") == null && user != null) {
                UsrChangePwDAOHib pwch = new UsrChangePwDAOHib();
                UsrCahgePw upw = pwch.findByName(user.getUsr().getUn());
                log.debug("Login: " + user.getUsername() + ", datpw: " + upw.getDatpw() + ", RemoteHost: " + req.getRemoteHost());
                GregorianCalendar gc = new GregorianCalendar();
                gc.add(Calendar.DATE, -AuthenticationInterceptor.periodOfCahgePasswordInDays);
                if(upw.getDatpw() == null || gc.getTime().compareTo(upw.getDatpw()) > 0) {
                    return "changepw";
                }
            }
            return SUCCESS;
        }
    }
}

