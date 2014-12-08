package com.bivc.cimsmgs.db;

public class NsiOhr {
    private Long hid;
    private String etsng;
    private String cargoPl;
    private boolean ohr;
    /*private CargoGng gng;*/

    /*public CargoGng getGng() {
        return gng;
    }

    public void setGng(CargoGng gng) {
        this.gng = gng;
    }
*/
    public NsiOhr(){

    }

    public boolean isOhr() {
        return ohr;
    }

    public void setOhr(boolean ohr) {
        this.ohr = ohr;
    }

    public String getCargoPl() {
        return cargoPl;
    }

    public void setCargoPl(String cargoPl) {
        this.cargoPl = cargoPl;
    }

    public String getEtsng() {
        return etsng;
    }

    public void setEtsng(String etsng) {
        this.etsng = etsng;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
