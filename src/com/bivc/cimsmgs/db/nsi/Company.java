package com.bivc.cimsmgs.db.nsi;


import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.db.CimSmgsStatus;
import com.bivc.cimsmgs.db.CimSmgsStatusAllowed;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

public class Company implements java.io.Serializable  {

	private BigDecimal id;
	private Country country;
	private String vatcode;
	private String regcode;
	private String name;
        private String loginsAllowed;
	private String nameLatin1;
	private String isActive;
	private String digSignature;
	private String functionalPermissions;
	private String systemRoles;
	private Set<Measure> measures = new HashSet<Measure>(0);
	private Set<Workstation> workstations = new HashSet<Workstation>(0);
	private Set<Address> addresses = new HashSet<Address>(0);
	private Set<Users> userses = new HashSet<Users>(0);
	private Set<Clientscompany> clientscompanies = new HashSet<Clientscompany>(0);
	private Set<Bankaccount> bankaccounts = new HashSet<Bankaccount>(0);
	private Set<Companycontact> companycontacts = new HashSet<Companycontact>(0);
        private Set<CimSmgsStatus> cimSmgsStatuses = new HashSet<CimSmgsStatus>(0);
        private Set<CimSmgsStatusAllowed> cimSmgsStatusAlloweds = new HashSet<CimSmgsStatusAllowed>(0);

	public Company() {
	}

	public Company(BigDecimal id, Country country, String regcode, String name,
			String loginsAllowed, String nameLatin1, String isActive) {
		this.id = id;
		this.country = country;
		this.regcode = regcode;
		this.name = name;
		this.loginsAllowed = loginsAllowed;
		this.nameLatin1 = nameLatin1;
		this.isActive = isActive;
	}

	public Company(BigDecimal id, Country country, String vatcode,
			String regcode, String name, String loginsAllowed,
			String nameLatin1, String isActive, String digSignature,
			String functionalPermissions, String systemRoles,
			Set<Measure> measures, Set<Workstation> workstations,
			Set<Address> addresses, Set<Users> userses,
			Set<Clientscompany> clientscompanies,
			Set<Bankaccount> bankaccounts, Set<Companycontact> companycontacts,Set<CimSmgsStatus> cimSmgsStatuses,
      Set<CimSmgsStatusAllowed> cimSmgsStatusAlloweds) {
		this.id = id;
		this.country = country;
		this.vatcode = vatcode;
		this.regcode = regcode;
		this.name = name;
		this.loginsAllowed = loginsAllowed;
		this.nameLatin1 = nameLatin1;
		this.isActive = isActive;
		this.digSignature = digSignature;
		this.functionalPermissions = functionalPermissions;
		this.systemRoles = systemRoles;
		this.measures = measures;
		this.workstations = workstations;
		this.addresses = addresses;
		this.userses = userses;
		this.clientscompanies = clientscompanies;
		this.bankaccounts = bankaccounts;
		this.companycontacts = companycontacts;
                this.cimSmgsStatuses = cimSmgsStatuses;
                this.cimSmgsStatusAlloweds = cimSmgsStatusAlloweds;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public Country getCountry() {
		return this.country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getVatcode() {
		return this.vatcode;
	}

	public void setVatcode(String vatcode) {
		this.vatcode = vatcode;
	}

	public String getRegcode() {
		return this.regcode;
	}

	public void setRegcode(String regcode) {
		this.regcode = regcode;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLoginsAllowed() {
		return this.loginsAllowed;
	}

	public void setLoginsAllowed(String loginsAllowed) {
		this.loginsAllowed = loginsAllowed;
	}

	public String getNameLatin1() {
		return this.nameLatin1;
	}

	public void setNameLatin1(String nameLatin1) {
		this.nameLatin1 = nameLatin1;
	}

	public String getIsActive() {
		return this.isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public String getDigSignature() {
		return this.digSignature;
	}

	public void setDigSignature(String digSignature) {
		this.digSignature = digSignature;
	}

	public String getFunctionalPermissions() {
		return this.functionalPermissions;
	}

	public void setFunctionalPermissions(String functionalPermissions) {
		this.functionalPermissions = functionalPermissions;
	}

	public String getSystemRoles() {
		return this.systemRoles;
	}

	public void setSystemRoles(String systemRoles) {
		this.systemRoles = systemRoles;
	}

	public Set<Measure> getMeasures() {
		return this.measures;
	}

	public void setMeasures(Set<Measure> measures) {
		this.measures = measures;
	}

	public Set<Workstation> getWorkstations() {
		return this.workstations;
	}

	public void setWorkstations(Set<Workstation> workstations) {
		this.workstations = workstations;
	}

	public Set<Address> getAddresses() {
		return this.addresses;
	}

	public void setAddresses(Set<Address> addresses) {
		this.addresses = addresses;
	}

	public Set<Users> getUserses() {
		return this.userses;
	}

	public void setUserses(Set<Users> userses) {
		this.userses = userses;
	}

	public Set<Clientscompany> getClientscompanies() {
		return this.clientscompanies;
	}

	public void setClientscompanies(Set<Clientscompany> clientscompanies) {
		this.clientscompanies = clientscompanies;
	}

	public Set<Bankaccount> getBankaccounts() {
		return this.bankaccounts;
	}

	public void setBankaccounts(Set<Bankaccount> bankaccounts) {
		this.bankaccounts = bankaccounts;
	}

	public Set<Companycontact> getCompanycontacts() {
		return this.companycontacts;
	}

  public Set<CimSmgsStatus> getCimSmgsStatuses()
  {
    return cimSmgsStatuses;
  }

  public Set<CimSmgsStatusAllowed> getCimSmgsStatusAlloweds()
  {
    return cimSmgsStatusAlloweds;
  }

  public void setCompanycontacts(Set<Companycontact> companycontacts) {
		this.companycontacts = companycontacts;
	}

  public void setCimSmgsStatuses(Set<CimSmgsStatus> cimSmgsStatuses)
  {
    this.cimSmgsStatuses = cimSmgsStatuses;
  }

  public void setCimSmgsStatusAlloweds(Set<CimSmgsStatusAllowed> cimSmgsStatusAlloweds)
  {
    this.cimSmgsStatusAlloweds = cimSmgsStatusAlloweds;
  }

  public String getNameDisp(){
    return Constants.MLString(name);
  }

}
