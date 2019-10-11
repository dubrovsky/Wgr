package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.VagonDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.io.Serializable;
import java.util.*;

/**
 * @author p.dzeviarylin
 */
public class PoezdZayav implements Serializable {
    private Long hid;
    private Route route;
    private PackDoc packDoc;
    private Client client;
    private String noZayav;
    private String transport;
    private Byte direction;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dateZayav;
    private String un;
    private Date dattr;
    private String trans;
    private Date altered;
    private Set<Vagon> vagons = new TreeSet<>();
    private String nppr;
    private String npprm;
    private String gruzotpr;
    private Integer vagCount;
    private Integer kontCount;
    private Integer kontCountDone;

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Integer getVagCount() {
        return vagCount;
    }

    public void setVagCount(Integer vagCount) {
        this.vagCount = vagCount;
    }

    public Integer getKontCount() {
        return kontCount;
    }

    public void setKontCount(Integer kontCount) {
        this.kontCount = kontCount;
    }

    public Integer getKontCountDone() {
        return kontCountDone;
    }

    public void setKontCountDone(Integer kontCountDone) {
        this.kontCountDone = kontCountDone;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public String getNppr() {
        return nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public Set<Vagon> getVagons() {
        return vagons;
    }

    public void setVagons(Set<Vagon> vagons) {
        this.vagons = vagons;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getTrans() {
        return trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public String getTransport() {
        return transport;
    }

    public void setTransport(String transport) {
        this.transport = transport;
    }

    public String getNoZayav() {
        return noZayav;
    }

    public void setNoZayav(String noZayav) {
        this.noZayav = noZayav;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Vagon addVagon(Vagon vagon) {
        vagons.add(vagon);
        vagon.setZayav(this);
        return vagon;
    }

    public void updateVags(TreeSet<VagonDTO> dtos, Mapper mapper, NsiClientDAO clientDAO) {
        // delete
        Set<Vagon> vagsToRemove = new HashSet<>();
        for (Vagon vagon : getVagons()) {
            boolean found = false;
            for (VagonDTO vagonDTO : dtos) {
                if (Objects.equals(vagon.getHid(), vagonDTO.getHid())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                vagsToRemove.add(vagon);
            }
        }
        for (Vagon vagon : vagsToRemove) {
            removeVagon(vagon);
        }

        // update
        Set<VagonDTO> vagsDtoToRemove = new HashSet<>();
        for (Vagon vagon : getVagons()) {
            for (VagonDTO vagonIntoDTO : dtos) {
                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
                    mapper.map(vagonIntoDTO, vagon);
                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                        vagon.updateKonts(vagonIntoDTO.getKonts(), mapper, clientDAO);
                    } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                        vagon.updateGruzs(vagonIntoDTO.getGruzs(), mapper);
                    } else {  // can be deleted and getOtpravka is null
                        vagon.removeKonts();
                        vagon.removeGruzy();
                    }
                    vagsDtoToRemove.add(vagonIntoDTO);
                    break;
                }
            }
        }
        dtos.removeAll(vagsDtoToRemove);

        // insert
        for (VagonDTO vagonIntoDTO : dtos) {
            Vagon vagon = mapper.map(vagonIntoDTO, Vagon.class);
            addVagon(vagon);
            if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                vagon.updateKonts(vagonIntoDTO.getKonts(), mapper, clientDAO);
            } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                vagon.updateGruzs(vagonIntoDTO.getGruzs(), mapper);
            }
        }
    }

    public void removeVagon(Vagon vagon) {
        vagons.remove(vagon);
        vagon.setPoezd(null);
    }

    public Date getDateZayav() {
        return dateZayav;
    }

    public void setDateZayav(Date dateZayav) {
        this.dateZayav = dateZayav;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PoezdZayav that = (PoezdZayav) o;
        return hid.equals(that.hid) &&
                noZayav.equals(that.noZayav) &&
                transport.equals(that.transport) &&
                direction.equals(that.direction) &&
                dateZayav.equals(that.dateZayav) &&
                un.equals(that.un) &&
                dattr.equals(that.dattr) &&
                trans.equals(that.trans) &&
                altered.equals(that.altered) &&
                nppr.equals(that.nppr) &&
                npprm.equals(that.npprm) &&
                gruzotpr.equals(that.gruzotpr);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, noZayav, transport, direction, dateZayav, un, dattr, trans, altered, nppr, npprm, gruzotpr);
    }
}
