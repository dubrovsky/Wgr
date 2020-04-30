package com.bivc.cimsmgs.db.ky;

import java.util.Date;
import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class VagonHistory  implements Comparable<VagonHistory>{

    private Long hid;
    private Poezd poezd;
    private Vagon vagon;
    private Byte koleya;
    private Byte direction;
    private Date dateOperation;
    private String un;

    public VagonHistory(Poezd poezd, Vagon vagon, Byte koleya, Byte direction, Date dateOperation, String un) {
        this.poezd = poezd;
        this.vagon = vagon;
        this.koleya = koleya;
        this.direction = direction;
        this.dateOperation = dateOperation;
        this.un = un;
    }

    public VagonHistory() {
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Poezd getPoezd() {
        return poezd;
    }

    public void setPoezd(Poezd poezd) {
        this.poezd = poezd;
    }

    public Vagon getVagon() {
        return vagon;
    }

    public void setVagon(Vagon vagon) {
        this.vagon = vagon;
    }

    public Byte getKoleya() {
        return koleya;
    }

    public void setKoleya(Byte koleya) {
        this.koleya = koleya;
    }

    public Byte getDirection() {
        return direction;
    }

    public void setDirection(Byte direction) {
        this.direction = direction;
    }

    public Date getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(Date dateOperation) {
        this.dateOperation = dateOperation;
    }

    public String getUn() {
        return un;
    }

    public void setUn(String un) {
        this.un = un;
    }

    @Override
    public int compareTo(VagonHistory that) {
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
        VagonHistory that = (VagonHistory) o;
        return hid.equals(that.hid) &&
                koleya.equals(that.koleya) &&
                direction.equals(that.direction) &&
                dateOperation.equals(that.dateOperation) &&
                un.equals(that.un);
    }

    @Override
    public int hashCode() {
        return Objects.hash(hid, koleya, direction, dateOperation, un);
    }

}
