package com.bivc.cimsmgs.db.nsi;

import com.bivc.cimsmgs.db.UsrGroupsDir;
import com.bivc.cimsmgs.db.ky.YardSector;
import com.bivc.cimsmgs.db.ky.YardSectorGroupsId;

/**
 * @author lan
 */
public class ClientGroups {

    private ClientGroupsId hid;
    private Client client;
    private UsrGroupsDir group;

    public ClientGroups(ClientGroupsId hid, Client client, UsrGroupsDir group) {
        this.hid = hid;
        this.client = client;
        this.group = group;
    }


    public ClientGroups() {
    }


    public UsrGroupsDir getGroup() {
        return group;
    }

    public void setGroup(UsrGroupsDir group) {
        this.group = group;
    }

    public ClientGroupsId getHid() {
        return hid;
    }

    public void setHid(ClientGroupsId hid) {
        this.hid = hid;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
