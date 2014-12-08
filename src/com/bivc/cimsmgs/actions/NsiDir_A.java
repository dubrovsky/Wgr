package com.bivc.cimsmgs.actions;

import com.bivc.cimsmgs.commons.Constants;
import com.bivc.cimsmgs.dao.NsiDirDAO;
import com.bivc.cimsmgs.dao.NsiDirDAOAware;
import com.bivc.cimsmgs.db.NsiDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Date: 16.01.12
 * Time: 15:35
 */
public class NsiDir_A extends CimSmgsSupport_A implements NsiDirDAOAware {
    final static private Logger log = LoggerFactory.getLogger(NsiDir_A.class);

    public String listDir() {
        log.info("");
        List<NsiDir> list = getNsiDirDAO().findAll(getLimit(), getStart(), getSearch());
        Long total = getNsiDirDAO().countAll();
        setJSONData(Constants.convert2JSON_NsiDirList(list, total));
        return SUCCESS;
    }

    private NsiDirDAO nsiDirDAO;

    public void setNsiDirDAO(NsiDirDAO dao) {
        nsiDirDAO = dao;
    }

    public NsiDirDAO getNsiDirDAO() {
        return nsiDirDAO;
    }

}
