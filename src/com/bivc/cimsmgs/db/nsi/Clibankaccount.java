package com.bivc.cimsmgs.db.nsi;

// Generated 22.04.2009 13:49:34 by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;

/**
 * Clibankaccount generated by hbm2java
 */
public class Clibankaccount implements java.io.Serializable {

	private BigDecimal id;
	private Clientscompany clientscompany;
	private Country country;
	private String bankCode;
	private String bankName;
	private String bankNameLatin1;
	private String accountNr;
	private String corBankName;
	private String corBankCode;
	private String bankCodeOkpo;
	private String bankCodeInn;
	private String bankCodeBik;

	public Clibankaccount() {
	}

	public Clibankaccount(BigDecimal id, Clientscompany clientscompany,
			Country country, String bankCode, String bankName,
			String bankNameLatin1, String accountNr) {
		this.id = id;
		this.clientscompany = clientscompany;
		this.country = country;
		this.bankCode = bankCode;
		this.bankName = bankName;
		this.bankNameLatin1 = bankNameLatin1;
		this.accountNr = accountNr;
	}

	public Clibankaccount(BigDecimal id, Clientscompany clientscompany,
			Country country, String bankCode, String bankName,
			String bankNameLatin1, String accountNr, String corBankName,
			String corBankCode, String bankCodeOkpo, String bankCodeInn,
			String bankCodeBik) {
		this.id = id;
		this.clientscompany = clientscompany;
		this.country = country;
		this.bankCode = bankCode;
		this.bankName = bankName;
		this.bankNameLatin1 = bankNameLatin1;
		this.accountNr = accountNr;
		this.corBankName = corBankName;
		this.corBankCode = corBankCode;
		this.bankCodeOkpo = bankCodeOkpo;
		this.bankCodeInn = bankCodeInn;
		this.bankCodeBik = bankCodeBik;
	}

	public BigDecimal getId() {
		return this.id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

	public Clientscompany getClientscompany() {
		return this.clientscompany;
	}

	public void setClientscompany(Clientscompany clientscompany) {
		this.clientscompany = clientscompany;
	}

	public Country getCountry() {
		return this.country;
	}

	public void setCountry(Country country) {
		this.country = country;
	}

	public String getBankCode() {
		return this.bankCode;
	}

	public void setBankCode(String bankCode) {
		this.bankCode = bankCode;
	}

	public String getBankName() {
		return this.bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getBankNameLatin1() {
		return this.bankNameLatin1;
	}

	public void setBankNameLatin1(String bankNameLatin1) {
		this.bankNameLatin1 = bankNameLatin1;
	}

	public String getAccountNr() {
		return this.accountNr;
	}

	public void setAccountNr(String accountNr) {
		this.accountNr = accountNr;
	}

	public String getCorBankName() {
		return this.corBankName;
	}

	public void setCorBankName(String corBankName) {
		this.corBankName = corBankName;
	}

	public String getCorBankCode() {
		return this.corBankCode;
	}

	public void setCorBankCode(String corBankCode) {
		this.corBankCode = corBankCode;
	}

	public String getBankCodeOkpo() {
		return this.bankCodeOkpo;
	}

	public void setBankCodeOkpo(String bankCodeOkpo) {
		this.bankCodeOkpo = bankCodeOkpo;
	}

	public String getBankCodeInn() {
		return this.bankCodeInn;
	}

	public void setBankCodeInn(String bankCodeInn) {
		this.bankCodeInn = bankCodeInn;
	}

	public String getBankCodeBik() {
		return this.bankCodeBik;
	}

	public void setBankCodeBik(String bankCodeBik) {
		this.bankCodeBik = bankCodeBik;
	}

}
