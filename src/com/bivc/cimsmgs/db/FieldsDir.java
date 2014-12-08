package com.bivc.cimsmgs.db;

// Generated 13.11.2012 10:12:54 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties({"hid", "descr", "fieldsAccessFobiddens", "fieldsDocsRefses","fieldsCommentses"})
public class FieldsDir implements Serializable {

	private Long hid;
	private String name;
	private String descr;
	private String path;
    private Set<FieldsAccessFobidden> fieldsAccessFobiddens = new HashSet<FieldsAccessFobidden>();
    private Set<FieldsDocsRefs> fieldsDocsRefses = new HashSet<FieldsDocsRefs>();
    private Set<FieldsComments> fieldsCommentses = new HashSet<FieldsComments>();

    public Set<FieldsComments> getFieldsCommentses() {
        return fieldsCommentses;
    }

    public void setFieldsCommentses(Set<FieldsComments> fieldsCommentses) {
        this.fieldsCommentses = fieldsCommentses;
    }

    public Set<FieldsDocsRefs> getFieldsDocsRefses() {
        return fieldsDocsRefses;
    }

    public void setFieldsDocsRefses(Set<FieldsDocsRefs> fieldsDocsRefses) {
        this.fieldsDocsRefses = fieldsDocsRefses;
    }

    public Set<FieldsAccessFobidden> getFieldsAccessFobiddens() {
        return fieldsAccessFobiddens;
    }

    public void setFieldsAccessFobiddens(Set<FieldsAccessFobidden> fieldsAccessFobiddens) {
        this.fieldsAccessFobiddens = fieldsAccessFobiddens;
    }


    public FieldsDir() {
	}

	public FieldsDir(Long hid, String name) {
		this.hid = hid;
		this.name = name;
	}

	public FieldsDir(Long hid, String name, String descr, String path, Set fieldsAccessFobiddens, Set fieldsDocsRefses) {
		this.hid = hid;
		this.name = name;
		this.descr = descr;
		this.path = path;
		this.fieldsAccessFobiddens = fieldsAccessFobiddens;
		this.fieldsDocsRefses = fieldsDocsRefses;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescr() {
		return this.descr;
	}

	public void setDescr(String descr) {
		this.descr = descr;
	}

	public String getPath() {
		return this.path;
	}

	public void setPath(String path) {
		this.path = path;
	}



}
