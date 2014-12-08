package com.bivc.cimsmgs.dao;

import com.bivc.cimsmgs.db.CimSmgsScan;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface SmgsScanDAO extends GenericDAO<CimSmgsScan, Long>
{
  public List<CimSmgsScan> findAll(Long hidCs);
  public Long countAll(Long hidCs);
  public void save(CimSmgsScan scan, File file) throws SQLException, IOException;
}
