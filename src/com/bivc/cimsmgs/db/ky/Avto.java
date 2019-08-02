package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.PackDoc;
import com.bivc.cimsmgs.db.Route;
import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.*;
import com.bivc.cimsmgs.formats.json.serializers.DateTimeSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.*;

/**
 * Created by vva on 29.12.14.
 */

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("avtoFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class Avto {

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
        if (gruz.getAvto() == null || !gruz.getAvto().getHid().equals(getHid())) {  // bind only another vagon
            gruz.setAvto(this);
        }
        return gruz;
    }

    private void unbindKont(Kont kont) {
        if (kont.getAvto() != null && kont.getAvto().getHid().equals(hid)) {  // unbind only this vagon
            kont.setAvto(null);
        }

    }

    public Kont bindKont(Kont kont) {
        if (kont.getAvto() == null || !kont.getAvto().getHid().equals(getHid())) {// bind only another vagon
            kont.setAvto(this);
        }
        return kont;
    }


    public void updateKonts(Set<KontDTO> dtos, Mapper mapper) {
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
//                    } else {  // can be deleted and getOtpravka is null
//                        kont.removeKonts();
//                        kont.removeGruzy();
//                    }

                    kontDtoToRemove.add(kontIntoDTO);
                }
            }
        }
        dtos.removeAll(kontDtoToRemove);

        // insert
        for(KontDTO kontIntoDTO : dtos){
            Kont kont = mapper.map(kontIntoDTO, Kont.class);
            addKont(kont);
//            if(vagonIntoDTO.getOtpravka() == Otpravka.CONT){
//                vagon.updateKonts(vagonIntoDTO.getKonts(), mapper);
//            } else if(vagonIntoDTO.getOtpravka() == Otpravka.GRUZ) {
                kont.updateGruzs(kontIntoDTO.getGruzs(), mapper);
//            }
        }
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

    public void updateGruzs(TreeSet<GruzDTO> dtos, Mapper mapper) {
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

        // insert
        for (GruzDTO gruzDto : dtos) {
            Gruz gruz = mapper.map(gruzDto, Gruz.class);
            addGruz(gruz);
        }
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
}
