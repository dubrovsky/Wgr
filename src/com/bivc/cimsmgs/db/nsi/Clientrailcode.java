package com.bivc.cimsmgs.db.nsi;

// Generated 22.04.2009 13:49:34 by Hibernate Tools 3.2.4.GA

import java.math.BigDecimal;

/**
 * Clientrailcode generated by hbm2java
 */
public class Clientrailcode implements java.io.Serializable {

	private BigDecimal id;
	private Clientscompany clientscompany;
	private Railroadland railroadland;
	private String code;

	public Clientrailcode() {
	}

	public Clientrailcode(BigDecimal id, Clientscompany clientscompany,
			Railroadland railroadland, String code) {
		this.id = id;
		this.clientscompany = clientscompany;
		this.railroadland = railroadland;
		this.code = code;
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

	public Railroadland getRailroadland() {
		return this.railroadland;
	}

	public void setRailroadland(Railroadland railroadland) {
		this.railroadland = railroadland;
	}

	public String getCode() {
		return this.code;
	}

	public void setCode(String code) {
		this.code = code;
	}

}
