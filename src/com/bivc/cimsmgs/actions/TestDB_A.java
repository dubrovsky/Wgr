package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.commons.HibernateUtil;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigInteger;

/**
 * @author p.dzeviarylin
 */
public class TestDB_A extends CimSmgsSupport_A{

    final static private Logger log = LoggerFactory.getLogger(TestDB_A.class);

    public String execute(){
        HibernateUtil.beginTransaction();
        try {
            BigInteger i = (BigInteger) HibernateUtil.getSession().createSQLQuery("Select 1").uniqueResult();
            if(i.intValue() == 1){
                setJSONData(Constants.convert2JSON_True());
            } else {
                setJSONData(Constants.convert2JSON_TrueWithMsg("Invalid result was received"));
            }
            HibernateUtil.commitTransaction();
        } catch (Throwable ex) {
            log.error("Could not commit transaction", ex);
            setJSONData(Constants.convert2JSON_False(ExceptionUtils.getRootCauseMessage(ex)));
            try {
                HibernateUtil.rollbackTransaction();
            } catch (Throwable rbEx) {
                log.error("Could not rollback transaction after exception", rbEx);
            }
        }
        return SUCCESS;
    }
}
