package com.bivc.cimsmgs.db.ky;

import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class YardSectorGroupsId implements java.io.Serializable {
    private Integer yardSectorId;
    private String groupId;

    public YardSectorGroupsId() {
    }

    public YardSectorGroupsId(Integer yardSectorId, String groupId) {
        this.yardSectorId = yardSectorId;
        this.groupId = groupId;
    }

    public String getGroupId() {
        return this.groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Integer getYardSectorId() {
        return yardSectorId;
    }

    public void setYardSectorId(Integer yardSectorId) {
        this.yardSectorId = yardSectorId;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        YardSectorGroupsId that = (YardSectorGroupsId) o;
        return yardSectorId.equals(that.yardSectorId) &&
                groupId.equals(that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(yardSectorId, groupId);
    }
}
