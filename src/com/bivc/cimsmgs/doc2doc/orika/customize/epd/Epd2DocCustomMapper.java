package com.bivc.cimsmgs.doc2doc.orika.customize.epd;

import com.bivc.cimsmgs.db.CimSmgs;
import ma.glasnost.orika.CustomMapper;
import ma.glasnost.orika.MappingContext;

/**
 * Created by peter on 10.10.2014.
 */
public class Epd2DocCustomMapper extends CustomMapper<CimSmgs, CimSmgs> {

    @Override
    public void mapAtoB(CimSmgs epd, CimSmgs destination, MappingContext context) {
        if(epd.hasVag()){
            mapperFacade.map(epd.findOrCreateVag(), destination.findOrCreateVag());
        }
    }
}
