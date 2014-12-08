package com.bivc.cimsmgs.commons;

import com.bivc.cimsmgs.db.Usr;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class myUser extends User {

    private static final long serialVersionUID = -8708025922531187111L;
    private Usr usr;

    public myUser(String username, String password, boolean enabled,
                  boolean accountNonExpired, boolean credentialsNonExpired,
                  boolean accountNonLocked, List<GrantedAuthority> authorities, Usr usr) {
        super(username, password, enabled, accountNonExpired,
                credentialsNonExpired, accountNonLocked, authorities);

        this.usr = usr;
    }

    public void setUsr(Usr usr) {
        this.usr = usr;
    }

    public Usr getUsr() {
        return usr;
    }

    public boolean hasPrivileg(String priv){
        for(GrantedAuthority authority: getAuthorities()){
            if(authority.getAuthority().equals(priv)){
                return true;
            }
        }
        return false;
    }

}
