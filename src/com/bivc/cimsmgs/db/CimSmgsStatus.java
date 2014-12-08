package com.bivc.cimsmgs.db;

// Generated 19.05.2009 13:24:11 by Hibernate Tools 3.2.4.GA

import com.bivc.cimsmgs.db.nsi.Company;

import java.util.Date;

/**
 * CimSmgsStatus generated by hbm2java
 */
public class CimSmgsStatus implements java.io.Serializable {

	private Long hid;
  private CimSmgs cimSmgs;
  private Date dattr;
	private String loginName;
	private Date arch;
	private Byte status;
	private Date statusDate;
	private String statusText;
  private Company company;

	public CimSmgsStatus() {
	}

  public CimSmgsStatus(Byte status) {
    this.status = status;
	}

	public CimSmgsStatus(Long hid, CimSmgs cimSmgs, Company company, Date dattr,
			Byte status, String loginName) {
		this.hid = hid;
		this.cimSmgs = cimSmgs;
    this.company = company;
		this.dattr = dattr;
		this.status = status;
    this.loginName = loginName;
	}

	public CimSmgsStatus(Long hid, Company company, CimSmgs cimSmgs,
			Date dattr, String loginName, Date arch, Byte status,
			Date statusDate, String statusText) {
		this.hid = hid;
		this.company = company;
		this.cimSmgs = cimSmgs;
		this.dattr = dattr;
		this.loginName = loginName;
		this.arch = arch;
		this.status = status;
		this.statusDate = statusDate;
		this.statusText = statusText;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

  public CimSmgs getCimSmgs() {
		return this.cimSmgs;
	}

	public void setCimSmgs(CimSmgs cimSmgs) {
		this.cimSmgs = cimSmgs;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public String getLoginName() {
		return this.loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public Date getArch() {
		return this.arch;
	}

	public void setArch(Date arch) {
		this.arch = arch;
	}

	public Byte getStatus() {
		return this.status;
	}

	public void setStatus(Byte status) {
		this.status = status;
	}

	public Date getStatusDate() {
		return this.statusDate;
	}

	public void setStatusDate(Date statusDate) {
		this.statusDate = statusDate;
	}

	public String getStatusText() {
		return this.statusText;
	}

  public Company getCompany()
  {
    return company;
  }

  public void setStatusText(String statusText) {
		this.statusText = statusText;
	}

  public void setCompany(Company company)
  {
    this.company = company;
  }

}
