package com.bivc.cimsmgs.db;

// Generated 02.03.2009 10:02:24 by Hibernate Tools 3.2.4.CR1

import com.bivc.cimsmgs.formats.json.JsonViews;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonView;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Map;
import java.util.Objects;
import java.util.TreeMap;

@JsonIgnoreProperties({"packDoc","cimSmgs", "handler", "hibernateLazyInitializer"})
//@JsonFilter("vagPropertyFilter")
public class CimSmgsCarList implements Serializable {

	private Long hid;
	private CimSmgs cimSmgs;
	private Date dattr;
	private Date locked;
	private String unLock;
	private String trans;
	private String un;
	private Date arch;
	private Short num;
	private String nvag;
	private String nhmNames;
	private String nhmCodes;
	private Byte rid;
	private String plombs;
	private Long massSend;
	private Long massCalc;
	private Long price;
	private Long priceAdd;
	private Long priceAll;
	private String notes;
	private String g131;
	private String g132;
	private String g132r;
	private String g133;
	private String g134;
	private String g135;
	private String g136;
	private String g136r;
	private String g137;
	private String g137r;
	private String g138;
	private String g139;
	private String g139r;
	private String g1310;
	private String g1311;
	private String g1311r;
	private String g1312;
	private String g1313;
	private String g1314;
	private String g1314r;
	private String g1315;
	private String g1316;
	private String g1317;
	private String g1317r;
	private Long massGross;

    @JsonView(JsonViews.VagPerevozView.class)
	private Map<Integer, CimSmgsGruz> cimSmgsGruzs = new TreeMap<>();

    private Map<Byte, CimSmgsKonList> cimSmgsKonLists = new TreeMap<>();

    @JsonView(JsonViews.VagPerevozView.class)
    private Map<Byte, CimSmgsPlomb> cimSmgsPlombs = new TreeMap<>();

    @JsonView(JsonViews.VagPerevozView.class)
    private Map<Integer, CimSmgsDocs> cimSmgsDocses9 = new TreeMap<>();

	private Byte sort;
	private Byte kodSob;
	private Byte otmKSob;
	private BigDecimal grPod;
	private BigDecimal taraVag;
	private Byte kolOs;
    private String rod;
    private String speed;
    private PackDoc packDoc;
    private String prim;
    private BigDecimal count;
	private String cicternType;
	private Integer scep;
	private String refSecNo;
	private Integer refSecKol;
	private String vagOtm;
    private String nameSob;
    private String klientName;
    private String klientCode;

    public String getKlientCode() {
        return klientCode;
    }

    public void setKlientCode(String klientCode) {
        this.klientCode = klientCode;
    }

    public String getKlientName() {
        return klientName;
    }

    public void setKlientName(String klientName) {
        this.klientName = klientName;
    }

    public String getNameSob() {
        return nameSob;
    }

    public void setNameSob(String nameSob) {
        this.nameSob = nameSob;
    }

	public String getVagOtm() {
		return vagOtm;
	}

	public void setVagOtm(String vagOtm) {
		this.vagOtm = vagOtm;
	}

	public Integer getRefSecKol() {
		return refSecKol;
	}

	public void setRefSecKol(Integer refSecKol) {
		this.refSecKol = refSecKol;
	}

	public String getRefSecNo() {
		return refSecNo;
	}

	public void setRefSecNo(String refSecNo) {
		this.refSecNo = refSecNo;
	}

	public Integer getScep() {
		return scep;
	}

	public void setScep(Integer scep) {
		this.scep = scep;
	}

	public String getCicternType() {
		return cicternType;
	}

	public void setCicternType(String cicternType) {
		this.cicternType = cicternType;
	}

	public CimSmgsCarList(byte sort, CimSmgs parentCimSmgs) {
        this.sort = sort;
        parentCimSmgs.addCimSmgsCarListItem(this);
    }

    public BigDecimal getCount() {
        return count;
    }

    public void setCount(BigDecimal count) {
        this.count = count;
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }
    public void setPackDoc(PackDoc packDoc) {
        this.packDoc = packDoc;
    }

