package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class Avto {
    private static final Logger log = LoggerFactory.getLogger(Avto.class);

    private Byte direction;
    private Route route;
    private PackDoc packDoc;
    private NsiKyOwners owner;
    private String naim_sob;
    private String client;
    private Long hid;
    private String type_avto;
    private String no_avto;
    private String no_trail;
    private String driver_fio;
    private String otp_cargo;
    private String pol_cargo;
    private String departure;
    private String destination;
    private String driver_nm;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dprb;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dotp;
    private String prim_avto;
    private String un;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    private String trans;
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;
    private Set<Kont> konts = new TreeSet<>();
    private Set<Gruz> gruzs = new TreeSet<>();
    private Integer kontCount;
    private String ret_nkon;
    private Set<KontGruzHistory> history  = new TreeSet<>();


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

    public Map<String, List<?>> bindAvtoToYard(Set<KontBindDTO> kDtos, List<YardSector> yardSectors, Mapper mapper) {
        Map<String, List<?>> contGruz4History = new HashMap<>(1);
        contGruz4History.put("konts", new ArrayList<Kont>());

//        for (VagonBindDTO vagonIntoDTO : dtos) {
//            for (Vagon vagon : getVagons()) {
//                if (Objects.equals(vagon.getHid(), vagonIntoDTO.getHid())) {
//                    mapper.map(vagonIntoDTO, vagon); // update otpravka
        List<Kont> konts = this.bindKontsToYardKonts(kDtos, mapper, yardSectors);
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

    public List<Kont> bindKontsToYardKonts(Set<KontBindDTO> dtos, Mapper mapper, List<YardSector> yardSectors) {
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


    public List<Kont> updateKonts(Set<KontDTO> dtos, Mapper mapper) {
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
//                    if(kontIntoDTO.getOtpravka() == Otpravka.CONT){
//                        kont.updateKonts(kontIntoDTO.getKonts(), mapper);
//                    } else if (kontIntoDTO.getOtpravka() == Otpravka.GRUZ){
                    kont.updateGruzs(kontIntoDTO.getGruzs(), mapper);
                    kont.updatePlombs(kontIntoDTO.getPlombs(), mapper);

//                    } else {  // can be deleted and getOtpravka is null
//                        kont.removeKonts();
//                        kont.removeGruzy();
//                    }

                    kontDtoToRemove.add(kontIntoDTO);
                }
            }
        }
        dtos.removeAll(kontDtoToRemove);

        List<Kont> kontsForHistory = new ArrayList<>(dtos.size());
        // insert
        for (KontDTO kontIntoDTO : dtos) {
            Kont kont = mapper.map(kontIntoDTO, Kont.class);
            addKont(kont);
            kontsForHistory.add(kont);
//            if(vagonIntoDTO.getOtpravka() == Otpravka.CONT){
//                vagon.updateKonts(vagonIntoDTO.getKonts(), mapper);
//            } else if(vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
            kont.updateGruzs(kontIntoDTO.getGruzs(), mapper);
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

    public Set<KontGruzHistory> getHistory() {
        return history;
    }

    public void setHistory(Set<KontGruzHistory> history) {
        this.history = history;
    }


    public enum FilterFields {
        NO_AVTO("no_avto");
        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
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

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
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

    public String getPrim_avto() {
        return prim_avto;
    }

    public void setPrim_avto(String prim_avto) {
        this.prim_avto = prim_avto;
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

    public String getDriver_nm() {
        return driver_nm;
    }

    public void setDriver_nm(String driver_nm) {
        this.driver_nm = driver_nm;
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
}
