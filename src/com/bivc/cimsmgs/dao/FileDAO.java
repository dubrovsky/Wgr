package com.bivc.cimsmgs.dao;


import com.bivc.cimsmgs.commons.OutputStreamWriters;
import com.bivc.cimsmgs.commons.Search;
import com.bivc.cimsmgs.db.CimSmgsFile;
import com.bivc.cimsmgs.db.Usr;
import com.bivc.cimsmgs.exceptions.InfrastructureException;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface FileDAO extends GenericDAO<CimSmgsFile, Long> {
    public List<CimSmgsFile> findAll(Integer limit, Integer start, Search search, Usr usr) throws InfrastructureException;

    public Long countAll(Search search, Usr usr);

    public void save(CimSmgsFile scan, File file) throws SQLException, IOException;

    public void save(CimSmgsFile scan, OutputStreamWriters file) throws SQLException, IOException;
}
