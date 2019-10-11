package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.KontBindDTO;
import com.bivc.cimsmgs.dto.ky2.KontDTO;
import com.bivc.cimsmgs.dto.ky2.KontViewDTO;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("yardFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Yard implements Serializable {

    private static final Logger log = LoggerFactory.getLogger(Yard.class);

    private Long hid;
    private YardSector sector;
    private Long x;
    private Long y;
    private Long z;
    private String notes;
//	private Date dateRev;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date altered;

    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dattr;
    private String trans;
    private String un;
    private Set<Kont> konts = new TreeSet<>();
    private boolean empty;

    /*@JsonInclude(JsonInclude.Include.ALWAYS)*/
    private Kont kont;
    private Set<KontGruzHistory> history = new TreeSet<>();

    public Set<KontGruzHistory> getHistory() {
        return history;
    }

    public void setHistory(Set<KontGruzHistory> history) {
        this.history = history;
    }

    public Set<Kont> getKonts() {
        return konts;
    }

    public void setKonts(Set<Kont> konts) {
        this.konts = konts;
    }

    public List<Kont> updateKonts(Set<KontViewDTO> dtos, Mapper mapper) {
        // delete
        Set<Kont> kontsToRemove = new HashSet<>();
        for(Kont kont: getKonts()){
            boolean found = false;
            for(KontDTO kontDTO : dtos){
                if(Objects.equals(kont.getHid(), kontDTO.getHid())){
                    found = true;
                    break;
                }
            }
            if(!found){
                kontsToRemove.add(kont);
            }
        }
        for(Kont kont: kontsToRemove){
            removeKont(kont);
        }

        // update
        Set<KontDTO> kontDtoToRemove = new HashSet<>();
        for(Kont kont: getKonts()){
            for(KontDTO kontIntoDTO : dtos){
                if(Objects.equals(kont.getHid(), kontIntoDTO.getHid())){
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
        for(KontDTO kontIntoDTO : dtos){
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
        kont.setYard(this);
        return kont;
    }

    public void removeKont(Kont kont) {
        konts.remove(kont);
        kont.setYard(null);
    }


    public List<Kont> bindKonts(TreeSet<KontBindDTO> dtos, Mapper mapper, Set<Vagon> toVags, List<YardSector> yardSectors) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
//                    log.info("Update kont in yard - {}", kont.getNkon());
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
                        log.info("Add kont to yard from another poezd, kont - {}", toKont.getNkon());
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

        if (!dtos.isEmpty()) { // still have conts - may be when remove conts between yards or yardsectores
            dtoToRemove.clear();
            found = false;
            for (KontBindDTO kontDTO : dtos) {
                for (YardSector yardSector : yardSectors) {
                    for (Yard yard : yardSector.getYards()) {
                        for (Kont kont : yard.getKonts()) {
                            if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                                mapper.map(kontDTO, kont);
                                bindKont(kont);
                                kontsForHistory.add(kont);
                                log.info("Move kont in same yard, kont - {}", kont.getNkon());
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
        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }

    public List<Kont> bindKonts(TreeSet<KontBindDTO> dtos, Mapper mapper, Avto toAvto, List<YardSector> yardSectors) {
        // update kont that not moved
        Set<KontBindDTO> dtoToRemove = new HashSet<>();
        for (KontBindDTO kontDTO : dtos) {
            for (Kont kont : getKonts()) {
                if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                    mapper.map(kontDTO, kont);  // update kont, sort can change
//                    log.info("Update kont in yard - {}", kont.getNkon());
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
                for (Kont toKont : toAvto.getKonts()) {
                    if (Objects.equals(toKont.getHid(), kontDTO.getHid())) {
                        mapper.map(kontDTO, toKont);  // update kont, sort can change
                        bindKont(toKont);
                        kontsForHistory.add(toKont);
                        log.info("Add kont to yard from another poezd, kont - {}", toKont.getNkon());
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

        if (!dtos.isEmpty()) { // still have conts - may be when remove conts between yards or yardsectores
            dtoToRemove.clear();
            found = false;
            for (KontBindDTO kontDTO : dtos) {
                for (YardSector yardSector : yardSectors) {
                    for (Yard yard : yardSector.getYards()) {
                        for (Kont kont : yard.getKonts()) {
                            if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                                mapper.map(kontDTO, kont);
                                bindKont(kont);
                                kontsForHistory.add(kont);
                                log.info("Move kont in same yard, kont - {}", kont.getNkon());
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
        }

        if (!dtos.isEmpty()) {
            for (KontBindDTO kontDTO : dtos) {
                log.warn("Kont {} was not bound, something wrong!!!", kontDTO.getNkon());
            }
        }
        return kontsForHistory;
    }

    private Kont bindKont(Kont kont) {
        kont.setYard(this);
        kont.setVagon(null);
        kont.setAvto(null);
        return kont;
    }

    public enum FilterFields {
        SECTOR("hid"),
        X("x"),
        Y("y"),
        Z("z"),
        PLACE("place"),
        NKON("nkon"),
        STARTDATE("startDate"),
        ENDDATE("endDate"),
        NPPRM("npprm"),
        GRUZOTPR("gruzotpr")
        ;
        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "kont"/*, "sector"*/);
    }

    public Kont getKont() {
        return kont;
    }

    public void setKont(Kont kont) {
        this.kont = kont;
    }

    public boolean isEmpty() {
        return empty;
    }

    public void setEmpty(boolean empty) {
        this.empty = empty;
    }

    public Yard() {
    }

    public Yard(Long hid, YardSector yardSector, Long x, Long y, Long z, Date altered, Date dattr, String trans, String un) {
        this.hid = hid;
        this.sector = yardSector;
        this.x = x;
        this.y = y;
        this.z = z;
        this.altered = altered;
        this.dattr = dattr;
        this.trans = trans;
        this.un = un;
    }

    public Yard(Long hid, YardSector yardSector, Long x, Long y, Long z, String notes, /*Date dateRev,*/ Date altered, Date dattr, String trans,
                String un, /*Set<Kont> konts, */Kont kont, boolean empty) {
        this.hid = hid;
        this.sector = yardSector;
        this.x = x;
        this.y = y;
        this.z = z;
        this.notes = notes;
//		this.dateRev = dateRev;
        this.altered = altered;
        this.dattr = dattr;
        this.trans = trans;
        this.un = un;
        this.kont = kont;
        this.empty = empty;
    }

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public YardSector getSector() {
        return this.sector;
    }

    public void setSector(YardSector yardSector) {
        this.sector = yardSector;
    }

    public Long getX() {
        return this.x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return this.y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public Long getZ() {
        return this.z;
    }

    public void setZ(Long z) {
        this.z = z;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

	/*public Date getDateRev() {
		return this.dateRev;
	}

	public void setDateRev(Date dateRev) {
		this.dateRev = dateRev;
	}*/

    public Date getAltered() {
        return this.altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public Date getDattr() {
        return this.dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getTrans() {
        return this.trans;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public String getUn() {
        return this.un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    /*public void unbindKont() {
		getKont().makeYardPalceEmpty();

       *//* getKont().setYard(null);
        getKont().setDatKyInto(null);*//*
        getKont().setDatKyOut(null);
        getKont().setStatus(new KontStatus((byte)1));
        *//*setKont(null);
        setEmpty(true);*//*
    }*/

   /* public void bindKont(Kont kont) {
        setKont(kont);
        setEmpty(false);
        kont.setYard(this);
        kont.setDatKyInto(new Date());
        kont.setStatus(new KontStatus((byte)2));
    }*/

	/*public Set<Kont> getKonts() {
		return this.konts;
	}

	public void setKonts(Set<Kont> konts) {
		this.konts = konts;
	}*/

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Yard yard = (Yard) o;
        return empty == yard.empty &&
                hid.equals(yard.hid) &&
                x.equals(yard.x) &&
                y.equals(yard.y) &&
                z.equals(yard.z) &&
                notes.equals(yard.notes) &&
                altered.equals(yard.altered) &&
                dattr.equals(yard.dattr) &&
                trans.equals(yard.trans) &&
                un.equals(yard.un);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, x, y, z, notes, altered, dattr, trans, un, empty);
    }
}
