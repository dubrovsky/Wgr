package com.bivc.cimsmgs.dto.ky;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author p.dzeviarylin
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NsiKyOwnersDTO {
    private Long hid;
    private String nameown;
    private Boolean ownkont;
    private String adress;
    private String prim;
    private Boolean ownvag;
    private Boolean ownauto;

    public enum FilterFields{
        NAMEOWN("nameown")
        ;
        private final String name;

        FilterFields(String name){
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNameown() {
        return nameown;
    }

    public void setNameown(String nameown) {
        this.nameown = nameown;
    }

    public Boolean getOwnkont() {
        return ownkont;
    }

    public void setOwnkont(Boolean ownkont) {
        this.ownkont = ownkont;
    }

    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Boolean getOwnvag() {
        return ownvag;
    }

    public void setOwnvag(Boolean ownvag) {
        this.ownvag = ownvag;
    }

    public Boolean getOwnauto() {
        return ownauto;
    }

    public void setOwnauto(Boolean ownauto) {
        this.ownauto = ownauto;
    }
}
