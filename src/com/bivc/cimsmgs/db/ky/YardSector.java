package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.db.UsrGroupsDir;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.YardSectorDTO;
import com.bivc.cimsmgs.dto.ky2.YardBindDTO;
import com.bivc.cimsmgs.dto.ky2.YardSectorBindDTO;
import com.fasterxml.jackson.annotation.JsonFilter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.util.*;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("yardSectorFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class YardSector implements Serializable {

    private static final Logger log = LoggerFactory.getLogger(YardSector.class);

    private Integer hid;
    private Route route;
    private String name;
    private String descr;
    private Set<Yard> yards = new HashSet<Yard>(0);
    private Set<YardSectorGroups> yardSectorGroups = new HashSet<>(0);
    private Set<KontGruzHistory> history = new TreeSet<>();
    private Integer typeView = 1;

    public Integer getTypeView() {
        return typeView;
    }

    public void setTypeView(Integer typeView) {
        this.typeView = typeView;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Set<KontGruzHistory> getHistory() {
        return history;
    }

    public void setHistory(Set<KontGruzHistory> history) {
        this.history = history;
    }

    public Set<YardSectorGroups> getYardSectorGroups() {
        return yardSectorGroups;
    }

    public void setYardSectorGroups(Set<YardSectorGroups> yardSectorGroups) {
        this.yardSectorGroups = yardSectorGroups;
    }

    public YardSector() {
    }

    public YardSector(Integer hid, String name) {
        this.hid = hid;
        this.name = name;
    }

    public YardSector(Integer hid, String name, String descr, Set<Yard> yards) {
        this.hid = hid;
        this.name = name;
        this.descr = descr;
        this.yards = yards;
    }

    public Integer getHid() {
        return this.hid;
    }

    public void setHid(Integer hid) {
        this.hid = hid;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescr() {
        return this.descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Set<Yard> getYards() {
        return this.yards;
    }

    public void setYards(Set<Yard> kontYards) {
        this.yards = kontYards;
    }

    public Map<String, List<?>> bindYardToYard(YardSectorBindDTO yardSectorBindDTO, Mapper mapper, List<YardSector> yardSectors) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("rejectedKonts", new ArrayList<Kont>());

        for (YardBindDTO yardBindDTO : yardSectorBindDTO.getYards()) {
            for (Yard yard : getYards()) {
                if (Objects.equals(yard.getHid(), yardBindDTO.getHid())) {
//                    mapper.map(yardBindDTO, yard); // update
                    /*List<Kont> konts*/
                    Map<String, List<?>> results = yard.bindKonts(yardBindDTO.getKonts(), mapper, yardSectors);
                    ((List<Kont>) contGruz4History.get("konts")).addAll(((List<Kont>) results.get("konts")));
                    ((List<Kont>) contGruz4History.get("rejectedKonts")).addAll(((List<Kont>) results.get("rejectedKonts")));
                    break;
                }
            }
        }
        return contGruz4History;
    }

    public Map<String, List<?>> bindYardToPoezd(YardSectorBindDTO yardSectorBindDTO, Set<Vagon> vagons, Mapper mapper, List<YardSector> yardSectors) {
        Map<String, List<?>> contGruz4History = new HashMap<>(2);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("rejectedKonts", new ArrayList<Kont>());

        for (YardBindDTO yardBindDTO : yardSectorBindDTO.getYards()) {
            for (Yard yard : getYards()) {
                if (Objects.equals(yard.getHid(), yardBindDTO.getHid())) {
//                    mapper.map(yardBindDTO, yard); // update
                    /*List<Kont> konts*/
                    Map<String, List<?>> results = yard.bindKonts(yardBindDTO.getKonts(), mapper, vagons, yardSectors);
                    ((List<Kont>) contGruz4History.get("konts")).addAll(((List<Kont>) results.get("konts")));
                    ((List<Kont>) contGruz4History.get("rejectedKonts")).addAll(((List<Kont>) results.get("rejectedKonts")));
                    break;
                }
            }
        }

        /*for (YardBindDTO yardBindDTO : yardSectorBindDTO.getYards()) {
            if (yardBindDTO.getHid() != null) {
                for (Yard yard : getYards()) {
                    if (Objects.equals(yard.getHid(), yardBindDTO.getHid())) {
                        yard.bindKonts(yardBindDTO.getKonts(), mapper, vagons);
                        break;
                    }
                }
            } else { // yardsectors without places in UI, we should find free yard for it
                for (Yard yard : getYards()) {
                    if (yard.getKonts().isEmpty()) {  // found empty place
                        boolean found = false;
                        for (KontBindDTO kontBindDTO : yardBindDTO.getKonts()) {  // found only one - one kont in yard
                            found = false;
                            for (Vagon vagon : vagons) {  // let find on poezd
                                for (Kont kont : vagon.getKonts()) {
                                    if (Objects.equals(kont.getHid(), kontBindDTO.getHid())) {
                                        mapper.map(kontBindDTO, kont);  // update kont, sort can change
                                        yard.getKonts().add(kont);
                                        kont.setYard(yard);
                                        kont.setVagon(null);
                                        kont.setAvto(null);
                                        log.info("Empty place bind to kont from poezd, kont - {}", kont.getNkon());
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

                        if (!found) { // let try in yard sectors, can be when move cont between yard sectors
                            for (KontBindDTO kontBindDTO : yardBindDTO.getKonts()) {
                                found = false;
                                for (YardSector yardSector : yardSectors) {
                                    for (Yard yard1 : yardSector.getYards()) {
                                        for (Kont kont : yard1.getKonts()) {
                                            if (Objects.equals(kont.getHid(), kontBindDTO.getHid())) {  // 1 kont on yard
                                                mapper.map(kontBindDTO, kont);  // update kont, sort can change
                                                yard.getKonts().add(kont);
                                                kont.setYard(yard);
                                                kont.setVagon(null);
                                                kont.setAvto(null);
                                                log.info("Empty place bind to kont from yard, kont - {}", kont.getNkon());
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
                                if (found) {
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
            }
        }*/
        return contGruz4History;
    }

    public Map<String, List<?>> bindYardToAvto(YardSectorBindDTO yardSectorBindDTO, Avto avto, Mapper mapper, List<YardSector> yardSectors) {
        Map<String, List<?>> contGruz4History = new HashMap<>(1);
        contGruz4History.put("konts", new ArrayList<Kont>());
        contGruz4History.put("rejectedKonts", new ArrayList<Kont>());


        for (YardBindDTO yardBindDTO : yardSectorBindDTO.getYards()) {
            for (Yard yard : getYards()) {
                if (Objects.equals(yard.getHid(), yardBindDTO.getHid())) {
//                    mapper.map(yardBindDTO, yard); // update
                    Map<String, List<?>> results =  yard.bindKonts(yardBindDTO.getKonts(), mapper, avto, yardSectors);
                    ((List<Kont>) contGruz4History.get("konts")).addAll(((List<Kont>) results.get("konts")));
                    ((List<Kont>) contGruz4History.get("rejectedKonts")).addAll(((List<Kont>) results.get("rejectedKonts")));
                    break;
                }
            }
        }

        return contGruz4History;
    }

    public Set<YardSectorGroups> buildGroups(YardSectorDTO dto) {
        Set<YardSectorGroups> yardSectorGroups = new HashSet<>();
        if (dto.getGroups() != null) {
            getYardSectorGroups().clear();
            UsrGroupsDir group;
            YardSectorGroups yardSectorGroup;
            StringTokenizer st = new StringTokenizer(dto.getGroups());
            while (st.hasMoreTokens()) {
                group = new UsrGroupsDir(st.nextToken());
                yardSectorGroup = new YardSectorGroups(new YardSectorGroupsId(getHid(), group.getName()), this, group);
                yardSectorGroups.add(yardSectorGroup);
            }
        }
        return yardSectorGroups;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        YardSector that = (YardSector) o;
        return hid.equals(that.hid) &&
                name.equals(that.name) &&
                typeView.equals(that.typeView) &&
                descr.equals(that.descr);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, name, descr, typeView);
    }
}
