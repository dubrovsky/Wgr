package com.bivc.cimsmgs.db.ky;

import com.bivc.cimsmgs.db.UsrGroupsDir;

/**
 * @author p.dzeviarylin
 */
public class YardSectorGroups {

    private YardSectorGroupsId hid;
    private YardSector yardSector;
    private UsrGroupsDir group;

    public YardSectorGroups(YardSectorGroupsId hid, YardSector yardSector, UsrGroupsDir group) {
        this.hid = hid;
        this.yardSector = yardSector;
        this.group = group;
    }

    public YardSectorGroups() {
    }

    public UsrGroupsDir getGroup() {
        return group;
    }

    public void setGroup(UsrGroupsDir group) {
        this.group = group;
    }

    public YardSector getYardSector() {
        return yardSector;
    }

    public void setYardSector(YardSector yardSector) {
        this.yardSector = yardSector;
    }

    public YardSectorGroupsId getHid() {
        return hid;
    }

    public void setHid(YardSectorGroupsId id) {
        this.hid = id;
    }
}
