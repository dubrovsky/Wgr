package com.bivc.cimsmgs.sql;

import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.TreeMap;

/**
 * Created by vva on 06.08.14.
 */
public class Select {
  final static private org.slf4j.Logger log = LoggerFactory.getLogger(Select.class);
  private static TreeMap SqlFile = new TreeMap();
  synchronized public static String getSqlFile(String nmSqlFile) throws Exception
  {
    String ret = null;
    if( (ret = (String)SqlFile.get(nmSqlFile)) == null )
    {
      InputStream strm = Select.class.getResourceAsStream("/com/bivc/cimsmgs/sql/" + nmSqlFile + ".sql");
      byte[] mb = new byte[0];
      if(strm != null) {
        int sk = (int) strm.available();
        mb = new byte[sk];
        strm.read(mb);
        strm.close();
        ret = new String(mb, "UTF-8");
        SqlFile.put(nmSqlFile, ret);
      }
//      ret = ret.replaceAll("/[*]{1}\\s*databasePrefix\\s*[*]{1}/\\s*", ParamConfig.databasePrefix);
      log.debug(nmSqlFile + ": " + ret);
    }
    return ret;
  }

}
