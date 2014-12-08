package com.bivc.cimsmgs.db;

// Generated 12.11.2010 16:44:31 by Hibernate Tools 3.4.0.Beta1

import com.fasterxml.jackson.annotation.*;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * UsrGroupsDir generated by hbm2java
 */
@JsonIgnoreProperties({"groups","usrs","packDocs","routeGroupses","projectGroupses","locked","un","dattr","printTemplateses","fieldsAccessFobiddens","docsFobiddenUsrGroupses"})
public class UsrGroupsDir implements Serializable {

	private String name;
	private String deptrans;
	private boolean locked;
	private Date dattr;
	private String un;
	private String descr;
	private Set<UsrGroups> groups = new HashSet<UsrGroups>(0);
	private Set<Usr> usrs = new HashSet<Usr>(0);
    private Set<RouteGroups> routeGroupses = new HashSet<RouteGroups>(0);
    private Set<ProjectGroups> projectGroupses = new HashSet<ProjectGroups>(0);
    private Set<PackDoc> packDocs = new HashSet<PackDoc>(0);
    private Long project_hid;
    private Long route_hid;
    private Set<PrintTemplates> printTemplateses = new HashSet<PrintTemplates>();
    private Set<FieldsAccessFobidden> fieldsAccessFobiddens = new HashSet<FieldsAccessFobidden>();
    private Set<DocsFobiddenUsrGroups> docsFobiddenUsrGroupses = new HashSet<DocsFobiddenUsrGroups>();

    public Set<DocsFobiddenUsrGroups> getDocsFobiddenUsrGroupses() {
        return docsFobiddenUsrGroupses;
    }

    public void setDocsFobiddenUsrGroupses(Set<DocsFobiddenUsrGroups> docsFobiddenUsrGroupses) {
        this.docsFobiddenUsrGroupses = docsFobiddenUsrGroupses;
    }

    public Set<FieldsAccessFobidden> getFieldsAccessFobiddens() {
        return fieldsAccessFobiddens;
    }

    public void setFieldsAccessFobiddens(Set<FieldsAccessFobidden> fieldsAccessFobiddens) {
        this.fieldsAccessFobiddens = fieldsAccessFobiddens;
    }

    public Set<PrintTemplates> getPrintTemplateses() {
        return printTemplateses;
    }

    public void setPrintTemplateses(Set<PrintTemplates> printTemplateses) {
        this.printTemplateses = printTemplateses;
    }

    public Long getRoute_hid() {
        return route_hid;
    }

    public void setRoute_hid(Long route_hid) {
        this.route_hid = route_hid;
    }

    public Long getProject_hid() {
        return project_hid;
    }

    public void setProject_hid(Long project_hid) {
        this.project_hid = project_hid;
    }

    public Set<PackDoc> getPackDocs() {
        return packDocs;
    }

    public void setPackDocs(Set<PackDoc> packDocs) {
        this.packDocs = packDocs;
    }

    public Set<ProjectGroups> getProjectGroupses() {
        return projectGroupses;
    }

    public void setProjectGroupses(Set<ProjectGroups> projectGroupses) {
        this.projectGroupses = projectGroupses;
    }

    public Set<RouteGroups> getRouteGroupses() {
        return routeGroupses;
    }

    public void setRouteGroupses(Set<RouteGroups> routeGroupses) {
        this.routeGroupses = routeGroupses;
    }

    public UsrGroupsDir() {
	}
	
	public UsrGroupsDir(String name) {
		this.name = name;
	}

	public UsrGroupsDir(String name, boolean locked, Date dattr, String un) {
		this.name = name;
		this.locked = locked;
		this.dattr = dattr;
		this.un = un;
	}

	public UsrGroupsDir(String name, String deptrans, boolean locked, Date dattr, String un, String descr, Set<UsrGroups> usrGroupses, Set<Usr> usrs) {
		this.name = name;
		this.deptrans = deptrans;
		this.locked = locked;
		this.dattr = dattr;
		this.un = un;
		this.descr = descr;
		this.groups = usrGroupses;
		this.usrs = usrs;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDeptrans() {
		return this.deptrans;
	}

	public void setDeptrans(String deptrans) {
		this.deptrans = deptrans;
	}

	public boolean isLocked() {
		return this.locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public String getDescr() {
		return this.descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public Set<UsrGroups> getGroups() {
		return this.groups;
	}

	public void setGroups(Set<UsrGroups> usrGroupses) {
		this.groups = usrGroupses;
	}

	public Set<Usr> getUsrs() {
		return this.usrs;
	}

	public void setUsrs(Set<Usr> usrs) {
		this.usrs = usrs;
	}
	
	public void saving(Usr user) {
	    setDattr(new Date());
	    setUn(user.getUn());
	}
}
