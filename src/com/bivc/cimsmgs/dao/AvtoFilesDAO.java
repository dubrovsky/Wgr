package com.bivc.cimsmgs.dao;


import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.CimSmgsFile;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.db.ky.AvtoFiles;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface AvtoFilesDAO extends GenericDAO<AvtoFiles, Long> {
    public List<AvtoFiles> findByAvto(Integer limit, Integer start, Usr usr, Long avtoHid) throws InfrastructureException;
    public List<AvtoFiles> findByZayav(Integer limit, Integer start, Usr usr, Long zayavHid) throws InfrastructureException;

    public Long countByAvto(Usr usr, Long avtoHid);
    public Long countByZayav(Usr usr, Long zayavHid);
    public Long maxNpp(Long routeId, String docType);

    public void save(AvtoFiles scan, File file) throws SQLException, IOException;


    public void save(AvtoFiles avtoFiles, byte[] file) throws SQLException, IOException;
}
