package com.bivc.cimsmgs.commons;

import java.io.Serializable;

public class Filter implements Serializable {
	private String status;
	private String property;
	private String value;
	private String source;

	public Filter() {
	}

	public Filter(String property, String value) {
		this.property = property;
		this.value = value;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

}
