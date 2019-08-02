package com.bivc.cimsmgs.dto.ky2;

import java.util.TreeSet;

/**
 * @author p.dzeviarylin
 */
public class YardBindDTO  implements Comparable<YardBindDTO>{

    private Long hid;
    private Long x;
    private Long y;
    private Long z;
    private TreeSet<KontBindDTO> konts = new TreeSet<>();

    public Long getX() {
        return x;
    }

    public void setX(Long x) {
        this.x = x;
    }

    public Long getY() {
        return y;
    }

    public void setY(Long y) {
        this.y = y;
    }

    public Long getZ() {
        return z;
    }

    public void setZ(Long z) {
        this.z = z;
    }

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    @Override
    public int compareTo(YardBindDTO that) {
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

    public TreeSet<KontBindDTO> getKonts() {
        return konts;
    }

    public void setKonts(TreeSet<KontBindDTO> konts) {
        this.konts = konts;
    }
}
