package com.bivc.cimsmgs.dto.ky2;

/**
 * @author p.dzeviarylin
 */
public class KontGruzHistoryDTO implements Comparable<KontGruzHistoryDTO> {

    private Long hid;
    private VagonViewDTO vagon;
    private PoezdViewDTO poezd;
    private AvtoViewDTO avto;

    public VagonViewDTO getVagon() {
        return vagon;
    }

    public void setVagon(VagonViewDTO vagon) {
        this.vagon = vagon;
    }

    public PoezdViewDTO getPoezd() {
        return poezd;
    }

    public void setPoezd(PoezdViewDTO poezd) {
        this.poezd = poezd;
    }

    public AvtoViewDTO getAvto() {
        return avto;
    }

    public void setAvto(AvtoViewDTO avto) {
        this.avto = avto;
    }

    @Override
    public int compareTo(KontGruzHistoryDTO that) {
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

    public Long getHid() {
        return hid;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }
}
