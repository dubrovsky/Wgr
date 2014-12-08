package com.bivc.cimsmgs.db;

// Generated 13.11.2012 10:12:54 by Hibernate Tools 3.4.0.CR1

import java.math.BigDecimal;

/**
 * FieldsDocsRefsId generated by hbm2java
 */
public class FieldsDocsRefsId implements java.io.Serializable {

	private Long fieldHid;
	private BigDecimal docHid;

	public FieldsDocsRefsId() {
	}

	public FieldsDocsRefsId(Long fieldHid, BigDecimal docHid) {
		this.fieldHid = fieldHid;
		this.docHid = docHid;
	}

	public Long getFieldHid() {
		return this.fieldHid;
	}

	public void setFieldHid(Long fieldHid) {
		this.fieldHid = fieldHid;
	}

	public BigDecimal getDocHid() {
		return this.docHid;
	}

	public void setDocHid(BigDecimal docHid) {
		this.docHid = docHid;
	}

	public boolean equals(Object other) {
		if ((this == other))
			return true;
		if ((other == null))
			return false;
		if (!(other instanceof FieldsDocsRefsId))
			return false;
		FieldsDocsRefsId castOther = (FieldsDocsRefsId) other;

		return ((this.getFieldHid() == castOther.getFieldHid()) || (this.getFieldHid() != null && castOther.getFieldHid() != null && this
				.getFieldHid().equals(castOther.getFieldHid())))
				&& ((this.getDocHid() == castOther.getDocHid()) || (this.getDocHid() != null && castOther.getDocHid() != null && this.getDocHid()
						.equals(castOther.getDocHid())));
	}

	public int hashCode() {
		int result = 17;

		result = 37 * result + (getFieldHid() == null ? 0 : this.getFieldHid().hashCode());
		result = 37 * result + (getDocHid() == null ? 0 : this.getDocHid().hashCode());
		return result;
	}

}
