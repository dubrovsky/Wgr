package com.bivc.cimsmgs.db.nsi;

import java.util.Objects;

/**
 * @author p.dzeviarylin
 */
public class ClientGroupsId implements java.io.Serializable {
    private Integer clientId;
    private String groupId;

    public ClientGroupsId() {
    }

    public ClientGroupsId(Integer clientId, String groupId) {
        this.clientId = clientId;
        this.groupId = groupId;
    }

    public String getGroupId() {
        return this.groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClientGroupsId that = (ClientGroupsId) o;
        return clientId.equals(that.clientId) &&
                groupId.equals(that.groupId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, groupId);
    }
}
