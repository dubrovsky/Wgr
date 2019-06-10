package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.dao.hibernate.UsrChangePwDAOHib;
import com.bivc.cimsmgs.db.UsrCahgePw;
import com.bivc.cimsmgs.db.UsrPwLog;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.interceptor.ServletRequestAware;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;

public class CangePw_A extends CimSmgsSupport_A implements ServletRequestAware {

  final static private Logger log = LoggerFactory.getLogger(CangePw_A.class);
  private HttpServletRequest req;

  private String pw0 = null;
  private String pw1 = null;
  private String pw2 = null;

  public String getPw0() {
    return pw0;
  }

  public void setPw0(String pw0) {
    this.pw0 = pw0;
  }

  public String getPw1() {
    return pw1;
  }

  public void setPw1(String pw1) {
    this.pw1 = pw1;
  }

  public String getPw2() {
    return pw2;
  }

  public void setPw2(String pw2) {
    this.pw2 = pw2;
  }

  public String execute() {
    try {
      SecurityContext context = SecurityContextHolder.getContext();
      myUser user = (myUser) context.getAuthentication().getPrincipal();

      if(req.getParameter("skip") != null) {
        req.getSession().setAttribute("skip", "1");
        return "skip";
      }
      else if (req.getParameter("save") != null && user != null) {
        try {
          String un = user.getUsr().getUn();

          UsrChangePwDAOHib pwch = new UsrChangePwDAOHib();
          UsrCahgePw usrchpw = pwch.findByName(un);

          log.info("Login: " + user.getUsername() + ", datpw: " + usrchpw.getDatpw() + ", RemoteHost: " + req.getRemoteHost());

          if(pw0 == null || !pw0.equals(usrchpw.getPs())) {
            addActionError(getText("verify.pw_incorrect"));
          }

          if(pw1 == null || pw1.length() == 0) {
            addActionError(getText("verify.notempty", new String[] {getText("password")}));
          }
          else if (pw2 == null || pw2.length() == 0 || !pw1.equals(pw2)) {
            addActionError(getText("verify.pw_confirm"));
          }
          else {
            Iterator<UsrPwLog> it = usrchpw.getUsr_pw_log().iterator();
            int i = 0;
            while (it.hasNext()) {
              UsrPwLog u = it.next();
              if(i < 6) {
                if(pw1.equals(u.getPs())) {
                  addActionError(getText("verify.pw_used"));
                }
              }
              i++;
            }
          }

          // Ошибки смены пароля
          if (hasErrors()) return SUCCESS;

          // Сохраняем новый пароль
          pwch.change(usrchpw, pw1);

          ServletActionContext.getRequest().setAttribute("password_is_change", "1");
        }
        catch (Exception ex) {
          addActionError(ex.getMessage());
          log.error(ex.getMessage(), ex);
        }
      }
    } catch (Exception ex) {
      addActionError(ex.getMessage());
      log.error(ex.getMessage(), ex);
    }

    return SUCCESS;
  }

  public void save() {

  }

  @Override
  public void setServletRequest(HttpServletRequest httpServletRequest) {
    req = httpServletRequest;
  }
}

