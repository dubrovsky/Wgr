package com.bivc.cimsmgs.xls;

import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.TreeMap;

/**
 * Created by vva on 06.08.14.
 */
public class Excel {
    final static private org.slf4j.Logger log = LoggerFactory.getLogger(Excel.class);
    private static TreeMap xlsFile = new TreeMap();

    synchronized public static byte[] getXlsFile(String nmXlsFile) throws Exception {
        byte[] ret = null;
        if ((ret = (byte[]) xlsFile.get(nmXlsFile)) == null) {
            InputStream strm = Excel.class.getResourceAsStream("/com/bivc/cimsmgs/xls/" + nmXlsFile + ".xls");
            ret = new byte[0];
            if (strm != null) {
                int sk = (int) strm.available();
                ret = new byte[sk];
                strm.read(ret);
                strm.close();
//        ret = new String(mb, "UTF-8");
                xlsFile.put(nmXlsFile, ret);
            }
//      ret = ret.replaceAll("/[*]{1}\\s*databasePrefix\\s*[*]{1}/\\s*", ParamConfig.databasePrefix);
            log.debug(nmXlsFile + ": " + ret.length + " byte");
        }
        return ret;
    }

}
