package com.bivc.cimsmgs.db;

import com.bivc.cimsmgs.commons.money2str;
import com.bivc.cimsmgs.commons.myUser;
import com.bivc.cimsmgs.formats.json.JsonViews;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonView;
import com.opensymphony.xwork2.ActionSupport;
import org.apache.commons.collections4.MapUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.LoggerFactory;

import javax.persistence.Entity;
import java.io.Serializable;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

// ignore ActionSupport props
@JsonIgnoreProperties({"iftminLogs", "iftminLogsBtlc", "tdgLog", "tbc2Logs", "csComnt", "cimSmgs", "cimSmgses", "packDoc", "route", "statuses", "docType1", "type",
        "actionErrors", "actionMessages", "errorMessages", "fieldErrors", "errors", "texts", "locale"})
//@JsonFilter("cimSmgsPropertyFilter")
@Entity
public class CimSmgs extends ActionSupport implements Serializable, BoardMessenger {
    public static final BigDecimal EPD_DOC_TYPE_HID = new BigDecimal(0);
    public static final String DOC_TYPE_HID_PROP_NAME = "docType1";
    public static final byte EPD_DOC_TYPE = 0;

    public final static String LIST_DOP_RU = "см. Лист дополнений";
//    public final static String LIST_DOP_RU = "см. Лист доплнений";

    //    @JsonSerialize(include = JsonSerialize.Inclusion.ALWAYS)
    @JsonInclude
    private Long hid;

    private CimSmgs cimSmgs;
    private String g1;
    private String g2;
    private String g3;
    private String g4;
    private String g5;
    private String g6;
    private String g7;
    private String g8;
    private String g9;
    private String g10;
    private String g11;
    private String g12;
    private String g13;
    private String g141;
    private String g142;
    private String g15;
    private String g16;
    private String g161;
    private String g17;
    private String g18;
    private String g181;
    private String g19;
    private String g20;
    private Byte g21;
    private String g21_;
    private Byte g22;
    private String g22_;
    private String g23;
    private String g24;
    private Byte g25;
    private String g26;
    private String g27;
    private String g28;
    private Date g281;
    private String g29;
    private String g30;
    private Date g301;
    private Date arch;
    private String un;
    private String trans;
    private Date dattr;
    private Date locked;
    private String unLock;
    private String g40;
    private String g44;
    private String g191;
    private String g192;
    private String g193;
    private String g48;
    private String g41;
    private String g45;
    private String ga491;
    private String gb491;
    private String ga492;
    private String gb492;
    private String ga493;
    private String gb493;
    private String ga494;
    private String gb494;
    private String ga50;
    private String gb50;
    private String ga52;
    private String gb52;
    private String ga51;
    private String gb51;
    private String ga53;
    private String gb53;
    private String ga54;
    private String gb54;
    private String ga55;
    private String gb55;
    private String ga56;
    private String gb56;
    private String ga57;
    private String gb57;
    private String g591;
    private String g592;
    private String g593;
    private String g594;
    private String g595;
    private String g596;
    private String g597;
    private String g598;
    private String g60;
    private String g61;
    private String g611;
    private String g612;
    private String g43;
    private String g47;
    private String g63;
    private String g64;
    private String g65;
    private String g651;
    private String g652;
    private String ga66;
    private Byte gb661;
    private String gb662;
    private Date g67;
    private String g691;
    private String g692;
    private String g693;
    private String g694;
    private String g68;
    private String g62;
    private String g621;
    private String g622;
    private String g38;
    private String g39;
    private String g18B1;
    private String g18B2;
    private String ga581;
    private String gb581;
    private String ga582;
    private String gb582;
    private String ga583;
    private String gb583;
    private String ga584;
    private String gb584;
    private String ga585;
    private String gb585;
    private String ga586;
    private String gb586;
    private String g20100;
    private String g42;
    private String g46;
    private String g11_1;
    private String g12_1;
    private String g13_1;
    private String g41_1;
    private String g42_1;
    private String g43_1;
    private BigDecimal hidCim;
    private BigDecimal hidIcf;
    private BigDecimal hidSp;
    private Long hidSmgs;
    private Long iftminId;
    private Date iftminOut;
    private Date iftminIn;
    private Long iftminId2;
    private Date iftminOut2;
    private Date iftminIn2;
    private String g121;
    private BigDecimal g24N;
    private BigDecimal g24T;
    private BigDecimal g24B;
    private String statusBr;
    private Date altered;
    private String g1r;
    private String g14;
    private String g4r;
    private String g7r;
    private String g9r;
    private String g101;
    private String g101r;
    private String g102;
    private String g102r;
    private String g13r;
    private String g15r;
    private String g162;
    private String g162r;
    private String g163;
    private String g163r;
    private String g18r;
    private String g29r;
    private String profile;
    private String targGr;
    private String avFields;
    private Byte g1c;
    private Byte g4c;
    private Byte g7c;
    private Byte g9c;
    private Byte g13c;
    private Byte g15c;
    private Byte g18c;
    private Byte g20c;
    private String numClaim;
    private String g15_1;
    private String g16_1;
    private String g16r;
    private String g17_1;
    private String g18_1;
    private String g18r_1;
    private String g19_1;
    private String g19r;
    private String g45_1;
    private String g46_1;
    private String g46r;
    private String g47_1;
    private String g48_1;
    private String g48r;
    private String g49;
    private String g49r;
    private String g201;
    private String g202;
    private String g202r;
    private String g203;
    private String g204;
    private String g205;
    private String g206;
    private String g206r;
    private String g207;
    private String g207r;
    private String g208;
    private String g209;
    private String g209r;
    private String g2010;
    private String g2011;
    private String g2012;
    private String g2013;
    private String g2014;
    private String g2014r;
    private String g2015;
    private String g2016;
    private String g2017;
    private String g2017r;
    private String g2011r;
    private String g110;
    private String g111;
    private String g112;
    private String g410;
    private String g411;
    private String g412;
    private String ready;
    private String g171;
    private String g2018;
    private String g2018r;
    private String g_10_3r;
    private String g_16_33r;
    private String g1_dop_info;
    private String g4_dop_info;
    private String g16_dop_info;
    private String vagVedNum;

    private Map<Integer, CimSmgsDocs> cimSmgsDocses7 = new TreeMap<>();

    @JsonView(JsonViews.DefaultPerevozView.class)
    private Map<Integer, CimSmgsDocs> cimSmgsDocses9 = new TreeMap<>();

    private Map<Integer, CimSmgsDocs> cimSmgsDocses13 = new TreeMap<>();
    private Map<Byte, CimSmgsCarList> cimSmgsCarLists = new TreeMap<Byte, CimSmgsCarList>();
    //	private List<CimSmgsCarList> vags = new ArrayList<CimSmgsCarList>();
    private Map<Byte, CimSmgsPlatel> cimSmgsPlatels = new TreeMap<Byte, CimSmgsPlatel>();

    @JsonView(JsonViews.DefaultPerevozView.class)
    private Map<Byte, CimSmgsPlomb> cimSmgsPlombs = new TreeMap<Byte, CimSmgsPlomb>();
    private Map<Byte, CimSmgsPerevoz> cimSmgsPerevoz = new TreeMap<>();

    //	private Map<Byte, CimSmgsStatusAllowed> cimSmgsStatusAlloweds = new TreeMap<Byte, CimSmgsStatusAllowed>();
//
//	private Set<CimSmgsStatus> cimSmgsStatuses = new HashSet<CimSmgsStatus>(0);
//	private Set<CimSmgsScan> cimSmgsScans = new HashSet<CimSmgsScan>(0);
//    private Set<BIftminLog> BIftminLogs = new HashSet<BIftminLog>(0);
    private Set<TdgLog> tdgLog = new HashSet<>(0);
    private Set<Tbc2Log> tbc2Logs = new HashSet<>(0);
    //	private Set<CimSmgsInvoice> invoices = new HashSet<CimSmgsInvoice>(0);
    private Set<CsComnt> csComnt = /*new HashSet<CsComnt>(0)*/null;
    private Set<CimSmgs> cimSmgses = new HashSet<CimSmgs>(0);
    //    private Set<CimSmgsInvoiceBrief> invoicesBrief = new HashSet<CimSmgsInvoiceBrief>(0);
    private Set<Status> statuses = new HashSet<Status>(0);

    private String g44_1;
    private Byte status;
    private Byte btlc_status;
    private Byte tdg_status1;
    private Byte tdg_status2;
    private Set<BIftminLog> iftminLogsBtlc = new HashSet<BIftminLog>();
    private Set<BIftminLog> iftminLogs = new HashSet<BIftminLog>();
    private Byte greenRail_status;
    private String zayav_otpr;
    private Byte zayav_otpr_c;
    private Byte g141c;
    private Byte g26c;
    private String ga661;
    private String ga662;

    //    private String g23a;
    private String g23b;
    private String g74_1;
    private String g74_2;
    private Byte type;
    private String gs_48;
    private Byte gs_22;
    private String gs_24;
    private String gs_141_1;
    private Date gs_141_2;
    private String gs_66_1;

    private String g18B1a;
    private String g18B1b;
    private String g18B1c;
    private String g18B1d;
    private Long amount;

    private String aviso_num;
    private Date aviso_dat;
    private Date aviso_cod_dat;
    private BigDecimal aviso_stavka;
    private String g11_prim;
    private String g_1_5k;
    private String g_4_5k;
    private Route route;
    private PackDoc packDoc;
    private String g4prim;
    private String guInf;
    private String perevozchik;
    private String tarifShema;
    private String tarifVOtpr;
    private Long platezhKm;
    private Long platezhRub;
    private String platezhKop;
    private String provozPlata;
    private String zpuInfo;
    private String trueInfo;
    //    private String zajavNo;
    private String vizaNo;
    private String perevozSign;
    private Date perevozDate;
    private String sborCennost1;
    private String sborCennost2;
    private String otprItogo;
    private String tbcNomer;
    private Byte tbcStatus = (byte) 0;
    private String zakazNo;
    private Byte cim;
    private Byte incoterms;
    private String kodUslPost;
    private Byte frankofracht;
    private String otmPoluch;
    private Byte vidKontOtpr;
    private String platform;
    private String docNum;
    private String tehUslG12;
    private String grOtpFio;
    private String g104;
    private String g164;
    private String npoezd;
    //    private String konPrim;
    private String vagPrim;
    private String nettoPref;
    private String taraPref;
    private String bruttoPref;
    private String kontKol;
    private String g2_1;
    private String g5_1;
    private BigDecimal docType1;
    private String plat;
    private String plat1;
    private Byte gu;
    private String sborCennost11;
    private String sborCennost21;
    private String sborCennost22;
    private String ftsNomer;
    private Byte ftsStatus = (byte) 0;
    private String zpuInfo1;
    private String index_p;
    private String n_ppv;
    private Integer nppr;
    private Date dprb;
    private String g_2inn;
    private String g_5inn;
    private String ftsDocId;
    private Map<Integer, CimSmgsDocs> cimSmgsDocses136 = new TreeMap<>();
    private String g_24_bcn;
    private String g36;
    private String g25Txt;
    private String g2_;
    private String g5_;
    private String n_packet;
    private String g7_;
    private String g3_;
    private Integer sort;
    private Integer kind;
    private String send_br;
    private Character src;
    private Long messCount;
    private Set<BoardTalkNewMess> boardTalkNewMesses = new TreeSet<>();
    private long newMessCount;
    private String btsNomer;

    public String getBtsNomer() {
        return btsNomer;
    }

