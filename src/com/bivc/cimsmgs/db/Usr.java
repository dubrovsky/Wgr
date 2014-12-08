package com.bivc.cimsmgs.db;

// Generated 12.11.2010 16:44:31 by Hibernate Tools 3.4.0.Beta1

import com.fasterxml.jackson.annotation.*;

import java.io.Serializable;
import java.util.*;

@JsonIgnoreProperties({"statuses","routeUnPrintTemplateses","fieldsCommentses","doc2docTemplsRouteUnRefses"})
public class Usr implements Serializable {

	private String un;
	private UsrGroupsDir group;
	private String namKlient;
	private String email;
	private boolean strans;
	private String ps;
	private boolean locked;
	private boolean su;
	private Date dattr;
	private String un1;
	private Set<UsrGroups> groups = new HashSet<UsrGroups>(0);
	private Set<UsrPrivilegs> privilegs = new HashSet<UsrPrivilegs>(0);
	private ArrayList<String> trans;
	private String groupsIds;
	private String privilegsIds;
    private Set<Status> statuses = new HashSet<Status>(0);
    private Set<RouteUnPrintTemplates> routeUnPrintTemplateses = new HashSet<RouteUnPrintTemplates>(0);
//    private Set<Doc2docTemplsUnRefs> doc2docTemplsUnRefses = new HashSet<Doc2docTemplsUnRefs>();
    private Set<FieldsComments> fieldsCommentses = new HashSet<FieldsComments>();
    private Set<Doc2docTemplsRouteUnRefs> doc2docTemplsRouteUnRefses = new HashSet<Doc2docTemplsRouteUnRefs>();

    public Set<Doc2docTemplsRouteUnRefs> getDoc2docTemplsRouteUnRefses() {
        return doc2docTemplsRouteUnRefses;
    }

    public void setDoc2docTemplsRouteUnRefses(Set<Doc2docTemplsRouteUnRefs> doc2docTemplsRouteUnRefses) {
        this.doc2docTemplsRouteUnRefses = doc2docTemplsRouteUnRefses;
    }

    public Set<FieldsComments> getFieldsCommentses() {
        return fieldsCommentses;
    }

    public void setFieldsCommentses(Set<FieldsComments> fieldsCommentses) {
        this.fieldsCommentses = fieldsCommentses;
    }

   /* public Set<Doc2docTemplsUnRefs> getDoc2docTemplsUnRefses() {
        return doc2docTemplsUnRefses;
    }

    public void setDoc2docTemplsUnRefses(Set<Doc2docTemplsUnRefs> doc2docTemplsUnRefses) {
        this.doc2docTemplsUnRefses = doc2docTemplsUnRefses;
    }*/

