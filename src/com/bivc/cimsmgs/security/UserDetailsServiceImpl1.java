package com.bivc.cimsmgs.security;

import com.bivc.cimsmgs.commons.HibernateUtil;
import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.dao.UsrDAO;
import com.bivc.cimsmgs.dao.hibernate.UsrDAOHib;
import com.bivc.cimsmgs.dao.hibernate.UsrGroupsDirDAOHib;
import com.bivc.cimsmgs.dao.hibernate.UsrPrivilegsDirDAOHib;
import com.bivc.cimsmgs.db.Usr;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class UserDetailsServiceImpl1 implements UserDetailsService {
//    protected final Log logger = LogFactory.getLog(UserDetailsServiceImpl1.getClass());

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (username == null || username.trim().length() == 0)
            throw new UsernameNotFoundException("Не задано имя пользователя");

        String login = username.trim();
        try {
            HibernateUtil.beginTransaction();
            UsrDAO dao1 = new UsrDAOHib();
            Usr usr = dao1.findByName(login);
            if (usr == null)
                throw new UsernameNotFoundException("Пользователь с таким именем не найден.");

//      StringTokenizer st = new StringTokenizer(usr.getFunc(), ",");
//      List<GrantedAuthority> gaList = new ArrayList<GrantedAuthority>();
//      String token_;
//      for(int i = 0; st.hasMoreTokens(); i++) {
//        token_ = st.nextToken();
//        if(token_.toUpperCase().startsWith("CIM_")) {
//          gaList.add(new GrantedAuthorityImpl(token_.toUpperCase()));
//        }
//      }
//      if(gaList.size() == 0)
//        throw new UsernameNotFoundException("У пользователя нет привелегий для работы с приложением.");
//
//      String trans = new StringTokenizer(usr.getTrans(), ",").nextToken();
//      if(trans == null || trans.length() == 0)
//        throw new UsernameNotFoundException("У пользователя нет групп для работы с приложением.");
//
//      HibernateUtil.commitTransaction();
//      return new myUser(usr.getUn(), usr.getPs(), true, true, true, usr.isLocked(), gaList, usr,trans);

            if (usr.getGroup() == null)
                throw new UsernameNotFoundException("Пользователь не принадлежит ни к одной из групп приложения.");

            List<String> privs;
            if (!usr.isSu()) {
                usr.buildTrans();
                privs = usr.buildAuthorities();
            } else {
                usr.buildTrans(new UsrGroupsDirDAOHib().findAll());
                privs = usr.buildAuthorities(new UsrPrivilegsDirDAOHib().findAll());
            }

            List<GrantedAuthority> gaList = new ArrayList<GrantedAuthority>();
            for (String priv : privs) {
                gaList.add(new SimpleGrantedAuthority(priv));
            }
//      if(gaList.isEmpty())
//        throw new UsernameNotFoundException("Permissions are not found.");

            HibernateUtil.commitTransaction();
            return new myUser(usr.getUn(), usr.getPs(), true, true, true, !usr.isLocked(), gaList, usr);
        } catch (UsernameNotFoundException ex) {
            HibernateUtil.commitTransaction();
            throw ex;
        } catch (Exception ex) {
            HibernateUtil.rollbackTransaction();
            throw new UsernameNotFoundException("Internal error -" + ex.toString());
        } finally {
            HibernateUtil.closeSession();
        }
    }
}
