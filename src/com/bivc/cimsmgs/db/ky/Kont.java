package com.bivc.cimsmgs.db.ky;

// Generated 19.02.2014 14:19:48 by Hibernate Tools 3.4.0.CR1

import com.bivc.cimsmgs.doc2doc.orika.Mapper;
import com.bivc.cimsmgs.dto.ky2.GruzDTO;
import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import java.io.Serializable;
import java.util.*;

/*@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@JsonFilter("kontFilter")
@JsonInclude(JsonInclude.Include.NON_NULL)*/
public class Kont implements Serializable, Comparable<Kont> {

    private Long hid;
    private KontStatus status;
    private KontStatus prevStatus;
    private Vagon vagon;
    private Yard yard;
   /* private Poezd poezdOut;
    private Vagon vagonInto;
    private Yard yard;
    private Vagon vagonOut;
    private Poezd poezdInto;*/
    private String trans;
//    private Set<KontStatusHistory> kontStatusHistory;
    private Long massa_tar;
    private Float pod_sila;
    private String type;
    private String vid;
    private String prizn_sob;
    private String naim_sob;
    private String gruzotpr;

    private Date teh_obsl;

    private Long ky_x;
    private Long ky_y;
    private Long ky_z;
    private String ky_sector;
    private Avto avto;
//    private Avto avtoInto;*/

    private Date dattr;

    private String un;

    private Date altered;

    private String nkon;

    private Date dprb;

    private Date dprbDate;

    private Date dprbTime;

    private Date dotp;

    private Date dotpDate;

    private Date dotpTime;

    private String storeKy;
    private Boolean poruz;
    private Byte sort;
    private Set<Gruz> gruzs = new TreeSet<>();
//    private Set<Plomb> plombs = new TreeSet<>();
    private String prim;
    private Date dyard;
    private NsiKyOwners owner;
    private String punkt_otpr;
    private String punkt_nazn;

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

    /*public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }*/

    public Date getDyard() {
        return dyard;
    }

