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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.persistence.Transient;
import java.util.*;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class AvtoZayav implements BoardMessenger {
    private static final Logger log = LoggerFactory.getLogger(AvtoZayav.class);

    private Byte direction;
    private Route route;
    private PackDoc packDoc;
    private Long hid;
    private String no_zayav;
    private String no_avto;
    private String no_trail;
    private String driver_fio;
    private String driver_pasp;
    private String prim;
    private Client client;
//    private String transport;
//    @JsonSerialize(using = DateTimeSerializer.class)
    @JsonSerialize(using = DateTimeSerializer.class)
    private Date dateZayav;
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
    private Integer kontCountDone;
    private Long messCount;
    private Set<BoardTalkNewMess> boardTalkNewMesses = new TreeSet<>();
    private long newMessCount;

    public Long getMessCount() {
        return messCount;
    }

    public void setMessCount(Long messCount) {
        this.messCount = messCount;
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
                    kont.setIsZayav(Byte.parseByte("1"));
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
            kont.setIsZayav(Byte.parseByte("1"));
            kont.updateClient(kontIntoDTO, clientDAO);
            addKont(kont);
            kontsForHistory.add(kont);
            kont.updateGruzs(kontIntoDTO.getGruzs(), mapper, clientDAO);
            kont.updatePlombs(kontIntoDTO.getPlombs(), mapper);
        }
        return kontsForHistory;
    }

    public Kont addKont(Kont kont) {
        konts.add(kont);
        kont.setAvtoZayav(this);
        kont.setIsZayav(Byte.valueOf("1"));
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
        gruz.setAvtoZayav(this);
        return gruz;
    }


    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getDriver_pasp() {
        return driver_pasp;
    }

    public void setDriver_pasp(String driver_pasp) {
        this.driver_pasp = driver_pasp;
    }

    public Set<AvtoFiles> getAvtoFiles() {
        return avtoFiles;
    }

    public void setAvtoFiles(Set<AvtoFiles> avtoFiles) {
        this.avtoFiles = avtoFiles;
    }

    public String getNo_avto() {
        return no_avto;
    }

    public void setNo_avto(String no_avto) {
        this.no_avto = no_avto;
    }

    public String getNo_trail() {
        return no_trail;
    }

    public void setNo_trail(String no_trail) {
        this.no_trail = no_trail;
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

    public Date getDateZayav() {
        return dateZayav;
    }

    public void setDateZayav(Date dateZayav) {
        this.dateZayav = dateZayav;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    @Override
    public String getDocName() {
        return "avtoZayav2";
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

    public String getNo_zayav() {
        return no_zayav;
    }

    public void setNo_zayav(String no_zayav) {
        this.no_zayav = no_zayav;
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

    @Transient
    public Long getRouteHid(){
        return getRoute() != null ? getRoute().getHid() : null;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AvtoZayav avtoZayav = (AvtoZayav) o;
        return direction.equals(avtoZayav.direction) &&
                hid.equals(avtoZayav.hid) &&
                no_zayav.equals(avtoZayav.no_zayav) &&
                no_avto.equals(avtoZayav.no_avto) &&
                no_trail.equals(avtoZayav.no_trail) &&
                driver_fio.equals(avtoZayav.driver_fio) &&
//                client.equals(avtoZayav.client) &&
                dateZayav.equals(avtoZayav.dateZayav) &&
                un.equals(avtoZayav.un) &&
                dattr.equals(avtoZayav.dattr) &&
                trans.equals(avtoZayav.trans) &&
                altered.equals(avtoZayav.altered);
    }

    @Override
    public int hashCode() {
        return Objects.hash(direction, hid, no_zayav, no_avto, no_trail, driver_fio,  dateZayav, un, dattr, trans, altered);
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
}
