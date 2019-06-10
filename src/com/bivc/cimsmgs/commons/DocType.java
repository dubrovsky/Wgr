package com.bivc.cimsmgs.commons;

import java.math.BigDecimal;

/**
 * Created by LDN on 22.02.2017.
 */
public enum DocType {
    SMGS((byte)12, new BigDecimal(7), "filesmgs"),
    CIMSMGS((byte)1, new BigDecimal(4), "filecimsmgs");

    DocType(byte type, BigDecimal docType1, String infType) {
        this.type = type;
        this.docType1 = docType1;
        this.infType = infType;
    }

    public byte getType() {
        return type;
    }

    public void setType(byte type) {
        this.type = type;
    }

    public BigDecimal getDocType1() {
        return docType1;
    }

    public void setDocType1(BigDecimal docType1) {
        this.docType1 = docType1;
    }

    public String getInfType() {
        return infType;
    }

    public void setInfType(String infType) {
        this.infType = infType;
    }

    private byte type;
    private BigDecimal docType1;
    private String infType;
}
