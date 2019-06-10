package com.bivc.cimsmgs.db;

// Generated 01.12.2011 15:57:16 by Hibernate Tools 3.4.0.CR1

//import com.isc.be.convertors.orika.OrikaConfig;
//import com.isc.be.dto.vedper.VedPerNaklDTO;

import com.bivc.cimsmgs.commons.myUser;
import com.opensymphony.xwork2.util.CreateIfNull;
import com.opensymphony.xwork2.util.Element;
import com.opensymphony.xwork2.util.Key;
import com.opensymphony.xwork2.util.KeyProperty;

import java.io.Serializable;
import java.util.*;

public class Ved implements Serializable {

	private Long hid;
//	private Long id;
//	private Long vhid;
//	private Long vedvag;
//	private Long vedvagEid;
	private String un;
	private String num;
	private Date dattr;
	private Date altered;
	private Date crdate;
	private String train;
	private String trainname;
	private String railoutn;
	private String stnoutc;
	private String stnoutn;
	private String railinn;
	private String stninc;
	private String stninn;
	private String carroutc;
	private String carroutn;
	private String carrinc;
	private String carrinn;
    private Set<VedVag> vags = new HashSet<>(0);
    private List<VedVag> vedVag = new ArrayList<VedVag>();


//	private Date dtout;
//	private Date dtin;
//	private String fioout;
//	private String fioin;
//	private String perevozn;
//    private Integer koleja;
//    private Set<VedPerNakl> nakls = new HashSet<>();
//    private Set<VedPerVag> vags = new HashSet<>();
//    private Set<VedPerPlomb> plombs = new HashSet<>();
//    private Set<VedPerGruz> gruzy = new HashSet<>();
//    private String stoutcP;
//    private String stoutnP;
//    private String stincP;
//    private String stinnP;
//    private Integer type;


    public Date getCrdate() {
        return crdate;
    }

    public void setCrdate(Date crdate) {
        this.crdate = crdate;
    }

    public List<VedVag> getVedVag() {
        return vedVag;
    }

    public void setVedVag(List<VedVag> vedVag) {
        this.vedVag = vedVag;
    }

    public Set<VedVag> getVags() {
        return vags;
    }

