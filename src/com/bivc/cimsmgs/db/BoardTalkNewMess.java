package com.bivc.cimsmgs.db;

import java.util.Comparator;
import java.util.Date;

public class BoardTalkNewMess implements Comparable<BoardTalkNewMess> {
    private BoardTalkNewMessId id;
    private Date dattr;
    private Integer newCount = 0;

    public BoardTalkNewMess() {
    }

    public BoardTalkNewMess(BoardTalkNewMessId id, Date dattr, Integer newCount) {
        this.id = id;
        this.dattr = dattr;
        this.newCount = newCount;
    }

    public Integer getNewCount() {
        return newCount;
    }

    public void setNewCount(Integer newCount) {
        this.newCount = newCount;
    }

    public Date getDattr() {
        return dattr;
    }

    public void setDattr(Date dattr) {
        this.dattr = dattr;
    }

    public BoardTalkNewMessId getId() {
        return id;
    }

    public void setId(BoardTalkNewMessId id) {
        this.id = id;
    }

    @Override
    public int compareTo(BoardTalkNewMess that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        final BoardTalkNewMessId thisHid = this.getId();
        final BoardTalkNewMessId thatHid = that.getId();

        if(thisHid == null) {
            return AFTER;
        } else if(thatHid == null) {
            return BEFORE;
        } else {
            return Comparator.comparing(BoardTalkNewMessId::getPackDocHid).
                    thenComparing(BoardTalkNewMessId::getDocName).
                    thenComparing(BoardTalkNewMessId::getDocHid).
                    thenComparing(BoardTalkNewMessId::getUn).
                    compare(thisHid, thatHid);
        }
    }

    /*@Override
    public int compareTo(BoardTalkNewMess that) {
        final int BEFORE = -1;
        final int AFTER = 1;

        if (that == null) {
            return BEFORE;
        }

        Comparable thisHid = this.getId();
        Comparable thatHid = that.getId();

        if(thisHid == null) {
            return AFTER;
        } else if(thatHid == null) {
            return BEFORE;
        } else {
            return thisHid.compareTo(thatHid);
        }
    }*/
}
