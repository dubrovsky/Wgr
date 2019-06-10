package com.bivc.cimsmgs.dto.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class NsiAvtoDTO {
    private Long hid;
    private String typeAvto;
    private String noAvto;
    private String noTrail;
    private String ownCargo;
    private NsiKyOwnersDTO owner;

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getTypeAvto() {
        return typeAvto;
    }

    public void setTypeAvto(String typeAvto) {
        this.typeAvto = typeAvto;
    }

    public String getNoAvto() {
        return noAvto;
    }

    public void setNoAvto(String noAvto) {
        this.noAvto = noAvto;
    }

    public String getNoTrail() {
        return noTrail;
    }

    public void setNoTrail(String noTrail) {
        this.noTrail = noTrail;
    }

    public String getOwnCargo() {
        return ownCargo;
    }

    public void setOwnCargo(String ownCargo) {
        this.ownCargo = ownCargo;
    }

    public NsiKyOwnersDTO getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwnersDTO owner) {
        this.owner = owner;
    }
}