    public String getSpeed() {
        return speed;
    }

    public void setSpeed(String speed) {
        this.speed = speed;
    }

    public String getRod() {
        return rod;
    }

    public void setRod(String rod) {
        this.rod = rod;
    }

    public CimSmgsCarList() {
	}

	public CimSmgsCarList(Long hid) {
		this.hid = hid;
	}

	public CimSmgsCarList(Long hid, CimSmgs cimSmgs, Byte sort) {
		this.hid = hid;
		this.cimSmgs = cimSmgs;
		this.sort = sort;
	}

	public CimSmgsCarList(Long hid, CimSmgs cimSmgs, Date dattr, Date locked, String unLock, String trans, String un, Date arch, Short num,
			String nvag, String nhmNames, String nhmCodes, Byte rid, String plombs, Long massSend, Long massCalc, Long price, Long priceAdd,
			Long priceAll, String notes, String g131, String g132, String g132r, String g133, String g134, String g135, String g136, String g136r,
			String g137, String g137r, String g138, String g139, String g139r, String g1310, String g1311, String g1311r, String g1312, String g1313,
			String g1314, String g1314r, String g1315, String g1316, String g1317, String g1317r, Long massGross,
			Map<Integer, CimSmgsGruz> cimSmgsGruzs, Map<Byte, CimSmgsKonList> cimSmgsKonLists, Byte sort, Byte kodSob, Byte otmKSob, BigDecimal grPod,
			BigDecimal taraVag, Byte kolOs) {
		this.hid = hid;
		this.kodSob = kodSob;
		this.otmKSob = otmKSob;
		this.grPod = grPod;
		this.taraVag = taraVag;
		this.kolOs = kolOs;
		this.cimSmgs = cimSmgs;
		this.dattr = dattr;
		this.locked = locked;
		this.unLock = unLock;
		this.trans = trans;
		this.un = un;
		this.arch = arch;
		this.num = num;
		this.nvag = nvag;
		this.nhmNames = nhmNames;
		this.nhmCodes = nhmCodes;
		this.rid = rid;
		this.plombs = plombs;
		this.massSend = massSend;
		this.massCalc = massCalc;
		this.price = price;
		this.priceAdd = priceAdd;
		this.priceAll = priceAll;
		this.notes = notes;
		this.g131 = g131;
		this.g132 = g132;
		this.g132r = g132r;
		this.g133 = g133;
		this.g134 = g134;
		this.g135 = g135;
		this.g136 = g136;
		this.g136r = g136r;
		this.g137 = g137;
		this.g137r = g137r;
		this.g138 = g138;
		this.g139 = g139;
		this.g139r = g139r;
		this.g1310 = g1310;
		this.g1311 = g1311;
		this.g1311r = g1311r;
		this.g1312 = g1312;
		this.g1313 = g1313;
		this.g1314 = g1314;
		this.g1314r = g1314r;
		this.g1315 = g1315;
		this.g1316 = g1316;
		this.g1317 = g1317;
		this.g1317r = g1317r;
		this.massGross = massGross;
		this.cimSmgsGruzs = cimSmgsGruzs;
		this.cimSmgsKonLists = cimSmgsKonLists;
		this.sort = sort;
	}

	public Long getHid() {
		return this.hid;
	}

	public void setHid(Long hid) {
		this.hid = hid;
	}

	@JsonBackReference
	public CimSmgs getCimSmgs() {
		return this.cimSmgs;
	}

	@JsonBackReference
	public void setCimSmgs(CimSmgs cimSmgs) {
		this.cimSmgs = cimSmgs;
	}

	public Date getDattr() {
		return this.dattr;
	}

	public void setDattr(Date dattr) {
		this.dattr = dattr;
	}

	public Date getLocked() {
		return this.locked;
	}

	public void setLocked(Date locked) {
		this.locked = locked;
	}

	public String getUnLock() {
		return this.unLock;
	}

