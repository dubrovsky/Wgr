package com.bivc.cimsmgs.db.nsi;

import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * @author p.dzeviarylin
 */
public class NsiGngDe {

    private String kgvn;
    private String nzgr;
    private String descr;

    public NsiGngDe() {
    }

    public NsiGngDe(String kgvn, String nzgr, String descr) {
        this.kgvn = kgvn;
        this.nzgr = nzgr;
        this.descr = descr;
    }

    public String getKgvn() {
        return kgvn;
    }

    public void setKgvn(String kgvn) {
        this.kgvn = kgvn;
    }

    public String getNzgr() {
        return nzgr;
    }

    public void setNzgr(String nzgr) {
        this.nzgr = nzgr;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        NsiGngDe nsiGngDe = (NsiGngDe) o;

        return new EqualsBuilder()
                .append(kgvn, nsiGngDe.kgvn)
                .append(nzgr, nsiGngDe.nzgr)
                .append(descr, nsiGngDe.descr)
                .isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37)
                .append(kgvn)
                .append(nzgr)
                .append(descr)
                .toHashCode();
    }

    @Override
    public String toString() {
        return new ToStringBuilder(this)
                .append("kgvn", kgvn)
                .append("nzgr", nzgr)
                .append("descr", descr)
                .toString();
    }
}
