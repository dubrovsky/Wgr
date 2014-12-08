package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.Status;

import java.math.BigDecimal;
import java.util.List;

/**
 * Date: 17.04.12
 * Time: 10:42
 */
public interface StatusDAO extends GenericDAO<Status, Long>{
    void disableStatus1(Long hidCs, BigDecimal hid);
    void disableStatus2(Long hidCs, BigDecimal hid);

    List<Status> history(Long hid, String docType);
}