	public void setUnLock(String unLock) {
		this.unLock = unLock;
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

	public Date getArch() {
		return this.arch;
	}

	public void setArch(Date arch) {
		this.arch = arch;
	}

	public Short getNum() {
		return this.num;
	}

	public void setNum(Short num) {
		this.num = num;
	}

	public String getNvag() {
		return this.nvag;
	}

	public void setNvag(String nvag) {
		this.nvag = nvag;
	}

	public String getNhmNames() {
		return this.nhmNames;
	}

	public void setNhmNames(String nhmNames) {
		this.nhmNames = nhmNames;
	}

	public String getNhmCodes() {
		return this.nhmCodes;
	}

	public void setNhmCodes(String nhmCodes) {
		this.nhmCodes = nhmCodes;
	}

	public Byte getRid() {
		return this.rid;
	}

	public void setRid(Byte rid) {
		// this.rid = rid == 1 ? (byte)1 : null;
		this.rid = rid;
	}

	public String getPlombs() {
		return this.plombs;
	}

	public void setPlombs(String plombs) {
		this.plombs = plombs;
	}

	public Long getMassSend() {
		return this.massSend;
	}

	public void setMassSend(Long massSend) {
		this.massSend = massSend;
	}

	public Long getMassCalc() {
		return this.massCalc;
	}

	public void setMassCalc(Long massCalc) {
		this.massCalc = massCalc;
	}

	public Long getPrice() {
		return this.price;
	}

	public void setPrice(Long price) {
		this.price = price;
	}

	public Long getPriceAdd() {
		return this.priceAdd;
	}

	public void setPriceAdd(Long priceAdd) {
		this.priceAdd = priceAdd;
	}

	public Long getPriceAll() {
		return this.priceAll;
	}

	public void setPriceAll(Long priceAll) {
		this.priceAll = priceAll;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getG131() {
		return this.g131;
	}

	public void setG131(String g131) {
		this.g131 = g131;
	}

	public String getG132() {
		return this.g132;
	}

	public void setG132(String g132) {
		this.g132 = g132;
	}

	public String getG132r() {
		return this.g132r;
	}

	public void setG132r(String g132r) {
		this.g132r = g132r;
	}

	public String getG133() {
		return this.g133;
	}

	public void setG133(String g133) {
		this.g133 = g133;
	}

	public String getG134() {
		return this.g134;
	}

	public void setG134(String g134) {
		this.g134 = g134;
	}

	public String getG135() {
		return this.g135;
	}

	public void setG135(String g135) {
		this.g135 = g135;
	}

	public String getG136() {
		return this.g136;
	}

	public void setG136(String g136) {
		this.g136 = g136;
	}

	public String getG136r() {
		return this.g136r;
	}

	public void setG136r(String g136r) {
		this.g136r = g136r;
	}

	public String getG137() {
		return this.g137;
	}

	public void setG137(String g137) {
		this.g137 = g137;
	}

	public String getG137r() {
		return this.g137r;
	}

	public void setG137r(String g137r) {
		this.g137r = g137r;
	}

	public String getG138() {
		return this.g138;
	}

	public void setG138(String g138) {
		this.g138 = g138;
	}

	public String getG139() {
		return this.g139;
	}

	public void setG139(String g139) {
		this.g139 = g139;
	}

	public String getG139r() {
		return this.g139r;
	}

	public void setG139r(String g139r) {
		this.g139r = g139r;
	}

	public String getG1310() {
		return this.g1310;
	}

	public void setG1310(String g1310) {
		this.g1310 = g1310;
	}

	public String getG1311() {
		return this.g1311;
	}

	public void setG1311(String g1311) {
		this.g1311 = g1311;
	}

	public String getG1311r() {
		return this.g1311r;
	}

	public void setG1311r(String g1311r) {
		this.g1311r = g1311r;
	}

	public String getG1312() {
		return this.g1312;
	}

	public void setG1312(String g1312) {
		this.g1312 = g1312;
	}

	public String getG1313() {
		return this.g1313;
	}

	public void setG1313(String g1313) {
		this.g1313 = g1313;
	}

	public String getG1314() {
		return this.g1314;
	}

	public void setG1314(String g1314) {
		this.g1314 = g1314;
	}

	public String getG1314r() {
		return this.g1314r;
	}

	public void setG1314r(String g1314r) {
		this.g1314r = g1314r;
	}

	public String getG1315() {
		return this.g1315;
	}

	public void setG1315(String g1315) {
		this.g1315 = g1315;
	}

	public String getG1316() {
		return this.g1316;
	}

	public void setG1316(String g1316) {
		this.g1316 = g1316;
	}

	public String getG1317() {
		return this.g1317;
	}

	public void setG1317(String g1317) {
		this.g1317 = g1317;
	}

	public String getG1317r() {
		return this.g1317r;
	}

	public void setG1317r(String g1317r) {
		this.g1317r = g1317r;
	}

	public Long getMassGross() {
		return this.massGross;
	}

	public void setMassGross(Long massGross) {
		this.massGross = massGross;
	}

	public Map<Integer, CimSmgsGruz> getCimSmgsGruzs() {
		return this.cimSmgsGruzs;
	}

	public void setCimSmgsGruzs(Map<Integer, CimSmgsGruz> cimSmgsGruzs) {
		this.cimSmgsGruzs = cimSmgsGruzs;
	}

	public Map<Byte, CimSmgsKonList> getCimSmgsKonLists() {
		return this.cimSmgsKonLists;
	}

	public Byte getSort() {
		return sort;
	}

	public Byte getKodSob() {
		return kodSob;
	}

	public Byte getOtmKSob() {
		return otmKSob;
	}

	public BigDecimal getGrPod() {
		return grPod;
	}

	public BigDecimal getTaraVag() {
		return taraVag;
	}

	public Byte getKolOs() {
		return kolOs;
	}

	public void setCimSmgsKonLists(Map<Byte, CimSmgsKonList> cimSmgsKonLists) {
		this.cimSmgsKonLists = cimSmgsKonLists;
	}

	public void setSort(Byte sort) {
		this.sort = sort;
	}

	public void setKodSob(Byte kodSob) {
		this.kodSob = kodSob;
	}

	public void setOtmKSob(Byte otmKSob) {
		this.otmKSob = otmKSob;
	}

	public void setGrPod(BigDecimal grPod) {
		this.grPod = grPod;
	}

	public void setTaraVag(BigDecimal taraVag) {
		this.taraVag = taraVag;
	}

	public void setKolOs(Byte kolOs) {
		this.kolOs = kolOs;
	}

	public String toString() {
		return new ToStringBuilder(this).append("hid", hid).append("name", nvag).toString();
	}

	public void addCimSmgsGruzs() {
		for (CimSmgsGruz gruz : cimSmgsGruzs.values()) {
			gruz.setCimSmgsCarList(this);
            gruz.addCimSmgsDanGruzs();
		}
	}

    public void addCimSmgsDocs9() {
        CimSmgs cimSmgs = this.getCimSmgs();
        for (CimSmgsDocs doc : cimSmgsDocses9.values()) {
            int index = cimSmgs.getCimSmgsDocses9().size();
            doc.setSort(index);
            doc.setCimSmgsCarList(this);
            doc.setCimSmgs(cimSmgs);
            cimSmgs.getCimSmgsDocses9().put(index, doc);
        }
    }

    void addCimSmgsPlombs() {
        CimSmgs cimSmgs = this.getCimSmgs();
        for (CimSmgsPlomb plomb : cimSmgsPlombs.values()) {
            byte index = (byte) cimSmgs.getCimSmgsPlombs().size();
            plomb.setSort(index);
            plomb.setCimSmgsCarList(this);
            plomb.setCimSmgs(cimSmgs);
            cimSmgs.getCimSmgsPlombs().put(index, plomb);
        }
    }

     /*void addCimSmgsDocs9() {
        CimSmgs cimSmgs = this.getCimSmgsCarList().getCimSmgs();
        for (CimSmgsDocs doc : cimSmgsDocses9.values()) {
            byte index = (byte) cimSmgs.getCimSmgsDocses9().size();
            doc.setSort(index);
            doc.setCimSmgsKonList(this);
            doc.setCimSmgs(cimSmgs);
            cimSmgs.getCimSmgsDocses9().put(index, doc);
        }
    }*/

	public void addCimSmgsKonLists() {
		for (CimSmgsKonList kon : cimSmgsKonLists.values()) {
			kon.setCimSmgsCarList(this);
			kon.addCimSmgsGruzs();
            kon.addCimSmgsDocs9();
            kon.addCimSmgsPlombs();
		}
	}

	public void addCimSmgsKonListItem(CimSmgsKonList csk) {
		if (csk != null) {
			csk.setCimSmgsCarList(this);
			cimSmgsKonLists.put(csk.getSort(), csk);
		}
	}

	public void addCimSmgsGruzItem(CimSmgsGruz csg) {
		if (csg != null) {
			csg.setCimSmgsCarList(this);
			cimSmgsGruzs.put(csg.getSort(), csg);
		}
	}

	public void addCimSmgsPlombItem(CimSmgsPlomb plomb) {
		if (plomb != null) {
			plomb.setCimSmgsCarList(this);
			cimSmgsPlombs.put(plomb.getSort(), plomb);
		}
	}

	public void addCimSmgsDocsItem(CimSmgsDocs csd) {
		if (csd != null) {
			csd.setCimSmgsCarList(this);
			if (csd.getSort() == null) {
				csd.setSort(cimSmgsDocses9.size());
			}
			cimSmgsDocses9.put(csd.getSort(), csd);
		}
	}

	public String vag4CimSmgs() {
		StringBuffer result = new StringBuffer("");
		result.append("№ вагона/Wagen Nr&nbsp;&nbsp;&nbsp;");
		result.append(nvag != null ? nvag : "");
		result.append("<br/>");
		result.append("Тоннаж/Tragwagenfaeigkeit&nbsp;&nbsp;&nbsp;");
		result.append(grPod != null ? grPod : "");
		result.append("<br/>");
		result.append("Тара/Tara&nbsp;&nbsp;&nbsp;");
		result.append(taraVag != null ? taraVag : "");
		result.append("<br/>");
		result.append("Оси/Achse&nbsp;&nbsp;&nbsp;");
		result.append(kolOs != null ? kolOs : "");
		return result.toString();
	}

    public String vag4CimSmgs1() {
        StringBuffer result = new StringBuffer("");
        result.append(nvag != null ? nvag : "");
        if(StringUtils.isNotBlank(rod)){
            if(result.length() > 0){
                result.append("; ");
            }
            result.append(rod);
        }

        if(StringUtils.isNotBlank(klientName)){
            if(result.length() > 0){
                result.append("; ");
            }
            result.append(klientName);
        }

        if(StringUtils.isNotBlank(vagOtm)){
            if(result.length() > 0){
                result.append("; ");
            }
            result.append(vagOtm);
        }

        return result.toString();
    }

    public boolean hasKont() {
        return MapUtils.isNotEmpty(getCimSmgsKonLists());
    }

    public CimSmgsKonList findOrCreateKont() {
        return hasKont() ? getCimSmgsKonLists().values().iterator().next() : new CimSmgsKonList((byte) 0, this);
    }

    public Map<Byte, CimSmgsPlomb> getCimSmgsPlombs() {
        return cimSmgsPlombs;
    }

    public void setCimSmgsPlombs(Map<Byte, CimSmgsPlomb> cimSmgsPlombs) {
        this.cimSmgsPlombs = cimSmgsPlombs;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgsCarList that = (CimSmgsCarList) o;
        return Objects.equals(hid, that.hid) &&
                Objects.equals(cimSmgs != null ? cimSmgs.getHid() : "", that.cimSmgs != null ? that.cimSmgs.getHid() : "") &&
                Objects.equals(trans, that.trans) &&
                Objects.equals(un, that.un) &&
                Objects.equals(num, that.num) &&
                Objects.equals(nvag, that.nvag) &&
                Objects.equals(nhmNames, that.nhmNames) &&
                Objects.equals(nhmCodes, that.nhmCodes) &&
                Objects.equals(rid, that.rid) &&
                Objects.equals(plombs, that.plombs) &&
                Objects.equals(massSend, that.massSend) &&
                Objects.equals(massCalc, that.massCalc) &&
                Objects.equals(price, that.price) &&
                Objects.equals(priceAdd, that.priceAdd) &&
                Objects.equals(priceAll, that.priceAll) &&
                Objects.equals(notes, that.notes) &&
                Objects.equals(g131, that.g131) &&
                Objects.equals(g132, that.g132) &&
                Objects.equals(g132r, that.g132r) &&
                Objects.equals(g133, that.g133) &&
                Objects.equals(g134, that.g134) &&
                Objects.equals(g135, that.g135) &&
                Objects.equals(g136, that.g136) &&
                Objects.equals(g136r, that.g136r) &&
                Objects.equals(g137, that.g137) &&
                Objects.equals(g137r, that.g137r) &&
                Objects.equals(g138, that.g138) &&
                Objects.equals(g139, that.g139) &&
                Objects.equals(g139r, that.g139r) &&
                Objects.equals(g1310, that.g1310) &&
                Objects.equals(g1311, that.g1311) &&
                Objects.equals(g1311r, that.g1311r) &&
                Objects.equals(g1312, that.g1312) &&
                Objects.equals(g1313, that.g1313) &&
                Objects.equals(g1314, that.g1314) &&
                Objects.equals(g1314r, that.g1314r) &&
                Objects.equals(g1315, that.g1315) &&
                Objects.equals(g1316, that.g1316) &&
                Objects.equals(g1317, that.g1317) &&
                Objects.equals(g1317r, that.g1317r) &&
                Objects.equals(massGross, that.massGross) &&
                Objects.equals(sort, that.sort) &&
                Objects.equals(kodSob, that.kodSob) &&
                Objects.equals(otmKSob, that.otmKSob) &&
                Objects.equals(grPod, that.grPod) &&
                Objects.equals(taraVag, that.taraVag) &&
                Objects.equals(kolOs, that.kolOs) &&
                Objects.equals(rod, that.rod) &&
                Objects.equals(speed, that.speed) &&
                Objects.equals(packDoc != null ? packDoc.getHid() : "", that.packDoc != null ?  that.packDoc.getHid() : "") &&
                Objects.equals(prim, that.prim) &&
                Objects.equals(count, that.count) &&
                Objects.equals(cicternType, that.cicternType) &&
                Objects.equals(scep, that.scep) &&
                Objects.equals(refSecNo, that.refSecNo) &&
                Objects.equals(refSecKol, that.refSecKol) &&
                Objects.equals(vagOtm, that.vagOtm) &&
                Objects.equals(nameSob, that.nameSob) &&
                Objects.equals(klientName, that.klientName) &&
                Objects.equals(klientCode, that.klientCode);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, cimSmgs != null ? cimSmgs.getHid() : "", trans, un, num, nvag, nhmNames, nhmCodes, rid, plombs, massSend, massCalc, price, priceAdd, priceAll, notes, g131, g132,
                g132r, g133, g134, g135, g136, g136r, g137, g137r, g138, g139, g139r, g1310, g1311, g1311r, g1312, g1313, g1314, g1314r, g1315, g1316, g1317, g1317r, massGross, sort,
                kodSob, otmKSob, grPod, taraVag, kolOs, rod, speed, packDoc != null ? packDoc.getHid() : "", prim, count, cicternType, scep, refSecNo, refSecKol, vagOtm, nameSob, klientName, klientCode);
    }

    public Map<Integer, CimSmgsDocs> getCimSmgsDocses9() {
        return cimSmgsDocses9;
    }

    public void setCimSmgsDocses9(Map<Integer, CimSmgsDocs> cimSmgsDocses9) {
        this.cimSmgsDocses9 = cimSmgsDocses9;
    }
}
