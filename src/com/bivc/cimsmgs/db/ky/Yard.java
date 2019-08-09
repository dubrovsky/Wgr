package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.KontBindDTO;
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

    public Set<Kont> getKonts() {
        return konts;
    }

    public void setKonts(Set<Kont> konts) {
        this.konts = konts;
    }

    public void bindKonts(TreeSet<KontBindDTO> dtos, Mapper mapper, Set<Vagon> toVags) {
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

        // insert
        dtoToRemove.clear();
        boolean found = false;
        for (KontBindDTO kontDTO : dtos) {
            for (Vagon toVagon : toVags) {// add kont from another poezd
                for (Kont toKont : toVagon.getKonts()) {
                    if (Objects.equals(toKont.getHid(), kontDTO.getHid())) {
                        mapper.map(kontDTO, toKont);  // update kont, sort can change
                        bindKont(toKont);
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

        if (!dtos.isEmpty()) { // still have conts - may be when remove cont in same poesd between vagons
            found = false;
            for (KontBindDTO kontDTO : dtos) {
                for (Yard yard : getSector().getYards()) {
                    for (Kont kont : yard.getKonts()) {
                        if (Objects.equals(kont.getHid(), kontDTO.getHid())) {
                            mapper.map(kontDTO, kont);
                            bindKont(kont);
                            log.info("Move kont in same yard, kont - {}", kont.getNkon());
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
    }

    private Kont bindKont(Kont kont) {
        kont.setYard(this);
        kont.setVagon(null);
        kont.setYard(null);
        kont.setAvto(null);
        return kont;
    }

    public enum FilterFields {
        SECTOR("hid"),
        X("x"),
        Y("y"),
        Z("z"),
        PLACE("place"),
        NKON("nkon");
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

}