    public Set<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Set<Status> statuses) {
        this.statuses = statuses;
    }

    public Usr() {
	}
	
	public Usr(String ps) {
		this.ps = ps;
	}

	public Usr(String un, UsrGroupsDir usrGroupsDir, boolean strans, String ps, boolean locked, boolean su, Date dattr, String un1) {
		this.un = un;
		this.group = usrGroupsDir;
		this.strans = strans;
		this.ps = ps;
		this.locked = locked;
		this.su = su;
		this.dattr = dattr;
		this.un1 = un1;
	}

	public Usr(String un, UsrGroupsDir usrGroupsDir, String namKlient, String email, boolean strans, String ps, boolean locked, boolean su,
			Date dattr, String un1, Set<UsrGroups> usrGroupses, Set<UsrPrivilegs> usrPrivilegses) {
		this.un = un;
		this.group = usrGroupsDir;
		this.namKlient = namKlient;
		this.email = email;
		this.strans = strans;
		this.ps = ps;
		this.locked = locked;
		this.su = su;
		this.dattr = dattr;
		this.un1 = un1;
		this.groups = usrGroupses;
		this.privilegs = usrPrivilegses;
	}

	public String getUn() {
		return this.un;
	}

	public void setUn(String un) {
		this.un = un;
	}

	public UsrGroupsDir getGroup() {
		return this.group;
	}

	public void setGroup(UsrGroupsDir usrGroupsDir) {
		this.group = usrGroupsDir;
	}

	public String getNamKlient() {
		return this.namKlient;
	}

	public void setNamKlient(String namKlient) {
		this.namKlient = namKlient;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isStrans() {
		return this.strans;
	}

	public void setStrans(boolean strans) {
		this.strans = strans;
	}

	public String getPs() {
		return this.ps;
	}

	public void setPs(String ps) {
		this.ps = ps;
	}

	public boolean isLocked() {
		return this.locked;
	}

	public void setLocked(boolean locked) {
		this.locked = locked;
	}

	public boolean isSu() {
		return this.su;
	}

	public void setSu(boolean su) {
		this.su = su;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public String getUn1() {
		return this.un1;
	}

	public void setUn1(String un1) {
		this.un1 = un1;
	}

	public Set<UsrGroups> getGroups() {
		return this.groups;
	}

	public void setGroups(Set<UsrGroups> usrGroupses) {
		this.groups = usrGroupses;
	}

	public Set<UsrPrivilegs> getPrivilegs() {
		return this.privilegs;
	}

	public void setPrivilegs(Set<UsrPrivilegs> usrPrivilegses) {
		this.privilegs = usrPrivilegses;
	}
	
	public void saving(Usr user) {
	    setDattr(new Date());
	    setUn1(user.getUn());
	    buildGroups();
	    buildPrivilegs();
	}
	
	private void buildGroups(){
		if(getGroupsIds() != null){
			StringTokenizer st = new StringTokenizer(getGroupsIds());
			UsrGroupsDir group; 
			UsrGroups groups;
			while (st.hasMoreTokens()) {
				group = new UsrGroupsDir(st.nextToken());
				groups = new UsrGroups(new UsrGroupsId(getUn(), group.getName()), this, group);
				getGroups().add(groups);
			}
		}
	}
	
	private void buildPrivilegs(){
		if(getPrivilegsIds() != null){
			StringTokenizer st = new StringTokenizer(getPrivilegsIds());
			UsrPrivilegsDir priv; 
			UsrPrivilegs privs;
			while (st.hasMoreTokens()) {
				priv = new UsrPrivilegsDir(st.nextToken());
				privs = new UsrPrivilegs(new UsrPrivilegsId(getUn(), priv.getName()), priv, this);
				getPrivilegs().add(privs);
			}
		}
	}
	
	public void buildTrans(List<UsrGroupsDir> groups){
		trans = new ArrayList<String>();
		for (UsrGroupsDir group : groups) {
			trans.add(group.getName());
		}
	}
	
	public void buildTrans() {
		trans = new ArrayList<String>();
		trans.add(getGroup().getName());
		for (UsrGroups groups : getGroups()) {
			trans.add(groups.getGroup().getName());
		}
	}
	
	public List<String> buildAuthorities() {
		List<String> result = new ArrayList<String>();
		for (UsrPrivilegs priv : getPrivilegs()) {
			result.add(priv.getPrivileg().getName().toUpperCase());
		}
		return result;
	}
	
	public List<String> buildAuthorities(List<UsrPrivilegsDir> privs) {
		List<String> result = new ArrayList<String>();
		for (UsrPrivilegsDir priv : privs) {
			result.add(priv.getName().toUpperCase());
		}
		return result;
	}
	
	public List<String> getTrans(){
//		if(trans == null){
//	      trans = new ArrayList<String>();		
//		  trans.add(getGroup().getName());
//		  for (UsrGroups groups : getGroups()) {
//			  trans.add(groups.getGroup().getName());
//		  }
//		}
		return trans;
	}

	public void setGroupsIds(String groupsIds) {
		this.groupsIds = groupsIds;
	}

	public String getGroupsIds() {
		return groupsIds;
	}

	public void setPrivilegsIds(String privilegsIds) {
		this.privilegsIds = privilegsIds;
	}

	public String getPrivilegsIds() {
		return privilegsIds;
	}
	
//	public String buildGroupsJsonObj() {
//		StringBuffer sb = new StringBuffer();
//		sb.append("'groups': [");
//		String prefix = "";
//		for (UsrGroups groups : getGroups()) {
//			sb.append(prefix);
//			prefix = ",";
//			sb.append("{");
//			sb.append("'hid':");
//			sb.append(groups.getHid());
//			sb.append(",");
//			sb.append("'group.hid':");
//			sb.append(groups.getGroup().getHid());
//			sb.append(",");
//			sb.append("'usr.hid':");
//			sb.append(this.getHid());
//			sb.append("}");
//		}
//		sb.append("]");
//		return sb.toString();
//	}

	public String buildGroupsIds() {
		StringBuffer sb = new StringBuffer();
		String prefix = "";
		for (UsrGroups groups : getGroups()) {
			sb.append(prefix);
			prefix = ",";
			sb.append(groups.getGroup().getName());
		}
		return sb.toString();
	}
	
	public String buildPrivilegsIds() {
		StringBuffer sb = new StringBuffer();
		String prefix = "";
		for (UsrPrivilegs privileg : getPrivilegs()) {
			sb.append(prefix);
			prefix = ",";
			sb.append(privileg.getPrivileg().getName());
		}
		return sb.toString();
	}

    /*@Override
    public String toString() {
        return
                "Логин='" + un + '\'' +
                ", group=" + group +
                ", namKlient='" + namKlient + '\'' +
                ", email='" + email + '\'' +
                ", groups=" + groups +
                ", privilegs=" + privilegs +
                ", trans=" + trans;
    }*/

    //
//	public String getPrivilegsDisp(String prop) {
//		PropertyUtilsBean pub = new PropertyUtilsBean();
//		StringBuffer sb = new StringBuffer();
//		String prefix = "";
//		for (UsrPrivilegs privileg : getPrivilegs()) {
//			sb.append(prefix);
//			prefix = ",";
//			try {
//				sb.append(pub.getProperty(privileg.getPrivileg(), prop));
//			} catch (Exception ignore) {} 
//		}
//		return sb.toString();
//	}

    public Set<RouteUnPrintTemplates> getRouteUnPrintTemplateses() {
        return routeUnPrintTemplateses;
    }

    public void setRouteUnPrintTemplateses(Set<RouteUnPrintTemplates> routeUnPrintTemplateses) {
        this.routeUnPrintTemplateses = routeUnPrintTemplateses;
    }
}