    public void setBtsNomer(String btsNomer) {
        this.btsNomer = btsNomer;
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

    public Long getMessCount() {
        return messCount;
    }

    public void setMessCount(Long messCount) {
        this.messCount = messCount;
    }

    public String getVagVedNum() {
        return vagVedNum;
    }

    public void setVagVedNum(String vagVedNum) {
        this.vagVedNum = vagVedNum;
    }

    public String getGa662() {
        return ga662;
    }

    public void setGa662(String ga662) {
        this.ga662 = ga662;
    }

    public String getGa661() {
        return ga661;
    }

    public void setGa661(String ga661) {
        this.ga661 = ga661;
    }

    public Byte getG26c() {
        return g26c;
    }

    public void setG26c(Byte g26c) {
        this.g26c = g26c;
    }

    public Byte getG141c() {
        return g141c;
    }

    public void setG141c(Byte g141c) {
        this.g141c = g141c;
    }

    public Byte getZayav_otpr_c() {
        return zayav_otpr_c;
    }

    public void setZayav_otpr_c(Byte zayav_otpr_c) {
        this.zayav_otpr_c = zayav_otpr_c;
    }

    public String getZayav_otpr() {
        return zayav_otpr;
    }

    public void setZayav_otpr(String zayav_otpr) {
        this.zayav_otpr = zayav_otpr;
    }

    public Map<Byte, CimSmgsPerevoz> getCimSmgsPerevoz() {
        return cimSmgsPerevoz;
    }

    public void setCimSmgsPerevoz(Map<Byte, CimSmgsPerevoz> cimSmgsPerevoz) {
        this.cimSmgsPerevoz = cimSmgsPerevoz;
    }

    public Set<BIftminLog> getIftminLogs() {
        return iftminLogs;
    }

    public void setIftminLogs(Set<BIftminLog> iftminLogs) {
        this.iftminLogs = iftminLogs;
    }

    public Set<BIftminLog> getIftminLogsBtlc() {
        return iftminLogsBtlc;
    }

    public void setIftminLogsBtlc(Set<BIftminLog> iftminLogsBtlc) {
        this.iftminLogsBtlc = iftminLogsBtlc;
    }

    public Byte getTdg_status1() {
        return tdg_status1;
    }

    public void setTdg_status1(Byte tdg_status1) {
        this.tdg_status1 = tdg_status1;
    }

    public Byte getTdg_status2() {
        return tdg_status2;
    }

    public void setTdg_status2(Byte tdg_status2) {
        this.tdg_status2 = tdg_status2;
    }

    public Byte getBtlc_status() {
        return btlc_status;
    }

    public void setBtlc_status(Byte btlc_status) {
        this.btlc_status = btlc_status;
    }


    public Character getSrc() {
        return src;
    }

    public void setSrc(Character src) {
        this.src = src;
    }

    public String getSend_br() {
        return send_br;
    }

    public void setSend_br(String send_br) {
        this.send_br = send_br;
    }

    public Integer getKind() {
        return kind;
    }

    public void setKind(Integer kind) {
        this.kind = kind;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public String getG3_() {
        return g3_;
    }

    public void setG3_(String g3_) {
        this.g3_ = g3_;
    }

    public String getG7_() {
        return g7_;
    }

    public void setG7_(String g7_) {
        this.g7_ = g7_;
    }

    public String getN_packet() {
        return n_packet;
    }

    public void setN_packet(String n_packet) {
        this.n_packet = n_packet;
    }

    public String getG5_() {
        return g5_;
    }

    public void setG5_(String g5_) {
        this.g5_ = g5_;
    }

    public String getG2_() {
        return g2_;
    }

    public void setG2_(String g2_) {
        this.g2_ = g2_;
    }

    public String getG25Txt() {
        return g25Txt;
    }

    public void setG25Txt(String g25Txt) {
        this.g25Txt = g25Txt;
    }

    public String getG36() {
        return g36;
    }

    public void setG36(String g36) {
        this.g36 = g36;
    }

    public String getG_24_bcn() {
        return g_24_bcn;
    }

    public void setG_24_bcn(String g_24_bcn) {
        this.g_24_bcn = g_24_bcn;
    }

    public Map<Integer, CimSmgsDocs> getCimSmgsDocses136() {
        return cimSmgsDocses136;
    }

    public void setCimSmgsDocses136(Map<Integer, CimSmgsDocs> cimSmgsDocses136) {
        this.cimSmgsDocses136 = cimSmgsDocses136;
    }

    public String getFtsDocId() {
        return ftsDocId;
    }

    public void setFtsDocId(String ftsDocId) {
        this.ftsDocId = ftsDocId;
    }

    public String getG_2inn() {
        return g_2inn;
    }

    public void setG_2inn(String g_2inn) {
        this.g_2inn = g_2inn;
    }

    public String getG_5inn() {
        return g_5inn;
    }

    public void setG_5inn(String g_5inn) {
        this.g_5inn = g_5inn;
    }

    public String getIndex_p() {
        return index_p;
    }

    public void setIndex_p(String index_p) {
        this.index_p = index_p;
    }

    public String getN_ppv() {
        return n_ppv;
    }

    public void setN_ppv(String n_ppv) {
        this.n_ppv = n_ppv;
    }

    public Integer getNppr() {
        return nppr;
    }

    public void setNppr(Integer nppr) {
        this.nppr = nppr;
    }

    public Date getDprb() {
        return dprb;
    }

    public void setDprb(Date dprb) {
        this.dprb = dprb;
    }

    public String getZpuInfo1() {
        return zpuInfo1;
    }

    public void setZpuInfo1(String zpuInfo1) {
        this.zpuInfo1 = zpuInfo1;
    }

    public String getSborCennost22() {
        return sborCennost22;
    }

    public void setSborCennost22(String sborCennost22) {
        this.sborCennost22 = sborCennost22;
    }

    public String getSborCennost21() {
        return sborCennost21;
    }

    public void setSborCennost21(String sborCennost21) {
        this.sborCennost21 = sborCennost21;
    }

    public String getSborCennost11() {
        return sborCennost11;
    }

    public void setSborCennost11(String sborCennost11) {
        this.sborCennost11 = sborCennost11;
    }
//    private DocDir doc;

    /*public DocDir getDoc() {
        return doc;
    }*/

//    public void setDoc(DocDir doc) {
//        this.doc = doc;
//    }

    public Byte getGu() {
        return gu;
    }

    public void setGu(Byte gu) {
        this.gu = gu;
    }

    public String getPlat1() {
        return plat1;
    }

    public void setPlat1(String plat1) {
        this.plat1 = plat1;
    }

    public String getPlat() {
        return plat;
    }

    public void setPlat(String plat) {
        this.plat = plat;
    }

    public BigDecimal getDocType1() {
        return docType1;
    }

    public void setDocType1(BigDecimal docType) {
        this.docType1 = docType;
    }

    public String getG5_1() {
        return g5_1;
    }

    public void setG5_1(String g5_1) {
        this.g5_1 = g5_1;
    }

    public String getG2_1() {
        return g2_1;
    }

    public void setG2_1(String g2_1) {
        this.g2_1 = g2_1;
    }

    public String getKontKol() {
        return kontKol;
    }

    public void setKontKol(String kontKol) {
        this.kontKol = kontKol;
    }

    public String getBruttoPref() {
        return bruttoPref;
    }

    public void setBruttoPref(String bruttoPref) {
        this.bruttoPref = bruttoPref;
    }

    public String getTaraPref() {
        return taraPref;
    }

    public void setTaraPref(String taraPref) {
        this.taraPref = taraPref;
    }

    public String getNettoPref() {
        return nettoPref;
    }

    public void setNettoPref(String nettoPref) {
        this.nettoPref = nettoPref;
    }

    public String getVagPrim() {
        return vagPrim;
    }

    public void setVagPrim(String vagPrim) {
        this.vagPrim = vagPrim;
    }

//    public String getKonPrim() {
//        return konPrim;
//    }
//
//    public void setKonPrim(String konPrim) {
//        this.konPrim = konPrim;
//    }

    public String getNpoezd() {
        return npoezd;
    }

    public void setNpoezd(String nPoezd) {
        this.npoezd = nPoezd;
    }

    public String getG164() {
        return g164;
    }

    public void setG164(String g164) {
        this.g164 = g164;
    }

    public String getG104() {
        return g104;
    }

    public void setG104(String g104) {
        this.g104 = g104;
    }

    public String getGrOtpFio() {
        return grOtpFio;
    }

    public void setGrOtpFio(String grOtpFio) {
        this.grOtpFio = grOtpFio;
    }

    public String getTehUslG12() {
        return tehUslG12;
    }

    public void setTehUslG12(String tehUslG12) {
        this.tehUslG12 = tehUslG12;
    }

    public String getDocNum() {
        return docNum;
    }

    public void setDocNum(String docNum) {
        this.docNum = docNum;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public Byte getVidKontOtpr() {
        return vidKontOtpr;
    }

    public void setVidKontOtpr(Byte vidKontOtpr) {
        this.vidKontOtpr = vidKontOtpr;
    }

    public String getOtmPoluch() {
        return otmPoluch;
    }

    public void setOtmPoluch(String otmPoluch) {
        this.otmPoluch = otmPoluch;
    }

    public Byte getFrankofracht() {
        return frankofracht;
    }

    public void setFrankofracht(Byte frankofracht) {
        this.frankofracht = frankofracht;
    }

    public String getKodUslPost() {
        return kodUslPost;
    }

    public void setKodUslPost(String kodUslPost) {
        this.kodUslPost = kodUslPost;
    }

    public Byte getIncoterms() {
        return incoterms;
    }

    public void setIncoterms(Byte incoterms) {
        this.incoterms = incoterms;
    }

    public Byte getCim() {
        return cim;
    }

    public void setCim(Byte cim) {
        this.cim = cim;
    }

    public String getZakazNo() {
        return zakazNo;
    }

    public void setZakazNo(String zakazNo) {
        this.zakazNo = zakazNo;
    }

    public String getOtprItogo() {
        return otprItogo;
    }

    public void setOtprItogo(String otprItogo) {
        this.otprItogo = otprItogo;
    }

    public String getSborCennost2() {
        return sborCennost2;
    }

    public void setSborCennost2(String sborCennost2) {
        this.sborCennost2 = sborCennost2;
    }

    public String getSborCennost1() {
        return sborCennost1;
    }

    public void setSborCennost1(String sborCennost1) {
        this.sborCennost1 = sborCennost1;
    }

    public Date getPerevozDate() {
        return perevozDate;
    }

    public void setPerevozDate(Date perevozDate) {
        this.perevozDate = perevozDate;
    }

    public String getPerevozSign() {
        return perevozSign;
    }

    public void setPerevozSign(String perevozSign) {
        this.perevozSign = perevozSign;
    }

    public String getVizaNo() {
        return vizaNo;
    }

    public void setVizaNo(String vizaNo) {
        this.vizaNo = vizaNo;
    }

//    public String getZajavNo() {
//        return zajavNo;
//    }
//
//    public void setZajavNo(String zajavNo) {
//        this.zajavNo = zajavNo;
//    }

    public String getTrueInfo() {
        return trueInfo;
    }

    public void setTrueInfo(String trueInfo) {
        this.trueInfo = trueInfo;
    }

    public String getZpuInfo() {
        return zpuInfo;
    }

    public void setZpuInfo(String zpuInfo) {
        this.zpuInfo = zpuInfo;
    }

    public String getProvozPlata() {
        return provozPlata;
    }

    public void setProvozPlata(String provozPlata) {
        this.provozPlata = provozPlata;
    }

    public String getPlatezhKop() {
        return platezhKop;
    }

    public void setPlatezhKop(String platezhKop) {
        this.platezhKop = platezhKop;
    }

    public Long getPlatezhRub() {
        return platezhRub;
    }

    public void setPlatezhRub(Long platezhRub) {
        this.platezhRub = platezhRub;
    }

    public Long getPlatezhKm() {
        return platezhKm;
    }

    public void setPlatezhKm(Long platezhKm) {
        this.platezhKm = platezhKm;
    }

    public String getTarifVOtpr() {
        return tarifVOtpr;
    }

    public void setTarifVOtpr(String tarifVOtpr) {
        this.tarifVOtpr = tarifVOtpr;
    }

    public String getTarifShema() {
        return tarifShema;
    }

    public void setTarifShema(String tarifShema) {
        this.tarifShema = tarifShema;
    }

    public String getPerevozchik() {
        return perevozchik;
    }

    public void setPerevozchik(String perevozchik) {
        this.perevozchik = perevozchik;
    }

    public String getGuInf() {
        return guInf;
    }

    public void setGuInf(String guInf) {
        this.guInf = guInf;
    }


    public String getG1_dop_info() {
        return g1_dop_info;
    }

    public String getG4_dop_info() {
        return g4_dop_info;
    }

    public String getG16_dop_info() {
        return g16_dop_info;
    }

    public void setG1_dop_info(String g1_dop_info) {
        this.g1_dop_info = g1_dop_info;
    }

    public void setG4_dop_info(String g4_dop_info) {
        this.g4_dop_info = g4_dop_info;
    }

    public void setG16_dop_info(String g16_dop_info) {
        this.g16_dop_info = g16_dop_info;
    }
    /*public Set<CimSmgsInvoiceBrief> getInvoicesBrief() {
        return invoicesBrief;
    }*/

    /*public void setInvoicesBrief(Set<CimSmgsInvoiceBrief> invoicesBrief) {
        this.invoicesBrief = invoicesBrief;
    }*/

    public String getG4prim() {
        return g4prim;
    }

    public void setG4prim(String g4prim) {
        this.g4prim = g4prim;
    }

    public Map<Byte, CimSmgsPlomb> getCimSmgsPlombs() {
        return cimSmgsPlombs;
    }

    public void setCimSmgsPlombs(Map<Byte, CimSmgsPlomb> cimSmgsPlombs) {
        this.cimSmgsPlombs = cimSmgsPlombs;
    }

    public PackDoc getPackDoc() {
        return packDoc;
    }

    @Override
    public String getDocName() {
        if(docType1 != null) {
            switch (docType1.intValue()) {
                case 1:
                    return "smgs";
                case 2:
                    return "invoicelist";
                case 3:
                    return "aviso";
                case 4:
                    return "cimsmgs";
                case 5:
                    return "aviso1";
                case 6:
                    return "slovnakl";
                case 7:
                    return "smgs2";
                case 8:
                    return "aviso2";
                case 10:
                    return "gu29k";
                case 11:
                    return "doplist";
                case 20:
                    return "avisogu29k";
                case 21:
                    return "cim";
                case 27:
                    return "avisocimsmgs";
            }
        }
        return null;
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

    public CimSmgs() {
    }

    public CimSmgs(Long hid) {
        this.hid = hid;
    }

    public CimSmgs(String un) {
        this.un = un;
    }

    public CimSmgs(Long hid, PackDoc pack, Route route) {
        this.hid = hid;
        this.packDoc = pack;
        this.route = route;
    }

/*
    public CimSmgs(Long hid, String g1, String g2, String g3, String g4, String g5, String g6, String g7, String g8, String g9, String g10,
                   String g11, String g12, String g13, String g141, String g142, String g15, String g16, String g161, String g17, String g18, String g181,
                   String g19, String g20, Byte g21, Byte g22, String g23, String g24, Byte g25, String g26, String g27, String g28, Date g281, String g29,
                   String g30, Date g301, Date arch, String un, String trans, Date dattr, Date locked, String unLock, String g40, String g44, String g191,
                   String g192, String g193, String g48, String g41, String g45, String ga491, String gb491, String ga492, String gb492, String ga493,
                   String gb493, String ga494, String gb494, String ga50, String gb50, String ga52, String gb52, String ga51, String gb51, String ga53,
                   String gb53, String ga54, String gb54, String ga55, String gb55, String ga56, String gb56, String ga57, String gb57, String g591,
                   String g592, String g593, String g594, String g595, String g596, String g597, String g598, String g60, String g61, String g611,
                   String g612, String g43, String g47, String g63, String g64, String g65, String g651, String g652, String ga66, Byte gb661, String gb662,
                   Date g67, String g691, String g692, String g693, String g694, String g68, String g62, String g621, String g622, String g38, String g39,
                   String g18B1, String g18B2, String ga581, String gb581, String ga582, String gb582, String ga583, String gb583, String ga584,
                   String gb584, String ga585, String gb585, String ga586, String gb586, String g20100, String g42, String g46, String g11_1, String g12_1,
                   String g13_1, String g41_1, String g42_1, String g43_1, BigDecimal hidCim, BigDecimal hidIcf, BigDecimal hidSp, Long hidSmgs,
                   Long iftminId, Date iftminOut, Date iftminIn, String g121, BigDecimal g24N, BigDecimal g24T, BigDecimal g24B, String statusBr,
                   Date altered, String g1r, String g14, String g4r, String g7r, String g9r, String g101, String g101r, String g102, String g102r,
                   String g13r, String g15r, String g162, String g162r, String g163, String g163r, String g18r, String g29r, String profile, String targGr,
                   String avFields, Byte g1c, Byte g4c, Byte g7c, Byte g9c, Byte g13c, Byte g15c, Byte g18c, Byte g20c, String numClaim, String g15_1,
                   String g16_1, String g16r, String g17_1, String g18_1, String g18r_1, String g19_1, String g19r, String g45_1, String g46_1, String g46r,
                   String g47_1, String g48_1, String g48r, String g49, String g49r, String g201, String g202, String g202r, String g203, String g204,
                   String g205, String g206, String g206r, String g207, String g207r, String g208, String g209, String g209r, String g2010, String g2011,
                   String g2012, String g2013, String g2014, String g2014r, String g2015, String g2016, String g2017, String g2017r, String g2011r,
                   String g110, String g111, String g112, String g410, String g411, String g412, String ready, String g171, String g2018, String g2018r,
                   String g23a, String g23b, String g74_1, String g74_2, Byte gs_22, String gs_24, String gs_48, String gs_141_1, Date gs_141_2,
                   String gs_66_1, Long amount,

                   */
    /* Map<Byte, CimSmgsKonList> cimSmgsKonLists, *//*

     */
    /* Map<Byte, CimSmgsGruz> cimSmgsGruzs, *//*
Map<Byte, CimSmgsDocs> cimSmgsDocses7, Map<Byte, CimSmgsDocs> cimSmgsDocses9,
                   Map<Byte, CimSmgsDocs> cimSmgsDocses13, Map<Byte, CimSmgsCarList> cimSmgsCarLists, Map<Byte, CimSmgsStatusAllowed> cimSmgsStatusAlloweds,
                   String g44_1, Byte status, Set<CimSmgsStatus> cimSmgsStatuses, Byte type, Set<CimSmgsScan> cimSmgsScans, Set<BIftminLog> BIftminLogs,
                   Set<CsComnt> csComnt) {
        this.hid = hid;
        this.gs_22 = gs_22;
        this.gs_24 = gs_24;
        this.gs_48 = gs_48;
        this.gs_141_1 = gs_141_1;
        this.gs_141_2 = gs_141_2;
        this.gs_66_1 = gs_66_1;
        this.amount = amount;
        this.g23a = g23a;
        this.g23b = g23b;
        this.g74_1 = g74_1;
        this.g74_2 = g74_2;
        this.g1 = g1;
        this.g2 = g2;
        this.g3 = g3;
        this.g4 = g4;
        this.g5 = g5;
        this.g6 = g6;
        this.g7 = g7;
        this.g8 = g8;
        this.g9 = g9;
        this.g10 = g10;
        this.g11 = g11;
        this.g12 = g12;
        this.g13 = g13;
        this.g141 = g141;
        this.g142 = g142;
        this.g15 = g15;
        this.g16 = g16;
        this.g161 = g161;
        this.g17 = g17;
        this.g18 = g18;
        this.g181 = g181;
        this.g19 = g19;
        this.g20 = g20;
        this.g21 = g21;
        this.g22 = g22;
        this.g23 = g23;
        this.g24 = g24;
        this.g25 = g25;
        this.g26 = g26;
        this.g27 = g27;
        this.g28 = g28;
        this.g281 = g281;
        this.g29 = g29;
        this.g30 = g30;
        this.g301 = g301;
        this.arch = arch;
        this.un = un;
        this.trans = trans;
        this.dattr = dattr;
        this.locked = locked;
        this.unLock = unLock;
        this.g40 = g40;
        this.g44 = g44;
        this.g191 = g191;
        this.g192 = g192;
        this.g193 = g193;
        this.g48 = g48;
        this.g41 = g41;
        this.g45 = g45;
        this.ga491 = ga491;
        this.gb491 = gb491;
        this.ga492 = ga492;
        this.gb492 = gb492;
        this.ga493 = ga493;
        this.gb493 = gb493;
        this.ga494 = ga494;
        this.gb494 = gb494;
        this.ga50 = ga50;
        this.gb50 = gb50;
        this.ga52 = ga52;
        this.gb52 = gb52;
        this.ga51 = ga51;
        this.gb51 = gb51;
        this.ga53 = ga53;
        this.gb53 = gb53;
        this.ga54 = ga54;
        this.gb54 = gb54;
        this.ga55 = ga55;
        this.gb55 = gb55;
        this.ga56 = ga56;
        this.gb56 = gb56;
        this.ga57 = ga57;
        this.gb57 = gb57;
        this.g591 = g591;
        this.g592 = g592;
        this.g593 = g593;
        this.g594 = g594;
        this.g595 = g595;
        this.g596 = g596;
        this.g597 = g597;
        this.g598 = g598;
        this.g60 = g60;
        this.g61 = g61;
        this.g611 = g611;
        this.g612 = g612;
        this.g43 = g43;
        this.g47 = g47;
        this.g63 = g63;
        this.g64 = g64;
        this.g65 = g65;
        this.g651 = g651;
        this.g652 = g652;
        this.ga66 = ga66;
        this.gb661 = gb661;
        this.gb662 = gb662;
        this.g67 = g67;
        this.g691 = g691;
        this.g692 = g692;
        this.g693 = g693;
        this.g694 = g694;
        this.g68 = g68;
        this.g62 = g62;
        this.g621 = g621;
        this.g622 = g622;
        this.g38 = g38;
        this.g39 = g39;
        this.g18B1 = g18B1;
        this.g18B2 = g18B2;
        this.ga581 = ga581;
        this.gb581 = gb581;
        this.ga582 = ga582;
        this.gb582 = gb582;
        this.ga583 = ga583;
        this.gb583 = gb583;
        this.ga584 = ga584;
        this.gb584 = gb584;
        this.ga585 = ga585;
        this.gb585 = gb585;
        this.ga586 = ga586;
        this.gb586 = gb586;
        this.g20100 = g20100;
        this.g42 = g42;
        this.g46 = g46;
        this.g11_1 = g11_1;
        this.g12_1 = g12_1;
        this.g13_1 = g13_1;
        this.g41_1 = g41_1;
        this.g42_1 = g42_1;
        this.g43_1 = g43_1;
        this.hidCim = hidCim;
        this.hidIcf = hidIcf;
        this.hidSp = hidSp;
        this.hidSmgs = hidSmgs;
        this.iftminId = iftminId;
        this.iftminOut = iftminOut;
        this.iftminIn = iftminIn;
        this.g121 = g121;
        this.g24N = g24N;
        this.g24T = g24T;
        this.g24B = g24B;
        this.statusBr = statusBr;
        this.altered = altered;
        this.g1r = g1r;
        this.g14 = g14;
        this.g4r = g4r;
        this.g7r = g7r;
        this.g9r = g9r;
        this.g101 = g101;
        this.g101r = g101r;
        this.g102 = g102;
        this.g102r = g102r;
        this.g13r = g13r;
        this.g15r = g15r;
        this.g162 = g162;
        this.g162r = g162r;
        this.g163 = g163;
        this.g163r = g163r;
        this.g18r = g18r;
        this.g29r = g29r;
        this.profile = profile;
        this.targGr = targGr;
        this.avFields = avFields;
        this.g1c = g1c;
        this.g4c = g4c;
        this.g7c = g7c;
        this.g9c = g9c;
        this.g13c = g13c;
        this.g15c = g15c;
        this.g18c = g18c;
        this.g20c = g20c;
        this.numClaim = numClaim;
        this.g15_1 = g15_1;
        this.g16_1 = g16_1;
        this.g16r = g16r;
        this.g17_1 = g17_1;
        this.g18_1 = g18_1;
        this.g18r_1 = g18r_1;
        this.g19_1 = g19_1;
        this.g19r = g19r;
        this.g45_1 = g45_1;
        this.g46_1 = g46_1;
        this.g46r = g46r;
        this.g47_1 = g47_1;
        this.g48_1 = g48_1;
        this.g48r = g48r;
        this.g49 = g49;
        this.g49r = g49r;
        this.g201 = g201;
        this.g202 = g202;
        this.g202r = g202r;
        this.g203 = g203;
        this.g204 = g204;
        this.g205 = g205;
        this.g206 = g206;
        this.g206r = g206r;
        this.g207 = g207;
        this.g207r = g207r;
        this.g208 = g208;
        this.g209 = g209;
        this.g209r = g209r;
        this.g2010 = g2010;
        this.g2011 = g2011;
        this.g2012 = g2012;
        this.g2013 = g2013;
        this.g2014 = g2014;
        this.g2014r = g2014r;
        this.g2015 = g2015;
        this.g2016 = g2016;
        this.g2017 = g2017;
        this.g2017r = g2017r;
        this.g2011r = g2011r;
        this.g110 = g110;
        this.g111 = g111;
        this.g112 = g112;
        this.g410 = g410;
        this.g411 = g411;
        this.g412 = g412;
        this.ready = ready;
        this.g171 = g171;
        this.g2018 = g2018;
        this.g2018r = g2018r;
        // this.cimSmgsKonLists = cimSmgsKonLists;
        // this.cimSmgsGruzs = cimSmgsGruzs;
        this.cimSmgsDocses7 = cimSmgsDocses7;
        this.cimSmgsDocses9 = cimSmgsDocses9;
        this.cimSmgsDocses13 = cimSmgsDocses13;
        this.cimSmgsCarLists = cimSmgsCarLists;
//		this.cimSmgsStatusAlloweds = cimSmgsStatusAlloweds;
        this.g44_1 = g44_1;
        this.status = status;
//		this.cimSmgsStatuses = cimSmgsStatuses;
        this.type = type;
//		this.cimSmgsScans = cimSmgsScans;
        this.BIftminLogs = BIftminLogs;
        this.csComnt = csComnt;
    }
*/

    public Long getHid() {
        return this.hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getG1() {
        return this.g1;
    }

    public void setG1(String g1) {
        this.g1 = g1;
    }

    public String getG2() {
        return this.g2;
    }

    public void setG2(String g2) {
        this.g2 = g2;
    }

    public String getG3() {
        return this.g3;
    }

    public void setG3(String g3) {
        this.g3 = g3;
    }

    public String getG4() {
        return this.g4;
    }

    public void setG4(String g4) {
        this.g4 = g4;
    }

    public String getG5() {
        return this.g5;
    }

    public void setG5(String g5) {
        this.g5 = g5;
    }

    public String getG6() {
        return this.g6;
    }

    public void setG6(String g6) {
        this.g6 = g6;
    }

    public String getG7() {
        return this.g7;
    }

    public void setG7(String g7) {
        this.g7 = g7;
    }

    public String getG8() {
        return this.g8;
    }

    public void setG8(String g8) {
        this.g8 = g8;
    }

    public String getG9() {
        return this.g9;
    }

    public void setG9(String g9) {
        this.g9 = g9;
    }

    public String getG10() {
        return this.g10;
    }

    public void setG10(String g10) {
        this.g10 = g10;
    }

    public String getG11() {
        return this.g11;
    }

    public void setG11(String g11) {
        this.g11 = g11;
    }

    public String getG12() {
        return this.g12;
    }

    public void setG12(String g12) {
        this.g12 = g12;
    }

    public String getG13() {
        return this.g13;
    }

    public void setG13(String g13) {
        this.g13 = g13;
    }

    public String getG141() {
        return this.g141;
    }

    public void setG141(String g141) {
        this.g141 = g141;
    }

    public String getG142() {
        return this.g142;
    }

    public void setG142(String g142) {
        this.g142 = g142;
    }

    public String getG15() {
        return this.g15;
    }

    public String buildG15_cs() {
        return StringUtils.defaultString(this.g15);
    }

    public String buildG15_csPrint() {
        StringBuilder sb = new StringBuilder();
        if (getG15c() != null && getG15c() == 1) {
//            return LIST_DOP_RU;
            sb.append(getText("form.labelDopList"));
        } else {
            sb.append(buildG15_cs());
            sb.append("\n");
            sb.append(buildG15r_cs());
        }

        return sb.toString();
    }

    public void setG15(String g15) {
        this.g15 = g15;
    }

    public String getG16() {
        return this.g16;
    }

    public void setG16(String g16) {
        this.g16 = g16;
    }

    public String getG161() {
        return this.g161;
    }

    public void setG161(String g161) {
        this.g161 = g161;
    }

    public String getG17() {
        return this.g17;
    }

    public void setG17(String g17) {
        this.g17 = g17;
    }

    public String getG18() {
        return this.g18;
    }

    public void setG18(String g18) {
        this.g18 = g18;
    }

    public String getG181() {
        return this.g181;
    }

    // public String getG181Disp()
    // {
    // if((g181 != null) && (g181.length() > 2))
    // if(g181.charAt(2) != ' ')
    // {
    // String temp = g181.substring(0, 2);
    // temp += " ";
    // String temp1 = g181.substring(2, g181.length());
    // return (temp + temp1);
    // //smgs.setG181(temp + temp1);
    // }
    //
    // return this.g181;
    // }

    public void setG181(String g181) {
        this.g181 = g181;
    }

    public String getG19() {
        return this.g19;
    }

    public void setG19(String g19) {
        this.g19 = g19;
    }

    public String getG20() {
        return this.g20;
    }

    public void setG20(String g20) {
        this.g20 = g20;
    }

    public Byte getG21() {
        return this.g21;
    }

    public void setG21(Byte g21) {
        this.g21 = g21;
    }

    public Byte getG22() {
        return this.g22;
    }

    public void setG22(Byte g22) {
        this.g22 = g22;
    }

    public String getG23() {
        return this.g23;
    }

    public void setG23(String g23) {
        this.g23 = g23;
    }

    public String getG24() {
        return this.g24;
    }

    public void setG24(String g24) {
        this.g24 = g24;
    }

    public Byte getG25() {
        return this.g25;
    }

    public void setG25(Byte g25) {
        this.g25 = g25;
    }

    /*public void setG25(VidOtpr g25) {
        this.g25 = g25.getG25();
    }*/

    public String getG26() {
        return this.g26;
    }

    public void setG26(String g26) {
        this.g26 = g26;
    }

    public String getG27() {
        return this.g27;
    }

    public void setG27(String g27) {
        this.g27 = g27;
    }

    public String getG28() {
        return this.g28;
    }

    public void setG28(String g28) {
        this.g28 = g28;
    }

    public Date getG281() {
        return this.g281;
    }

    public Date getG281Disp() {
        return (getG281() != null ? getG281() : getG281());
    }

    public void setG281(Date g281) {
        this.g281 = g281;
    }

    public void setG281Disp(Date g281) {
        setG281(g281);
    }

    public String getG29() {
        return this.g29;
    }

    public void setG29(String g29) {
        this.g29 = g29;
    }

    public String getG30() {
        return this.g30;
    }

    public void setG30(String g30) {
        this.g30 = g30;
    }

    public Date getG301() {
        return this.g301;
    }

    public void setG301(Date g301) {
        this.g301 = g301;
    }

    public Date getArch() {
        return this.arch;
    }

    public void setArch(Date arch) {
        this.arch = arch;
    }

    public String getUn() {
        return this.un;
    }

    public void setUn(String un) {
        this.un = un;
    }

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

    public String getG40() {
        return this.g40;
    }

    public void setG40(String g40) {
        this.g40 = g40;
    }

    public String getG44() {
        return this.g44;
    }

    public void setG44(String g44) {
        this.g44 = g44;
    }

    public String getG191() {
        return this.g191;
    }

    public void setG191(String g191) {
        this.g191 = g191;
    }

    public String getG192() {
        return this.g192;
    }

    public void setG192(String g192) {
        this.g192 = g192;
    }

    public String getG193() {
        return this.g193;
    }

    public void setG193(String g193) {
        this.g193 = g193;
    }

    public String getG48() {
        return this.g48;
    }

    public void setG48(String g48) {
        this.g48 = g48;
    }

    public String getG41() {
        return this.g41;
    }

    public void setG41(String g41) {
        this.g41 = g41;
    }

    public String getG45() {
        return this.g45;
    }

    public void setG45(String g45) {
        this.g45 = g45;
    }

    public String getGa491() {
        return this.ga491;
    }

    public void setGa491(String ga491) {
        this.ga491 = ga491;
    }

    public String getGb491() {
        return this.gb491;
    }

    public void setGb491(String gb491) {
        this.gb491 = gb491;
    }

    public String getGa492() {
        return this.ga492;
    }

    public void setGa492(String ga492) {
        this.ga492 = ga492;
    }

    public String getGb492() {
        return this.gb492;
    }

    public void setGb492(String gb492) {
        this.gb492 = gb492;
    }

    public String getGa493() {
        return this.ga493;
    }

    public void setGa493(String ga493) {
        this.ga493 = ga493;
    }

    public String getGb493() {
        return this.gb493;
    }

    public void setGb493(String gb493) {
        this.gb493 = gb493;
    }

    public String getGa494() {
        return this.ga494;
    }

    public void setGa494(String ga494) {
        this.ga494 = ga494;
    }

    public String getGb494() {
        return this.gb494;
    }

    public void setGb494(String gb494) {
        this.gb494 = gb494;
    }

    public String getGa50() {
        return this.ga50;
    }

    public void setGa50(String ga50) {
        this.ga50 = ga50;
    }

    public String getGb50() {
        return this.gb50;
    }

    public void setGb50(String gb50) {
        this.gb50 = gb50;
    }

    public String getGa52() {
        return this.ga52;
    }

    public void setGa52(String ga52) {
        this.ga52 = ga52;
    }

    public String getGb52() {
        return this.gb52;
    }

    public void setGb52(String gb52) {
        this.gb52 = gb52;
    }

    public String getGa51() {
        return this.ga51;
    }

    public void setGa51(String ga51) {
        this.ga51 = ga51;
    }

    public String getGb51() {
        return this.gb51;
    }

    public void setGb51(String gb51) {
        this.gb51 = gb51;
    }

    public String getGa53() {
        return this.ga53;
    }

    public void setGa53(String ga53) {
        this.ga53 = ga53;
    }

    public String getGb53() {
        return this.gb53;
    }

    public void setGb53(String gb53) {
        this.gb53 = gb53;
    }

    public String getGa54() {
        return this.ga54;
    }

    public void setGa54(String ga54) {
        this.ga54 = ga54;
    }

    public String getGb54() {
        return this.gb54;
    }

    public void setGb54(String gb54) {
        this.gb54 = gb54;
    }

    public String getGa55() {
        return this.ga55;
    }

    public void setGa55(String ga55) {
        this.ga55 = ga55;
    }

    public String getGb55() {
        return this.gb55;
    }

    public void setGb55(String gb55) {
        this.gb55 = gb55;
    }

    public String getGa56() {
        return this.ga56;
    }

    public void setGa56(String ga56) {
        this.ga56 = ga56;
    }

    public String getGb56() {
        return this.gb56;
    }

    public void setGb56(String gb56) {
        this.gb56 = gb56;
    }

    public String getGa57() {
        return this.ga57;
    }

    public void setGa57(String ga57) {
        this.ga57 = ga57;
    }

    public String getGb57() {
        return this.gb57;
    }

    public void setGb57(String gb57) {
        this.gb57 = gb57;
    }

    public String getG591() {
        return this.g591;
    }

    public void setG591(String g591) {
        this.g591 = g591;
    }

    public String getG592() {
        return this.g592;
    }

    public void setG592(String g592) {
        this.g592 = g592;
    }

    public String getG593() {
        return this.g593;
    }

    public void setG593(String g593) {
        this.g593 = g593;
    }

    public String getG594() {
        return this.g594;
    }

    public void setG594(String g594) {
        this.g594 = g594;
    }

    public String getG595() {
        return this.g595;
    }

    public void setG595(String g595) {
        this.g595 = g595;
    }

    public String getG596() {
        return this.g596;
    }

    public void setG596(String g596) {
        this.g596 = g596;
    }

    public String getG597() {
        return this.g597;
    }

    public void setG597(String g597) {
        this.g597 = g597;
    }

    public String getG598() {
        return this.g598;
    }

    public void setG598(String g598) {
        this.g598 = g598;
    }

    public String getG60() {
        return this.g60;
    }

    public void setG60(String g60) {
        this.g60 = g60;
    }

    public String getG61() {
        return this.g61;
    }

    public void setG61(String g61) {
        this.g61 = g61;
    }

    public String getG611() {
        return this.g611;
    }

    public void setG611(String g611) {
        this.g611 = g611;
    }

    public String getG612() {
        return this.g612;
    }

    public void setG612(String g612) {
        this.g612 = g612;
    }

    public String getG43() {
        return this.g43;
    }

    public void setG43(String g43) {
        this.g43 = g43;
    }

    public String getG47() {
        return this.g47;
    }

    public void setG47(String g47) {
        this.g47 = g47;
    }

    public String getG63() {
        return this.g63;
    }

    public void setG63(String g63) {
        this.g63 = g63;
    }

    public String getG64() {
        return this.g64;
    }

    public void setG64(String g64) {
        this.g64 = g64;
    }

    public String getG65() {
        return this.g65;
    }

    public String g65Disp() {
        String _s = "";
        if (getG65() != null)
            for (int i = 0; i < getG65().length(); i++)
                if (getG65().charAt(i) == '\n')
                    _s += "<br>";
                else
                    _s += getG65().charAt(i);
        // smgs.setG65(_s);

        return _s;
    }

//    public String buildG65Print() {
//        String _s = "";
//        if (getG65() != null)
//            for (int i = 0; i < getG65().length(); i++) {
//                if (getG65().charAt(i) == '\n')
//                    _s += "\n";
//                else
//                    _s += getG65().charAt(i);
//            }
//
//        return _s;
//    }

    public void setG65(String g65) {
        this.g65 = g65;
    }

    public String getG651() {
        return this.g651;
    }

    public String g651Disp() {
        String _s = "";
        if (getG651() != null)
            for (int i = 0; i < getG651().length(); i++)
                if (getG651().charAt(i) == '\n')
                    _s += "<br>";
                else
                    _s += getG651().charAt(i);
        // smgs.setG651(_s);

        return _s;
    }

//    public String buildG651Print() {
//        String _s = "";
//        if (getG651() != null)
//            for (int i = 0; i < getG651().length(); i++){
//                if (getG651().charAt(i) == '\n')
//                    _s += "\n";
//                else
//                    _s += getG651().charAt(i);
//
//            }
//        return _s;
//    }

    public void setG651(String g651) {
        this.g651 = g651;
    }

    public String getG652() {
        return this.g652;
    }

    public void setG652(String g652) {
        this.g652 = g652;
    }

    public String getGa66() {
        return this.ga66;
    }

    public void setGa66(String ga66) {
        this.ga66 = ga66;
    }

    public Byte getGb661() {
        return this.gb661;
    }

    public void setGb661(Byte gb661) {
        this.gb661 = gb661;
    }

    public String getGb662() {
        return this.gb662;
    }

    public void setGb662(String gb662) {
        this.gb662 = gb662;
    }

    public Date getG67() {
        return this.g67;
    }

    public void setG67(Date g67) {
        this.g67 = g67;
    }

    public String getG691() {
        return this.g691;
    }

    public void setG691(String g691) {
        this.g691 = g691;
    }

    public String getG692() {
        return this.g692;
    }

    public void setG692(String g692) {
        this.g692 = g692;
    }

    public String getG693() {
        return this.g693;
    }

    public void setG693(String g693) {
        this.g693 = g693;
    }

    public String getG694() {
        return this.g694;
    }

    public void setG694(String g694) {
        this.g694 = g694;
    }

    public String getG68() {
        return this.g68;
    }

    public void setG68(String g68) {
        this.g68 = g68;
    }

    public String getG62() {
        return this.g62;
    }

    public void setG62(String g62) {
        this.g62 = g62;
    }

    public String getG621() {
        return this.g621;
    }

    public void setG621(String g621) {
        this.g621 = g621;
    }

    public String getG622() {
        return this.g622;
    }

    public void setG622(String g622) {
        this.g622 = g622;
    }

    public String getG38() {
        return this.g38;
    }

    public void setG38(String g38) {
        this.g38 = g38;
    }

    public String getG39() {
        return this.g39;
    }

    public void setG39(String g39) {
        this.g39 = g39;
    }

    public String getG18B1() {
        return this.g18B1;
    }

    public void setG18B1(String g18B1) {
        this.g18B1 = g18B1;
    }

    public String getG18B2() {
        return this.g18B2;
    }

    public void setG18B2(String g18B2) {
        this.g18B2 = g18B2;
    }

    public String getGa581() {
        return this.ga581;
    }

    public void setGa581(String ga581) {
        this.ga581 = ga581;
    }

    public String getGb581() {
        return this.gb581;
    }

    public void setGb581(String gb581) {
        this.gb581 = gb581;
    }

    public String getGa582() {
        return this.ga582;
    }

    public void setGa582(String ga582) {
        this.ga582 = ga582;
    }

    public String getGb582() {
        return this.gb582;
    }

    public void setGb582(String gb582) {
        this.gb582 = gb582;
    }

    public String getGa583() {
        return this.ga583;
    }

    public void setGa583(String ga583) {
        this.ga583 = ga583;
    }

    public String getGb583() {
        return this.gb583;
    }

    public void setGb583(String gb583) {
        this.gb583 = gb583;
    }

    public String getGa584() {
        return this.ga584;
    }

    public void setGa584(String ga584) {
        this.ga584 = ga584;
    }

    public String getGb584() {
        return this.gb584;
    }

    public void setGb584(String gb584) {
        this.gb584 = gb584;
    }

    public String getGa585() {
        return this.ga585;
    }

    public void setGa585(String ga585) {
        this.ga585 = ga585;
    }

    public String getGb585() {
        return this.gb585;
    }

    public void setGb585(String gb585) {
        this.gb585 = gb585;
    }

    public String getGa586() {
        return this.ga586;
    }

    public void setGa586(String ga586) {
        this.ga586 = ga586;
    }

    public String getGb586() {
        return this.gb586;
    }

    public void setGb586(String gb586) {
        this.gb586 = gb586;
    }

    public String getG20100() {
        return this.g20100;
    }

    public void setG20100(String g20100) {
        this.g20100 = g20100;
    }

    public String getG42() {
        return this.g42;
    }

    public void setG42(String g42) {
        this.g42 = g42;
    }

    public String getG46() {
        return this.g46;
    }

    public void setG46(String g46) {
        this.g46 = g46;
    }

    public String getG11_1() {
        return this.g11_1;
    }

    public void setG11_1(String g11_1) {
        this.g11_1 = g11_1;
    }

    public String getG12_1() {
        return this.g12_1;
    }

    public void setG12_1(String g12_1) {
        this.g12_1 = g12_1;
    }

    public String getG13_1() {
        return this.g13_1;
    }

    public void setG13_1(String g13_1) {
        this.g13_1 = g13_1;
    }

    public String getG41_1() {
        return this.g41_1;
    }

    public void setG41_1(String g41_1) {
        this.g41_1 = g41_1;
    }

    public String getG42_1() {
        return this.g42_1;
    }

    public void setG42_1(String g42_1) {
        this.g42_1 = g42_1;
    }

    public String getG43_1() {
        return this.g43_1;
    }

    public void setG43_1(String g43_1) {
        this.g43_1 = g43_1;
    }

    public BigDecimal getHidCim() {
        return this.hidCim;
    }

    public void setHidCim(BigDecimal hidCim) {
        this.hidCim = hidCim;
    }

    public BigDecimal getHidIcf() {
        return this.hidIcf;
    }

    public void setHidIcf(BigDecimal hidIcf) {
        this.hidIcf = hidIcf;
    }

    public BigDecimal getHidSp() {
        return this.hidSp;
    }

    public void setHidSp(BigDecimal hidSp) {
        this.hidSp = hidSp;
    }

    public Long getHidSmgs() {
        return this.hidSmgs;
    }

    public void setHidSmgs(Long hidSmgs) {
        this.hidSmgs = hidSmgs;
    }

    public Long getIftminId() {
        return this.iftminId;
    }

    public void setIftminId(Long iftminId) {
        this.iftminId = iftminId;
    }

    public Date getIftminOut() {
        return this.iftminOut;
    }

    public void setIftminOut(Date iftminOut) {
        this.iftminOut = iftminOut;
    }

    public Date getIftminIn() {
        return this.iftminIn;
    }

    public void setIftminIn(Date iftminIn) {
        this.iftminIn = iftminIn;
    }

    public Long getIftminId2() {
        return iftminId2;
    }

    public void setIftminId2(Long iftminId2) {
        this.iftminId2 = iftminId2;
    }

    public Date getIftminOut2() {
        return iftminOut2;
    }

    public void setIftminOut2(Date iftminOut2) {
        this.iftminOut2 = iftminOut2;
    }

    public Date getIftminIn2() {
        return iftminIn2;
    }

    public void setIftminIn2(Date iftminIn2) {
        this.iftminIn2 = iftminIn2;
    }

    public String getG121() {
        return this.g121;
    }

    public void setG121(String g121) {
        this.g121 = g121;
    }

    public BigDecimal getG24N() {
        return this.g24N;
    }

    public void setG24N(BigDecimal g24N) {
        this.g24N = g24N;
    }

    public BigDecimal getG24T() {
        return this.g24T;
    }

    public void setG24T(BigDecimal g24T) {
        this.g24T = g24T;
    }

    public BigDecimal getG24B() {
        return this.g24B;
    }

    public void setG24B(BigDecimal g24B) {
        this.g24B = g24B;
    }

    public String getStatusBr() {
        return this.statusBr;
    }

    public void setStatusBr(String statusBr) {
        this.statusBr = statusBr;
    }

    public Date getAltered() {
        return this.altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getG1r() {
        return this.g1r;
    }

    public void setG1r(String g1r) {
        this.g1r = g1r;
    }

    public String getG14() {
        return this.g14;
    }

    public void setG14(String g14) {
        this.g14 = g14;
    }

    public String getG4r() {
        return this.g4r;
    }

    public void setG4r(String g4r) {
        this.g4r = g4r;
    }

    public String getG7r() {
        return this.g7r;
    }

    public void setG7r(String g7r) {
        this.g7r = g7r;
    }

    public String getG9r() {
        return this.g9r;
    }

    public void setG9r(String g9r) {
        this.g9r = g9r;
    }

    public String getG101() {
        return this.g101;
    }

    public void setG101(String g101) {
        this.g101 = g101;
    }

    public String getG101r() {
        return this.g101r;
    }

    public void setG101r(String g101r) {
        this.g101r = g101r;
    }

    public String getG102() {
        return this.g102;
    }

    public void setG102(String g102) {
        this.g102 = g102;
    }

    public String getG102r() {
        return this.g102r;
    }

    public void setG102r(String g102r) {
        this.g102r = g102r;
    }

    public String getG13r() {
        return this.g13r;
    }

    public void setG13r(String g13r) {
        this.g13r = g13r;
    }

    public String getG15r() {
        return this.g15r;
    }

    public String buildG15r_cs() {
        return StringUtils.defaultString(this.g15r);
    }

    public String buildG15r_csPrint() {
        if (getG15c() != null && getG15c() == 1) {
//            return LIST_DOP_RU;
            return getText("form.labelDopList");
        } else {
            return buildG15r_cs();
        }
    }

    public void setG15r(String g15r) {
        this.g15r = g15r;
    }

    public String getG162() {
        return this.g162;
    }

    public void setG162(String g162) {
        this.g162 = g162;
    }

    public String getG162r() {
        return this.g162r;
    }

    public void setG162r(String g162r) {
        this.g162r = g162r;
    }

    public String getG163() {
        return this.g163;
    }

    public void setG163(String g163) {
        this.g163 = g163;
    }

    public String getG163r() {
        return this.g163r;
    }

    public void setG163r(String g163r) {
        this.g163r = g163r;
    }

    public String getG18r() {
        return this.g18r;
    }

    public void setG18r(String g18r) {
        this.g18r = g18r;
    }

    public String getG29r() {
        return this.g29r;
    }

    public void setG29r(String g29r) {
        this.g29r = g29r;
    }

    public String getProfile() {
        return this.profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public String getTargGr() {
        return this.targGr;
    }

    public void setTargGr(String targGr) {
        this.targGr = targGr;
    }

    public String getAvFields() {
        return this.avFields;
    }

    public void setAvFields(String avFields) {
        this.avFields = avFields;
    }

    public Byte getG1c() {
        return this.g1c;
    }

    public void setG1c(Byte g1c) {
        this.g1c = g1c;
    }

    public Byte getG4c() {
        return this.g4c;
    }

    public void setG4c(Byte g4c) {
        this.g4c = g4c;
    }

    public Byte getG7c() {
        return this.g7c;
    }

    public void setG7c(Byte g7c) {
        this.g7c = g7c;
    }

    public Byte getG9c() {
        return this.g9c;
    }

    public void setG9c(Byte g9c) {
        this.g9c = g9c;
    }

    public Byte getG13c() {
        return this.g13c;
    }

    public void setG13c(Byte g13c) {
        this.g13c = g13c;
    }

    public Byte getG15c() {
        return this.g15c;
    }

    public void setG15c(Byte g15c) {
        this.g15c = g15c;
    }

    public Byte getG18c() {
        return this.g18c;
    }

    public void setG18c(Byte g18c) {
        this.g18c = g18c;
    }

    public Byte getG20c() {
        return this.g20c;
    }

    public void setG20c(Byte g20c) {
        this.g20c = g20c;
    }

    public String getNumClaim() {
        return this.numClaim;
    }

    public void setNumClaim(String numClaim) {
        this.numClaim = numClaim;
    }

    public String getG15_1() {
        return this.g15_1;
    }

    public void setG15_1(String g15_1) {
        this.g15_1 = g15_1;
    }

    public String getG16_1() {
        return this.g16_1;
    }

    public void setG16_1(String g16_1) {
        this.g16_1 = g16_1;
    }

    public String getG16r() {
        return this.g16r;
    }

    public void setG16r(String g16r) {
        this.g16r = g16r;
    }

    public String getG17_1() {
        return this.g17_1;
    }

    public void setG17_1(String g17_1) {
        this.g17_1 = g17_1;
    }

    public String getG18_1() {
        return this.g18_1;
    }

    public void setG18_1(String g18_1) {
        this.g18_1 = g18_1;
    }

    public String getG18r_1() {
        return this.g18r_1;
    }

    public void setG18r_1(String g18r_1) {
        this.g18r_1 = g18r_1;
    }

    public String getG19_1() {
        return this.g19_1;
    }

    public void setG19_1(String g19_1) {
        this.g19_1 = g19_1;
    }

    public String getG19r() {
        return this.g19r;
    }

    public void setG19r(String g19r) {
        this.g19r = g19r;
    }

    public String getG45_1() {
        return this.g45_1;
    }

    public void setG45_1(String g45_1) {
        this.g45_1 = g45_1;
    }

    public String getG46_1() {
        return this.g46_1;
    }

    public void setG46_1(String g46_1) {
        this.g46_1 = g46_1;
    }

    public String getG46r() {
        return this.g46r;
    }

    public void setG46r(String g46r) {
        this.g46r = g46r;
    }

    public String getG47_1() {
        return this.g47_1;
    }

    public void setG47_1(String g47_1) {
        this.g47_1 = g47_1;
    }

    public String getG48_1() {
        return this.g48_1;
    }

    public void setG48_1(String g48_1) {
        this.g48_1 = g48_1;
    }

    public String getG48r() {
        return this.g48r;
    }

    public void setG48r(String g48r) {
        this.g48r = g48r;
    }

    public String getG49() {
        return this.g49;
    }

    public void setG49(String g49) {
        this.g49 = g49;
    }

    public String getG49r() {
        return this.g49r;
    }

    public void setG49r(String g49r) {
        this.g49r = g49r;
    }

    public String getG201() {
        return this.g201;
    }

    public void setG201(String g201) {
        this.g201 = g201;
    }

    public String getG202() {
        return this.g202;
    }

    public void setG202(String g202) {
        this.g202 = g202;
    }

    public String getG202r() {
        return this.g202r;
    }

    public void setG202r(String g202r) {
        this.g202r = g202r;
    }

    public String getG203() {
        return this.g203;
    }

    public void setG203(String g203) {
        this.g203 = g203;
    }

    public String getG204() {
        return this.g204;
    }

    public void setG204(String g204) {
        this.g204 = g204;
    }

    public String getG205() {
        return this.g205;
    }

    public void setG205(String g205) {
        this.g205 = g205;
    }

    public String getG206() {
        return this.g206;
    }

    public void setG206(String g206) {
        this.g206 = g206;
    }

    public String getG206r() {
        return this.g206r;
    }

    public void setG206r(String g206r) {
        this.g206r = g206r;
    }

    public String getG207() {
        return this.g207;
    }

    public void setG207(String g207) {
        this.g207 = g207;
    }

    public String getG207r() {
        return this.g207r;
    }

    public void setG207r(String g207r) {
        this.g207r = g207r;
    }

    public String getG208() {
        return this.g208;
    }

    public void setG208(String g208) {
        this.g208 = g208;
    }

    public String getG209() {
        return this.g209;
    }

    public void setG209(String g209) {
        this.g209 = g209;
    }

    public String getG209r() {
        return this.g209r;
    }

    public void setG209r(String g209r) {
        this.g209r = g209r;
    }

    public String getG2010() {
        return this.g2010;
    }

    public void setG2010(String g2010) {
        this.g2010 = g2010;
    }

    public String getG2011() {
        return this.g2011;
    }

    public void setG2011(String g2011) {
        this.g2011 = g2011;
    }

    public String getG2012() {
        return this.g2012;
    }

    /*public ArrayList<String> getG2012Disp() {
        ArrayList<String> al = new ArrayList<String>();
        if (g2012 != null && g2012.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(g2012.trim(), "\n");
            for (int i = 0; st.hasMoreTokens(); i++)
                al.add(st.nextToken());
        }
        return al;
    }*/

    public void setG2012(String g2012) {
        this.g2012 = g2012;
    }

    public String getG2013() {
        return this.g2013;
    }

    public void setG2013(String g2013) {
        this.g2013 = g2013;
    }

    public String getG2014() {
        return this.g2014;
    }

    public void setG2014(String g2014) {
        this.g2014 = g2014;
    }

    public String getG2014r() {
        return this.g2014r;
    }

    public void setG2014r(String g2014r) {
        this.g2014r = g2014r;
    }

    public String getG2015() {
        return this.g2015;
    }

    public void setG2015(String g2015) {
        this.g2015 = g2015;
    }

    public String getG2016() {
        return this.g2016;
    }

    public void setG2016(String g2016) {
        this.g2016 = g2016;
    }

    public String getG2017() {
        return this.g2017;
    }

    public void setG2017(String g2017) {
        this.g2017 = g2017;
    }

    public String getG2017r() {
        return this.g2017r;
    }

    public void setG2017r(String g2017r) {
        this.g2017r = g2017r;
    }

    public String getG2011r() {
        return this.g2011r;
    }

    public void setG2011r(String g2011r) {
        this.g2011r = g2011r;
    }

    public String getG110() {
        return this.g110;
    }

    public void setG110(String g110) {
        this.g110 = g110;
    }

    public String getG111() {
        return this.g111;
    }

    public void setG111(String g111) {
        this.g111 = g111;
    }

    public String getG112() {
        return this.g112;
    }

    public void setG112(String g112) {
        this.g112 = g112;
    }

    public String getG410() {
        return this.g410;
    }

    public void setG410(String g410) {
        this.g410 = g410;
    }

    public String getG411() {
        return this.g411;
    }

    public void setG411(String g411) {
        this.g411 = g411;
    }

    public String getG412() {
        return this.g412;
    }

    public void setG412(String g412) {
        this.g412 = g412;
    }

    public String getReady() {
        return this.ready;
    }

    public void setReady(String ready) {
        this.ready = ready;
    }

    public String getG171() {
        return this.g171;
    }

    public void setG171(String g171) {
        this.g171 = g171;
    }

    public String getG2018() {
        return this.g2018;
    }

    public void setG2018(String g2018) {
        this.g2018 = g2018;
    }

    public String getG2018r() {
        return this.g2018r;
    }

    public void setG2018r(String g2018r) {
        this.g2018r = g2018r;
    }

    // public Map<Byte, CimSmgsKonList> getCimSmgsKonLists() {
    // return this.cimSmgsKonLists;
    // }
    // //
    // public void setCimSmgsKonLists(Map<Byte, CimSmgsKonList> cimSmgsKonLists)
    // {
    // this.cimSmgsKonLists = cimSmgsKonLists;
    // }
    //
    // public Map<Byte, CimSmgsGruz> getCimSmgsGruzs() {
    // return this.cimSmgsGruzs;
    // }
    //
    // public void setCimSmgsGruzs(Map<Byte, CimSmgsGruz> cimSmgsGruzs) {
    // this.cimSmgsGruzs = cimSmgsGruzs;
    // }
    public Map<Integer, CimSmgsDocs> getCimSmgsDocses7() {
        return this.cimSmgsDocses7;
    }

    public void setCimSmgsDocses7(Map<Integer, CimSmgsDocs> cimSmgsDocses7) {
        this.cimSmgsDocses7 = cimSmgsDocses7;
    }

    public Map<Integer, CimSmgsDocs> getCimSmgsDocses9() {
        return this.cimSmgsDocses9;
    }

    public void setCimSmgsDocses9(Map<Integer, CimSmgsDocs> cimSmgsDocses9) {
        this.cimSmgsDocses9 = cimSmgsDocses9;
    }

    public Map<Byte, CimSmgsCarList> getCimSmgsCarLists() {
        return this.cimSmgsCarLists;
    }

    public String getG44_1() {
        return g44_1;
    }

    public Map<Integer, CimSmgsDocs> getCimSmgsDocses13() {
        return cimSmgsDocses13;
    }

    public String getG21_() {
        return g21_;
    }

    public String getG22_() {
        return g22_;
    }

    public Byte getStatus() {
        return status;
    }

    /*public String getSource() {
        return "cimsmgs";
    }*/

/*
    public String getG23a() {
        return g23a;
    }
*/

    public String getG23b() {
        return g23b;
    }
    /*@JsonManagedReference
     public Set<CimSmgsStatus> getCimSmgsStatuses() {
         return cimSmgsStatuses;
     }*/

    public String getG74_1() {
        return g74_1;
    }

    public String getG74_2() {
        return g74_2;
    }
    /*@JsonManagedReference
     public Map<Byte, CimSmgsStatusAllowed> getCimSmgsStatusAlloweds() {
         return cimSmgsStatusAlloweds;
     }*/

    public Byte getType() {
        return type;
    }

    public String getGs_48() {
        return gs_48;
    }

    public Byte getGs_22() {
        return gs_22;
    }

    public String getGs_24() {
        return gs_24;
    }

    public void setCimSmgsCarLists(Map<Byte, CimSmgsCarList> cimSmgsCarLists) {
        this.cimSmgsCarLists = cimSmgsCarLists;
    }

    public void setG44_1(String g44_1) {
        this.g44_1 = g44_1;
    }

    public void setCimSmgsDocses13(Map<Integer, CimSmgsDocs> cimSmgsDocses13) {
        this.cimSmgsDocses13 = cimSmgsDocses13;
    }

    public void setG21_(String g21_) {
        this.g21_ = g21_;
    }

    public void setG22_(String g22_) {
        this.g22_ = g22_;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

/*
    public void setG23a(String g23a) {
        this.g23a = g23a;
    }
*/

    public void setG23b(String g23b) {
        this.g23b = g23b;
    }

    /*@JsonManagedReference
        public void setCimSmgsStatuses(Set<CimSmgsStatus> cimSmgsStatuses) {
            this.cimSmgsStatuses = cimSmgsStatuses;
        }
    */
    public void setG74_1(String g74_1) {
        this.g74_1 = g74_1;
    }

    public void setG74_2(String g74_2) {
        this.g74_2 = g74_2;
    }
    /*@JsonManagedReference
     public void setCimSmgsStatusAlloweds(Map<Byte, CimSmgsStatusAllowed> cimSmgsStatusAlloweds) {
         this.cimSmgsStatusAlloweds = cimSmgsStatusAlloweds;
     }*/

    public void setType(Byte type) {
        this.type = type;
    }

    public void setGs_48(String gs_48) {
        this.gs_48 = gs_48;
    }

    public void setGs_22(Byte gs_22) {
        this.gs_22 = gs_22;
    }

    public void setGs_24(String gs_24) {
        this.gs_24 = gs_24;
    }
    /*public Set<CimSmgsScan> getCimSmgsScans() {
         return this.cimSmgsScans;
     }*/

    public String getGs_141_1() {
        return gs_141_1;
    }

    public Date getGs_141_2() {
        return gs_141_2;
    }

    public String getGs_66_1() {
        return gs_66_1;
    }

    public String getG18B1a() {
        return g18B1a;
    }

    public String getG18B1b() {
        return g18B1b;
    }

    public String getG18B1c() {
        return g18B1c;
    }

    public String getG18B1d() {
        return g18B1d;
    }

    /*public Set<CimSmgsInvoice> getInvoices() {
         return invoices;
     }*/
    public Map<Byte, CimSmgsPlatel> getCimSmgsPlatels() {
        return cimSmgsPlatels;
    }

    public Set<CsComnt> getCsComnt() {
        return csComnt;
    }

    /*public void setCimSmgsScans(Set<CimSmgsScan> cimSmgsScans) {
         this.cimSmgsScans = cimSmgsScans;
     }*/

    public void setGs_141_1(String gs_141_1) {
        this.gs_141_1 = gs_141_1;
    }

    public void setGs_141_2(Date gs_141_2) {
        this.gs_141_2 = gs_141_2;
    }

    public void setGs_66_1(String gs_66_1) {
        this.gs_66_1 = gs_66_1;
    }

    public void setG18B1a(String g18B1a) {
        this.g18B1a = g18B1a;
    }

    public void setG18B1b(String g18B1b) {
        this.g18B1b = g18B1b;
    }

    public void setG18B1c(String g18B1c) {
        this.g18B1c = g18B1c;
    }

    public void setG18B1d(String g18B1d) {
        this.g18B1d = g18B1d;
    }

    /*public void setInvoices(Set<CimSmgsInvoice> invoices) {
         this.invoices = invoices;
     }*/
    public void setCimSmgsPlatels(Map<Byte, CimSmgsPlatel> cimSmgsPlatels) {
        this.cimSmgsPlatels = cimSmgsPlatels;
    }

    public void setCsComnt(Set<CsComnt> csComnt) {
        this.csComnt = csComnt;
    }

    /*public void addCimSmgsStatusAllowed() {
         for (CimSmgsStatusAllowed elem : cimSmgsStatusAlloweds.values())
             elem.setCimSmgs(this);
     }*/

    public void addCimSmgsPlatels() {
        for (CimSmgsPlatel elem : cimSmgsPlatels.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsPlombs() {
        for (CimSmgsPlomb elem : cimSmgsPlombs.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsPerevoz() {
        for (CimSmgsPerevoz elem : cimSmgsPerevoz.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsDocses7() {
        for (CimSmgsDocs elem : cimSmgsDocses7.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsDocses9() {
        for (CimSmgsDocs elem : cimSmgsDocses9.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsDocses13() {
        for (CimSmgsDocs elem : cimSmgsDocses13.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsDocses136() {
        for (CimSmgsDocs elem : cimSmgsDocses136.values())
            elem.setCimSmgs(this);
    }

    public void addCimSmgsCarLists() {
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            car.setCimSmgs(this);
            car.addCimSmgsGruzs();
            car.addCimSmgsDocs9();
            car.addCimSmgsPlombs();
            car.addCimSmgsKonLists();
        }
    }

    public BigDecimal calcG29InKon() {
        BigDecimal sum = new BigDecimal(0);
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                if (kon.getMassSend() != null)
                    sum = sum.add(kon.getMassSend());
            }
        }
        return sum;
    }


    /*
     * _g20a = ALLTRIM(g_20_1) + " " _g20b = ALLTRIM(g_20_10) + "(" +
     * ALLTRIM(g_20_11) + ") " _g20c = ALLTRIM(g_20_6) + " " + ALLTRIM(g_20_2) +
     * " " + ALLTRIM(g_20_3) + " " + ALLTRIM(g_20_4) + " " + ALLTRIM(g_20_5) + ;
     * " " + ALLTRIM(g_20_7) + " " + ALLTRIM(g_20_9) _g20d = ALLTRIM(g_20_12) +
     * " " + ALLTRIM(g_20_13) + " " + ALLTRIM(g_20_14) + " " + ALLTRIM(g_20_15)
     * + " " + ALLTRIM(g_20_16) + " " + ALLTRIM(g_20_17) + ;
     * IIF(!EMPTY(g_20_18), CHR(13) + ALLTRIM(g_20_18), "")
     *
     * _g20ar = ALLTRIM(g_20_1) + " " _g20br = ALLTRIM(g_20_10) + "(" +
     * ALLTRIM(g_20_11r) + ") " _g20cr = ALLTRIM(g_20_6r) + " " +
     * ALLTRIM(g_20_2r) + " " + ALLTRIM(g_20_3) + " " + ALLTRIM(g_20_4) + " " +
     * ALLTRIM(g_20_5) + ; " " + ALLTRIM(g_20_7r) + " " + ALLTRIM(g_20_9r)
     * _g20dr = ALLTRIM(g_20_12) + " " + ALLTRIM(g_20_13) + " " +
     * ALLTRIM(g_20_14r) + " " + ALLTRIM(g_20_15) + " " + ALLTRIM(g_20_16) + " "
     * + ALLTRIM(g_20_17r) + ; IIF(!EMPTY(g_20_18r), CHR(13) +
     * ALLTRIM(g_20_18r), "")
     *
     * RETURN _g20a + _g20b + _g20c + _g20d + CHR(13) + _g20ar + _g20br + _g20cr
     * + _g20dr
     */
    public String g20Disp4Print() {
        String _g20a = (g201 != null ? g201 : "") + " ";
        String _g20b = (g2010 != null ? g2010 : "") + "(" + (g2011 != null ? g2011 : "") + ") ";
        String _g20c = (g206 != null ? g206 : "") + " " + (g202 != null ? g202 : "") + " " + (g203 != null ? g203 : "") + " "
                + (g204 != null ? g204 : "") + " " + (g205 != null ? g205 : "") + " " + (g207 != null ? g207 : "") + " " + (g209 != null ? g209 : "");
        String _g20d = /* (g2012 != null ? g2012 : "") + " " + */(g2013 != null ? g2013 : "") + " " + (g2014 != null ? g2014 : "") + " "
                + (g2015 != null ? g2015 : "") + " " + (g2016 != null ? g2016 : "") + " " + (g2017 != null ? g2017 : "")
                + (g2018 != null && g2018.length() > 0 ? "<br/>" + g2018 : "");

        String _g20ar = (g201 != null ? g201 : "") + " ";
        String _g20br = (g2010 != null ? g2010 : "") + "(" + (g2011r != null ? g2011r : "") + ") ";
        String _g20cr = (g206r != null ? g206r : "") + " " + (g202r != null ? g202r : "") + " " + (g203 != null ? g203 : "") + " "
                + (g204 != null ? g204 : "") + " " + (g205 != null ? g205 : "") + " " + (g207r != null ? g207r : "") + " "
                + (g209r != null ? g209r : "");
        String _g20dr = /* (g2012 != null ? g2012 : "") + " " + */(g2013 != null ? g2013 : "") + " " + (g2014r != null ? g2014r : "") + " "
                + (g2015 != null ? g2015 : "") + " " + (g2016 != null ? g2016 : "") + " " + (g2017r != null ? g2017r : "")
                + (g2018r != null && g2018r.length() > 0 ? "<br/>" + g2018r : "");

        return _g20a + _g20b + _g20c + _g20d + "<br/>" + _g20ar + _g20br + _g20cr + _g20dr;
    }

    /*
     * _g1a = ALLTRIM(g_1) _g1b = ALLTRIM(g_1_9) + " " + ALLTRIM(g_1_5) + " " +
     * ALLTRIM(g_1_7) + " " + ALLTRIM(g_1_8) _g1c = ALLTRIM(g_1_6) + " " +
     * ALLTRIM(g_1_10) _g1 = _g1a + IIF(!EMPTY(_g1a), CHR(13), "") + ; _g1b +
     * IIF(!EMPTY(_g1b), CHR(13), "") + ; _g1c
     *
     * _g1ra = ALLTRIM(g_1r) _g1rb = ALLTRIM(g_1_9r) + " " + ALLTRIM(g_1_5) +
     * " " + ALLTRIM(g_1_7) + " " + ALLTRIM(g_1_8r) _g1rc = ALLTRIM(g_1_6r) +
     * " " + ALLTRIM(g_1_10) _g1r = _g1ra + IIF(!EMPTY(_g1ra), CHR(13), "") + ;
     * _g1rb + IIF(!EMPTY(_g1rb), CHR(13), "") + ; _g1rc
     */
    public String g1Disp4Print() {
        String _g1a = (g1 != null ? g1 : "");
        String _g1b = (g19_1 != null ? g19_1 : "") +
                // (g15_1 != null ? g15_1 : "") + " " +
                (g17_1 != null ? " " + g17_1 : "") + (g18_1 != null ? " " + g18_1 : "");
        String _g1c = (g16_1 != null ? g16_1 : "") + (g110 != null ? " " + g110 : "");
        String _g1 = _g1a + (_g1a != null && _g1a.trim().length() > 0 ? "<br/>" : "") + _g1b
                + (_g1b != null && _g1b.trim().length() > 0 ? "<br/>" : "") + _g1c;

        String _g1ra = (g1r != null ? g1r : "");
        String _g1rb = (g19r != null ? g19r : "") +
                // (g15_1 != null ? g15_1 : "") + " " +
                (g17_1 != null ? " " + g17_1 : "") + (g18r_1 != null ? " " + g18r_1 : "") + (g2_1 != null ? "<br/>" + g2_1 : "");
        String _g1rc = (g16r != null ? g16r : "") + (g110 != null ? " " + g110 : "");
        String _g1r = _g1ra + (_g1ra != null && _g1ra.trim().length() > 0 ? "<br/>" : "") + _g1rb
                + (_g1rb != null && _g1rb.trim().length() > 0 ? "<br/>" : "") + _g1rc;
        return (_g1.length() > 0 ? _g1 + "<br/>" : "") + _g1r;
    }

    /*public String buildG1Print() {
        StringBuffer g = new StringBuffer();
        if (g1r != null) {
            g.append(g1r);
            g.append("\n");
        }
        if (g_1_5k != null) {
            g.append(g_1_5k);
            g.append(" ");
        }
        g.append(g16r != null ? g16r : "");
        g.append("; ");
        g.append(g18r_1 != null ? g18r_1 : "");
        g.append("; ");
        g.append(g19r != null ? g19r : "");
        g.append("\n");

        if (g2_1 != null) {
            g.append("ТГНЛ ");
            g.append(g2_1);
            g.append("; ");
        }
        if (g2 != null) {
            g.append("ОКПО ");
            g.append(g2);
            g.append("; ");
        }
        if (g_2inn != null) {
            g.append("ИИН ");
            g.append(g_2inn);
            g.append(";");
        }
        return g.toString();
    }*/

    /**
     * Generates print string for g1 smgs2.
     *
     * @return print string
     */
    public String buildG1Print() {
        StringBuilder result = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();

        // 1 row
        //name ru
        row1.append(StringUtils.isNotBlank(g1r) ? g1r : "");

        // 2 row
        // adress ru
        if (StringUtils.isNotBlank(g19r)) {
            row2.append(g19r);
        }
        //city
        if (StringUtils.isNotBlank(g18r_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g18r_1);
        }
        //country
        if (StringUtils.isNotBlank(g16r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g16r);
        }
        //index
        if (StringUtils.isNotBlank(g17_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g17_1);
        }
        //ОКПО
        if (StringUtils.isNotBlank(g2)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ОКПО ").append(g2);
        }
        //ИИН
        if (StringUtils.isNotBlank(g_2inn)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ИИН ").append(g_2inn);
        }

        //row 3
        // dop_info
        if (StringUtils.isNotBlank(g1_dop_info)) {
            row3.append(g1_dop_info);
        }
        // result
        if (row1.length() > 0) {
            result.append(row1);
            result.append("\n");
        }
        if (row2.length() > 0) {
            result.append(row2);
            result.append("\n");
        }
        if (row3.length() > 0) {
            result.append(row3);
        }

        return result.toString();
    }

    public String buildG1CsPrint() {
        if (getG1c() != null && getG1c() == 1) {
            return getText("form.labelDopList");
        } else {
            return buildG1Cs();
        }
    }

    /**
     * Generates print string for g1 CIM/SMGS.
     *
     * @return print string
     */
    public String buildG1Cs() {
        StringBuilder result = new StringBuilder();
        StringBuilder _g1 = new StringBuilder();
        StringBuilder _g1r = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();
// non-ru part
        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g1) ? g1 : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g19_1)) {
            row2.append(g19_1);
        }
        //city
        if (StringUtils.isNotBlank(g18_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g18_1);
        }
        //country
        if (StringUtils.isNotBlank(g16_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g16_1);
        }
        //index
        if (StringUtils.isNotBlank(g17_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g17_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g110)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("VAT ").append(g110);
        }

        if (row1.length() > 0) {
            _g1.append(row1);
            _g1.append("\n");
        }
        if (row2.length() > 0) {
            _g1.append(row2);
        }
        row1.setLength(0);
        row2.setLength(0);
        // ru part
        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g1r) ? g1r : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g19r)) {
            row2.append(g19r);
        }
        //city
        if (StringUtils.isNotBlank(g18r_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g18r_1);
        }
        //country
        if (StringUtils.isNotBlank(g16r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g16r);
        }
        //index
        if (StringUtils.isNotBlank(g17_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g17_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g110)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("VAT ").append(g110);
        }
        //row 3
        // dop_info
        if (StringUtils.isNotBlank(g1_dop_info)) {
            row3.append(g1_dop_info);
        }
        if (row1.length() > 0) {
            _g1r.append(row1);
            _g1r.append("\n");
        }
        if (row2.length() > 0) {
            _g1r.append(row2);
            _g1r.append("\n");
        }
        if (row3.length() > 0) {
            _g1r.append(row3);
        }
        result.append("");
        if (_g1.length() > 0)
            result.append(_g1).append("\n");
        if (_g1r.length() > 0)
            result.append(_g1r);

        return result.toString();

//        String _g1a = (g1 != null ? g1 : "");
//        String _g1b = (g19_1 != null ? g19_1 : "") +
//                // (g15_1 != null ? g15_1 : "") + " " +
//                (g17_1 != null ? " " + g17_1 : "") + (g18_1 != null ? " " + g18_1 : "");
//        String _g1c = (g16_1 != null ? g16_1 : "") + (g110 != null ? " " + g110 : "");
//        String _g1 = _g1a + (_g1a != null && _g1a.trim().length() > 0 ? "\n" : "") + _g1b
//                + (_g1b != null && _g1b.trim().length() > 0 ? "\n" : "") + _g1c + (_g1c != null && _g1c.trim().length() > 0 ? "\n" : "");
//
//        String _g1ra = (g1r != null ? g1r : "");
//        String _g1rb = (g19r != null ? g19r : "") +
//                // (g15_1 != null ? g15_1 : "") + " " +
//                (g17_1 != null ? " " + g17_1 : "") + (g18r_1 != null ? " " + g18r_1 : "") + (g2_1 != null ? "\n" + g2_1 : "");
//        String _g1rc = (g16r != null ? g16r : "") + (g110 != null ? " " + g110 : "");
//        String _g1r = _g1ra + (_g1ra != null && _g1ra.trim().length() > 0 ? "\n" : "") + _g1rb
//                + (_g1rb != null && _g1rb.trim().length() > 0 ? "\n" : "") + _g1rc;
//        return (_g1.length() > 0 ? _g1 : "") + _g1r +" "+ g1_dop_info;
    }

    /**
     * Generates print string for g2 smgs2.
     *
     * @return print string
     */
    public String buildG2Cs2Print() {
        StringBuilder stringBuilder = new StringBuilder();

        stringBuilder.append(g162r != null ? g162r + " " : "").append(g163r != null ? g163r : "");
        stringBuilder.append("\n");
        stringBuilder.append(g16_dop_info != null ? g16_dop_info : "");

        return stringBuilder.toString();
    }

    /**
     * Гр2. Станция отправления - код станции
     *
     * @return строкадля печати
     */
    public String buildG17_Print() {
        return (getG171() != null ? getG171() + " " : "") + StringUtils.defaultString(g17);
    }

    public String buildGuG2Print() {
        StringBuffer g = new StringBuffer();
        if (g2_1 != null) {
//            g.append("ТГНЛ ");
            g.append(g2_1);
//            g.append("\n");
        }
        /*if (g2 != null) {
            g.append("ОКПО ");
            g.append(g2);
            g.append("\n");
        }
        if (g_2inn != null) {
            g.append("ИИН ");
            g.append(g_2inn);
            g.append("\n");
        }*/
        return g.toString();
    }

    public String buildGuG5Print() {
        StringBuffer g = new StringBuffer();
        if (g5_1 != null) {
//            g.append("ТГНЛ ");
            g.append(g5_1);
//            g.append("\n");
        }
        /*if (g5 != null) {
            g.append("ОКПО ");
            g.append(g5);
            g.append("\n");
        }
        if (g_5inn != null) {
            g.append("ИИН ");
            g.append(g_5inn);
            g.append("\n");
        }*/
        return g.toString();
    }

    public String g1Disp4PrintCim() {
        String naim, strn, addr, nl = "<br/>";
        naim = getG1() != null ? getG1() + nl : "";
        strn = (getG_1_5k() != null ? getG_1_5k() + " " : "") + (getG16_1() != null ? getG16_1() : "");
        if (strn.length() > 0) strn += nl;
        addr = (getG18_1() != null ? getG18_1() + " " : "") + (getG19_1() != null ? getG19_1() : "");
        return naim + strn + addr;
    }

    /**
     * generates print string for g1 CIM.
     *
     * @return print string
     */
    public String buildG1CimPrint() {
        StringBuilder result = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();

        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g1) ? g1 : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g19_1)) {
            row2.append(g19_1);
        }
        //city
        if (StringUtils.isNotBlank(g18_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g18_1);
        }
        //country
        if (StringUtils.isNotBlank(g16_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g16_1);
        }
        //index
        if (StringUtils.isNotBlank(g17_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g17_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g110)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ОКПО ").append(g110);
        }
        //row 3
        // dop_info
        if (StringUtils.isNotBlank(g1_dop_info)) {
            row3.append(g1_dop_info);
        }
        if (row1.length() > 0) {
            result.append(row1);
            result.append("\n");
        }
        if (row2.length() > 0) {
            result.append(row2);
            result.append("\n");
        }
        if (row3.length() > 0) {
            result.append(row3);
        }
        return result.toString();
//        String naim, strn, addr, nl = "\n";
//        naim = getG1() != null ? getG1() + nl : "";
//        strn = (getG_1_5k() != null ? getG_1_5k() + " " : "") + (getG16_1() != null ? getG16_1() : "");
//        if (strn.length() > 0) strn += nl;
//        addr = (getG18_1() != null ? getG18_1() + " " : "") + (getG19_1() != null ? getG19_1() : "");
//        return naim + strn + addr;
    }

    public String buildG1SlovNPrint() {
        String naim, strn, addr, nl = "\n";
        naim = getG1() != null ? getG1() + nl : "";
        strn = (getG_1_5k() != null ? getG_1_5k() + " " : "") + (getG16_1() != null ? getG16_1() : "");
        if (strn.length() > 0) strn += nl;
        addr = (getG18_1() != null ? getG18_1() + " " : "") + (getG19_1() != null ? getG19_1() : "");
        return naim + strn + addr;
    }

    public String g1Disp4PrintCmr() {
        String naim, strn, addr, nl = "<br/>";
        naim = getG1r() != null ? getG1r() : "";
        strn = (getG_1_5k() != null ? getG_1_5k() + " " : "") + (getG16r() != null ? getG16r() : "");
        addr = (getG18r_1() != null ? getG18r_1() + " " : "") + (getG19r() != null ? getG19r() : "");
        return naim + nl + addr + nl + strn;
    }

    public String buildG1CmrPrint() {
        String naim, strn, addr, nl = "\n";
        naim = getG1r() != null ? getG1r() : "";
        strn = (getG_1_5k() != null ? getG_1_5k() + " " : "") + (getG16r() != null ? getG16r() : "");
        addr = (getG18r_1() != null ? getG18r_1() + " " : "") + (getG19r() != null ? getG19r() : "");
        return naim + nl + addr + nl + strn;
    }

    public String g4Disp4PrintCim() {
        String naim, strn, addr, nl = "<br/>";
        naim = getG4() != null ? getG4() + nl : "";
        strn = (getG_4_5k() != null ? getG_4_5k() + " " : "") + (getG46_1() != null ? getG46_1() : "");
        if (strn.length() > 0) strn += nl;
        addr = (getG48_1() != null ? getG48_1() + " " : "") + (getG49() != null ? getG49() : "");
        return naim + strn + addr;
    }

    /**
     * generates print string for g4 CIM
     *
     * @return print string
     */
    public String buildG4CimPrint() {
        StringBuilder result = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();

        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g4) ? g4 : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g49)) {
            row2.append(g49);
        }
        //city
        if (StringUtils.isNotBlank(g48_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g48_1);
        }
        //country
        if (StringUtils.isNotBlank(g46_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g46_1);
        }
        //index
        if (StringUtils.isNotBlank(g47_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g47_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g410)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ОКПО ").append(g410);
        }
        //row 3
        // dop_info
        if (StringUtils.isNotBlank(g4_dop_info)) {
            row3.append(g4_dop_info);
        }
        if (row1.length() > 0) {
            result.append(row1);
            result.append("\n");
        }
        if (row2.length() > 0) {
            result.append(row2);
            result.append("\n");
        }
        if (row3.length() > 0) {
            result.append(row3);
        }
        return result.toString();
//        String naim, strn, addr, nl = "\n";
//        naim = getG4() != null ? getG4() + nl : "";
//        strn = (getG_4_5k() != null ? getG_4_5k() + " " : "") + (getG46_1() != null ? getG46_1() : "");
//        if (strn.length() > 0) strn += nl;
//        addr = (getG48_1() != null ? getG48_1() + " " : "") + (getG49() != null ? getG49() : "");
//        return naim + strn + addr;
    }

    public String buildG5SlovNPrint() {
        String naim, strn, addr, nl = "\n";
        naim = getG4() != null ? getG4() + nl : "";
        strn = (getG_4_5k() != null ? getG_4_5k() + " " : "") + (getG46_1() != null ? getG46_1() : "");
        if (strn.length() > 0) strn += nl;
        addr = (getG48_1() != null ? getG48_1() + " " : "") + (getG49() != null ? getG49() : "");
        return naim + strn + addr;
    }

    public String g4Disp4PrintCmr() {
        String naim, strn, addr, nl = "<br/>";
        naim = getG4r() != null ? getG4r() : "";
        strn = (getG_4_5k() != null ? getG_4_5k() + " " : "") + (getG46r() != null ? getG46r() : "");
        addr = (getG48r() != null ? getG48r() + " " : "") + (getG49r() != null ? getG49r() : "");
        return naim + nl + addr + nl + strn;
    }

    public String buildG2CmrPrint() {
        String naim, strn, addr, nl = "\n";
        naim = getG4r() != null ? getG4r() : "";
        strn = (getG_4_5k() != null ? getG_4_5k() + " " : "") + (getG46r() != null ? getG46r() : "");
        addr = (getG48r() != null ? getG48r() + " " : "") + (getG49r() != null ? getG49r() : "");
        return naim + nl + addr + nl + strn;
    }

    /*
     * var uu = {'"ssss'+i+'.sss.ss"':23, ee:23}; _g4a = ALLTRIM(g_4) _g4b =
     * ALLTRIM(g_4_9) + " " + ALLTRIM(g_4_5) + " " + ALLTRIM(g_4_7) + " " +
     * ALLTRIM(g_4_8) _g4c = ALLTRIM(g_4_6) + " " + ALLTRIM(g_4_10) _g4 = _g4a +
     * IIF(!EMPTY(_g4a), CHR(13), "") + ; _g4b + IIF(!EMPTY(_g4b), CHR(13), "")
     * + ; _g4c
     *
     * _g4ra = ALLTRIM(g_4r) _g4rb = ALLTRIM(g_4_9r) + " " + ALLTRIM(g_4_5) +
     * " " + ALLTRIM(g_4_7) + " " + ALLTRIM(g_4_8r) _g4rc = ALLTRIM(g_4_6r) +
     * " " + ALLTRIM(g_4_10) _g4r = _g4ra + IIF(!EMPTY(_g4ra), CHR(13), "") + ;
     * _g4rb + IIF(!EMPTY(_g4rb), CHR(13), "") + ; _g4rc
     */
    public String g4Disp4Print() {
        String _g4a = (g4 != null ? g4 : "");
        String _g4b = (g49 != null ? g49 : "") + (g45_1 != null ? " " + g45_1 : "") + (g47_1 != null ? " " + g47_1 : "")
                + (g48_1 != null ? " " + g48_1 : "");
        String _g4c = (g46_1 != null ? g46_1 : "") + (g410 != null ? " " + g410 : "");
        String _g4 = _g4a + (_g4a != null && _g4a.trim().length() > 0 ? "<br/>" : "") + _g4b
                + (_g4b != null && _g4b.trim().length() > 0 ? "<br/>" : "") + _g4c;

        String _g4ra = (g4r != null ? g4r : "");
        String _g4rb = (g49r != null ? g49r : "") + (g45_1 != null ? " " + g45_1 : "") + (g47_1 != null ? " " + g47_1 : "")
                + (g48r != null ? " " + g48r : "") + (g5_1 != null ? "<br/>" + g5_1 : "");
        String _g4rc = (g46r != null ? g46r : "") + (g410 != null ? " " + g410 : "");
        String _g4r = _g4ra + (_g4ra != null && _g4ra.trim().length() > 0 ? "<br/>" : "") + _g4rb
                + (_g4rb != null && _g4rb.trim().length() > 0 ? "<br/>" : "") + _g4rc;
        return (_g4.length() > 0 ? _g4 + "<br/>" : "") + _g4r;
    }

    /* public String buildG4Print() {
         StringBuffer g = new StringBuffer();
         if (g4r != null) {
             g.append(g4r);
             g.append("\n");
         }
         if (g_4_5k != null) {
             g.append(g_4_5k);
             g.append(" ");
         }
         g.append(g46r != null ? g46r : "");
         g.append("; ");
         g.append(g48r != null ? g48r : "");
         g.append("; ");
         g.append(g49r != null ? g49r : "");
         g.append("\n");

         if (g5_1 != null) {
             g.append("ТГНЛ ");
             g.append(g5_1);
             g.append("; ");
         }
         if (g5 != null) {
             g.append("ОКПО ");
             g.append(g5);
             g.append("; ");
         }
         if (g_5inn != null) {
             g.append("ИИН ");
             g.append(g_5inn);
             g.append(";");
         }
         return g.toString();
     }*/

    /**
     * Generates print string for g4 smgs2.
     *
     * @return print string
     */
    public String buildG4Print() {
        StringBuilder result = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();

        // 1 row
        //name ru
        row1.append(StringUtils.isNotBlank(g4r) ? g4r : "");

        // 2 row
        // adress ru
        if (StringUtils.isNotBlank(g49r)) {
            row2.append(g49r);
        }
        //city
        if (StringUtils.isNotBlank(g48r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g48r);
        }
        //country
        if (StringUtils.isNotBlank(g46r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g46r);
        }
        //index
        if (StringUtils.isNotBlank(g47_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g47_1);
        }
        //ОКПО
        if (StringUtils.isNotBlank(g5)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ОКПО ").append(g5);
        }
        //ИИН
        if (StringUtils.isNotBlank(g_5inn)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("ИИН ").append(g_5inn);
        }
        //row 3
        // g4_dop_info
        if (StringUtils.isNotBlank(g4_dop_info)) {
            row3.append(g4_dop_info);
        }

//        if (StringUtils.isNotBlank(g5_1)) {
//            row1.append(row1.length() > 0 ? " " : "");
//            row1.append("ТГНЛ ").append(g5_1);
//        }
//        row1.append(row1.length() > 0 ? ";" : "");

        // 3 row
        //   row3.append(StringUtils.isNotBlank(g45_1) ? g45_1 : "");


//        row3.append(row3.length() > 0 ? ";" : "");


        // result
        result.append(row1.length() > 0 ? row1 : "");
        if (row2.length() > 0) {
            result.append(result.length() > 0 ? "\n" : "");
            result.append(row2);
        }

        if (row3.length() > 0) {
            result.append(result.length() > 0 ? "\n" : "");
            result.append(row3);
        }

        return result.toString();
    }

    public String buildG4CsPrint() {
        if (getG4c() != null && getG4c() == 1) {
            return getText("form.labelDopList");
        } else {
            return buildG4Cs();
        }
    }

    /**
     * Generates print string for g4 CIM/SMGS.
     *
     * @return string for print
     */
    public String buildG4Cs() {
        StringBuilder result = new StringBuilder();
        StringBuilder _g4 = new StringBuilder();
        StringBuilder _g4r = new StringBuilder();
        StringBuilder row1 = new StringBuilder();
        StringBuilder row2 = new StringBuilder();
        StringBuilder row3 = new StringBuilder();

// non-ru part
        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g4) ? g4 : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g49)) {
            row2.append(g49);
        }
        //city
        if (StringUtils.isNotBlank(g48_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g48_1);
        }
        //country
        if (StringUtils.isNotBlank(g46_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g46_1);
        }
        //index
        if (StringUtils.isNotBlank(g47_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g47_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g410)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("VAT ").append(g410);
        }
        if (row1.length() > 0) {
            _g4.append(row1);
            _g4.append("\n");
        }
        if (row2.length() > 0) {
            _g4.append(row2);
        }
        row1.setLength(0);
        row2.setLength(0);
        // ru part
        // 1 row
        //name
        row1.append(StringUtils.isNotBlank(g4r) ? g4r : "");
        // 2 row
        // adress
        if (StringUtils.isNotBlank(g49r)) {
            row2.append(g49r);
        }
        //city
        if (StringUtils.isNotBlank(g48r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g48r);
        }
        //country
        if (StringUtils.isNotBlank(g46r)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g46r);
        }
        //index
        if (StringUtils.isNotBlank(g47_1)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append(g47_1);
        }
        //VAT
        if (StringUtils.isNotBlank(g410)) {
            if (StringUtils.isNotBlank(row2))
                row2.append(", ");
            row2.append("VAT ").append(g410);
        }
        //row 3
        // dop_info
        if (StringUtils.isNotBlank(g4_dop_info)) {
            row3.append(g4_dop_info);
        }
        if (row1.length() > 0) {
            _g4r.append(row1);
            _g4r.append("\n");
        }
        if (row2.length() > 0) {
            _g4r.append(row2);
            _g4r.append("\n");
        }
        if (row3.length() > 0) {
            _g4r.append(row3);
        }
        result.append("");
        if (_g4.length() > 0)
            result.append(_g4).append("\n");
        if (_g4r.length() > 0)
            result.append(_g4r);

        return result.toString();
//        String _g4a = (g4 != null ? g4 : "");
//        String _g4b = (g49 != null ? g49 : "") + (g45_1 != null ? " " + g45_1 : "") + (g47_1 != null ? " " + g47_1 : "")
//                + (g48_1 != null ? " " + g48_1 : "");
//        String _g4c = (g46_1 != null ? g46_1 : "") + (g410 != null ? " " + g410 : "");
//        String _g4 = _g4a + (_g4a != null && _g4a.trim().length() > 0 ? "\n" : "") + _g4b
//                + (_g4b != null && _g4b.trim().length() > 0 ? "\n" : "") + _g4c + (_g4c != null && _g4c.trim().length() > 0 ? "\n" : "");
//
//        String _g4ra = (g4r != null ? g4r : "");
//        String _g4rb = (g49r != null ? g49r : "") + (g45_1 != null ? " " + g45_1 : "") + (g47_1 != null ? " " + g47_1 : "")
//                + (g48r != null ? " " + g48r : "") + (g5_1 != null ? "\n" + g5_1 : "");
//        String _g4rc = (g46r != null ? g46r : "") + (g410 != null ? " " + g410 : "");
//        String _g4r = _g4ra + (_g4ra != null && _g4ra.trim().length() > 0 ? "\n" : "") + _g4rb
//                + (_g4rb != null && _g4rb.trim().length() > 0 ? "\n" : "") + _g4rc;
//        return (_g4.length() > 0 ? _g4 : "") + _g4r+" "+ g4_dop_info;
    }

    public String buildG5Print() {
        return g5;
    }
//    /**
//     * Generates print string for g5 smgs2.
//     * @return print string
//     */
//    public String buildG5SmgsPrint() {
//        StringBuilder stringBuilder = new StringBuilder();
//
//        stringBuilder.append(g101r!=null?g101r+" ":"").append(g102r!=null?g102r:"");
//        stringBuilder.append("\n");
//        stringBuilder.append(g2017!=null?g2017:"");
//
//        return stringBuilder.toString();
//    }

    /**
     * Гр5. Станция назначения - справа, сверху
     *
     * @return строкадля печати
     */
    public String buildG121_Print() {

        return (g12 != null ? g12 + " " : "") + StringUtils.defaultString(g121);
    }

    public String buildG10CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG101()));
        sb.append(StringUtils.isNotBlank(getG101r()) ? "\n" + getG101r() : "");
        return sb.toString();
    }

    public String buildG10_1CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG102()));
        sb.append(StringUtils.isNotBlank(getG102r()) ? "\n" + getG102r() : "");
        return sb.toString();
    }

    public String buildG15CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG15()));
        sb.append(StringUtils.isNotBlank(getG15r()) ? "\n" + getG15r() : "");
        return sb.toString();
    }

    public String buildG16CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG162()));
        sb.append(StringUtils.isNotBlank(getG162r()) ? "\n" + getG162r() : "");
        return sb.toString();
    }

    public String buildG16_1CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG163()));
        sb.append(StringUtils.isNotBlank(getG163r()) ? "\n" + getG163r() : "");
        return sb.toString();
    }

    public String buildG18Cs() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG18()));
        sb.append(StringUtils.isNotBlank(getG18r()) ? "\n" + getG18r() : "");
        return sb.toString();
    }

    public String buildG18CsPrint() {
        if (getG18c() != null && getG18c() == 1) {
//            return LIST_DOP_RU;
            return getText("form.labelDopList");
        } else {
            return buildG18Cs();
        }
    }

    public String buildG18bCsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG18B1()));
        sb.append(StringUtils.isNotBlank(getG18B1a()) ? "\n" + getG18B1a() : "");
        sb.append(StringUtils.isNotBlank(getG18B1b()) ? "\n" + getG18B1b() : "");
        sb.append(StringUtils.isNotBlank(getG18B1c()) ? "\n" + getG18B1c() : "");
        sb.append(StringUtils.isNotBlank(getG18B1d()) ? "\n" + getG18B1d() : "");
        return sb.toString();
    }

    public String buildG17CsPrint() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(getG171()));
        sb.append(StringUtils.isNotBlank(getG17()) ? " " + getG17() : "");
        return sb.toString();
    }

    public String getG_1_5k() {
        return g_1_5k;
    }

    public void setG_1_5k(String g_1_5k) {
        this.g_1_5k = g_1_5k;
    }

    public String getG_4_5k() {
        return g_4_5k;
    }

    public void setG_4_5k(String g_4_5k) {
        this.g_4_5k = g_4_5k;
    }

    public String getG_10_3r() {
        return g_10_3r;
    }

    public void setG_10_3r(String g_10_3r) {
        this.g_10_3r = g_10_3r;
    }

    public String getG_16_33r() {
        return g_16_33r;
    }

    public void setG_16_33r(String g_16_33r) {
        this.g_16_33r = g_16_33r;
    }

    public Set<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Set<Status> statuses) {
        this.statuses = statuses;
    }

    public void prepareGU4copy() {
//        setReady("");
//        setStatus(null);
        for (CimSmgsPlatel platel : getCimSmgsPlatels().values()) {
            platel.setKplat((platel.getKplat() != null ? platel.getKplat() : "") + (platel.getKplat1() != null ? "  " + platel.getKplat1() : ""));
            platel.setPlatR((platel.getDorR() != null ? platel.getDorR() : "") + (platel.getPlatR() != null ? "  " + platel.getPlatR() : ""));
        }

        StringBuilder buf = new StringBuilder();
        buf.append(StringUtils.isNotEmpty(getG_1_5k()) ? getG_1_5k() : "");
        buf.append(StringUtils.isNotEmpty(getG16r()) ? " " + getG16r() + ";" : "");
        buf.append(StringUtils.isNotEmpty(getG18r_1()) ? " " + getG18r_1() + ";" : "");
        buf.append(StringUtils.isNotEmpty(getG19r()) ? " " + getG19r() : "");
        this.setG19r(buf.toString());

        buf = new StringBuilder();
        buf.append(StringUtils.isNotEmpty(getG_4_5k()) ? getG_4_5k() : "");
        buf.append(StringUtils.isNotEmpty(getG46r()) ? " " + getG46r() + ";" : "");
        buf.append(StringUtils.isNotEmpty(getG48r()) ? " " + getG48r() + ";" : "");
        buf.append(StringUtils.isNotEmpty(getG49r()) ? " " + getG49r() : "");
        this.setG49r(buf.toString());

        buf = new StringBuilder(StringUtils.defaultString(g1r));
        buf.append(StringUtils.isNotEmpty(getG2()) ? " Код ОКПО " + getG2() : "");
        buf.append(StringUtils.isNotEmpty(getG_2inn()) ? " Код ИНН " + getG_2inn() : "");
        this.setG1r(buf.toString());

        buf = new StringBuilder(StringUtils.defaultString(g4r));
        buf.append(StringUtils.isNotEmpty(getG5()) ? " Код ОКПО " + getG5() : "");
        buf.append(StringUtils.isNotEmpty(getG_5inn()) ? " Код ИНН " + getG_5inn() : "");
        this.setG4r(buf.toString());
    }

    public Set<TdgLog> getTdgLog() {
        return tdgLog;
    }

    public void setTdgLog(Set<TdgLog> tdgLog) {
        this.tdgLog = tdgLog;
    }

    public Byte getGreenRail_status() {
        return greenRail_status;
    }

    public void setGreenRail_status(Byte greenRail_status) {
        this.greenRail_status = greenRail_status;
    }

    public boolean hasPackDoc() {
        return getPackDoc() != null && getPackDoc().getHid() != null;
    }

    public boolean hasRoute() {
        return getRoute() != null && getRoute().getHid() != null;
    }

    public boolean hasVag() {
        return MapUtils.isNotEmpty(getCimSmgsCarLists());
    }

    public CimSmgsCarList findOrCreateVag() {
        return hasVag() ? getCimSmgsCarLists().values().iterator().next() : new CimSmgsCarList((byte) 0, this);

    }

    public boolean hasKont() {
        return hasVag() && MapUtils.isNotEmpty(findOrCreateVag().getCimSmgsKonLists());
    }

    public CimSmgsKonList findOrCreateKont() {
        return hasKont() ? findOrCreateVag().getCimSmgsKonLists().values().iterator().next() : new CimSmgsKonList((byte) 0, findOrCreateVag());
    }

    public Set<Tbc2Log> getTbc2Logs() {
        return tbc2Logs;
    }

    public void setTbc2Logs(Set<Tbc2Log> tbc2Logs) {
        this.tbc2Logs = tbc2Logs;
    }

    private class Compare implements Comparator<CimSmgsDocs> {
        private boolean isInteger(String string) {
            try {
                new Integer(string);
            } catch (NumberFormatException ex) {
                return false;
            }
            return true;
        }

        public int compare(CimSmgsDocs o1, CimSmgsDocs o2) {
            if (o1.getCode() == null || o1.getCode().trim().length() == 0 || o2.getCode() == null || o2.getCode().trim().length() == 0)
                return -1;
            else {
                String code1 = o1.getCode().trim();
                String code2 = o2.getCode().trim();
                if (isInteger(code1) && isInteger(code2))
                    return new Integer(code1).compareTo(new Integer(code2));
                else
                    return o1.getCode().compareTo(o2.getCode());
            }
        }

        public boolean equals(Object obj) {
            return false;
        }

    }

    public String g7Disp4Print() {
        String _f7 = "";
        String _f7_1 = "";
        CimSmgsDocs docs[] = cimSmgsDocses7.values().toArray(new CimSmgsDocs[0]);
        Arrays.sort(docs, new Compare());

        for (CimSmgsDocs elem : docs) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f7 = _f7 + (elem.getCode() != null ? "7." + elem.getCode() + ". " : "")
                        + (elem.getText() != null ? elem.getText() + "&nbsp;&nbsp;" : "");
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f7_1 = _f7_1 + (elem.getCode() != null ? "7." + elem.getCode() + ". " : "")
                        + (elem.getText2() != null ? elem.getText2() + "&nbsp;&nbsp;" : "");
        }

        String _f722 = "";
        String _f722_1 = "";
        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            _f722 += (elem.getDorR() != null ? "Оплата по " + elem.getDorR() : "")
                    + (elem.getPlatR() != null ? " производится через " + elem.getPlatR() : "")
                    + (elem.getKplat() != null ? " код плательщика " + elem.getKplat() : "")
                    + (elem.getKplat1() != null ? "\\п/к" + elem.getKplat1() : "") + (elem.getKplat2() != null ? "\\" + elem.getKplat2() : "")
                    + (elem.getPrimR() != null ? " " + elem.getPrimR() : "") + " ";
            _f722_1 += (elem.getDor() != null ? elem.getDor() : "") + (elem.getPlat() != null ? " " + elem.getPlat() : "")
                    + (elem.getKplat() != null ? " " + elem.getKplat() : "") + (elem.getKplat1() != null ? "\\" + elem.getKplat1() : "")
                    + (elem.getKplat2() != null ? "\\" + elem.getKplat2() : "") + (elem.getPrim() != null ? " " + elem.getPrim() : "") + " ";
        }
        _f7 += _f722;
        _f7_1 += _f722_1;

        _f7 += (getG694() != null && getG694().length() > 0) ? getG694() : "";

        return _f7_1 + _f7;
    }

    public String buildG7Cs() {
        StringBuffer _f7 = new StringBuffer();
        CimSmgsDocs docs[] = cimSmgsDocses7.values().toArray(new CimSmgsDocs[0]);

        for (CimSmgsDocs elem : docs) {
            _f7.append(elem.getCode() != null ? elem.getCode() + "." : "");
            _f7.append(elem.getText() != null ? " " + elem.getText() : "");
            _f7.append(elem.getText() != null && elem.getText2() != null ? " /" : "");
            _f7.append(elem.getText2() != null ? " " + elem.getText2() : "");
            _f7.append(" ");
        }

        StringBuffer _f722 = new StringBuffer();
        if (cimSmgsPlatels.size() > 0) {
            _f722.append("22.");
        }

        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            _f722.append(" Оплата по ");
            _f722.append(elem.getDorR() != null ? elem.getDorR() : "");
            _f722.append(elem.getDorR() != null && elem.getDor() != null ? " / " : "");
            _f722.append(elem.getDor() != null ? elem.getDor() : "");
            _f722.append(" производится через ");
            _f722.append(elem.getPlatR() != null ? elem.getPlatR() : "");
            _f722.append(elem.getPlatR() != null && elem.getPlat() != null ? " / " : "");
            _f722.append(elem.getPlat() != null ? elem.getPlat() : "");
            _f722.append(elem.getPrimR() != null && elem.getPrim() != null ? " способ оплаты " : "");
            _f722.append(elem.getPrimR() != null ? elem.getPrimR() : "");
            _f722.append(elem.getPrimR() != null && elem.getPrim() != null ? " / " : "");
            _f722.append(elem.getPrim() != null ? elem.getPrim() : "");
            _f722.append(elem.getKplat() != null ? " код плательщика " + elem.getKplat() : "");
            _f722.append(elem.getKplat1() != null ? " п/к " + elem.getKplat1() : "");
            _f722.append(";");
        }
        if (cimSmgsPlatels.size() > 0) {
            _f722.append("\n");
        }
        _f722.append(getG4prim() != null ? getG4prim() : "");

        _f7.append(_f722);
        delLastSimbolIfEqual("\n", _f7);

        return _f7.toString();
    }

    public String buildG7CsPrint() {
        if (getG7c() != null && getG7c() == 1) {
//            return LIST_DOP_RU;
            return getText("form.labelDopList");
        } else {
            return buildG7Cs();
        }
    }

    private void delLastSimbolIfEqual(String simbol, StringBuffer source) {
        int lastInx;
        if ((source != null && source.length() > 0) || (lastInx = source.lastIndexOf(simbol)) == -1) {
            return;
        }

        if ((lastInx + 1) == source.length()) {
            source.replace(lastInx, source.length(), "");
        }
    }

    public String g7Disp4PrintSmgs() {
        String _f7 = "";
        String _f7_1 = "";
        String _f722 = "";
        CimSmgsDocs docs[] = cimSmgsDocses7.values().toArray(new CimSmgsDocs[0]);
        Arrays.sort(docs, new Compare());
        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            if ((elem.getDor() != null) || (elem.getDorR() != null)) {
                _f722 += "оплата по " +
                        (elem.getDor() != null ? elem.getDor() : "") + " " +
                        (elem.getDorR() != null ? elem.getDorR() : "") + " ";
            }
            if (elem.getPlat() != null || elem.getPlatR() != null) {
                _f722 += "производится через " +
                        (elem.getPlat() != null ? elem.getPlat() : "") + " " +
                        (elem.getPlatR() != null ? elem.getPlatR() : "") + " ";
            }
            if (elem.getPrim() != null || elem.getPrimR() != null) {
                _f722 += " " + (elem.getPrim() != null ? elem.getPrim() + " " : "") +
                        (elem.getPrimR() != null ? elem.getPrimR() + " " : "");
            }
            _f722 += (elem.getKplat() != null ? "код плательщика " + elem.getKplat() : "") +
                    (elem.getKplat1() != null ? " п/к " + elem.getKplat1() : "") +
                    (elem.getKplat2() != null ? "/" + elem.getKplat2() : "") +
                    "<br/>";
        }
        _f722 += (g4prim != null ? g4prim : "");
