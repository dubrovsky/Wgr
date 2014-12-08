package com.bivc.cimsmgs.dao.hibernate;

import com.bivc.cimsmgs.dao.SmgsScanDAO;
import com.bivc.cimsmgs.db.CimSmgsScan;
import org.hibernate.Query;

import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public class SmgsScanDAOHib extends GenericHibernateDAO<CimSmgsScan, Long> implements SmgsScanDAO
{
  @SuppressWarnings("unchecked")
public List<CimSmgsScan> findAll(Long hidCs)
  {
    final String query =
      "FROM CimSmgsScan s " +
      "WHERE s.cimSmgs.hid = :hidCs ORDER BY s.dattr DESC ";
    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);

    return q.list();
  }

  public Long countAll(Long hidCs)
  {
    final String query =
      "SELECT COUNT(*) FROM CimSmgsScan s " +
      "WHERE s.cimSmgs.hid = :hidCs";
    Query q = getSession().createQuery(query);
    q.setParameter("hidCs", hidCs);

    return (Long)q.uniqueResult();
  }

  public void save(CimSmgsScan scan, File file) throws SQLException, IOException
  {
    /*scan.setFiles(Hibernate.createBlob(new byte[]{0}));
    getSession().save(scan);
    getSession().flush();
    getSession().refresh(scan, LockMode.UPGRADE); //grabs an Oracle CLOB
    SerializableBlobProxy sBlob = (SerializableBlobProxy)scan.getFiles();
    oracle.sql.BLOB blob = (oracle.sql.BLOB)sBlob.getWrappedBlob();
    java.io.OutputStream pw = blob.setBinaryStream(0);
    InputStream fileIn = new FileInputStream(file);
    int value;
    do
    {
      value = fileIn.read();
      if(value != -1)
        pw.write(value);
    } while(value != -1);
    pw.close();*/
  }

}
