package com.bivc.cimsmgs.db;

// Generated 12.11.2010 16:44:31 by Hibernate Tools 3.4.0.Beta1

/**
 * UsrGroups generated by hbm2java
 */
public class UsrGroups implements java.io.Serializable {

	private UsrGroupsId id;
	private Usr usr;
	private UsrGroupsDir group;

	public UsrGroups() {
	}

	public UsrGroups(UsrGroupsId id, Usr usr, UsrGroupsDir usrGroupsDir) {
		this.id = id;
		this.usr = usr;
		this.group = usrGroupsDir;
	}

	public UsrGroupsId getId() {
		return this.id;
	}

	public void setId(UsrGroupsId id) {
		this.id = id;
	}

	public Usr getUsr() {
		return this.usr;
	}

	public void setUsr(Usr usr) {
		this.usr = usr;
	}

	public UsrGroupsDir getGroup() {
		return this.group;
	}

	public void setGroup(UsrGroupsDir usrGroupsDir) {
		this.group = usrGroupsDir;
	}

}
