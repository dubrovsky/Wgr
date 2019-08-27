package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.VagonBindDTO;
import com.bivc.cimsmgs.dto.ky2.VagonDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.*;

/**
 * Poezd generated by hbm2java
 */
public class Poezd implements Serializable {

    private static final Logger log = LoggerFactory.getLogger(Poezd.class);

    private Long hid;
    private Route route;
    private PackDoc packDoc;
    private String trans;

    private Date dattr;
    private String un;

    private Date altered;
    private String nppr;

    private Date dprb;

    private Date dotp;

    /*private Set<Kont> kontsOut = new TreeSet<>();
    private Set<Kont> kontsInto = new TreeSet<>();*/
    private Set<Vagon> vagons = new TreeSet<>();
    private Byte koleya;
    private Byte direction;
    private String npprm;
    private String punkt_otpr;
    private String punkt_nazn;
    private String gruzotpr;
    private Integer vagCount;
    private Integer kontCount;


    public Integer getVagCount() {
        return vagons.size();
    }

    public Integer getKontCount() {
        int konts = 0;
        for (Vagon vagon : vagons)
            konts += vagon.getKonts().size();
        return konts;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getPunkt_nazn() {
        return punkt_nazn;
    }

    public void setPunkt_nazn(String punkt_nazn) {
        this.punkt_nazn = punkt_nazn;
    }

    public String getPunkt_otpr() {
        return punkt_otpr;
    }

    public void setPunkt_otpr(String punkt_otpr) {
        this.punkt_otpr = punkt_otpr;
    }

    public enum FilterFields {
        NPPR("nppr");
        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public String getNpprm() {
        return npprm;
    }

    public void setNpprm(String npprm) {
        this.npprm = npprm;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
    }

    public Poezd() {
    }

    public Poezd(Long hid) {
        this.hid = hid;
    }

    public Poezd(Long hid, Route route, PackDoc packDoc, String trans, Date dattr, String un, Date altered, String nppr, Date dprb, Byte koleya,
                 Byte direction, Date dotp, Set<Vagon> vagons) {
        this.hid = hid;
        this.route = route;
        this.packDoc = packDoc;
        this.trans = trans;
        this.dattr = dattr;
        this.un = un;
        this.altered = altered;
        this.nppr = nppr;
        this.dprb = dprb;
        this.koleya = koleya;
        this.direction = direction;
        this.dotp = dotp;
//        this.kontsOut = kontsOut;
//        this.kontsInto = kontsInto;
        this.vagons = vagons;
    }

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Route getRoute() {
        return this.route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public PackDoc getPackDoc() {
        return this.packDoc;
    }

    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public String getTrans() {
        return this.trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public Date getDattr() {
        return this.dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getUn() {
        return this.un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Date getAltered() {
        return this.altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getNppr() {
        return this.nppr;
    }

    public void setNppr(String nppr) {
        this.nppr = nppr;
    }

    public Date getDprb() {

        return this.dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }


    public Date getDotp() {

        return this.dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    /*public Set<Kont> getKontsOut() {
        return this.kontsOut;
    }

    public void setKontsOut(Set<Kont> kontsOut) {
        this.kontsOut = kontsOut;
    }

    public Set<Kont> getKontsInto() {
        return this.kontsInto;
    }

    public void setKontsInto(Set<Kont> kontsInto) {
        this.kontsInto = kontsInto;
    }*/

    public Set<Vagon> getVagons() {
        return this.vagons;
    }

    public void setVagons(Set<Vagon> vagons) {
        this.vagons = vagons;
    }

    public boolean hasPack() {
        return (this.getPackDoc() != null && this.getPackDoc().getHid() != null);
    }

    public void bindPoezdsToPoezd(Set<VagonBindDTO> dtos, Set<Vagon> vagonsOut, Mapper mapper, List<Poezd> poezds) {
        for (VagonBindDTO vagonIntoDTO : dtos) {
            for (Vagon vagon : getVagons()) {
                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
                    mapper.map(vagonIntoDTO, vagon); // update otpravka
                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                        vagon.bindKontsToPoezdKonts(vagonIntoDTO.getKonts(), mapper, vagonsOut, poezds);
                    }  else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                        vagon.bindGruzsToPoezdGruzs(vagonIntoDTO.getGruzs(), mapper, vagonsOut, poezds);
                    }
                    break;
                }
            }
        }
    }

    public void bindPoezdToPoezds(Set<VagonBindDTO> dtos, List<Poezd> poezdsOut, Mapper mapper) {
        for (VagonBindDTO vagonIntoDTO : dtos) {
            for (Vagon vagon : getVagons()) {
                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
                    mapper.map(vagonIntoDTO, vagon); // update otpravka
                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                        vagon.bindKontsToPoezdsKonts(vagonIntoDTO.getKonts(), mapper, poezdsOut);
                    } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                        vagon.bindGruzsToPoezdsGruzs(vagonIntoDTO.getGruzs(), mapper, poezdsOut);
                    }
                    break;
                }
            }
        }
    }

    /*public void bindPoezdToPoezd(Set<VagonBindDTO> dtos, Set<Vagon> vagOut, Mapper mapper) {
        for (Vagon vagon : getVagons()) {
            for (VagonBindDTO vagonIntoDTO : dtos) {
                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
                    mapper.map(vagonIntoDTO, vagon); // update otpravka
                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                        vagon.bindKonts(vagonIntoDTO.getKonts(), mapper, vagOut);
                    } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                        vagon.bindGruzs(vagonIntoDTO.getGruzs(), mapper, vagOut);
                    }
                    break;
                }
            }
        }
    }*/

    public void bindPoezdToYard(Set<VagonBindDTO> dtos, List<YardSector> yardSectors, Mapper mapper) {
        for (VagonBindDTO vagonIntoDTO : dtos) {
            for (Vagon vagon : getVagons()) {
                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
                    mapper.map(vagonIntoDTO, vagon); // update otpravka
                    vagon.bindKontsToYardKonts(vagonIntoDTO.getKonts(), mapper, yardSectors);
                    break;
                }
            }
        }
    }

    public Map<String, List<?>> updateVags(Set<VagonDTO> dtos, Mapper mapper) {
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
                        vagon.updateKonts(vagonIntoDTO.getKonts(), mapper);
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
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        for (VagonDTO vagonIntoDTO : dtos) {
            Vagon vagon = mapper.map(vagonIntoDTO, Vagon.class);
            addVagon(vagon);
            if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
                contGruz4History.put("cont", vagon.updateKonts(vagonIntoDTO.getKonts(), mapper));
            } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                vagon.updateGruzs(vagonIntoDTO.getGruzs(), mapper);
            }
        }
        return contGruz4History;
    }

    public Vagon addVagon(Vagon vagon) {
        vagons.add(vagon);
        vagon.setPoezd(this);
        return vagon;
    }

    public void removeVagon(Vagon vagon) {
        vagons.remove(vagon);
        vagon.setPoezd(null);
    }

    public void removeVagons() {
        for (Iterator<Vagon> iterator = vagons.iterator(); iterator.hasNext(); ) {   // avoid ConcurrentModificationException
            Vagon vagon = iterator.next();
            iterator.remove();
            vagon.setPoezd(null);
        }
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "route", "packDoc", "kontsOut", "kontsInto", "vagons");
    }

}
