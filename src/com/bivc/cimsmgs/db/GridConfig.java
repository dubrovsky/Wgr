package com.bivc.cimsmgs.db;

public class GridConfig {

    private Long hid;
    private String un;
    private String itemId;
    private String dataIndex;
    private boolean hidden;
    private Integer width;
    private byte sort;

    public Long getHid() {
        return hid;
    }

    public String getUn() {
        return un;
    }

    public String getItemId() {
        return itemId;
    }

    public String getDataIndex() {
        return dataIndex;
    }

    public boolean isHidden() {
        return hidden;
    }

    public Integer getWidth() {
        return width;
    }

    public byte getSort() {
        return sort;
    }

    public void setHid(Long hid) {
        this.hid = hid;
    }

    public void setUn(String un) {
        this.un = un;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public void setDataIndex(String dataIndex) {
        this.dataIndex = dataIndex;
    }

    public void setHidden(boolean hidden) {
        this.hidden = hidden;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    public void setSort(byte sort) {
        this.sort = sort;
    }

    public GridConfig(Long hid, String un, String itemId, String dataIndex, boolean hidden, Integer width, byte sort) {
        this.hid = hid;
        this.un = un;
        this.itemId = itemId;
        this.dataIndex = dataIndex;
        this.hidden = hidden;
        this.width = width;
        this.sort = sort;
    }

    public GridConfig() {
    }

    @Override
    public String toString() {
        return "GridConfig{" +
                "hid=" + hid +
                ", un='" + un + '\'' +
                ", itemId='" + itemId + '\'' +
                ", dataIndex='" + dataIndex + '\'' +
                ", hidden=" + hidden +
                ", width=" + width +
                ", sort=" + sort +
                '}';
    }
}
