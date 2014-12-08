package com.bivc.cimsmgs.db.nsi;

import com.bivc.cimsmgs.db.NsiOhr;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class CargoGng {
    private Long c_gn_un;
    private Long c_gn_id;
    private String cargo_place;
    private String cargo_fullname;
    private String cargo_shortname1;
    private String cargo_shortname2;
    private String cargo_group;
    private String cargo_ett;
    private Date c_gn_bgn;
    private Date c_gn_end;
    private Set<NsiOhr> ohranas = new HashSet<NsiOhr>();

    public Set<NsiOhr> getOhranas() {
        return ohranas;
    }

    public void setOhranas(Set<NsiOhr> ohranas) {
        this.ohranas = ohranas;
    }

    public Date getC_gn_end() {
        return c_gn_end;
    }

    public void setC_gn_end(Date c_gn_end) {
        this.c_gn_end = c_gn_end;
    }

    public Date getC_gn_bgn() {
        return c_gn_bgn;
    }

    public void setC_gn_bgn(Date c_gn_bgn) {
        this.c_gn_bgn = c_gn_bgn;
    }

    public String getCargo_ett() {
        return cargo_ett;
    }

    public void setCargo_ett(String cargo_ett) {
        this.cargo_ett = cargo_ett;
    }

    public String getCargo_group() {
        return cargo_group;
    }

    public void setCargo_group(String cargo_group) {
        this.cargo_group = cargo_group;
    }

    public String getCargo_shortname2() {
        return cargo_shortname2;
    }

    public void setCargo_shortname2(String cargo_shortname2) {
        this.cargo_shortname2 = cargo_shortname2;
    }

    public String getCargo_shortname1() {
        return cargo_shortname1;
    }

    public void setCargo_shortname1(String cargo_shortname1) {
        this.cargo_shortname1 = cargo_shortname1;
    }

    public String getCargo_fullname() {
        return cargo_fullname;
    }

    public void setCargo_fullname(String cargo_fullname) {
        this.cargo_fullname = cargo_fullname;
    }

    public String getCargo_place() {
        return cargo_place;
    }

    public void setCargo_place(String cargo_place) {
        this.cargo_place = cargo_place;
    }

    public Long getC_gn_id() {
        return c_gn_id;
    }

    public void setC_gn_id(Long c_gn_id) {
        this.c_gn_id = c_gn_id;
    }

    public Long getC_gn_un() {
        return c_gn_un;
    }

    public void setC_gn_un(Long c_gn_un) {
        this.c_gn_un = c_gn_un;
    }
}