//		for (CimSmgsDocs elem : docs) {
//			if (elem.getText() != null && elem.getText().length() > 0)
//				_f7 = _f7 + (elem.getText() != null ? elem.getText() + "&nbsp;&nbsp;" : "");
//			if (elem.getText2() != null && elem.getText2().length() > 0)
//				_f7_1 = _f7_1 + (elem.getText2() != null ? elem.getText2() + "&nbsp;&nbsp;" : "");
//		}          s
//		_f722 += _f7 + _f7_1;

        return _f722.trim();
    }

    /**
     * Строим графу 23 для печати
     *
     * @return строкадля печати
     */
    public String buildG4SmgsPrint() {
        String _f7 = "";
        String _f7_1 = "";
//        String _f722 = "";
        StringBuilder _f722 = new StringBuilder();
        CimSmgsDocs docs[] = cimSmgsDocses7.values().toArray(new CimSmgsDocs[0]);
        Arrays.sort(docs, new Compare());
        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            if (elem.getDorR() != null) {
                _f722.append(elem.getDorR()).append(" ");
            }
            if (elem.getPlatR() != null) {
                _f722.append(elem.getPlatR()).append(" ");
            }
            if (elem.getPrimR() != null) {
                _f722.append(elem.getPrimR()).append(" ");
            }
            if (elem.getKplat() != null) {
                _f722.append("код:").append(elem.getKplat());
            }

            if (elem.getKplat1() != null) {
                if (elem.getKplat() != null)
                    _f722.append("/");
                _f722.append(elem.getKplat1());
            }

            if (elem.getKplat3() != null) {
                if (elem.getKplat() != null || elem.getKplat1() != null)
                    _f722.append("/");
                _f722.append(elem.getKplat3());
            }

            if (elem.getPrim() != null) {
                _f722.append(elem.getPrim()).append(" ");
            }

            if (elem.getnDog() != null) {
                _f722.append(elem.getnDog()).append(" ");
            }

            if (elem.getDatDog() != null) {
                _f722.append(new SimpleDateFormat("dd.MM.yyyy").format(elem.getDatDog()));
            }
            _f722.append("\n");
//            if ((elem.getDor() != null) || (elem.getDorR() != null)) {
//                _f722 += "оплата по " +
//                        (elem.getDor() != null ? elem.getDor() : "") + " " +
//                        (elem.getDorR() != null ? elem.getDorR() : "") + " ";
//            }
//            if (elem.getPlat() != null || elem.getPlatR() != null) {
//                _f722 += "производится " +
//                        (elem.getPlat() != null ? elem.getPlat() : "") + " " +
//                        (elem.getPlatR() != null ? elem.getPlatR() : "") + " ";
//            }
//            if (elem.getPrim() != null || elem.getPrimR() != null) {
//                _f722 += " " + (elem.getPrim() != null ? elem.getPrim() + " " : "") +
//                        (elem.getPrimR() != null ? elem.getPrimR() + " " : "");
//            }
//            _f722 += (elem.getKplat() != null ? "код плательщика " + elem.getKplat() : "") +
//                    (elem.getKplat1() != null ? " п/к " + elem.getKplat1() : "") +
//                    (elem.getKplat2() != null ? "/" + elem.getKplat2() : "") +
//                    "\n";
        }