    public void setVags(Set<VedVag> vags) {
        this.vags = vags;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public String getTrain() {
        return train;
    }

    public void setTrain(String train) {
        this.train = train;
    }

    public String getTrainname() {
        return trainname;
    }

    public void setTrainname(String trainname) {
        this.trainname = trainname;
    }

    public String getRailoutn() {
        return railoutn;
    }

    public void setRailoutn(String railoutn) {
        this.railoutn = railoutn;
    }

    public String getStnoutc() {
        return stnoutc;
    }

    public void setStnoutc(String stnoutc) {
        this.stnoutc = stnoutc;
    }

    public String getStnoutn() {
        return stnoutn;
    }

    public void setStnoutn(String stnoutn) {
        this.stnoutn = stnoutn;
    }

    public String getRailinn() {
        return railinn;
    }

    public void setRailinn(String railinn) {
        this.railinn = railinn;
    }

    public String getStninc() {
        return stninc;
    }

    public void setStninc(String stninc) {
        this.stninc = stninc;
    }

    public String getStninn() {
        return stninn;
    }

    public void setStninn(String stninn) {
        this.stninn = stninn;
    }

    public String getCarroutc() {
        return carroutc;
    }

    public void setCarroutc(String carroutc) {
        this.carroutc = carroutc;
    }

    public String getCarroutn() {
        return carroutn;
    }

    public void setCarroutn(String carroutn) {
        this.carroutn = carroutn;
    }

    public String getCarrinc() {
        return carrinc;
    }

    public void setCarrinc(String carrinc) {
        this.carrinc = carrinc;
    }

    public String getCarrinn() {
        return carrinn;
    }

    public void setCarrinn(String carrinn) {
        this.carrinn = carrinn;
    }

    public void prepare4save(myUser user) {
        setUn(user.getUsername());
        setDattr(new Date());
    }

    public void prepareVags4Save() {
//        this.vedVagSet =  new HashSet<>(vedVag);
        for(VedVag vag: vedVag){
            vag.setHidVed(this.getHid());
            vags.add(vag);
        }
    }

//    public Integer getType() {
//        return type;
//    }
//
//    public void setType(Integer type) {
//        this.type = type;
//    }
//
//    public String getStinnP() {
//        return stinnP;
//    }
//
//    public void setStinnP(String stinnP) {
//        this.stinnP = stinnP;
//    }
//
//    public String getStincP() {
//        return stincP;
//    }
//
//    public void setStincP(String stincP) {
//        this.stincP = stincP;
//    }
//
//    public String getStoutnP() {
//        return stoutnP;
//    }
//
//    public void setStoutnP(String stoutnP) {
//        this.stoutnP = stoutnP;
//    }
//
//    public String getStoutcP() {
//        return stoutcP;
//    }
//
//    public void setStoutcP(String stoutcP) {
//        this.stoutcP = stoutcP;
//    }
//
//    public Set<VedPerGruz> getGruzy() {
//        return gruzy;
//    }
//
//    public void setGruzy(Set<VedPerGruz> gruzy) {
//        this.gruzy = gruzy;
//    }
//
//    public Set<VedPerNakl> getNakls() {
//        return nakls;
//    }
//
//    public void setNakls(Set<VedPerNakl> nakls) {
//        this.nakls = nakls;
//    }
//
//    public Set<VedPerPlomb> getPlombs() {
//        return plombs;
//    }
//
//    public void setPlombs(Set<VedPerPlomb> plombs) {
//        this.plombs = plombs;
//    }
//
//    public Set<VedPerVag> getVags() {
//        return vags;
//    }
//
//    public void setVags(Set<VedPerVag> vags) {
//        this.vags = vags;
//    }
//
//	public Ved(Long hid) {
//        this.hid = hid;
//	}
//
//    public Ved() {
//    }
//
//    public Long getVedvagEid() {
//        return vedvagEid;
//    }
//
//    public void setVedvagEid(Long vedvagEid) {
//        this.vedvagEid = vedvagEid;
//    }
//
//    public Long getHid() {
//        return hid;
//    }
//
//    public void setHid(Long hid) {
//        this.hid = hid;
//    }
//
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public Long getVhid() {
//        return vhid;
//    }
//
//    public void setVhid(Long vhid) {
//        this.vhid = vhid;
//    }
//
//    public Long getVedvag() {
//        return vedvag;
//    }
//
//    public void setVedvag(Long vedvag) {
//        this.vedvag = vedvag;
//    }
//
//    public String getNum() {
//        return num;
//    }
//
//    public void setNum(String num) {
//        this.num = num;
//    }
//
//    public Date getDt() {
//        return dt;
//    }
//
//    public void setDt(Date dt) {
//        this.dt = dt;
//    }
//
//    public String getTrain() {
//        return train;
//    }
//
//    public void setTrain(String train) {
//        this.train = train;
//    }
//
//    public String getRailout() {
//        return railout;
//    }
//
//    public void setRailout(String railout) {
//        this.railout = railout;
//    }
//
//    public String getStoutc() {
//        return stoutc;
//    }
//
//    public void setStoutc(String stoutc) {
//        this.stoutc = stoutc;
//    }
//
//    public String getStoutn() {
//        return stoutn;
//    }
//
//    public void setStoutn(String stoutn) {
//        this.stoutn = stoutn;
//    }
//
//    public String getRailin() {
//        return railin;
//    }
//
//    public void setRailin(String railin) {
//        this.railin = railin;
//    }
//
//    public String getStinc() {
//        return stinc;
//    }
//
//    public void setStinc(String stinc) {
//        this.stinc = stinc;
//    }
//
//    public String getStinn() {
//        return stinn;
//    }
//
//    public void setStinn(String stinn) {
//        this.stinn = stinn;
//    }
//
//    public Date getDtout() {
//        return dtout;
//    }
//
//    public void setDtout(Date dtout) {
//        this.dtout = dtout;
//    }
//
//    public Date getDtin() {
//        return dtin;
//    }
//
//    public void setDtin(Date dtin) {
//        this.dtin = dtin;
//    }
//
//    public String getFioout() {
//        return fioout;
//    }
//
//    public void setFioout(String fioout) {
//        this.fioout = fioout;
//    }
//
//    public String getFioin() {
//        return fioin;
//    }
//
//    public void setFioin(String fioin) {
//        this.fioin = fioin;
//    }
//
//    public Integer getKoleja() {
//        return koleja;
//    }
//
//    public void setKoleja(Integer koleja) {
//        this.koleja = koleja;
//    }
//
//    public String getPerevozn() {
//        return perevozn;
//    }
//
//    public void setPerevozn(String perevozn) {
//        this.perevozn = perevozn;
//    }
//
//    public void updateNakls(Set<VedPerNaklDTO> dtos) {
//        // delete
//        Set<VedPerNakl> naklsToRemove = new HashSet<>();
//        for(VedPerNakl nakl: getNakls()){
//            boolean found = false;
//            for(VedPerNaklDTO naklDto : dtos){
//                if(Objects.equals(nakl.getHid(), naklDto.getHid())){
//                    found = true;
//                    break;
//                }
//            }
//            if(!found){
//                naklsToRemove.add(nakl);
//            }
//        }
//        for(VedPerNakl vag: naklsToRemove){
//            removeNakl(vag);
//        }
//
//        // update
//        Set<VedPerNaklDTO> dtoToRemove = new HashSet<>();
//        for(VedPerNakl nakl: getNakls()){
//            for(VedPerNaklDTO naklDto : dtos){
//                if(Objects.equals(nakl.getHid(), naklDto.getHid())){
//                    OrikaConfig.getOrikaMapper().map(naklDto, nakl);
//                    nakl.updateVags(naklDto.getVags());
//                    dtoToRemove.add(naklDto);
//                }
//            }
//        }
//        dtos.removeAll(dtoToRemove);
//
//        // insert
//        for(VedPerNaklDTO naklDto : dtos){
//            VedPerNakl nakl = OrikaConfig.getOrikaMapper().map(naklDto, VedPerNakl.class);
//            addNakl(nakl);
//            nakl.updateVags(naklDto.getVags());
//        }
//    }
//
//    private void addNakl(VedPerNakl nakl) {
//        nakls.add(nakl);
//        nakl.setVedPer(this);
//    }
//
//    private void removeNakl(VedPerNakl nakl) {
//        nakl.removeVags();
//        nakls.remove(nakl);
//        nakl.setVedPer(null);
//    }
//
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        VedPer vedPer = (VedPer) o;
//        return Objects.equals(hid, vedPer.hid) &&
//                Objects.equals(id, vedPer.id) &&
//                Objects.equals(vhid, vedPer.vhid) &&
//                Objects.equals(vedvag, vedPer.vedvag) &&
//                Objects.equals(vedvagEid, vedPer.vedvagEid) &&
//                Objects.equals(num, vedPer.num) &&
//                Objects.equals(dt, vedPer.dt) &&
//                Objects.equals(train, vedPer.train) &&
//                Objects.equals(railout, vedPer.railout) &&
//                Objects.equals(stoutc, vedPer.stoutc) &&
//                Objects.equals(stoutn, vedPer.stoutn) &&
//                Objects.equals(railin, vedPer.railin) &&
//                Objects.equals(stinc, vedPer.stinc) &&
//                Objects.equals(stinn, vedPer.stinn) &&
//                Objects.equals(dtout, vedPer.dtout) &&
//                Objects.equals(dtin, vedPer.dtin) &&
//                Objects.equals(fioout, vedPer.fioout) &&
//                Objects.equals(fioin, vedPer.fioin) &&
//                Objects.equals(perevozn, vedPer.perevozn) &&
//                Objects.equals(koleja, vedPer.koleja)&&
//                Objects.equals(type, vedPer.type);
//    }
//
//    @Override
//    public int hashCode() {
//
//        return Objects.hash(hid, id, vhid, vedvag, vedvagEid, num, dt, train, railout, stoutc, stoutn, railin, stinc, stinn, dtout, dtin, fioout, fioin, perevozn, koleja, type);
//    }
}
