package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("yardSectorFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardSector implements java.io.Serializable {

	private Integer hid;
	private String name;
	private String descr;
	private Set<Yard> yards = new HashSet<Yard>(0);

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "yards");
    }

	public YardSector() {
	}

	public YardSector(Integer hid, String name) {
		this.hid = hid;
		this.name = name;
	}

	public YardSector(Integer hid, String name, String descr, Set<Yard> yards) {
		this.hid = hid;
		this.name = name;
		this.descr = descr;
		this.yards = yards;
	}

	public Integer getHid() {
		return this.hid;
	}

	public void setHid(Integer hid) {
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

	public Set<Yard> getYards() {
		return this.yards;
	}

	public void setYards(Set<Yard> kontYards) {
		this.yards = kontYards;
	}

}