//        _f722 += (g4prim != null ? g4prim : "");

        return _f722.toString();
    }

    public String buildG6Print() {
        StringBuilder sb = new StringBuilder();
        if (StringUtils.isNotBlank(getG15())) {
            sb.append(getG15());
            sb.append("\n");
        }
        if (StringUtils.isNotBlank(getG15r())) {
            sb.append(getG15r());
        }
        return sb.toString();
    }

    public String buildG6CsPrint() {
        return StringUtils.defaultString(getG6());
    }

    public String buildGuCennostPrint() {
        return StringUtils.defaultString(getG27());
    }

    public String buildG19CsPrint() {
        final String text = "Siehe Nachweisung\nсм. Ведомость";

        switch (getCimSmgsCarLists().size()) {
            case 1:
                if (countConts() > 1) {
                    return text;
                } else {
                    return getCimSmgsCarLists().values().iterator().next().vag4CimSmgs1();
                }
            case 0:
                return "";
            default:
                return text;
        }
//        return getCimSmgsCarLists().size() > 0 ? getCimSmgsCarLists().values().iterator().next().vag4CimSmgs1() : "";
    }

    public String buildG19GrPdCsPrint() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && !isGroupContOtpr()) {
            CimSmgsCarList vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getGrPod() != null && vag.getGrPod().intValue() > 0 ? vag.getGrPod().toString() : "";
        }
        return result;
    }

    public String buildG19KlOsCsPrint() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && !isGroupContOtpr()) {
            CimSmgsCarList vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getKolOs() != null && vag.getKolOs() > 0 ? vag.getKolOs().toString() : "";
        }
        return result;
    }

    public String buildG19TrVgCsPrint() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && !isGroupContOtpr()) {
            CimSmgsCarList vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getTaraVag() != null && vag.getTaraVag().intValue() > 0 ? vag.getTaraVag().toString() : "";
        }
        return result;
    }

    public String buildG9CsPrint() {
        final String text = "Siehe Nachweisung\nсм. Ведомость";

        if (getG9c() != null && getG9c() == 1) {
            return getText("form.labelDopList");
        } else {
            switch (getCimSmgsCarLists().size()) {
                case 1:
                    if (countConts() > 1) {
                        return text;
                    } else {
                        return buildG9Cs();
                    }
                case 0:
                    return "";
                default:
                    return text;
            }
        }
    }

    public String buildG2012CsPrint() {
        StringBuilder sb = new StringBuilder();
        int plombsCount = 0;
        int vagsCount = getCimSmgsCarLists().size();
        int contsCount = 0;
        String delim = "";

        for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
            if (isContOtpr()) {
                for (CimSmgsKonList cont : vag.getCimSmgsKonLists().values()) {
                    for (CimSmgsPlomb plomb : cont.getCimSmgsPlombs().values()) {
                        if (vagsCount == 1 && vag.getCimSmgsKonLists().size() == 1) {
                            sb.append(delim);
                            sb.append(plomb.plomb4CsPrint());
                            delim = ", ";
                        }
                        plombsCount += plomb.getKpl() != null ? plomb.getKpl() : 0;
                    }
                    contsCount++;
                }
            } else {
                for (CimSmgsPlomb plomb : vag.getCimSmgsPlombs().values()) {
                    if (vagsCount == 1) {
                        sb.append(delim);
                        sb.append(plomb.plomb4CsPrint());
                        delim = ", ";
                    }
                    plombsCount += plomb.getKpl() != null ? plomb.getKpl() : 0;
                }
            }
        }

        if (isGroupContOtpr()) {
            sb
                    .append("verschlüsse / пломбы ")
                    .append(plombsCount)
                    .append(" (Siehe Nachweisung / см.ведомость)");
        }
        return sb.toString();
    }

    public String buildG27Print() {
        return getCimSmgsCarLists().size() > 0 ? getCimSmgsCarLists().values().iterator().next().getNvag() : "";
    }

    public String buildG21CsPrint() {
        return getG21() != null && getG21() == 1 ? "X" : "";
    }

    public String buildG22CsPrint() {
        return getG22() != null && getG22() == 1 ? "X" : "";
    }

    public String buildCimPrint() {
        return getCim() != null && getCim() == 1 ? "X" : "";
    }

    public String buildG28Print() {
        BigDecimal res = null;
        if (getCimSmgsCarLists().size() > 0 && (res = getCimSmgsCarLists().values().iterator().next().getGrPod()) != null) {
            return res.toString();
        }
        return "";
    }

    public String buildG21_1CmrPrint() {
        return StringUtils.defaultString(g28);
    }

    public String buildG29Print() {
        Byte res = null;
        if (getCimSmgsCarLists().size() > 0 && (res = getCimSmgsCarLists().values().iterator().next().getKolOs()) != null) {
            return res.toString();
        }
        return "";

    }

    public String buildG30Print() {
        BigDecimal res = null;
        if (getCimSmgsCarLists().size() > 0 && (res = getCimSmgsCarLists().values().iterator().next().getTaraVag()) != null) {
            return res.toString();
        }
        return "";
    }

    public String buildG30CsPrint() {
        return StringUtils.defaultString(getG30());
    }

    public String buildG20_1CsPrint() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().kon4CimSmgs1());
        }
        return result;
    }

    /*public String buildG20_2CsPrint() {
        Map<Byte, CimSmgsKonList> konList;
        Map<Byte, CimSmgsGruz> gruzList;
        StringBuilder sb = new StringBuilder();
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 &&
                (gruzList = konList.values().iterator().next().getCimSmgsGruzs()).size() > 0) {
            if (gruzList.size() > 1) {
                sb.append("Сборный груз: Sammelgut:\n");
            }
            sb.append(gruzList.values().iterator().next().gruz4CimSmgs1());
        }
        return sb.toString();
    }*/

    public String buildG20_2CsPrint() {
        if (getG20c() != null && getG20c() == 1) {
//            return LIST_DOP_RU;
            return getText("form.labelDopList");
        } else {
            StringBuilder sb = new StringBuilder();
            for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
                for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                    if (kon.getCimSmgsGruzs() != null && kon.getCimSmgsGruzs().size() > 0) {
                        if (kon.getCimSmgsGruzs().size() > 1) {
                            sb.append("Сборный груз: Sammelgut:\n");
                        }
                        for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                            sb.append(gruz.gruz4CimSmgs1());
                            sb.append("\n");
                        }
                    }

                }
            }
            return sb.toString();
        }
    }

    public String buildG20_2CsEuPrint() {
        return buildG20_2CsEuPrint(false);
    }

    public String buildG20_2CsEuPrint(boolean forDoplist) {
        StringBuilder sb = new StringBuilder();
        int contsCount = 0;
        boolean withDopList = !forDoplist && getG20c() != null && getG20c() == 1;
        CimSmgsKonList firstCont = null;
        Map<String, CimSmgsGruz> gruzTempMap = new TreeMap<>();

        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
            if (isContOtpr()) {
                for (CimSmgsKonList cont : car.getCimSmgsKonLists().values()) {
                    if (!withDopList) {
                        // group grys by code gng
                        for (CimSmgsGruz gruz : cont.getCimSmgsGruzs().values()) {
                            buildCsGruzPrint(gruzTempMap, gruz);
                        }
                    }

                    if (firstCont == null) {
                        firstCont = cont;
                    }
                    contsCount++;
                }
            } else {
                if (!withDopList) {
                    // group grys by code gng
                    for (CimSmgsGruz gruz : car.getCimSmgsGruzs().values()) {
                        buildCsGruzPrint(gruzTempMap, gruz);
                    }
                }
            }
        }

        if (contsCount == 1) {
            sb.append(firstCont.kont4CsPrint());
        } else if (contsCount > 1) {
            sb.append(contsCount + " Containers / " + contsCount + " контейнер.");
        }

        if (withDopList) {
            sb.append("\n" + LIST_DOP_RU);
        } else {
            int index = 0;
            for (CimSmgsGruz gruz : gruzTempMap.values()) {
                sb.append("\n");
                sb.append(gruz.gruz4CimSmgsEu(index, isGroupContOtpr(), gruzTempMap.size()));
                index++;
            }

            sb.append("\n");
            sb.append(StringUtils.defaultString(g11_prim));
        }

        return sb.toString();
    }

    private void buildCsGruzPrint(Map<String, CimSmgsGruz> gruzTempMap, CimSmgsGruz gruz) {
        String kgvn = String.valueOf(StringUtils.isNotBlank(gruz.getKgvn()) ? gruz.getKgvn() : -1);
        CimSmgsGruz gruzTemp = gruzTempMap.get(kgvn);
        if (gruzTemp == null) {
            gruzTemp = new CimSmgsGruz();

            gruzTemp.setEkgvn(gruz.getEkgvn());
            gruzTemp.setEnzgr(gruz.getEnzgr());
            gruzTemp.setKgvn(kgvn);
            gruzTemp.setMassa(gruz.getMassa());
            gruzTemp.setNzgr(gruz.getNzgr());
            gruzTemp.setNzgrEu(gruz.getNzgrEu());
            gruzTemp.setPlaces(gruz.getPlaces());
            gruzTemp.setUpak(gruz.getUpak());
            gruzTemp.setUpakForeign(gruz.getUpakForeign());
            gruzTemp.setPlaces(0);
            gruzTemp.setMassa(BigDecimal.ZERO);
            gruzTemp.upakGroupsDe(new HashMap<String, Integer>());
            gruzTemp.upakGroupsRu(new HashMap<String, Integer>());
            gruzTemp.setCimSmgsDanGruzs(gruz.getCimSmgsDanGruzs());

            gruzTempMap.put(kgvn, gruzTemp);
        }

        Integer places = gruz.getPlaces() == null ? 0 : gruz.getPlaces();
        gruzTemp.setPlaces(
                (gruzTemp.getPlaces() == null ? 0 : gruzTemp.getPlaces()) + places
        );
        gruzTemp.setMassa(
                (gruzTemp.getMassa() == null ? BigDecimal.ZERO : gruzTemp.getMassa())
                        .add(
                                gruz.getMassa() == null ? BigDecimal.ZERO : gruz.getMassa()
                        )
        );

        String upak = StringUtils.isNotBlank(gruz.getUpak()) && StringUtils.isNotBlank(gruz.getUpak().trim()) ? gruz.getUpak().trim() : "Место";
        Integer tempPlaces = gruzTemp.upakGroupsRu().get(upak);
        if (tempPlaces == null) {
            tempPlaces = 0;
            gruzTemp.upakGroupsRu().put(upak, tempPlaces);
        }
        gruzTemp.upakGroupsRu().put(upak, tempPlaces + places);

        upak = StringUtils.isNotBlank(gruz.getUpakForeign()) && StringUtils.isNotBlank(gruz.getUpakForeign().trim()) ? gruz.getUpakForeign().trim() : "Kolli";
        tempPlaces = gruzTemp.upakGroupsDe().get(upak);
        if (tempPlaces == null) {
            tempPlaces = 0;
            gruzTemp.upakGroupsDe().put(upak, tempPlaces);
        }
        gruzTemp.upakGroupsDe().put(upak, tempPlaces + places);
    }

    public String buildG20Cs() {
        StringBuilder sb = new StringBuilder();
        final String nl = "\n";
//        String prefix = "";
        for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                sb.append(kon.kon4CimSmgs1());
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(nl);
//                    prefix = nl;
                    sb.append(gruz.gruz4CimSmgs1());
                    sb.append(nl);
                    sb.append(gruz.mesta4CimSmgs1());
                }
                break;
            }
            break;
        }

        return sb.toString();
    }

    /*public String buildG20_3CsPrint() {
        Map<Byte, CimSmgsKonList> konList;
        Map<Byte, CimSmgsGruz> gruzList;
        StringBuilder sb = new StringBuilder();
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 &&
                (gruzList = konList.values().iterator().next().getCimSmgsGruzs()).size() > 0) {
            if (gruzList.size() > 1) {
                sb.append("\n");
            }
            sb.append(gruzList.values().iterator().next().mesta4CimSmgs1());
        }
        return sb.toString();
    }*/

    public String buildG20_3CsPrint() {
        /*Map<Byte, CimSmgsKonList> konList;
        Map<Byte, CimSmgsGruz> gruzList;
        StringBuilder sb = new StringBuilder();
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 &&
                (gruzList = konList.values().iterator().next().getCimSmgsGruzs()).size() > 0) {
            if (gruzList.size() > 1) {
                sb.append("\n");
            }
            sb.append(gruzList.values().iterator().next().mesta4CimSmgs1());
        }*/

        StringBuilder sb = new StringBuilder();
        for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                if (kon.getCimSmgsGruzs() != null && kon.getCimSmgsGruzs().size() > 0) {
                    /*if(kon.getCimSmgsGruzs().size() > 1){
                        sb.append("\n");
                    }*/
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        sb.append("\n");
                        String upak = gruz.upak4CimSmgs1();
                        if (upak.length() > 0) {
                            sb.append(upak);
                            sb.append("\n");
                        }
                        sb.append(gruz.mesta4CimSmgs1());
                        sb.append("\n");
                        sb.append("\n");
                    }
                }

            }
        }
        return sb.toString();
    }

    public String buildGuKont1Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getOwnerKod());
        }
        return result;
    }

    public String buildGuKont2Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getUtiN());
        }
        return result;
    }

    public String buildGuKont3Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getVid());
        }
        return result;
    }

    public String buildGuKont4Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getUtiType());
        }
        return result;
    }

    public String buildGuKont5Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getSpecKon());
        }
        return result;
    }

    public String buildGuVag1Print() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0) {
            result = StringUtils.defaultString(getCimSmgsCarLists().values().iterator().next().getRod());
        }
        return result;
    }

    public String buildGuVag2Print() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0) {
            result = StringUtils.defaultString(getCimSmgsCarLists().values().iterator().next().getNvag());
        }
        return result;
    }

    public String buildGuVag3Print() {
        String result = "";
        CimSmgsCarList vag;
        if (getCimSmgsCarLists().size() > 0) {
            vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getGrPod() != null ? vag.getGrPod().toString() : "";
        }
        return result;
    }

    public String buildGuVag4Print() {
        String result = "";
        CimSmgsCarList vag;
        if (getCimSmgsCarLists().size() > 0) {
            vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getKolOs() != null ? vag.getKolOs().toString() : "";
        }
        return result;
    }

    public String buildGuVag5Print() {
        String result = "";
        CimSmgsCarList vag;
        if (getCimSmgsCarLists().size() > 0) {
            vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getTaraVag() != null ? vag.getTaraVag().toString() : "";
        }
        return result;
    }

    public String buildGuVag6Print() {
        String result = "";
        CimSmgsCarList vag;
        if (getCimSmgsCarLists().size() > 0) {
            vag = getCimSmgsCarLists().values().iterator().next();
            result = vag.getMassGross() != null ? vag.getMassGross().toString() : "";
        }
        return result;
    }

    public String buildGuVag7Print() {
        String result = "";
        if (getCimSmgsCarLists().size() > 0) {
            result = StringUtils.defaultString(getCimSmgsCarLists().values().iterator().next().getSpeed());
        }
        return result;
    }

    public String buildGuPlat1Print() {
        String result = "";
        if (getCimSmgsPlatels().size() > 0) {
            result = StringUtils.defaultString(getCimSmgsPlatels().values().iterator().next().getPlatR());
        }
        return result;
    }

    public String buildGuPlat2Print() {
        String result = "";
        if (getCimSmgsPlatels().size() > 0) {
            result = StringUtils.defaultString(getCimSmgsPlatels().values().iterator().next().getKplat());
        }
        return result;
    }

    public String buildPogrKon1Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 && Byte.valueOf((byte) 1).equals(konList.values().iterator().next().getPogrKon())) {
            result = "-----------";
        }
        return result;
    }

    public String buildPogrKon2Print() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 && Byte.valueOf((byte) 2).equals(konList.values().iterator().next().getPogrKon())) {
            result = "------------";
        }
        return result;
    }

    public String buildG9Print() {
        Map<Byte, CimSmgsKonList> konList;
        CimSmgsKonList kon;
        StringBuilder sb = new StringBuilder();
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            kon = konList.values().iterator().next();
            sb.append(StringUtils.isNotBlank(kon.getUtiN()) ? kon.getUtiN() + " P" + "\n" : "");
            sb.append(kon.getSizeFoot() != null ? kon.getSizeFoot() + "\n" : "");
            sb.append(StringUtils.isNotBlank(kon.getPrim()) ? kon.getPrim() : "");
        }
        return sb.toString().trim();
    }

    public String buildG9_1Print() {
        Map<Byte, CimSmgsKonList> konList;
        CimSmgsKonList kon;
        StringBuilder sb = new StringBuilder();
        if (getCimSmgsCarLists().size() > 0 && (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            kon = konList.values().iterator().next();
            sb.append(StringUtils.isNotBlank(kon.getUtiN()) ? kon.getUtiN() + "\n" : "");
            sb.append(kon.getSizeFoot() != null ? kon.getSizeFoot() + "\n" : "");
            sb.append(StringUtils.isNotBlank(kon.getPrim()) ? kon.getPrim() : "");
        }
        return sb.toString().trim();
    }

    public String buildGuKodGrPrint() {
        Map<Byte, CimSmgsKonList> konList;
        Map<Integer, CimSmgsGruz> gruzList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0 &&
                (gruzList = konList.values().iterator().next().getCimSmgsGruzs()).size() > 0) {
            result = gruzList.values().iterator().next().kgvn4GuDisp1();
        }
        return result;
    }

    public String buildGuStOtpr1Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isNotBlank(getG162r()) ? getG162r() : "");
        sb.append(StringUtils.isNotBlank(getG163r()) ? "\n" + getG163r() : "");
        return sb.toString();
    }

    public String buildGuStOtpr2Print() {
        return StringUtils.defaultString(getG692());
    }

    public String buildGuStNazn1Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isNotBlank(getG101r()) ? getG101r() : "");
        sb.append(StringUtils.isNotBlank(getG102r()) ? "\n" + getG102r() : "");
        return sb.toString();
    }

    public String buildGuStNazn2Print() {
        return StringUtils.defaultString(getG121());
    }

    public String buildG10Print() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList vag : getCimSmgsCarLists().values())
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.getUpak()) ? prefix + gruz.getUpak() : "");
                    prefix = "\n";
                }
        return sb.toString();
    }

    public String buildGuGrMestaPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList vag : getCimSmgsCarLists().values())
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(gruz.getPlaces() != null ? prefix + gruz.getPlaces() : "");
                    prefix = "\n";
                }
        return sb.toString();
    }

    public String buildGu29GrNaimPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        int grIdx = 1;
        for (CimSmgsCarList vag : getCimSmgsCarLists().values())
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.getNzgr()) ? prefix + gruz.getNzgr() + "\n" : "");
                    if (grIdx > 1) {
                        sb.append(StringUtils.isNotBlank(gruz.getKgvn()) ? "ГНГ " + gruz.getKgvn() + "\n" : "");
                    }
                    sb.append(StringUtils.isNotBlank(gruz.getEnzgr()) ? gruz.getEnzgr() + "\n" : "");
                    sb.append(StringUtils.isNotBlank(gruz.getEkgvn()) ? "ЕТ СНГ  " + gruz.getEkgvn() : "");
                    grIdx++;
                    prefix = "\n";
                }
            }
        return sb.toString();
    }

    public String buildGu27GrNaimPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList vag : getCimSmgsCarLists().values())
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.getEnzgr()) ? prefix + gruz.getEnzgr() + "\n" : "");
                    sb.append(StringUtils.isNotBlank(gruz.getEkgvn()) ? "ЕТСНГ-" + gruz.getEkgvn() + "\n" : "");
                    sb.append(StringUtils.isNotBlank(gruz.getNzgr()) ? gruz.getNzgr() + "\n" : "");
                    sb.append(StringUtils.isNotBlank(gruz.getKgvn()) ? "ГНГ " + gruz.getKgvn() : "");
                    prefix = "\n";
                }
            }
        return sb.toString();
    }

    public String buildGuGrUpakPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList vag : getCimSmgsCarLists().values())
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.getUpak()) ? prefix + gruz.getUpak() : "");
                    prefix = "\n";
                }
        return sb.toString();
    }

    public String buildG11CsPrint() {
        return StringUtils.defaultString(g11);
    }

    public String buildG12CsPrint() {
        return StringUtils.defaultString(g12);
    }

    public String buildG11Print() {
        StringBuffer result = new StringBuffer();
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                if (kon.getCimSmgsGruzs().size() == 1) {
                    CimSmgsGruz gruz = kon.getCimSmgsGruzs().values().iterator().next();
                    if (gruz.getKgvn() != null) {
                        result.append("ГНГ- ");
                        result.append(gruz.getKgvn());
                        result.append("\n");
                    }
                    if (gruz.getNzgrEu() != null) {
                        result.append(gruz.getNzgrEu());
                        result.append("\n");
                    }
                    if (gruz.getNzgr() != null) {
                        result.append(gruz.getNzgr());
                        result.append("\n");
                    }

                    if (gruz.getEkgvn() != null) {
                        result.append("ЕТ СНГ- ");
                        result.append(gruz.getEkgvn());
                        result.append("\n");
                    }
                    if (gruz.getEnzgr() != null) {
                        result.append(gruz.getEnzgr());
                        result.append("\n");
                    }
                    if (gruz.getMassa() != null) {
                        result.append("Масса- ");
                        result.append(gruz.getMassa());
                        result.append(" ");
                    }
                    if (gruz.getPlaces() != null) {
                        result.append("Места- ");
                        result.append(gruz.getPlaces());
                        result.append("\n");
                    }
                } else {
//                    gruz = kon.getCimSmgsGruzs().get(index);
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        if (gruz.getKgvn() != null) {
                            result.append("ГНГ- ");
                            result.append(gruz.getKgvn());
                            result.append(" ");
                        }
                        if (gruz.getNzgrEu() != null) {
                            result.append(gruz.getNzgrEu());
                            result.append(" ");
                        }
                        if (gruz.getNzgr() != null) {
                            result.append(gruz.getNzgr());
                            result.append(" ");
                        }
                        if (gruz.getEkgvn() != null) {
                            result.append("ЕТ СНГ- ");
                            result.append(gruz.getEkgvn());
                            result.append(" ");
                        }
                        if (gruz.getEnzgr() != null) {
                            result.append(gruz.getEnzgr());
                            result.append(" ");
                        }
                        if (gruz.getMassa() != null) {
                            result.append("\n");
                            result.append("Масса- ");
                            result.append(gruz.getMassa());
                            result.append(" ");
                        }
                        if (gruz.getPlaces() != null) {
                            result.append("Места- ");
                            result.append(gruz.getPlaces());
                            result.append("\n");
                        }
                    }
                }
            }
        }
        return result.toString();
    }

    public String buildG12Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isNotBlank(getKontKol()) ? getKontKol() : "");
        Integer sum = 0;
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }

        sb.append(sum != 0 ? "\n" + sum : "");
        return sb.toString();
    }

    public String buildG16Print() {
        return StringUtils.defaultString(g14);
    }

    public String buildG13Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(getG24N() != null ? "Н-" + getG24N() : "");
        sb.append(getG24T() != null ? "\nТ-" + getG24T() : "");
        sb.append(getG24B() != null ? "\nБ-" + getG24B() : "");
        return sb.toString();
    }

    public String buildG18Print() {
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                return StringUtils.defaultString(kon.getVid());
            }
        return "";
    }

    public String buildG21Print() {
        return "X";
    }

    public String buildG21_pl1Print() {
        return "XXXXXXXXXXXXXXXXXX";
    }

    public String buildG21_pl2Print() {
        return "XXXXXXXXXXXXXXXXXX";
    }

    public String buildG21TxtPrint() {
        return StringUtils.defaultString(getG25Txt());
    }

    public String buildG22_1Print() {
        return (gs_22 != null && gs_22 == 1 ? "X" : "");
    }

    public String buildG22_2Print() {
        return (gs_22 != null && gs_22 == 2 ? "X" : "");
    }

    public String buildG22_pl1Print() {
        return (gs_22 != null && gs_22 == 2 ? "XXXXXXXXXXXXXXXXXX" : "");
    }

    public String buildG22_pl2Print() {
        return (gs_22 != null && gs_22 == 1 ? "XXXXXXXXXXXXXXXXXX" : "");
    }

    public String buildG22CimPrint() {
        return (g21 != null && g21 == 1 ? "X" : "");
    }

    public String buildG12SlovNPrint() {
        return (g21 != null && g21 == 1 ? "X" : "");
    }

    public String buildG23CimPrint() {
        return (g22 != null && g22 == 1 ? "X" : "");
    }

    public String buildG13SlovNPrint() {
        return (g22 != null && g22 == 1 ? "X" : "");
    }

    public String buildG58_1CimPrint() {
        return (gb661 != null && gb661 == 1 ? "X" : "");
    }

    public String buildG19Print() {
        StringBuilder sb = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                sb.append(kon.getKodSob() != null ? kon.getKodSob() : "");
                sb.append(StringUtils.isNotBlank(kon.getUtiN()) ? "  " + kon.getUtiN() + " P" : "");
            }
        return sb.toString();
    }

    public String buildG19_1Print() {
        StringBuilder sb = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                sb.append(kon.getKodSob() != null ? kon.getKodSob() : "");
                sb.append(StringUtils.isNotBlank(kon.getUtiN()) ? "  " + kon.getUtiN() : "");
            }
        return sb.toString();
    }

    public String buildG20Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isNotBlank(getG18()) ? getG18() : "");
        sb.append(StringUtils.isNotBlank(getG18r()) ? "\n" + getG18r() : "");
        return sb.toString();
    }

    public String g7Disp4PrintCim() {
        ArrayList<String> arr1 = new ArrayList<String>();
        ArrayList<String> arr2 = new ArrayList<String>();
        int diff;
        StringBuilder result = new StringBuilder();

        for (CimSmgsDocs elem : cimSmgsDocses7.values()) {
            arr1.add(
                    (elem.getCode() != null ? "7." + elem.getCode() + " " : "") +
                            (elem.getText() != null ? elem.getText() + " " : "") +
                            (elem.getText2() != null ? elem.getText2() : "") +
                            "<br/>"
            );
        }
        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            arr2.add(
                    (elem.getDor() != null ? elem.getDor() + " " : "") +
                            (elem.getPlat() != null ? elem.getPlat() + " " : "") +
                            (elem.getPrim() != null ? elem.getPrim() + " " : "") +
                            (elem.getKplat() != null ? elem.getKplat() + " " : "") +
                            (elem.getKplat1() != null ? elem.getKplat1() : "") +
                            "<br/>"
            );
        }
        diff = arr1.size() - arr2.size();
        if (diff > 0) {
            do {
                arr2.add("");
                diff--;
            } while (diff > 0);
        } else if (diff < 0) {
            do {
                arr1.add("");
                diff++;
            } while (diff < 0);
        }
        for (int i = 0; i < arr1.size(); i++) {
            result.append(arr1.get(i));
            result.append(arr2.get(i));
        }
        return result.toString();
    }

    public String buildG14SlovNPrint() {
        StringBuilder result = new StringBuilder();
        String prefix = "";
        for (CimSmgsPlatel plat : cimSmgsPlatels.values()) {
            result.append(prefix);
            prefix = "\n";
            result.append(StringUtils.isNotBlank(plat.getPlat()) ? plat.getPlat() : "");
            result.append(StringUtils.isNotBlank(plat.getPrim()) ? ", " + plat.getPrim() : "");
            result.append(StringUtils.isNotBlank(plat.getKplat()) ? ", " + plat.getKplat() : "");
            result.append(StringUtils.isNotBlank(plat.getKplat1()) ? ", " + plat.getKplat1() : "");
        }
        return result.toString();
    }

    public String buildG22SlovNPrint() {
        StringBuilder result = new StringBuilder();
        String prefix = "";
        for (CimSmgsDocs doc : cimSmgsDocses9.values()) {
            result.append(prefix);
            prefix = "\n";
            result.append(StringUtils.isNotBlank(doc.getText2()) ? doc.getText2() : "");
            result.append(StringUtils.isNotBlank(doc.getNdoc()) ? " " + doc.getNdoc() : "");
            result.append(doc.getDat() != null ? " " + new SimpleDateFormat("dd.MM.yyyy").format(doc.getDat()) : "");
            result.append(doc.getNcopy() != null ? " " + doc.getNcopy() : "");
        }
        return result.toString();
    }

    public String buildG7CimPrint() {
        ArrayList<String> arr1 = new ArrayList<String>();
        ArrayList<String> arr2 = new ArrayList<String>();
        int diff;
        StringBuilder result = new StringBuilder();

        for (CimSmgsDocs elem : cimSmgsDocses7.values()) {
            arr1.add(
                    (elem.getCode() != null ? "7." + elem.getCode() + " " : "") +
                            (elem.getText() != null ? elem.getText() + " " : "") +
                            (elem.getText2() != null ? elem.getText2() : "") +
                            "\n"
            );
        }
        for (CimSmgsPlatel elem : cimSmgsPlatels.values()) {
            arr2.add(
                    (elem.getDor() != null ? elem.getDor() + " " : "") +
                            (elem.getPlat() != null ? elem.getPlat() + " " : "") +
                            (elem.getPrim() != null ? elem.getPrim() + " " : "") +
                            (elem.getKplat() != null ? elem.getKplat() + " " : "") +
                            (elem.getKplat1() != null ? elem.getKplat1() : "") +
                            "\n"
            );
        }
        diff = arr1.size() - arr2.size();
        if (diff > 0) {
            do {
                arr2.add("");
                diff--;
            } while (diff > 0);
        } else if (diff < 0) {
            do {
                arr1.add("");
                diff++;
            } while (diff < 0);
        }
        for (int i = 0; i < arr1.size(); i++) {
            result.append(arr1.get(i));
            result.append(arr2.get(i));
        }
        return result.toString();
    }

    public String g9Disp4Print() {
        String _f9 = "";
        // for(CimSmgsDocs elem : cimSmgsDocses9.values())
        // {
        // if(elem.getText() != null && elem.getText().length() > 0)
        // _f9 = _f9 + (elem.getText() != null ? elem.getText() : "") /*+ ": " +
        // (elem.getCode() != null ? elem.getCode() : "")*/ + " ";
        // }
        // for(CimSmgsDocs elem : cimSmgsDocses9.values())
        // {
        // if(elem.getText2() != null && elem.getText2().length() > 0)
        // _f9 = _f9 + (elem.getText2() != null ? elem.getText2() : "") /*+ ": "
        // + (elem.getCode() != null ? elem.getCode() : "")*/ + " ";
        // }

        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f9 += (elem.getText2() != null ? elem.getText2() : "");
            _f9 += "<br/>";
        }

        return _f9;
    }

    public String buildG9Cs() {
        StringBuffer _f9 = new StringBuffer();

       /* for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f9.append(elem.getText() != null ? elem.getText() + " " : "");
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f9.append(elem.getText2() != null ? elem.getText2() : "");
            _f9.append("\n");
        }*/

        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9.append(buildG9Cs(elem));
            _f9.append("\n");
        }

        delLastSimbolIfEqual("\n", _f9);


        return _f9.toString();
    }

    public String buildG9Cs(CimSmgsDocs elem) {
        StringBuffer _f9 = new StringBuffer();
        _f9.append(elem.getText() != null ? elem.getText() + " " : "");
        _f9.append(elem.getText2() != null ? elem.getText2() + " " : "");
        _f9.append(elem.getNdoc() != null ? elem.getNdoc() + " " : "");
        _f9.append(elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
        _f9.append(elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
        return _f9.toString();

    }

    /*
    switch (getCimSmgsCarLists().size()){
            case 1:
                return getCimSmgsCarLists().values().iterator().next().vag4CimSmgs1();
            case 0:
                return "";
            default:
                return "Siehe Nachweisung\nсм. Ведомость";
        }

    * */

    public int vagsConts() {
        int count = 0;
        if (getCimSmgsCarLists() != null) {
            count = getCimSmgsCarLists().size();
        }

        return count;
    }

    public int countConts() {
        int count = 0;
        if (getCimSmgsCarLists() != null) {
            for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
                count += vag.getCimSmgsKonLists().size();
            }
        }

        return count;
    }

    public boolean isGroupContOtpr() {
        return isContOtpr() && ((cimSmgsCarLists != null && cimSmgsCarLists.size() > 1) || countConts() > 1);
    }


    public String g9Disp4PrintSmgs() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "<br/>";
        }
        return _f9;
    }

    public String buildG9CimPrint() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "\n";
        }
        return _f9;
    }

    public String buildG23Print() {
        StringBuilder _f9 = new StringBuilder();

        HashMap<String, String> map = new HashMap<>();
        StringBuilder print = new StringBuilder();
        int count = 0;
        boolean used[] = new boolean[cimSmgsDocses9.values().size()];
        Arrays.fill(used, false);
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            String mapRec;
            StringBuilder strRec = new StringBuilder();
            mapRec = map.get(elem.getText());
            strRec.append((mapRec != null) ? mapRec : "");

            if (strRec.length() > 0)
                strRec.append(", ");
            strRec.append(elem.getNdoc() != null ? (elem.getNdoc() + " ") : "");
            strRec.append(elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            map.put(elem.getText(), strRec.toString());
        }
        for (String s : map.keySet()) {
            print.append(s.isEmpty() ? "" : s + ": ").append(map.get(s)).append("\n");
        }

//        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
//            if (!used[count++]) {
//                used[count - 1] = true;
//                StringBuilder str = new StringBuilder();
//                str.append(elem.getText() != null ? elem.getText() + ":" : "");
//                str.append(elem.getNdoc() != null ? elem.getNdoc() + " " : "");
//                str.append(elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
//                str.append(elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
//                if (elem.getText() != null && elem.getNcas() != null && elem.getText().toLowerCase().equals(elem.getNcas().toLowerCase())) {
//                    int count2 = 0;
//                    for (CimSmgsDocs elem2 : cimSmgsDocses9.values()) {
//                        if (!used[count2++] && elem2.getText() != null && elem2.getNcas() != null && elem2.getText().toLowerCase().equals(elem2.getNcas().toLowerCase()) && elem2.getText().toLowerCase().equals(elem.getText().toLowerCase())) {
//                            StringBuilder tmp = new StringBuilder();
//                            used[count2 - 1] = true;
//                            tmp.append(elem.getNdoc() != null ? elem.getNdoc() + " " : "");
//                            tmp.append(elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
//                            tmp.append(elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
//                            if (str.length()>0 && tmp.length() > 0) {
//                                    str.append(",");
//                            }
//                            str.append(tmp);
//                        }
//                    }
//                }
//                print.append(str).append("\n");
//            }
//        }


////            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
////            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
////            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
////            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
////            _f9 += "\n";
//
//        }
//        for (String key:printMap.keySet()) {
//            _f9.append(key+(printMap.get(key).isEmpty()?"":":"+printMap.get(key))).append("\n");
//        }
        return print.toString();
    }

    public String buildG24CimPrint() {
        return StringUtils.defaultString(g23);
    }

    public String buildG20SlovNPrint() {
        return StringUtils.defaultString(g23);
    }

    private String buildG20Helper(String dorR) {
        if (dorR.equals("ВР")) {
            return "10";
        } else if (dorR.equals("РЖД")) {
            return "20";
        } else if (dorR.equals("БЧ")) {
            return "21";
        } else if (dorR.equals("УЗ")) {
            return "22";
        } else if (dorR.equals("ЧФМ")) {
            return "23";
        } else if (dorR.equals("ЛГ")) {
            return "24";
        } else if (dorR.equals("ЛДЗ")) {
            return "25";
        } else if (dorR.equals("ЭВР")) {
            return "26";
        } else if (dorR.equals("КЗХ")) {
            return "27";
        } else if (dorR.equals("ГР")) {
            return "28";
        } else if (dorR.equals("УТИ")) {
            return "29";
        } else if (dorR.equals("ЗЧ")) {
            return "30";
        } else if (dorR.equals("МТЗ")) {
            return "31";
        } else if (dorR.equals("ДСВН")) {
            return "32";
        } else if (dorR.equals("НЕОП")) {
            return "0";
        } else if (dorR.equals("КЗД")) {
            return "33";
        } else if (dorR.equals("ПКП")) {
            return "51";
        } else if (dorR.equals("БДЖ")) {
            return "52";
        } else if (dorR.equals("ЧФР")) {
            return "53";
        } else if (dorR.equals("ЧД")) {
            return "54";
        } else if (dorR.equals("МАВ")) {
            return "55";
        } else if (dorR.equals("ЖСР")) {
            return "56";
        } else if (dorR.equals("АЗ")) {
            return "57";
        } else if (dorR.equals("АРМ")) {
            return "58";
        } else if (dorR.equals("КРГ")) {
            return "59";
        } else if (dorR.equals("ТЖД")) {
            return "66";
        } else if (dorR.equals("ТРК")) {
            return "67";
        } else if (dorR.equals("АФГ")) {
            return "69";
        } else if (dorR.equals("ТЦДД")) {
            return "75";
        } else if (dorR.equals("ДБ")) {
            return "80";
        } else if (dorR.equals("РАИ")) {
            return "96";
        } else {
            return "";
        }
    }

    public String buildG20_1Print() {
        Iterator<CimSmgsPlatel> it = getCimSmgsPlatels().values().iterator();
        if (it.hasNext()) {
            return buildG20Helper(StringUtils.defaultString(it.next().getDorR()));
        } else {
            return "";
        }
    }

    public String buildG20_2Print() {
        Iterator<CimSmgsPlatel> it = getCimSmgsPlatels().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return buildG20Helper(StringUtils.defaultString(it.next().getDorR()));
        } else {
            return "";
        }
    }

    public String buildG20_3Print() {
        Iterator<CimSmgsPlatel> it = getCimSmgsPlatels().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return buildG20Helper(StringUtils.defaultString(it.next().getDorR()));
        } else {
            return "";
        }
    }

    public String buildG20_4Print() {
        Iterator<CimSmgsPlatel> it = getCimSmgsPlatels().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return buildG20Helper(StringUtils.defaultString(it.next().getDorR()));
        } else {
            return "";
        }
    }

    public String buildG20_5Print() {
        Iterator<CimSmgsPlatel> it = getCimSmgsPlatels().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return buildG20Helper(StringUtils.defaultString(it.next().getDorR()));
        } else {
            return "";
        }
    }

    public String buildG45_11Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        Short kpl;
        if (it.hasNext()) {
            kpl = it.next().getKpl();
            return kpl != null ? kpl.toString() : "";
        } else {
            return "";
        }
    }

    public String buildG45_21Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        Short kpl;
        if (it.hasNext()) {
            kpl = it.next().getKpl();
            return kpl != null ? kpl.toString() : "";
        } else {
            return "";
        }
    }

    public String buildG45_31Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        Short kpl;
        if (it.hasNext()) {
            kpl = it.next().getKpl();
            return kpl != null ? kpl.toString() : "";
        } else {
            return "";
        }
    }

    public String buildG45_12Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildGuZpu11Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getType());
        } else {
            return "";
        }
    }

    public String buildGuZpu12Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildG45_22Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildGuZpu22Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildGuZpu32Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildPerevozDatePrint() {
        return getPerevozDate() != null ? new SimpleDateFormat("dd.MM.yyyy").format(getPerevozDate()) : "";
    }

    public String buildGuVvozPrint() {
        Map<Byte, CimSmgsKonList> konList;
        CimSmgsKonList kon;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            kon = konList.values().iterator().next();
            result = kon.getVvoz() != null ? new SimpleDateFormat("dd.MM.yyyy").format(kon.getVvoz()) : "";
        }
        return result;
    }

    public String buildGuPogruzkaPrint() {
        Map<Byte, CimSmgsKonList> konList;
        CimSmgsKonList kon;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            kon = konList.values().iterator().next();
            result = kon.getPogruzka() != null ? new SimpleDateFormat("dd.MM.yyyy").format(kon.getPogruzka()) : "";
        }
        return result;
    }

    public String buildGuZajavNoPrint() {
        Map<Byte, CimSmgsKonList> konList;
        String result = "";
        if (getCimSmgsCarLists().size() > 0 &&
                (konList = getCimSmgsCarLists().values().iterator().next().getCimSmgsKonLists()).size() > 0) {
            result = StringUtils.defaultString(konList.values().iterator().next().getZajavNo());
        }
        return result;
    }

    public String buildGuZpu42Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String buildGuZpu21Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getType());
        } else {
            return "";
        }
    }

    public String buildGuZpu31Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getType());
        } else {
            return "";
        }
    }

    public String buildGuZpu41Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getType());
        } else {
            return "";
        }
    }

    public String buildG45_32Print() {
        Iterator<CimSmgsPlomb> it = getCimSmgsPlombs().values().iterator();
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            it.next();
        } else {
            return "";
        }
        if (it.hasNext()) {
            return StringUtils.defaultString(it.next().getZnak());
        } else {
            return "";
        }
    }

    public String g5Disp4PrintCmr() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "<br/>";
        }
        return _f9;
    }

    public String buildG5CmrPrint() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "\n";
        }
        return _f9;
    }

    public String g9Disp4PrintGu29k() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "<br/>";
        }
        return _f9;
    }

    public String buildGuG3Print() {
        String _f9 = "";
        for (CimSmgsDocs elem : cimSmgsDocses9.values()) {
            _f9 += (elem.getText() != null ? elem.getText() + " " : "");
            _f9 += (elem.getNdoc() != null ? elem.getNdoc() + " " : "");
            _f9 += (elem.getDat() != null ? "от " + new SimpleDateFormat("dd.MM.yyyy").format(elem.getDat()) + " " : "");
            _f9 += (elem.getNcopy() != null ? elem.getNcopy() + " экз " : "");
            _f9 += "\n";
        }
        return _f9;
    }

    public String g13Disp4Print() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText() != null ? elem.getText() : "")
                        + "<br/>";
        }
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText2() != null ? elem.getText2() : "")
                        + "<br/>";
        }

        return _f13;
    }

    public String buildG13Cs() {
        StringBuffer _f13 = new StringBuffer();
        for (CimSmgsDocs item : cimSmgsDocses13.values()) {
            _f13.append(item.getCode() != null ? item.getCode() + ". " : "");
            _f13.append(item.getText() != null ? item.getText() : "");
            _f13.append(item.getText() != null && item.getText2() != null ? " / " : "");
            _f13.append(item.getText2() != null ? item.getText2() : "");
            _f13.append(" ");
        }

        if (cimSmgsDocses136.size() > 0) _f13.append("6.");
        for (CimSmgsDocs item : cimSmgsDocses136.values()) {
            _f13.append(" ");
            _f13.append(item.getNdoc() != null ? item.getNdoc() + " " : "");
            _f13.append(item.getText() != null ? item.getText() : "");
            _f13.append(item.getText() != null && item.getText2() != null ? " / " : "");
            _f13.append(item.getText2() != null ? item.getText2() : "");
            _f13.append((item.getText() != null || item.getText2() != null) && item.getText3() != null ? " / " : "");
            _f13.append(item.getText3() != null ? item.getText3() : "");
            _f13.append(";");
        }
        if (cimSmgsDocses136.size() > 0)
            _f13.append("\n");

        delLastSimbolIfEqual("\n", _f13);

        return _f13.toString();
    }

    public String buildG13CsPrint() {
        if (getG13c() != null && getG13c() == 1) {
//            return LIST_DOP_RU;
            return getText("form.labelDopList");
        } else {
            return buildG13Cs();
        }
    }

    public String g13Disp4PrintCim() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText() != null ? elem.getText() : "")
                        + "<br/>";
        }
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText2() != null ? elem.getText2() : "")
                        + "<br/>";
        }

        return _f13;
    }

    public String buildG13CimPrint() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText() != null && elem.getText().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText() != null ? elem.getText() : "")
                        + "\n";
        }
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            if (elem.getText2() != null && elem.getText2().length() > 0)
                _f13 = _f13 + (elem.getCode() != null ? "13." + elem.getCode() + ". " : "") + (elem.getText2() != null ? elem.getText2() : "")
                        + "\n";
        }

        return _f13;
    }

    public String g13Disp4PrintSmgs() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            _f13 = _f13 + (elem.getText() != null ? elem.getText() + "  " : "");
            _f13 = _f13 + (elem.getText2() != null ? elem.getText2() : "");
            _f13 += " ";
        }

