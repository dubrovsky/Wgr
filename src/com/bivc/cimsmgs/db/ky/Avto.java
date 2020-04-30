package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.dao.NsiClientDAO;
import com.bivc.cimsmgs.db.BoardMessenger;
import com.bivc.cimsmgs.db.BoardTalkNewMess;
import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.nsi.Client;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class Avto implements BoardMessenger {
    private static final Logger log = LoggerFactory.getLogger(Avto.class);

    private Byte direction;
    private Route route;
    private PackDoc packDoc;
    private String naim_sob;
    private Client client;
    private Long hid;
    private String type_avto;
    private String no_avto;
    private String no_trail;
    private String driver_fio;
    private String otp_cargo;
    private String pol_cargo;
    private String departure;
    private String destination;
    private String driver_pasp;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;
    private String prim;
    private String un;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    private String trans;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private Set<Kont> konts = new TreeSet<>();
    private Set<Gruz> gruzs = new TreeSet<>();
    private Set<AvtoFiles> avtoFiles = new TreeSet<>();
    private Integer kontCount;
    private String ret_nkon;
    private String docType;
    private Set<KontGruzHistory> history  = new TreeSet<>();
    private String no_zayav;
    private Long messCount;
    private Set<BoardTalkNewMess> boardTalkNewMesses = new TreeSet<>();
    private long newMessCount;

    public Avto() {
    }

    public Map<String, List<?>> bindAvtosToAvto(Set<KontBindDTO> kDtos, Set<GruzBindDTO> gDtos, Avto avto, Mapper mapper, List<Avto> avtos) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<Gruz>());

//        for (VagonBindDTO vagonIntoDTO : dtos) {
//            for (Vagon vagon : getVagons()) {
//                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
//                    mapper.map(vagonIntoDTO, vagon); // update otpravka
//                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
        List<Kont> konts = this.bindKontsToAvtoKonts(kDtos, avto, mapper, avtos);
        ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//                    }  else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
        List<Gruz> gruzs = this.bindGruzsToAvtoGruzs(gDtos, avto, mapper, avtos);
        ((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
//                    }
//                    break;
//                }
//            }
//        }
        return contGruz4History;
    }

    public Map<String, List<?>> bindAvtoToYard(Set<KontBindDTO> kDtos, List<YardSector> yardSectors, Mapper mapper, Date dotp) {
        Map<String, List<?>> contGruz4History = new HashMap<>(1);
        contGruz4History.put("konts", new ArrayList<Kont>());

//        for (VagonBindDTO vagonIntoDTO : dtos) {
//            for (Vagon vagon : getVagons()) {
//                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
//                    mapper.map(vagonIntoDTO, vagon); // update otpravka
        List<Kont> konts = this.bindKontsToYardKonts(kDtos, mapper, yardSectors, dotp);
        ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//                    break;
//                }
//            }
//        }
        return contGruz4History;
    }


    public Map<String, List<?>> bindAvtoToAvtos(Set<KontBindDTO> kDtos, Set<GruzBindDTO> gDtos, List<Avto> avtosOut, Mapper mapper) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<Gruz>());
