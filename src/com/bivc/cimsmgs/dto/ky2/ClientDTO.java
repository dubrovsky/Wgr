package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.formats.json.serializers.DateSerializer;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author p.dzeviarylin
 */
public class ClientDTO implements Comparable<ClientDTO> {
    private Long hid;
    private String clNo;
    private String fname;
    private String sname;
    private String noDog;
    @JsonSerialize(using = DateSerializer.class)
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date dateDog;

    private Integer freeDays;
    private Integer cntPZ;
    private Integer cntWZ;
    private String groups;
    private Set<ClientGroupsDTO> clientGroups;


    public String getGroups() {
        if(clientGroups != null) {
            return clientGroups.stream().map(clientGroupsDTO -> clientGroupsDTO.getGroup().getName()).collect(Collectors.joining(", "));
        }
        return groups;
    }

    public Integer getCntPZ() {
        return cntPZ;
    }

    public void setCntPZ(Integer cntPZ) {
        this.cntPZ = cntPZ;
    }

    public Integer getCntWZ() {
        return cntWZ;
    }

    public void setCntWZ(Integer cntWZ) {
        this.cntWZ = cntWZ;
    }

    public Date getDateDog() {
        return dateDog;
    }

    public void setDateDog(Date dateDog) {
        this.dateDog = dateDog;
    }

    public void setGroups(String groups) {
        this.groups = groups;
    }

    public Set<ClientGroupsDTO> getClientGroups() {
        return clientGroups;
    }

    public void setClientGroups(Set<ClientGroupsDTO> clientGroups) {
        this.clientGroups = clientGroups;
    }

    public String getClNo() {
        return clNo;
    }

    public void setClNo(String clNo) {
        this.clNo = clNo;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getSname() {
        return sname;
    }

    public void setSname(String sname) {
        this.sname = sname;
    }

    public String getNoDog() {
        return noDog;
    }

    public void setNoDog(String noDog) {
        this.noDog = noDog;
    }

    public Integer getFreeDays() {
        return freeDays;
    }

    public void setFreeDays(Integer freeDays) {
        this.freeDays = freeDays;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    @Override
    public int compareTo(ClientDTO o) {
        return 0;
    }
}