//		for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
//			if (elem.getText() != null && elem.getText().length() > 0)
//				_f13 = _f13 + (elem.getText() != null ? elem.getText() : "")
//						+ "<br/>";
//		}
//		for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
//			if (elem.getText2() != null && elem.getText2().length() > 0)
//				_f13 = _f13 + (elem.getText2() != null ? elem.getText2() : "")
//						+ "<br/>";
//		}

        return _f13;
    }


    public String buildG7Print() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            _f13 = _f13 + (elem.getText() != null ? elem.getText() + "  " : "");
            _f13 = _f13 + (elem.getText2() != null ? elem.getText2() : "");
            _f13 += " ";
        }

        return _f13;
    }

    public String buildG8CsPrint() {
        return g8;
    }

    public String buildG8Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(getG101() != null ? getG101() : "");
        sb.append(" ");
        sb.append(getG102() != null ? getG102() : "");
        if (StringUtils.isNotBlank(getG101()) || StringUtils.isNotBlank(getG102())) {
            sb.append("\n");
        }
        sb.append(getG101r() != null ? getG101r() : "");
        sb.append(" ");
        sb.append(getG102r() != null ? getG102r() : "");
        if (StringUtils.isNotBlank(getG101r()) || StringUtils.isNotBlank(getG102r())) {
            sb.append("\n");
        }
        sb.append(getG_10_3r() != null ? getG_10_3r() : "");
        return sb.toString();
    }

    public String gruzGu27vDisp() {
        StringBuilder sb = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotEmpty(gruz.getEnzgr()) ? gruz.getEnzgr() : "");
                    sb.append(StringUtils.isNotEmpty(gruz.getEkgvn()) ? "<br/>" + "ЕТСНГ-" + gruz.getEkgvn() : "");
                    sb.append(StringUtils.isNotEmpty(gruz.getNzgr()) ? "<br/>" + gruz.getNzgr() : "");
                    sb.append(StringUtils.isNotEmpty(gruz.getKgvn()) ? "<br/>" + "ГНГ-" + gruz.getKgvn() + "<br/>" : "");
                }

        return sb.toString();
    }

    public String buildG6_9CmrPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                sb.append(kon.gruzyPrintCmr1() + prefix);
                prefix = "\n";
            }

        return sb.toString();
    }

    public String buildG10CmrPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.getKgvn()) ? prefix + gruz.getKgvn() : "");
                    prefix = "\n";
                }

        return sb.toString();
    }

    public String buildG11CmrPrint() {
        StringBuilder sb = new StringBuilder();
        String prefix = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sb.append(StringUtils.isNotBlank(gruz.g11CmrDisp()) ? prefix + gruz.g11CmrDisp() : "");
                    prefix = "\n";
                }

        return sb.toString();
    }

    public String g14SmgsDisp() {
        Integer sum = 0;
//		if (1 == g25) {
//			for (CimSmgsCarList car : cimSmgsCarLists.values())
//				for (CimSmgsGruz gruz : car.getCimSmgsGruzs().values()) {
//					sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
//				}
//
//		} else {
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }

