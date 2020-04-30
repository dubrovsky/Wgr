package com.bivc.cimsmgs.db.nsi;

import com.bivc.cimsmgs.db.UsrGroupsDir;
import com.bivc.cimsmgs.db.ky.*;
import com.bivc.cimsmgs.dto.ky2.ClientDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.*;

/**
 * @author p.dzeviarylin
 */
public class Client implements Serializable {
    private Long hid;
    private Long hidRoute;
    private String clNo;
    private String fname;
    private String sname;
    private String noDog;
    private Integer freeDays;
    private Integer cntPZ;
    private Integer cntWZ;
    private String trans;
    private String groups;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dateDog;
    private Date clientBgn;
    private Date clientEnd;
    private Set<Poezd> poezds = new HashSet<>();
    private Set<PoezdZayav> poezdZayavs = new HashSet<>();
    private Set<Avto> avtos = new HashSet<>();
    private Set<AvtoZayav> avtoZayavs = new HashSet<>();
    private Set<Kont> konts = new HashSet<>();
    private Set<Gruz> gruzs = new HashSet<>();
    private Set<ClientGroups> clientGroups = new HashSet<>(0);

    public Set<Gruz> getGruzs() {
        return gruzs;
    }

    public void setGruzs(Set<Gruz> gruzs) {
        this.gruzs = gruzs;
    }

    public Set<ClientGroups> buildGroups(ClientDTO dto) {
        Set<ClientGroups> clientrGroups = new HashSet<>();
        if (dto.getGroups() != null) {
            getClientGroups().clear();
            UsrGroupsDir group;
            ClientGroups clientGroup;
            StringTokenizer st = new StringTokenizer(dto.getGroups());
            while (st.hasMoreTokens()) {
                group = new UsrGroupsDir(st.nextToken().replaceAll(",", "") );
                clientGroup = new ClientGroups(new ClientGroupsId(getHid().intValue(), group.getName()), this, group);
                clientrGroups.add(clientGroup);
            }
        }
        return clientrGroups;
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

    public Long getHidRoute() {
        return hidRoute;
    }

    public void setHidRoute(Long hidRoute) {
        this.hidRoute = hidRoute;
    }

    public String getGroups() {
        return groups;
    }

    public void setGroups(String groups) {
        this.groups = groups;
    }

    public Set<Kont> getKonts() {
        return konts;
    }

    public void setKonts(Set<Kont> konts) {
        this.konts = konts;
    }

    public Set<ClientGroups> getClientGroups() {
        return clientGroups;
    }

    public void setClientGroups(Set<ClientGroups> clientGroups) {
        this.clientGroups = clientGroups;
    }

    public Set<PoezdZayav> getPoezdZayavs() {
        return poezdZayavs;
    }

    public void setPoezdZayavs(Set<PoezdZayav> poezdZayavs) {
        this.poezdZayavs = poezdZayavs;
    }

    public Set<Poezd> getPoezds() {
        return poezds;
    }

    public void setPoezds(Set<Poezd> poezds) {
        this.poezds = poezds;
    }

    public Set<Avto> getAvtos() {
        return avtos;
    }

    public void setAvtos(Set<Avto> avtos) {
        this.avtos = avtos;
    }

    public Set<AvtoZayav> getAvtoZayavs() {
        return avtoZayavs;
    }

    public void setAvtoZayavs(Set<AvtoZayav> avtoZayavs) {
        this.avtoZayavs = avtoZayavs;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
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

    public Date getDateDog() {
        return dateDog;
    }

    public void setDateDog(Date dateDog) {
        this.dateDog = dateDog;
    }

    public Date getClientBgn() {
        return clientBgn;
    }

    public void setClientBgn(Date clientBgn) {
        this.clientBgn = clientBgn;
    }

    public Date getClientEnd() {
        return clientEnd;
    }

    public void setClientEnd(Date clientEnd) {
        this.clientEnd = clientEnd;
    }

    public void prepare4save() {
        setClientBgn(new Date(System.currentTimeMillis() - 1000*60*60*24));
        setClientEnd(new GregorianCalendar(3000,1,1).getTime());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return hid.equals(client.hid) &&
                clNo.equals(client.clNo) &&
                fname.equals(client.fname) &&
                sname.equals(client.sname) &&
                noDog.equals(client.noDog) &&
                freeDays.equals(client.freeDays) &&
                trans.equals(client.trans) &&
                groups.equals(client.groups) &&
                dateDog.equals(client.dateDog) &&
                clientBgn.equals(client.clientBgn) &&
                clientEnd.equals(client.clientEnd);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, clNo, fname, sname, noDog, freeDays, trans, groups, dateDog, clientBgn, clientEnd);
    }
}
