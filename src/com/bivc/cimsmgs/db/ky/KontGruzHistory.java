package com.bivc.cimsmgs.db.ky;

import java.util.Date;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class KontGruzHistory implements Comparable<KontGruzHistory> {
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

    public KontGruzHistory(YardSector yardSector, Yard yard, Kont kont, Byte direction, Date dateOperation, String un) {
        this.yardSector = yardSector;
        this.yard = yard;
        this.kont = kont;
        this.direction = direction;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public KontGruzHistory(Avto avto, Kont kont, Byte direction, Date dateOperation, String un) {
        this.avto = avto;
        this.kont = kont;
        this.direction = direction;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public KontGruzHistory(Avto avto, Gruz gruz, Byte direction, Date dateOperation, String un) {
        this.avto = avto;
        this.gruz = gruz;
        this.direction = direction;
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
    public int compareTo(KontGruzHistory that) {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KontGruzHistory that = (KontGruzHistory) o;
        return hid.equals(that.hid) &&
                koleya.equals(that.koleya) &&
                direction.equals(that.direction) &&
                dateOperation.equals(that.dateOperation) &&
                un.equals(that.un);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, koleya, direction, dateOperation, un/*,
                poezd != null ? poezd.getHid() : 37,
                vagon != null ? vagon.getHid() : 37,
                kont != null ? kont.getHid() : 37,
                gruz != null ? gruz.getHid() : 37,
                yard != null ? yard.getHid() : 37,
                yardSector != null ? yardSector.getHid() : 37,
                avto != null ? avto.getHid() : 37*/
        );
    }
}