//		}

        return (sum != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString()) : "");
    }

    public String buildGuMestaPropPrint() {
        Integer sum = 0;
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }
        return (sum != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString()) : "");
    }

    public String buildG14Print() {
        Integer sum = 0;
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }
        return (sum != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString()) : "");
    }

    public String g14Gu27vDisp() {
        Integer sum = 0;
        String upak = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                    if (car.getSort() == 0 && kon.getSort() == 0 && gruz.getSort() == 0 && StringUtils.isNotEmpty(gruz.getUpak())) {
                        upak = gruz.getUpak();
                    }
                }
        return (sum != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString() /*+ " " + upak*/) : "");
    }

    public String buildGu27MestaPropPrint() {
        Integer sum = 0;
        String upak = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                    if (car.getSort() == 0 && kon.getSort() == 0 && gruz.getSort() == 0 && StringUtils.isNotEmpty(gruz.getUpak())) {
                        upak = gruz.getUpak();
                    }
                }
        return (sum != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString() /*+ " " + upak*/) : "");
    }

    public String g7CmrDisp() {
        Integer sum = 0;
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }

        return (sum != 0 ? sum.toString() : "");
    }

    public String g6CmrDisp() {
        String result = "";
        CimSmgsCarList vag = cimSmgsCarLists.get((byte) 0);
        if (vag != null && vag.getCimSmgsKonLists() != null) {
            CimSmgsKonList kon = vag.getCimSmgsKonLists().get((byte) 0);
            if (kon != null) {
                result += kon.getUtiN() + " " + kon.getSizeFoot();
            }
        }

        return result;
    }

    /*public String g11CmrDisp() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }

        return result;
    }*/
    public String g24NDisp() {
        StringBuilder value = new StringBuilder();
        if (getG24N() != null) {
            value.append(StringUtils.isNotEmpty(getNettoPref()) ? getNettoPref() : "");
            value.append(getG24N());
        }
        return value.toString();
    }

    public String buildG24NCimPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24N() != null) {
            value.append(StringUtils.isNotEmpty(getNettoPref()) ? getNettoPref() : "");
            value.append(getG24N());
        }
        return value.toString();
    }

    public String buildG21NSlovNPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24N() != null) {
            value.append(StringUtils.isNotEmpty(getNettoPref()) ? getNettoPref() : "");
            value.append(getG24N());
        }
        return value.toString();
    }

    public String buildG21TSlovNPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24T() != null) {
            value.append(StringUtils.isNotEmpty(getTaraPref()) ? getTaraPref() : "");
            value.append(getG24T());
        }
        return value.toString();
    }

    public String buildG21BSlovNPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24B() != null) {
            value.append(StringUtils.isNotEmpty(getBruttoPref()) ? getBruttoPref() : "");
            value.append(getG24B());
        }
        return value.toString();
    }

    public String g24TDisp() {
        StringBuilder value = new StringBuilder();
        if (getG24T() != null) {
            value.append(StringUtils.isNotEmpty(getTaraPref()) ? getTaraPref() : "");
            value.append(getG24T());
        }
        return value.toString();
    }

    public String buildG24TCimPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24T() != null) {
            value.append(StringUtils.isNotEmpty(getTaraPref()) ? getTaraPref() : "");
            value.append(getG24T());
        }
        return value.toString();
    }

    public String g24BDisp() {
        StringBuilder value = new StringBuilder();
        if (getG24B() != null) {
            value.append(StringUtils.isNotEmpty(getBruttoPref()) ? getBruttoPref() : "");
            value.append(getG24B());
        }
        return value.toString();
    }

    public String buildG24BCimPrint() {
        StringBuilder value = new StringBuilder();
        if (getG24B() != null) {
            value.append(StringUtils.isNotEmpty(getBruttoPref()) ? getBruttoPref() : "");
            value.append(getG24B());
        }
        return value.toString();
    }

    public String g21Disp4PrintCim() {
        String nl = "<br/>", space = " ", slash = "/", comma = ",";
        StringBuilder value = new StringBuilder();
        CimSmgsCarList vag = getCimSmgsCarLists().get((byte) 0);
        if (vag != null) {
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                if (kon.getSort() == (byte) 0) {
                    value.append(vag.getCimSmgsKonLists().size());
                    value.append(kon.getSizeFoot() != null ? "x" + kon.getSizeFoot() + "'" : "");
                    value.append(StringUtils.isNotEmpty(kon.getKat()) ? space + kon.getKat() : "");
                }
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    if (StringUtils.isNotEmpty(gruz.getKgvn())) {
                        value.append(nl + "NHM " + gruz.getKgvn());
                        nl = "";
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgr())) {
                        if (nl.length() > 0) space = "";
                        value.append(nl + space + gruz.getNzgr());
                    }
                    nl = "<br/>";
                    if (StringUtils.isNotEmpty(gruz.getNzgrEu())) {
                        value.append(nl + gruz.getNzgrEu());
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgrRid())) {
                        value.append(nl + gruz.getNzgrRid());
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgrRidEu())) {
                        value.append(nl + gruz.getNzgrRidEu());
                    }
                    if (gruz.getPlaces() != null) {
                        value.append(nl + gruz.getPlaces());
                    }
                }
                value.append(StringUtils.isNotEmpty(kon.getNvag()) ? nl + "ŠR voz." + space + kon.getNvag() : "");
                value.append(StringUtils.isNotEmpty(kon.getG25()) ? slash + kon.getG25() : "");
                value.append(nl);
                value.append(StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN() : "");
                value.append(kon.getPrivat() == 1 ? space + "\"P\"" : "");
                value.append(StringUtils.isNotEmpty(kon.getNettoPref()) ? space + kon.getNettoPref() : "");
                value.append(kon.getNetto() != null ? space + kon.getNetto() : "");
                value.append(StringUtils.isNotEmpty(kon.getNettoSuf()) ? kon.getNettoSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getTaraPref()) ? space + kon.getTaraPref() : "");
                value.append(kon.getTara() != null ? space + kon.getTara() : "");
                value.append(StringUtils.isNotEmpty(kon.getTaraSuf()) ? kon.getTaraSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getBruttoPref()) ? space + kon.getBruttoPref() : "");
                value.append(kon.getBrutto() != null ? space + kon.getBrutto() : "");
                value.append(StringUtils.isNotEmpty(kon.getBruttoSuf()) ? kon.getBruttoSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getVid()) ? slash + kon.getVid() : "");
                value.append(StringUtils.isNotEmpty(kon.getPrim()) ? nl + kon.getPrim() : "");
            }
        }

        /*switch (getVidKontOtpr()){
            case 1:
                if(kon != null){
                    space = "";
                    if(kon.getSizeFoot() != null){
                        result += "1x" + kon.getSizeFoot() + "'";
                        space = " ";
                    }
                    if(kon.getKat() != null && kon.getKat().length() > 0){
                        result += space + kon.getKat();
                    }
                    nl = "<br/>";
                    space = " ";
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        if(gruz.getKgvn() != null && gruz.getKgvn().length() > 0){
                            result += nl + "NHM " +  gruz.getKgvn();
                            nl = "";
                        }
                        if(gruz.getNzgr() != null && gruz.getNzgr().length() > 0){
                            if(nl.length() > 0) space = "";
                            result += nl + space + gruz.getNzgr();
                        }
                        nl = "<br/>";
                        if(gruz.getNzgrEu() != null && gruz.getNzgrEu().length() > 0){
                            result += nl + gruz.getNzgrEu();
                        }
                        if(gruz.getNzgrRid() != null && gruz.getNzgrRid().length() > 0){
                            result += nl + gruz.getNzgrRid();
                        }
                        if(gruz.getNzgrRidEu() != null && gruz.getNzgrRidEu().length() > 0){
                            result += nl + gruz.getNzgrRidEu();
                        }
                        if(gruz.getPlaces() != null){
                            result += nl + gruz.getPlaces();
                        }
                    }
                }
                nl = "<br/>";
                slash = "/";
                if(getPlatform() != null && getPlatform().length() > 0){
                    result += nl + getPlatform();
                    nl = "";
                }
                if(getDocNum() != null && getDocNum().length() > 0){
                    if(nl.length() > 0) slash = "";
                    result += nl + slash + getDocNum();
                }
                nl = "<br/>";
                space = " ";
                if(kon != null){
                    if(kon.getUtiN() != null && kon.getUtiN().length() > 0){
                        result += nl + kon.getUtiN();
                        nl = "";
                    }
                    if(kon.getPrivat() == 1){
                        if(nl.length() > 0) space = "";
                        result += nl + space + "\"P\"";
                    }
                }
                comma = "";
                if(getG24N() != null){
                    if(nl.length() > 0) space = "";
                    result += nl + space + "N:" + getG24N();
                    comma = ",";
                }
                if(getG24T() != null){
                    if(nl.length() > 0) comma = "";
                    result += nl + comma + "T:" + getG24T();
                    comma = ",";
                }
                if(getG24B() != null){
                    if(nl.length() > 0) comma = "";
                    result += nl + comma + "B:" + getG24B();
                }
                break;
            case 2:
                if(kon != null){
                    space = "";
                    if(kon.getSizeFoot() != null){
                        result += "1x" + kon.getSizeFoot() + "'";
                        space = " ";
                    }
                    if(kon.getKat() != null && kon.getKat().length() > 0){
                        result += space + kon.getKat();
                    }
                }
                nl = "<br/>";
                slash = "/";
                if(getPlatform() != null && getPlatform().length() > 0){
                    result += nl + getPlatform();
                    nl = "";
                }
                if(getDocNum() != null && getDocNum().length() > 0){
                    if(nl.length() > 0) slash = "";
                    result += nl + slash + getDocNum();
                }
                nl = "<br/>";
                slash = "/";
                if(kon != null){
                    if(kon.getUtiN() != null && kon.getUtiN().length() > 0){
                        result += nl + kon.getUtiN();
                        nl = "";
                    }
                    if(getG24B() != null){
                        if(nl.length() > 0) slash = "";
                        result += nl + slash + getG24B()+"kg";
                    }
                    slash = "/";
                    if(kon.getVid() != null && kon.getVid().length() > 0){
                        if(nl.length() > 0) slash = "";
                        result += nl + slash + kon.getVid();
                    }
                }
                break;
            case 3:
                if(vag != null){
                    if(vag.getCount() != null){
                        result += vag.getCount() + " Wagen";
                    }
                }
                if(kon != null){
                    if(kon.getCount() != null){
                        result += nl + kon.getCount() + "x";
                        nl = "";
                    }
                    if(kon.getSizeFoot() != null){
                        result += nl + kon.getSizeFoot() + "'";
                        nl = "";
                    }
                    if(kon.getVid() != null){
                        if(nl.length() > 0) space = "";
                        result += nl + space + kon.getVid();
                    }
                    nl = "<br/>";
                    space = " ";
                    for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                        if(gruz.getKgvn() != null && gruz.getKgvn().length() > 0){
                            result += nl + "NHM " +  gruz.getKgvn();
                            nl = "";
                        }
                        if(gruz.getNzgr() != null && gruz.getNzgr().length() > 0){
                            if(nl.length() > 0) space = "";
                            result += nl + space + gruz.getNzgr();
                        }
                        nl = "<br/>";
                        if(gruz.getNzgrEu() != null && gruz.getNzgrEu().length() > 0){
                            result += nl + gruz.getNzgrEu();
                        }
                        if(gruz.getNzgrRid() != null && gruz.getNzgrRid().length() > 0){
                            result += nl + gruz.getNzgrRid();
                        }
                        if(gruz.getNzgrRidEu() != null && gruz.getNzgrRidEu().length() > 0){
                            result += nl + gruz.getNzgrRidEu();
                        }
                        if(gruz.getPlaces() != null){
                            result += nl + gruz.getPlaces();
                        }
                    }
                }
                break;
            case 4:
                if(vag != null){
                    if(vag.getCount() != null){
                        result += vag.getCount() + " Wagen";
                    }
                }
                if(kon != null){
                    if(kon.getCount() != null){
                        result += nl + kon.getCount() + "x";
                        nl = "";
                    }
                    if(kon.getSizeFoot() != null){
                        result += nl + kon.getSizeFoot() + "'";
                        nl = "";
                    }
                    if(kon.getVid() != null){
                        if(nl.length() > 0) space = "";
                        result += nl + space + kon.getVid();
                    }
                }
                break;
        }*/
        if (StringUtils.isNotEmpty(getG11_prim())) {
            value.append(nl + getG11_prim().replaceAll("\n", "<br/>"));
        }
        return value.toString();
    }

    public String buildG21CimPrint() {
        String nl = "\n", space = " ", slash = "/", comma = ",";
        StringBuilder value = new StringBuilder();
        CimSmgsCarList vag = getCimSmgsCarLists().get((byte) 0);
        if (vag != null) {
            for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                if (kon.getSort() == (byte) 0) {
                    value.append(vag.getCimSmgsKonLists().size());
                    value.append(kon.getSizeFoot() != null ? "x" + kon.getSizeFoot() + "'" : "");
                    value.append(StringUtils.isNotEmpty(kon.getKat()) ? space + kon.getKat() : "");
                }
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    if (StringUtils.isNotEmpty(gruz.getKgvn())) {
                        value.append(nl + "NHM " + gruz.getKgvn());
                        nl = "";
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgr())) {
                        if (nl.length() > 0) space = "";
                        value.append(nl + space + gruz.getNzgr());
                    }
                    nl = "\n";
                    if (StringUtils.isNotEmpty(gruz.getNzgrEu())) {
                        value.append(nl + gruz.getNzgrEu());
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgrRid())) {
                        value.append(nl + gruz.getNzgrRid());
                    }
                    if (StringUtils.isNotEmpty(gruz.getNzgrRidEu())) {
                        value.append(nl + gruz.getNzgrRidEu());
                    }
                    if (gruz.getPlaces() != null) {
                        value.append(nl + gruz.getPlaces());
                    }
                }
                value.append(StringUtils.isNotEmpty(kon.getNvag()) ? nl + "ŠR voz." + space + kon.getNvag() : "");
                value.append(StringUtils.isNotEmpty(kon.getG25()) ? slash + kon.getG25() : "");
                value.append(nl);
                value.append(StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN() : "");
                value.append(kon.getPrivat() == 1 ? space + "\"P\"" : "");
                value.append(StringUtils.isNotEmpty(kon.getNettoPref()) ? space + kon.getNettoPref() : "");
                value.append(kon.getNetto() != null ? space + kon.getNetto() : "");
                value.append(StringUtils.isNotEmpty(kon.getNettoSuf()) ? kon.getNettoSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getTaraPref()) ? space + kon.getTaraPref() : "");
                value.append(kon.getTara() != null ? space + kon.getTara() : "");
                value.append(StringUtils.isNotEmpty(kon.getTaraSuf()) ? kon.getTaraSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getBruttoPref()) ? space + kon.getBruttoPref() : "");
                value.append(kon.getBrutto() != null ? space + kon.getBrutto() : "");
                value.append(StringUtils.isNotEmpty(kon.getBruttoSuf()) ? kon.getBruttoSuf() : "");
                value.append(StringUtils.isNotEmpty(kon.getVid()) ? slash + kon.getVid() : "");
                value.append(StringUtils.isNotEmpty(kon.getPrim()) ? nl + kon.getPrim() : "");
            }
        }

        if (StringUtils.isNotEmpty(getG11_prim())) {
            value.append(nl + getG11_prim());
        }
        return value.toString();
    }

    public String g13PrintCmr() {
        String value = "";
        if (StringUtils.isNotEmpty(getG15())) {
            value = getG15().replaceAll("\n", "<br/>");
        }
        return value;
    }

    public String buildG13CmrPrint() {
        return StringUtils.defaultString(getG15());
    }

    public String g18Disp4PrintCim() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            result = car.getNvag() != null ? car.getNvag() : "";
            break;
            /*switch (getVidKontOtpr()){
                case 1:
                    result = car.getNvag() != null ? car.getNvag() : "";
                    break;
                case 2:
                    result = car.getNvag() != null ? car.getNvag() : "";
                    break;
                case 3:
                    result = car.getPrim() != null ? car.getPrim() : "";
                    break;
                case 4:
                    result = car.getPrim() != null ? car.getPrim() : "";
                    break;
            }*/
        }
        result += getVagPrim() != null ? "<br/>" + getVagPrim() : "";
        return result;
    }

    public String buildG18CimPrint() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            result = car.getNvag() != null ? car.getNvag() : "";
            break;
        }
        result += getVagPrim() != null ? "\n" + getVagPrim() : "";
        return result;
    }

    public String buildG17SlovNPrint() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            result = StringUtils.defaultString(car.getNvag());
            break;
        }
        return result;
    }

    public String buildG18SlovNPrint() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            result = car.getTaraVag() != null ? car.getTaraVag().toString() : "";
            break;
        }
        return result;
    }

    public String buildG19SlovNPrint() {
        String result = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            result = car.getKolOs() != null ? car.getKolOs().toString() : "";
            break;
        }
        return result;
    }

    public String g24NPropis() {
        String res = "";
        if (g24N != null) {
            StringTokenizer st = new StringTokenizer(g24N.toString(), ".");
            int i = 0;
            while (st.hasMoreTokens()) {
                if (i == 0) {
                    res = (new money2str(Double.parseDouble(st.nextToken()), "NONE").getMoney2str().toString());
                } else {
                    res += "." + st.nextToken();
                }
                i++;
            }
        }
        return (res.length() > 0 ? res + " кг" : "");
//        return (g24N != null ? (new money2str(g24N.doubleValue(), "NONE").getMoney2str().toString()) : "");
    }

    public String buildGuMassaPropPrint() {
        String res = "";
        if (g24N != null) {
            StringTokenizer st = new StringTokenizer(g24N.toString(), ".");
            int i = 0;
            while (st.hasMoreTokens()) {
                if (i == 0) {
                    res = (new money2str(Double.parseDouble(st.nextToken()), "NONE").getMoney2str().toString());
                } else {
                    res += "." + st.nextToken();
                }
                i++;
            }
        }
        return (res.length() > 0 ? res + " кг" : "");
    }

    public String g14SmgsDisp1() {
        Integer sum = 0;
//		if (1 == g25) {
//			for (CimSmgsCarList car : cimSmgsCarLists.values())
//				for (CimSmgsGruz gruz : car.getCimSmgsGruzs().values()) {
//					sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
//				}
//
//		} else {
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }

//		}

        return (sum != 0 ? sum.toString() : "");
    }

    public String buildG11UtiPrefsSlovNPrint() {
        StringBuilder value = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                value.append(StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN().substring(0, 4) + "\n" : "");
            }
            break;
        }
        return value.toString();
    }

    public String buildG11UtiNumsSlovNPrint() {
        StringBuilder value = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                value.append(StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN().substring(4) + "\n" : "");
            }
            break;
        }
        return value.toString();
    }

    public String buildG11UtiQuantSlovNPrint() {
        StringBuilder value = new StringBuilder();
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            value.append(car.getCimSmgsKonLists().size());
            break;
        }
        return value.toString();
    }

    public String buildG11UtiNhmSlovNPrint() {
        StringBuilder value = new StringBuilder();
        int count = 1;
        boolean hasGruz = false;
        CimSmgsGruz gruz;
        String prefix = "";
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {

                if (count == 1) {
                    hasGruz = kon.getCimSmgsGruzs().size() > 0;
                    if (hasGruz) {
                        value.append(kon.getSizeFoot() != null ? kon.getSizeFoot() + "'" : "");
                        gruz = kon.getCimSmgsGruzs().get((byte) 0);
                        value.append(StringUtils.isNotEmpty(gruz.getKgvn()) ? " / " + gruz.getKgvn() : "");
                    }
                    count++;
                }
                if (!hasGruz) {
                    value.append(prefix);
                    prefix = "\n";
                    value.append(kon.getSizeFoot() != null ? kon.getSizeFoot() + "'" : "");
                    value.append(StringUtils.isNotEmpty(getG23()) ? " / " + getG23() : "");
                }
            }
            break;
        }
        return value.toString();
    }

    public String buildG11SlovNPrint() {
        StringBuilder value = new StringBuilder();
        int count = 1;
        boolean hasGruz = false;
        String KONTAJNER = "kontajner";
        String dataStr;
        CimSmgsGruz gruz;
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                if (count == 1) {
                    hasGruz = kon.getCimSmgsGruzs().size() > 0;
                    value.append(car.getCimSmgsKonLists().size() + "x");
                    if (hasGruz) {
                        value.append("  Ložený " + KONTAJNER);
                        value.append(StringUtils.isNotEmpty(kon.getKat()) ? " (" + kon.getKat() + ")" : "");
                        gruz = kon.getCimSmgsGruzs().get((byte) 0);
                        value.append(StringUtils.isNotEmpty(gruz.getNzgrEu()) ? "\n" + gruz.getNzgrEu() : "");
                    } else {
                        value.append("  Prázdny " + KONTAJNER);
                        value.append(StringUtils.isNotEmpty(getG11_prim()) ? "\n" + getG11_prim() : "");
                    }

                    count++;
                }
                if (hasGruz) {
                    dataStr = StringUtils.isNotEmpty(kon.getNvag()) ? "\n" + "ŠR vag: " + kon.getNvag() : "";
                    if (StringUtils.isNotEmpty(kon.getG25())) {
                        dataStr += StringUtils.isNotEmpty(dataStr) ? "/" + kon.getG25() : "\n" + kon.getG25();
                    }
                    value.append(dataStr);
                }
                value.append("\n");
                value.append(StringUtils.isNotEmpty(kon.getUtiN()) ? kon.getUtiN() : "");
                if (hasGruz) {
                    value.append(StringUtils.isNotEmpty(kon.getNettoPref()) ? " " + kon.getNettoPref() : "");
                    value.append(kon.getNetto() != null ? " " + kon.getNetto() : "");
                    value.append(StringUtils.isNotEmpty(kon.getNettoSuf()) ? kon.getNettoSuf() : "");

                    value.append(StringUtils.isNotEmpty(kon.getTaraPref()) ? " " + kon.getTaraPref() : "");
                    value.append(kon.getTara() != null ? " " + kon.getTara() : "");
                    value.append(StringUtils.isNotEmpty(kon.getTaraSuf()) ? kon.getTaraSuf() : "");

                    value.append(StringUtils.isNotEmpty(kon.getBruttoPref()) ? " " + kon.getBruttoPref() : "");
                    value.append(kon.getBrutto() != null ? " " + kon.getBrutto() : "");
                    value.append(StringUtils.isNotEmpty(kon.getBruttoSuf()) ? kon.getBruttoSuf() : "");

                    value.append(StringUtils.isNotEmpty(kon.getPrim()) ? " " + kon.getPrim() : "");
                } else {
                    dataStr = StringUtils.isNotEmpty(kon.getTaraPref()) ? ", " + kon.getTaraPref() : "";
                    if (kon.getTara() != null) {
                        dataStr += StringUtils.isNotEmpty(dataStr) ? "" : ", ";
                        dataStr += kon.getTara();
                    }
                    dataStr += StringUtils.isNotEmpty(dataStr) && StringUtils.isNotEmpty(kon.getTaraSuf()) ? kon.getTaraSuf() : "";
                    value.append(dataStr);

                    value.append(StringUtils.isNotEmpty(kon.getVid()) ? ", " + kon.getVid() : "");

                    dataStr = StringUtils.isNotEmpty(kon.getNettoPref()) ? ", " + kon.getNettoPref() : "";
                    if (kon.getNetto() != null) {
                        dataStr += StringUtils.isNotEmpty(dataStr) ? "" : ", ";
                        dataStr += kon.getNetto();
                    }
                    dataStr += StringUtils.isNotEmpty(dataStr) && StringUtils.isNotEmpty(kon.getNettoSuf()) ? kon.getNettoSuf() : "";
                    value.append(dataStr);
                }
            }
            break;
        }
        return value.toString();
    }

    public String g12SmgsDispMalash() {
        Integer sum = 0;
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum += gruz.getPlaces() != null ? gruz.getPlaces() : 0;
                }
            }
        }

        return (sum != 0 ? "1<br/>" + sum.toString() : "1");
    }

    public String g24BDisp4Print() {
        String res = "";
        if (g24B != null) {
            StringTokenizer st = new StringTokenizer(g24B.toString(), ".");
            int i = 0;
            while (st.hasMoreTokens()) {
                if (i == 0) {
                    res = (new money2str(Double.parseDouble(st.nextToken()), "NONE").getMoney2str().toString());
                } else {
                    res += "." + st.nextToken();
                }
                i++;
            }
        }
        return (res.length() > 0 ? res + " кг" : "");
    }

    public String buildG15Print() {
        String res = "";
        if (g24B != null) {
            StringTokenizer st = new StringTokenizer(g24B.toString(), ".");
            int i = 0;
            while (st.hasMoreTokens()) {
                if (i == 0) {
                    res = (new money2str(Double.parseDouble(st.nextToken()), "NONE").getMoney2str().toString());
                } else {
                    res += "." + st.nextToken();
                }
                i++;
            }
        }
        return (res.length() > 0 ? res + " кг" : "");
    }

    public String buildG15SlovNPrint() {
        return this.g15;
    }

    public String g11Disp4Print(Byte index) {
        StringBuffer result = new StringBuffer();
        for (CimSmgsCarList car : cimSmgsCarLists.values()) {
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {
                CimSmgsGruz gruz;
                if (kon.getCimSmgsGruzs().size() == 1) {
                    gruz = kon.getCimSmgsGruzs().values().iterator().next();
                    if (gruz.getKgvn() != null) {
                        result.append("ГНГ- ");
                        result.append(gruz.getKgvn());
                        result.append("<br/>");
                    }
                    if (gruz.getNzgrEu() != null) {
                        result.append("<span class=\"chinese\">");
                        result.append(gruz.getNzgrEu());
                        result.append("</span>");
                        result.append("<br/>");
                    }
                    if (gruz.getNzgr() != null) {
                        result.append(gruz.getNzgr());
                        result.append("<br/>");
                    }

                    if (gruz.getEkgvn() != null) {
                        result.append("ЕТ СНГ- ");
                        result.append(gruz.getEkgvn());
                        result.append("<br/>");
                    }
                    if (gruz.getEnzgr() != null) {
                        result.append(gruz.getEnzgr());
                        result.append("<br/>");
                    }
                    if (gruz.getMassa() != null) {
                        result.append("Масса- ");
                        result.append(gruz.getMassa());
                        result.append("&nbsp;");
                    }
                    if (gruz.getPlaces() != null) {
                        result.append("Места- ");
                        result.append(gruz.getPlaces());
                        result.append("<br/>");
                    }
                } else {
                    gruz = kon.getCimSmgsGruzs().get(index);
//                    for (CimSmgsGruz gruzy : kon.getCimSmgsGruzs().values()) {
                    if (gruz.getKgvn() != null) {
                        result.append("ГНГ- ");
                        result.append(gruz.getKgvn());
                        result.append("&nbsp;");
                    }
                    if (gruz.getNzgrEu() != null) {
                        result.append("<span class=\"chinese\">");
                        result.append(gruz.getNzgrEu());
                        result.append("</span>");
                        result.append("&nbsp;");
                    }
                    if (gruz.getNzgr() != null) {
                        result.append(gruz.getNzgr());
                        result.append("&nbsp;");
                    }
                    if (gruz.getEkgvn() != null) {
                        result.append("ЕТ СНГ- ");
                        result.append(gruz.getEkgvn());
                        result.append("&nbsp;");
                    }
                    if (gruz.getEnzgr() != null) {
                        result.append(gruz.getEnzgr());
                        result.append("&nbsp;");
                    }
                    if (gruz.getMassa() != null) {
                        result.append("<br/>");
                        result.append("Масса- ");
                        result.append(gruz.getMassa());
                        result.append("&nbsp;");
                    }
                    if (gruz.getPlaces() != null) {
                        result.append("Места- ");
                        result.append(gruz.getPlaces());
                        result.append("<br/>");
                    }
//                    }
                }
            }
        }
        return result.toString();
    }

    public String g15Disp4Print() {
        BigDecimal sum = new BigDecimal(0);
//		if (1 == g25) {
//			for (CimSmgsCarList car : cimSmgsCarLists.values())
//				for (CimSmgsGruz gruz : car.getCimSmgsGruzs().values()) {
//					sum = sum.add(gruz.getMassa() != null ? gruz.getMassa() : new BigDecimal(0));
//				}
//
//		} else {
        for (CimSmgsCarList car : cimSmgsCarLists.values())
            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values())
                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    sum = sum.add(gruz.getMassa() != null ? gruz.getMassa() : new BigDecimal(0));
                }

