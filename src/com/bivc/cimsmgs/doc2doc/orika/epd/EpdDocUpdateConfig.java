package com.bivc.cimsmgs.doc2doc.orika.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import com.bivc.cimsmgs.db.CimSmgsCarList;
import ma.glasnost.orika.Mapper;

/**
 * Created by peter on 29.09.2014.
 */
public class EpdDocUpdateConfig extends EpdDocAbstactConfig {

    public EpdDocUpdateConfig(Mapper<CimSmgs, CimSmgs> cimSmgsMapper, Mapper<CimSmgsCarList, CimSmgsCarList> carListMapper) {
        super(cimSmgsMapper, carListMapper);
        init();
    }
}
