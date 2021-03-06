package com.bivc.cimsmgs.dto.ky2;

import com.bivc.cimsmgs.dto.RouteDTO;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class AvtoBindViewDTO {

    private Long hid;
    private Byte direction;
    private String no_avto;
    private String ret_nkon;
    private RouteDTO route;

    private TreeSet<KontBindViewDTO> konts = new TreeSet<>();
    private TreeSet<GruzBindViewDTO> gruzs = new TreeSet<>();

    public String getRet_nkon() {
        return ret_nkon;
    }

    public void setRet_nkon(String ret_nkon) {
        this.ret_nkon = ret_nkon;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public TreeSet<KontBindViewDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindViewDTO> konts) {
        this.konts = konts;
    }

    public TreeSet<GruzBindViewDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindViewDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }

    public RouteDTO getRoute() {
        return route;
    }

    public void setRoute(RouteDTO route) {
        this.route = route;
    }
}