//		}
        return (sum.intValue() != 0 ? (new money2str(sum.doubleValue(), "NONE").getMoney2str().toString()) : "");
    }

    public String g27Disp4Print() {
        String _g27 = "";
        if (g27 != null && g27.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(g27);
            while (st.hasMoreTokens()) {
                _g27 += st.nextToken().trim() + "<br/>";
            }
        }
        return _g27;
    }

    public String buildG27CsPrint() {
        String _g27 = "";
        if (g27 != null && g27.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(g27);
            while (st.hasMoreTokens()) {
                _g27 += st.nextToken().trim() + "\n";
            }
        }
        return _g27;
    }

    public String buildG25Print() {
        return "X";
    }

    public String buildG25_1CsPrint() {
        return (g25 != null && g25 == 1 ? "X" : "");
    }

    public String buildG25_2CsPrint() {
        return (g25 != null && g25 == 2 ? "X" : "");
    }

    public String buildGb661Print() {
        return getGb661() != null && getGb661() == 1 ? "X" : "";
    }

    public String buildFrankofrachtPrint() {
        return getFrankofracht() != null && getFrankofracht() == 1 ? "X" : "";
    }

    public String buildIncotermsPrint() {
        return getIncoterms() != null && getIncoterms() == 1 ? "X" : "";
    }

    public String ga66Disp4Print() {
        String _ga66 = "";
        if (ga66 != null && ga66.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(ga66, "\n\r");
            while (st.hasMoreTokens()) {
                _ga66 += st.nextToken().trim() + "<br/>";
            }
        }
        return _ga66;
    }

    public String buildGa66Print() {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.defaultString(ga66));
        if (sb.length() > 0) {
            sb.append("\n");
        }
        sb.append(StringUtils.defaultString(ga661));
        if (sb.length() > 0) {
            sb.append(" ");
        }
        sb.append(StringUtils.defaultString(ga662));
        return sb.toString();
    }

    public String g28Disp4Print() {
        String _g28 = "";
        if (g28 != null && g28.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(g28);
            while (st.hasMoreTokens()) {
                _g28 += st.nextToken().trim() + (g281 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g281) : "") + "<br/>";
            }
        }
        return _g28;
    }

    /*public String buildG28CsPrint() {
        String _g28 = "";
        if (g28 != null && g28.trim().length() > 0) {
            StringTokenizer st = new StringTokenizer(g28);
            while (st.hasMoreTokens()) {
                _g28 += st.nextToken().trim() + (g281 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g281) : "") + "\n";
            }
        }
        return _g28;
    }*/

    /**
     * Текст - Копия
     *
     * @return строкадля печати
     */
    public String buildGCopyTextPrint() {
        for (Status status : getStatuses()) {
            if (status.getStatusDir().getHid().intValue() == 17) {
                return "Kopie";
            }
        }

        return "";
    }

    public String buildG28CsPrint() {
        return StringUtils.defaultString(g28);
    }

    public String buildG281CsPrint() {
        return (g281 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g281) : "");
    }

    public String buildG281CsEuPrint() {
        return (g281 != null ? " " + new SimpleDateFormat("yyyy-MM-dd").format(g281) : "");
    }

    public String gs47Disp() {
        return (g67 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g67) : "");
    }

    public String buildG67Print() {
        return (g67 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g67) : "");
    }

    public String buildG59CimPrint() {
        return (g67 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g67) : "");
    }

    public String buildG47Print() {
        return (g67 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g67) : "");
    }

    public String buildG29_1CimPrint() {
        return (g281 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g281) : "");
    }

    public String buildG21_2CmrPrint() {
        return (g281 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(g281) : "");
    }

    public String gs141_2Disp() {
        return (gs_141_2 != null ? " " + new SimpleDateFormat("yy.MM.dd").format(gs_141_2) : "");
    }

    public void addCimSmgsDocsItem(CimSmgsDocs csd) {
        if (csd != null) {
            csd.setCimSmgs(this);
            Integer sort = csd.getSort();
            String fn = StringUtils.defaultString(csd.getFieldNum()).trim();

            Map<Integer, CimSmgsDocs> m;
            switch (fn) {
                case "7":
                    m = cimSmgsDocses7;
                    break;
                case "9":
                    m = cimSmgsDocses9;
                    break;
                case "13":
                    m = cimSmgsDocses13;
                    break;
                default:
                    LoggerFactory.getLogger(CimSmgs.class).warn("field_num is not defined. Use \"7\"");
                    m = cimSmgsDocses7;
            }

            if (sort == null) {
                sort = m.size();
                csd.setSort(sort);
            }
            m.put(sort, csd);
        }
    }

    public void addCimSmgsCarListItem(CimSmgsCarList csc) {
        if (csc != null) {
            csc.setCimSmgs(this);
            cimSmgsCarLists.put(csc.getSort(), csc);
        }
    }

    public void addCimSmgsPlatelItem(CimSmgsPlatel csp) {
        if (csp != null) {
            csp.setCimSmgs(this);
            cimSmgsPlatels.put(csp.getSort(), csp);
        }
    }

    public void addCimSmgsPerevozItem(CimSmgsPerevoz csp) {
        if (csp != null) {
            csp.setCimSmgs(this);
            cimSmgsPerevoz.put(csp.getSort(), csp);
        }
    }

    public void addCimSmgsPlombItem(CimSmgsPlomb csp) {
        if (csp != null) {
            csp.setCimSmgs(this);
            cimSmgsPlombs.put(csp.getSort(), csp);
        }
    }

    public boolean addPlomb(CimSmgsPlomb cimSmgsPlomb) {
        if (cimSmgsPlomb.getCimSmgsCarList() == null && cimSmgsPlomb.getCimSmgsKonList() == null)
            return false;

        if (cimSmgsPlomb.getCimSmgsCarList() == null) {
            Map<Byte, CimSmgsPlomb> konPlombs = cimSmgsPlomb.getCimSmgsKonList().getCimSmgsPlombs();
            cimSmgsPlomb.setSort((byte) konPlombs.size());
            konPlombs.put((byte) konPlombs.size(), cimSmgsPlomb);
        } else {
            Map<Byte, CimSmgsPlomb> carPlombs = cimSmgsPlomb.getCimSmgsCarList().getCimSmgsPlombs();
            cimSmgsPlomb.setSort((byte) carPlombs.size());
            carPlombs.put((byte) carPlombs.size(), cimSmgsPlomb);
        }
        Map<Byte, CimSmgsPlomb> cimSmgsPlombs = this.getCimSmgsPlombs();
        cimSmgsPlomb.setCimSmgs(this);
        cimSmgsPlombs.put((byte) cimSmgsPlombs.size(), cimSmgsPlomb);
        return true;
    }

    /*public void addInvoiceItem(CimSmgsInvoice inv) {
         if (inv != null) {
 //			inv.setCimSmgs(this);
             invoices.add(inv);
         }
     }*/

    public boolean isSmgsOwner(String un) {
        return (this.un.equals(un));
    }

    public Long calcMassSend() {
        Long result = (long) 0;
        for (CimSmgsCarList elem : cimSmgsCarLists.values()) {
            if (elem.getMassSend() != null)
                result += elem.getMassSend();
        }
        return (result == 0 ? null : result);
    }

