package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.PrintBlank;
import com.bivc.cimsmgs.db.Usr;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface PrintBlankDAO extends GenericDAO<PrintBlank, Long>{
    void saveBlank(PrintBlank blank, File upload) throws SQLException, IOException;
    List<PrintBlank> findAll(Integer limit, Integer start, String query, Usr usr);

//    List<PrintBlank> findAllDownloaded(String query);


    int updateBlank(PrintBlank blank);
}
