package com.bivc.cimsmgs.db.nsi;

import com.bivc.cimsmgs.db.NsiOhr;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Cargo {
    private Long car_un;
    private Long car_id;
    private String cargo;
    private String cargo_fullname;
    private String cargo_sg;
    private String cargo_security;
    private Date car_bgn;
    private Date car_end;
    private Set<NsiOhr> ohranas = new HashSet<NsiOhr>();

    public Set<NsiOhr> getOhranas() {
        return ohranas;
    }

    public void setOhranas(Set<NsiOhr> ohranas) {
        this.ohranas = ohranas;
    }

    public Cargo() {
    }

    public Date getCar_end() {
        return car_end;
    }

    public void setCar_end(Date car_end) {
        this.car_end = car_end;
    }

    public Long getCar_un() {
        return car_un;
    }

    public void setCar_un(Long car_un) {
        this.car_un = car_un;
    }

    public Long getCar_id() {
        return car_id;
    }

    public void setCar_id(Long car_id) {
        this.car_id = car_id;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCargo_fullname() {
        return cargo_fullname;
    }

    public void setCargo_fullname(String cargo_fullname) {
        this.cargo_fullname = cargo_fullname;
    }

    public String getCargo_sg() {
        return cargo_sg;
    }

    public void setCargo_sg(String cargo_sg) {
        this.cargo_sg = cargo_sg;
    }

    public String getCargo_security() {
        return cargo_security;
    }

    public void setCargo_security(String cargo_security) {
        this.cargo_security = cargo_security;
    }

    public Date getCar_bgn() {
        return car_bgn;
    }

    public void setCar_bgn(Date car_bgn) {
        this.car_bgn = car_bgn;
    }
}