//    public Set<BIftminLog> getBIftminLogs() {
//        return this.BIftminLogs;
//    }
//
//    public void setBIftminLogs(Set<BIftminLog> BIftminLogs) {
//        this.BIftminLogs = BIftminLogs;
//    }

    public Date buildG16Date() {
        Date res = null;

        if (StringUtils.isNotBlank(g161)) {
            String[] ss = g161.split("-");
            if (ss.length >= 2) {
                String s1 = ss[0];
                String s2 = ss[1];
                if (StringUtils.isNotBlank(s1) && StringUtils.isNotBlank(s2)) {
                    try {
                        Calendar cal = Calendar.getInstance();
                        cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(s2));
                        cal.set(Calendar.MONTH, Integer.parseInt(s1) - 1);
                        cal.set(Calendar.HOUR_OF_DAY, 0);
                        cal.set(Calendar.MINUTE, 0);
                        cal.set(Calendar.SECOND, 0);
                        cal.set(Calendar.MILLISECOND, 0);
                        Calendar cur = Calendar.getInstance();
                        cur.add(Calendar.MONTH, 2);
                        if (cal.after(cur)) {
                            cal.add(Calendar.YEAR, -1);
                        }
                        res = cal.getTime();
                    } catch (Exception ex) {
                    }
                }
            }
        }

        return res;
    }

    /**
     * Подготавливает весь документ для сохранения
     */
    public void prepare4save(/*myUser user*/) {
        prepare4saveWoutCarLists();
        addCimSmgsCarLists();
//        addCimSmgsDocses7();
//        addCimSmgsDocses9();
//        addCimSmgsDocses13();
//        addCimSmgsDocses136();
//        addCimSmgsPlombs();
//        addCimSmgsPlatels();
//        addCimSmgsPerevoz();
//        addCimSmgsCarLists();
////		addCimSmgsStatusAllowed();
////        setDattr(new Date());
////        setAltered(new Date());
////        setUn(user.getUsername());
////        setTrans(user.getUsr().getGroup().getName());
//        if (getTbcStatus() == null) {
//            setTbcStatus((byte) 0);
//        }
    }

    /**
     * Подготавливает весь документ для сохранения
     * В случае, если был скопирован при помощи smgsAllCopyMapper
     */
    public void prepare4saveAfterCopy() {
        prepare4saveWoutCarLists();
        preparePlombs(this);
        addCimSmgsCarLists();
    }

    /**
     * Подготавливает  документ для сохранения
     * Записи о вагонах не подгатавливаются
     */
    private void prepare4saveWoutCarLists(/*myUser user*/) {
        addCimSmgsDocses7();
        addCimSmgsDocses9();
        addCimSmgsDocses13();
        addCimSmgsDocses136();
        addCimSmgsPlombs();
        addCimSmgsPlatels();
        addCimSmgsPerevoz();

        if (getTbcStatus() == null) {
            setTbcStatus((byte) 0);
        }
    }

    /**
     * Подгатавливает пломбы документа для сохранения
     * В случае, если был скопирован при помощи smgsAllCopyMapper
     *
     * @param smgs документ
     */
    private void preparePlombs(CimSmgs smgs) {
        smgs.getCimSmgsPlombs().clear();
        if (smgs.isContOtpr()) {
            removeCarPlombs(smgs.getCimSmgsCarLists().values());
        } else {
            for (CimSmgsCarList carList : smgs.getCimSmgsCarLists().values()) {
                removeConPlombs(carList.getCimSmgsKonLists().values());
            }
        }
    }

    private void removeCarPlombs(Collection<CimSmgsCarList> carLists) {
        for (CimSmgsCarList carList : carLists) {
            carList.getCimSmgsPlombs().clear();
        }
    }

    private void removeConPlombs(Collection<CimSmgsKonList> cimSmgsKonLists) {
        for (CimSmgsKonList konList : cimSmgsKonLists) {
            konList.getCimSmgsPlombs().clear();
        }
    }

    public void copyProps4Pack(CimSmgs from) {
        if (from.getG12() != null && from.getG12().trim().length() > 0)
            setG12(from.getG12().trim());
        if (from.getG121() != null && from.getG121().trim().length() > 0)
            setG121(from.getG121().trim());
        if (from.getG171() != null && from.getG171().trim().length() > 0)
            setG171(from.getG171().trim());
        if (from.getG17() != null && from.getG17().trim().length() > 0)
            setG17(from.getG17().trim());
        if (from.getG181() != null && from.getG181().trim().length() > 0)
            setG181(from.getG181().trim());
        if (from.getG18B1() != null && from.getG18B1().trim().length() > 0)
            setG18B1(from.getG18B1().trim());
        if (from.getG18B1a() != null && from.getG18B1a().trim().length() > 0)
            setG18B1a(from.getG18B1a().trim());
        if (from.getG18B1b() != null && from.getG18B1b().trim().length() > 0)
            setG18B1b(from.getG18B1b().trim());
        if (from.getG18B2() != null && from.getG18B2().trim().length() > 0)
            setG18B2(from.getG18B2().trim());
        if (from.getG694() != null && from.getG694().trim().length() > 0)
            setG694(from.getG694().trim());
        if (from.getCimSmgsCarLists().size() > 0) {
            CimSmgsKonList fromKon = from.getCimSmgsCarLists().get((byte) 0).getCimSmgsKonLists().get((byte) 0);
            CimSmgsGruz fromGruz = fromKon.getCimSmgsGruzs().get((byte) 0);
            for (CimSmgsCarList vag : getCimSmgsCarLists().values()) {
                for (CimSmgsKonList toKon : vag.getCimSmgsKonLists().values()) {
                    if (fromKon.getPlombs() != null && fromKon.getPlombs().trim().length() > 0)
                        toKon.setPlombs(fromKon.getPlombs().trim());
                    if (fromKon.getUtiN() != null && fromKon.getUtiN().trim().length() > 0)
                        toKon.setUtiN(fromKon.getUtiN().trim());

                    for (CimSmgsGruz toGruz : toKon.getCimSmgsGruzs().values()) {
                        if (fromGruz.getKgvn() != null && fromGruz.getKgvn().trim().length() > 0)
                            toGruz.setKgvn(fromGruz.getKgvn().trim());
                        if (fromGruz.getNzgr() != null && fromGruz.getNzgr().trim().length() > 0)
                            toGruz.setNzgr(fromGruz.getNzgr().trim());
                        break;
                    }
                    break;
                }
                break;
            }
        }
    }

    public void setCimSmgs(CimSmgs cimSmgs) {
        this.cimSmgs = cimSmgs;
    }

    public CimSmgs getCimSmgs() {
        return cimSmgs;
    }

    public void setCimSmgses(Set<CimSmgs> cimSmgses) {
        this.cimSmgses = cimSmgses;
    }

    public Set<CimSmgs> getCimSmgses() {
        return cimSmgses;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAviso_num(String aviso_num) {
        this.aviso_num = aviso_num;
    }

    public String getAviso_num() {
        return aviso_num;
    }

    public void setAviso_dat(Date aviso_dat) {
        this.aviso_dat = aviso_dat;
    }

    public Date getAviso_dat() {
        return aviso_dat;
    }

    public void setAviso_cod_dat(Date aviso_cod_dat) {
        this.aviso_cod_dat = aviso_cod_dat;
    }

    public Date getAviso_cod_dat() {
        return aviso_cod_dat;
    }

    public void setAviso_stavka(BigDecimal aviso_stavka) {
        this.aviso_stavka = aviso_stavka;
    }

    public BigDecimal getAviso_stavka() {
        return aviso_stavka;
    }

    public void setG11_prim(String g11_prim) {
        this.g11_prim = g11_prim;
    }

    public String getG11_prim() {
        return g11_prim;
    }

    public String getTbcNomer() {
        return tbcNomer;
    }

    public void setTbcNomer(String tbcNomer) {
        this.tbcNomer = tbcNomer;
    }

    public Byte getTbcStatus() {
        return tbcStatus;
    }

    public void setTbcStatus(Byte tbcStatus) {
        this.tbcStatus = tbcStatus;
    }

    public String getFtsNomer() {
        return ftsNomer;
    }

    public void setFtsNomer(String ftsNomer) {
        this.ftsNomer = ftsNomer;
    }

    public Byte getFtsStatus() {
        return ftsStatus;
    }

    public void setFtsStatus(Byte ftsStatus) {
        this.ftsStatus = ftsStatus;
    }

    public String g11_primDisp() {
        return (this.g11_prim != null ? this.g11_prim.replaceAll("\\n", "<br/>") : this.g11_prim);
    }

    public String buildGuGrPrimPrint() {
        return StringUtils.defaultString(g11_prim);
    }

    public String g23Disp() {
        StringBuffer result = new StringBuffer("");
        if (g23 != null && g23.length() > 0) {
            result.append("NHM-");
            result.append(g23);
        }
        if (g23b != null && g23b.length() > 0) {
            result.append("<br/>");
            result.append("ЕТ СНГ-");
            result.append(g23b);
        }
        return result.toString();
    }

    public String buildG23CsPrint() {
        StringBuffer result = new StringBuffer("");
        if (g23 != null && g23.length() > 0) {
            result.append("NHM-");
            result.append(g23);
        }
        if (g23b != null && g23b.length() > 0) {
            result.append("\n");
            result.append("ЕТ СНГ-");
            result.append(g23b);
        }
        return result.toString();
    }

    public String buildG23CsEuPrint() {
        StringBuilder result = new StringBuilder("");
        Map<Integer, String> map = new TreeMap<>();

        StringTokenizer stG23;
        int count;
        if (g23 != null && g23.length() > 0) {
            stG23 = new StringTokenizer(g23, ",");
            count = stG23.countTokens();
            for (int i = 0; i < count; i++) {
                map.put(i, "NHM-" + stG23.nextToken());
            }
        }

        if (g23b != null && g23b.length() > 0) {
            stG23 = new StringTokenizer(g23b, ",");
            count = stG23.countTokens();
            for (int i = 0; i < count; i++) {
                String nhm = map.get(i);
                if (nhm == null) {
                    nhm = "";
                }
                nhm += "\nЕТ СНГ-" + stG23.nextToken();
                map.put(i, nhm);
            }
        }

        for (String codes : map.values()) {
            result.append(codes).append("\n");
        }
        /*if (g23 != null && g23.length() > 0) {
            result.append("NHM-");
            result.append(g23);
        }
        if (g23b != null && g23b.length() > 0) {
            result.append("\n");
            result.append("ЕТ СНГ-");
            result.append(g23b);
        }*/
        return result.toString();
    }


    public String g24Disp() {
        StringBuffer result = new StringBuffer("");
        if (g24N != null) {
            result.append("Нетто/Netto ");
            result.append(g24N);
        }
        if (g24T != null) {
            result.append("<br/>");
            result.append("Тара/Tara ");
            result.append(g24T);
        }
        if (g24B != null) {
            result.append("<br/>");
            result.append("Брутто/Brutto ");
            result.append(g24B);
            result.append("<br/>");
            result.append(g24BDisp4Print());
            result.append(" кг");
        }
        return result.toString();
    }

    public String buildG24CsPrint() {
        StringBuffer result = new StringBuffer("");
        if (g24N != null) {
            result.append("N: ");
            result.append(g24N);
        }
        if (g24T != null) {
            result.append("\n");
            result.append("T: ");
            result.append(g24T);
        }
        if (g24B != null) {
            result.append("\n");
            result.append("B: ");
            result.append(g24B);
            result.append("\n");
            result.append(g24BDisp4Print());
        }
        if (g_24_bcn != null) {
            result.append("\n");
            result.append(g_24_bcn);
        }
        return result.toString();
    }

    public String g29Disp() {
        StringBuffer result = new StringBuffer("");
        String sep = "";
        if (g29 != null && g29.length() > 0 && g29r != null && g29r.length() > 0) {
            sep = "&nbsp;&nbsp;/&nbsp;&nbsp;";
        }
        if (g29 != null && g29.length() > 0) {
            result.append(g29);
            result.append(sep);
        }
        result.append(g29r);
        return result.toString();
    }

    public String buildG29CsPrint() {
        StringBuffer result = new StringBuffer("");
        String sep = "";
        if (g29 != null && g29.length() > 0 && g29r != null && g29r.length() > 0) {
            sep = "  /  ";
        }
        if (g29 != null && g29.length() > 0) {
            result.append(g29);
            result.append(sep);
        }
        if (g29r != null && g29r.length() > 0) {
            result.append(g29r);
        }
        return result.toString();
    }

    public boolean hasPack() {
        return this.getPackDoc() != null && this.getPackDoc().getHid() != null ? true : false;
    }

    public void insertNewPacket(myUser user) {
        PackDoc pack = new PackDoc();
        pack.setRoute(getRoute());
        pack.setUsrGroupsDir(user.getUsr().getGroup());
//        getPackDocDAO().makePersistent(pack);
        pack.addCimSmgsItem(this);
    }

    public void preparePacket(myUser user) {
        getPackDoc().setRoute(getRoute());
        getPackDoc().setUsrGroupsDir(user.getUsr().getGroup());
//        getPackDocDAO().makePersistent(pack);
        getPackDoc().addCimSmgsItem(this);
    }

    public boolean isEpd() {
        return this.getDocType1() != null && this.getDocType1().equals(EPD_DOC_TYPE_HID);
    }
//	public void setVags(List<CimSmgsCarList> vags) {
//		this.vags = vags;
//	}
//
//	public List<CimSmgsCarList> getVags() {
//		return vags;
//	}


    //////////////////// Smgs2 print templates

    /**
     * Гр15-18. Наименование груза, род упаковки, кол-во мест, масса
     *
     * @return строкадля печати
     */
    public String buildG15Cs2Print() {
        String prefix = "";
        int contCount = 0;
        boolean first = true;

        StringBuilder result = new StringBuilder();

        List<CimSmgsGruz> allGryzes = new ArrayList<>();
        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
            contCount = contCount + car.getCimSmgsKonLists().size();
//                for (CimSmgsKonList kont : car.getCimSmgsKonLists().values()) {
            for (CimSmgsGruz gruz : car.getCimSmgsGruzs().values()) {
                boolean add = true;
                for (CimSmgsGruz gruzFromlist : allGryzes) {
                    if (((gruzFromlist.getKgvn() == null) || gruzFromlist.getKgvn().equals(gruz.getKgvn())) &&
                            ((gruzFromlist.getEkgvn() == null) || gruzFromlist.getEkgvn().equals(gruz.getEkgvn())) &&
                            ((gruzFromlist.getNzgr() == null) || gruzFromlist.getNzgr().equals(gruz.getNzgr())) &&
                            ((gruzFromlist.getUpak() == null) || gruzFromlist.getUpak().equals(gruz.getUpak()))) {
                        if (gruz.getPlaces() != null)
                            gruzFromlist.setPlaces((gruzFromlist.getPlaces() != null ? gruzFromlist.getPlaces() : 0) + gruz.getPlaces());
                        if (gruz.getMassa() != null)
                            gruzFromlist.setMassa((gruzFromlist.getMassa() != null ? gruzFromlist.getMassa().add(gruz.getMassa()) : gruz.getMassa()));
                        add = false;
                    }
                }
                if (add) {
                    CimSmgsGruz temp = new CimSmgsGruz();
                    if (gruz.getKgvn() != null)
                        temp.setKgvn(gruz.getKgvn());
                    if (gruz.getEkgvn() != null)
                        temp.setEkgvn(gruz.getEkgvn());
                    if (gruz.getNzgr() != null)
                        temp.setNzgr(gruz.getNzgr());
                    if (gruz.getNzgrEu() != null)
                        temp.setNzgrEu(gruz.getNzgrEu());
                    if (gruz.getMassa() != null)
                        temp.setMassa(gruz.getMassa());
                    if (gruz.getPlaces() != null)
                        temp.setPlaces(gruz.getPlaces());

                    if (gruz.getUpak() != null)
                        temp.setUpak(gruz.getUpak());
                    allGryzes.add(temp);
                }
            }
//                }

        }


//        for(CimSmgsCarList car: getCimSmgsCarLists().values()){
//            contCount=contCount+car.getCimSmgsKonLists().size();
//            for(CimSmgsKonList kont: car.getCimSmgsKonLists().values()){
//                for(CimSmgsGruz gruz: kont.getCimSmgsGruzs().values()){
        for (CimSmgsGruz gruz : allGryzes) {
            result.append(prefix);
            prefix = " || ";
//                    result.append(StringUtils.defaultString(gruz.getKgvn()));
//                    if(StringUtils.isNotBlank(gruz.getKgvn()) || StringUtils.isNotBlank(gruz.getNzgr())){
//                        result.append(" ГНГ ");
//                    }
//                    result.append(StringUtils.defaultString(gruz.getNzgr()));
//                    result.append("\n");
//                    result.append(StringUtils.defaultString(gruz.getEkgvn()));
//                    if(StringUtils.isNotBlank(gruz.getEkgvn()) || StringUtils.isNotBlank(gruz.getEnzgr())){
//                        result.append(" ЕТСНГ ");
//                    }
//                    result.append(StringUtils.defaultString(gruz.getEnzgr()));

            if (StringUtils.isNotBlank(gruz.getKgvn()) || StringUtils.isNotBlank(gruz.getNzgr())) {
                result.append("ГНГ-").append(StringUtils.defaultString(gruz.getKgvn()));
            }
            if (StringUtils.isNotBlank(gruz.getEkgvn()) || StringUtils.isNotBlank(gruz.getEnzgr())) {
                result.append(" ЕТСНГ-").append(StringUtils.defaultString(gruz.getEkgvn()));
            }
            result.append("\n");
            result.append(StringUtils.defaultString(gruz.getNzgr()));
            result.append(StringUtils.defaultString(gruz.getNzgrEu()));


            result.append(prefix);
            if (first && isContOtpr()) {
                result.append("КОНТЕЙНЕР\n-------\n");
            } else
                result.append("\n-------\n");

            result.append(StringUtils.defaultString(gruz.getUpak()));

            result.append(prefix);
            if (first) {
                if (contCount > 0)
                    result.append(contCount).append("\n-----\n");
                first = false;
            }
            result.append(gruz.getPlaces() != null ? gruz.getPlaces() : "");
            result.append(prefix);

            if (gruz.getMassa() != null) {
                result.append(gruz.getMassa());
            }
        }
//                }
//            }
//        }

        if (g11_prim != null)
            result.append(prefix).append(g11_prim).append(prefix).append(prefix).append(prefix);
        return result.toString();
    }

    /**
     * Гр 15 Наименование груза как таблица с одной колонкой
     *
     * @return строкадля печати
     */
    public String buildG15v2Cs2Print() {
        StringBuilder result = new StringBuilder();
        String prefix = " || ";

        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kont : car.getCimSmgsKonLists().values()) {

                for (CimSmgsGruz gruz : kont.getCimSmgsGruzs().values()) {

                    if (StringUtils.isNotBlank(gruz.getKgvn()) || StringUtils.isNotBlank(gruz.getNzgr())) {
                        result.append("ГНГ-").append(StringUtils.defaultString(gruz.getKgvn()));
                    }
                    if (StringUtils.isNotBlank(gruz.getEkgvn()) || StringUtils.isNotBlank(gruz.getEnzgr())) {
                        result.append(" ЕТСНГ-").append(StringUtils.defaultString(gruz.getEkgvn()));
                    }
                    result.append("\n");
                    result.append(StringUtils.defaultString(gruz.getNzgr()));
                    result.append(StringUtils.defaultString(gruz.getNzgrEu()));
//                    System.out.println(StringUtils.defaultString(gruz.getNzgrEu()));
                    result.append(prefix);
                }
            }
        }
        if (g11_prim != null)
            result.append(prefix).append(g11_prim);
        return result.toString();
    }

    public String buildPlacesPrint() {
        int places = 0;

        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
            for (CimSmgsKonList kont : car.getCimSmgsKonLists().values()) {

                for (CimSmgsGruz gruz : kont.getCimSmgsGruzs().values()) {
                    if (gruz.getPlaces() != null)
                        places = places + gruz.getPlaces();
                }
            }
        }

        if (places == 0)
            return "";

        return "ИТОГО: || " + Integer.toString(places);
    }

    public String buildKontsCountPrint() {
        int countCount = 0;
        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
            if (car.getCimSmgsKonLists() != null)
                countCount = countCount + car.getCimSmgsKonLists().size();
        }
        if (countCount == 0)
            return "";
        return "КОНТЕЙНЕРЫ:" + countCount;
    }

    /**
     * Гр 16-18 Род упаковки, кол-во мест, масса
     *
     * @return строкадля печати
     */
    public String buildG161718Cs2Print() {
        int kontCount = 0;
        BigDecimal netto = new BigDecimal(0), brutto = new BigDecimal(0), tara = new BigDecimal(0);
        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {

            kontCount += car.getCimSmgsKonLists().values().size();
        }
        int grCount = 0;
        for (CimSmgsCarList car : getCimSmgsCarLists().values()) {

            for (CimSmgsKonList kon : car.getCimSmgsKonLists().values()) {

                for (CimSmgsGruz gruz : kon.getCimSmgsGruzs().values()) {
                    if (gruz.getPlaces() != null)
                        grCount += gruz.getPlaces();
                    if (gruz.getMassa() != null)
                        netto = netto.add(gruz.getMassa());
                }
            }
        }

        StringBuilder result = new StringBuilder();
        String prefix = " || ";
        result.append("КОНТЕЙНЕР").append(prefix).append(kontCount).append(prefix).append(netto.doubleValue() > 0 ? "H:" + netto : "").append(prefix)
                .append("------").append(prefix).append("-").append(prefix).append(g24T != null && g24T.doubleValue() > 0 ? "Т:" + g24T : "").append(prefix)
                .append("МЕСТА").append(prefix).append(grCount).append(prefix).append(g24B != null ? "Б:" + g24B : "").append(prefix);

        return result.toString();
    }

    //графа 5
    public String buildG5Cs2Print() {
        StringBuilder builder = new StringBuilder();
        if (getG101r() != null)
            builder.append(getG101r()).append(" ");

        if (getG102r() != null)
            builder.append(getG102r()).append("\n");

        if (getG2017() != null)
            builder.append(getG2017());

        return builder.toString();
    }

    /**
     * Гр6. Пограничные станции переходов
     *
     * @return строкадля печати
     */
    public String buildG6Cs2Print() {
        String _f13 = "";
        for (CimSmgsDocs elem : cimSmgsDocses13.values()) {
            _f13 = _f13 + (elem.getText3() != null ? elem.getText3() + "-" : "");
            _f13 = _f13 + (elem.getText2() != null ? elem.getText2() + "-" : "");
            _f13 = _f13 + (elem.getText() != null ? elem.getText() : "");
//            _f13 = _f13 + (elem.getRoad_s_name_r() != null ? elem.getRoad_s_name_r() : "");
            _f13 += "\n";
        }

        return _f13;
    }

    /**
     * Гр7-12. Вагон
     *
     * @return строкадля печати
     */
    public String buildG7Cs2Print() {
        StringBuilder result = new StringBuilder();
        String prefix = "";
        if (getCimSmgsCarLists().values().size() < 2) {
            for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
                result.append(prefix);
                prefix = " || ";
                result.append(StringUtils.defaultString(car.getNvag()));
                result.append(
                        car.getScep() != null && StringUtils.isNotBlank(car.getRefSecNo()) || car.getRefSecKol() != null ?
                                " PC" +
                                        (StringUtils.isNotBlank(car.getRefSecNo()) ? " - " + car.getRefSecNo() : "") +
                                        (car.getRefSecKol() != null ? "(" + car.getRefSecKol() + ")" : "")
                                :
                                ""
                );
                result.append(StringUtils.isNotBlank(car.getRod()) ? " " + car.getRod() : "");
                result.append(StringUtils.isNotBlank(car.getKlientName()) ? ", " + car.getKlientName() : "");
                result.append(StringUtils.isNotBlank(car.getNameSob()) ? ", " + car.getNameSob() : "");

                result.append(prefix);
                result.append(StringUtils.defaultString(car.getVagOtm()));

                result.append(prefix);
                result.append(car.getGrPod() != null ? car.getGrPod() : "");

                result.append(prefix);
                result.append(car.getKolOs() != null ? car.getKolOs() : "");

                result.append(prefix);
                result.append(car.getTaraVag() != null ? car.getTaraVag() : "");

                result.append(prefix);
                result.append(StringUtils.defaultString(car.getCicternType()));
            }
        } else {
            result.append("Соглавно ведомости вагонов").append(" || ").append(" || ").append(" || ").append(" || ").append(" || ");
        }
        return result.toString();
    }

    /**
     * Гр19. Пломбы
     *
     * @return строкадля печати
     */
    public String buildG19Cs2Print() {
        StringBuffer result = new StringBuffer();
        String prefix = "";
        for (CimSmgsPlomb plomb : getCimSmgsPlombs().values()) {
            result.append(prefix);
            prefix = " || ";
            result.append(plomb.getKpl() != null ? plomb.getKpl() : "");

            result.append(prefix);
            result.append(StringUtils.defaultString(plomb.getZnak()));
        }
        return result.toString();
    }

    /**
     * Гр20. Погружено
     *
     * @return строкадля печати
     */
    public String buildG20Cs2Print() {
        if (getG22() == null) {
            return "";
        } else {
            return getG22() == 1 ? "отправитель" : "перевозчик";
        }
    }

    /**
     * Контейнер смгс2
     *
     * @return строкадля печати
     */
    public String buildGKontCs2Print() {
        StringBuffer result = new StringBuffer();
        if (getCimSmgsCarLists().values().size() < 2) {
            for (CimSmgsCarList car : getCimSmgsCarLists().values()) {
                for (CimSmgsKonList kont : car.getCimSmgsKonLists().values()) {
                    result.append(StringUtils.defaultString(kont.getUtiN()));
                    if (result.length() > 0)
                        result.append(" - ");
                    result.append(StringUtils.defaultString(kont.getUtiType()));
                    result.append(kont.getGrpod() != null ? (" (" + kont.getGrpod() + ") ") : "");
//                result.append(kont.getSizeFoot() != null ? kont.getSizeFoot() : "");
                    result.append(kont.getTaraKont() != null ? kont.getTaraKont() : "");

                    result.append("\n");
                }
            }
        } else {
            result.append("Соглавно ведомости контейнеров");
        }
        return result.toString();
    }

    /**
     * Тара смгс 2
     *
     * @return строкадля печати
     */
    public String buildG24TCs2Print() {
        return getG24T() != null ? "Т: " + getG24T() : "";
    }

    /**
     * Брутто смгс 2
     *
     * @return строкадля печати
     */
    public String buildG24BCs2Print() {
        return getG24B() != null ? "Б: " + getG24B() : "";
    }

    /**
     * Гр22. Перевозчики
     *
     * @return строка для печати
     */
    public String buildG22Cs2Print() {
        StringBuffer result = new StringBuffer();
        String prefix = "";
        for (CimSmgsPerevoz perevoz : getCimSmgsPerevoz().values()) {
            result.append(prefix);
            prefix = " || ";
            result.append(StringUtils.defaultString(perevoz.getNamPer()));
            if (perevoz.getCodePer() != null && perevoz.getCodePer().length() > 0)
                result.append(" - ").append(perevoz.getCodePer());

            result.append(prefix);
            result.append(StringUtils.defaultString(perevoz.getStBeg())).append("\n").append(StringUtils.defaultString((perevoz.getStEnd())));

            result.append(prefix);
            result.append(StringUtils.defaultString(perevoz.getCodStBeg())).append("\n").append(StringUtils.defaultString(perevoz.getCodStEnd()));
        }
        return result.toString();
    }

    /**
     * Гр1. Отправитель, подпись
     *
     * @return строка для печати
     */
    public String buildG14_Print() {
        return g14;
    }

    final public String DOP_LIST_PRINT_CS2 = "Смотри доп. лист";

    /**
     * Гр3. Заявления отправителя
     *
     * @return строка для печати
     */
    public String buildZayav_otprCs2Print() {
        return (zayav_otpr_c != null && zayav_otpr_c == 1) ? DOP_LIST_PRINT_CS2 : getZayav_otpr();
    }

    /**
     * Гр23. Уплата провозных платежей смгс2
     *
     * @return строка для печати
     */
    public String buildG23Cs2Print() {
        return g7c != null && g7c == 1 ? DOP_LIST_PRINT_CS2 : buildG4SmgsPrint();
    }

    /**
     * Гр25. Информация, не предн. для перервозчика смгс2
     *
     * @return строка для печати
     */
    public String buildG25Cs2Print() {
        return g141c != null && g141c == 1 ? DOP_LIST_PRINT_CS2 : getG15r();
    }

    /**
     * Гр28. Отметки для вып. тамож... смгс2
     *
     * @return строка для печати
     */
    public String buildG28Cs2Print() {
        return g26c != null && g26c == 1 ? DOP_LIST_PRINT_CS2 : getG26();
    }

    ////// DOP LIST

    public boolean hasDopList() {
        switch (docType1.intValue()) {
            case 7:  // smgs2
                return (zayav_otpr_c != null && zayav_otpr_c == 1) ||
                        (g141c != null && g141c == 1) ||
                        (g26c != null && g26c == 1) ||
                        (g7c != null && g7c == 1);
            default:
                return false;
        }
    }

    public String buildEmptyLinePrint() {
        return "\n";
    }

    public String buildTitleDLPrint() {
        return "Дополнительный лист";
    }

    public String buildGr3TitleDLPrint() {
        return zayav_otpr_c != null && zayav_otpr_c == 1 ? "Графа 3. Заявления отправителя" : "";
    }

    public String buildGr3DLPrint() {
        return zayav_otpr_c != null && zayav_otpr_c == 1 ? getZayav_otpr() : "";
    }

    public String buildGr23TitleDLPrint() {
        return g7c != null && g7c == 1 ? "Графа 23. Уплата провозных платежей" : "";
    }

    public String buildGr23DLPrint() {
        return g7c != null && g7c == 1 ? buildG4SmgsPrint() : "";
    }

    public String buildGr25TitleDLPrint() {
        return g141c != null && g141c == 1 ? "Графа 25. Информация, не предназначенная для перевозчика, № договора на поставку" : "";
    }

    public String buildGr25DLPrint() {
        return g141c != null && g141c == 1 ? getG15r() : "";
    }

    public String buildGr28TitleDLPrint() {
        return g26c != null && g26c == 1 ? "Графа 28. Отметки для выполнения таможенных и других административных формальностей" : "";
    }

    public String buildGr28DLPrint() {
        return g26c != null && g26c == 1 ? getG26() : "";
    }

    public String buildGr29TitleDLPrint() {
        return "29. Отправка №";
    }

    public String buildGr29DLPrint() {
        return getG694();
    }

    /**
     * Перевозчик смгс 2
     *
     * @return строка для печати
     */
    public String buildPerevozCs2Print() {
        for (CimSmgsPerevoz perevoz : getCimSmgsPerevoz().values()) {
            return StringUtils.defaultString(perevoz.getNamPer());
        }
        return "";
    }

    public boolean isContOtpr() {
        return getG25() == null || getG25() == 2;
    }

    public boolean notForDefaultView() {
        return getType() == 1 || getType() == 10 || getType() == 7 || getType() == 12 || getType() == 11 || getType() == 14;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CimSmgs cimSmgs1 = (CimSmgs) o;
        return Objects.equals(hid, cimSmgs1.hid) &&
                Objects.equals(g1, cimSmgs1.g1) &&
                Objects.equals(g2, cimSmgs1.g2) &&
                Objects.equals(g3, cimSmgs1.g3) &&
                Objects.equals(g4, cimSmgs1.g4) &&
                Objects.equals(g5, cimSmgs1.g5) &&
                Objects.equals(g6, cimSmgs1.g6) &&
                Objects.equals(g7, cimSmgs1.g7) &&
                Objects.equals(g8, cimSmgs1.g8) &&
                Objects.equals(g9, cimSmgs1.g9) &&
                Objects.equals(g10, cimSmgs1.g10) &&
                Objects.equals(g11, cimSmgs1.g11) &&
                Objects.equals(g12, cimSmgs1.g12) &&
                Objects.equals(g13, cimSmgs1.g13) &&
                Objects.equals(g141, cimSmgs1.g141) &&
                Objects.equals(g142, cimSmgs1.g142) &&
                Objects.equals(g15, cimSmgs1.g15) &&
                Objects.equals(g16, cimSmgs1.g16) &&
                Objects.equals(g161, cimSmgs1.g161) &&
                Objects.equals(g17, cimSmgs1.g17) &&
                Objects.equals(g18, cimSmgs1.g18) &&
                Objects.equals(g181, cimSmgs1.g181) &&
                Objects.equals(g19, cimSmgs1.g19) &&
                Objects.equals(g20, cimSmgs1.g20) &&
                Objects.equals(g21, cimSmgs1.g21) &&
                Objects.equals(g21_, cimSmgs1.g21_) &&
                Objects.equals(g22, cimSmgs1.g22) &&
                Objects.equals(g22_, cimSmgs1.g22_) &&
                Objects.equals(g23, cimSmgs1.g23) &&
                Objects.equals(g24, cimSmgs1.g24) &&
                Objects.equals(g25, cimSmgs1.g25) &&
                Objects.equals(g26, cimSmgs1.g26) &&
                Objects.equals(g27, cimSmgs1.g27) &&
                Objects.equals(g28, cimSmgs1.g28) &&
                Objects.equals(g281, cimSmgs1.g281) &&
                Objects.equals(g29, cimSmgs1.g29) &&
                Objects.equals(g30, cimSmgs1.g30) &&
                Objects.equals(g301, cimSmgs1.g301) &&
                Objects.equals(un, cimSmgs1.un) &&
                Objects.equals(trans, cimSmgs1.trans) &&
                Objects.equals(g40, cimSmgs1.g40) &&
                Objects.equals(g44, cimSmgs1.g44) &&
                Objects.equals(g191, cimSmgs1.g191) &&
                Objects.equals(g192, cimSmgs1.g192) &&
                Objects.equals(g193, cimSmgs1.g193) &&
                Objects.equals(g48, cimSmgs1.g48) &&
                Objects.equals(g41, cimSmgs1.g41) &&
                Objects.equals(g45, cimSmgs1.g45) &&
                Objects.equals(ga491, cimSmgs1.ga491) &&
                Objects.equals(gb491, cimSmgs1.gb491) &&
                Objects.equals(ga492, cimSmgs1.ga492) &&
                Objects.equals(gb492, cimSmgs1.gb492) &&
                Objects.equals(ga493, cimSmgs1.ga493) &&
                Objects.equals(gb493, cimSmgs1.gb493) &&
                Objects.equals(ga494, cimSmgs1.ga494) &&
                Objects.equals(gb494, cimSmgs1.gb494) &&
                Objects.equals(ga50, cimSmgs1.ga50) &&
                Objects.equals(gb50, cimSmgs1.gb50) &&
                Objects.equals(ga52, cimSmgs1.ga52) &&
                Objects.equals(gb52, cimSmgs1.gb52) &&
                Objects.equals(ga51, cimSmgs1.ga51) &&
                Objects.equals(gb51, cimSmgs1.gb51) &&
                Objects.equals(ga53, cimSmgs1.ga53) &&
                Objects.equals(gb53, cimSmgs1.gb53) &&
                Objects.equals(ga54, cimSmgs1.ga54) &&
                Objects.equals(gb54, cimSmgs1.gb54) &&
                Objects.equals(ga55, cimSmgs1.ga55) &&
                Objects.equals(gb55, cimSmgs1.gb55) &&
                Objects.equals(ga56, cimSmgs1.ga56) &&
                Objects.equals(gb56, cimSmgs1.gb56) &&
                Objects.equals(ga57, cimSmgs1.ga57) &&
                Objects.equals(gb57, cimSmgs1.gb57) &&
                Objects.equals(g591, cimSmgs1.g591) &&
                Objects.equals(g592, cimSmgs1.g592) &&
                Objects.equals(g593, cimSmgs1.g593) &&
                Objects.equals(g594, cimSmgs1.g594) &&
                Objects.equals(g595, cimSmgs1.g595) &&
                Objects.equals(g596, cimSmgs1.g596) &&
                Objects.equals(g597, cimSmgs1.g597) &&
                Objects.equals(g598, cimSmgs1.g598) &&
                Objects.equals(g60, cimSmgs1.g60) &&
                Objects.equals(g61, cimSmgs1.g61) &&
                Objects.equals(g611, cimSmgs1.g611) &&
                Objects.equals(g612, cimSmgs1.g612) &&
                Objects.equals(g43, cimSmgs1.g43) &&
                Objects.equals(g47, cimSmgs1.g47) &&
                Objects.equals(g63, cimSmgs1.g63) &&
                Objects.equals(g64, cimSmgs1.g64) &&
                Objects.equals(g65, cimSmgs1.g65) &&
                Objects.equals(g651, cimSmgs1.g651) &&
                Objects.equals(g652, cimSmgs1.g652) &&
                Objects.equals(ga66, cimSmgs1.ga66) &&
                Objects.equals(gb661, cimSmgs1.gb661) &&
                Objects.equals(gb662, cimSmgs1.gb662) &&
                Objects.equals(g67, cimSmgs1.g67) &&
                Objects.equals(g691, cimSmgs1.g691) &&
                Objects.equals(g692, cimSmgs1.g692) &&
                Objects.equals(g693, cimSmgs1.g693) &&
                Objects.equals(g694, cimSmgs1.g694) &&
                Objects.equals(g68, cimSmgs1.g68) &&
                Objects.equals(g62, cimSmgs1.g62) &&
                Objects.equals(g621, cimSmgs1.g621) &&
                Objects.equals(g622, cimSmgs1.g622) &&
                Objects.equals(g38, cimSmgs1.g38) &&
                Objects.equals(g39, cimSmgs1.g39) &&
                Objects.equals(g18B1, cimSmgs1.g18B1) &&
                Objects.equals(g18B2, cimSmgs1.g18B2) &&
                Objects.equals(ga581, cimSmgs1.ga581) &&
                Objects.equals(gb581, cimSmgs1.gb581) &&
                Objects.equals(ga582, cimSmgs1.ga582) &&
                Objects.equals(gb582, cimSmgs1.gb582) &&
                Objects.equals(ga583, cimSmgs1.ga583) &&
                Objects.equals(gb583, cimSmgs1.gb583) &&
                Objects.equals(ga584, cimSmgs1.ga584) &&
                Objects.equals(gb584, cimSmgs1.gb584) &&
                Objects.equals(ga585, cimSmgs1.ga585) &&
                Objects.equals(gb585, cimSmgs1.gb585) &&
                Objects.equals(ga586, cimSmgs1.ga586) &&
                Objects.equals(gb586, cimSmgs1.gb586) &&
                Objects.equals(g20100, cimSmgs1.g20100) &&
                Objects.equals(g42, cimSmgs1.g42) &&
                Objects.equals(g46, cimSmgs1.g46) &&
                Objects.equals(g11_1, cimSmgs1.g11_1) &&
                Objects.equals(g12_1, cimSmgs1.g12_1) &&
                Objects.equals(g13_1, cimSmgs1.g13_1) &&
                Objects.equals(g41_1, cimSmgs1.g41_1) &&
                Objects.equals(g42_1, cimSmgs1.g42_1) &&
                Objects.equals(g43_1, cimSmgs1.g43_1) &&
                Objects.equals(hidCim, cimSmgs1.hidCim) &&
                Objects.equals(hidIcf, cimSmgs1.hidIcf) &&
                Objects.equals(hidSp, cimSmgs1.hidSp) &&
                Objects.equals(hidSmgs, cimSmgs1.hidSmgs) &&
                Objects.equals(iftminId, cimSmgs1.iftminId) &&
                Objects.equals(iftminOut, cimSmgs1.iftminOut) &&
                Objects.equals(iftminIn, cimSmgs1.iftminIn) &&
                Objects.equals(iftminId2, cimSmgs1.iftminId2) &&
                Objects.equals(iftminOut2, cimSmgs1.iftminOut2) &&
                Objects.equals(iftminIn2, cimSmgs1.iftminIn2) &&
                Objects.equals(g121, cimSmgs1.g121) &&
                Objects.equals(g24N, cimSmgs1.g24N) &&
                Objects.equals(g24T, cimSmgs1.g24T) &&
                Objects.equals(g24B, cimSmgs1.g24B) &&
                Objects.equals(statusBr, cimSmgs1.statusBr) &&
                Objects.equals(altered, cimSmgs1.altered) &&
                Objects.equals(g1r, cimSmgs1.g1r) &&
                Objects.equals(g14, cimSmgs1.g14) &&
                Objects.equals(g4r, cimSmgs1.g4r) &&
                Objects.equals(g7r, cimSmgs1.g7r) &&
                Objects.equals(g9r, cimSmgs1.g9r) &&
                Objects.equals(g101, cimSmgs1.g101) &&
                Objects.equals(g101r, cimSmgs1.g101r) &&
                Objects.equals(g102, cimSmgs1.g102) &&
                Objects.equals(g102r, cimSmgs1.g102r) &&
                Objects.equals(g13r, cimSmgs1.g13r) &&
                Objects.equals(g15r, cimSmgs1.g15r) &&
                Objects.equals(g162, cimSmgs1.g162) &&
                Objects.equals(g162r, cimSmgs1.g162r) &&
                Objects.equals(g163, cimSmgs1.g163) &&
                Objects.equals(g163r, cimSmgs1.g163r) &&
                Objects.equals(g18r, cimSmgs1.g18r) &&
                Objects.equals(g29r, cimSmgs1.g29r) &&
                Objects.equals(profile, cimSmgs1.profile) &&
                Objects.equals(targGr, cimSmgs1.targGr) &&
                Objects.equals(avFields, cimSmgs1.avFields) &&
                Objects.equals(g1c, cimSmgs1.g1c) &&
                Objects.equals(g4c, cimSmgs1.g4c) &&
                Objects.equals(g7c, cimSmgs1.g7c) &&
                Objects.equals(g9c, cimSmgs1.g9c) &&
                Objects.equals(g13c, cimSmgs1.g13c) &&
                Objects.equals(g15c, cimSmgs1.g15c) &&
                Objects.equals(g18c, cimSmgs1.g18c) &&
                Objects.equals(g20c, cimSmgs1.g20c) &&
                Objects.equals(numClaim, cimSmgs1.numClaim) &&
                Objects.equals(g15_1, cimSmgs1.g15_1) &&
                Objects.equals(g16_1, cimSmgs1.g16_1) &&
                Objects.equals(g16r, cimSmgs1.g16r) &&
                Objects.equals(g17_1, cimSmgs1.g17_1) &&
                Objects.equals(g18_1, cimSmgs1.g18_1) &&
                Objects.equals(g18r_1, cimSmgs1.g18r_1) &&
                Objects.equals(g19_1, cimSmgs1.g19_1) &&
                Objects.equals(g19r, cimSmgs1.g19r) &&
                Objects.equals(g45_1, cimSmgs1.g45_1) &&
                Objects.equals(g46_1, cimSmgs1.g46_1) &&
                Objects.equals(g46r, cimSmgs1.g46r) &&
                Objects.equals(g47_1, cimSmgs1.g47_1) &&
                Objects.equals(g48_1, cimSmgs1.g48_1) &&
                Objects.equals(g48r, cimSmgs1.g48r) &&
                Objects.equals(g49, cimSmgs1.g49) &&
                Objects.equals(g49r, cimSmgs1.g49r) &&
                Objects.equals(g201, cimSmgs1.g201) &&
                Objects.equals(g202, cimSmgs1.g202) &&
                Objects.equals(g202r, cimSmgs1.g202r) &&
                Objects.equals(g203, cimSmgs1.g203) &&
                Objects.equals(g204, cimSmgs1.g204) &&
                Objects.equals(g205, cimSmgs1.g205) &&
                Objects.equals(g206, cimSmgs1.g206) &&
                Objects.equals(g206r, cimSmgs1.g206r) &&
                Objects.equals(g207, cimSmgs1.g207) &&
                Objects.equals(g207r, cimSmgs1.g207r) &&
                Objects.equals(g208, cimSmgs1.g208) &&
                Objects.equals(g209, cimSmgs1.g209) &&
                Objects.equals(g209r, cimSmgs1.g209r) &&
                Objects.equals(g2010, cimSmgs1.g2010) &&
                Objects.equals(g2011, cimSmgs1.g2011) &&
                Objects.equals(g2012, cimSmgs1.g2012) &&
                Objects.equals(g2013, cimSmgs1.g2013) &&
                Objects.equals(g2014, cimSmgs1.g2014) &&
                Objects.equals(g2014r, cimSmgs1.g2014r) &&
                Objects.equals(g2015, cimSmgs1.g2015) &&
                Objects.equals(g2016, cimSmgs1.g2016) &&
                Objects.equals(g2017, cimSmgs1.g2017) &&
                Objects.equals(g2017r, cimSmgs1.g2017r) &&
                Objects.equals(g2011r, cimSmgs1.g2011r) &&
                Objects.equals(g110, cimSmgs1.g110) &&
                Objects.equals(g111, cimSmgs1.g111) &&
                Objects.equals(g112, cimSmgs1.g112) &&
                Objects.equals(g410, cimSmgs1.g410) &&
                Objects.equals(g411, cimSmgs1.g411) &&
                Objects.equals(g412, cimSmgs1.g412) &&
                Objects.equals(ready, cimSmgs1.ready) &&
                Objects.equals(g171, cimSmgs1.g171) &&
                Objects.equals(g2018, cimSmgs1.g2018) &&
                Objects.equals(g2018r, cimSmgs1.g2018r) &&
                Objects.equals(g_10_3r, cimSmgs1.g_10_3r) &&
                Objects.equals(g_16_33r, cimSmgs1.g_16_33r) &&
                Objects.equals(g44_1, cimSmgs1.g44_1) &&
                Objects.equals(status, cimSmgs1.status) &&
                Objects.equals(btlc_status, cimSmgs1.btlc_status) &&
                Objects.equals(tdg_status1, cimSmgs1.tdg_status1) &&
                Objects.equals(tdg_status2, cimSmgs1.tdg_status2) &&
                Objects.equals(greenRail_status, cimSmgs1.greenRail_status) &&
                Objects.equals(zayav_otpr, cimSmgs1.zayav_otpr) &&
                Objects.equals(zayav_otpr_c, cimSmgs1.zayav_otpr_c) &&
                Objects.equals(g141c, cimSmgs1.g141c) &&
                Objects.equals(g26c, cimSmgs1.g26c) &&
                Objects.equals(ga661, cimSmgs1.ga661) &&
                Objects.equals(ga662, cimSmgs1.ga662) &&
                Objects.equals(g23b, cimSmgs1.g23b) &&
                Objects.equals(g74_1, cimSmgs1.g74_1) &&
                Objects.equals(g74_2, cimSmgs1.g74_2) &&
                Objects.equals(type, cimSmgs1.type) &&
                Objects.equals(gs_48, cimSmgs1.gs_48) &&
                Objects.equals(gs_22, cimSmgs1.gs_22) &&
                Objects.equals(gs_24, cimSmgs1.gs_24) &&
                Objects.equals(gs_141_1, cimSmgs1.gs_141_1) &&
                Objects.equals(gs_141_2, cimSmgs1.gs_141_2) &&
                Objects.equals(gs_66_1, cimSmgs1.gs_66_1) &&
                Objects.equals(g18B1a, cimSmgs1.g18B1a) &&
                Objects.equals(g18B1b, cimSmgs1.g18B1b) &&
                Objects.equals(g18B1c, cimSmgs1.g18B1c) &&
                Objects.equals(g18B1d, cimSmgs1.g18B1d) &&
                Objects.equals(amount, cimSmgs1.amount) &&
                Objects.equals(aviso_num, cimSmgs1.aviso_num) &&
                Objects.equals(aviso_dat, cimSmgs1.aviso_dat) &&
                Objects.equals(aviso_cod_dat, cimSmgs1.aviso_cod_dat) &&
                Objects.equals(aviso_stavka, cimSmgs1.aviso_stavka) &&
                Objects.equals(g11_prim, cimSmgs1.g11_prim) &&
                Objects.equals(g_1_5k, cimSmgs1.g_1_5k) &&
                Objects.equals(g_4_5k, cimSmgs1.g_4_5k) &&
                Objects.equals(route != null ? route.getHid() : "", cimSmgs1.route != null ? cimSmgs1.route.getHid() : "") &&
                Objects.equals(packDoc != null ? packDoc.getHid() : "", cimSmgs1.packDoc != null ? cimSmgs1.packDoc.getHid() : "") &&
                Objects.equals(g4prim, cimSmgs1.g4prim) &&
                Objects.equals(guInf, cimSmgs1.guInf) &&
                Objects.equals(perevozchik, cimSmgs1.perevozchik) &&
                Objects.equals(tarifShema, cimSmgs1.tarifShema) &&
                Objects.equals(tarifVOtpr, cimSmgs1.tarifVOtpr) &&
                Objects.equals(platezhKm, cimSmgs1.platezhKm) &&
                Objects.equals(platezhRub, cimSmgs1.platezhRub) &&
                Objects.equals(platezhKop, cimSmgs1.platezhKop) &&
                Objects.equals(provozPlata, cimSmgs1.provozPlata) &&
                Objects.equals(zpuInfo, cimSmgs1.zpuInfo) &&
                Objects.equals(trueInfo, cimSmgs1.trueInfo) &&
                Objects.equals(vizaNo, cimSmgs1.vizaNo) &&
                Objects.equals(perevozSign, cimSmgs1.perevozSign) &&
                Objects.equals(perevozDate, cimSmgs1.perevozDate) &&
                Objects.equals(sborCennost1, cimSmgs1.sborCennost1) &&
                Objects.equals(sborCennost2, cimSmgs1.sborCennost2) &&
                Objects.equals(otprItogo, cimSmgs1.otprItogo) &&
                Objects.equals(tbcNomer, cimSmgs1.tbcNomer) &&
                Objects.equals(tbcStatus, cimSmgs1.tbcStatus) &&
                Objects.equals(zakazNo, cimSmgs1.zakazNo) &&
                Objects.equals(cim, cimSmgs1.cim) &&
                Objects.equals(incoterms, cimSmgs1.incoterms) &&
                Objects.equals(kodUslPost, cimSmgs1.kodUslPost) &&
                Objects.equals(frankofracht, cimSmgs1.frankofracht) &&
                Objects.equals(otmPoluch, cimSmgs1.otmPoluch) &&
                Objects.equals(vidKontOtpr, cimSmgs1.vidKontOtpr) &&
                Objects.equals(platform, cimSmgs1.platform) &&
                Objects.equals(docNum, cimSmgs1.docNum) &&
                Objects.equals(tehUslG12, cimSmgs1.tehUslG12) &&
                Objects.equals(grOtpFio, cimSmgs1.grOtpFio) &&
                Objects.equals(g104, cimSmgs1.g104) &&
                Objects.equals(g164, cimSmgs1.g164) &&
                Objects.equals(npoezd, cimSmgs1.npoezd) &&
                Objects.equals(vagPrim, cimSmgs1.vagPrim) &&
                Objects.equals(nettoPref, cimSmgs1.nettoPref) &&
                Objects.equals(taraPref, cimSmgs1.taraPref) &&
                Objects.equals(bruttoPref, cimSmgs1.bruttoPref) &&
                Objects.equals(kontKol, cimSmgs1.kontKol) &&
                Objects.equals(g2_1, cimSmgs1.g2_1) &&
                Objects.equals(g5_1, cimSmgs1.g5_1) &&
                Objects.equals(docType1, cimSmgs1.docType1) &&
                Objects.equals(plat, cimSmgs1.plat) &&
                Objects.equals(plat1, cimSmgs1.plat1) &&
                Objects.equals(gu, cimSmgs1.gu) &&
                Objects.equals(sborCennost11, cimSmgs1.sborCennost11) &&
                Objects.equals(sborCennost21, cimSmgs1.sborCennost21) &&
                Objects.equals(sborCennost22, cimSmgs1.sborCennost22) &&
                Objects.equals(ftsNomer, cimSmgs1.ftsNomer) &&
                Objects.equals(ftsStatus, cimSmgs1.ftsStatus) &&
                Objects.equals(zpuInfo1, cimSmgs1.zpuInfo1) &&
                Objects.equals(index_p, cimSmgs1.index_p) &&
                Objects.equals(n_ppv, cimSmgs1.n_ppv) &&
                Objects.equals(nppr, cimSmgs1.nppr) &&
                Objects.equals(dprb, cimSmgs1.dprb) &&
                Objects.equals(g_2inn, cimSmgs1.g_2inn) &&
                Objects.equals(g_5inn, cimSmgs1.g_5inn) &&
                Objects.equals(ftsDocId, cimSmgs1.ftsDocId) &&
                Objects.equals(g_24_bcn, cimSmgs1.g_24_bcn) &&
                Objects.equals(g36, cimSmgs1.g36) &&
                Objects.equals(g25Txt, cimSmgs1.g25Txt) &&
                Objects.equals(g2_, cimSmgs1.g2_) &&
                Objects.equals(g5_, cimSmgs1.g5_) &&
                Objects.equals(n_packet, cimSmgs1.n_packet) &&
                Objects.equals(g7_, cimSmgs1.g7_) &&
                Objects.equals(g3_, cimSmgs1.g3_) &&
                Objects.equals(sort, cimSmgs1.sort) &&
                Objects.equals(kind, cimSmgs1.kind) &&
                Objects.equals(send_br, cimSmgs1.send_br) &&
                Objects.equals(src, cimSmgs1.src) &&
                Objects.equals(src, cimSmgs1.g1_dop_info) &&
                Objects.equals(src, cimSmgs1.g4_dop_info) &&
                Objects.equals(src, cimSmgs1.g16_dop_info);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12, g13, g141, g142, g15, g16, g161, g17, g18, g181, g19, g20, g21, g21_, g22, g22_, g23, g24, g25,
                g26, g27, g28, g281, g29, g30, g301, un, trans, g40, g44, g191, g192, g193, g48, g41, g45, ga491, gb491, ga492, gb492, ga493, gb493, ga494, gb494, ga50, gb50, ga52,
                gb52, ga51, gb51, ga53, gb53, ga54, gb54, ga55, gb55, ga56, gb56, ga57, gb57, g591, g592, g593, g594, g595, g596, g597, g598, g60, g61, g611, g612, g43, g47, g63, g64,
                g65, g651, g652, ga66, gb661, gb662, g67, g691, g692, g693, g694, g68, g62, g621, g622, g38, g39, g18B1, g18B2, ga581, gb581, ga582, gb582, ga583, gb583, ga584, gb584,
                ga585, gb585, ga586, gb586, g20100, g42, g46, g11_1, g12_1, g13_1, g41_1, g42_1, g43_1, hidCim, hidIcf, hidSp, hidSmgs, iftminId, iftminOut, iftminIn, iftminId2, iftminOut2,
                iftminIn2, g121, g24N, g24T, g24B, statusBr, altered, g1r, g14, g4r, g7r, g9r, g101, g101r, g102, g102r, g13r, g15r, g162, g162r, g163, g163r, g18r, g29r, profile, targGr,
                avFields, g1c, g4c, g7c, g9c, g13c, g15c, g18c, g20c, numClaim, g15_1, g16_1, g16r, g17_1, g18_1, g18r_1, g19_1, g19r, g45_1, g46_1, g46r, g47_1, g48_1, g48r, g49, g49r, g201,
                g202, g202r, g203, g204, g205, g206, g206r, g207, g207r, g208, g209, g209r, g2010, g2011, g2012, g2013, g2014, g2014r, g2015, g2016, g2017, g2017r, g2011r, g110, g111, g112,
                g410, g411, g412, ready, g171, g2018, g2018r, g_10_3r, g_16_33r, g44_1, status, btlc_status, tdg_status1, tdg_status2, greenRail_status, zayav_otpr, zayav_otpr_c, g141c, g26c,
                ga661, ga662, g23b, g74_1, g74_2, type, gs_48, gs_22, gs_24, gs_141_1, gs_141_2, gs_66_1, g18B1a, g18B1b, g18B1c, g18B1d, amount, aviso_num, aviso_dat, aviso_cod_dat, aviso_stavka,
                g11_prim, g_1_5k, g_4_5k, route != null ? route.getHid() : "", packDoc != null ? packDoc.getHid() : "", g4prim, guInf, perevozchik, tarifShema, tarifVOtpr, platezhKm, platezhRub, platezhKop, provozPlata, zpuInfo, trueInfo, vizaNo, perevozSign,
                perevozDate, sborCennost1, sborCennost2, otprItogo, tbcNomer, tbcStatus, zakazNo, cim, incoterms, kodUslPost, frankofracht, otmPoluch, vidKontOtpr, platform, docNum, tehUslG12,
                grOtpFio, g104, g164, npoezd, vagPrim, nettoPref, taraPref, bruttoPref, kontKol, g2_1, g5_1, docType1, plat, plat1, gu, sborCennost11, sborCennost21, sborCennost22, ftsNomer,
                ftsStatus, zpuInfo1, index_p, n_ppv, nppr, dprb, g_2inn, g_5inn, ftsDocId, g_24_bcn, g36, g25Txt, g2_, g5_, n_packet, g7_, g3_, sort, kind, send_br, src, g1_dop_info, g4_dop_info, g16_dop_info);
    }
}