//        if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
        List<Kont> konts = this.bindKontsToAvtosKonts(kDtos, mapper, avtosOut);
        ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//        } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
        List<Gruz> gruzs = this.bindGruzsToAvtosGruzs(gDtos, mapper, avtosOut);
        ((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
//        }


//        for (VagonBindDTO vagonIntoDTO : dtos) {
//            for (Vagon vagon : getVagons()) {
//                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
//                    mapper.map(vagonIntoDTO, vagon); // update otpravka
//                    if (vagonIntoDTO.getOtpravka() == Otpravka.CONT) {
//                        List<Kont> konts = vagon.bindKontsToPoezdsKonts(vagonIntoDTO.getKonts(), mapper, poezdsOut);
//                        ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
//                    } else if (vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
//                        List<Gruz> gruzs = vagon.bindGruzsToPoezdsGruzs(vagonIntoDTO.getGruzs(), mapper, poezdsOut);
//                        ((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
//                    }
//                    break;
//                }
//            }
//        }
        return contGruz4History;
    }

    public List<Kont> bindKontsToAvtoKonts(Set<KontBindDTO> dtos, Avto avtoOut, Mapper mapper, List<Avto> avtos) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());

        // insert from poezd
        dtoToRemove.clear();
        boolean found = false;
        for (KontBindDTO kontDTO : dtos) {
//            for (Vagon toVagon : toVags) {// add kont from another poezd
            for (Kont toKont : avtoOut.getKonts()) {
                if (Objects.equals(toKont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, toKont);  // update kont, sort can change
                    bindKont(toKont);
                    kontsForHistory.add(toKont);
                    log.info("Add kont to poezd from another poezd, kont - {}", toKont.getNkon());
                    dtoToRemove.add(kontDTO);
                    found = true;
                    break;
                }
            }
//                if (found) {
//                    break;
//                }
//            }
        }
        dtos.removeAll(dtoToRemove);

        if (!dtos.isEmpty()) { // still have conts - may be when remove conts between poezds
            dtoToRemove.clear();
            found = false;
            for (KontBindDTO kontDTO : dtos) {
                for (Avto avto : avtos) {
//                    for (Vagon vagon : poezd.getVagons()) {
                    for (Kont kont : avto.getKonts()) {
                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                            mapper.map(kontDTO, kont);
                            bindKont(kont);
                            kontsForHistory.add(kont);
                            log.info("Move kont in same poezds, kont - {}", kont.getNkon());
                            dtoToRemove.add(kontDTO);
                            found = true;
                            break;
                        }
                    }
//                        if (found) {
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
                }
            }
            dtos.removeAll(dtoToRemove);
        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }

    public List<Gruz> bindGruzsToAvtoGruzs(Set<GruzBindDTO> dtos, Avto avtoOut, Mapper mapper, List<Avto> avtos) {
        // update gruz that not moved
        Set<GruzBindDTO> dtoToRemove = new HashSet<>();
        for (GruzBindDTO gruzBindDTO : dtos) {
            for (Gruz gruz : getGruzs()) {
                if (Objects.equals(gruz.getHid(), gruzBindDTO.getHid())) {
                    mapper.map(gruzBindDTO, gruz);  // update gruz, sort can change
                    dtoToRemove.add(gruzBindDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Gruz> gruzsForHistory = new ArrayList<>(dtos.size());
        // insert from poezd
        dtoToRemove.clear();
        boolean found = false;
        for (GruzBindDTO gruzBindDTO : dtos) {
//            for (Vagon toVagon : toVags) {// add gruz from another poezd
            for (Gruz toGruz : avtoOut.getGruzs()) {
                if (Objects.equals(toGruz.getHid(), gruzBindDTO.getHid())) {
                    mapper.map(gruzBindDTO, toGruz);  // update Gruz, sort can change
                    bindGruz(toGruz);
                    gruzsForHistory.add(toGruz);
                    log.info("Add gruz to poezd from another poezd, gruz - {}", toGruz.getKgvn());
                    dtoToRemove.add(gruzBindDTO);
                    found = true;
                    break;
                }
            }
//                if (found) {
//                    break;
//                }
//            }
        }
        dtos.removeAll(dtoToRemove);

        if (!dtos.isEmpty()) { // still have Gruz - may be when remove Gruz between poezds
            dtoToRemove.clear();
            found = false;
            for (GruzBindDTO gruzBindDTO : dtos) {
                for (Avto avto : avtos) {
//                    for (Vagon vagon : poezd.getVagons()) {
                    for (Gruz gruz : avto.getGruzs()) {
                        if (Objects.equals(gruz.getHid(), gruzBindDTO.getHid())) {
                            mapper.map(gruzBindDTO, gruz);
                            bindGruz(gruz);
                            gruzsForHistory.add(gruz);
                            log.info("Move gruz in same poezds, gruz - {}", gruz.getKgvn());
                            dtoToRemove.add(gruzBindDTO);
                            found = true;
                            break;
                        }
                    }
//                        if (found) {
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
                }
            }
            dtos.removeAll(dtoToRemove);
        }

        if (!dtos.isEmpty()) {
            for (GruzBindDTO gruzBindDTO : dtos) {
                log.warn("Gruz {} was not bound, something wrong!!!", gruzBindDTO.getKgvn());
            }
        }
        return gruzsForHistory;
    }

    public List<Gruz> bindGruzsToAvtosGruzs(Set<GruzBindDTO> dtos, Mapper mapper, List<Avto> avtosOut) {
        // update gruzs that not moved
        Set<GruzBindDTO> dtoToRemove = new HashSet<>();
        for (GruzBindDTO gruzDTO : dtos) {
            for (Gruz gruz : getGruzs()) {
                if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
                    mapper.map(gruzDTO, gruz);  // update gruz, sort can change
                    dtoToRemove.add(gruzDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Gruz> gruzsForHistory = new ArrayList<>(dtos.size());
        // insert from poezds
        dtoToRemove.clear();
        boolean found;
        for (GruzBindDTO gruzDTO : dtos) {
            found = false;
            for (Avto avto : avtosOut) {
                for (Gruz gruzKont : avto.getGruzs()) {
                    if (Objects.equals(gruzKont.getHid(), gruzDTO.getHid())) {
                        mapper.map(gruzDTO, gruzKont);
                        bindGruz(gruzKont);
                        gruzsForHistory.add(gruzKont);
                        log.info("Add Gruz from another poezd, Gruz - {}", gruzKont.getKgvn());
                        dtoToRemove.add(gruzDTO);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

//        if (!dtos.isEmpty()) { // still have gruzs - may be when remove gruzs in same poesd between vagons
//            dtoToRemove.clear();
//            for (GruzBindDTO gruzBindDTO : dtos) {
//                found = false;
//                for (Vagon vagon : getPoezd().getVagons()) {
//                    for (Gruz gruz : vagon.getGruzs()) {
//                        if (Objects.equals(gruz.getHid(), gruzBindDTO.getHid())) {
//                            mapper.map(gruzBindDTO, gruz);
//                            bindGruz(gruz);
//                            gruzsForHistory.add(gruz);
//                            log.info("Move gruz in same poezd, gruz - {}", gruz.getKgvn());
//                            dtoToRemove.add(gruzBindDTO);
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
//                }
//            }
//            dtos.removeAll(dtoToRemove);
//        }

        if (!dtos.isEmpty()) {
            for (GruzBindDTO gruzBindDTO : dtos) {
                log.warn("Gruz {} was not bound, something wrong!!!", gruzBindDTO.getKgvn());
            }
        }
        return gruzsForHistory;
    }

    public List<Kont> bindKontsToYardKonts(Set<KontBindDTO> dtos, Mapper mapper, List<YardSector> yardSectors, Date dotp) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);


        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());
        // insert from yard
        dtoToRemove.clear();
        boolean found;
        for (KontBindDTO kontDTO : dtos) {
            found = false;
            for (YardSector yardSector : yardSectors) {
                for (Yard yard : yardSector.getYards()) {
                    for (Kont yardKont : yard.getKonts()) {
                        if (Objects.equals(yardKont.getHid(), kontDTO.getHid())) {
                            mapper.map(kontDTO, yardKont);
                            bindKont(yardKont);
                            if (yardKont.getDotp() == null)
                                yardKont.setDotp(dotp);
                            kontsForHistory.add(yardKont);
                            log.info("Add kont from avto, kont - {}", yardKont.getNkon());
                            dtoToRemove.add(kontDTO);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

//        if (!dtos.isEmpty()) { // still have conts - may be when remove cont in same poesd between vagons
//            dtoToRemove.clear();
//            for (KontBindDTO kontDTO : dtos) {
//                found = false;
//                for (Vagon vagon : getPoezd().getVagons()) {
//                    for (Kont kont : vagon.getKonts()) {
//                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
//                            mapper.map(kontDTO, kont);
//                            bindKont(kont);
//                            kontsForHistory.add(kont);
//                            log.info("Move kont in same poezd, kont - {}", kont.getNkon());
//                            dtoToRemove.add(kontDTO);
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
//                }
//            }
//            dtos.removeAll(dtoToRemove);
//        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }


    public List<Kont> bindKontsToAvtosKonts(Set<KontBindDTO> dtos, Mapper mapper, List<Avto> avtosOut) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());

        // insert from poezds
        dtoToRemove.clear();
        boolean found;
        for (KontBindDTO kontDTO : dtos) {
            found = false;
            for (Avto avto : avtosOut) {
                for (Kont avtoKont : avto.getKonts()) {
                    if (Objects.equals(avtoKont.getHid(), kontDTO.getHid())) {
                        mapper.map(kontDTO, avtoKont);
                        bindKont(avtoKont);
                        kontsForHistory.add(avtoKont);
                        log.info("Add kont from another poezd, kont - {}", avtoKont.getNkon());
                        dtoToRemove.add(kontDTO);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

//        if (!dtos.isEmpty()) { // still have conts - may be when remove cont in same poesd between vagons
//            dtoToRemove.clear();
//            for (KontBindDTO kontDTO : dtos) {
//                found = false;
//                for (Vagon vagon : getPoezd().getVagons()) {
//                    for (Kont kont : vagon.getKonts()) {
//                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
//                            mapper.map(kontDTO, kont);
//                            bindKont(kont);
//                            kontsForHistory.add(kont);
//                            log.info("Move kont in same poezd, kont - {}", kont.getNkon());
//                            dtoToRemove.add(kontDTO);
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
//                }
//            }
//            dtos.removeAll(dtoToRemove);
//        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }

    public void bindKonts(Set<KontBindDTO> dtos, Mapper mapper, Avto toAvto) {
        // delete
        Set<Kont> kontsToUnbind = new HashSet<>();
        for (Kont kont : getKonts()) {
            boolean found = false;
            for (KontBindDTO kontDTO : dtos) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                kontsToUnbind.add(kont);
            }
        }
        for (Kont kont : kontsToUnbind) {    // kont will go to another poezd
            unbindKont(kont);
            kont.setAvto(toAvto);
        }

        // update
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (Kont kont : getKonts()) {
            for (KontBindDTO kontDTO : dtos) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        // insert
//        for (Vagon vagon : toVags) {// add kont from another poezd
        for (Kont kont : toAvto.getKonts()) {
            for (KontBindDTO kontDTO : dtos) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    bindKont(kont);
                }
            }
        }
//        }

    }

    public void bindGruzs(TreeSet<GruzBindDTO> dtos, Mapper mapper, Avto toAvto) {
        // delete
        Set<Gruz> gruzyToUnbind = new HashSet<>();
        for (Gruz gruz : getGruzs()) {
            boolean found = false;
            for (GruzBindDTO gruzDTO : dtos) {
                if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                gruzyToUnbind.add(gruz);
            }
        }
        for (Gruz gruz : gruzyToUnbind) {    // gruz will go to another poezd
            unbindGruz(gruz);
            gruz.setAvto(toAvto);
        }

        // update
        Set<GruzBindDTO> dtoToRemove = new HashSet<>();
        for (Gruz gruz : getGruzs()) {
            for (GruzBindDTO gruzDTO : dtos) {
                if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
                    mapper.map(gruzDTO, gruz);  // update gruz, sort can change
                    dtoToRemove.add(gruzDTO);
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        // insert
//        for (Vagon vagon : toVags) {// add gruz from another poezd
//            for (Gruz gruz : toAvto.getGruzs()) {
//                for (GruzBindDTO gruzDTO : dtos) {
//                    if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
//                        bindGruz(gruz);
//                    }
//                }
//            }
//        }
    }

    private void unbindGruz(Gruz gruz) {
//        konts.remove(kont);
        if (gruz.getAvto() != null && gruz.getAvto().getHid().equals(hid)) {  // unbind only this vagon
            gruz.setAvto(null);
        }

    }

    public Gruz bindGruz(Gruz gruz) {
//        if (gruz.getAvto() == null || !gruz.getAvto().getHid().equals(getHid())) {  // bind only another vagon
            gruz.setAvto(this);
            gruz.setVagon(null);
//        }
        return gruz;
    }

    private void unbindKont(Kont kont) {
        if (kont.getAvto() != null && kont.getAvto().getHid().equals(hid)) {  // unbind only this vagon
            kont.setAvto(null);
        }

    }

    public Kont bindKont(Kont kont) {
//        if (kont.getAvto() == null || !kont.getAvto().getHid().equals(getHid())) {// bind only another vagon
        kont.setAvto(this);
        kont.setVagon(null);
        kont.setYard(null);
//        }
        return kont;
    }


    public List<Kont> updateKonts(Set<KontDTO> dtos, Mapper mapper, NsiClientDAO clientDAO) {
        // delete
        Set<Kont> kontsToRemove = new HashSet<>();
        for (Kont kont : getKonts()) {
            boolean found = false;
            for (KontDTO kontDTO : dtos) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                kontsToRemove.add(kont);
            }
        }
        for (Kont kont : kontsToRemove) {
            removeKont(kont);
        }

        // update
        Set<KontDTO> kontDtoToRemove = new HashSet<>();
        for (Kont kont : getKonts()) {
            for (KontDTO kontIntoDTO : dtos) {
                if (Objects.equals(kont.getHid(), kontIntoDTO.getHid())) {
                    mapper.map(kontIntoDTO, kont);
                    kont.updateClient(kontIntoDTO, clientDAO);
                    kont.updateGruzs(kontIntoDTO.getGruzs(), mapper, clientDAO);
                    kont.updatePlombs(kontIntoDTO.getPlombs(), mapper);

                    kontDtoToRemove.add(kontIntoDTO);
                }
            }
        }
        dtos.removeAll(kontDtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());
        // insert
        for (KontDTO kontIntoDTO : dtos) {
            Kont kont = mapper.map(kontIntoDTO, Kont.class);
            kont.updateClient(kontIntoDTO, clientDAO);
            addKont(kont);
            kontsForHistory.add(kont);
            kont.updateGruzs(kontIntoDTO.getGruzs(), mapper, clientDAO);
            kont.updatePlombs(kontIntoDTO.getPlombs(), mapper);
//            }
        }
        return kontsForHistory;
    }

    public Kont addKont(Kont kont) {
        konts.add(kont);
        kont.setAvto(this);
        return kont;
    }

    public void removeKont(Kont kont) {
        konts.remove(kont);
        kont.setAvto(null);
    }

    public List<Gruz> updateGruzs(TreeSet<GruzDTO> dtos, Mapper mapper) {
        // delete
        Set<Gruz> gruzyToRemove = new HashSet<>();
        for (Gruz gruz : getGruzs()) {
            boolean found = false;
            for (GruzDTO gruzDto : dtos) {
                if (Objects.equals(gruz.getHid(), gruzDto.getHid())) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                gruzyToRemove.add(gruz);
            }
        }
        for (Gruz gruz : gruzyToRemove) {
            removeGruz(gruz);
        }

        // update
        Set<GruzDTO> dtoToRemove = new HashSet<>();
        for (Gruz gruz : getGruzs()) {
            for (GruzDTO gruzDto : dtos) {
                if (Objects.equals(gruz.getHid(), gruzDto.getHid())) {
                    mapper.map(gruzDto, gruz);
                    dtoToRemove.add(gruzDto);
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Gruz> gruzForHistory = new ArrayList<>(dtos.size());
        // insert
        for (GruzDTO gruzDto : dtos) {
            Gruz gruz = mapper.map(gruzDto, Gruz.class);
            addGruz(gruz);
            gruzForHistory.add(gruz);

        }
        return gruzForHistory;
    }

    private void removeGruz(Gruz gruz) {
        gruzs.remove(gruz);
        gruz.setAvto(null);
    }

    private Gruz addGruz(Gruz gruz) {
        gruzs.add(gruz);
        gruz.setAvto(this);
        return gruz;
    }

    public Map<String, List<?>> bindAvtoToPoezd(AvtoBindDTO dto, Set<Vagon> vagonsOut, Mapper mapper, List<Avto> avtos) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<Gruz>());

        if (!dto.getKonts().isEmpty()) {
            List<Kont> konts = bindKonts(dto.getKonts(), mapper, vagonsOut, avtos);
            ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
        } else if (!dto.getGruzs().isEmpty()) {
            List<Gruz> gruzs = bindGruzs(dto.getGruzs(), mapper, vagonsOut, avtos);
            ((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
        }

        return contGruz4History;
    }

    public Map<String, List<?>> bindAvtoToPoezd(AvtoBindDTO dto, List<Poezd> poezdsOut, Mapper mapper) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("gruzs", new ArrayList<Gruz>());

        if (!dto.getKonts().isEmpty()) {
            List<Kont> konts = bindKontsToPoezdsKonts(dto.getKonts(), mapper, poezdsOut);
            ((List<Kont>) contGruz4History.get("konts")).addAll(konts);
        } else if (!dto.getGruzs().isEmpty()) {
            List<Gruz> gruzs = bindGruzsToPoezdsGruzs(dto.getGruzs(), mapper, poezdsOut);
            ((List<Gruz>) contGruz4History.get("gruzs")).addAll(gruzs);
        }

        return contGruz4History;
    }

    public List<Gruz> bindGruzsToPoezdsGruzs(Set<GruzBindDTO> dtos, Mapper mapper, List<Poezd> poezdsOut) {
        // update gruzs that not moved
        Set<GruzBindDTO> dtoToRemove = new HashSet<>();
        for (GruzBindDTO gruzDTO : dtos) {
            for (Gruz gruz : getGruzs()) {
                if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
                    mapper.map(gruzDTO, gruz);  // update gruz, sort can change
                    dtoToRemove.add(gruzDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Gruz> gruzsForHistory = new ArrayList<>(dtos.size());
        // insert from poezds
        dtoToRemove.clear();
        boolean found;
        for (GruzBindDTO gruzDTO : dtos) {
            found = false;
            for (Poezd poezd : poezdsOut) {
                for (Vagon vagon : poezd.getVagons()) {
                    for (Gruz gruzKont : vagon.getGruzs()) {
                        if (Objects.equals(gruzKont.getHid(), gruzDTO.getHid())) {
                            mapper.map(gruzDTO, gruzKont);
                            bindGruz(gruzKont);
                            gruzsForHistory.add(gruzKont);
                            log.info("Add Gruz from another poezd, Gruz - {}", gruzKont.getKgvn());
                            dtoToRemove.add(gruzDTO);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

//        if (!dtos.isEmpty()) { // still have gruzs - may be when remove gruzs in same poesd between vagons
//            dtoToRemove.clear();
//            for (GruzBindDTO gruzBindDTO : dtos) {
//                found = false;
////                for (Vagon vagon : getPoezd().getVagons()) {
//                    for (Gruz gruz : getGruzs()) {
//                        if (Objects.equals(gruz.getHid(), gruzBindDTO.getHid())) {
//                            mapper.map(gruzBindDTO, gruz);
//                            bindGruz(gruz);
//                            gruzsForHistory.add(gruz);
//                            log.info("Move gruz in same poezd, gruz - {}", gruz.getKgvn());
//                            dtoToRemove.add(gruzBindDTO);
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
////                }
//            }
//            dtos.removeAll(dtoToRemove);
//        }

        if (!dtos.isEmpty()) {
            for (GruzBindDTO gruzBindDTO : dtos) {
                log.warn("Gruz {} was not bound, something wrong!!!", gruzBindDTO.getKgvn());
            }
        }
        return gruzsForHistory;
    }


    public List<Kont> bindKontsToPoezdsKonts(Set<KontBindDTO> dtos, Mapper mapper, List<Poezd> poezdsOut) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());
        // insert from avto
        dtoToRemove.clear();
        boolean found;
        for (KontBindDTO kontDTO : dtos) {
            found = false;
            for (Poezd poezd : poezdsOut) {
                for (Vagon vagon : poezd.getVagons()) {
                    for (Kont kont : vagon.getKonts()) {
                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                            mapper.map(kontDTO, kont);
                            bindKont(kont);
                            kontsForHistory.add(kont);
                            log.info("Add kont from another yard, kont - {}", kont.getNkon());
                            dtoToRemove.add(kontDTO);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
            }
        }
        dtos.removeAll(dtoToRemove);

//        if (!dtos.isEmpty()) { // still have conts - may be when remove cont in same poesd between vagons
//            dtoToRemove.clear();
//            for (KontBindDTO kontDTO : dtos) {
//                found = false;
//                for (Vagon vagon : getPoezd().getVagons()) {
//                    for (Kont kont : vagon.getKonts()) {
//                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
//                            mapper.map(kontDTO, kont);
//                            bindKont(kont);
//                            kontsForHistory.add(kont);
//                            log.info("Move kont in same poezd, kont - {}", kont.getNkon());
//                            dtoToRemove.add(kontDTO);
//                            found = true;
//                            break;
//                        }
//                    }
//                    if (found) {
//                        break;
//                    }
//                }
//            }
//            dtos.removeAll(dtoToRemove);
//        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }


    private List<Kont> bindKonts(TreeSet<KontBindDTO> dtos, Mapper mapper, Set<Vagon> toVags, List<Avto> avtos) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
                    dtoToRemove.add(kontDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());
        // insert from poezd
        dtoToRemove.clear();
        boolean found = false;
        for (KontBindDTO kontDTO : dtos) {
            for (Vagon toVagon : toVags) {// add kont from another poezd
                for (Kont toKont : toVagon.getKonts()) {
                    if (Objects.equals(toKont.getHid(), kontDTO.getHid())) {
                        mapper.map(kontDTO, toKont);  // update kont, sort can change
                        bindKont(toKont);
                        kontsForHistory.add(toKont);
                        log.info("Add kont to avto from another poezd, kont - {}", toKont.getNkon());
                        dtoToRemove.add(kontDTO);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        if (!dtos.isEmpty()) { // still have conts - may be when remove conts between avto
            dtoToRemove.clear();
            found = false;
            for (KontBindDTO kontDTO : dtos) {
                for (Avto avto : avtos) {
                    for (Kont kont : avto.getKonts()) {
                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                            mapper.map(kontDTO, kont);
                            bindKont(kont);
                            kontsForHistory.add(kont);
                            log.info("Move kont in same avto, kont - {}", kont.getNkon());
                            dtoToRemove.add(kontDTO);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
            }
            dtos.removeAll(dtoToRemove);
        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }

    private List<Gruz> bindGruzs(TreeSet<GruzBindDTO> dtos, Mapper mapper, Set<Vagon> toVags, List<Avto> avtos) {
        // update kont that not moved
        Set<GruzBindDTO> dtoToRemove = new HashSet<>();
        for (GruzBindDTO gruzDTO : dtos) {
            for (Gruz gruz : getGruzs()) {
                if (Objects.equals(gruz.getHid(), gruzDTO.getHid())) {
                    mapper.map(gruzDTO, gruz);  // update gruz, sort can change
                    dtoToRemove.add(gruzDTO);
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        List<Gruz> gruzsForHistory = new ArrayList<>(dtos.size());
        // insert from poezd
        dtoToRemove.clear();
        boolean found = false;
        for (GruzBindDTO gruzDTO : dtos) {
            for (Vagon toVagon : toVags) {// add kont from another poezd
                for (Gruz toGruz : toVagon.getGruzs()) {
                    if (Objects.equals(toGruz.getHid(), gruzDTO.getHid())) {
                        mapper.map(gruzDTO, toGruz);  // update gruz, sort can change
                        bindGruz(toGruz);
                        gruzsForHistory.add(toGruz);
                        log.info("Add gruz to avto from another poezd, gruz - {}", toGruz.getKgvn());
                        dtoToRemove.add(gruzDTO);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    break;
                }
            }
        }
        dtos.removeAll(dtoToRemove);

        if (!dtos.isEmpty()) { // still have gruz - may be when remove gruz between avto
            dtoToRemove.clear();
            found = false;
            for (GruzBindDTO gruzDTO : dtos) {
                for (Avto avto : avtos) {
                    for (Gruz toGruz : avto.getGruzs()) {
                        if (Objects.equals(toGruz.getHid(), gruzDTO.getHid())) {
                            mapper.map(gruzDTO, toGruz);
                            bindGruz(toGruz);
                            gruzsForHistory.add(toGruz);
                            log.info("Move gruz in same avto, gruz - {}", toGruz.getKgvn());
                            dtoToRemove.add(gruzDTO);
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        break;
                    }
                }
            }
            dtos.removeAll(dtoToRemove);
        }

        if (!dtos.isEmpty()) {
            for (GruzBindDTO gruzDTO : dtos) {
                log.warn("gruz {} was not bound, something wrong!!!", gruzDTO.getKgvn());
            }
        }
        return gruzsForHistory;
    }

    public String getDocType() {
        String docType = "";
        for (AvtoFiles avtoFiles: getAvtoFiles())
            if (StringUtils.isNotBlank(avtoFiles.getNum())) {
                docType = avtoFiles.getNum();
                break;
        }
        return docType;
    }

    public Set<KontGruzHistory> getHistory() {
        return history;
    }

    public void setHistory(Set<KontGruzHistory> history) {
        this.history = history;
    }

    public Long getMessCount() {
        return messCount;
    }

    public void setMessCount(Long messCount) {
        this.messCount = messCount;
    }

    @Override
    public Set<BoardTalkNewMess> getBoardTalkNewMesses() {
        return boardTalkNewMesses;
    }

    public void setBoardTalkNewMesses(Set<BoardTalkNewMess> boardTalkNewMesses) {
        this.boardTalkNewMesses = boardTalkNewMesses;
    }

    public long getNewMessCount() {
        return newMessCount;
    }

    @Override
    public void setNewMessCount(long newMessCount) {
        this.newMessCount = newMessCount;
    }


    public enum FilterFields {
        NO_AVTO("no_avto"),
        NO_TRAIL("no_trail"),
        DRIVER_FIO("driver_fio"),
        STARTDATE("startDate"),
        NKON("nkon");
        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public String getNo_zayav() {
        return no_zayav;
    }

    public void setNo_zayav(String no_zayav) {
        this.no_zayav = no_zayav;
    }

    public Set<AvtoFiles> getAvtoFiles() {
        return avtoFiles;
    }

    public void setAvtoFiles(Set<AvtoFiles> avtoFiles) {
        this.avtoFiles = avtoFiles;
    }

    public String getRet_nkon() {
        return ret_nkon;
    }

    public void setRet_nkon(String ret_nkon) {
        this.ret_nkon = ret_nkon;
    }

    public String getDriver_fio() {
        return driver_fio;
    }

    public void setDriver_fio(String driver_fio) {
        this.driver_fio = driver_fio;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    @Override
    public String getDocName() {
        switch (direction) {
            case 1:
                return "avto2in";
            case 2:
                return "avto2out";
            default:
                return null;
        }
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

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }


    public Set<Kont> getKonts() {
        return konts;
    }

    public void setKonts(Set<Kont> konts) {
        this.konts = konts;
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

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Date getDotp() {
        return dotp;
    }

    public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public String getDriver_pasp() {
        return driver_pasp;
    }

    public void setDriver_pasp(String driver_pasp) {
        this.driver_pasp = driver_pasp;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getDeparture() {
        return departure;
    }

    public void setDeparture(String departure) {
        this.departure = departure;
    }

    public String getPol_cargo() {
        return pol_cargo;
    }

    public void setPol_cargo(String pol_cargo) {
        this.pol_cargo = pol_cargo;
    }

    public String getOtp_cargo() {
        return otp_cargo;
    }

    public void setOtp_cargo(String otp_cargo) {
        this.otp_cargo = otp_cargo;
    }

    public String getNo_trail() {
        return no_trail;
    }

    public void setNo_trail(String no_trail) {
        this.no_trail = no_trail;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }

    public String getType_avto() {
        return type_avto;
    }

    public void setType_avto(String type_avto) {
        this.type_avto = type_avto;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Set<Gruz> getGruzs() {
        return gruzs;
    }

    public void setGruzs(Set<Gruz> gruzs) {
        this.gruzs = gruzs;
    }

    public Integer getKontCount() {
        return this.getKonts().size();
    }

    public void setKontCount(Integer kontCount) {
        this.kontCount = kontCount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Avto avto = (Avto) o;
        return direction.equals(avto.direction) &&
                naim_sob.equals(avto.naim_sob) &&
//                client.equals(avto.client) &&
                hid.equals(avto.hid) &&
                type_avto.equals(avto.type_avto) &&
                no_avto.equals(avto.no_avto) &&
                no_trail.equals(avto.no_trail) &&
                driver_fio.equals(avto.driver_fio) &&
                otp_cargo.equals(avto.otp_cargo) &&
                pol_cargo.equals(avto.pol_cargo) &&
                departure.equals(avto.departure) &&
                destination.equals(avto.destination) &&
                driver_pasp.equals(avto.driver_pasp) &&
                dprb.equals(avto.dprb) &&
                dotp.equals(avto.dotp) &&
                prim.equals(avto.prim) &&
                un.equals(avto.un) &&
                dattr.equals(avto.dattr) &&
                trans.equals(avto.trans) &&
                altered.equals(avto.altered) &&
//                kontCount.equals(avto.kontCount) &&
                ret_nkon.equals(avto.ret_nkon);
    }

    @Override
    public int hashCode() {
        return Objects.hash(direction, naim_sob, hid, type_avto, no_avto, no_trail, driver_fio, otp_cargo, pol_cargo, departure, destination, driver_pasp, dprb, dotp, prim, un, dattr, trans, altered, ret_nkon);
    }
}
