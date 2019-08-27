package com.bivc.cimsmgs.db.ky;

import java.util.Date;

/**
 * @author p.dzeviarylin
 */
public class KontGruzHistory {
    private Long hid;
    private Poezd poezd;
    private Vagon vagon;
    private YardSector yardSector;
    private Yard yard;
    private Avto avto;
    private Kont kont;
    private Gruz gruz;
    private Byte koleya;
    private Byte direction;
    private Date dateOperation;
    private String un;

    public KontGruzHistory(Poezd poezd, Vagon vagon, Kont kont, Byte koleya, Byte direction, Date dateOperation, String un) {
        this.poezd = poezd;
        this.vagon = vagon;
        this.kont = kont;
        this.koleya = koleya;
        this.direction = direction;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public KontGruzHistory(Poezd poezd, Vagon vagon, Gruz gruz, Byte koleya, Byte direction, Date dateOperation, String un) {
        this.poezd = poezd;
        this.vagon = vagon;
        this.gruz = gruz;
        this.koleya = koleya;
        this.direction = direction;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public KontGruzHistory(YardSector yardSector, Yard yard, Kont kont, Date dateOperation, String un) {
        this.yardSector = yardSector;
        this.yard = yard;
        this.kont = kont;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public KontGruzHistory() {

    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public Date getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(Date dateOperation) {
        this.dateOperation = dateOperation;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
    }

    public Gruz getGruz() {
        return gruz;
    }

    public void setGruz(Gruz gruz) {
        this.gruz = gruz;
    }

    public Kont getKont() {
        return kont;
    }

    public void setKont(Kont kont) {
        this.kont = kont;
    }

    public Avto getAvto() {
        return avto;
    }

    public void setAvto(Avto avto) {
        this.avto = avto;
    }

    public Yard getYard() {
        return yard;
    }

    public void setYard(Yard yard) {
        this.yard = yard;
    }

    public YardSector getYardSector() {
        return yardSector;
    }

    public void setYardSector(YardSector yardSector) {
        this.yardSector = yardSector;
    }

    public Vagon getVagon() {
        return vagon;
    }

    public void setVagon(Vagon vagon) {
        this.vagon = vagon;
    }

    public Poezd getPoezd() {
        return poezd;
    }

    public void setPoezd(Poezd poezd) {
        this.poezd = poezd;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (!(o instanceof KontGruzHistory))
            return false;

        KontGruzHistory other = (KontGruzHistory) o;

        return hid != null &&
                hid.equals(other.getHid());
    }

    @Override
    public int hashCode() {
        return 31;
    }
}
