package com.bivc.cimsmgs.dto.ky2;

import java.math.BigDecimal;
import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class KontBindViewDTO implements Comparable<KontBindViewDTO>{

    private Long hid;
    private String nkon;
    private Integer sort;
    private BigDecimal massa_tar;
    private BigDecimal massa_brutto;
    private BigDecimal massa_brutto_all;
    private BigDecimal pod_sila;
    private String vid;
    private String prim;
    private String gruzotpr;
    private ClientDTO client;
    private PoezdFilterDTO poezd;
    private AvtoFilterDTO avto;

    public PoezdFilterDTO getPoezd() {
        return poezd;
    }

    public void setPoezd(PoezdFilterDTO poezd) {
        this.poezd = poezd;
    }

    public void setAvto(AvtoFilterDTO avto) {
        this.avto = avto;
    }

    public AvtoFilterDTO getAvto() {
        return avto;
    }

    //    private Set<KontGruzHistoryDTO> history = new TreeSet<>();
//
//    public Set<KontGruzHistoryDTO> getHistory() {
//        return history;
//    }
//
//    public void setHistory(Set<KontGruzHistoryDTO> history) {
//        this.history = history;
//    }

    public ClientDTO getClient() {
        return client;
    }

    public void setClient(ClientDTO client) {
        this.client = client;
    }

    private TreeSet<GruzBindViewDTO> gruzs = new TreeSet<>();

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public String getNkon() {
        return nkon;
    }

    public void setNkon(String nkon) {
        this.nkon = nkon;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public TreeSet<GruzBindViewDTO> getGruzs() {
        return gruzs;
    }

    public void setGruzs(TreeSet<GruzBindViewDTO> gruzs) {
        this.gruzs = gruzs;
    }

    public BigDecimal getMassa_tar() {
        return massa_tar;
    }

    public void setMassa_tar(BigDecimal massa_tar) {
        this.massa_tar = massa_tar;
    }

    public BigDecimal getMassa_brutto() {
        return massa_brutto;
    }

    public void setMassa_brutto(BigDecimal massa_brutto) {
        this.massa_brutto = massa_brutto;
    }

    public BigDecimal getMassa_brutto_all() {
        return massa_brutto_all;
    }

    public void setMassa_brutto_all(BigDecimal massa_brutto_all) {
        this.massa_brutto_all = massa_brutto_all;
    }

    public BigDecimal getPod_sila() {
        return pod_sila;
    }

    public void setPod_sila(BigDecimal pod_sila) {
        this.pod_sila = pod_sila;
    }

    public String getVid() {
        return vid;
    }

    public void setVid(String vid) {
        this.vid = vid;
    }

    @Override
    public int compareTo(KontBindViewDTO that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisSort = this.getSort();
        Comparable thatSort = that.getSort();

        if (thisSort == null) {
            return AFTER;
        } else if (thatSort == null) {
            return BEFORE;
        } else {
            return thisSort.compareTo(thatSort);
        }
    }

    public String getPrim() {
        return prim;
    }

    public void setPrim(String prim) {
        this.prim = prim;
    }

    public String getGruzotpr() {
        return gruzotpr;
    }

    public void setGruzotpr(String gruzotpr) {
        this.gruzotpr = gruzotpr;
    }
}
