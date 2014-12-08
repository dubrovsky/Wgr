package com.bivc.cimsmgs.db;

import com.bivc.cimsmgs.commons.money2str;
import com.bivc.cimsmgs.commons.myUser;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.*;

@JsonIgnoreProperties({"iftminLogs", "iftminLogsBtlc", "packDoc", "route", "statuses"})
public class CimSmgsInvoice implements Serializable {

    @JsonSerialize(include = JsonSerialize.Inclusion.ALWAYS)
    private Long hid;
    //    private CimSmgs cimSmgs;
    private String notd;
    private String adres_o;
    private String n_dog;
    private String npol;
    private String adres_p;
    private String kod_pol;
    private String itogo;
    private String invoice;
    private String nsel;
    private String adres_s;
    private String nbuy;
    private String adres_b;
    private String kod_b;
    private String kod_del;
    private String ndel;
    private String prim;
    private String fio_otv;
    private String un;
    private String un_lock;
    private Date dat_dog;
    private Date dat_inv;
    private String trans;
    private Date dattr;
    private Date locked;
    private String cux;
    private Long invoicId;
    private Date invoicOut;
    private Date invoicIn;
    private Long invoicId2;
    private Date invoicOut2;
    private Date invoicIn2;
    private Map<Long, CimSmgsInvoiceGruz> invoiceGruzs = new TreeMap<Long, CimSmgsInvoiceGruz>();
    /*private Set<BIftminLog> BIftminLogs = new HashSet<BIftminLog>(0);
    private Set<BIftminLog> BIftminLogsBtlc = new HashSet<BIftminLog>(0);*/

    final static private Logger log = LoggerFactory.getLogger(CimSmgsInvoice.class);
    private Route route;
    private PackDoc packDoc;
    private String postavka;
    private String postavkaPunkt;
    private String notpr;
    private String nvag;
    private String utiN;
    private String country_o;
    private String zip_o;
    private String city_o;
    private String country_p;
    private String zip_p;
    private String city_p;
    private Date altered;
    private Byte status;
    private BigDecimal docType1;
    private String docType;
    private Set<Status> statuses = new HashSet<Status>();
    private Set<BIftminLog> iftminLogs = new HashSet<BIftminLog>();
    private Set<BIftminLog> iftminLogsBtlc = new HashSet<BIftminLog>();

    public Set<BIftminLog> getIftminLogsBtlc() {
        return iftminLogsBtlc;
    }

    public void setIftminLogsBtlc(Set<BIftminLog> iftminLogsBtlc) {
        this.iftminLogsBtlc = iftminLogsBtlc;
    }

    public Set<BIftminLog> getIftminLogs() {
        return iftminLogs;
    }

    public void setIftminLogs(Set<BIftminLog> iftminLogs) {
        this.iftminLogs = iftminLogs;
    }

    public Set<Status> getStatuses() {
        return statuses;
    }

