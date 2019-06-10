package com.bivc.cimsmgs.commons;

import org.hibernate.dialect.MySQL5InnoDBDialect;

/**
 * @author p.dzeviarylin
 */
public class MySqlDialect extends MySQL5InnoDBDialect {

    public String getSequenceNextValString(String sequenceName) {
        return "select NextVal('" + sequenceName  + "')";
    }
}
