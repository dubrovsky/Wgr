package com.bivc.cimsmgs.db;

// Generated 12.11.2010 16:44:31 by Hibernate Tools 3.4.0.Beta1

import java.io.Serializable;
import java.util.*;

public class UsrCahgePw implements Serializable {

	private String un;
	private String ps;
	private Date datpw;
	private Set<UsrPwLog> usr_pw_log = new HashSet<UsrPwLog>(0);


	public UsrCahgePw() {
	}


	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}


	public String getPs() {
		return this.ps;
	}

	public void setPs(String ps) {
		this.ps = ps;
	}


	public Date getDatpw() {
		return this.datpw;
	}

	public void setDatpw(Date datpw) {
		this.datpw = datpw;
	}

	public Set<UsrPwLog> getUsr_pw_log() {
		return this.usr_pw_log;
	}

	public void setUsr_pw_log(Set<UsrPwLog> usr_pw_log) {
//		System.out.println(	"setUsr_pw_log: " +	usr_pw_log.iterator().next().getPs() );
		this.usr_pw_log = usr_pw_log;
	}

}
