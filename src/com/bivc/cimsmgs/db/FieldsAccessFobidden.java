package com.bivc.cimsmgs.db;

// Generated 13.11.2012 10:12:54 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"id", "docDir", "usrGroupsDir"})
public class FieldsAccessFobidden implements java.io.Serializable {

	private FieldsAccessFobiddenId id;
	private FieldsDir fieldsDir;
	private DocDir docDir;
	private UsrGroupsDir usrGroupsDir;

	public FieldsAccessFobidden() {
	}

	public FieldsAccessFobidden(FieldsAccessFobiddenId id, FieldsDir fieldsDir, DocDir docDir, UsrGroupsDir usrGroupsDir) {
		this.id = id;
		this.fieldsDir = fieldsDir;
		this.docDir = docDir;
		this.usrGroupsDir = usrGroupsDir;
	}

	public FieldsAccessFobiddenId getId() {
		return this.id;
	}

	public void setId(FieldsAccessFobiddenId id) {
		this.id = id;
	}

	public FieldsDir getFieldsDir() {
		return this.fieldsDir;
	}

	public void setFieldsDir(FieldsDir fieldsDir) {
		this.fieldsDir = fieldsDir;
	}

	public DocDir getDocDir() {
		return this.docDir;
	}

	public void setDocDir(DocDir docDir) {
		this.docDir = docDir;
	}

	public UsrGroupsDir getUsrGroupsDir() {
		return this.usrGroupsDir;
	}

	public void setUsrGroupsDir(UsrGroupsDir usrGroupsDir) {
		this.usrGroupsDir = usrGroupsDir;
	}

}