    public void setDyard(Date dyard) {
        this.dyard = dyard;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public Date getDprb() {
        return dprb;
    }

    public Date getDotp() {
        return dotp;
    }

    public Avto getAvto() {
        return avto;
    }

    public void setAvto(Avto avto) {
        this.avto = avto;
    }

    /*public Date getDateAvtoOut() {
        return dateAvtoOut;
    }

    public void setDateAvtoOut(Date dateAvtoOut) {
        this.dateAvtoOut = dateAvtoOut;
    }

    public Date getDateAvtoInto() {
        return dateAvtoInto;
    }

    public void setDateAvtoInto(Date dateAvtoInto) {
        this.dateAvtoInto = dateAvtoInto;
    }

    public Date getDatePoezdOut() {
        return datePoezdOut;
    }

    public void setDatePoezdOut(Date datePoezdOut) {
        this.datePoezdOut = datePoezdOut;
    }

    public Date getDatePoezdInto() {
        return datePoezdInto;
    }

    public void setDatePoezdInto(Date datePoezdInto) {
        this.datePoezdInto = datePoezdInto;
    }

    public Date getDateNoTransp() {
        return dateNoTransp;
    }

    public void setDateNoTransp(Date dateNoTransp) {
        this.dateNoTransp = dateNoTransp;
    }

    public Date getDateCancel() {
        return dateCancel;
    }

    public void setDateCancel(Date dateCancel) {
        this.dateCancel = dateCancel;
    }

    public Date getDateYard() {
        return dateYard;
    }

    public void setDateYard(Date dateYard) {
        this.dateYard = dateYard;
    }*/

    /*public Avto getAvtoInto() {
        return avtoInto;
    }

    public void setAvtoInto(Avto avtoInto) {
        this.avtoInto = avtoInto;
    }

    public Avto getAvtoOut() {
        return avtoOut;
    }

    public void setAvtoOut(Avto avtoOut) {
        this.avtoOut = avtoOut;
    }*/

    /*public static enum KontLocation {
        POEZD_INTO,
        POEZD_OUT,
        NO_TRANSP,
        AUTO,
        YARD,
        All,
        UNDEFINED
    }*/

    public String getKy_sector() {
        return ky_sector;
    }

    public void setKy_sector(String ky_sector) {
        this.ky_sector = ky_sector;
    }

    public Long getKy_z() {
        return ky_z;
    }

    public void setKy_z(Long ky_z) {
        this.ky_z = ky_z;
    }

    public Long getKy_y() {
        return ky_y;
    }

    public void setKy_y(Long ky_y) {
        this.ky_y = ky_y;
    }

    public Long getKy_x() {
        return ky_x;
    }

    public void setKy_x(Long ky_x) {
        this.ky_x = ky_x;
    }

    public KontStatus getPrevStatus() {
        return prevStatus;
    }

    public void setPrevStatus(KontStatus prevStatus) {
        this.prevStatus = prevStatus;
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
                    break;
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
        gruz.setVagon(null);
    }

    public Vagon getVagon() {
        return vagon;
    }

    public void setVagon(Vagon vagon) {
        this.vagon = vagon;
    }

    public NsiKyOwners getOwner() {
        return owner;
    }

    public void setOwner(NsiKyOwners owner) {
        this.owner = owner;
    }

    public void unbindGruzy() {

    }

    public Yard getYard() {
        return yard;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public enum FilterFields {
        NKON("nkon"),
        NPPR("nppr"),
        KY_Y("ky_y"),
        KY_SECTOR("ky_sector"),
        NO_AVTO("no_avto");

        private final String name;

        FilterFields(String name) {
            this.name = name;
        }

        public String getName() {
            return name;
        }
    }

    public Date getTeh_obsl() {
        return teh_obsl;
    }

    public void setTeh_obsl(Date teh_obsl) {
        this.teh_obsl = teh_obsl;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }

    public String getNaim_sob() {
        return naim_sob;
    }

    public void setNaim_sob(String naim_sob) {
        this.naim_sob = naim_sob;
    }

    public String getPrizn_sob() {
        return prizn_sob;
    }

    public void setPrizn_sob(String prizn_sob) {
        this.prizn_sob = prizn_sob;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Float getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(Float pod_sila) {
        this.pod_sila = pod_sila;
    }

    public Long getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(Long massa_tar) {
        this.massa_tar = massa_tar;
    }

    /*public Set<KontStatusHistory> getKontStatusHistory() {
        return kontStatusHistory;
    }

    public void setKontStatusHistory(Set<KontStatusHistory> kontStatusHistory) {
        this.kontStatusHistory = kontStatusHistory;
    }*/

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toStringExclude(this, "gruzs", "plombs", "poezd", "status");
    }


    public Kont() {
    }

    public Kont(Long hid) {
        this.hid = hid;
    }

    /*public Kont(Long hid, Poezd poezdOut, Vagon vagonInto, Yard kontYard,
                Vagon vagonOut, Poezd poezdInto, String trans, Date dattr, String un, Date altered, String nkon, Date dprb,
                Date dotp, String storeKy, Boolean poruz, Byte sort, Set<Gruz> gruzs, Set<Plomb> plombs) {
        this.hid = hid;
//		this.status = status;
        this.poezdOut = poezdOut;
        this.vagonInto = vagonInto;
        this.yard = kontYard;
        this.vagonOut = vagonOut;
        this.poezdInto = poezdInto;
        this.trans = trans;
        this.dattr = dattr;
        this.un = un;
        this.altered = altered;
        this.nkon = nkon;
        this.dprb = dprb;
        this.dotp = dotp;
        this.storeKy = storeKy;
        this.poruz = poruz;
        this.sort = sort;
        this.gruzs = gruzs;
        this.plombs = plombs;
    }*/

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public KontStatus getStatus() {
        return this.status;
    }

    public void setStatus(KontStatus status) {
        this.status = status;
    }

    /*public Poezd getPoezdOut() {
        return this.poezdOut;
    }

    public void setPoezdOut(Poezd poezdOut) {
        this.poezdOut = poezdOut;
    }

    public Vagon getVagonInto() {
        return this.vagonInto;
    }

    public void setVagonInto(Vagon vagonInto) {
        this.vagonInto = vagonInto;
    }

    public Yard getYard() {
        return this.yard;
    }

    public void setYard(Yard kontYard) {
        this.yard = kontYard;
    }

    public Vagon getVagonOut() {
        return this.vagonOut;
    }

    public void setVagonOut(Vagon vagonOut) {
        this.vagonOut = vagonOut;
    }

    public Poezd getPoezdInto() {
        return this.poezdInto;
    }

    public void setPoezdInto(Poezd poezdInto) {
        this.poezdInto = poezdInto;
    }*/

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

    public String getNkon() {
        return this.nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }


    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

        public void setDotp(Date dotp) {
        this.dotp = dotp;
    }

    public String getStoreKy() {
        return this.storeKy;
    }

    public void setStoreKy(String storeKy) {
        this.storeKy = storeKy;
    }

    public Boolean getPoruz() {
        return this.poruz;
    }

    public void setPoruz(Boolean poruz) {
        this.poruz = poruz;
    }

    public Byte getSort() {
        return this.sort;
    }

    public void setSort(Byte sort) {
        this.sort = sort;
    }

    public Set<Gruz> getGruzs() {
        return this.gruzs;
    }

    public void setGruzs(Set<Gruz> gruzs) {
        this.gruzs = gruzs;
    }

    /*public Set<Plomb> getPlombs() {
        return this.plombs;
    }

    public void setPlombs(Set<Plomb> plombs) {
        this.plombs = plombs;
    }*/

    public Date getDprbDate() {
        return this.dprbDate != null ? this.dprbDate : this.dprb;
    }

    public void setDprbDate(Date dprbDate) {
        this.dprbDate = dprbDate;
    }

    public Date getDprbTime() {
        return this.dprbTime != null ? this.dprbTime : this.dprb;
    }

    public void setDprbTime(Date dprbTime) {
        this.dprbTime = dprbTime;
    }

    public Date getDotpDate() {
        return this.dotpDate != null ? this.dotpDate : this.dotp;
    }

    public void setDotpDate(Date dotpDate) {
        this.dotpDate = dotpDate;
    }

    public Date getDotpTime() {
        return this.dotpTime != null ? this.dotpTime : this.dotp;
    }

    public void setDotpTime(Date dotpTime) {
        this.dotpTime = dotpTime;
    }

    @Override
    public int compareTo(Kont that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getHid();
        Comparable thatHid = that.getHid();

        if (thisHid == null) {
            return AFTER;
        } else if (thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }

    public Gruz addGruz(Gruz gruz) {
        gruzs.add(gruz);
        gruz.setKont(this);
        return gruz;
    }

    public void removeGruzy() {
        for (Iterator<Gruz> iterator = gruzs.iterator(); iterator.hasNext(); ) {   // avoid ConcurrentModificationException
            Gruz gruz = iterator.next();
            iterator.remove();
            gruz.setKont(null);
        }
    }
}