    public void setStatuses(Set<Status> statuses) {
        this.statuses = statuses;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public BigDecimal getDocType1() {
        return docType1;
    }

    public void setDocType1(BigDecimal docType1) {
        this.docType1 = docType1;
    }

    public Date getAltered() {
        return altered;
    }

    public void setAltered(Date altered) {
        this.altered = altered;
    }

    public String getUtiN() {
        return utiN;
    }

    public void setUtiN(String utiN) {
        this.utiN = utiN;
    }

    public String getNvag() {
        return nvag;
    }

    public void setNvag(String nvag) {
        this.nvag = nvag;
    }

    public String getNotpr() {
        return notpr;
    }

    public void setNotpr(String notpr) {
        this.notpr = notpr;
    }

    public String getPostavkaPunkt() {
        return postavkaPunkt;
    }

    public void setPostavkaPunkt(String postavkaPunkt) {
        this.postavkaPunkt = postavkaPunkt;
    }


    public String getPostavka() {
        return postavka;
    }

    public void setPostavka(String postavka) {
        this.postavka = postavka;
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

    public CimSmgsInvoice() {
    }

    public CimSmgsInvoice(Long hid) {
        this.hid = hid;
    }


    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setNotd(String notd) {
        this.notd = notd;
    }

    public void setAdres_o(String adres_o) {
        this.adres_o = adres_o;
    }

    public void setN_dog(String n_dog) {
        this.n_dog = n_dog;
    }

    public void setNpol(String npol) {
        this.npol = npol;
    }

    public void setAdres_p(String adres_p) {
        this.adres_p = adres_p;
    }

    public void setKod_pol(String kod_pol) {
        this.kod_pol = kod_pol;
    }

    public void setItogo(String itogo) {
        this.itogo = itogo;
    }

    public void setInvoice(String invoice) {
        this.invoice = invoice;
    }

    public void setNsel(String nsel) {
        this.nsel = nsel;
    }

    public void setAdres_s(String adres_s) {
        this.adres_s = adres_s;
    }

    public void setNbuy(String nbuy) {
        this.nbuy = nbuy;
    }

    public void setAdres_b(String adres_b) {
        this.adres_b = adres_b;
    }

    public void setKod_b(String kod_b) {
        this.kod_b = kod_b;
    }

    public void setKod_del(String kod_del) {
        this.kod_del = kod_del;
    }

    public void setNdel(String ndel) {
        this.ndel = ndel;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public void setFio_otv(String fio_otv) {
        this.fio_otv = fio_otv;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public void setUn_lock(String un_lock) {
        this.un_lock = un_lock;
    }

    public void setDat_dog(Date dat_dog) {
        this.dat_dog = dat_dog;
    }

    public void setDat_inv(Date dat_inv) {
        this.dat_inv = dat_inv;
    }

    public void setTrans(String trans) {
        this.trans = trans;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public void setLocked(Date locked) {
        this.locked = locked;
    }

    public void setCux(String cux) {
        this.cux = cux;
    }

    public void setInvoicId(Long invoicId) {
        this.invoicId = invoicId;
    }

    public void setInvoicIn(Date invoicIn) {
        this.invoicIn = invoicIn;
    }

    public void setInvoicOut(Date invoicOut) {
        this.invoicOut = invoicOut;
    }

    public Long getInvoicId2() {
        return invoicId2;
    }

    public void setInvoicId2(Long invoicId2) {
        this.invoicId2 = invoicId2;
    }

    public Date getInvoicOut2() {
        return invoicOut2;
    }

    public void setInvoicOut2(Date invoicOut2) {
        this.invoicOut2 = invoicOut2;
    }

    public Date getInvoicIn2() {
        return invoicIn2;
    }

    public void setInvoicIn2(Date invoicIn2) {
        this.invoicIn2 = invoicIn2;
    }

//    public void setCimSmgs(CimSmgs cimSmgs) {
//        this.cimSmgs = cimSmgs;
//    }

    @JsonManagedReference
    public void setInvoiceGruzs(Map<Long, CimSmgsInvoiceGruz> InvoiceGruz) {
        this.invoiceGruzs = InvoiceGruz;
    }

    public Long getHid() {
        return hid;
    }

    public String getNotd() {
        return notd;
    }

    public String getAdres_o() {
        return adres_o;
    }

    public String getN_dog() {
        return n_dog;
    }

    public String getNpol() {
        return npol;
    }

    public String getAdres_p() {
        return adres_p;
    }

    public String getKod_pol() {
        return kod_pol;
    }

    public String getItogo() {
        return itogo;
    }

    public String getInvoice() {
        return invoice;
    }

    public String getNsel() {
        return nsel;
    }

    public String getAdres_s() {
        return adres_s;
    }

    public String getNbuy() {
        return nbuy;
    }

    public String getAdres_b() {
        return adres_b;
    }

    public String getKod_b() {
        return kod_b;
    }

    public String getKod_del() {
        return kod_del;
    }

    public String getNdel() {
        return ndel;
    }

    public String getPrim() {
        return prim;
    }

    public String getFio_otv() {
        return fio_otv;
    }

    public String getUn() {
        return un;
    }

    public String getUn_lock() {
        return un_lock;
    }

    public Date getDat_dog() {
        return dat_dog;
    }

    public Date getDat_inv() {
        return dat_inv;
    }

    public String getTrans() {
        return trans;
    }

    public Date getDattr() {
        return dattr;
    }

    public Date getLocked() {
        return locked;
    }

    public String getCux() {
        return cux;
    }

    public Long getInvoicId() {
        return invoicId;
    }

    public Date getInvoicIn() {
        return invoicIn;
    }

    public Date getInvoicOut() {
        return invoicOut;
    }

//    public CimSmgs getCimSmgs() {
//        return cimSmgs;
//    }


    public String getCountry_o() {
        return country_o;
    }

    public void setCountry_o(String country_o) {
        this.country_o = country_o;
    }

    public String getZip_o() {
        return zip_o;
    }

    public void setZip_o(String zip_o) {
        this.zip_o = zip_o;
    }

    public String getCity_o() {
        return city_o;
    }

    public void setCity_o(String city_o) {
        this.city_o = city_o;
    }

    public String getCountry_p() {
        return country_p;
    }

    public void setCountry_p(String country_p) {
        this.country_p = country_p;
    }

    public String getZip_p() {
        return zip_p;
    }

    public void setZip_p(String zip_p) {
        this.zip_p = zip_p;
    }

    public String getCity_p() {
        return city_p;
    }

    public void setCity_p(String city_p) {
        this.city_p = city_p;
    }

    @JsonManagedReference
    public Map<Long, CimSmgsInvoiceGruz> getInvoiceGruzs() {
        return invoiceGruzs;
    }

    public void addInvoiceGruz() {
        for (CimSmgsInvoiceGruz elem : invoiceGruzs.values()) {
            elem.setInvoice(this);
        }
    }

    public void addInvoiceGruzItem(CimSmgsInvoiceGruz invg) {
        if (invg != null) {
            invg.setInvoice(this);
            invoiceGruzs.put(invg.getHid(), invg);
        }
    }

    public String toString() {
        return new ToStringBuilder(this)
                .append("hid", getHid())
                .append("invoicegruz", getInvoiceGruzs())
                .toString();
    }

    public void correct4js() {
        for (CimSmgsInvoiceGruz elem : invoiceGruzs.values()) {
            String nz = elem.getNzgr();
            if (nz != null) {
                log.debug(nz);
                log.debug(nz.replaceAll("'", "\\\\'"));
                elem.setNzgr(nz.replaceAll("'", "\\\\'"));
                elem.setNzgr(elem.getNzgr().replaceAll("&quot;", "\""));
                log.debug(elem.getNzgr());

            }
        }
    }

    /*public Set<BIftminLog> getBIftminLogs() {
        return this.BIftminLogs;
    }

    public void setBIftminLogs(Set<BIftminLog> BIftminLogs) {
        this.BIftminLogs = BIftminLogs;
    }

    public Set<BIftminLog> getBIftminLogsBtlc() {
        return this.BIftminLogsBtlc;
    }

    public void setBIftminLogsBtlc(Set<BIftminLog> BIftminLogs) {
        this.BIftminLogsBtlc = BIftminLogs;
    }*/

    public String calcMbrt() {
        BigDecimal r = new BigDecimal(0);
        for (CimSmgsInvoiceGruz gruz : invoiceGruzs.values()) {
            BigDecimal m = gruz.getMbrt();
            if (m != null) {
                r = r.add(m);
            }
        }
        return r.toString();
    }

    public String calcMnet() {
        BigDecimal r = new BigDecimal(0);
        for (CimSmgsInvoiceGruz gruz : invoiceGruzs.values()) {
            BigDecimal m = gruz.getMnet();
            if (m != null) {
                r = r.add(m);
            }
        }
        return r.toString();
    }

    public String calcKolm() {
        BigDecimal r = new BigDecimal(0);
        for (CimSmgsInvoiceGruz gruz : invoiceGruzs.values()) {
            BigDecimal m = gruz.getKolm();
            if (m != null) {
                r = r.add(m);
            }
        }
        return r.toString();
    }

    public String calcItogoStr() {
        BigDecimal r = new BigDecimal(0);
        for (CimSmgsInvoiceGruz gruz : invoiceGruzs.values()) {
            BigDecimal m = null;
            try {
                m = new BigDecimal(gruz.getItogo());
            } catch (Exception nfex) {
            }
            if (m != null) {
                r = r.add(m);
            }
        }
        return r.toString();
    }

    public void prepare4save() {
//        if(!hasPack()){
//            insertNewPacket(user);
//        }
//        else {
//            preparePacket(user);
//        }

        addInvoiceGruz();
        /*setUn(user.getUsername());
        setTrans(user.getUsr().getGroup().getName());
        setDattr(new Date());*/
    }

    public boolean hasPack() {
        return this.getPackDoc() != null && this.getPackDoc().getHid() != null;
    }

    public void insertNewPacket(myUser user) {
        PackDoc pack = new PackDoc();
        pack.setRoute(getRoute());
        pack.setUsrGroupsDir(user.getUsr().getGroup());
//        getPackDocDAO().makePersistent(pack);
//        setPackDoc(pack);
        pack.addInvoiceItem(this);
    }

    public void preparePacket(myUser user) {
        getPackDoc().setRoute(getRoute());
        getPackDoc().setUsrGroupsDir(user.getUsr().getGroup());
//        getPackDocDAO().makePersistent(pack);
        getPackDoc().addInvoiceItem(this);
    }

    public String numOtpr() {
        String rslt = "";
        if (packDoc.getCimSmgses().size() > 0) {
            for (CimSmgs smgs : packDoc.getCimSmgses()) {
                rslt = smgs.getG694();
                break;
            }
        }
        return rslt;
    }

    public String numKont() {
        String rslt = "";
        if (packDoc.getCimSmgses().size() > 0) {
            for (CimSmgs smgs : packDoc.getCimSmgses()) {
                for (CimSmgsCarList vag : smgs.getCimSmgsCarLists().values()) {
                    for (CimSmgsKonList kon : vag.getCimSmgsKonLists().values()) {
                        rslt = kon.getUtiN();
                        break;
                    }
                    break;
                }
                break;
            }
        }
        return rslt;
    }

    public String sumKolm() {
        BigDecimal rslt = new BigDecimal(0);
        for (CimSmgsInvoiceGruz invoiceGruz : invoiceGruzs.values()) {
            if (invoiceGruz.getKolm() != null) {
                rslt = rslt.add(invoiceGruz.getKolm());
            }
        }
        return rslt.intValue() > 0 ? rslt.toString() : "";
    }

    public String sumMbrt() {
        BigDecimal rslt = new BigDecimal(0);
        for (CimSmgsInvoiceGruz invoiceGruz : invoiceGruzs.values()) {
            if (invoiceGruz.getMbrt() != null) {
                rslt = rslt.add(invoiceGruz.getMbrt());
            }
        }
        return rslt.intValue() > 0 ? rslt.toString() : "";
    }

    public String sumMnet() {
        BigDecimal rslt = new BigDecimal(0);
        for (CimSmgsInvoiceGruz invoiceGruz : invoiceGruzs.values()) {
            if (invoiceGruz.getMnet() != null) {
                rslt = rslt.add(invoiceGruz.getMnet());
            }
        }
        return rslt.intValue() > 0 ? rslt.toString() : "";
    }

    public String sumItogo() {
        BigDecimal rslt = new BigDecimal(0);
        for (CimSmgsInvoiceGruz invoiceGruz : invoiceGruzs.values()) {
            if (invoiceGruz.getItogo() != null) {
                rslt = rslt.add(new BigDecimal(invoiceGruz.getItogo()));
            }
        }
        return rslt.intValue() > 0 ? rslt.toString() : "";
    }

    public String sumItogo2Str() {
        String res = "", sum = sumItogo();
        if (sum.length() > 0) {
            StringTokenizer st = new StringTokenizer(sum, ".");
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
        return res;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public boolean hasKont() {
        return StringUtils.isNotBlank(getUtiN());
    }

    public boolean hasPackDoc() {
        return getPackDoc() != null && this.getPackDoc().getHid() != null;
    }

    public boolean hasEpd() {
        return hasPackDoc() && getPackDoc().hasEpd();
    }

    public boolean hasRoute() {
        return getRoute() != null && getRoute().getHid() != null;
    }
}
