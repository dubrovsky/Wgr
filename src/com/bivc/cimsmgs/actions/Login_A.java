package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Login_A extends CimSmgsSupport_A {

    final static private Logger log = LoggerFactory.getLogger(Login_A.class);

    public String execute() {
        log.info("");
        // Confirm message resources loaded
        String message = getText(Constants.ERROR_DATABASE_MISSING);
        if (Constants.ERROR_DATABASE_MISSING.equals(message)) {
            addActionError(Constants.ERROR_MESSAGES_NOT_LOADED);
        }

        if (hasErrors())
            return ERROR;
        else
            return SUCCESS;
    }
}
