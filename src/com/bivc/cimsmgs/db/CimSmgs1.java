package com.bivc.cimsmgs.db;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class CimSmgs1 {
    private long hid;
    private String g1;
    private String g2;
    private PackDoc packDoc;
    private Route route;
    private Map<Integer,CimSmgsCarList> cimSmgsCarLists = new HashMap<Integer, CimSmgsCarList>();
    private Set<Status> statuses = new HashSet<Status>();

    public Set<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Set<Status> statuses) {
        this.statuses = statuses;
    }

    public Map<Integer,CimSmgsCarList> getCimSmgsCarLists() {
        return cimSmgsCarLists;
    }

    public void setCimSmgsCarLists(Map<Integer,CimSmgsCarList> cimSmgsCarLists) {
        this.cimSmgsCarLists = cimSmgsCarLists;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public String getG2() {
        return g2;
    }

    public void setG2(String g2) {
        this.g2 = g2;
    }

    public String getG1() {
        return g1;
    }

    public void setG1(String g1) {
        this.g1 = g1;
    }

    public long getHid() {
        return hid;
    }

    public void setHid(long hid) {
        this.hid = hid;
    }
}
