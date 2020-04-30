package com.bivc.cimsmgs.exchange.xls2kypoezd;

import org.apache.poi.ss.usermodel.Sheet;

public class KYPoezdReaderFactory {

    public static Reader getReader(Sheet sheet) throws Exception {
        Reader res = null;
        if (AdampolAudiReader.isCompat(sheet))
            res = new AdampolAudiReader(sheet);
        else if (DuisburgReader.isCompat(sheet))
            res = new DuisburgReader(sheet);
        else if (HamburgReader.isCompat(sheet))
            res = new HamburgReader(sheet);
        else if (AgrostopReader.isCompat(sheet))
            res = new AgrostopReader(sheet);
        else if (RTSBReader.isCompat(sheet))
            res = new RTSBReader(sheet);
        else if (AgrostopChinyReader.isCompat(sheet))
            res = new AgrostopChinyReader(sheet);
        else if (LodzOlechowReader.isCompat(sheet))
            res = new LodzOlechowReader(sheet);
        else if (LodzOlechow2Reader.isCompat(sheet))
            res = new LodzOlechow2Reader(sheet);
        else if (LodzMainReader.isCompat(sheet))
            res = new LodzMainReader(sheet);
        else if (LodzMain2Reader.isCompat(sheet))
            res = new LodzMain2Reader(sheet);
        else
            throw new Exception("Unknown file type");

        return res;

    }

}
